/**
 * Cloudflare Pages Function: /api/v1/appointments/smart
 * Handles appointment creation and request submission with Tebra.
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
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

export async function onRequestPost(context) {
  const corsHeaders = getCorsHeaders();

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
    const submissionFingerprint = `${clientKey || `${phone}-${email}-${providerId}-${startTimeIso}`}`;
    const now = Date.now();

    // Clean up expired keys (> 15 minutes old)
    for (const [k, v] of recentSubmissions.entries()) {
      if (now - v.timestamp > 15 * 60 * 1000) {
        recentSubmissions.delete(k);
      }
    }

    if (recentSubmissions.has(submissionFingerprint)) {
      const existing = recentSubmissions.get(submissionFingerprint);
      // Return previous cached result to guarantee idempotency
      return new Response(JSON.stringify(existing.response), {
        status: 200,
        headers: {
          ...corsHeaders,
          'X-Idempotency-Hit': 'true',
        },
      });
    }

    // --- PHASE 1: Create appointment slot with Tebra ---
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
    };

    let createResp;
    try {
      createResp = await fetch(createUrl, {
        method: 'POST',
        headers: {
          'x-api-key': tebraApiKey,
          'Content-Type': 'application/json',
          'User-Agent': 'AmaraPain-BookingService/1.0',
        },
        body: JSON.stringify(createPayload),
      });
    } catch (netErr) {
      return new Response(
        JSON.stringify({
          success: false,
          status: 'booking_failed',
          error: {
            code: 'TEBRA_NETWORK_ERROR',
            message: 'Unable to reach the scheduling service. Please call our clinic at (704) 503-9338.',
            details: netErr.message,
          },
        }),
        { status: 503, headers: corsHeaders }
      );
    }

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

    // --- PHASE 2: Update Appointment with Demographics & Intake Details ---
    const updatePayload = {
      calendar_id: calendarId,
      provider_id: providerId,
      location_id: locationId,
      start_time: startTimeIso,
      duration: duration,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      date_of_birth: formattedDob,
      reason: notes || 'Consultation / Evaluation',
      comment: notes || '',
      insurance_name: insurance || 'Self-pay / Uninsured / Verified at Clinic',
      insurance_provider_id: '700', // Standard generic/self-pay or practice intake ID
      insurance_id_number: 'N/A',
      insurance_group_number: 'N/A',
      insurance_phone: '7045039338',
      original_location_timezone: timezone,
    };

    try {
      await fetch(createUrl, {
        method: 'PUT',
        headers: {
          'x-api-key': tebraApiKey,
          'appointment-token': appointmentToken,
          'Content-Type': 'application/json',
          'User-Agent': 'AmaraPain-BookingService/1.0',
        },
        body: JSON.stringify(updatePayload),
      });
    } catch (putErr) {
      // Even if PUT times out, Phase 1 reservation was created
      console.warn('Tebra intake details update error:', putErr);
    }

    // Per Tebra's Practice Portal workflow:
    // Online appointments are submitted as requests that await clinical coordinator review
    const finalResult = {
      success: true,
      status: 'booking_pending',
      message: 'Appointment request submitted successfully. Awaiting clinic confirmation.',
      data: {
        appointmentToken,
        referenceId: `TEBRA-${appointmentToken.slice(0, 8).toUpperCase()}`,
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

    return new Response(JSON.stringify(finalResult), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (unexpectedError) {
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
