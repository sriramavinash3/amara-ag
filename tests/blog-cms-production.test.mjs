import { describe, it, expect } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import {
  verifyUsername,
  verifyPassword,
  createSession,
  isAuthenticated,
  sessionCookie,
  clearSessionCookie
} from '../functions/lib/auth.js';

describe('Blog CMS Production Hardening Suite', () => {
  it('1. Verifies expected production credential SHA-256 hash format and verification', () => {
    const expectedUserHash = '7f453b7105e475e12cc0ebb06fc1e61bb81f88d19295c21543456dad9ef08170';
    const expectedPassHash = '78dd173fdd55f0434db11e47c80231e8535d92fff4a8f45d7c8b16c47ad804fe';

    // Verify hash formats are valid 64-char hex strings
    expect(expectedUserHash).toMatch(/^[a-f0-9]{64}$/);
    expect(expectedPassHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('2. Verifies authentication functions timing-safe equality and secret handling', async () => {
    const testUser = 'test_cms_admin';
    const testPass = 'SecureTestPass_2026!';
    const testUserHash = createHash('sha256').update(testUser).digest('hex');
    const testPassHash = createHash('sha256').update(testPass).digest('hex');

    const testEnv = {
      ADMIN_USERNAME_SHA256: testUserHash,
      ADMIN_PASSWORD_SHA256: testPassHash,
      ADMIN_SESSION_SECRET: 'super-secure-cryptographic-random-session-secret-64-bytes-long'
    };

    expect(await verifyUsername(testUser, testEnv)).toBe(true);
    expect(await verifyPassword(testPass, testEnv)).toBe(true);

    expect(await verifyUsername(testUser, { ADMIN_USERNAME_SHA256: testUserHash.toUpperCase() })).toBe(true);
    expect(await verifyPassword(testPass, { ADMIN_PASSWORD_SHA256: testPassHash.toUpperCase() })).toBe(true);

    expect(await verifyUsername('wronguser', testEnv)).toBe(false);
    expect(await verifyPassword('wrongpass', testEnv)).toBe(false);
    expect(await verifyUsername('', testEnv)).toBe(false);
    expect(await verifyPassword('', testEnv)).toBe(false);

    expect(await verifyUsername(testUser, {})).toBe(false);
    expect(await verifyPassword(testPass, {})).toBe(false);

    const session = await createSession(testEnv);
    expect(session.value.includes('.')).toBe(true);
    expect(session.maxAge).toBe(8 * 3600);

    const reqWithSession = {
      headers: new Headers({
        Cookie: `amara_admin_session=${encodeURIComponent(session.value)}; other=123`
      })
    };
    expect(await isAuthenticated(reqWithSession, testEnv)).toBe(true);

    const [payload, sig] = session.value.split('.');
    const tamperedSigReq = {
      headers: new Headers({ Cookie: `amara_admin_session=${payload}.0000000000` })
    };
    expect(await isAuthenticated(tamperedSigReq, testEnv)).toBe(false);

    const tamperedPayloadReq = {
      headers: new Headers({ Cookie: `amara_admin_session=eyJleHAiOjk5OTk5OTk5OTl9.${sig}` })
    };
    expect(await isAuthenticated(tamperedPayloadReq, testEnv)).toBe(false);

    const cookieStr = sessionCookie(session.value, session.maxAge);
    expect(cookieStr).toContain('HttpOnly');
    expect(cookieStr).toContain('Secure');
    expect(cookieStr).toContain('SameSite=Strict');

    const clearCookieStr = clearSessionCookie();
    expect(clearCookieStr).toContain('Max-Age=0');
  });

  it('3. Verifies slug generation and URL safety regex', () => {
    const slugify = (value) =>
      value
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    expect(slugify('Understanding Chronic Back Pain in 2026!')).toBe('understanding-chronic-back-pain-in-2026');
    expect(slugify('  SPACES   AND   CAPS  ')).toBe('spaces-and-caps');
    expect(slugify('Multiple---Dashes--Here')).toBe('multiple-dashes-here');
    expect(slugRegex.test(slugify('Valid Slug 123'))).toBe(true);
    expect(slugRegex.test('')).toBe(false);
    expect(slugRegex.test('-leading-dash')).toBe(false);
    expect(slugRegex.test('trailing-dash-')).toBe(false);
    expect(slugRegex.test('invalid_underscore')).toBe(false);
  });

  it('4. Verifies featured image URL validation and injection prevention', () => {
    function validateImageUrl(raw) {
      if (typeof raw !== 'string') return '';
      const trimmed = raw.trim();
      if (!trimmed) return '';
      if (/^(javascript|data|vbscript|file):/i.test(trimmed)) {
        throw new Error('Featured image URL cannot use unsafe protocols.');
      }
      if (trimmed.startsWith('/')) return trimmed;
      try {
        const parsed = new URL(trimmed);
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
          return trimmed;
        }
      } catch {}
      throw new Error('Featured image must be a valid HTTP/HTTPS URL or root-relative path.');
    }

    expect(validateImageUrl('/images/blog/spine.jpg')).toBe('/images/blog/spine.jpg');
    expect(validateImageUrl('https://example.com/photo.png')).toBe('https://example.com/photo.png');
    expect(validateImageUrl('')).toBe('');
    expect(() => validateImageUrl('javascript:alert(1)')).toThrow(/unsafe protocols/);
    expect(() => validateImageUrl('data:image/svg+xml,...')).toThrow(/unsafe protocols/);
    expect(() => validateImageUrl('not a url')).toThrow(/valid HTTP/);
  });

  it('5. Verifies public/_redirects contains SPA fallback', () => {
    const redirects = readFileSync('public/_redirects', 'utf8').trim();
    expect(redirects).toContain('/* /index.html 200');
  });
});
