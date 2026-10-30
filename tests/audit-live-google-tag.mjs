const BASE_URL = process.env.BASE_URL || 'https://www.amarapain.com';
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
  console.log(`VERIFYING OFFICIAL GOOGLE TAG MANAGER (${GTM_CONTAINER_ID}) ON PRODUCTION`);
  console.log('================================================================\n');

  let allOk = true;

  for (const p of pages) {
    const url = `${BASE_URL}${p}`;
    try {
      const res = await fetch(url);
      const html = await res.text();

      const hasGtmScript = html.includes(`https://www.googletagmanager.com/gtm.js?id='+i+dl`) && html.includes(GTM_CONTAINER_ID);
      const hasGtmNoscript = html.includes(`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`);
      const hasDataLayerInit = html.includes('window.dataLayer = window.dataLayer || [];');
      const matches = html.match(new RegExp(GTM_CONTAINER_ID, 'g')) || [];
      const hasNoDuplicates = matches.length === 2; // 1 in head, 1 in body noscript

      console.log(`URL: ${url}`);
      console.log(`  HTTP Status: ${res.status}`);
      console.log(`  GTM official loader in <head>: ${hasGtmScript}`);
      console.log(`  GTM noscript in <body>: ${hasGtmNoscript}`);
      console.log(`  dataLayer initialized: ${hasDataLayerInit}`);
      console.log(`  No duplicate containers (count: ${matches.length}): ${hasNoDuplicates}`);

      if (!hasGtmScript || !hasGtmNoscript || !hasDataLayerInit || !hasNoDuplicates) {
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

  // Also verify that GTM CDN endpoint is reachable
  console.log('--- Checking GTM CDN script reachability ---');
  try {
    const gtmScriptRes = await fetch(`https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`, { method: 'HEAD' });
    console.log(`Google Tag Manager GTM CDN HTTP Status: ${gtmScriptRes.status}`);
  } catch (err) {
    console.warn('Could not verify GTM CDN HEAD status:', err.message);
  }

  console.log('\n================================================================');
  console.log('FINAL VERIFICATION RESULT:', allOk ? 'ALL PAGES PASSED' : 'SOME PAGES FAILED');
  console.log('================================================================');

  process.exit(allOk ? 0 : 1);
}

verifyLiveTags().catch(console.error);
