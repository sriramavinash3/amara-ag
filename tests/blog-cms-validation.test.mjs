import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createHash } from 'node:crypto';
import { verifyPassword, isAuthenticated, createSession } from '../functions/lib/auth.js';

describe('Blog CMS Validation Suite', () => {
  it('1. Cookie parser tests', () => {
    function parseCookiesMock(cookieHeader) {
      const raw = cookieHeader || '';
      return Object.fromEntries(
        raw
          .split(';')
          .map((part) => {
            const idx = part.indexOf('=');
            return idx === -1
              ? []
              : [
                  part.slice(0, idx).trim(),
                  decodeURIComponent(part.slice(idx + 1).trim()),
                ];
          })
          .filter(([key]) => key)
      );
    }

    assert.deepStrictEqual(parseCookiesMock('foo=bar'), { foo: 'bar' });
    assert.deepStrictEqual(parseCookiesMock('session=abc=123==; other=xyz'), { session: 'abc=123==', other: 'xyz' });
    assert.deepStrictEqual(parseCookiesMock('a=1; b=2; c=3'), { a: '1', b: '2', c: '3' });
    assert.deepStrictEqual(parseCookiesMock('; ; a=1; =invalid; ;'), { a: '1' });
    assert.deepStrictEqual(parseCookiesMock(null), {});
    assert.deepStrictEqual(parseCookiesMock(''), {});
  });

  it('2. Password verification & normalization tests', async () => {
    const plain = 'SecretAdminPassword123!';
    const sha256Lower = createHash('sha256').update(plain).digest('hex');
    const sha256Upper = sha256Lower.toUpperCase();
    const sha256Padded = `  \n${sha256Lower}  \r\n`;

    assert.strictEqual(await verifyPassword(plain, { ADMIN_PASSWORD_SHA256: sha256Lower }), true);
    assert.strictEqual(await verifyPassword(plain, { ADMIN_PASSWORD_SHA256: sha256Upper }), true);
    assert.strictEqual(await verifyPassword(plain, { ADMIN_PASSWORD_SHA256: sha256Padded }), true);
    assert.strictEqual(await verifyPassword('WrongPassword', { ADMIN_PASSWORD_SHA256: sha256Lower }), false);
    assert.strictEqual(await verifyPassword(plain, {}), false);
    assert.strictEqual(await verifyPassword(plain, { ADMIN_PASSWORD_SHA256: '' }), false);
  });

  it('3. Session management & security tests', async () => {
    const env = { ADMIN_SESSION_SECRET: 'test-session-secret-key-32-bytes-long!' };
    const session = await createSession(env);
    const validRequest = {
      headers: new Headers({ Cookie: `amara_admin_session=${encodeURIComponent(session.value)}` })
    };
    assert.strictEqual(await isAuthenticated(validRequest, env), true);

    const [payload, sig] = session.value.split('.');
    const tamperedSigRequest = {
      headers: new Headers({ Cookie: `amara_admin_session=${payload}.fake${sig.slice(4)}` })
    };
    assert.strictEqual(await isAuthenticated(tamperedSigRequest, env), false);
  });

  it('4. Category filtering & duplicate suppression tests', () => {
    const mockLegacy = [
      { id: 'post-1', slug: 'post-1', title: 'Post 1', category: 'Patient Education' },
      { id: 'post-2', slug: 'post-2', title: 'Post 2', category: 'Tips & Wellness' },
      { id: 'post-3', slug: 'post-3', title: 'Post 3', category: 'Billing & Insurance' },
    ];

    const mockLive = [
      { id: 'uuid-4', slug: 'post-1', title: 'Post 1 Updated in CMS', category: 'Patient Education' },
      { id: 'uuid-5', slug: 'live-post-5', title: 'Live Post 5', category: 'Tips & Wellness' },
    ];

    function mergePosts(live, legacy, category = '') {
      const liveSlugs = new Set(live.map(p => p.slug || p.id));
      const legacyVisible = legacy.filter(
        (post) => !liveSlugs.has(post.slug || post.id) && (!category || post.category === category)
      );
      const filteredLive = category ? live.filter(p => p.category === category) : live;
      return [...filteredLive, ...legacyVisible];
    }

    const allMerged = mergePosts(mockLive, mockLegacy, '');
    assert.strictEqual(allMerged.length, 4);
    assert.strictEqual(allMerged.find(p => p.slug === 'post-1').id, 'uuid-4');

    const tipsMerged = mergePosts(mockLive, mockLegacy, 'Tips & Wellness');
    assert.strictEqual(tipsMerged.length, 2);
    assert.strictEqual(tipsMerged.every(p => p.category === 'Tips & Wellness'), true);
  });
});
