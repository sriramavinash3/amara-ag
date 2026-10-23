const treatmentUrls = [
  'https://www.amarapain.com/treatments/epidural-injections',
  'https://www.amarapain.com/treatments/epidural-injections/',
  'https://www.amarapain.com/treatments/nerve-blocks',
  'https://www.amarapain.com/treatments/nerve-blocks/',
  'https://www.amarapain.com/treatments/radiofrequency-ablation',
  'https://www.amarapain.com/treatments/radiofrequency-ablation/',
  'https://www.amarapain.com/treatments/spinal-cord-stimulation',
  'https://www.amarapain.com/treatments/spinal-cord-stimulation/',
  'https://www.amarapain.com/treatments/trigger-point-therapy',
  'https://www.amarapain.com/treatments/trigger-point-therapy/',
  'https://www.amarapain.com/treatments/regenerative-treatments',
  'https://www.amarapain.com/treatments/regenerative-treatments/',
  'https://www.amarapain.com/treatments/weight-loss',
  'https://www.amarapain.com/treatments/weight-loss/'
];

const legacyUrls = [
  'https://www.amarapain.com/pain-management-charlotte',
  'https://www.amarapain.com/pain-management-charlotte/',
  'https://www.amarapain.com/back-pain-doctor-charlotte',
  'https://www.amarapain.com/back-pain-doctor-charlotte/',
  'https://www.amarapain.com/neck-pain-doctor-charlotte',
  'https://www.amarapain.com/neck-pain-doctor-charlotte/',
  'https://www.amarapain.com/sciatica-treatment-charlotte',
  'https://www.amarapain.com/sciatica-treatment-charlotte/',
  'https://www.amarapain.com/spine-pain-specialist-charlotte',
  'https://www.amarapain.com/spine-pain-specialist-charlotte/',
  'https://www.amarapain.com/interventional-pain-treatment',
  'https://www.amarapain.com/interventional-pain-treatment/',
  'https://www.amarapain.com/schedule-consultation',
  'https://www.amarapain.com/schedule-consultation/'
];

async function checkChain(url) {
  let current = url;
  const chain = [];
  for (let i = 0; i < 5; i++) {
    const res = await fetch(current, { redirect: 'manual' });
    const location = res.headers.get('location');
    chain.push({ status: res.status, url: current, location });
    if (res.status >= 300 && res.status < 400 && location) {
      current = location.startsWith('http') ? location : new URL(location, current).href;
    } else {
      break;
    }
  }
  return chain;
}

async function audit() {
  console.log('--- Treatment URLs Redirect Chains ---');
  for (const url of treatmentUrls) {
    const chain = await checkChain(url);
    const summary = chain.map(c => `${c.status} (${c.location || 'FINAL'})`).join(' -> ');
    console.log(`${url} => ${summary}`);
  }

  console.log('\n--- Legacy Campaign URLs Redirect Chains ---');
  for (const url of legacyUrls) {
    const chain = await checkChain(url);
    const summary = chain.map(c => `${c.status} (${c.location || 'FINAL'})`).join(' -> ');
    console.log(`${url} => ${summary}`);
  }
}

audit();
