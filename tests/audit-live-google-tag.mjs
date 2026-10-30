const BASE_URL = process.env.BASE_URL || 'https://www.amarapain.com';
const GOOGLE_ADS_ID = 'AW-18239109920';
const GTM_CONTAINER_ID = 'GTM-KBRMNJMX';

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
  console.log(`VERIFYING GOOGLE ADS TAG (${GOOGLE_ADS_ID}) & GTM (${GTM_CONTAINER_ID}) ON LIVE PRODUCTION`);
  console.log('================================================================\n');

  let allOk = true;

  for (const p of pages) {
    const url = `${BASE_URL}${p}`;
    try {
      const res = await fetch(url);
      const html = await res.text();

      const hasGtagScript = html.includes(`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`);
      const hasGtagConfig = html.includes(`gtag('config', '${GOOGLE_ADS_ID}')`);
      const hasGtmScript = html.includes(`https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`);
      const hasGtmNoscript = html.includes(`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`);

      console.log(`URL: ${url}`);
      console.log(`  HTTP Status: ${res.status}`);
      console.log(`  GTM script (${GTM_CONTAINER_ID}) present: ${hasGtmScript}`);
      console.log(`  GTM noscript (${GTM_CONTAINER_ID}) present: ${hasGtmNoscript}`);
      console.log(`  Google Ads gtag.js script (${GOOGLE_ADS_ID}) present: ${hasGtagScript}`);
      console.log(`  Google Ads gtag config (${GOOGLE_ADS_ID}) present: ${hasGtagConfig}`);

      if (!hasGtagScript || !hasGtagConfig || !hasGtmScript) {
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

  // Also verify that both Google script endpoints are reachable
  console.log('--- Checking external script reachability ---');
  try {
    const gtmScriptRes = await fetch(`https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`, { method: 'HEAD' });
    console.log(`Google Tag Manager GTM CDN HTTP Status: ${gtmScriptRes.status}`);
  } catch (err) {
    console.warn('Could not verify GTM CDN HEAD status:', err.message);
  }

  try {
    const adsScriptRes = await fetch(`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`, { method: 'HEAD' });
    console.log(`Google Ads gtag CDN HTTP Status: ${adsScriptRes.status}`);
  } catch (err) {
    console.warn('Could not verify Google Ads CDN HEAD status:', err.message);
  }

  console.log('\n================================================================');
  console.log('FINAL VERIFICATION RESULT:', allOk ? 'ALL PAGES PASSED' : 'SOME PAGES FAILED');
  console.log('================================================================');

  process.exit(allOk ? 0 : 1);
}

verifyLiveTags().catch(console.error);
