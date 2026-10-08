import { json } from '../../lib/auth.js';

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

export async function onRequestGet({ env, params }) {
  if (!env.BLOG_DB) return json({ ok: false, error: 'Blog database is not configured.' }, 503);
  const row = await env.BLOG_DB.prepare(
    'SELECT * FROM blog_posts WHERE slug = ? AND status = ? LIMIT 1'
  ).bind(params.slug, 'published').first();
  if (!row) return json({ ok: false, error: 'Article not found.' }, 404);
  return json({ ok: true, post: normalize(row) }, 200, {
    'Cache-Control': 'public, max-age=60, s-maxage=300'
  });
}
