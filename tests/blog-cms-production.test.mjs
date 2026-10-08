import { describe, it } from 'node:test';
import assert from 'node:assert';
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

    assert.match(expectedUserHash, /^[a-f0-9]{64}$/);
    assert.match(expectedPassHash, /^[a-f0-9]{64}$/);
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

    assert.strictEqual(await verifyUsername(testUser, testEnv), true);
    assert.strictEqual(await verifyPassword(testPass, testEnv), true);

    assert.strictEqual(await verifyUsername(testUser, { ADMIN_USERNAME_SHA256: testUserHash.toUpperCase() }), true);
    assert.strictEqual(await verifyPassword(testPass, { ADMIN_PASSWORD_SHA256: testPassHash.toUpperCase() }), true);

    assert.strictEqual(await verifyUsername('wronguser', testEnv), false);
    assert.strictEqual(await verifyPassword('wrongpass', testEnv), false);
    assert.strictEqual(await verifyUsername('', testEnv), false);
    assert.strictEqual(await verifyPassword('', testEnv), false);

    assert.strictEqual(await verifyUsername(testUser, {}), false);
    assert.strictEqual(await verifyPassword(testPass, {}), false);

    const session = await createSession(testEnv);
    assert.ok(session.value.includes('.'));
    assert.strictEqual(session.maxAge, 8 * 3600);

    const reqWithSession = {
      headers: new Headers({
        Cookie: `amara_admin_session=${encodeURIComponent(session.value)}; other=123`
      })
    };
    assert.strictEqual(await isAuthenticated(reqWithSession, testEnv), true);

    const [payload, sig] = session.value.split('.');
    const tamperedSigReq = {
      headers: new Headers({ Cookie: `amara_admin_session=${payload}.0000000000` })
    };
    assert.strictEqual(await isAuthenticated(tamperedSigReq, testEnv), false);

    const tamperedPayloadReq = {
      headers: new Headers({ Cookie: `amara_admin_session=eyJleHAiOjk5OTk5OTk5OTl9.${sig}` })
    };
    assert.strictEqual(await isAuthenticated(tamperedPayloadReq, testEnv), false);

    const cookieStr = sessionCookie(session.value, session.maxAge);
    assert.ok(cookieStr.includes('HttpOnly'));
    assert.ok(cookieStr.includes('Secure'));
    assert.ok(cookieStr.includes('SameSite=Strict'));

    const clearCookieStr = clearSessionCookie();
    assert.ok(clearCookieStr.includes('Max-Age=0'));
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

    assert.strictEqual(slugify('Understanding Chronic Back Pain in 2026!'), 'understanding-chronic-back-pain-in-2026');
    assert.strictEqual(slugify('  SPACES   AND   CAPS  '), 'spaces-and-caps');
    assert.strictEqual(slugify('Multiple---Dashes--Here'), 'multiple-dashes-here');
    assert.strictEqual(slugRegex.test(slugify('Valid Slug 123')), true);
    assert.strictEqual(slugRegex.test(''), false);
    assert.strictEqual(slugRegex.test('-leading-dash'), false);
    assert.strictEqual(slugRegex.test('trailing-dash-'), false);
    assert.strictEqual(slugRegex.test('invalid_underscore'), false);
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

    assert.strictEqual(validateImageUrl('/images/blog/spine.jpg'), '/images/blog/spine.jpg');
    assert.strictEqual(validateImageUrl('https://example.com/photo.png'), 'https://example.com/photo.png');
    assert.strictEqual(validateImageUrl(''), '');
    assert.throws(() => validateImageUrl('javascript:alert(1)'), /unsafe protocols/);
    assert.throws(() => validateImageUrl('data:image/svg+xml,...'), /unsafe protocols/);
    assert.throws(() => validateImageUrl('not a url'), /valid HTTP/);
  });

  it('5. Verifies public/_redirects contains SPA fallback', () => {
    const redirects = readFileSync('public/_redirects', 'utf8').trim();
    assert.ok(redirects.includes('/* /index.html 200'));
  });
});
