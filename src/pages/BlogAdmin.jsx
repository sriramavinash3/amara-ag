import React, { useEffect, useState, useCallback } from 'react';
import { Eye, FileText, Globe2, LogOut, Plus, Save, Trash2, CheckCircle2, AlertCircle, Link as LinkIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CmsButton from '../components/cms/CmsButton';
import CmsCard from '../components/cms/CmsCard';
import CmsBadge from '../components/cms/CmsBadge';
import CmsInput from '../components/cms/CmsInput';
import CmsTextarea from '../components/cms/CmsTextarea';
import CmsSelect from '../components/cms/CmsSelect';
import CmsImageUpload from '../components/cms/CmsImageUpload';
import BlogContentRenderer from '../components/blog/BlogContentRenderer';

const CATEGORIES = [
  'Interventional Pain',
  'Back Pain',
  'Neck & Spine',
  'Joint Health',
  'Wellness & Recovery',
  'Patient Education'
];

const INITIAL_FORM = {
  title: '',
  slug: '',
  excerpt: '',
  category: CATEGORIES[0],
  author: 'Ashvin K. Amara, MD',
  readTime: '4 min read',
  featuredImageUrl: '',
  content: '',
  seoTitle: '',
  seoDescription: ''
};

function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed.');
  return data;
}

export default function BlogAdmin() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkError, setLinkError] = useState('');

  const handleOpenLinkModal = () => {
    const textarea = document.getElementById('article-content');
    let selected = '';
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      selected = form.content.substring(start, end).trim();
    }
    setLinkText(selected);
    setLinkUrl('');
    setLinkError('');
    setLinkModalOpen(true);
  };

  const handleInsertLink = (e) => {
    if (e) e.preventDefault();
    const trimmedUrl = linkUrl.trim();
    if (!trimmedUrl) {
      setLinkError('Please enter a destination URL.');
      return;
    }
    if (/^(javascript|data|vbscript|file):/i.test(trimmedUrl)) {
      setLinkError('Unsafe protocol not permitted (e.g. javascript:).');
      return;
    }

    const label = linkText.trim() || trimmedUrl;
    const markdownLink = `[${label}](${trimmedUrl})`;

    const textarea = document.getElementById('article-content');
    if (textarea) {
      const start = textarea.selectionStart ?? form.content.length;
      const end = textarea.selectionEnd ?? form.content.length;
      const before = form.content.substring(0, start);
      const after = form.content.substring(end);
      const newContent = `${before}${markdownLink}${after}`;
      setField('content', newContent);
      setLinkModalOpen(false);

      setTimeout(() => {
        textarea.focus();
        const cursorPosition = start + markdownLink.length;
        textarea.setSelectionRange(cursorPosition, cursorPosition);
      }, 50);
    } else {
      setField('content', (form.content ? form.content + ' ' : '') + markdownLink);
      setLinkModalOpen(false);
    }
  };

  const handleContentKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      handleOpenLinkModal();
    }
  };

  const resetForm = useCallback(() => {
    setEditingId(null);
    setForm(INITIAL_FORM);
    setLinkModalOpen(false);
    setLinkText('');
    setLinkUrl('');
    setLinkError('');
  }, []);

  const refresh = useCallback(async () => {
    try {
      const data = await requestJson('/api/admin/blog');
      setPosts(data.posts || []);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    let active = true;
    requestJson('/api/admin/login')
      .then((data) => {
        if (!active) return;
        if (!data.authenticated) {
          navigate('/cms/login', { replace: true });
          return;
        }
        setAuthenticated(true);
        refresh().finally(() => {
          if (active) setLoading(false);
        });
      })
      .catch(() => {
        if (active) navigate('/cms/login', { replace: true });
      });

    return () => {
      active = false;
    };
  }, [navigate, refresh]);

  const setField = (key, value) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'title' && !editingId) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const edit = (post) => {
    setEditingId(post.id);
    setForm({
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      category: post.category || CATEGORIES[0],
      author: post.author || 'Ashvin K. Amara, MD',
      readTime: post.readTime || '4 min read',
      featuredImageUrl: post.featuredImageUrl || '',
      content: post.content || '',
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || ''
    });
    setMessage('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const save = async (targetStatus) => {
    setSaving(true);
    setMessage('');
    setError('');

    const payload = {
      ...form,
      status: targetStatus,
      slug: slugify(form.slug || form.title)
    };

    try {
      if (editingId) {
        await requestJson(`/api/admin/blog/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        setMessage(`Article successfully ${targetStatus === 'published' ? 'published' : 'saved as draft'}.`);
      } else {
        const created = await requestJson('/api/admin/blog', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        setEditingId(created.post?.id || null);
        setMessage(`Article created and ${targetStatus === 'published' ? 'published' : 'saved as draft'}.`);
      }
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    try {
      await requestJson('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ action: 'logout' })
      });
    } finally {
      navigate('/cms/login', { replace: true });
    }
  };

  const remove = async () => {
    if (!editingId) return;
    const confirmed = typeof window !== 'undefined' ? window.confirm('Delete this article permanently?') : true;
    if (!confirmed) return;

    setSaving(true);
    try {
      await requestJson(`/api/admin/blog/${editingId}`, { method: 'DELETE' });
      resetForm();
      await refresh();
      setMessage('Article deleted permanently.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="cms-page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg className="animate-spin h-5 w-5" style={{ color: '#075985' }} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#334155' }}>Loading publishing console…</span>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="cms-page-wrapper">
      <div className="cms-dashboard-container">
        {/* Top Header */}
        <header className="cms-dashboard-header">
          <div>
            <CmsBadge variant="blue">Content Operations</CmsBadge>
            <h1 className="cms-heading cms-heading-xl" style={{ marginTop: '8px' }}>
              Blog Publishing Dashboard
            </h1>
            <p className="cms-body" style={{ marginTop: '4px' }}>
              Create once. Save as draft. Preview. Publish to the live blog.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CmsButton variant="secondary" onClick={logout} icon={LogOut}>
              Sign out
            </CmsButton>
          </div>
        </header>

        {/* Global Feedback Alert */}
        {message && (
          <div role="status" className="cms-alert cms-alert-success" style={{ marginBottom: '24px' }}>
            <CheckCircle2 style={{ height: '18px', width: '18px', flexShrink: 0, marginTop: '2px' }} />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div role="alert" className="cms-alert cms-alert-error" style={{ marginBottom: '24px' }}>
            <AlertCircle style={{ height: '18px', width: '18px', flexShrink: 0, marginTop: '2px' }} />
            <span>{error}</span>
          </div>
        )}

        {/* Main 2-Column Workspace */}
        <div className="cms-grid-dashboard">
          {/* LEFT: Article Editor */}
          <CmsCard padding="lg">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', margin: 0 }}>
                  {editingId ? 'Edit Article' : 'New Article'}
                </p>
                <h2 className="cms-heading cms-heading-lg" style={{ marginTop: '4px' }}>
                  {editingId ? 'Update Publication' : 'Write an Article'}
                </h2>
              </div>
              <CmsButton variant="secondary" size="sm" onClick={resetForm} icon={Plus}>
                New
              </CmsButton>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <CmsInput
                label="Article Title"
                id="article-title"
                value={form.title}
                onChange={(e) => setField('title', e.target.value)}
                placeholder="e.g. Modern Interventional Approaches to Chronic Back Pain"
                required
              />

              <CmsInput
                label="URL Slug"
                id="article-slug"
                value={form.slug}
                onChange={(e) => setField('slug', slugify(e.target.value))}
                placeholder="modern-interventional-approaches-back-pain"
                helperText="URL path: /blog/<slug>"
                required
              />

              <CmsTextarea
                label="Excerpt / Summary"
                id="article-excerpt"
                value={form.excerpt}
                onChange={(e) => setField('excerpt', e.target.value)}
                placeholder="A concise 2-3 sentence summary that will appear on card listings and social previews."
                rows={3}
                required
              />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <CmsSelect
                  label="Category"
                  id="article-category"
                  value={form.category}
                  onChange={(e) => setField('category', e.target.value)}
                  options={CATEGORIES}
                  required
                />

                <CmsInput
                  label="Author"
                  id="article-author"
                  value={form.author}
                  onChange={(e) => setField('author', e.target.value)}
                  placeholder="Ashvin K. Amara, MD"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <CmsInput
                  label="Read Time"
                  id="article-readtime"
                  value={form.readTime}
                  onChange={(e) => setField('readTime', e.target.value)}
                  placeholder="4 min read"
                />

                <CmsImageUpload
                  label="Featured Image"
                  value={form.featuredImageUrl}
                  onChange={(url) => setField('featuredImageUrl', url)}
                  helperText="Upload image from device (JPEG, PNG, WebP, GIF up to 5MB)."
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label htmlFor="article-content" className="cms-label" style={{ margin: 0 }}>
                    Article Content <span style={{ color: '#b91c1c' }}>*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleOpenLinkModal}
                    className="cms-btn cms-btn-sm"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      fontSize: '12px',
                      fontWeight: 600,
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      color: '#075985',
                      cursor: 'pointer'
                    }}
                    title="Insert clickable hyperlink (Ctrl+K)"
                  >
                    <LinkIcon style={{ height: '13px', width: '13px' }} />
                    <span>Add Link</span>
                    <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>(Ctrl+K)</span>
                  </button>
                </div>

                {linkModalOpen && (
                  <div
                    style={{
                      backgroundColor: '#f0f9ff',
                      border: '1px solid #bae6fd',
                      borderRadius: '8px',
                      padding: '12px',
                      marginBottom: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#0369a1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <LinkIcon style={{ height: '13px', width: '13px' }} />
                        Insert Hyperlink
                      </span>
                      <button
                        type="button"
                        onClick={() => setLinkModalOpen(false)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '2px' }}
                      >
                        <X style={{ height: '14px', width: '14px' }} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={linkText}
                        onChange={(e) => setLinkText(e.target.value)}
                        placeholder="Link Anchor Text"
                        className="cms-input"
                        style={{ flex: '1 1 180px', height: '36px', fontSize: '13px' }}
                      />
                      <input
                        type="text"
                        value={linkUrl}
                        onChange={(e) => { setLinkUrl(e.target.value); setLinkError(''); }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleInsertLink();
                          } else if (e.key === 'Escape') {
                            setLinkModalOpen(false);
                          }
                        }}
                        placeholder="URL (e.g. https://... or /treatments)"
                        className="cms-input"
                        style={{ flex: '1 1 220px', height: '36px', fontSize: '13px' }}
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleInsertLink}
                        className="cms-btn cms-btn-primary"
                        style={{ height: '36px', padding: '0 14px', fontSize: '12px' }}
                      >
                        Insert
                      </button>
                      <button
                        type="button"
                        onClick={() => setLinkModalOpen(false)}
                        className="cms-btn cms-btn-secondary"
                        style={{ height: '36px', padding: '0 10px', fontSize: '12px' }}
                      >
                        Cancel
                      </button>
                    </div>

                    {linkError && (
                      <p style={{ color: '#b91c1c', fontSize: '12px', margin: '6px 0 0 0', fontWeight: 500 }}>
                        {linkError}
                      </p>
                    )}
                  </div>
                )}

                <CmsTextarea
                  id="article-content"
                  value={form.content}
                  onChange={(e) => setField('content', e.target.value)}
                  onKeyDown={handleContentKeyDown}
                  placeholder="Write full article markdown or text. Highlight text and click 'Add Link' or type [Anchor Text](https://...)"
                  rows={16}
                  monospace
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <CmsInput
                  label="SEO Meta Title"
                  id="article-seotitle"
                  value={form.seoTitle}
                  onChange={(e) => setField('seoTitle', e.target.value)}
                  placeholder="Defaults to article title"
                />

                <CmsInput
                  label="SEO Meta Description"
                  id="article-seodesc"
                  value={form.seoDescription}
                  onChange={(e) => setField('seoDescription', e.target.value)}
                  placeholder="Defaults to article excerpt"
                />
              </div>

              {/* Action Buttons Bar */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  paddingTop: '20px',
                  marginTop: '8px',
                  borderTop: '1px solid #dbe2ea'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <CmsButton
                    variant="secondary"
                    onClick={() => save('draft')}
                    disabled={saving}
                    loading={saving}
                    icon={Save}
                  >
                    Save Draft
                  </CmsButton>

                  <CmsButton
                    variant="primary"
                    onClick={() => save('published')}
                    disabled={saving}
                    loading={saving}
                    icon={Globe2}
                  >
                    Publish Live
                  </CmsButton>
                </div>

                {editingId && (
                  <CmsButton
                    variant="ghost-danger"
                    onClick={remove}
                    disabled={saving}
                    icon={Trash2}
                  >
                    Delete Article
                  </CmsButton>
                )}
              </div>
            </div>
          </CmsCard>

          {/* RIGHT: Live Preview & Publishing Guidelines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <CmsCard padding="lg">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Eye style={{ height: '20px', width: '20px', color: '#075985' }} />
                <h2 className="cms-heading cms-heading-md">Live Preview</h2>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <CmsBadge variant="blue">{form.category || 'Category'}</CmsBadge>
                {form.readTime && <span className="cms-muted">{form.readTime}</span>}
              </div>

              <h3 className="cms-heading cms-heading-lg" style={{ marginBottom: '10px' }}>
                {form.title || 'Your article title will appear here'}
              </h3>

              <p className="cms-body-sm" style={{ fontWeight: 500, color: '#334155', marginBottom: '16px' }}>
                {form.excerpt || 'Your article excerpt summary will appear here.'}
              </p>

              {form.featuredImageUrl && (
                <div style={{ marginBottom: '16px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <img
                    src={form.featuredImageUrl}
                    alt="Preview"
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              )}

              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid #f1f5f9',
                  maxHeight: '360px',
                  overflowY: 'auto'
                }}
              >
                {form.content ? (
                  <BlogContentRenderer content={form.content} theme="light" />
                ) : (
                  <p className="cms-muted" style={{ fontStyle: 'italic', margin: 0, fontSize: '13px' }}>
                    Your article body content will render here with clickable hyperlinks.
                  </p>
                )}
              </div>
            </CmsCard>

            <CmsCard padding="md" style={{ backgroundColor: '#f8fafc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <FileText style={{ height: '18px', width: '18px', color: '#075985' }} />
                <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f172a' }}>
                  Publishing Guidelines
                </span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', lineHeight: '1.6', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong>Drafts</strong> stay strictly private in the database and never appear on the public site.</li>
                <li><strong>Publish Live</strong> immediately makes the article accessible at <code>/blog/&lt;slug&gt;</code>.</li>
                <li>Modifying a published article updates its content without changing the original published date.</li>
                <li>URL slugs must be unique, lowercase, and hyphen-separated.</li>
              </ul>
            </CmsCard>
          </div>
        </div>

        {/* BOTTOM: Article Library */}
        <div style={{ marginTop: '32px' }}>
          <CmsCard padding="lg">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', margin: 0 }}>
                  Content Library
                </p>
                <h2 className="cms-heading cms-heading-lg" style={{ marginTop: '4px' }}>
                  Published & Draft Articles
                </h2>
              </div>
              <span className="cms-badge cms-badge-gray" style={{ fontWeight: 600 }}>
                {posts.length} {posts.length === 1 ? 'article' : 'articles'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {posts.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => edit(post)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    width: '100%',
                    padding: '16px 18px',
                    backgroundColor: editingId === post.id ? '#f0f9ff' : '#ffffff',
                    border: `1px solid ${editingId === post.id ? '#bae6fd' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (editingId !== post.id) e.currentTarget.style.backgroundColor = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    if (editingId !== post.id) e.currentTarget.style.backgroundColor = '#ffffff';
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {post.title}
                    </h3>
                    <p className="cms-muted" style={{ marginTop: '4px', margin: 0 }}>
                      <span style={{ fontWeight: 600, color: '#334155' }}>{post.category}</span>
                      {' · '}
                      <span>/blog/{post.slug}</span>
                      {post.publishedAt && (
                        <span> · Published {new Date(post.publishedAt).toLocaleDateString()}</span>
                      )}
                    </p>
                  </div>
                  <CmsBadge variant={post.status === 'published' ? 'green' : 'amber'}>
                    {post.status === 'published' ? 'Published' : 'Draft'}
                  </CmsBadge>
                </button>
              ))}

              {!posts.length && (
                <div style={{ padding: '36px 16px', textAlign: 'center' }}>
                  <p className="cms-body" style={{ color: '#64748b' }}>
                    No CMS articles yet in the database.
                  </p>
                  <p className="cms-muted" style={{ marginTop: '4px' }}>
                    Click &ldquo;Write an Article&rdquo; above to create your first publication.
                  </p>
                </div>
              )}
            </div>
          </CmsCard>
        </div>
      </div>
    </div>
  );
}
