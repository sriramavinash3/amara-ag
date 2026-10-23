const BASE_URL = 'https://www.amarapain.com';

const pages = [
  '/',
  '/treatments/epidural-injections/',
  '/treatments/nerve-blocks/',
  '/treatments/radiofrequency-ablation/',
  '/treatments/spinal-cord-stimulation/',
  '/treatments/trigger-point-therapy/',
  '/treatments/regenerative-treatments/',
  '/treatments/weight-loss/'
];

async function verifyLiveTags() {
  console.log('================================================================');
  console.log('VERIFYING GOOGLE ADS TAG ON LIVE PRODUCTION (AMARAPAIN.COM)');
  console.log('================================================================\n');

  let allOk = true;

  for (const p of pages) {
    const url = `${BASE_URL}${p}`;
    const res = await fetch(url);
    const html = await res.text();

    const hasGtagScript = html.includes('https://www.googletagmanager.com/gtag/js?id=AW-18533378516');
    const hasGtagConfig = html.includes("gtag('config', 'AW-18533378516')");
    const isImmediatelyAfterHead = /<head>\s*<!-- Google tag \(gtag\.js\) -->\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=AW-18533378516">/i.test(html);

    console.log(`URL: ${url}`);
    console.log(`  HTTP Status: ${res.status}`);
    console.log(`  gtag.js script present: ${hasGtagScript}`);
    console.log(`  gtag config AW-18533378516 present: ${hasGtagConfig}`);
    console.log(`  Immediately after <head>: ${isImmediatelyAfterHead}`);

    if (!hasGtagScript || !hasGtagConfig) {
      allOk = false;
      console.error(`  ❌ FAILED on ${url}`);
    } else {
      console.log(`  ✅ PASSED`);
    }
    console.log('');
  }

  // Also verify that the Google script endpoint is reachable
  console.log('--- Checking external script reachability ---');
  const googleScriptRes = await fetch('https://www.googletagmanager.com/gtag/js?id=AW-18533378516', { method: 'HEAD' });
  console.log('Google Tag Manager CDN HTTP Status:', googleScriptRes.status);

  console.log('\n================================================================');
  console.log('FINAL VERIFICATION RESULT:', allOk ? 'ALL PAGES PASSED' : 'SOME PAGES FAILED');
  console.log('================================================================');

  process.exit(allOk ? 0 : 1);
}

verifyLiveTags().catch(console.error);
