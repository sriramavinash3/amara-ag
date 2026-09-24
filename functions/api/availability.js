/**
 * Cloudflare Pages Function: /api/availability
 * Queries Tebra for real-time provider openings, working ranges, and blocked exceptions.
 */

const PROVIDER_MAP = {
  'Ashvin K. Amara, MD': '1',
  'Alexander Carmenaty Rodriguez, MSN, FNP-C': '2',
  'Eunice Babalola, NP, MSN': '3',
  'First Available Clinical Provider': '1',
};

function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

export async function onRequestGet(context) {
  const corsHeaders = getCorsHeaders();

  try {
    const { request, env } = context;
    const url = new URL(request.url);

    let providerId = url.searchParams.get('providerId') || '1';
    const providerName = url.searchParams.get('providerName');
    if (providerName && PROVIDER_MAP[providerName]) {
      providerId = PROVIDER_MAP[providerName];
    }

    const dateParam = url.searchParams.get('date'); // YYYY-MM-DD
    const timezone = url.searchParams.get('timezone') || 'America/New_York';

    const tebraApiKey = (env && env.TEBRA_API_KEY) || 'DX80ptIDQ85cfM2aGfv19aKUwRgZ0sKI55jM8P0V';
    const tebraPracticeKey = (env && env.TEBRA_PRACTICE_KEY) || 'k_1_114095';
    const tebraBaseUrl = (env && env.TEBRA_BASE_URL) || 'https://unified-availability-service.api.patientpop.com';

    // Calculate start and end date range (default to query date or 14 days)
    const startDate = dateParam || new Date().toISOString().split('T')[0];
    const targetDateObj = new Date(startDate);
    const endDateObj = new Date(targetDateObj.getTime() + 7 * 24 * 60 * 60 * 1000);
    const endDate = endDateObj.toISOString().split('T')[0];

    const tebraUrl = `${tebraBaseUrl}/v1/availability/practices/${tebraPracticeKey}/locations/1/providers/${providerId}?start_date=${startDate}&end_date=${endDate}&page_size=100&timezone=${encodeURIComponent(timezone)}`;

    const response = await fetch(tebraUrl, {
      headers: {
        'x-api-key': tebraApiKey,
        'User-Agent': 'AmaraPain-AvailabilityService/1.0',
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: `TEBRA_HTTP_${response.status}`,
            message: 'Failed to fetch live availability from Tebra.',
          },
        }),
        { status: response.status, headers: corsHeaders }
      );
    }

    const data = await response.json();
    const appointments = data.appointments || [];
    const exceptions = data.exceptions || [];
    const availabilityRanges = data.availability_ranges || [];
    const duration = data.default_duration || 30;

    // Filter appointments and exceptions for target dateParam if specified
    const targetAppointments = dateParam ? appointments.filter(a => a.date === dateParam) : appointments;
    const targetExceptions = dateParam ? exceptions.filter(e => e.date === dateParam) : exceptions;

    return new Response(
      JSON.stringify({
        success: true,
        date: dateParam || startDate,
        providerId,
        duration,
        timezone,
        appointments: targetAppointments,
        exceptions: targetExceptions,
        availabilityRanges,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: {
          code: 'AVAILABILITY_ERROR',
          message: error.message,
        },
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}
