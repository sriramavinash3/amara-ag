async function verifyLive() {
  console.log('--- 1. Testing Production Page Responses ---');
  const urls = [
    'https://www.amarapain.com/',
    'https://amarapain.com/',
    'https://www.amarapain.com/about',
    'https://www.amarapain.com/conditions/back-pain'
  ];

  for (const url of urls) {
    const res = await fetch(url);
    const html = await res.text();
    console.log('\n=== URL:', url, 'STATUS:', res.status, '===');
    
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');

    const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="(.*?)"/);
    console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NOT FOUND');

    const ogTitle = html.match(/<meta\s+property="og:title"\s+content="(.*?)"/);
    console.log('og:title:', ogTitle ? ogTitle[1] : 'NOT FOUND');

    const ogDesc = html.match(/<meta\s+property="og:description"\s+content="(.*?)"/);
    console.log('og:description:', ogDesc ? ogDesc[1] : 'NOT FOUND');

    const ogImage = html.match(/<meta\s+property="og:image"\s+content="(.*?)"/);
    console.log('og:image:', ogImage ? ogImage[1] : 'NOT FOUND');

    const twCard = html.match(/<meta\s+name="twitter:card"\s+content="(.*?)"/);
    console.log('twitter:card:', twCard ? twCard[1] : 'NOT FOUND');

    const twImage = html.match(/<meta\s+name="twitter:image"\s+content="(.*?)"/);
    console.log('twitter:image:', twImage ? twImage[1] : 'NOT FOUND');
  }

  console.log('\n--- 2. Testing Social Sharing Image URL Accessibility ---');
  const imgRes = await fetch('https://www.amarapain.com/images/og-image.png');
  console.log('og-image.png STATUS:', imgRes.status, 'CONTENT-TYPE:', imgRes.headers.get('content-type'), 'LENGTH:', imgRes.headers.get('content-length'));

  const previewRes = await fetch('https://www.amarapain.com/images/og-preview.png');
  console.log('og-preview.png STATUS:', previewRes.status, 'CONTENT-TYPE:', previewRes.headers.get('content-type'), 'LENGTH:', previewRes.headers.get('content-length'));

  console.log('\n--- 3. Testing Social Crawler User-Agents ---');
  const crawlers = [
    { name: 'Facebook externalhit', ua: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)' },
    { name: 'Twitterbot', ua: 'Twitterbot/1.0' },
    { name: 'LinkedInBot', ua: 'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)' },
    { name: 'WhatsApp', ua: 'WhatsApp/2.21.12.21 N' },
    { name: 'Slackbot', ua: 'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)' }
  ];

  for (const crawler of crawlers) {
    const res = await fetch('https://www.amarapain.com/', { headers: { 'User-Agent': crawler.ua } });
    const html = await res.text();
    const hasTitle = html.includes('Amara Pain | Advanced Interventional Pain Specialists');
    const hasImage = html.includes('https://www.amarapain.com/images/og-image.png');
    const hasDesc = html.includes("Charlotte's leading interventional specialists delivering advanced, evidence-based pain relief");
    console.log(`[${crawler.name}] HTTP ${res.status} | Title OK: ${hasTitle} | Image OK: ${hasImage} | Caption OK: ${hasDesc}`);
  }
}

verifyLive().catch(console.error);
