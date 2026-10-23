import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = process.env.BASE_URL || 'https://www.amarapain.com';

const LANDING_PAGES = [
  {
    slug: 'pain-management-charlotte',
    expectedTitleSnippet: 'Pain Management Charlotte NC',
    expectedDescSnippet: 'physician-led pain management clinic'
  },
  {
    slug: 'back-pain-doctor-charlotte',
    expectedTitleSnippet: 'Back Pain Doctor Charlotte NC',
    expectedDescSnippet: 'Relieve lower back pain'
  },
  {
    slug: 'neck-pain-doctor-charlotte',
    expectedTitleSnippet: 'Neck Pain Doctor Charlotte NC',
    expectedDescSnippet: 'cervical radiculopathy'
  },
  {
    slug: 'sciatica-treatment-charlotte',
    expectedTitleSnippet: 'Sciatica Treatment Charlotte NC',
    expectedDescSnippet: 'sciatica relief'
  },
  {
    slug: 'spine-pain-specialist-charlotte',
    expectedTitleSnippet: 'Spine Pain Specialist Charlotte NC',
    expectedDescSnippet: 'spine diagnostics'
  },
  {
    slug: 'interventional-pain-treatment',
    expectedTitleSnippet: 'Interventional Pain Treatment Charlotte NC',
    expectedDescSnippet: 'outpatient interventional pain procedures'
  },
  {
    slug: 'schedule-consultation',
    expectedTitleSnippet: 'Schedule a Pain Consultation Charlotte NC',
    expectedDescSnippet: 'Schedule your pain consultation'
  }
];

async function audit() {
  console.log('========================================================================');
  console.log(`AUDITING 7 GOOGLE ADS LANDING PAGES ON TARGET: ${BASE_URL}`);
  console.log('========================================================================\n');

  let passedAll = true;
  const results = [];

  for (const page of LANDING_PAGES) {
    const trailingUrl = `${BASE_URL}/${page.slug}/`;
    const noTrailingUrl = `${BASE_URL}/${page.slug}`;

    console.log(`Checking ${trailingUrl} ...`);

    try {
      // 1. Direct trailing slash check (manual redirect to ensure no 301 to wrong URL)
      const resManual = await fetch(trailingUrl, { redirect: 'manual' });
      const statusManual = resManual.status;
      const location = resManual.headers.get('location');

      // 2. Fetch full page
      const res = await fetch(trailingUrl);
      const status = res.status;
      const html = await res.text();

      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : '';

      const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
      const desc = descMatch ? descMatch[1] : '';

      const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
      const canonical = canonicalMatch ? canonicalMatch[1] : '';

      const hasGoogleTag = html.includes('AW-18533378516');

      const is200 = statusManual === 200 || status === 200;
      const no301Workaround = statusManual !== 301;
      const titlePass = title.includes(page.expectedTitleSnippet);
      const canonicalPass = canonical === trailingUrl;
      const tagPass = hasGoogleTag;

      const pagePass = is200 && no301Workaround && titlePass && canonicalPass && tagPass;
      if (!pagePass) passedAll = false;

      results.push({
        slug: page.slug,
        trailingUrl,
        statusManual,
        location,
        status,
        title,
        titlePass,
        canonical,
        canonicalPass,
        hasGoogleTag,
        pagePass
      });

      console.log(`  -> Status: ${statusManual} | Title: "${title}" | Canonical: ${canonical} | Passed: ${pagePass}`);
    } catch (err) {
      console.error(`  -> ERROR testing ${trailingUrl}:`, err.message);
      passedAll = false;
      results.push({
        slug: page.slug,
        trailingUrl,
        error: err.message,
        pagePass: false
      });
    }
  }

  console.log('\n========================================================================');
  console.log('SUMMARY AUDIT RESULTS:');
  console.log('========================================================================');
  console.table(results.map(r => ({
    URL: `/${r.slug}/`,
    Status: r.statusManual,
    'No 301 Workaround': r.statusManual !== 301 ? 'YES' : 'FAIL (301 redirecting)',
    'Correct Title': r.titlePass ? 'PASS' : 'FAIL',
    'Canonical /': r.canonicalPass ? 'PASS' : 'FAIL',
    'Google Ads Tag': r.hasGoogleTag ? 'ACTIVE' : 'MISSING',
    'Overall Pass': r.pagePass ? 'PASS' : 'FAIL'
  })));

  return passedAll;
}

audit().then(success => {
  if (!success) {
    console.warn('\nSome checks flagged issues on the target environment.');
  } else {
    console.log('\nAll 7 Google Ads landing pages passed production validation!');
  }
});
