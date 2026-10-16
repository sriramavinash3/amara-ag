import { isAuthenticated, json } from '../../lib/auth.js';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
]);

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function onRequestPost({ request, env }) {
  if (!(await isAuthenticated(request, env))) {
    return json({ ok: false, error: 'Unauthorized.' }, 401);
  }

  if (!env.BLOG_DB) {
    return json({ ok: false, error: 'Blog database is not configured.' }, 503);
  }

  const contentType = request.headers.get('content-type') || '';
  let filename = 'uploaded_image';
  let mimeType;
  let base64Data;
  let sizeBytes;

  try {
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') || formData.get('image');
      if (!file || typeof file === 'string') {
        return json({ ok: false, error: 'No image file provided in request.' }, 400);
      }

      filename = file.name || filename;
      mimeType = file.type || '';
      sizeBytes = file.size || 0;

      if (!ALLOWED_MIME_TYPES.has(mimeType)) {
        return json({
          ok: false,
          error: 'Unsupported image format. Allowed formats: JPEG, PNG, WebP, GIF.'
        }, 400);
      }

      if (sizeBytes > MAX_FILE_SIZE_BYTES) {
        return json({
          ok: false,
          error: 'Image file size exceeds the 5MB limit.'
        }, 400);
      }

      const buffer = await file.arrayBuffer();
      base64Data = arrayBufferToBase64(buffer);
    } else if (contentType.includes('application/json')) {
      const body = await request.json().catch(() => null);
      if (!body || !body.data || typeof body.data !== 'string') {
        return json({ ok: false, error: 'Missing image data in request.' }, 400);
      }

      filename = typeof body.filename === 'string' ? body.filename : filename;
      mimeType = typeof body.mimeType === 'string' ? body.mimeType : '';
      base64Data = body.data.replace(/^data:[^;]+;base64,/, '');

      if (!ALLOWED_MIME_TYPES.has(mimeType)) {
        return json({
          ok: false,
          error: 'Unsupported image format. Allowed formats: JPEG, PNG, WebP, GIF.'
        }, 400);
      }

      // Estimate byte size from base64
      sizeBytes = Math.floor((base64Data.length * 3) / 4);
      if (sizeBytes > MAX_FILE_SIZE_BYTES) {
        return json({
          ok: false,
          error: 'Image file size exceeds the 5MB limit.'
        }, 400);
      }
    } else {
      return json({
        ok: false,
        error: 'Unsupported Content-Type. Expected multipart/form-data or application/json.'
      }, 400);
    }

    // Ensure storage table exists
    await env.BLOG_DB.prepare(`
      CREATE TABLE IF NOT EXISTS blog_media (
        id TEXT PRIMARY KEY,
        filename TEXT,
        mime_type TEXT NOT NULL,
        data TEXT NOT NULL,
        size_bytes INTEGER NOT NULL,
        created_at TEXT NOT NULL
      );
    `).run();

    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    await env.BLOG_DB.prepare(`
      INSERT INTO blog_media (id, filename, mime_type, data, size_bytes, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      filename,
      mimeType,
      base64Data,
      sizeBytes,
      now
    ).run();

    const publicUrl = `/api/media/${id}`;

    return json({
      ok: true,
      url: publicUrl,
      id,
      filename,
      mimeType,
      sizeBytes
    });
  } catch (err) {
    return json({
      ok: false,
      error: 'Failed to process image upload: ' + (err.message || 'Unknown error')
    }, 500);
  }
}
