import {
  createSession,
  verifyPassword,
  verifyUsername,
  sessionCookie,
  clearSessionCookie,
  json,
  isAuthenticated
} from '../../lib/auth.js';

// In-memory rate limiting fallback for local development or D1 unavailability
const memoryRateLimits = new Map();

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;

function getClientIp(request) {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return 'unknown';
}

function sameOrigin(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return true;
  try {
    const originHost = new URL(origin).hostname.replace(/^www\./, '');
    const requestHost = new URL(request.url).hostname.replace(/^www\./, '');
    return originHost === requestHost;
  } catch {
    return false;
  }
}

async function isRateLimited(ip, env) {
  const now = Date.now();
  if (env.BLOG_DB) {
    try {
      const row = await env.BLOG_DB.prepare(
        'SELECT attempts, locked_until FROM login_rate_limit WHERE ip = ?'
      ).bind(ip).first();
      if (row && row.locked_until > now) {
        return { limited: true, retryAfter: Math.ceil((row.locked_until - now) / 1000) };
      }
      return { limited: false };
    } catch {
      // Fall back to memory on DB query failure
    }
  }

  const mem = memoryRateLimits.get(ip);
  if (mem && mem.locked_until > now) {
    return { limited: true, retryAfter: Math.ceil((mem.locked_until - now) / 1000) };
  }
  return { limited: false };
}

async function recordFailedAttempt(ip, env) {
  const now = Date.now();
  if (env.BLOG_DB) {
    try {
      const row = await env.BLOG_DB.prepare(
        'SELECT attempts, locked_until, updated_at FROM login_rate_limit WHERE ip = ?'
      ).bind(ip).first();

      let attempts = 1;
      if (row && now - row.updated_at < ATTEMPT_WINDOW_MS) {
        attempts = row.attempts + 1;
      }

      const lockedUntil = attempts >= MAX_FAILED_ATTEMPTS ? now + LOCKOUT_MS : 0;

      await env.BLOG_DB.prepare(`
        INSERT INTO login_rate_limit (ip, attempts, locked_until, updated_at)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(ip) DO UPDATE SET
          attempts = excluded.attempts,
          locked_until = excluded.locked_until,
          updated_at = excluded.updated_at
      `).bind(ip, attempts, lockedUntil, now).run();

      return attempts >= MAX_FAILED_ATTEMPTS;
    } catch {
      // Fall back to memory
    }
  }

  const mem = memoryRateLimits.get(ip) || { attempts: 0, updated_at: now };
  const attempts = (now - mem.updated_at < ATTEMPT_WINDOW_MS ? mem.attempts : 0) + 1;
  const lockedUntil = attempts >= MAX_FAILED_ATTEMPTS ? now + LOCKOUT_MS : 0;
  memoryRateLimits.set(ip, { attempts, locked_until: lockedUntil, updated_at: now });
  return attempts >= MAX_FAILED_ATTEMPTS;
}

async function resetRateLimit(ip, env) {
  if (env.BLOG_DB) {
    try {
      await env.BLOG_DB.prepare('DELETE FROM login_rate_limit WHERE ip = ?').bind(ip).run();
    } catch {
      // Ignore cleanup error
    }
  }
  memoryRateLimits.delete(ip);
}

export async function onRequestPost({ request, env }) {
  try {
    if (!sameOrigin(request)) {
      return json({ ok: false, error: 'Invalid request origin.' }, 403);
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return json({ ok: false, error: 'Malformed request.' }, 400);
    }

    if (body.action === 'logout') {
      return json({ ok: true }, 200, { 'Set-Cookie': clearSessionCookie() });
    }

    const ip = getClientIp(request);

    // 1. Check existing rate limit lockout
    const rateStatus = await isRateLimited(ip, env);
    if (rateStatus.limited) {
      return json(
        { ok: false, error: 'Too many failed login attempts. Please try again later.' },
        429,
        { 'Retry-After': String(rateStatus.retryAfter || 900) }
      );
    }

    // 2. Validate input fields
    const username = typeof body.username === 'string' ? body.username.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (!username || !password) {
      await recordFailedAttempt(ip, env);
      return json({ ok: false, error: 'Invalid username or password.' }, 401);
    }

    // 3. Verify credentials against Cloudflare Pages secrets
    const validUser = await verifyUsername(username, env);
    const validPass = await verifyPassword(password, env);
    const valid = validUser && validPass;

    if (!valid) {
      const lockedNow = await recordFailedAttempt(ip, env);
      if (lockedNow) {
        return json(
          { ok: false, error: 'Too many failed login attempts. Please try again later.' },
          429,
          { 'Retry-After': '900' }
        );
      }
      return json({ ok: false, error: 'Invalid username or password.' }, 401);
    }

    // 4. Successful login: reset failed attempts and generate secure session
    await resetRateLimit(ip, env);
    const session = await createSession(env);
    return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(session.value, session.maxAge) });
  } catch {
    return json({ ok: false, error: 'Authentication failed.' }, 400);
  }
}

export async function onRequestGet({ request, env }) {
  return json({ authenticated: await isAuthenticated(request, env) });
}
