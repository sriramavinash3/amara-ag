import { createSession, verifyPassword, verifyUsername, sessionCookie, clearSessionCookie, json, isAuthenticated } from '../../lib/auth.js';

function sameOrigin(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function onRequestPost({ request, env }) {
  try {
    if (!sameOrigin(request)) return json({ ok: false, error: 'Invalid request origin.' }, 403);
    const body = await request.json();
    if (body.action === 'logout') {
      return json({ ok: true }, 200, { 'Set-Cookie': clearSessionCookie() });
    }
    const username = typeof body.username === 'string' ? body.username.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const valid = await verifyUsername(username, env) && await verifyPassword(password, env);
    if (!valid) return json({ ok: false, error: 'Invalid username or password.' }, 401);
    const session = await createSession(env);
    return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(session.value, session.maxAge) });
  } catch {
    return json({ ok: false, error: 'Authentication failed.' }, 400);
  }
}

export async function onRequestGet({ request, env }) {
  return json({ authenticated: await isAuthenticated(request, env) });
}
