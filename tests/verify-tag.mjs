import fs from 'node:fs';
import path from 'node:path';

const GOOGLE_ADS_ID = 'AW-18239109920';
const GTM_CONTAINER_ID = 'GTM-KBRMNJMX';

const googleAdsLandingSlugs = [
  'pain-management-charlotte',
  'back-pain-doctor-charlotte',
  'neck-pain-doctor-charlotte',
  'sciatica-treatment-charlotte',
  'spine-pain-specialist-charlotte',
  'interventional-pain-treatment',
  'schedule-consultation'
];

const treatmentSlugs = [
  'epidural-injections',
  'nerve-blocks',
  'radiofrequency-ablation',
  'spinal-cord-stimulation',
  'trigger-point-therapy',
  'regenerative-treatments',
  'weight-loss'
];

console.log('--- 1. Checking dist/index.html ---');
const rootHtml = fs.readFileSync('./dist/index.html', 'utf8');
const rootHasAdsScript = rootHtml.includes(`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`);
const rootHasAdsConfig = rootHtml.includes(`gtag('config', '${GOOGLE_ADS_ID}');`);
const rootHasGtmScript = rootHtml.includes(`https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`);
const rootHasGtmNoscript = rootHtml.includes(`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`);

const rootHasTag = rootHasAdsScript && rootHasAdsConfig && rootHasGtmScript && rootHasGtmNoscript;
console.log(`dist/index.html has Google Ads Tag (${GOOGLE_ADS_ID}):`, rootHasAdsScript && rootHasAdsConfig);
console.log(`dist/index.html has GTM Container (${GTM_CONTAINER_ID}):`, rootHasGtmScript && rootHasGtmNoscript);

console.log('\n--- 2. Checking all 7 Google Ads Campaign Landing Pages ---');
let allPassed = rootHasTag;

for (const slug of googleAdsLandingSlugs) {
  const filePath = path.join('./dist', slug, 'index.html');
  const exists = fs.existsSync(filePath);
  if (!exists) {
    console.error(`MISSING FILE: ${filePath}`);
    allPassed = false;
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const hasAdsScript = content.includes(`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`);
  const hasAdsConfig = content.includes(`gtag('config', '${GOOGLE_ADS_ID}');`);
  const hasGtm = content.includes(`https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`);
  console.log(`[Google Ads Landing] ${slug}: Ads Script = ${hasAdsScript}, Ads Config = ${hasAdsConfig}, GTM = ${hasGtm}`);
  if (!hasAdsScript || !hasAdsConfig || !hasGtm) allPassed = false;
}

console.log('\n--- 3. Checking all 7 Treatment Pages ---');
for (const slug of treatmentSlugs) {
  const filePath = path.join('./dist/treatments', slug, 'index.html');
  const exists = fs.existsSync(filePath);
  if (!exists) {
    console.error(`MISSING FILE: ${filePath}`);
    allPassed = false;
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const hasAdsScript = content.includes(`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`);
  const hasAdsConfig = content.includes(`gtag('config', '${GOOGLE_ADS_ID}');`);
  const hasGtm = content.includes(`https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`);
  console.log(`[Treatment Page] ${slug}: Ads Script = ${hasAdsScript}, Ads Config = ${hasAdsConfig}, GTM = ${hasGtm}`);
  if (!hasAdsScript || !hasAdsConfig || !hasGtm) allPassed = false;
}

console.log(`\nAll landing pages and root contain Google Ads Tag (${GOOGLE_ADS_ID}) and GTM (${GTM_CONTAINER_ID}):`, allPassed);
process.exit(allPassed ? 0 : 1);
