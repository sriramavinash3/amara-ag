import { blogPosts as fallbackPosts } from './medicalData';

const mapPost = (post) => ({
  ...post,
  slug: post.slug || post.id,
  date: post.date || (post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''),
  featuredImageUrl: post.featuredImageUrl || post.featured_image_url || '',
  seoTitle: post.seoTitle || post.seo_title || '',
  seoDescription: post.seoDescription || post.seo_description || ''
});

export async function getBlogPosts(category = '') {
  const legacy = (fallbackPosts || []).map(mapPost);
  try {
    const query = category ? '?category=' + encodeURIComponent(category) : '';
    const response = await fetch('/api/blog' + query, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Blog API unavailable');
    const payload = await response.json();
    const live = (payload.posts || []).map(mapPost);
    const liveSlugs = new Set(live.map((post) => post.slug || post.id));
    const legacyVisible = legacy.filter((post) => !liveSlugs.has(post.slug || post.id));
    return [...live, ...legacyVisible];
  } catch {
    return category ? legacy.filter((post) => post.category === category) : legacy;
  }
}

export async function getBlogPost(slug) {
  try {
    const response = await fetch('/api/blog/' + encodeURIComponent(slug), { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Blog API unavailable');
    const payload = await response.json();
    return payload.post ? mapPost(payload.post) : null;
  } catch {
    return (fallbackPosts || []).map(mapPost).find((post) => post.id === slug || post.slug === slug) || null;
  }
}