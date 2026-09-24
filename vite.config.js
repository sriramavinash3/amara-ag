import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

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
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Idempotency-Key, Authorization');
            return res.end();
          }

          if (req.method === 'POST') {
            try {
              let rawBody = '';
              for await (const chunk of req) {
                rawBody += chunk;
              }
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

