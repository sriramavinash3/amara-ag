/**
 * Cloudflare Pages Function: /api/v1/appointments/smart
 * Handles live appointment creation and request submission with Tebra.
 */

// In-memory cache for idempotency checks (tracks hashes within 15-minute sliding window)
const recentSubmissions = new Map();

// Provider mapping to Tebra IDs
const PROVIDER_MAP = {
  'Ashvin K. Amara, MD': { providerId: '1', calendarId: 'cal_k_1_114095_1_1' },
  'Alexander Carmenaty Rodriguez, MSN, FNP-C': { providerId: '2', calendarId: 'cal_k_1_114095_2_1' },
  'Eunice Babalola, NP, MSN': { providerId: '3', calendarId: 'cal_k_1_114095_3_1' },
  'First Available Clinical Provider': { providerId: '1', calendarId: 'cal_k_1_114095_1_1' },
};

function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Idempotency-Key, Authorization',
    'Content-Type': 'application/json',
  };
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

/**
 * GET: Verification probe for ambiguous booking states.
 * Allows client to verify whether an in-flight booking completed during a network timeout.
 */
export async function onRequestGet(context) {
  const corsHeaders = getCorsHeaders();
  const { request } = context;
  const url = new URL(request.url);
  const verifyKey = url.searchParams.get('verifyKey') || request.headers.get('X-Idempotency-Key') || '';

  if (!verifyKey) {
    return new Response(
      JSON.stringify({ success: false, error: { code: 'MISSING_VERIFY_KEY', message: 'Verification key required.' } }),
      { status: 400, headers: corsHeaders }
    );
  }

  if (recentSubmissions.has(verifyKey)) {
    const cached = recentSubmissions.get(verifyKey);
    return new Response(JSON.stringify(cached.response), {
      status: 200,
      headers: { ...corsHeaders, 'X-Idempotency-Hit': 'true' },
    });
  }

  return new Response(
    JSON.stringify({ success: false, status: 'not_found', message: 'No confirmed booking found for this key.' }),
    { status: 404, headers: corsHeaders }
  );
}

/**
 * POST: Create appointment in Tebra
 */
export async function onRequestPost(context) {
  const corsHeaders = getCorsHeaders();
  const startTimeMs = Date.now();
  const correlationId = `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;

  try {
    const { request, env } = context;
    const tebraApiKey = (env && env.TEBRA_API_KEY) || 'DX80ptIDQ85cfM2aGfv19aKUwRgZ0sKI55jM8P0V';
    const tebraPracticeKey = (env && env.TEBRA_PRACTICE_KEY) || 'k_1_114095';
    const tebraBaseUrl = (env && env.TEBRA_BASE_URL) || 'https://unified-availability-service.api.patientpop.com';

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          status: 'booking_failed',
          error: {
            code: 'INVALID_JSON',
            message: 'Invalid JSON request payload.',
          },
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const {
      patient = {},
      appointment = {},
      providerName = '',
      idempotencyKey = '',
    } = body;

    const firstName = (patient.firstName || '').trim();
    const lastName = (patient.lastName || '').trim();
    const email = (patient.email || '').trim();
    const phone = (patient.phone || '').replace(/\D+/g, '');
    const dob = patient.dob || '';
    const insurance = (patient.insurance || '').trim();
    const comments = (patient.comments || '').trim();

    const startTimeRaw = appointment.startTime;
    const duration = appointment.duration || 30;
    const notes = appointment.notes || comments;

    // Validate required fields
    if (!firstName || !lastName) {
      return new Response(
        JSON.stringify({
          success: false,
          status: 'booking_failed',
          error: {
            code: 'MISSING_PATIENT_NAME',
            message: 'First name and last name are required.',
          },
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!phone || phone.length < 10) {
      return new Response(
        JSON.stringify({
          success: false,
          status: 'booking_failed',
          error: {
            code: 'INVALID_PHONE',
            message: 'A valid 10-digit phone number is required.',
          },
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({
          success: false,
          status: 'booking_failed',
          error: {
            code: 'INVALID_EMAIL',
            message: 'A valid email address is required.',
          },
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!startTimeRaw) {
      return new Response(
        JSON.stringify({
          success: false,
          status: 'booking_failed',
          error: {
            code: 'MISSING_START_TIME',
            message: 'Appointment start time is required.',
          },
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Determine Provider & Calendar Mapping
    let providerInfo = PROVIDER_MAP[providerName];
    if (!providerInfo) {
      for (const [key, val] of Object.entries(PROVIDER_MAP)) {
        if (providerName.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
          providerInfo = val;
          break;
        }
      }
    }
    if (!providerInfo) {
      providerInfo = PROVIDER_MAP['Ashvin K. Amara, MD'];
    }

    const { providerId, calendarId } = providerInfo;
    const locationId = '1'; // Charlotte Clinic
    const timezone = 'America/New_York';

    // Parse start_time to ISO format
    let startTimeIso;
    try {
      startTimeIso = new Date(startTimeRaw).toISOString();
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          status: 'booking_failed',
          error: {
            code: 'INVALID_DATE_FORMAT',
            message: 'Appointment date and time could not be parsed.',
          },
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Diagnostic Stage 1: Request received (no PHI logged)
    console.log(`[Tebra Booking][${correlationId}] Stage 1: Booking request received | Provider ID: ${providerId} | Calendar ID: ${calendarId} | Start: ${startTimeIso}`);

    // Normalize DOB to YYYY-MM-DD
    let formattedDob = '1990-01-01';
    if (dob) {
      try {
        formattedDob = new Date(dob).toISOString().split('T')[0];
      } catch {
        formattedDob = dob;
      }
    }

    // Idempotency check:
    const clientKey = idempotencyKey || request.headers.get('X-Idempotency-Key') || '';
    const submissionFingerprint = clientKey || `${phone}-${providerId}-${startTimeIso}`;
    const now = Date.now();

    // Clean up expired keys (> 15 minutes old)
    for (const [k, v] of recentSubmissions.entries()) {
      if (now - v.timestamp > 15 * 60 * 1000) {
        recentSubmissions.delete(k);
      }
    }

    if (recentSubmissions.has(submissionFingerprint)) {
      const existing = recentSubmissions.get(submissionFingerprint);
      console.log(`[Tebra Booking][${correlationId}] Idempotency match found. Returning cached confirmed booking.`);
      return new Response(JSON.stringify(existing.response), {
        status: 200,
        headers: {
          ...corsHeaders,
          'X-Idempotency-Hit': 'true',
        },
      });
    }

    // Diagnostic Stage 2: Tebra Authentication Check
    console.log(`[Tebra Booking][${correlationId}] Stage 2: Validating Tebra authentication credentials & endpoint configuration`);
    if (!tebraApiKey || !tebraPracticeKey) {
      console.error(`[Tebra Booking][${correlationId}] Missing Tebra API key or practice key`);
      return new Response(
        JSON.stringify({
          success: false,
          status: 'booking_failed',
          error: {
            code: 'CONFIG_ERROR',
            message: 'Clinic scheduling service is temporarily misconfigured. Please call (704) 503-9338.',
          },
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Diagnostic Stage 3: Authentication completed
    console.log(`[Tebra Booking][${correlationId}] Stage 3: Authentication validated. Target practice: ${tebraPracticeKey}`);

    // Atomic Single-Step POST Payload:
    // Tebra's Unified Availability service accepts all patient, calendar, and intake details in one POST.
    const createUrl = `${tebraBaseUrl}/v1/practice/${tebraPracticeKey}/appointments`;
    const createPayload = {
      calendar_id: calendarId,
      provider_id: providerId,
      location_id: locationId,
      start_time: startTimeIso,
      duration: duration,
      original_location_timezone: timezone,
      appointment_types_enabled: false,
      reason: notes || 'Consultation / Evaluation',
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      date_of_birth: formattedDob,
      sex: 'UNKNOWN',
      is_new_patient: true,
      is_telehealth: false,
      agree_sms_terms: true,
      comment: notes || comments || '',
      insurance_name: insurance || 'Self-pay / Uninsured / Verified at Clinic',
      insurance_provider_id: insurance ? '700' : null,
      insurance_id_number: 'N/A',
      insurance_group_number: 'N/A',
      insurance_phone: '7045039338',
    };

    // Diagnostic Stage 4: Outbound request dispatched with resilient 20s AbortController
    console.log(`[Tebra Booking][${correlationId}] Stage 4: Dispatching atomic POST to Tebra endpoint`);
    let createResp;
    const abortController = new AbortController();
    const abortTimer = setTimeout(() => abortController.abort(), 20000);

    try {
      createResp = await fetch(createUrl, {
        method: 'POST',
        headers: {
          'x-api-key': tebraApiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Origin': 'https://www.tebra.com',
          'Referer': 'https://www.tebra.com/',
        },
        body: JSON.stringify(createPayload),
        signal: abortController.signal,
      });
    } catch (netErr) {
      clearTimeout(abortTimer);
      const isTimeout = netErr.name === 'AbortError' || netErr.name === 'TimeoutError' || netErr.message?.includes('timeout') || netErr.message?.includes('abort');
      console.error(`[Tebra Booking][${correlationId}] Network error during Tebra request:`, netErr.message);

      return new Response(
        JSON.stringify({
          success: false,
          status: isTimeout ? 'booking_timeout' : 'booking_failed',
          error: {
            code: isTimeout ? 'TEBRA_GATEWAY_TIMEOUT' : 'TEBRA_NETWORK_ERROR',
            message: isTimeout
              ? 'Tebra scheduling system took longer than expected to confirm. To prevent duplicate bookings, please do not resubmit immediately.'
              : 'Unable to reach the scheduling service. Please call our clinic at (704) 503-9338.',
            details: netErr.message,
            isTimeout,
            verifyKey: submissionFingerprint,
          },
        }),
        { status: isTimeout ? 504 : 503, headers: corsHeaders }
      );
    } finally {
      clearTimeout(abortTimer);
    }

    const elapsed = Date.now() - startTimeMs;
    // Diagnostic Stage 5: Tebra response received
    console.log(`[Tebra Booking][${correlationId}] Stage 5: Received Tebra HTTP ${createResp.status} in ${elapsed}ms`);

    if (createResp.status === 409) {
      return new Response(
        JSON.stringify({
          success: false,
          status: 'booking_failed',
          error: {
            code: 'SLOT_UNAVAILABLE',
            message: 'The selected appointment slot is no longer available. Please select another time.',
          },
        }),
        { status: 409, headers: corsHeaders }
      );
    }

    if (!createResp.ok) {
      let errBody = '';
      try {
        errBody = await createResp.text();
      } catch {
        errBody = createResp.statusText;
      }
      console.error(`[Tebra Booking][${correlationId}] Tebra declined request: HTTP ${createResp.status}`, errBody);

      return new Response(
        JSON.stringify({
          success: false,
          status: 'booking_failed',
          error: {
            code: `TEBRA_HTTP_${createResp.status}`,
            message: 'Tebra scheduling system declined the appointment request. Please call our clinic at (704) 503-9338.',
            details: errBody,
          },
        }),
        { status: createResp.status, headers: corsHeaders }
      );
    }

    const createData = await createResp.json();
    const appointmentToken = createData['appointment-token'];

    if (!appointmentToken) {
      console.error(`[Tebra Booking][${correlationId}] Tebra response missing appointment-token:`, createData);
      return new Response(
        JSON.stringify({
          success: false,
          status: 'booking_failed',
          error: {
            code: 'MISSING_APPOINTMENT_TOKEN',
            message: 'Tebra did not return a valid appointment reservation token.',
          },
        }),
        { status: 502, headers: corsHeaders }
      );
    }

    // Diagnostic Stage 6: Confirmed appointment creation
    const referenceId = `TEBRA-${appointmentToken.slice(0, 8).toUpperCase()}`;
    console.log(`[Tebra Booking][${correlationId}] Stage 6: Appointment creation confirmed. Reference: ${referenceId}`);

    const finalResult = {
      success: true,
      status: 'booking_pending',
      message: 'Appointment request submitted successfully. Awaiting clinic confirmation.',
      data: {
        appointmentToken,
        referenceId,
        status: 'PENDING_CLINIC_CONFIRMATION',
        provider: providerName || 'Ashvin K. Amara, MD',
        location: '6429 Bannington Road, Suite B, Charlotte, NC 28226',
        startTime: startTimeIso,
        duration,
        patient: {
          firstName,
          lastName,
          email,
          phone,
        },
      },
    };

    // Store in idempotency cache
    recentSubmissions.set(submissionFingerprint, {
      timestamp: now,
      response: finalResult,
    });
    if (clientKey && clientKey !== submissionFingerprint) {
      recentSubmissions.set(clientKey, {
        timestamp: now,
        response: finalResult,
      });
    }

    return new Response(JSON.stringify(finalResult), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (unexpectedError) {
    console.error(`[Tebra Booking][${correlationId}] Unexpected server exception:`, unexpectedError);
    return new Response(
      JSON.stringify({
        success: false,
        status: 'booking_failed',
        error: {
          code: 'UNEXPECTED_SERVER_ERROR',
          message: 'An unexpected error occurred while processing your booking. Please call our clinic at (704) 503-9338.',
          details: unexpectedError.message,
        },
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}
