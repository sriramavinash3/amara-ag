const COOKIE_NAME = 'amara_admin_session';
const SESSION_TTL_SECONDS = 8 * 60 * 60;

function hex(buffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function digest(value) {
  return hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return hex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value)));
}

function parseCookies(request) {
  const raw = request.headers.get('Cookie') || '';
  return Object.fromEntries(
    raw.split(';').map((part) => part.trim().split('=').map(decodeURIComponent)).filter(([k]) => k)
  );
}

export async function verifyPassword(password, env) {
  if (!env.ADMIN_PASSWORD_SHA256) return false;
  const actual = await digest(password);
  if (actual.length !== env.ADMIN_PASSWORD_SHA256.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i += 1) diff |= actual.charCodeAt(i) ^ env.ADMIN_PASSWORD_SHA256.charCodeAt(i);
  return diff === 0;
}

export async function createSession(env) {
  if (!env.ADMIN_SESSION_SECRET) throw new Error('ADMIN_SESSION_SECRET is not configured');
  const payload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS }));
  const signature = await hmac(payload, env.ADMIN_SESSION_SECRET);
  return { value: `${payload}.${signature}`, maxAge: SESSION_TTL_SECONDS };
}

export async function isAuthenticated(request, env) {
  if (!env.ADMIN_SESSION_SECRET) return false;
  const token = parseCookies(request)[COOKIE_NAME];
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = await hmac(payload, env.ADMIN_SESSION_SECRET);
  if (signature.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i += 1) diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  if (diff !== 0) return false;
  try {
    const data = JSON.parse(atob(payload));
    return Number.isFinite(data.exp) && data.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export const sessionCookie = (value, maxAge) =>
  `${COOKIE_NAME}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Strict`;

export const clearSessionCookie = () =>
  `${COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict`;

export function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extraHeaders }
  });
}
