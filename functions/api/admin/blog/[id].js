import { isAuthenticated, json } from '../../../lib/auth.js';

const slugify = (value) => value.toString().trim().toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

function clean(input) {
  const title = typeof input.title === 'string' ? input.title.trim() : '';
  const excerpt = typeof input.excerpt === 'string' ? input.excerpt.trim() : '';
  const content = typeof input.content === 'string' ? input.content.trim() : '';
  const category = typeof input.category === 'string' ? input.category.trim() : '';
  const author = typeof input.author === 'string' ? input.author.trim() : '';
  const slug = slugify(input.slug || title);
  if (!title || !content || !category || !author || !slug) throw new Error('Title, slug, excerpt, content, category, and author are required.');
  return { title, slug, excerpt, content, category, author,
    featuredImageUrl: typeof input.featuredImageUrl === 'string' ? input.featuredImageUrl.trim() : '',
    seoTitle: typeof input.seoTitle === 'string' ? input.seoTitle.trim() : '',
    seoDescription: typeof input.seoDescription === 'string' ? input.seoDescription.trim() : '',
    status: input.status === 'published' ? 'published' : 'draft'
  };
}

export async function onRequestPut({ request, env, params }) {
  if (!(await isAuthenticated(request, env))) return json({ ok: false, error: 'Unauthorized.' }, 401);
  if (!env.BLOG_DB) return json({ ok: false, error: 'Blog database is not configured.' }, 503);
  try {
    const data = clean(await request.json());
    const now = new Date().toISOString();
    const publishedAt = data.status === 'published' ? now : null;
    const result = await env.BLOG_DB.prepare(`
      UPDATE blog_posts SET slug=?, title=?, excerpt=?, content=?, category=?, author=?,
      featured_image_url=?, seo_title=?, seo_description=?, status=?,
      published_at=CASE WHEN ? = 'published' THEN COALESCE(published_at, ?) ELSE NULL END,
      updated_at=? WHERE id=?
    `).bind(data.slug, data.title, data.excerpt, data.content, data.category, data.author,
      data.featuredImageUrl, data.seoTitle, data.seoDescription, data.status, data.status, publishedAt, now, params.id).run();
    if (!result.meta?.changes) return json({ ok: false, error: 'Article not found.' }, 404);
    return json({ ok: true, id: params.id, slug: data.slug });
  } catch (error) {
    const message = String(error?.message || error);
    return json({ ok: false, error: message.includes('UNIQUE') ? 'That slug is already in use.' : message }, 400);
  }
}

export async function onRequestDelete({ request, env, params }) {
  if (!(await isAuthenticated(request, env))) return json({ ok: false, error: 'Unauthorized.' }, 401);
  if (!env.BLOG_DB) return json({ ok: false, error: 'Blog database is not configured.' }, 503);
  const result = await env.BLOG_DB.prepare('DELETE FROM blog_posts WHERE id=?').bind(params.id).run();
  if (!result.meta?.changes) return json({ ok: false, error: 'Article not found.' }, 404);
  return json({ ok: true });
}
