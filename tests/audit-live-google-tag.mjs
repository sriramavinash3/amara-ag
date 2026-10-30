const BASE_URL = process.env.BASE_URL || 'https://www.amarapain.com';
const GOOGLE_ADS_ID = 'AW-18239109920';

const pages = [
  '/',
  '/pain-management-charlotte/',
  '/back-pain-doctor-charlotte/',
  '/neck-pain-doctor-charlotte/',
  '/sciatica-treatment-charlotte/',
  '/spine-pain-specialist-charlotte/',
  '/interventional-pain-treatment/',
  '/schedule-consultation/'
];

async function verifyLiveTags() {
  console.log('================================================================');
  console.log(`VERIFYING GOOGLE ADS TAG (${GOOGLE_ADS_ID}) ON LIVE PRODUCTION`);
  console.log('================================================================\n');

  let allOk = true;

  for (const p of pages) {
    const url = `${BASE_URL}${p}`;
    try {
      const res = await fetch(url);
      const html = await res.text();

      const hasGtagScript = html.includes(`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`);
      const hasGtagConfig = html.includes(`gtag('config', '${GOOGLE_ADS_ID}')`);
      const hasDuplicateTag = (html.match(new RegExp(GOOGLE_ADS_ID, 'g')) || []).length > 2;
      const isImmediatelyAfterHead = new RegExp(`<head>\\s*<!-- Google tag \\(gtag\\.js\\) -->\\s*<script async src="https:\\/\\/www\\.googletagmanager\\.com\\/gtag\\/js\\?id=${GOOGLE_ADS_ID}">`, 'i').test(html);

      console.log(`URL: ${url}`);
      console.log(`  HTTP Status: ${res.status}`);
      console.log(`  gtag.js script (${GOOGLE_ADS_ID}) present: ${hasGtagScript}`);
      console.log(`  gtag config (${GOOGLE_ADS_ID}) present: ${hasGtagConfig}`);
      console.log(`  Immediately after <head>: ${isImmediatelyAfterHead}`);
      console.log(`  Duplicate tag check passed: ${!hasDuplicateTag}`);

      if (!hasGtagScript || !hasGtagConfig) {
        allOk = false;
        console.error(`  ❌ FAILED on ${url}`);
      } else {
        console.log(`  ✅ PASSED`);
      }
    } catch (err) {
      allOk = false;
      console.error(`  ❌ ERROR fetching ${url}:`, err.message);
    }
    console.log('');
  }

  // Also verify that the Google script endpoint is reachable
  console.log('--- Checking external script reachability ---');
  try {
    const googleScriptRes = await fetch(`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`, { method: 'HEAD' });
    console.log('Google Tag Manager CDN HTTP Status:', googleScriptRes.status);
  } catch (err) {
    console.warn('Could not verify CDN HEAD status:', err.message);
  }

  console.log('\n================================================================');
  console.log('FINAL VERIFICATION RESULT:', allOk ? 'ALL PAGES PASSED' : 'SOME PAGES FAILED');
  console.log('================================================================');

  process.exit(allOk ? 0 : 1);
}

verifyLiveTags().catch(console.error);
