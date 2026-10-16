import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const devMediaStore = new Map();
let devBlogPosts = [];

function tebraDevPlugin() {
  return {
    name: 'tebra-dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) {
          return next();
        }

        const url = new URL(req.url, `http://${req.headers.host || 'localhost:5173'}`);

        if (url.pathname === '/api/v1/appointments/smart' || url.pathname === '/api/appointments') {
          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Idempotency-Key, Authorization');
            return res.end();
          }

          if (req.method === 'GET') {
            try {
              const context = {
                request: new Request(url.toString(), {
                  method: 'GET',
                  headers: req.headers,
                }),
                env: process.env,
              };

              const { onRequestGet } = await import('./functions/api/v1/appointments/smart.js');
              const response = await onRequestGet(context);
              const responseBody = await response.text();

              res.statusCode = response.status;
              for (const [key, value] of response.headers.entries()) {
                res.setHeader(key, value);
              }
              return res.end(responseBody);
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({
                success: false,
                status: 'booking_failed',
                error: { code: 'DEV_SERVER_ERROR', message: err.message },
              }));
            }
          }

          if (req.method === 'POST') {
            try {
              const chunks = [];
              for await (const chunk of req) {
                chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
              }
              const rawBody = Buffer.concat(chunks).toString('utf-8');

              const context = {
                request: new Request(url.toString(), {
                  method: 'POST',
                  headers: req.headers,
                  body: rawBody,
                }),
                env: process.env,
              };

              const { onRequestPost } = await import('./functions/api/v1/appointments/smart.js');
              const response = await onRequestPost(context);
              const responseBody = await response.text();

              res.statusCode = response.status;
              for (const [key, value] of response.headers.entries()) {
                res.setHeader(key, value);
              }
              return res.end(responseBody);
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({
                success: false,
                status: 'booking_failed',
                error: { code: 'DEV_SERVER_ERROR', message: err.message },
              }));
            }
          }
        }

        if (url.pathname === '/api/availability') {
          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            return res.end();
          }

          if (req.method === 'GET') {
            try {
              const context = {
                request: new Request(url.toString(), {
                  method: 'GET',
                  headers: req.headers,
                }),
                env: process.env,
              };

              const { onRequestGet } = await import('./functions/api/availability.js');
              const response = await onRequestGet(context);
              const responseBody = await response.text();

              res.statusCode = response.status;
              for (const [key, value] of response.headers.entries()) {
                res.setHeader(key, value);
              }
              return res.end(responseBody);
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({
                success: false,
                error: { code: 'DEV_AVAILABILITY_ERROR', message: err.message },
              }));
            }
          }
        }

        if (url.pathname === '/api/admin/upload') {
          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            return res.end();
          }

          if (req.method === 'POST') {
            try {
              const chunks = [];
              for await (const chunk of req) {
                chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
              }
              const buffer = Buffer.concat(chunks);
              const contentType = req.headers['content-type'] || '';
              const id = 'media_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);

              let mimeType = 'image/jpeg';
              let fileBuffer = buffer;

              if (contentType.includes('multipart/form-data')) {
                const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
                if (boundaryMatch) {
                  const boundary = boundaryMatch[1] || boundaryMatch[2];
                  const rawString = buffer.toString('binary');
                  const parts = rawString.split('--' + boundary);

                  for (const part of parts) {
                    if (part.includes('filename=')) {
                      const headerEndIndex = part.indexOf('\r\n\r\n');
                      if (headerEndIndex !== -1) {
                        const headersPart = part.substring(0, headerEndIndex);
                        const mimeMatch = headersPart.match(/Content-Type:\s*([^\r\n]+)/i);
                        if (mimeMatch) mimeType = mimeMatch[1].trim();

                        const bodyBinary = part.substring(headerEndIndex + 4, part.lastIndexOf('\r\n'));
                        fileBuffer = Buffer.from(bodyBinary, 'binary');
                        break;
                      }
                    }
                  }
                }
              }

              devMediaStore.set(id, { mimeType, buffer: fileBuffer });
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ ok: true, url: `/api/media/${id}`, id }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ ok: false, error: err.message }));
            }
          }
        }

        if (url.pathname.startsWith('/api/media/')) {
          const mediaId = url.pathname.replace('/api/media/', '');
          const item = devMediaStore.get(mediaId);
          if (item) {
            res.statusCode = 200;
            res.setHeader('Content-Type', item.mimeType);
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            return res.end(item.buffer);
          }
          res.statusCode = 404;
          return res.end('Media Not Found');
        }

        if (url.pathname === '/api/admin/login') {
          if (req.method === 'GET') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ authenticated: true, user: 'amaraadmin' }));
          }
          if (req.method === 'POST') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ ok: true }));
          }
        }

        if (url.pathname === '/api/admin/blog') {
          if (req.method === 'GET') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ ok: true, posts: devBlogPosts }));
          }
          if (req.method === 'POST') {
            try {
              const chunks = [];
              for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
              const body = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
              const newPost = {
                ...body,
                id: 'post_' + Date.now(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                publishedAt: body.status === 'published' ? new Date().toISOString() : null
              };
              devBlogPosts.unshift(newPost);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ ok: true, id: newPost.id, post: newPost }));
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ ok: false, error: err.message }));
            }
          }
        }

        if (url.pathname.startsWith('/api/admin/blog/')) {
          const editId = url.pathname.replace('/api/admin/blog/', '');
          if (req.method === 'PUT') {
            try {
              const chunks = [];
              for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
              const body = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
              devBlogPosts = devBlogPosts.map((p) =>
                p.id === editId
                  ? {
                      ...p,
                      ...body,
                      updatedAt: new Date().toISOString(),
                      publishedAt: body.status === 'published' ? (p.publishedAt || new Date().toISOString()) : null
                    }
                  : p
              );
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ ok: true, id: editId }));
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ ok: false, error: err.message }));
            }
          }
          if (req.method === 'DELETE') {
            devBlogPosts = devBlogPosts.filter((p) => p.id !== editId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ ok: true }));
          }
        }

        if (url.pathname === '/api/blog') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ ok: true, posts: devBlogPosts.filter((p) => p.status === 'published') }));
        }

        if (url.pathname.startsWith('/api/blog/')) {
          const slug = url.pathname.replace('/api/blog/', '');
          const found = devBlogPosts.find((p) => (p.slug === slug || p.id === slug) && p.status === 'published');
          if (found) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ ok: true, post: found }));
          }
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tebraDevPlugin(),
  ],
  assetsInclude: ['**/*.glb'],
})

