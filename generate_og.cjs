const sharp = require('sharp');
const fs = require('fs');

async function generateOGImage() {
  const logoBuffer = fs.readFileSync('public/images/amara_logo.png');
  // Resize logo for OG image to around 480px width
  const resizedLogo = await sharp(logoBuffer)
    .resize({ width: 480 })
    .toBuffer();

  // Create SVG background & overlay elements
  const svgOverlay = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="50%" stop-color="#f8faf9"/>
          <stop offset="100%" stop-color="#ecfdf5"/>
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)"/>

      <!-- Clean Outer Border -->
      <rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="#e2e8f0" stroke-width="2"/>
      
      <!-- Top Decorative Accent Line -->
      <path d="M 60 24 L 340 24" stroke="#059669" stroke-width="6" stroke-linecap="round"/>

      <!-- Badge -->
      <g transform="translate(100, 85)">
        <rect width="360" height="38" rx="19" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.5"/>
        <text x="180" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#047857" text-anchor="middle" letter-spacing="1.5">
          CHARLOTTE, NC • INTERVENTIONAL CLINIC
        </text>
      </g>

      <!-- Headline & Value Proposition -->
      <text x="100" y="375" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" fill="#0f1f18" letter-spacing="-0.5">
        Specialized Interventional Pain Care &amp; Spine Clinic
      </text>

      <text x="100" y="425" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500" fill="#4b5563">
        Evidence-based, non-surgical relief with zero hospital facility fees.
      </text>

      <!-- Bottom Badges / Value Props -->
      <g transform="translate(100, 485)">
        <!-- Pill 1 -->
        <g transform="translate(0, 0)">
          <rect width="280" height="48" rx="24" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <circle cx="28" cy="24" r="8" fill="#10b981"/>
          <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#1e293b">
            Board-Certified Specialists
          </text>
        </g>
        <!-- Pill 2 -->
        <g transform="translate(305, 0)">
          <rect width="280" height="48" rx="24" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <circle cx="28" cy="24" r="8" fill="#10b981"/>
          <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#1e293b">
            $0 Hospital Facility Fees
          </text>
        </g>
        <!-- Pill 3 -->
        <g transform="translate(610, 0)">
          <rect width="280" height="48" rx="24" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <circle cx="28" cy="24" r="8" fill="#10b981"/>
          <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#1e293b">
            Major Insurances Accepted
          </text>
        </g>
      </g>
    </svg>
  `;

  // Composite SVG background with the resized logo
  await sharp(Buffer.from(svgOverlay))
    .composite([
      {
        input: resizedLogo,
        top: 155,
        left: 100,
      }
    ])
    .png()
    .toFile('public/images/og-preview.png');

  console.log('Successfully generated public/images/og-preview.png');
}

generateOGImage().catch(console.error);
