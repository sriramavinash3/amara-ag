import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AppointmentContext = createContext();

export function useAppointment() {
  return useContext(AppointmentContext);
}

export function AppointmentProvider({ children }) {
  const [step, setStep] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    insurance: '',
    comments: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // bookingStatus: 'idle' | 'submitting' | 'booking_created' | 'booking_confirmed' | 'booking_pending' | 'booking_failed'
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  // Live availability slots from Tebra
  const [liveSlots, setLiveSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(null);

  // Client-side idempotency session key
  const [idempotencyKey, setIdempotencyKey] = useState(() => {
    return typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `amara-idemp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  });

  // Move forward in the wizard
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  
  // Move backward in the wizard
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Reset the wizard state
  const resetWizard = () => {
    setStep(1);
    setSelectedCondition('');
    setSelectedTreatment('');
    setSelectedProvider('');
    setSelectedDate('');
    setSelectedTime('');
    setPatientDetails({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      insurance: '',
      comments: '',
    });
    setBookingStatus('idle');
    setBookingSuccess(false);
    setBookingError(null);
    setBookingResult(null);
    setGeneratedBookingId('');
    setLiveSlots([]);
    setAvailabilityError(null);
    setIdempotencyKey(
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `amara-idemp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    );
  };

  // Query live Tebra calendar openings for a provider and date
  const fetchAvailability = useCallback(async (provider, date) => {
    if (!provider || !date) {
      setLiveSlots([]);
      return;
    }
    setIsLoadingSlots(true);
    setAvailabilityError(null);
    try {
      const response = await axios.get('/api/availability', {
        params: {
          providerName: provider,
          date: date,
          timezone: 'America/New_York',
        },
      });
      if (response.data && response.data.success) {
        const { appointments = [], exceptions = [], availabilityRanges = [], duration = 30 } = response.data;
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

        // Determine day of the week in UTC from date string (YYYY-MM-DD)
        const dateParts = date.split('-');
        const dateObj = new Date(Date.UTC(parseInt(dateParts[0], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2], 10), 12, 0));
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayName = dayNames[dateObj.getUTCDay()];

        const dayRanges = availabilityRanges?.[0]?.days?.[dayName] || [];
        const slots = [];

        if (dayRanges.length > 0) {
          // Use Tebra's verified provider working ranges for this specific day
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
        } else if (availabilityRanges.length === 0) {
          // Fallback if ranges unavailable: Mon-Fri standard clinic hours
          if (dayName !== 'saturday' && dayName !== 'sunday') {
            for (let h = 8; h < 17; h++) {
              if (h === 12) continue; // Lunch
              for (let m = 0; m < 60; m += duration) {
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
        }
        setLiveSlots(slots);
      } else {
        setLiveSlots([]);
      }
    } catch (err) {
      console.warn('Could not query real-time Tebra availability:', err.message);
      setAvailabilityError(err.message);
      setLiveSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  }, []);

  // Fetch slots whenever selectedProvider and selectedDate change
  useEffect(() => {
    let ignore = false;
    if (selectedProvider && selectedDate) {
      const timer = setTimeout(() => {
        if (!ignore) {
          fetchAvailability(selectedProvider, selectedDate);
        }
      }, 0);
      return () => {
        ignore = true;
        clearTimeout(timer);
      };
    }
  }, [selectedProvider, selectedDate, fetchAvailability]);

  // Helper to persist genuine booking record to localStorage
  const saveBookingToLocalStorage = (result) => {
    const newLead = {
      id: result.referenceId || result.appointmentToken,
      appointmentToken: result.appointmentToken,
      type: 'appointment',
      dateCreated: new Date().toISOString(),
      status: result.status || 'PENDING_CLINIC_CONFIRMATION',
      condition: selectedCondition,
      treatment: selectedTreatment,
      provider: selectedProvider,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      patient: {
        firstName: patientDetails.firstName,
        lastName: patientDetails.lastName,
        email: patientDetails.email,
        phone: patientDetails.phone,
        dob: patientDetails.dob,
        insurance: patientDetails.insurance || 'N/A',
        comments: patientDetails.comments || ''
      }
    };
    try {
      const existingLeads = JSON.parse(localStorage.getItem('APS_LEADS') || '[]');
      existingLeads.unshift(newLead);
      localStorage.setItem('APS_LEADS', JSON.stringify(existingLeads));
    } catch (storageErr) {
      console.error('Failed to save appointment to localStorage:', storageErr);
    }
  };

  // Generate fresh idempotency key
  const generateNewIdempotencyKey = useCallback(() => {
    const newKey = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `amara-idemp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setIdempotencyKey(newKey);
    return newKey;
  }, []);

  // Clear booking error and return status to idle
  const clearBookingError = useCallback(() => {
    setBookingError(null);
    if (bookingStatus === 'booking_failed') {
      setBookingStatus('idle');
    }
  }, [bookingStatus]);

  // Submit the booking to production Tebra API
  const submitAppointment = async () => {
    // Guard against duplicate in-flight submissions
    if (isSubmitting) return;

    // Guard against re-submitting an already completed booking
    if (bookingStatus === 'booking_confirmed' || bookingStatus === 'booking_pending') {
      return;
    }

    // Refresh idempotency key if retrying after a failed submission
    let activeKey = idempotencyKey;
    if (bookingStatus === 'booking_failed' || !activeKey) {
      activeKey = generateNewIdempotencyKey();
    }

    setIsSubmitting(true);
    setBookingStatus('submitting');
    setBookingError(null);
    
    try {
      // Parse selectedDate and selectedTime to ISO format specifically in America/New_York timezone
      const dateParts = (selectedDate || '').split('-');
      const year = parseInt(dateParts[0], 10) || new Date().getFullYear();
      const month = parseInt(dateParts[1], 10) || (new Date().getMonth() + 1);
      const day = parseInt(dateParts[2], 10) || new Date().getDate();

      const timeParts = (selectedTime || '').match(/(\d+):(\d+)\s*(AM|PM)?/i);
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
      const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);

      const payload = {
        idempotencyKey: activeKey,
        providerName: selectedProvider,
        patient: {
          firstName: (patientDetails.firstName || '').trim(),
          lastName: (patientDetails.lastName || '').trim(),
          email: (patientDetails.email || '').trim(),
          phone: (patientDetails.phone || '').trim(),
          dob: patientDetails.dob || '1990-01-01',
          insurance: patientDetails.insurance ? patientDetails.insurance.trim() : '',
          comments: patientDetails.comments ? patientDetails.comments.trim() : '',
        },
        appointment: {
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          duration: 30,
          notes: `Area/Condition: ${selectedCondition || 'General'} | Treatment Preference: ${selectedTreatment || 'Consultation'} | Patient Notes: ${patientDetails.comments || 'None'}`
        }
      };

      const response = await axios.post('/api/v1/appointments/smart', payload, {
        headers: {
          'X-Idempotency-Key': activeKey,
          'Content-Type': 'application/json',
        },
        timeout: 18000,
      });

      if (response.data && response.data.success) {
        const resultData = response.data.data || {};
        const returnedStatus = response.data.status || 'booking_pending';

        setBookingResult(resultData);
        setBookingStatus(returnedStatus);
        setBookingSuccess(true);

        const genuineId = resultData.referenceId || resultData.appointmentToken || '';
        setGeneratedBookingId(genuineId);

        saveBookingToLocalStorage(resultData);
      } else {
        const errorInfo = response.data?.error || {
          code: 'BOOKING_FAILED',
          message: response.data?.message || 'Unable to confirm appointment with Tebra.',
        };
        setBookingStatus('booking_failed');
        setBookingSuccess(false);
        setBookingError(errorInfo);
      }
    } catch (err) {
      console.error('Tebra production booking error:', err);
      
      const errorData = err.response?.data?.error;
      const statusCode = err.response?.status;
      const isTimeout = err.code === 'ECONNABORTED' || err.message?.includes('timeout') || statusCode === 504;

      if (isTimeout) {
        // Attempt an immediate idempotent verification probe to check if Tebra completed the booking
        try {
          const verifyProbe = await axios.get(`/api/v1/appointments/smart?verifyKey=${encodeURIComponent(activeKey)}`, {
            timeout: 5000,
          });
          if (verifyProbe.data && verifyProbe.data.success) {
            const resultData = verifyProbe.data.data || {};
            setBookingResult(resultData);
            setBookingStatus(verifyProbe.data.status || 'booking_pending');
            setBookingSuccess(true);
            const genuineId = resultData.referenceId || resultData.appointmentToken || '';
            setGeneratedBookingId(genuineId);
            saveBookingToLocalStorage(resultData);
            return;
          }
        } catch (probeErr) {
          console.warn('Verification probe following timeout did not find recorded booking:', probeErr.message);
        }

        // Handle ambiguous booking state without assuming failure or causing duplicate appointments
        setBookingStatus('booking_ambiguous');
        setBookingSuccess(false);
        setBookingError({
          code: 'AMBIGUOUS_TIMEOUT',
          message: 'Your booking details were submitted to our scheduling server, but confirmation timed out. To prevent duplicate bookings, please do not resubmit. Our clinical coordinator will verify your slot directly with Tebra.',
          isAmbiguous: true,
          details: err.message,
        });
        return;
      }

      const isSlotConflict =
        statusCode === 409 ||
        errorData?.isSlotUnavailable ||
        errorData?.code === 'SLOT_UNAVAILABLE' ||
        err.message?.toLowerCase().includes('slot') ||
        errorData?.details?.toLowerCase().includes('slot') ||
        errorData?.message?.toLowerCase().includes('slot') ||
        errorData?.details?.toLowerCase().includes('conflict') ||
        errorData?.details?.toLowerCase().includes('not available');

      // Refresh slot availability immediately if slot is no longer available
      if (isSlotConflict && selectedProvider && selectedDate) {
        fetchAvailability(selectedProvider, selectedDate);
      }

      const formattedError = {
        code: errorData?.code || `HTTP_${statusCode || 'NETWORK_ERROR'}`,
        message: errorData?.message || (
          isSlotConflict
            ? 'The selected appointment slot is no longer available. Please select another time.'
            : 'Unable to connect to the clinic scheduling system. Please call us directly at (704) 503-9338.'
        ),
        isSlotUnavailable: isSlotConflict,
        isValidationError: errorData?.code === 'VALIDATION_ERROR' || statusCode === 400,
        details: errorData?.details || err.message,
      };

      setBookingStatus('booking_failed');
      setBookingSuccess(false);
      setBookingError(formattedError);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dedicated manual verification function for ambiguous booking states
  const verifyAmbiguousBooking = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const verifyProbe = await axios.get(`/api/v1/appointments/smart?verifyKey=${encodeURIComponent(idempotencyKey)}`, {
        timeout: 5000,
      });
      if (verifyProbe.data && verifyProbe.data.success) {
        const resultData = verifyProbe.data.data || {};
        setBookingResult(resultData);
        setBookingStatus(verifyProbe.data.status || 'booking_pending');
        setBookingSuccess(true);
        const genuineId = resultData.referenceId || resultData.appointmentToken || '';
        setGeneratedBookingId(genuineId);
        saveBookingToLocalStorage(resultData);
      } else {
        setBookingError({
          code: 'AMBIGUOUS_UNVERIFIED',
          message: 'Confirmation is still pending in the clinical portal. Please call our clinic at (704) 503-9338 for instant assistance.',
          isAmbiguous: true,
        });
      }
    } catch {
      setBookingError({
        code: 'AMBIGUOUS_UNVERIFIED',
        message: 'Unable to check status online right now. Please call our clinic at (704) 503-9338.',
        isAmbiguous: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = {
    step,
    setStep,
    selectedCondition,
    setSelectedCondition,
    selectedTreatment,
    setSelectedTreatment,
    selectedProvider,
    setSelectedProvider,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    patientDetails,
    setPatientDetails,
    isSubmitting,
    bookingStatus,
    setBookingStatus,
    bookingSuccess,
    bookingError,
    setBookingError,
    clearBookingError,
    bookingResult,
    generatedBookingId,
    liveSlots,
    isLoadingSlots,
    availabilityError,
    fetchAvailability,
    generateNewIdempotencyKey,
    nextStep,
    prevStep,
    resetWizard,
    submitAppointment,
    verifyAmbiguousBooking,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}
