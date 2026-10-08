const fs = require('fs');
const sharp = require('sharp');

async function buildOGImage() {
  const WIDTH = 1200;
  const HEIGHT = 630;

  // 1. Prepare Base Background (1200x630) with rich dark slate gradient & emerald ambient glow
  const baseBgSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1B1E20"/>
          <stop offset="50%" stop-color="#151718"/>
          <stop offset="100%" stop-color="#0E1011"/>
        </linearGradient>
        <radialGradient id="emeraldAmbient" cx="20%" cy="25%" r="60%">
          <stop offset="0%" stop-color="#059669" stop-opacity="0.25"/>
          <stop offset="50%" stop-color="#047857" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGrad)"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#emeraldAmbient)"/>
    </svg>
  `;
  const baseCanvas = await sharp(Buffer.from(baseBgSvg)).png().toBuffer();

  // 2. Prepare Right Graphic: Spinal Column & Diagnostic Hologram from hero_bg.png
  // Resize to 580x630, modulate for medical tech look
  const rawSpine = await sharp('public/images/hero_bg.png')
    .resize(580, 630, { fit: 'cover', position: 'center' })
    .ensureAlpha()
    .toBuffer();

  // Create a gradient alpha mask: 0 (transparent) on the left, 255 (opaque) on the right
  const fadeMaskSvg = `
    <svg width="580" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
          <stop offset="25%" stop-color="#ffffff" stop-opacity="0.15"/>
          <stop offset="50%" stop-color="#ffffff" stop-opacity="0.55"/>
          <stop offset="85%" stop-color="#ffffff" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.98"/>
        </linearGradient>
      </defs>
      <rect width="580" height="630" fill="url(#hFade)"/>
    </svg>
  `;
  const fadeMask = await sharp(Buffer.from(fadeMaskSvg)).toColourspace('b-w').toBuffer();

  const maskedSpine = await sharp(rawSpine)
    .composite([
      {
        input: fadeMask,
        blend: 'dest-in'
      }
    ])
    .png()
    .toBuffer();

  // 3. Prepare Logo (AmaraPain_Logo_dark.png)
  const resizedLogo = await sharp('public/images/AmaraPain_Logo_dark.png')
    .resize({ height: 95 })
    .toBuffer();

  // 4. Foreground Elements (Transparent SVG: Card Borders, Typography, Badges)
  const fgElementsSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Frame Border Gradient -->
        <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.6"/>
          <stop offset="35%" stop-color="#334155" stop-opacity="0.3"/>
          <stop offset="70%" stop-color="#10b981" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#059669" stop-opacity="0.5"/>
        </linearGradient>

        <linearGradient id="badgeBg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#064e3b" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#022c22" stop-opacity="0.6"/>
        </linearGradient>
      </defs>

      <!-- Sleek Card Border -->
      <rect x="24" y="24" width="${WIDTH - 48}" height="${HEIGHT - 48}" rx="24" fill="none" stroke="url(#frameGrad)" stroke-width="1.5"/>

      <!-- Top Accent Bar -->
      <path d="M 48 24 L 280 24" stroke="#10b981" stroke-width="4.5" stroke-linecap="round"/>

      <!-- Location Badge -->
      <g transform="translate(435, 66)">
        <rect width="320" height="34" rx="17" fill="url(#badgeBg)" stroke="#10b981" stroke-width="1.2" stroke-opacity="0.7"/>
        <circle cx="18" cy="17" r="4.5" fill="#34d399"/>
        <text x="32" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="700" fill="#34d399" letter-spacing="1.5">
          CHARLOTTE, NC • INTERVENTIONAL
        </text>
      </g>

      <!-- Main Headline -->
      <g transform="translate(80, 235)">
        <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="46" font-weight="800" fill="#ffffff" letter-spacing="-0.8">
          <tspan x="0" y="0">Advanced Interventional</tspan>
          <tspan x="0" y="58" fill="#34d399">Pain Specialists</tspan>
        </text>
      </g>

      <!-- Value Proposition Subtitle / Exact Caption Alignment -->
      <g transform="translate(80, 372)">
        <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="19" font-weight="400" fill="#e2e8f0" letter-spacing="0.1">
          <tspan x="0" y="0">Charlotte's leading interventional specialists delivering</tspan>
          <tspan x="0" y="29">advanced, evidence-based pain relief built around your body,</tspan>
          <tspan x="0" y="58">your diagnostics, and your life outside of the clinic.</tspan>
        </text>
      </g>

      <!-- Feature Highlight Badges -->
      <g transform="translate(80, 495)">
        <!-- Pill 1: Board-Certified MDs -->
        <g transform="translate(0, 0)">
          <rect width="205" height="42" rx="21" fill="#0f172a" fill-opacity="0.88" stroke="#334155" stroke-width="1.2"/>
          <circle cx="20" cy="21" r="5" fill="#10b981"/>
          <text x="34" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13.5" font-weight="600" fill="#f8fafc">
            Board-Certified MDs
          </text>
        </g>

        <!-- Pill 2: $0 Hospital Facility Fees -->
        <g transform="translate(220, 0)">
          <rect width="225" height="42" rx="21" fill="#0f172a" fill-opacity="0.88" stroke="#334155" stroke-width="1.2"/>
          <circle cx="20" cy="21" r="5" fill="#10b981"/>
          <text x="34" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13.5" font-weight="600" fill="#f8fafc">
            $0 Hospital Facility Fees
          </text>
        </g>

        <!-- Pill 3: Major Insurances Accepted -->
        <g transform="translate(460, 0)">
          <rect width="235" height="42" rx="21" fill="#0f172a" fill-opacity="0.88" stroke="#334155" stroke-width="1.2"/>
          <circle cx="20" cy="21" r="5" fill="#10b981"/>
          <text x="34" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13.5" font-weight="600" fill="#f8fafc">
            Major Insurances Accepted
          </text>
        </g>
      </g>

      <!-- Bottom Domain Branding -->
      <g transform="translate(80, 570)">
        <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#94a3b8" letter-spacing="1.2">
          WWW.AMARAPAIN.COM
        </text>
      </g>
    </svg>
  `;

  // 5. Final Composite
  await sharp(baseCanvas)
    .composite([
      // Layer 1: Spine diagnostic hologram on right
      {
        input: maskedSpine,
        top: 0,
        left: WIDTH - 580,
        blend: 'over'
      },
      // Layer 2: Vector text, card border, badges
      {
        input: Buffer.from(fgElementsSvg),
        top: 0,
        left: 0,
        blend: 'over'
      },
      // Layer 3: Official Brand Logo at top left
      {
        input: resizedLogo,
        top: 55,
        left: 80,
        blend: 'over'
      }
    ])
    .png({ quality: 95, compressionLevel: 8 })
    .toFile('public/images/og-image.png');

  fs.copyFileSync('public/images/og-image.png', 'public/images/og-preview.png');
  console.log('Successfully generated public/images/og-image.png and public/images/og-preview.png');
}

buildOGImage().catch(console.error);
