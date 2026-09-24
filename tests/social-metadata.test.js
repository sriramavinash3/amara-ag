import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

describe('Social Sharing Image & Open Graph Metadata Suite', () => {
  const indexHtml = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

  it('1. Open Graph Image: File exists, matches exact 1200x630 dimensions, and is high quality PNG', async () => {
    const imagePath = path.resolve(__dirname, '../public/images/og-image.png');
    expect(fs.existsSync(imagePath)).toBe(true);

    const meta = await sharp(imagePath).metadata();
    expect(meta.format).toBe('png');
    expect(meta.width).toBe(1200);
    expect(meta.height).toBe(630);
    // Aspect ratio 1.90 - 1.91
    expect((meta.width / meta.height).toFixed(2)).toBe('1.90');

    // Also verify og-preview.png exists for compatibility
    const previewPath = path.resolve(__dirname, '../public/images/og-preview.png');
    expect(fs.existsSync(previewPath)).toBe(true);
  });

  it('2. Social Sharing Caption: Exact prompt description is configured', () => {
    const exactCaption = "Charlotte's leading interventional specialists delivering advanced, evidence-based pain relief built around your body, your diagnostics, and your life outside of the clinic.";
    
    // og:description
    expect(indexHtml).toContain(`<meta property="og:description" content="${exactCaption}" />`);
    // twitter:description
    expect(indexHtml).toContain(`<meta name="twitter:description" content="${exactCaption}" />`);
    // standard meta description
    expect(indexHtml).toContain(`<meta name="description" content="${exactCaption}" />`);
  });

  it('3. Open Graph Metadata: Exact og:title, og:url, og:type, og:site_name, and absolute HTTPS og:image', () => {
    expect(indexHtml).toContain('<meta property="og:title" content="Amara Pain | Advanced Interventional Pain Specialists" />');
    expect(indexHtml).toContain('<meta property="og:url" content="https://www.amarapain.com/" />');
    expect(indexHtml).toContain('<meta property="og:type" content="website" />');
    expect(indexHtml).toContain('<meta property="og:site_name" content="Amara Pain" />');
    expect(indexHtml).toContain('<meta property="og:image" content="https://www.amarapain.com/images/og-image.png" />');
    expect(indexHtml).toContain('<meta property="og:image:width" content="1200" />');
    expect(indexHtml).toContain('<meta property="og:image:height" content="630" />');
    expect(indexHtml).toContain('<meta property="og:image:type" content="image/png" />');
  });

  it('4. Twitter / X Card: Configured as summary_large_image with matching title and image', () => {
    expect(indexHtml).toContain('<meta name="twitter:card" content="summary_large_image" />');
    expect(indexHtml).toContain('<meta name="twitter:url" content="https://www.amarapain.com/" />');
    expect(indexHtml).toContain('<meta name="twitter:title" content="Amara Pain | Advanced Interventional Pain Specialists" />');
    expect(indexHtml).toContain('<meta name="twitter:image" content="https://www.amarapain.com/images/og-image.png" />');
  });

  it('5. SEO: Canonical URL is https://www.amarapain.com/ and Title is descriptive', () => {
    expect(indexHtml).toContain('<link rel="canonical" href="https://www.amarapain.com/" />');
    expect(indexHtml).toContain('<title>Amara Pain | Advanced Interventional Pain Specialists</title>');
  });

  it('6. Production Dist Build: Pre-rendered static pages contain proper OG metadata', () => {
    const distIndex = path.resolve(__dirname, '../dist/index.html');
    expect(fs.existsSync(distIndex)).toBe(true);

    const distContent = fs.readFileSync(distIndex, 'utf8');
    expect(distContent).toContain('https://www.amarapain.com/images/og-image.png');
    expect(distContent).toContain("Charlotte's leading interventional specialists delivering advanced, evidence-based pain relief");

    // Check pre-rendered condition page
    const backPainIndex = path.resolve(__dirname, '../dist/conditions/back-pain/index.html');
    expect(fs.existsSync(backPainIndex)).toBe(true);
    const backPainContent = fs.readFileSync(backPainIndex, 'utf8');
    expect(backPainContent).toContain('<link rel="canonical" href="https://www.amarapain.com/conditions/back-pain" />');
    expect(backPainContent).toContain('<meta property="og:image" content="https://www.amarapain.com/images/og-image.png" />');
  });
});
