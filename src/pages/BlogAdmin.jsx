import { useEffect, useState } from 'react';
import { Eye, LogIn, LogOut, Plus, Save, Trash2, FileText, Globe2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

const CATEGORIES = ['Patient Education', 'Billing & Insurance', 'Tips & Wellness'];
const EMPTY = { title:'', slug:'', excerpt:'', content:'', category:CATEGORIES[0], author:'Dr. Ashvin K. Amara, MD', featuredImageUrl:'', seoTitle:'', seoDescription:'', status:'draft' };

const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'');

async function requestJson(url, options) {
  const response = await fetch(url, {
    credentials: 'same-origin',
    headers: { 'Content-Type':'application/json', Accept:'application/json' },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed.');
  return data;
}

export default function BlogAdmin() {
  const [authenticated,setAuthenticated] = useState(false);
  const [password,setPassword] = useState('');
  const [posts,setPosts] = useState([]);
  const [form,setForm] = useState(EMPTY);
  const [editingId,setEditingId] = useState(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [message,setMessage] = useState('');
  const [error,setError] = useState('');

  const refresh = async () => {
    const session = await requestJson('/api/admin/login');
    setAuthenticated(Boolean(session.authenticated));
    if (session.authenticated) {
      const data = await requestJson('/api/admin/blog');
      setPosts(data.posts || []);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => refresh()).catch(() => setAuthenticated(false)).finally(() => setLoading(false));
  }, []);

  const setField = (name,value) => setForm((current) => ({ ...current, [name]: value }));

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY);
    setMessage('');
    setError('');
  };

  const edit = (post) => {
    setEditingId(post.id);
    setForm({
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || CATEGORIES[0],
      author: post.author || '',
      featuredImageUrl: post.featured_image_url || '',
      seoTitle: post.seo_title || '',
      seoDescription: post.seo_description || '',
      status: post.status === 'published' ? 'published' : 'draft'
    });
    setError('');
    setMessage('');
    window.scrollTo({ top:0, behavior:'smooth' });
  };

  const save = async (status) => {
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const payload = { ...form, status, slug:slugify(form.slug || form.title) };
      if (editingId) {
        await requestJson('/api/admin/blog/' + editingId, { method:'PUT', body:JSON.stringify(payload) });
      } else {
        const created = await requestJson('/api/admin/blog', { method:'POST', body:JSON.stringify(payload) });
        setEditingId(created.id);
      }
      await refresh();
      setMessage(status === 'published' ? 'Article published successfully.' : 'Draft saved.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!editingId || !window.confirm('Delete this article permanently?')) return;
    setSaving(true);
    try {
      await requestJson('/api/admin/blog/' + editingId, { method:'DELETE' });
      resetForm();
      await refresh();
      setMessage('Article deleted.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const login = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await requestJson('/api/admin/login', { method:'POST', body:JSON.stringify({ password }) });
      setPassword('');
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await requestJson('/api/admin/login', { method:'POST', body:JSON.stringify({ action:'logout' }) });
    setAuthenticated(false);
    setPosts([]);
  };

  if (loading) return <div className="max-w-7xl mx-auto py-20 px-4 text-slate-600">Loading publishing console…</div>;

  if (!authenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <Card variant="white" padding="lg" className="w-full max-w-md border-slate-200 shadow-premium">
          <Badge variant="primary" className="bg-cyan-50 text-cyan-800 border border-cyan-200">Amara Content Admin</Badge>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Blog Publishing</h1>
          <p className="mt-2 text-sm text-slate-600">Authorized staff only. Create, edit, preview, and publish patient education articles.</p>
          <form onSubmit={login} className="mt-6 space-y-4">
            <label className="block text-sm font-bold text-slate-800">
              Admin password
              <input type="password" autoComplete="current-password" value={password} onChange={(event)=>setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" required />
            </label>
            {error && <p className="text-sm font-semibold text-rose-600">{error}</p>}
            <Button type="submit" variant="primary" className="w-full" icon={LogIn}>Sign in</Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 md:px-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-slate-200 pb-7">
        <div>
          <Badge variant="secondary" className="bg-cyan-50 text-cyan-800 border border-cyan-200">Content Operations</Badge>
          <h1 className="mt-3 text-4xl font-black text-slate-900">Blog Publishing Dashboard</h1>
          <p className="mt-2 text-slate-600">Create once. Save as draft. Preview. Publish to the live blog.</p>
        </div>
        <Button variant="outline" onClick={logout} icon={LogOut}>Sign out</Button>
      </header>

      {(message || error) && <div className={error ? 'rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700' : 'rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700'}>{error || message}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_.75fr] gap-8 items-start">
        <Card variant="white" padding="lg" className="border-slate-200 shadow-premium">
          <div className="flex items-center justify-between mb-6">
            <div><p className="text-xs font-black uppercase tracking-widest text-slate-400">{editingId ? 'Edit article' : 'New article'}</p><h2 className="text-2xl font-black text-slate-900">{editingId ? 'Update publication' : 'Write an article'}</h2></div>
            <Button variant="outline" size="sm" onClick={resetForm} icon={Plus}>New</Button>
          </div>

          <div className="space-y-5">
            <label className="block text-sm font-bold text-slate-800">Title<input value={form.title} onChange={(event)=>setField('title',event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
            <label className="block text-sm font-bold text-slate-800">URL slug<input value={form.slug} onChange={(event)=>setField('slug',slugify(event.target.value))} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
            <label className="block text-sm font-bold text-slate-800">Excerpt<textarea value={form.excerpt} onChange={(event)=>setField('excerpt',event.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block text-sm font-bold text-slate-800">Category<select value={form.category} onChange={(event)=>setField('category',event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 bg-white">{CATEGORIES.map((category)=><option key={category}>{category}</option>)}</select></label>
              <label className="block text-sm font-bold text-slate-800">Author<input value={form.author} onChange={(event)=>setField('author',event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
            </div>
            <label className="block text-sm font-bold text-slate-800">Featured image URL<input value={form.featuredImageUrl} onChange={(event)=>setField('featuredImageUrl',event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
            <label className="block text-sm font-bold text-slate-800">Article content<textarea value={form.content} onChange={(event)=>setField('content',event.target.value)} rows={18} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm leading-relaxed" /></label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block text-sm font-bold text-slate-800">SEO title<input value={form.seoTitle} onChange={(event)=>setField('seoTitle',event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
              <label className="block text-sm font-bold text-slate-800">SEO description<input value={form.seoDescription} onChange={(event)=>setField('seoDescription',event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
            </div>
            <div className="flex flex-wrap gap-3 pt-3 border-t border-slate-200">
              <Button variant="outline" onClick={()=>save('draft')} disabled={saving} icon={Save}>{saving ? 'Saving…' : 'Save Draft'}</Button>
              <Button variant="primary" onClick={()=>save('published')} disabled={saving} icon={Globe2}>{saving ? 'Publishing…' : 'Publish Live'}</Button>
              {editingId && <Button variant="ghost" onClick={remove} disabled={saving} icon={Trash2} className="text-rose-600">Delete</Button>}
            </div>
          </div>
        </Card>

        <div className="space-y-6 lg:sticky lg:top-24">
          <Card variant="white" padding="lg" className="border-slate-200 shadow-premium">
            <div className="flex items-center gap-2 mb-4"><Eye className="h-5 w-5 text-medical-600"/><h2 className="font-black text-slate-900">Live Preview</h2></div>
            <Badge variant="accent" className="bg-cyan-50 text-cyan-800 border border-cyan-100">{form.category}</Badge>
            <h3 className="mt-4 text-2xl font-black text-slate-900">{form.title || 'Your article title'}</h3>
            <p className="mt-3 text-sm font-semibold text-slate-700">{form.excerpt || 'Your article excerpt will appear here.'}</p>
            <div className="mt-5 pt-5 border-t border-slate-100 whitespace-pre-line text-sm leading-7 text-slate-600 max-h-[420px] overflow-auto">{form.content || 'Your article content preview will appear here.'}</div>
          </Card>
          <Card variant="slate" padding="md" className="border-slate-200">
            <div className="flex items-center gap-2 mb-3"><FileText className="h-4 w-4 text-medical-600"/><span className="text-xs font-black uppercase tracking-widest">Publishing rules</span></div>
            <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4"><li>Drafts never appear on the public blog.</li><li>Publish creates /blog/&lt;slug&gt;.</li><li>Preserve published slugs when possible.</li></ul>
          </Card>
        </div>
      </div>

      <Card variant="white" padding="lg" className="border-slate-200 shadow-premium">
        <div className="flex items-center justify-between mb-5"><div><p className="text-xs font-black uppercase tracking-widest text-slate-400">Library</p><h2 className="text-2xl font-black text-slate-900">Articles</h2></div><span className="text-xs font-bold text-slate-500">{posts.length} total</span></div>
        <div className="divide-y divide-slate-100">
          {posts.map((post)=><button key={post.id} onClick={()=>edit(post)} className="w-full text-left py-4 flex items-center justify-between gap-4 hover:bg-slate-50 px-3 rounded-xl"><div className="min-w-0"><h3 className="font-bold text-slate-900 truncate">{post.title}</h3><p className="text-xs text-slate-500 mt-1">{post.category} · {post.status}</p></div><Badge variant={post.status==='published'?'success':'neutral'}>{post.status}</Badge></button>)}
          {!posts.length && <p className="text-sm text-slate-500 py-5">No CMS articles yet. Existing static articles remain available during migration.</p>}
        </div>
      </Card>
    </div>
  );
}
