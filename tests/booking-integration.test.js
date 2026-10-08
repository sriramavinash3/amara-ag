import { describe, it, expect } from 'vitest';
import axios from 'axios';

// Live production deployment endpoint
const BASE_URL = 'https://ca947623.amara-pain-3t7.pages.dev';

const headers = {
  'Content-Type': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

describe('Live Tebra Integration & Booking Boundary Suite', { timeout: 25000 }, () => {
  it('A. Discovery: Queries live Tebra provider availability and working ranges', async () => {
    const res = await axios.get(`${BASE_URL}/api/availability`, {
      params: {
        providerName: 'Ashvin K. Amara, MD',
        date: '2026-11-16',
        timezone: 'America/New_York'
      },
      headers,
      timeout: 10000
    });

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.providerId).toBe('1');
    expect(res.data.availabilityRanges).toBeDefined();
    expect(Array.isArray(res.data.appointments)).toBe(true);
  });

  it('B. Validation: Rejects submission missing required patient name with HTTP 400', async () => {
    try {
      await axios.post(`${BASE_URL}/api/v1/appointments/smart`, {
        providerName: 'Ashvin K. Amara, MD',
        patient: {
          firstName: '',
          lastName: '',
          email: 'invalid@example.com',
          phone: '7045550199'
        },
        appointment: {
          startTime: '2026-11-16T14:00:00.000Z'
        }
      }, { headers, timeout: 10000 });
      throw new Error('Expected HTTP 400 error but request succeeded');
    } catch (err) {
      expect(err.response?.status).toBe(400);
      expect(err.response?.data.success).toBe(false);
      expect(err.response?.data.error.code).toBe('MISSING_PATIENT_NAME');
      expect(err.response?.data.error.message).toContain('First name and last name are required');
    }
  });

  it('B. Validation: Rejects submission with invalid phone number with HTTP 400', async () => {
    try {
      await axios.post(`${BASE_URL}/api/v1/appointments/smart`, {
        providerName: 'Ashvin K. Amara, MD',
        patient: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          phone: '123' // Invalid short phone
        },
        appointment: {
          startTime: '2026-11-16T14:00:00.000Z'
        }
      }, { headers, timeout: 10000 });
      throw new Error('Expected HTTP 400 error but request succeeded');
    } catch (err) {
      expect(err.response?.status).toBe(400);
      expect(err.response?.data.error.code).toBe('INVALID_PHONE');
      expect(err.response?.data.error.message).toContain('valid 10-digit phone number');
    }
  });

  it('C. Booking: Successfully creates a genuine appointment on Tebra with real verification code', async () => {
    // Dynamically find an unbooked slot on a future Monday
    const availRes = await axios.get(`${BASE_URL}/api/availability`, {
      params: {
        providerName: 'Ashvin K. Amara, MD',
        date: '2026-12-07',
        timezone: 'America/New_York'
      },
      headers,
      timeout: 10000
    });

    const bookedStarts = new Set((availRes.data.appointments || []).map(a => a.startTime || a.start_time));
    // Possible Monday slot times in UTC (EST is UTC-5 in December: 9 AM EST = 14:00 UTC, 10 AM EST = 15:00 UTC, etc.)
    const candidateSlots = [
      '2026-12-07T14:00:00.000Z',
      '2026-12-07T14:30:00.000Z',
      '2026-12-07T15:00:00.000Z',
      '2026-12-07T15:30:00.000Z',
      '2026-12-07T16:00:00.000Z',
      '2026-12-07T18:30:00.000Z',
      '2026-12-07T19:00:00.000Z',
      '2026-12-07T19:30:00.000Z',
      '2026-12-07T20:00:00.000Z',
      '2026-12-07T20:30:00.000Z'
    ];
    const freeSlot = candidateSlots.find(s => !bookedStarts.has(s)) || `2026-12-14T14:00:00.000Z`;

    const idempKey = `vitest-live-${Date.now()}`;
    const payload = {
      idempotencyKey: idempKey,
      providerName: 'Ashvin K. Amara, MD',
      patient: {
        firstName: 'VitestLive',
        lastName: 'E2EPatient',
        email: 'viteste2e@example.com',
        phone: '7045550199',
        dob: '1987-03-25',
        insurance: 'Aetna',
        comments: 'Automated Vitest Integration Test'
      },
      appointment: {
        startTime: freeSlot,
        duration: 30,
        notes: 'Consultation'
      }
    };

    const res = await axios.post(`${BASE_URL}/api/v1/appointments/smart`, payload, {
      headers: { ...headers, 'X-Idempotency-Key': idempKey },
      timeout: 15000
    });

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.data.appointmentToken).toBeDefined();
    // Genuine Tebra reference code
    expect(res.data.data.referenceId).toMatch(/^TEBRA-[A-F0-9]{8}$/);
    expect(res.data.data.referenceId).not.toContain('MOCK');
    expect(res.data.data.status).toBe('PENDING_CLINIC_CONFIRMATION');
  });

  it('D. Conflict & Retry: Detects an already reserved slot and returns HTTP 409 SLOT_UNAVAILABLE', async () => {
    // 2026-10-15T13:00:00.000Z is an already reserved slot on provider 1
    const conflictPayload = {
      idempotencyKey: `vitest-conflict-${Date.now()}`,
      providerName: 'Ashvin K. Amara, MD',
      patient: {
        firstName: 'Duplicate',
        lastName: 'Attempt',
        email: 'dup@example.com',
        phone: '7045550199',
        dob: '1990-01-01'
      },
      appointment: {
        startTime: '2026-10-15T13:00:00.000Z',
        duration: 30
      }
    };

    try {
      await axios.post(`${BASE_URL}/api/v1/appointments/smart`, conflictPayload, {
        headers,
        timeout: 10000
      });
      throw new Error('Expected HTTP 409 conflict but request succeeded');
    } catch (err) {
      expect(err.response?.status).toBe(409);
      expect(err.response?.data.error.code).toBe('SLOT_UNAVAILABLE');
      expect(err.response?.data.error.isSlotUnavailable).toBe(true);
      expect(err.response?.data.error.message).toContain('no longer available');
    }
  });
});
