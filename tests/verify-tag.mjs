import fs from 'node:fs';
import path from 'node:path';

const slugs = [
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
const rootHasTag = rootHtml.includes('https://www.googletagmanager.com/gtag/js?id=AW-18533378516') && rootHtml.includes("gtag('config', 'AW-18533378516');");
console.log('dist/index.html has Google Tag:', rootHasTag);

console.log('\n--- 2. Checking all 7 pre-rendered treatment pages ---');
let allPassed = true;
for (const slug of slugs) {
  const filePath = path.join('./dist/treatments', slug, 'index.html');
  const exists = fs.existsSync(filePath);
  if (!exists) {
    console.error('MISSING FILE:', filePath);
    allPassed = false;
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const hasScript = content.includes('https://www.googletagmanager.com/gtag/js?id=AW-18533378516');
  const hasConfig = content.includes("gtag('config', 'AW-18533378516');");
  console.log(`${slug}: Script present = ${hasScript}, Config present = ${hasConfig}`);
  if (!hasScript || !hasConfig) allPassed = false;
}

console.log('\nAll 7 treatment landing pages contain Google Ads Tag:', allPassed);
process.exit(allPassed ? 0 : 1);
