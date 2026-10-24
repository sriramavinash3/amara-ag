/**
 * Cloudflare Pages Function: /api/leads
 * Production Centralized Lead Capture Engine for Amara Pain & Spine
 *
 * Implements:
 * - Direct Google Sheets Integration via Service Account OAuth2
 * - Minimal-friction 4-field schema (First Name, Last Name, Phone, Email)
 * - Server-side validation & phone normalization
 * - Anti-spam (honeypot check + fast submission check)
 * - Idempotency & duplicate submission protection
 * - Formula injection prevention for spreadsheet security
 * - Zero client-side credential exposure
 */

// In-memory idempotency cache for active worker lifecycle
const idempotencyMap = new Map();
const IDEMPOTENCY_TTL_MS = 15 * 60 * 1000; // 15 minutes

// Token cache for Google OAuth2
let cachedAccessToken = null;
let tokenExpiresAt = 0;

function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Idempotency-Key',
    'Content-Type': 'application/json'
  };
}

function base64url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64urlFromString(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Formula Injection Protection:
 * Prepend single quote (') if string begins with =, +, -, or @
 */
function sanitizeFormulaInjection(value) {
  if (value === null || value === undefined) return '';
  const str = String(value).trim();
  if (/^[=+\-@]/.test(str)) {
    return "'" + str;
  }
  return str;
}

/**
 * Phone Number Normalization
 */
function normalizePhoneNumber(raw) {
  if (!raw || typeof raw !== 'string') return '';
  const trimmed = raw.trim();
  if (trimmed.startsWith('+')) {
    return '+' + trimmed.slice(1).replace(/[^\d]/g, '');
  }
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return trimmed;
}

/**
 * Obtain Google OAuth2 Token using Web Crypto API and PKCS#8 RSA key
 */
async function getGoogleAccessTokenWebCrypto(serviceEmail, privateKeyRaw) {
  const nowSec = Math.floor(Date.now() / 1000);
  if (cachedAccessToken && tokenExpiresAt > nowSec + 60) {
    return cachedAccessToken;
  }

  const cleanKeyPem = privateKeyRaw
    .replace(/\\n/g, '')
    .replace(/-----[^\n-]+-----/g, '')
    .replace(/\s+/g, '');

  const binaryDerString = atob(cleanKeyPem);
  const binaryDer = new Uint8Array(binaryDerString.length);
  for (let i = 0; i < binaryDerString.length; i++) {
    binaryDer[i] = binaryDerString.charCodeAt(i);
  }

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryDer.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const header = { alg: 'RS256', typ: 'JWT' };
  const claims = {
    iss: serviceEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: nowSec + 3600,
    iat: nowSec
  };

  const encodedHeader = base64urlFromString(JSON.stringify(header));
  const encodedClaims = base64urlFromString(JSON.stringify(claims));
  const signingInput = `${encodedHeader}.${encodedClaims}`;

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const jwt = `${signingInput}.${base64url(signature)}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });

  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    throw new Error(`Google OAuth error (${tokenRes.status}): ${errText}`);
  }

  const tokenData = await tokenRes.json();
  cachedAccessToken = tokenData.access_token;
  tokenExpiresAt = nowSec + (tokenData.expires_in || 3600);
  return cachedAccessToken;
}

/**
 * Append row to Google Sheets via REST API
 */
async function appendLeadToGoogleSheet(env, rowValues) {
  const spreadsheetId = env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = env.GOOGLE_SHEETS_SHEET_NAME || 'Leads';
  const serviceEmail = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!spreadsheetId || !serviceEmail || !privateKey) {
    console.warn('[Pages Function /api/leads] Google Sheets credentials missing in environment.');
    throw new Error('Google Sheets credentials are not configured in the environment.');
  }

  const accessToken = await getGoogleAccessTokenWebCrypto(serviceEmail, privateKey);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
    spreadsheetId
  )}/values/${encodeURIComponent(sheetName)}!A:U:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const appendRes = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      range: `${sheetName}!A:U`,
      majorDimension: 'ROWS',
      values: [rowValues]
    })
  });

  if (!appendRes.ok) {
    const err = await appendRes.text();
    throw new Error(`Google Sheets API append failed (${appendRes.status}): ${err}`);
  }

  return { status: 'SUCCESS' };
}

/**
 * OPTIONS: CORS Preflight
 */
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders()
  });
}

/**
 * GET: Healthcheck probe
 */
export async function onRequestGet(context) {
  const env = context.env || {};
  return new Response(
    JSON.stringify({
      status: 'healthy',
      endpoint: '/api/leads',
      service: 'Amara Google Sheets Lead Capture Engine',
      envKeys: Object.keys(env).filter(k => !k.includes('PRIVATE')),
      hasSpreadsheetId: !!env.GOOGLE_SHEETS_SPREADSHEET_ID,
      hasServiceAccount: !!env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      timestamp: new Date().toISOString()
    }),
    { status: 200, headers: getCorsHeaders() }
  );
}

/**
 * POST: Process Centralized Lead Submission
 */
export async function onRequestPost(context) {
  const corsHeaders = getCorsHeaders();
  const env = context.env || {};

  try {
    let payload;
    try {
      payload = await context.request.json();
    } catch (e) {
      return new Response(
        JSON.stringify({
          success: false,
          error: { code: 'INVALID_JSON', message: 'Malformed JSON payload.' }
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 1. Anti-Spam: Honeypot field inspection
    if (payload.website_hp || payload.bot_check || payload._hp_email) {
      console.warn('[Cloudflare Pages Function /api/leads] Spam bot rejected via honeypot.');
      return new Response(
        JSON.stringify({
          success: true,
          leadId: 'spam-filtered',
          message: 'Thank you. Your request has been received.'
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    // 2. Anti-Spam: Fast submission check
    if (payload.clientRenderTime && typeof payload.clientRenderTime === 'number') {
      const timeToSubmit = Date.now() - payload.clientRenderTime;
      if (timeToSubmit >= 0 && timeToSubmit < 500) {
        console.warn(`[Cloudflare Pages Function /api/leads] Spam rejected: submitted in ${timeToSubmit}ms.`);
        return new Response(
          JSON.stringify({
            success: true,
            leadId: 'spam-speed-filtered',
            message: 'Thank you. Your request has been received.'
          }),
          { status: 200, headers: corsHeaders }
        );
      }
    }

    // 3. Duplicate Protection (Idempotency)
    const idempotencyKey =
      context.request.headers.get('X-Idempotency-Key') ||
      payload.idempotencyKey ||
      payload.leadId;

    if (idempotencyKey && idempotencyMap.has(idempotencyKey)) {
      const cached = idempotencyMap.get(idempotencyKey);
      if (Date.now() - cached.timestamp < IDEMPOTENCY_TTL_MS) {
        return new Response(JSON.stringify({ ...cached.body, isDuplicate: true }), {
          status: 200,
          headers: corsHeaders
        });
      }
    }

    // 4. Server-Side Validation: Only 4 Approved Fields
    const firstName = (payload.firstName || payload.first_name || '').trim();
    const lastName = (payload.lastName || payload.last_name || '').trim();
    const phoneRaw = (payload.phone || '').trim();
    const email = (payload.email || '').trim().toLowerCase();

    const errors = [];
    if (!firstName || firstName.length < 2) {
      errors.push({ field: 'firstName', message: 'First name is required (min 2 characters).' });
    }
    if (!lastName || lastName.length < 2) {
      errors.push({ field: 'lastName', message: 'Last name is required (min 2 characters).' });
    }

    const phoneDigits = phoneRaw.replace(/\D/g, '');
    if (!phoneRaw || phoneDigits.length < 10) {
      errors.push({ field: 'phone', message: 'Valid 10-digit phone number is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push({ field: 'email', message: 'Valid email address is required.' });
    }

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'VALIDATION_FAILED',
            message: 'Please review and correct the required fields.',
            details: errors
          }
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 5. Lead Normalization & Field Sanitization
    const leadId = idempotencyKey || `amara-lead-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const timestamp = new Date().toISOString();
    const fullName = `${firstName} ${lastName}`.trim();
    const normalizedPhone = normalizePhoneNumber(phoneRaw);

    // Context metadata
    const landingPage = (payload.landingPage || payload.pageIntent || 'Charlotte Clinic').trim();
    const pageIntent = (payload.pageIntent || 'general-pain').trim();
    const pageUrl = (payload.pageUrl || payload.landing_page_url || '').trim();
    const pageTitle = (payload.pageTitle || '').trim();
    const formName = (payload.formName || 'consultation-form').trim();

    const utms = payload.utms || {};
    const utmSource = (payload.utm_source || utms.utm_source || '').trim();
    const utmMedium = (payload.utm_medium || utms.utm_medium || '').trim();
    const utmCampaign = (payload.utm_campaign || utms.utm_campaign || '').trim();
    const utmTerm = (payload.utm_term || utms.utm_term || '').trim();
    const utmContent = (payload.utm_content || utms.utm_content || '').trim();
    const leadSource = utmSource || (payload.referrer ? 'referral' : 'direct');
    const referrer = (payload.referrer || '').trim();

    // 6. Assemble Sanitized Row Array matching Google Sheet Columns (A:U)
    // Removed fields (Primary Area of Concern, Description of Symptoms, Patient Type, Preferred Time) passed as clean empty strings
    const rowValues = [
      sanitizeFormulaInjection(timestamp),
      sanitizeFormulaInjection(leadId),
      sanitizeFormulaInjection(fullName),
      sanitizeFormulaInjection(normalizedPhone),
      sanitizeFormulaInjection(email),
      '', // Patient Type (Removed)
      '', // Preferred Time (Removed)
      '', // Message / Notes / Symptoms (Removed)
      sanitizeFormulaInjection(landingPage),
      sanitizeFormulaInjection(pageIntent),
      sanitizeFormulaInjection(pageUrl),
      sanitizeFormulaInjection(pageTitle),
      sanitizeFormulaInjection(formName),
      sanitizeFormulaInjection(leadSource),
      sanitizeFormulaInjection(utmSource),
      sanitizeFormulaInjection(utmMedium),
      sanitizeFormulaInjection(utmCampaign),
      sanitizeFormulaInjection(utmTerm),
      sanitizeFormulaInjection(utmContent),
      sanitizeFormulaInjection(referrer),
      'CAPTURED'
    ];

    // 7. Write to Google Sheets
    await appendLeadToGoogleSheet(env, rowValues);

    const responseBody = {
      success: true,
      leadId,
      message: 'Thank you. Your consultation request has been received. Our clinical intake team will contact you shortly.',
      timestamp
    };

    if (idempotencyKey) {
      idempotencyMap.set(idempotencyKey, {
        timestamp: Date.now(),
        body: responseBody
      });
    }

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    console.error('[Cloudflare Pages Function /api/leads] Unhandled server error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'An error occurred while transmitting your request to our intake system. Please call our clinic directly at (704) 503-9338.'
        }
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}
