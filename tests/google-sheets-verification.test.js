import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Google Sheets Lead Capture Verification for All Landing Pages', () => {
  const landingFilePath = path.resolve(__dirname, '../src/pages/LandingPage.jsx');
  const functionFilePath = path.resolve(__dirname, '../functions/api/leads.js');
  const appFilePath = path.resolve(__dirname, '../src/App.jsx');

  const landingCode = fs.readFileSync(landingFilePath, 'utf8');
  const functionCode = fs.readFileSync(functionFilePath, 'utf8');
  const appCode = fs.readFileSync(appFilePath, 'utf8');

  const ALL_7_SLUGS = [
    'pain-management-charlotte',
    'back-pain-doctor-charlotte',
    'neck-pain-doctor-charlotte',
    'sciatica-treatment-charlotte',
    'spine-pain-specialist-charlotte',
    'interventional-pain-treatment',
    'schedule-consultation'
  ];

  it('1. All 7 landing pages are routed in App.jsx to LandingPage component', () => {
    for (const slug of ALL_7_SLUGS) {
      expect(appCode).toContain(`slug="${slug}"`);
      expect(appCode).toContain(`path="/${slug}"`);
      expect(appCode).toContain(`path="/${slug}/"`);
    }
  });

  it('2. LandingPage component has data configuration for all 7 slugs', () => {
    for (const slug of ALL_7_SLUGS) {
      expect(landingCode).toContain(`'${slug}':`);
      expect(landingCode).toContain(`slug: '${slug}'`);
    }
  });

  it('3. Form in LandingPage submits lead payload to /api/leads with Google Sheets metadata', () => {
    expect(landingCode).toContain("fetch('/api/leads'");
    expect(landingCode).toContain('method: \'POST\'');
    expect(landingCode).toContain('landingPage: pageData.slug');
    expect(landingCode).toContain('pageIntent: pageData.painType');
    expect(landingCode).toContain('formName: \'consultation-form\'');
    expect(landingCode).toContain("'X-Idempotency-Key'");
    expect(landingCode).toContain('firstName: formData.firstName.trim()');
    expect(landingCode).toContain('lastName: formData.lastName.trim()');
    expect(landingCode).toContain('phone: formData.phone.trim()');
    expect(landingCode).toContain('email: formData.email.trim().toLowerCase()');
  });

  it('4. Cloudflare Function /api/leads is configured for Google Sheets API v4', () => {
    expect(functionCode).toContain('https://www.googleapis.com/auth/spreadsheets');
    expect(functionCode).toContain('https://sheets.googleapis.com/v4/spreadsheets/');
    expect(functionCode).toContain('GOOGLE_SHEETS_SPREADSHEET_ID');
    expect(functionCode).toContain('GOOGLE_SERVICE_ACCOUNT_EMAIL');
    expect(functionCode).toContain('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY');
    expect(functionCode).toContain('GOOGLE_SHEETS_SHEET_NAME');
    expect(functionCode).toContain('appendLeadToGoogleSheet');
  });

  it('5. Cloudflare Function /api/leads implements security sanitization and anti-spam', () => {
    expect(functionCode).toContain('sanitizeFormulaInjection');
    expect(functionCode).toContain('normalizePhoneNumber');
    expect(functionCode).toContain('honeypot');
    expect(functionCode).toContain('idempotencyMap');
  });

  it('6. Production /api/leads endpoint confirms active Google Sheets integration', async () => {
    const res = await fetch('https://www.amarapain.com/api/leads');
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.status).toBe('healthy');
    expect(data.service).toBe('Amara Google Sheets Lead Capture Engine');
    expect(data.hasSpreadsheetId).toBe(true);
    expect(data.hasServiceAccount).toBe(true);
  });
});
