const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.amarapain.com';
const DEFAULT_IMAGE = 'https://www.amarapain.com/images/og-image.png';

async function prerender() {
  const distDir = path.resolve(__dirname, '../dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // Load medicalData
  const medicalDataPath = path.resolve(__dirname, '../src/utils/medicalData.js');
  let conditions = {};
  let treatments = {};
  let blogPosts = [];

  try {
    const medicalData = await import('file://' + medicalDataPath.replace(/\\/g, '/'));
    conditions = medicalData.conditions || {};
    treatments = medicalData.treatments || {};
    blogPosts = medicalData.blogPosts || [];
  } catch (err) {
    console.warn('Could not dynamically import medicalData, using fallback data:', err.message);
  }

  const routes = [
    {
      path: '/about',
      title: 'About Our Interventional Pain Specialists | Amara Pain Charlotte NC',
      desc: "Meet our double board-certified interventional pain specialists in Charlotte, NC. Evidence-based, non-surgical relief with $0 hospital facility fees."
    },
    {
      path: '/conditions',
      title: 'Pain Conditions We Treat | Amara Pain Charlotte NC',
      desc: "Specialized interventional treatments for back pain, neck pain, sciatica, arthritis, joint pain, and neuropathic pain in Charlotte, NC."
    },
    {
      path: '/treatments',
      title: 'Interventional Pain Procedures & Treatments | Amara Pain Charlotte NC',
      desc: "Minimally invasive, fluoroscopy-guided pain treatments including epidural steroid injections, radiofrequency ablation, and nerve blocks."
    },
    {
      path: '/patients',
      title: 'Patient Resources, Insurance & Portal | Amara Pain Charlotte NC',
      desc: "Patient forms, accepted insurance plans, payment options, and FAQs for Amara Pain patients in Charlotte, NC."
    },
    {
      path: '/blog',
      title: 'Patient Education & Pain Management Blog | Amara Pain Charlotte NC',
      desc: "Evidence-based articles, lifestyle tips, and clinical updates on chronic pain management and spine health from Amara Pain."
    },
    {
      path: '/contact',
      title: 'Contact Amara Pain | Clinic Location & Hours | Charlotte NC',
      desc: "Visit Amara Pain at 6429 Bannington Road Suite B, Charlotte, NC 28226. Call 704-503-9338 or schedule a consultation."
    },
    {
      path: '/book',
      title: 'Book an Appointment | Amara Pain Charlotte NC',
      desc: "Schedule a consultation with our double board-certified pain specialists in Charlotte, NC. Fast appointment availability with zero hospital facility fees."
    },
    {
      path: '/referrals',
      title: 'Physician Referrals | Fast-Track Patient Placement | Amara Pain',
      desc: "Refer a patient to Amara Pain in Charlotte, NC. Fast-track peer-to-peer consultations, comprehensive clinic notes, and coordinated specialist care."
    },
    {
      path: '/privacy',
      title: 'Privacy Policy & HIPAA Notice | Amara Pain Charlotte NC',
      desc: "Amara Pain's commitment to patient privacy, HIPAA compliance, and data protection in Charlotte, NC."
    },
    // Providers
    {
      path: '/providers/dr-ashvin-amara',
      title: 'Ashvin K. Amara, MD | Interventional Pain Specialist | Charlotte NC',
      desc: 'Dr. Ashvin K. Amara is a double board-certified interventional pain specialist and anesthesiologist dedicated to non-surgical pain relief in Charlotte, NC.'
    },
    {
      path: '/providers/eunice-babalola',
      title: 'Eunice Babalola, NP, MSN | Amara Pain Charlotte NC',
      desc: 'Eunice Babalola is a board-certified Family Nurse Practitioner specializing in patient-centered interventional pain management at Amara Pain.'
    },
    {
      path: '/providers/alexander-carmenaty',
      title: 'Alexander Carmenaty Rodriguez, MSN, FNP-C | Amara Pain Charlotte NC',
      desc: 'Alexander Carmenaty Rodriguez is a board-certified Nurse Practitioner delivering holistic, evidence-based pain management at Amara Pain.'
    }
  ];

  // Add condition detail pages
  for (const [key, cond] of Object.entries(conditions)) {
    routes.push({
      path: `/conditions/${key}`,
      title: cond.metaTitle || `${cond.title} Treatment Charlotte NC | Amara Pain`,
      desc: cond.metaDesc || cond.shortDesc || `Expert interventional care for ${cond.title} in Charlotte, NC.`
    });
  }

  // Add treatment detail pages
  for (const [key, treat] of Object.entries(treatments)) {
    routes.push({
      path: `/treatments/${key}`,
      title: treat.metaTitle || `${treat.title} in Charlotte NC | Amara Pain`,
      desc: treat.metaDesc || treat.shortDesc || `Advanced, minimally invasive ${treat.title} performed under fluoroscopic guidance in Charlotte, NC.`
    });
  }

  // Add blog detail pages
  for (const post of blogPosts) {
    routes.push({
      path: `/blog/${post.id}`,
      title: `${post.title} | Amara Pain Blog`,
      desc: post.excerpt || post.shortDesc || `Learn about ${post.title} from Amara Pain & Spine specialists in Charlotte, NC.`
    });
  }

  let generatedCount = 0;

  for (const route of routes) {
    const fullUrl = `${DOMAIN}${route.path}`;
    const cleanTitle = route.title.replace(/"/g, '&quot;');
    const cleanDesc = route.desc.replace(/"/g, '&quot;');

    let pageHtml = baseHtml;

    // Replace <title>
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/s, `<title>${cleanTitle}</title>`);

    // Replace meta description
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${cleanDesc}" />`
    );

    // Replace canonical URL
    pageHtml = pageHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${fullUrl}" />`
    );

    // Replace og:title
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${cleanTitle}" />`
    );

    // Replace og:description
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${cleanDesc}" />`
    );

    // Replace og:url
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${fullUrl}" />`
    );

    // Replace twitter:title
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${cleanTitle}" />`
    );

    // Replace twitter:description
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${cleanDesc}" />`
    );

    // Replace twitter:url
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:url" content="${fullUrl}" />`
    );

    // Target folder e.g. dist/about/index.html
    const routeRelPath = route.path.replace(/^\//, '');
    const outDir = path.join(distDir, routeRelPath);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), pageHtml, 'utf8');
    generatedCount++;
  }

  console.log(`Pre-rendered ${generatedCount} static pages with SEO and Open Graph metadata.`);
}

prerender().catch(err => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});
