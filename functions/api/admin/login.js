import { createSession, verifyPassword, sessionCookie, clearSessionCookie, json, isAuthenticated } from '../../lib/auth.js';

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    if (body.action === 'logout') {
      return json({ ok: true }, 200, { 'Set-Cookie': clearSessionCookie() });
    }
    const password = typeof body.password === 'string' ? body.password : '';
    if (!(await verifyPassword(password, env))) return json({ ok: false, error: 'Invalid credentials.' }, 401);
    const session = await createSession(env);
    return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(session.value, session.maxAge) });
  } catch {
    return json({ ok: false, error: 'Authentication failed.' }, 400);
  }
}

export async function onRequestGet({ request, env }) {
  return json({ authenticated: await isAuthenticated(request, env) });
}
