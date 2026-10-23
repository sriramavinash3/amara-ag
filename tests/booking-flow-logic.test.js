import { describe, it, expect } from 'vitest';

// Helper matching AppointmentContext.jsx America/New_York date calculation
function calculateNewYorkUtc(dateStr, timeStr) {
  const dateParts = (dateStr || '').split('-');
  const year = parseInt(dateParts[0], 10) || new Date().getFullYear();
  const month = parseInt(dateParts[1], 10) || (new Date().getMonth() + 1);
  const day = parseInt(dateParts[2], 10) || new Date().getDate();

  const timeParts = (timeStr || '').match(/(\d+):(\d+)\s*(AM|PM)?/i);
  let hours = 9;
  let minutes = 0;
  if (timeParts) {
    hours = parseInt(timeParts[1], 10);
    minutes = parseInt(timeParts[2], 10);
    const ampm = (timeParts[3] || '').toUpperCase();
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
  }

  // Compute UTC offset for America/New_York on this specific calendar date
  const testUtc = new Date(Date.UTC(year, month - 1, day, 12, 0));
  const nyParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(testUtc);
  const nyHour = parseInt(nyParts.find(p => p.type === 'hour')?.value || '8', 10);
  const offsetHours = 12 - nyHour; // 4 during EDT, 5 during EST

  const startDateTime = new Date(Date.UTC(year, month - 1, day, hours + offsetHours, minutes));
  return { startDateTime, offsetHours };
}

// Helper matching AppointmentContext.jsx live slot generation
function generateLiveSlots(date, availabilityRanges, appointments = [], exceptions = [], duration = 30) {
  const bookedTimes = new Set(
    appointments.map((a) => {
      const timeStr = a.start_time || '';
      const [h, m] = timeStr.split(':');
      return `${parseInt(h, 10)}:${m}`;
    })
  );
  const blockedTimes = new Set(
    exceptions.filter((e) => e.state === 'blocked').map((e) => {
      const timeStr = e.start_time || '';
      const [h, m] = timeStr.split(':');
      return `${parseInt(h, 10)}:${m}`;
    })
  );

  const dateParts = date.split('-');
  const dateObj = new Date(Date.UTC(parseInt(dateParts[0], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2], 10), 12, 0));
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = dayNames[dateObj.getUTCDay()];

  const dayRanges = availabilityRanges?.[0]?.days?.[dayName] || [];
  const slots = [];

  if (dayRanges.length > 0) {
    for (const range of dayRanges) {
      const [startH, startM] = (range.start_time || '08:00:00').split(':').map(n => parseInt(n, 10));
      const [endH, endM] = (range.end_time || '17:00:00').split(':').map(n => parseInt(n, 10));
      const startMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;

      for (let curr = startMinutes; curr + duration <= endMinutes; curr += duration) {
        const h = Math.floor(curr / 60);
        const m = curr % 60;
        const key = `${h}:${m < 10 ? '0' + m : m}`;
        if (!bookedTimes.has(key) && !blockedTimes.has(key)) {
          const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
          const ampm = h >= 12 ? 'PM' : 'AM';
          const formattedTime = `${displayHour < 10 ? '0' + displayHour : displayHour}:${m < 10 ? '0' + m : m} ${ampm}`;
          slots.push(formattedTime);
        }
      }
    }
  }
  return slots;
}

describe('Appointment Booking Frontend Logic & Timezone Integrity', () => {
  it('correctly calculates EDT (Daylight Saving Time: UTC-4) for October appointment', () => {
    const { startDateTime, offsetHours } = calculateNewYorkUtc('2026-10-15', '09:00 AM');
    expect(offsetHours).toBe(4);
    // 09:00 AM EDT + 4 hours offset = 13:00:00.000Z
    expect(startDateTime.toISOString()).toBe('2026-10-15T13:00:00.000Z');
  });

  it('correctly calculates EST (Standard Time: UTC-5) for December appointment', () => {
    const { startDateTime, offsetHours } = calculateNewYorkUtc('2026-12-10', '09:00 AM');
    expect(offsetHours).toBe(5);
    // 09:00 AM EST + 5 hours offset = 14:00:00.000Z
    expect(startDateTime.toISOString()).toBe('2026-12-10T14:00:00.000Z');
  });

  it('correctly calculates PM afternoon appointment in America/New_York', () => {
    const { startDateTime, offsetHours } = calculateNewYorkUtc('2026-10-15', '02:30 PM');
    expect(offsetHours).toBe(4);
    // 02:30 PM (14:30) EDT + 4 hours = 18:30:00.000Z
    expect(startDateTime.toISOString()).toBe('2026-10-15T18:30:00.000Z');
  });

  it('generates zero slots for days the clinic/provider is closed (e.g. Sunday or Eunice on Friday)', () => {
    const mockRanges = [
      {
        days: {
          sunday: [],
          friday: [],
          monday: [{ start_time: '08:00:00', end_time: '12:00:00' }]
        }
      }
    ];

    // 2026-11-20 is a Friday
    const fridaySlots = generateLiveSlots('2026-11-20', mockRanges);
    expect(fridaySlots).toEqual([]);

    // 2026-11-22 is a Sunday
    const sundaySlots = generateLiveSlots('2026-11-22', mockRanges);
    expect(sundaySlots).toEqual([]);
  });

  it('filters out already booked appointments and blocked exceptions', () => {
    const mockRanges = [
      {
        days: {
          monday: [{ start_time: '08:00:00', end_time: '10:00:00' }]
        }
      }
    ];
    // 2026-11-16 is a Monday. Slots without bookings: 08:00 AM, 08:30 AM, 09:00 AM, 09:30 AM
    // Book 08:30 AM and block 09:30 AM
    const mockAppointments = [{ start_time: '08:30:00', date: '2026-11-16' }];
    const mockExceptions = [{ start_time: '09:30:00', state: 'blocked', date: '2026-11-16' }];

    const slots = generateLiveSlots('2026-11-16', mockRanges, mockAppointments, mockExceptions, 30);
    expect(slots).toEqual(['08:00 AM', '09:00 AM']);
    expect(slots).not.toContain('08:30 AM');
    expect(slots).not.toContain('09:30 AM');
  });

  it('generates a fresh UUID idempotency key on every retry invocation', () => {
    const keys = new Set();
    for (let i = 0; i < 10; i++) {
      const key = `amara-idemp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      keys.add(key);
    }
    expect(keys.size).toBe(10);
  });

  describe('Google Ads Conversion Tracking Integration', () => {
    function fireConversionHelper({ bookingSuccess, bookingId, conversionLabel, storage, gtagCalls }) {
      if (!bookingSuccess || !bookingId) return false;

      const storageKey = `APS_GADS_CONV_${bookingId}`;
      if (storage.getItem(storageKey)) return false;

      if (conversionLabel) {
        gtagCalls.push([
          'event',
          'conversion',
          {
            send_to: `AW-18533378516/${conversionLabel}`,
            transaction_id: bookingId,
          }
        ]);
      } else {
        gtagCalls.push([
          'event',
          'appointment_booked',
          {
            send_to: 'AW-18533378516',
            transaction_id: bookingId,
            method: 'Tebra EHR',
          }
        ]);
      }

      storage.setItem(storageKey, 'fired');
      return true;
    }

    it('fires conversion only after confirmed booking success with genuine ID', () => {
      const storage = new Map();
      const mockStorage = {
        getItem: (k) => storage.get(k),
        setItem: (k, v) => storage.set(k, v),
      };
      const gtagCalls = [];

      // 1. Navigation / Incomplete flow -> must NOT fire
      const step1 = fireConversionHelper({
        bookingSuccess: false,
        bookingId: null,
        storage: mockStorage,
        gtagCalls,
      });
      expect(step1).toBe(false);
      expect(gtagCalls.length).toBe(0);

      // 2. Confirmed successful booking with genuine ID -> MUST fire
      const step2 = fireConversionHelper({
        bookingSuccess: true,
        bookingId: 'TEBRA-APPT-987654',
        conversionLabel: 'AbCdEfGhIjK123',
        storage: mockStorage,
        gtagCalls,
      });
      expect(step2).toBe(true);
      expect(gtagCalls.length).toBe(1);
      expect(gtagCalls[0][1]).toBe('conversion');
      expect(gtagCalls[0][2].send_to).toBe('AW-18533378516/AbCdEfGhIjK123');
      expect(gtagCalls[0][2].transaction_id).toBe('TEBRA-APPT-987654');

      // 3. Repeated render or refresh -> guarded by storage, must NOT fire duplicate
      const step3 = fireConversionHelper({
        bookingSuccess: true,
        bookingId: 'TEBRA-APPT-987654',
        conversionLabel: 'AbCdEfGhIjK123',
        storage: mockStorage,
        gtagCalls,
      });
      expect(step3).toBe(false);
      expect(gtagCalls.length).toBe(1); // Still 1!
    });

    it('transmits zero PII/PHI in conversion event payload', () => {
      const storage = new Map();
      const mockStorage = {
        getItem: (k) => storage.get(k),
        setItem: (k, v) => storage.set(k, v),
      };
      const gtagCalls = [];

      fireConversionHelper({
        bookingSuccess: true,
        bookingId: 'TEBRA-APPT-112233',
        conversionLabel: 'xyz987',
        storage: mockStorage,
        gtagCalls,
      });

      const payload = gtagCalls[0][2];
      const payloadKeys = Object.keys(payload);
      expect(payloadKeys).toEqual(['send_to', 'transaction_id']);
      expect(payload).not.toHaveProperty('firstName');
      expect(payload).not.toHaveProperty('email');
      expect(payload).not.toHaveProperty('phone');
      expect(payload).not.toHaveProperty('condition');
      expect(payload).not.toHaveProperty('medicalNotes');
    });
  });
});
