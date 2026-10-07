import { isAuthenticated, json } from '../../lib/auth.js';

const slugify = (value) => value.toString().trim().toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

function validate(input) {
  const title = typeof input.title === 'string' ? input.title.trim() : '';
  const excerpt = typeof input.excerpt === 'string' ? input.excerpt.trim() : '';
  const content = typeof input.content === 'string' ? input.content.trim() : '';
  const category = typeof input.category === 'string' ? input.category.trim() : '';
  const author = typeof input.author === 'string' ? input.author.trim() : '';
  const slug = slugify(input.slug || title);
  if (!title || !content || !category || !author || !slug) return { error: 'Title, slug, excerpt, content, category, and author are required.' };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { error: 'Slug must contain only lowercase letters, numbers, and hyphens.' };
  return { data: { title, slug, excerpt, content, category, author,
    featuredImageUrl: typeof input.featuredImageUrl === 'string' ? input.featuredImageUrl.trim() : '',
    seoTitle: typeof input.seoTitle === 'string' ? input.seoTitle.trim() : '',
    seoDescription: typeof input.seoDescription === 'string' ? input.seoDescription.trim() : '',
    status: input.status === 'published' ? 'published' : 'draft'
  }};
}

export async function onRequestGet({ request, env }) {
  if (!(await isAuthenticated(request, env))) return json({ ok: false, error: 'Unauthorized.' }, 401);
  if (!env.BLOG_DB) return json({ ok: false, error: 'Blog database is not configured.' }, 503);
  const result = await env.BLOG_DB.prepare(
    'SELECT * FROM blog_posts ORDER BY updated_at DESC'
  ).all();
  return json({ ok: true, posts: result.results || [] });
}

export async function onRequestPost({ request, env }) {
  if (!(await isAuthenticated(request, env))) return json({ ok: false, error: 'Unauthorized.' }, 401);
  if (!env.BLOG_DB) return json({ ok: false, error: 'Blog database is not configured.' }, 503);
  const checked = validate(await request.json());
  if (checked.error) return json({ ok: false, error: checked.error }, 400);
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const publishedAt = checked.data.status === 'published' ? now : null;
  try {
    await env.BLOG_DB.prepare(`
      INSERT INTO blog_posts
      (id, slug, title, excerpt, content, category, author, featured_image_url, seo_title, seo_description, status, published_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(id, checked.data.slug, checked.data.title, checked.data.excerpt, checked.data.content, checked.data.category,
      checked.data.author, checked.data.featuredImageUrl, checked.data.seoTitle, checked.data.seoDescription,
      checked.data.status, publishedAt, now, now).run();
    return json({ ok: true, id, slug: checked.data.slug });
  } catch (error) {
    const message = String(error?.message || '');
    return json({ ok: false, error: message.includes('UNIQUE') ? 'That slug is already in use.' : 'Could not create article.' }, 400);
  }
}
