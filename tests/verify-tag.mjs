import fs from 'node:fs';
import path from 'node:path';

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

const rootHasGtmLoader = rootHtml.includes(`https://www.googletagmanager.com/gtm.js?id='+i+dl`) && rootHtml.includes(GTM_CONTAINER_ID);
const rootHasGtmNoscript = rootHtml.includes(`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`);
const rootHasDataLayerInit = rootHtml.includes('window.dataLayer = window.dataLayer || [];');
const rootHasNoDuplicateGtm = (rootHtml.match(new RegExp(GTM_CONTAINER_ID, 'g')) || []).length === 2; // 1 in head script, 1 in body noscript

console.log(`dist/index.html has Official GTM (${GTM_CONTAINER_ID}) in head:`, rootHasGtmLoader);
console.log(`dist/index.html has GTM noscript in body:`, rootHasGtmNoscript);
console.log(`dist/index.html has dataLayer initialization:`, rootHasDataLayerInit);
console.log(`dist/index.html has no duplicate GTM containers:`, rootHasNoDuplicateGtm);

const rootPassed = rootHasGtmLoader && rootHasGtmNoscript && rootHasDataLayerInit && rootHasNoDuplicateGtm;
let allPassed = rootPassed;

console.log('\n--- 2. Checking all 7 Google Ads Campaign Landing Pages ---');
for (const slug of googleAdsLandingSlugs) {
  const filePath = path.join('./dist', slug, 'index.html');
  const exists = fs.existsSync(filePath);
  if (!exists) {
    console.error(`MISSING FILE: ${filePath}`);
    allPassed = false;
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const hasGtm = content.includes(GTM_CONTAINER_ID);
  const hasNoscript = content.includes(`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`);
  console.log(`[Google Ads Landing] ${slug}: GTM = ${hasGtm}, noscript = ${hasNoscript}`);
  if (!hasGtm || !hasNoscript) allPassed = false;
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
  const hasGtm = content.includes(GTM_CONTAINER_ID);
  const hasNoscript = content.includes(`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`);
  console.log(`[Treatment Page] ${slug}: GTM = ${hasGtm}, noscript = ${hasNoscript}`);
  if (!hasGtm || !hasNoscript) allPassed = false;
}

console.log(`\nAll landing pages and root contain official GTM (${GTM_CONTAINER_ID}):`, allPassed);
process.exit(allPassed ? 0 : 1);
