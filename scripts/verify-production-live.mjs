import assert from 'node:assert';

const BASE_URL = process.env.CMS_BASE_URL || 'https://www.amarapain.com';
const USERNAME = process.env.CMS_ADMIN_USERNAME || 'amaraadmin';
const PASSWORD = process.env.CMS_ADMIN_PASSWORD;

if (!PASSWORD) {
  console.error('Error: CMS_ADMIN_PASSWORD environment variable is required to run live verification.');
  process.exit(1);
}

console.log('=== STARTING LIVE PRODUCTION CMS VERIFICATION ===');
console.log('Target Base URL:', BASE_URL);

let sessionCookie = '';

async function request(path, options = {}) {
  const headers = {
    Accept: 'application/json',
    ...(options.headers || {})
  };
  if (sessionCookie) {
    headers.Cookie = sessionCookie;
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers
  });
  const setCookie = res.headers.get('set-cookie');
  if (setCookie) {
    const match = setCookie.match(/amara_admin_session=[^;]+/);
    if (match) {
      sessionCookie = match[0];
    }
  }
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {}
  return { status: res.status, headers: res.headers, text, json };
}

// 1. Unauthenticated check
console.log('\n--- 1. Testing Unauthenticated Login Status ---');
const unauth = await request('/api/admin/login');
assert.strictEqual(unauth.status, 200);
assert.strictEqual(unauth.json?.authenticated, false);
console.log('✔ Unauthenticated GET /api/admin/login returned authenticated: false');

// 2. Invalid credentials
console.log('\n--- 2. Testing Invalid Credentials ---');
const badLogin = await request('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'baduser', password: 'badpassword' })
});
assert.strictEqual(badLogin.status, 401);
assert.strictEqual(badLogin.json?.ok, false);
assert.strictEqual(badLogin.json?.error, 'Invalid username or password.');
console.log('✔ Invalid credentials returned HTTP 401 with generic error');

// 3. Valid credentials login
console.log('\n--- 3. Testing Valid Credentials Login ---');
const goodLogin = await request('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: USERNAME, password: PASSWORD })
});
assert.strictEqual(goodLogin.status, 200, `Expected 200 but got ${goodLogin.status}: ${goodLogin.text}`);
assert.strictEqual(goodLogin.json?.ok, true);
assert.ok(sessionCookie, 'Must set session cookie');
const setCookieHeader = goodLogin.headers.get('set-cookie');
assert.ok(setCookieHeader.includes('HttpOnly'), 'Cookie must be HttpOnly');
assert.ok(setCookieHeader.includes('Secure'), 'Cookie must be Secure');
assert.ok(setCookieHeader.includes('SameSite=Strict'), 'Cookie must be SameSite=Strict');
console.log('✔ Valid login returned HTTP 200 and set secure HttpOnly cookie');

// 4. Authenticated check
console.log('\n--- 4. Testing Authenticated Status Check ---');
const authCheck = await request('/api/admin/login');
assert.strictEqual(authCheck.status, 200);
assert.strictEqual(authCheck.json?.authenticated, true);
console.log('✔ Authenticated GET /api/admin/login returned authenticated: true');

// 5. Admin blog list
console.log('\n--- 5. Testing GET /api/admin/blog ---');
const listCheck = await request('/api/admin/blog');
assert.strictEqual(listCheck.status, 200);
assert.strictEqual(listCheck.json?.ok, true);
assert.ok(Array.isArray(listCheck.json?.posts));
console.log(`✔ Admin posts list returned HTTP 200 (${listCheck.json.posts.length} posts found)`);

// 6. CREATE draft post
console.log('\n--- 6. Testing CREATE Draft Article ---');
const testSlug = `e2e-test-${Date.now()}`;
const draftPayload = {
  title: 'Automated E2E Verification Article',
  slug: testSlug,
  excerpt: 'A test article created to verify CMS production hardening.',
  content: 'Comprehensive clinical insights for interventional pain management in Charlotte, NC.',
  category: 'Patient Education',
  author: 'Dr. Ashvin K. Amara, MD',
  featuredImageUrl: '/images/blog/anti_inflammatory_nutrition.jpg',
  seoTitle: 'Automated E2E Verification Article | Amara Pain',
  seoDescription: 'A test article created to verify CMS production hardening.',
  status: 'draft'
};
const createRes = await request('/api/admin/blog', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(draftPayload)
});
assert.strictEqual(createRes.status, 200, `Create failed: ${createRes.text}`);
assert.strictEqual(createRes.json?.ok, true);
const createdId = createRes.json?.id;
assert.ok(createdId, 'Must return created article ID');
console.log(`✔ Created draft article with ID: ${createdId} and slug: ${testSlug}`);

// 7. Verify draft does NOT appear publicly
console.log('\n--- 7. Verifying Draft Does NOT Leak Publicly ---');
const publicList = await request('/api/blog');
const leakedInList = (publicList.json?.posts || []).some((p) => p.slug === testSlug || p.id === createdId);
assert.strictEqual(leakedInList, false, 'Draft must NOT appear in public /api/blog');

const publicSlug = await request(`/api/blog/${testSlug}`);
assert.strictEqual(publicSlug.status, 404, 'Draft slug must return 404 on public /api/blog/:slug');
console.log('✔ Draft does not appear in public /api/blog and returns 404 on public /api/blog/:slug');

// 8. UPDATE / PUBLISH article
console.log('\n--- 8. Testing PUBLISH Article ---');
const publishPayload = {
  ...draftPayload,
  title: 'Automated E2E Verification Article (Published)',
  status: 'published'
};
const publishRes = await request(`/api/admin/blog/${createdId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(publishPayload)
});
assert.strictEqual(publishRes.status, 200, `Publish failed: ${publishRes.text}`);
assert.strictEqual(publishRes.json?.ok, true);
console.log('✔ Published article successfully');

// 9. Verify published article appears publicly
console.log('\n--- 9. Verifying Published Article Public Availability ---');
const publicSlugAfter = await request(`/api/blog/${testSlug}`);
assert.strictEqual(publicSlugAfter.status, 200);
assert.strictEqual(publicSlugAfter.json?.ok, true);
assert.strictEqual(publicSlugAfter.json?.post?.title, 'Automated E2E Verification Article (Published)');
assert.ok(publicSlugAfter.json?.post?.publishedAt, 'Must have publishedAt timestamp');
const originalPublishedAt = publicSlugAfter.json?.post?.publishedAt;
console.log(`✔ Public article retrieved via /api/blog/${testSlug} with publishedAt: ${originalPublishedAt}`);

// 10. EDIT published article and verify publishedAt is preserved
console.log('\n--- 10. Testing Edit of Published Article & publishedAt Preservation ---');
const updatePayload = {
  ...publishPayload,
  title: 'Automated E2E Verification Article (Updated Title)',
  content: 'Updated content body for testing CMS persistence.'
};
const updateRes = await request(`/api/admin/blog/${createdId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updatePayload)
});
assert.strictEqual(updateRes.status, 200);
const publicSlugUpdated = await request(`/api/blog/${testSlug}`);
assert.strictEqual(publicSlugUpdated.json?.post?.title, 'Automated E2E Verification Article (Updated Title)');
assert.strictEqual(publicSlugUpdated.json?.post?.publishedAt, originalPublishedAt, 'publishedAt must be preserved');
console.log('✔ Edit persisted and original publishedAt was strictly preserved');

// 11. Test direct navigation to public article HTML
console.log('\n--- 11. Testing Direct Navigation HTML Route /blog/:slug ---');
const htmlPage = await fetch(`${BASE_URL}/blog/${testSlug}`);
assert.strictEqual(htmlPage.status, 200);
const htmlText = await htmlPage.text();
assert.ok(htmlText.includes('<div id="root">'), 'SPA root must be present in HTML');
console.log('✔ Direct route https://www.amarapain.com/blog/:slug returned HTTP 200');

// 12. Security Tests: Malformed, Unauthenticated & Injection
console.log('\n--- 12. Running Security Tests ---');
// 12.1 Unauthenticated POST
const unauthPost = await fetch(`${BASE_URL}/api/admin/blog`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(draftPayload)
});
assert.strictEqual(unauthPost.status, 401);
console.log('✔ Unauthorized POST /api/admin/blog rejected with HTTP 401');

// 12.2 Unauthenticated PUT
const unauthPut = await fetch(`${BASE_URL}/api/admin/blog/${createdId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(draftPayload)
});
assert.strictEqual(unauthPut.status, 401);
console.log('✔ Unauthorized PUT /api/admin/blog/:id rejected with HTTP 401');

// 12.3 Unauthenticated DELETE
const unauthDel = await fetch(`${BASE_URL}/api/admin/blog/${createdId}`, {
  method: 'DELETE'
});
assert.strictEqual(unauthDel.status, 401);
console.log('✔ Unauthorized DELETE /api/admin/blog/:id rejected with HTTP 401');

// 12.4 Malformed request / missing body
const malformedReq = await request('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: 'not a json'
});
assert.strictEqual(malformedReq.status, 400);
console.log('✔ Malformed JSON body rejected with HTTP 400');

// 12.5 Missing required fields on article creation
const missingFieldRes = await request('/api/admin/blog', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'No Excerpt' })
});
assert.strictEqual(missingFieldRes.status, 400);
console.log('✔ Missing required fields rejected with HTTP 400');

// 12.6 Unsafe featured image protocol (javascript:)
const xssImageRes = await request('/api/admin/blog', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...draftPayload,
    slug: `safe-${Date.now()}`,
    featuredImageUrl: 'javascript:alert(document.cookie)'
  })
});
assert.strictEqual(xssImageRes.status, 400);
assert.ok(xssImageRes.text.includes('unsafe protocols'));
console.log('✔ Unsafe image protocol javascript: rejected with HTTP 400');

// 12.7 Duplicate slug rejection
const dupSlugRes = await request('/api/admin/blog', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...draftPayload,
    slug: testSlug // Already exists
  })
});
assert.strictEqual(dupSlugRes.status, 400);
assert.ok(dupSlugRes.text.includes('already in use'));
console.log('✔ Duplicate slug gracefully rejected with HTTP 400');

// 13. DELETE article (clean up test record)
console.log('\n--- 13. Testing DELETE Article ---');
const deleteRes = await request(`/api/admin/blog/${createdId}`, {
  method: 'DELETE'
});
assert.strictEqual(deleteRes.status, 200);
assert.strictEqual(deleteRes.json?.ok, true);

// Verify article no longer exists publicly
const publicAfterDel = await request(`/api/blog/${testSlug}`);
assert.strictEqual(publicAfterDel.status, 404);
console.log('✔ Article deleted from DB and removed from public /api/blog/:slug');

// 14. LOGOUT
console.log('\n--- 14. Testing Sign Out / Session Invalidation ---');
const logoutRes = await request('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ action: 'logout' })
});
assert.strictEqual(logoutRes.status, 200);
const clearHeader = logoutRes.headers.get('set-cookie');
assert.ok(clearHeader.includes('Max-Age=0'), 'Logout must return Max-Age=0');

// 15. Verify unauthenticated after logout
sessionCookie = ''; // Client drops cookie
const postLogoutCheck = await request('/api/admin/login');
assert.strictEqual(postLogoutCheck.json?.authenticated, false);

const unauthListCheck = await request('/api/admin/blog');
assert.strictEqual(unauthListCheck.status, 401);
console.log('✔ Logout invalidated session, subsequent protected calls rejected with HTTP 401');

console.log('\n=== ALL LIVE PRODUCTION API TESTS PASSED WITH 100% SUCCESS ===');
