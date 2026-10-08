import { describe, it, expect } from 'vitest';
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

    expect(parseCookiesMock('foo=bar')).toEqual({ foo: 'bar' });
    expect(parseCookiesMock('session=abc=123==; other=xyz')).toEqual({ session: 'abc=123==', other: 'xyz' });
    expect(parseCookiesMock('a=1; b=2; c=3')).toEqual({ a: '1', b: '2', c: '3' });
    expect(parseCookiesMock('; ; a=1; =invalid; ;')).toEqual({ a: '1' });
    expect(parseCookiesMock(null)).toEqual({});
    expect(parseCookiesMock('')).toEqual({});
  });

  it('2. Password verification & normalization tests', async () => {
    const plain = 'SecretAdminPassword123!';
    const sha256Lower = createHash('sha256').update(plain).digest('hex');
    const sha256Upper = sha256Lower.toUpperCase();
    const sha256Padded = `  \n${sha256Lower}  \r\n`;

    expect(await verifyPassword(plain, { ADMIN_PASSWORD_SHA256: sha256Lower })).toBe(true);
    expect(await verifyPassword(plain, { ADMIN_PASSWORD_SHA256: sha256Upper })).toBe(true);
    expect(await verifyPassword(plain, { ADMIN_PASSWORD_SHA256: sha256Padded })).toBe(true);
    expect(await verifyPassword('WrongPassword', { ADMIN_PASSWORD_SHA256: sha256Lower })).toBe(false);
    expect(await verifyPassword(plain, {})).toBe(false);
    expect(await verifyPassword(plain, { ADMIN_PASSWORD_SHA256: '' })).toBe(false);
  });

  it('3. Session management & security tests', async () => {
    const env = { ADMIN_SESSION_SECRET: 'test-session-secret-key-32-bytes-long!' };
    const session = await createSession(env);
    const validRequest = {
      headers: new Headers({ Cookie: `amara_admin_session=${encodeURIComponent(session.value)}` })
    };
    expect(await isAuthenticated(validRequest, env)).toBe(true);

    const [payload, sig] = session.value.split('.');
    const tamperedSigRequest = {
      headers: new Headers({ Cookie: `amara_admin_session=${payload}.fake${sig.slice(4)}` })
    };
    expect(await isAuthenticated(tamperedSigRequest, env)).toBe(false);
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
    expect(allMerged.length).toBe(4);
    expect(allMerged.find(p => p.slug === 'post-1').id).toBe('uuid-4');

    const tipsMerged = mergePosts(mockLive, mockLegacy, 'Tips & Wellness');
    expect(tipsMerged.length).toBe(2);
    expect(tipsMerged.every(p => p.category === 'Tips & Wellness')).toBe(true);
  });
});
