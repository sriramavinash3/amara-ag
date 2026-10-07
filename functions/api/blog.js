import { json } from '../lib/auth.js';

function normalize(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    author: row.author,
    featuredImageUrl: row.featured_image_url || '',
    seoTitle: row.seo_title || '',
    seoDescription: row.seo_description || '',
    status: row.status,
    date: row.published_at ? new Date(row.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function onRequestGet({ env, request }) {
  if (!env.BLOG_DB) return json({ ok: false, error: 'Blog database is not configured.' }, 503);
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const sql = category
    ? 'SELECT * FROM blog_posts WHERE status = ? AND category = ? ORDER BY COALESCE(published_at, created_at) DESC'
    : 'SELECT * FROM blog_posts WHERE status = ? ORDER BY COALESCE(published_at, created_at) DESC';
  const params = category ? ['published', category] : ['published'];
  const result = await env.BLOG_DB.prepare(sql).bind(...params).all();
  return json({ ok: true, posts: (result.results || []).map(normalize) }, 200, {
    'Cache-Control': 'public, max-age=60, s-maxage=300'
  });
}
