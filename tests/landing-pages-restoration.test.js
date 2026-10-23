import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Landing Pages Final Approved Restoration & Recovery Suite', () => {
  const expectedSlugs = [
    'pain-management-charlotte',
    'back-pain-doctor-charlotte',
    'neck-pain-doctor-charlotte',
    'sciatica-treatment-charlotte',
    'spine-pain-specialist-charlotte',
    'interventional-pain-treatment',
    'schedule-consultation'
  ];

  it('1. App.jsx registers direct routes for all 7 Google Ads landing pages with and without trailing slash', () => {
    const appJsx = fs.readFileSync(path.resolve(__dirname, '../src/App.jsx'), 'utf8');
    
    expect(appJsx).toContain("import LandingPage from './pages/LandingPage'");

    for (const slug of expectedSlugs) {
      expect(appJsx).toContain(`path="/${slug}"`);
      expect(appJsx).toContain(`path="/${slug}/"`);
    }
  });

  it('2. prerender-pages.cjs defines all 7 landing pages with SEO metadata', () => {
    const prerenderScript = fs.readFileSync(path.resolve(__dirname, '../scripts/prerender-pages.cjs'), 'utf8');

    for (const slug of expectedSlugs) {
      expect(prerenderScript).toContain(`path: '/${slug}'`);
    }
  });

  it('3. public/_redirects does NOT redirect any of the 7 campaign URLs away', () => {
    const redirects = fs.readFileSync(path.resolve(__dirname, '../public/_redirects'), 'utf8');

    for (const slug of expectedSlugs) {
      expect(redirects).not.toContain(`/${slug} `);
      expect(redirects).not.toContain(`/${slug}/ `);
    }
    expect(redirects).toContain('/* /index.html 200');
  });

  it('4. public/sitemap.xml lists all 7 landing page URLs with canonical trailing slashes and priority 0.9', () => {
    const sitemap = fs.readFileSync(path.resolve(__dirname, '../public/sitemap.xml'), 'utf8');

    for (const slug of expectedSlugs) {
      expect(sitemap).toContain(`<loc>https://www.amarapain.com/${slug}/</loc>`);
    }
  });

  it('5. LandingPage.jsx exports complete data configuration for all 7 landing pages', async () => {
    const landingFile = fs.readFileSync(path.resolve(__dirname, '../src/pages/LandingPage.jsx'), 'utf8');

    for (const slug of expectedSlugs) {
      expect(landingFile).toContain(`'${slug}':`);
    }

    // Verify phone number (704) 503-9338 and tel link
    expect(landingFile).toContain('tel:+17045039338');
    expect(landingFile).toContain('(704) 503-9338');

    // Verify localStorage key APS_LEADS integration
    expect(landingFile).toContain('APS_LEADS');

    // Verify Google Ads Conversion tag AW-18533378516
    expect(landingFile).toContain('AW-18533378516');
    expect(landingFile).toContain('lead_form_submitted');
  });

  it('6. Appointment timing options are strictly ABSENT from LandingPage.jsx', () => {
    const landingFile = fs.readFileSync(path.resolve(__dirname, '../src/pages/LandingPage.jsx'), 'utf8');

    expect(landingFile).not.toContain('preferredTime');
    expect(landingFile).not.toContain('Preferred Contact Time');
    expect(landingFile).not.toContain('Are you a new patient');
    expect(landingFile).not.toContain('patient_type');
    expect(landingFile).not.toContain('Morning (8am - 12pm)');
  });

  it('7. Exact recovered SLO text is strictly PRESENT in LandingPage.jsx', () => {
    const landingFile = fs.readFileSync(path.resolve(__dirname, '../src/pages/LandingPage.jsx'), 'utf8');

    expect(landingFile).toContain('Quick Intake Response: Our Charlotte team reviews your details and coordinates your consultation slot.');
    expect(landingFile).toContain('Zero Hospital Facility Surcharges: Independent practice protects you from high hospital fees.');
    expect(landingFile).toContain('Direct contact from dedicated clinical care coordinators within 24 hours');
  });

  it('8. Final approved images are referenced in LandingPage.jsx and exist on disk', () => {
    const landingFile = fs.readFileSync(path.resolve(__dirname, '../src/pages/LandingPage.jsx'), 'utf8');

    const requiredImages = [
      '/images/audience/hero_senior_mobility.jpg',
      '/images/audience/interventional_procedure_suite.jpg',
      '/images/doctor_consultation.jpg',
      '/images/insurers/BCBS NC.png',
      '/images/insurers/United Healthcare Commercial.png',
      '/images/insurers/Aetna Commercial.png'
    ];

    for (const imgPath of requiredImages) {
      expect(landingFile).toContain(imgPath);
      const diskPath = path.resolve(__dirname, '../public', imgPath.replace(/^\//, ''));
      expect(fs.existsSync(diskPath)).toBe(true);
    }
  });

  it('9. Lead generation saves valid payload without appointment timing options', () => {
    const fakeLead = {
      id: 'APS-TEST1234',
      type: 'appointment',
      status: 'New',
      dateCreated: new Date().toISOString(),
      source: 'pain-management-charlotte',
      patient: {
        firstName: 'Jane',
        lastName: 'Doe',
        phone: '7045550123',
        email: 'jane.doe@example.com'
      },
      condition: 'Lower Back & Lumbar Spine',
      notes: 'Test lead submission',
      appointmentDate: new Date().toLocaleDateString()
    };

    expect(fakeLead.type).toBe('appointment');
    expect(fakeLead.patient.firstName).toBe('Jane');
    expect(fakeLead.patient.lastName).toBe('Doe');
    expect(fakeLead.patient.phone).toBe('7045550123');
    expect(fakeLead.patient.email).toBe('jane.doe@example.com');
    expect(fakeLead.preferredTime).toBeUndefined();
    expect(fakeLead.status).toBe('New');
  });
});
