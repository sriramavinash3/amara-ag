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
        const { appointments = [], exceptions = [], duration = 30 } = response.data;
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
        const slots = [];
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

  // Submit the booking to production Tebra API
  const submitAppointment = async () => {
    // Guard against duplicate in-flight submissions
    if (isSubmitting) return;

    // Guard against re-submitting an already completed booking
    if (bookingStatus === 'booking_confirmed' || bookingStatus === 'booking_pending') {
      return;
    }

    setIsSubmitting(true);
    setBookingStatus('submitting');
    setBookingError(null);
    
    try {
      // Parse selectedDate and selectedTime to ISO format in America/New_York timezone
      const dateParts = selectedDate.split('-');
      const timeParts = selectedTime.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      
      let hours = 9;
      let minutes = 0;
      if (timeParts) {
        hours = parseInt(timeParts[1], 10);
        minutes = parseInt(timeParts[2], 10);
        const ampm = (timeParts[3] || '').toUpperCase();
        if (ampm === 'PM' && hours < 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;
      }

      // Construct Date in local time, then output ISO string
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const day = parseInt(dateParts[2], 10);
      const startDateTime = new Date(year, month, day, hours, minutes);
      const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);

      const payload = {
        idempotencyKey,
        providerName: selectedProvider,
        patient: {
          firstName: patientDetails.firstName.trim(),
          lastName: patientDetails.lastName.trim(),
          email: patientDetails.email.trim(),
          phone: patientDetails.phone.trim(),
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

      const response = await axios.post('/api/v1/appointments/smart', payload, {
        headers: {
          'X-Idempotency-Key': idempotencyKey,
          'Content-Type': 'application/json',
        },
        timeout: 25000,
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
      
      let formattedError = {
        code: errorData?.code || `HTTP_${statusCode || 'NETWORK_ERROR'}`,
        message: errorData?.message || (
          statusCode === 409
            ? 'The selected appointment slot is no longer available. Please select another time.'
            : 'Unable to connect to the clinic scheduling system. Please call us directly at (704) 503-9338.'
        ),
        isSlotUnavailable: statusCode === 409 || errorData?.code === 'SLOT_UNAVAILABLE',
        details: errorData?.details || err.message,
      };

      setBookingStatus('booking_failed');
      setBookingSuccess(false);
      setBookingError(formattedError);
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
    bookingSuccess,
    bookingError,
    bookingResult,
    generatedBookingId,
    liveSlots,
    isLoadingSlots,
    availabilityError,
    fetchAvailability,
    nextStep,
    prevStep,
    resetWizard,
    submitAppointment,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}
