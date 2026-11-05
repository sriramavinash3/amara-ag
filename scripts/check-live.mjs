async function check() {
  const res = await fetch('https://www.amarapain.com/index.html');
  const html = await res.text();
  const match = html.match(/\/assets\/index-[a-zA-Z0-9_-]+\.js/);
  console.log('Live script bundle:', match ? match[0] : 'not found');

  const distHtml = await import('node:fs').then(fs => fs.readFileSync('dist/index.html', 'utf8'));
  const distMatch = distHtml.match(/\/assets\/index-[a-zA-Z0-9_-]+\.js/);
  console.log('Local built script bundle:', distMatch ? distMatch[0] : 'not found');

  const apiRes = await fetch('https://www.amarapain.com/api/leads?verify=true');
  const apiData = await apiRes.json();
  console.log('Live API:', JSON.stringify(apiData, null, 2));
}

check().catch(console.error);
