import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAppointment } from '../context/AppointmentContext';
import { conditions, treatments } from '../utils/medicalData';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { 
  CheckCircle2, ChevronRight, ChevronLeft, Calendar, ShieldAlert, ShieldCheck, 
  FileText, Info, Award, Phone, AlertTriangle, RefreshCw, Clock, Loader2 
} from 'lucide-react';
import '../styles/skeuomorphic.css';

export default function BookAppointment() {
  const location = useLocation();
  const {
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
    nextStep,
    prevStep,
    resetWizard,
    submitAppointment,
  } = useAppointment();

  // Handle pre-filled state when navigating from a specific condition/treatment page
  useEffect(() => {
    if (location.state) {
      if (location.state.prefilledCondition) {
        setSelectedCondition(location.state.prefilledCondition);
        setStep(2); // Jump to treatment selection
      }
      if (location.state.prefilledTreatment) {
        setSelectedTreatment(location.state.prefilledTreatment);
        setStep(3); // Jump to provider selection
      }
    }
  }, [location.state, setSelectedCondition, setSelectedTreatment, setStep]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails(prev => ({ ...prev, [name]: value }));
  };

  const providers = [
    { name: 'Ashvin K. Amara, MD', role: 'Founder & Medical Director' },
    { name: 'Alexander Carmenaty Rodriguez, MSN, FNP-C', role: 'Board-Certified Family Nurse Practitioner' },
    { name: 'Eunice Babalola, NP, MSN', role: 'Board-Certified Family Nurse Practitioner' },
    { name: 'First Available Clinical Provider', role: 'Fastest Schedule Option' }
  ];

  const defaultTimeSlots = [
    '08:30 AM', '09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM',
    '01:30 PM', '02:15 PM', '03:00 PM', '03:45 PM', '04:15 PM'
  ];

  const activeTimeSlots = liveSlots && liveSlots.length > 0 ? liveSlots : defaultTimeSlots;


  // Helper to check if step is complete to enable "Next"
  const isStepValid = () => {
    switch (step) {
      case 1: return !!selectedCondition;
      case 2: return !!selectedTreatment;
      case 3: return !!selectedProvider;
      case 4: return !!selectedDate && !!selectedTime;
      case 5: return (
        !!patientDetails.firstName &&
        !!patientDetails.lastName &&
        !!patientDetails.email &&
        !!patientDetails.phone &&
        !!patientDetails.dob
      );
      default: return false;
    }
  };

  return (
    <div className="w-full relative py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto text-left">

      {/* Clinic Reassurance & Senior Patient Consultation Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#363434] rounded-3xl p-6 md:p-8 border border-[#585454] shadow-2xl relative z-10 mb-8">
        <div className="md:col-span-8 space-y-2">
          <Badge variant="secondary" className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-bold uppercase tracking-widest text-[10px]">
            Direct Patient Intake
          </Badge>
          <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-[#FFFFFF] leading-tight">
            Schedule Your Dedicated Consultation
          </h1>
          <p className="text-sm text-[#F0F0F0] leading-relaxed font-normal">
            Direct, same-week appointments with our double-certified specialists in Charlotte, NC. We charge one flat, transparent office fee with zero hospital facility charges.
          </p>
          <div className="flex flex-wrap gap-4 pt-1 text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Medicare &amp; BCBS Accepted</span>
            <span className="flex items-center gap-1.5"><Award className="h-4 w-4 text-emerald-400" /> Same-Week Availability</span>
          </div>
        </div>
        <div className="md:col-span-4 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#585454] shadow-sm bg-[#323030]">
          <img 
            src="/images/audience/warm_clinic_scheduling.jpg" 
            alt="Patient care coordinator warmly scheduling an appointment at modern clinic front desk"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>

      {/* 1. WIZARD STEPS PROGRESS INDICATOR */}
      {!bookingSuccess && (
        <div className="space-y-4 relative z-10 my-8">
          <div className="flex items-center gap-1.5 text-xs text-[#D1D5DB] font-semibold uppercase tracking-wider">
            <span>Scheduling Flow</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-emerald-400 font-bold">Step {step} of 5</span>
          </div>
          
          {/* Visual Progress Bar */}
          <div className="w-full bg-[#363434] h-2.5 rounded-full overflow-hidden flex border border-[#585454]">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 h-full border-r border-[#3A3838] last:border-0 transition-colors duration-300 ${
                  i < step ? 'bg-emerald-500' : 'bg-[#454242]'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. WIZARD STEP CONTENTS */}
      <Card variant="white" padding="lg" className="border-[#585454] shadow-2xl relative min-h-[450px] flex flex-col justify-between z-10 bg-[#454242] p-8 rounded-3xl my-8">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-950/20 rounded-full blur-xl -z-10" />

        {/* STEP 1: SELECT CONDITION */}
        {step === 1 && !bookingSuccess && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="primary" className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-bold">Step 1</Badge>
              <h2 className="text-[22px] font-black font-heading text-[#FFFFFF]">What primary pain area are we treating?</h2>
              <p className="text-sm text-[#F0F0F0] leading-relaxed font-medium">Select the condition that best describes your pain. This helps us pre-configure clinical protocols.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {Object.values(conditions).map((cond) => (
                <button
                  key={cond.id}
                  type="button"
                  onClick={() => {
                    setSelectedCondition(cond.title);
                    nextStep();
                  }}
                  className={`px-5 py-4 rounded-xl border font-bold text-left transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                    selectedCondition === cond.title
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-sm'
                      : 'border-[#585454] bg-[#363434] text-[#FFFFFF] hover:border-emerald-500/50 hover:bg-[#514E4E]'
                  }`}
                >
                  <span>{cond.title}</span>
                  <CheckCircle2 className={`h-5 w-5 transition-opacity duration-200 ${
                    selectedCondition === cond.title ? 'text-emerald-400 opacity-100' : 'text-[#585454] opacity-0 group-hover:opacity-100'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: SELECT TREATMENT */}
        {step === 2 && !bookingSuccess && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="primary" className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-bold">Step 2</Badge>
              <h2 className="text-[22px] font-black font-heading text-[#FFFFFF]">Choose a preferred treatment type</h2>
              <p className="text-sm text-[#F0F0F0] leading-relaxed font-medium">If you are unsure, select "First Consultation / Diagnostic Block" and Amara will diagnose you.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Diagnostic Consultation option */}
              <button
                type="button"
                onClick={() => {
                  setSelectedTreatment("Diagnostic Consultation / Specialist Evaluation");
                  nextStep();
                }}
                className={`px-5 py-4 rounded-xl border font-bold text-left transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                  selectedTreatment === "Diagnostic Consultation / Specialist Evaluation"
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-sm'
                    : 'border-[#585454] bg-[#363434] text-[#FFFFFF] hover:border-emerald-500/50 hover:bg-[#514E4E]'
                }`}
              >
                <span>Diagnostic Consultation &amp; Evaluation</span>
                <CheckCircle2 className="h-5 w-5 text-emerald-400 animate-pulse" />
              </button>

              {Object.values(treatments).map((treat) => (
                <button
                  key={treat.id}
                  type="button"
                  onClick={() => {
                    setSelectedTreatment(treat.title);
                    nextStep();
                  }}
                  className={`px-5 py-4 rounded-xl border font-bold text-left transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                    selectedTreatment === treat.title
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-sm'
                      : 'border-[#585454] bg-[#363434] text-[#FFFFFF] hover:border-emerald-500/50 hover:bg-[#514E4E]'
                  }`}
                >
                  <span>{treat.title}</span>
                  <CheckCircle2 className={`h-5 w-5 transition-opacity duration-200 ${
                    selectedTreatment === treat.title ? 'text-emerald-400 opacity-100' : 'text-[#585454] opacity-0 group-hover:opacity-100'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: CHOOSE PROVIDER */}
        {step === 3 && !bookingSuccess && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="primary" className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-bold">Step 3</Badge>
              <h2 className="text-[22px] font-black font-heading text-[#FFFFFF]">Select your medical provider</h2>
              <p className="text-sm text-[#F0F0F0] leading-relaxed font-medium">Choose a specific clinical specialist or select First Available for faster appointment slots.</p>
            </div>

            <div className="bg-[#363434] border border-[#585454] rounded-xl p-4 flex gap-3 text-sm text-[#F0F0F0] leading-relaxed shadow-sm">
              <Info className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-[#FFFFFF]">Clinical Specialist Scheduling:</strong>
                Select your desired specialist to query their live calendar openings in Charlotte, NC, or pick First Available for the earliest consultation slot.
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {providers.map((prov, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedProvider(prov.name);
                    nextStep();
                  }}
                  className={`w-full px-5 py-4 rounded-xl border font-bold text-left transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                    selectedProvider === prov.name
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-sm'
                      : 'border-[#585454] bg-[#363434] text-[#FFFFFF] hover:border-emerald-500/50 hover:bg-[#514E4E]'
                  }`}
                >
                  <div>
                    <span>{prov.name}</span>
                    <span className="block text-xs text-[#D1D5DB] font-medium mt-0.5">{prov.role}</span>
                  </div>
                  <CheckCircle2 className={`h-5 w-5 transition-opacity duration-200 ${
                    selectedProvider === prov.name ? 'text-emerald-400 opacity-100' : 'text-[#585454] opacity-0 group-hover:opacity-100'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: CHOOSE DATE & TIME */}
        {step === 4 && !bookingSuccess && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="primary" className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-bold">Step 4</Badge>
              <h2 className="text-[22px] font-black font-heading text-[#FFFFFF]">Choose an appointment slot</h2>
              <p className="text-sm text-[#F0F0F0] leading-relaxed font-medium">Select a convenient date and an available morning or afternoon time slot.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 text-left">
              {/* Date picker (Left) */}
              <div className="md:col-span-5 space-y-2">
                <label htmlFor="appt-date-picker" className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">Select Date</label>
                <input
                  id="appt-date-picker"
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]} // Block past dates
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#363434] border border-[#585454] text-[#FFFFFF] rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm transition-all duration-200"
                />
              </div>

              {/* Time Slots (Right) */}
              <div className="md:col-span-7 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">Available Time Slots</label>
                  {isLoadingSlots && (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Querying Tebra...
                    </span>
                  )}
                  {liveSlots && liveSlots.length > 0 && !isLoadingSlots && (
                    <Badge variant="secondary" className="bg-emerald-950/40 text-emerald-300 border-emerald-800/40 text-[10px] font-bold">
                      Live Openings
                    </Badge>
                  )}
                </div>

                {selectedDate ? (
                  <div className="grid grid-cols-2 gap-2.5 max-h-[280px] overflow-y-auto pr-1">
                    {activeTimeSlots.map((time, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2.5 rounded-xl border text-sm font-bold text-center transition-all duration-200 cursor-pointer ${
                          selectedTime === time
                            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-sm'
                            : 'border-[#585454] bg-[#363434] text-[#FFFFFF] hover:bg-[#514E4E]'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 bg-[#363434] border border-dashed border-[#585454] rounded-xl text-[#D1D5DB] text-sm">
                    <Calendar className="h-8 w-8 mb-2 text-[#D1D5DB] animate-pulse" />
                    <span>Please choose a date first to load slots</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: PATIENT DETAILS & CONFIRMATION */}
        {step === 5 && !bookingSuccess && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="primary" className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-bold">Step 5</Badge>
              <h2 className="text-[22px] font-black font-heading text-[#FFFFFF]">Enter patient details</h2>
              <p className="text-sm text-[#F0F0F0] leading-relaxed font-medium">Provide your basic credentials. Your information is protected under HIPAA-conscious safeguards.</p>
            </div>
            
            {/* Split layout: inputs vs selection summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 text-left">
              {/* Inputs */}
              <div className="md:col-span-7 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="appt-first-name" className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">First Name</label>
                    <input
                      id="appt-first-name"
                      type="text"
                      name="firstName"
                      required
                      value={patientDetails.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className="w-full px-4 py-2 bg-[#363434] border border-[#585454] text-[#FFFFFF] placeholder-[#D1D5DB] rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="appt-last-name" className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">Last Name</label>
                    <input
                      id="appt-last-name"
                      type="text"
                      name="lastName"
                      required
                      value={patientDetails.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className="w-full px-4 py-2 bg-[#363434] border border-[#585454] text-[#FFFFFF] placeholder-[#D1D5DB] rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="appt-phone" className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">Phone</label>
                    <input
                      id="appt-phone"
                      type="tel"
                      name="phone"
                      required
                      value={patientDetails.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 704-555-0199"
                      className="w-full px-4 py-2 bg-[#363434] border border-[#585454] text-[#FFFFFF] placeholder-[#D1D5DB] rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="appt-dob" className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">Date of Birth</label>
                    <input
                      id="appt-dob"
                      type="date"
                      name="dob"
                      required
                      value={patientDetails.dob}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#363434] border border-[#585454] text-[#FFFFFF] rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="appt-email" className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">Email Address</label>
                  <input
                    id="appt-email"
                    type="email"
                    name="email"
                    required
                    value={patientDetails.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full px-4 py-2 bg-[#363434] border border-[#585454] text-[#FFFFFF] placeholder-[#D1D5DB] rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="appt-insurance" className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">Insurance Provider (Optional)</label>
                  <input
                    id="appt-insurance"
                    type="text"
                    name="insurance"
                    value={patientDetails.insurance}
                    onChange={handleInputChange}
                    placeholder="e.g. BCBS, Medicare, United"
                    className="w-full px-4 py-2 bg-[#363434] border border-[#585454] text-[#FFFFFF] placeholder-[#D1D5DB] rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Selection Summary Column */}
              <div className="md:col-span-5">
                <Card variant="slate" padding="sm" className="border-[#585454] space-y-4 text-xs h-full flex flex-col justify-between bg-[#363434] p-5 rounded-2xl">
                  <div className="space-y-3">
                    <h4 className="font-bold text-[12px] text-[#FFFFFF] border-b border-[#585454] pb-2">Appointment Summary</h4>
                    <div className="space-y-2 text-[#F0F0F0]">
                      <p><strong className="text-[#FFFFFF]">Condition:</strong> <span className="text-emerald-400 font-bold">{selectedCondition}</span></p>
                      <p><strong className="text-[#FFFFFF]">Treatment:</strong> <span className="text-emerald-400 font-bold">{selectedTreatment}</span></p>
                      <p><strong className="text-[#FFFFFF]">Provider:</strong> <span className="text-emerald-400 font-bold">{selectedProvider}</span></p>
                      <p><strong className="text-[#FFFFFF]">Scheduled:</strong> <span className="text-emerald-400 font-bold">{selectedDate} at {selectedTime}</span></p>
                    </div>
                  </div>
                  
                  <div className="bg-[#323030] p-3.5 rounded-xl border border-[#585454] space-y-1.5 leading-relaxed text-[#F0F0F0] shadow-sm mt-4">
                    <div className="flex gap-1.5 text-[#FFFFFF] font-bold text-xs">
                      <ShieldAlert className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                      <span>Flat Fee Verification</span>
                    </div>
                    <span>We never charge hospital facility fees, saving you up to 60% out-of-pocket.</span>
                  </div>
                </Card>
              </div>

              {/* Error Banner if booking failed */}
              {bookingStatus === 'booking_failed' && bookingError && (
                <div className="md:col-span-12 p-4 bg-red-950/40 border border-red-800/60 rounded-xl flex items-start gap-3 text-red-200 text-sm animate-reveal">
                  <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-2 text-left flex-1">
                    <p className="font-bold text-white">Booking Submission Unsuccessful</p>
                    <p className="text-xs text-red-200 leading-relaxed">
                      {bookingError.message || 'Unable to confirm appointment with the Tebra scheduling system.'}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {bookingError.isSlotUnavailable ? (
                        <button
                          type="button"
                          onClick={() => setStep(4)}
                          className="px-3 py-1.5 bg-red-900/60 hover:bg-red-800/80 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Clock className="h-3.5 w-3.5" /> Choose Another Slot
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={submitAppointment}
                          disabled={isSubmitting}
                          className="px-3 py-1.5 bg-red-900/60 hover:bg-red-800/80 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <RefreshCw className={`h-3.5 w-3.5 ${isSubmitting ? 'animate-spin' : ''}`} /> Try Again
                        </button>
                      )}
                      <a
                        href="tel:+17045039338"
                        className="px-3 py-1.5 bg-[#363434] hover:bg-[#514E4E] border border-[#585454] text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                      >
                        <Phone className="h-3.5 w-3.5 text-emerald-400" /> Call Clinic: (704) 503-9338
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 6: BOOKING SUCCESS / PENDING SCREEN */}
        {bookingSuccess && (
          <div className="text-center py-10 space-y-6">
            <div className="p-4 bg-emerald-950/60 text-emerald-400 rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-emerald-800/60 shadow-lg">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            
            <div className="space-y-2">
              <Badge 
                variant={bookingStatus === 'booking_confirmed' ? 'success' : 'secondary'} 
                className={
                  bookingStatus === 'booking_confirmed'
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-bold'
                    : 'bg-amber-950/50 text-amber-300 border border-amber-800/60 font-bold'
                }
              >
                {bookingStatus === 'booking_confirmed' ? 'Appointment Confirmed' : 'Request Submitted • Pending Confirmation'}
              </Badge>
              
              <h2 className="text-[26px] md:text-[30px] font-black font-heading text-[#FFFFFF] animate-reveal">
                {bookingStatus === 'booking_confirmed' ? 'Appointment Confirmed!' : 'Appointment Request Received!'}
              </h2>
              
              <p className="text-sm text-[#F0F0F0] max-w-lg mx-auto font-medium leading-relaxed">
                {bookingStatus === 'booking_confirmed'
                  ? 'Your appointment has been successfully scheduled and confirmed on our clinical calendar.'
                  : 'Your request has been received by our clinical system. Our patient coordinator will review your chart and verify your appointment slot.'}
              </p>
              
              {generatedBookingId && (
                <div className="pt-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#D1D5DB] font-semibold block mb-1">
                    Tebra Reference Verification Code:
                  </span>
                  <span className="inline-block px-5 py-2 bg-[#363434] text-emerald-400 font-mono font-bold text-base md:text-lg rounded-xl tracking-wider border border-[#585454] shadow-inner">
                    {generatedBookingId}
                  </span>
                </div>
              )}
            </div>

            {/* Appointment Details Summary */}
            <div className="max-w-md mx-auto p-5 bg-[#363434] border border-[#585454] rounded-2xl text-left space-y-2 text-xs text-[#F0F0F0] leading-relaxed shadow-sm">
              <h4 className="font-bold text-[12px] text-[#FFFFFF] border-b border-[#585454] pb-2">
                Reserved Visit Information
              </h4>
              <p><strong className="text-[#FFFFFF]">Provider:</strong> <span className="text-emerald-400 font-bold">{bookingResult?.provider || selectedProvider}</span></p>
              <p><strong className="text-[#FFFFFF]">Scheduled:</strong> <span className="text-emerald-400 font-bold">{selectedDate} at {selectedTime}</span></p>
              <p><strong className="text-[#FFFFFF]">Clinic Location:</strong> <span>{bookingResult?.location || '6429 Bannington Road, Suite B, Charlotte, NC 28226'}</span></p>
              {selectedCondition && <p><strong className="text-[#FFFFFF]">Primary Focus:</strong> <span>{selectedCondition}</span></p>}
            </div>

            <div className="max-w-md mx-auto p-5 bg-[#363434] border border-[#585454] rounded-2xl text-left space-y-3 text-xs text-[#F0F0F0] leading-relaxed shadow-sm">
              <h4 className="font-bold text-[12px] text-[#FFFFFF] flex items-center gap-1.5">
                <FileText className="h-4.5 w-4.5 text-emerald-400" /> Next Steps &amp; Clinical Intake:
              </h4>
              <p>&bull; A patient coordinator will review your submission and contact you within <strong className="text-[#FFFFFF]">24 business hours</strong> to confirm insurance and answer questions.</p>
              <p>&bull; Please review and complete the <Link to="/patients#forms" className="text-emerald-400 font-bold hover:underline">New Patient Intake Packet</Link> prior to your visit.</p>
              <p>&bull; Please bring a valid government photo ID, your insurance card, and any recent MRIs/imaging discs related to your condition.</p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Button variant="secondary" size="sm" onClick={resetWizard}>
                Schedule Another Visit
              </Button>
              <a href="tel:+17045039338">
                <Button variant="outline" size="sm" icon={Phone}>
                  Call Clinic Front Desk
                </Button>
              </a>
            </div>
          </div>
        )}

        {/* FOOTER WIZARD NAVIGATION BAR */}
        {!bookingSuccess && (
          <div className="border-t border-[#585454] pt-6 mt-8 flex justify-between items-center">
            {step > 1 ? (
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={prevStep}
                icon={ChevronLeft}
                iconPosition="left"
                disabled={isSubmitting}
              >
                Back
              </Button>
            ) : (
              <div className="w-10" /> // Spacer
            )}

            {step < 5 ? (
              <Button
                variant="primary"
                size="sm"
                disabled={!isStepValid()}
                onClick={nextStep}
                icon={ChevronRight}
                iconPosition="right"
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                loading={isSubmitting}
                disabled={!isStepValid() || isSubmitting}
                onClick={submitAppointment}
                icon={CheckCircle2}
                iconPosition="right"
                className={isSubmitting ? '' : 'animate-pulse'}
              >
                {isSubmitting ? 'Submitting to Tebra...' : 'Submit Booking Request'}
              </Button>
            )}
          </div>
        )}
      </Card>

    </div>
  );
}
