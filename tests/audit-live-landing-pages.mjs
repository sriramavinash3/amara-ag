import { readFileSync, existsSync } from 'node:fs';

const BASE_URL = 'https://www.amarapain.com';

const TREATMENT_SLUGS = [
  'epidural-injections',
  'nerve-blocks',
  'radiofrequency-ablation',
  'spinal-cord-stimulation',
  'trigger-point-therapy',
  'regenerative-treatments',
  'weight-loss'
];

async function runAudit() {
  console.log('================================================================');
  console.log('AUDITING ALL 7 PRODUCTION TREATMENT LANDING PAGES ON AMARAPAIN.COM');
  console.log('================================================================\n');

  const results = [];

  for (const slug of TREATMENT_SLUGS) {
    const rawUrl = `${BASE_URL}/treatments/${slug}`;
    const slashUrl = `${BASE_URL}/treatments/${slug}/`;

    console.log(`\n--------------------------------------------------------------`);
    console.log(`AUDITING TREATMENT: ${slug}`);
    console.log(`URL: ${rawUrl}`);
    console.log(`--------------------------------------------------------------`);

    // 1. Direct fetch without trailing slash (check 308 redirect)
    const directRes = await fetch(rawUrl, { redirect: 'manual' });
    const directStatus = directRes.status;
    const directLocation = directRes.headers.get('location');

    // 2. Fetch with redirect followed (simulating browser navigation)
    const start = Date.now();
    const finalRes = await fetch(rawUrl, { redirect: 'follow' });
    const loadTimeMs = Date.now() - start;
    const finalStatus = finalRes.status;
    const html = await finalRes.text();

    // 3. Inspect HTML
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : null;

    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    const desc = descMatch ? descMatch[1] : null;

    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1] : null;

    const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i);
    const ogTitle = ogTitleMatch ? ogTitleMatch[1] : null;

    const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i);
    const ogDesc = ogDescMatch ? ogDescMatch[1] : null;

    const ogUrlMatch = html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']*)["']/i);
    const ogUrl = ogUrlMatch ? ogUrlMatch[1] : null;

    const ogImgMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i);
    const ogImg = ogImgMatch ? ogImgMatch[1] : null;

    // Check pre-rendered content vs client-only shell
    const rootMatch = html.match(/<div id=["']root["']>([\s\S]*?)<\/div>/i);
    const rootInner = rootMatch ? rootMatch[1].trim() : '';
    const isPrerendered = rootInner.length > 50;

    // Check script tags / bundles
    const scriptMatches = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);

    // Check if script bundles exist on live site
    const scriptStatuses = [];
    for (const src of scriptMatches) {
      const fullSrc = src.startsWith('http') ? src : `${BASE_URL}${src}`;
      try {
        const sRes = await fetch(fullSrc, { method: 'HEAD' });
        scriptStatuses.push({ src, status: sRes.status });
      } catch (err) {
        scriptStatuses.push({ src, status: 'ERROR', error: err.message });
      }
    }

    // Check og:image accessibility
    let ogImgStatus = null;
    if (ogImg) {
      try {
        const imgRes = await fetch(ogImg, { method: 'HEAD' });
        ogImgStatus = imgRes.status;
      } catch (err) {
        ogImgStatus = `ERROR: ${err.message}`;
      }
    }

    // Check tracking scripts in HTML
    const hasGtag = /googletagmanager|gtag|google-analytics/i.test(html);
    const hasGoogleAds = /googleads|aw-[0-9]+/i.test(html);
    const hasGoogleSheets = /script\.google\.com|sheets\.googleapis/i.test(html);

    console.log(`Direct Request: HTTP ${directStatus} -> Location: ${directLocation}`);
    console.log(`Followed Request: HTTP ${finalStatus} in ${loadTimeMs}ms`);
    console.log(`Title: ${title}`);
    console.log(`Meta Description: ${desc ? desc.substring(0, 80) + '...' : 'MISSING'}`);
    console.log(`Canonical URL: ${canonical}`);
    console.log(`og:title: ${ogTitle}`);
    console.log(`og:url: ${ogUrl}`);
    console.log(`og:image: ${ogImg} (HTTP ${ogImgStatus})`);
    console.log(`HTML Body Size: ${html.length} bytes`);
    console.log(`Is React Pre-rendered (SSR/SSG): ${isPrerendered ? 'YES' : 'NO (Client SPA Shell)'}`);
    console.log(`Script Bundles: ${JSON.stringify(scriptStatuses)}`);
    console.log(`Tracking Tags: GTM/GTag=${hasGtag}, GoogleAds=${hasGoogleAds}, GoogleSheets=${hasGoogleSheets}`);

    results.push({
      slug,
      rawUrl,
      slashUrl,
      directStatus,
      directLocation,
      finalStatus,
      loadTimeMs,
      title,
      desc,
      canonical,
      ogTitle,
      ogDesc,
      ogUrl,
      ogImg,
      ogImgStatus,
      isPrerendered,
      scriptStatuses,
      hasGtag,
      hasGoogleAds,
      hasGoogleSheets
    });
  }

  console.log('\n\n================================================================');
  console.log('SUMMARY AUDIT TABLE');
  console.log('================================================================');
  console.table(results.map(r => ({
    Treatment: r.slug,
    'HTTP Status': r.finalStatus,
    'Direct Redirect': `${r.directStatus} -> ${r.directLocation}`,
    Title: r.title ? 'OK' : 'MISSING',
    Canonical: r.canonical === r.slashUrl ? 'MATCH (TRAILING /)' : (r.canonical ? 'DIFF' : 'MISSING'),
    'og:image': r.ogImgStatus === 200 ? '200 OK' : 'FAILED',
    Scripts: r.scriptStatuses.every(s => s.status === 200) ? 'ALL 200' : 'FAIL',
    'GTag/Ads': r.hasGtag || r.hasGoogleAds ? 'PRESENT' : 'NONE',
    'Sheets Integration': r.hasGoogleSheets ? 'PRESENT' : 'NONE'
  })));
}

runAudit().catch(console.error);
