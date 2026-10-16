import { json } from '../../lib/auth.js';

function base64ToUint8Array(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function onRequestGet({ env, params }) {
  if (!env.BLOG_DB) {
    return json({ ok: false, error: 'Blog database is not configured.' }, 503);
  }

  const id = params.id;
  if (!id) {
    return new Response('Not Found', { status: 404 });
  }

  try {
    const row = await env.BLOG_DB.prepare(
      'SELECT mime_type, data FROM blog_media WHERE id = ? LIMIT 1'
    ).bind(id).first();

    if (!row || !row.data) {
      return new Response('Image Not Found', { status: 404 });
    }

    const binaryData = base64ToUint8Array(row.data);

    return new Response(binaryData, {
      status: 200,
      headers: {
        'Content-Type': row.mime_type || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (err) {
    return new Response('Failed to retrieve image: ' + (err.message || 'Error'), { status: 500 });
  }
}
