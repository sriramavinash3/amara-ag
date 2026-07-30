import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAppointment } from '../context/AppointmentContext';
import { conditions, treatments } from '../utils/medicalData';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { CheckCircle2, ChevronRight, ChevronLeft, Calendar, ShieldAlert, FileText, Info, Award, Phone } from 'lucide-react';
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
    bookingSuccess,
    generatedBookingId,
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
    { name: 'Dr. Ashvin K. Amara, MD', role: 'Double Board-Certified Specialist' },
    { name: 'Nurse Practitioners (NPs)', role: 'Advanced Care Practice Group' },
    { name: 'First Available Clinical Provider', role: 'Fastest Schedule Option' }
  ];

  const timeSlots = [
    '09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM',
    '01:30 PM', '02:15 PM', '03:00 PM', '03:45 PM'
  ];

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
    <div className="w-full relative py-16 px-4 md:px-8 max-w-4xl mx-auto space-y-8 text-left">

      {/* 1. WIZARD STEPS PROGRESS INDICATOR */}
      {!bookingSuccess && (
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <span>Scheduling Flow</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-medical-600">Step {step} of 5</span>
          </div>
          
          {/* Visual Progress Bar */}
          <div className="w-full bg-slate-205 h-2.5 rounded-full overflow-hidden flex border border-slate-200/50">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 h-full border-r border-white last:border-0 transition-colors duration-300 ${
                  i < step ? 'bg-medical-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. WIZARD STEP CONTENTS */}
      <Card variant="white" padding="lg" className="border-slate-200/80 shadow-premium relative min-h-[450px] flex flex-col justify-between z-10">
        <div className="absolute top-0 right-0 w-24 h-24 bg-medical-50 rounded-full blur-xl -z-10 animate-pulse" />

        {/* STEP 1: SELECT CONDITION */}
        {step === 1 && !bookingSuccess && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="primary" className="bg-cta-100 text-cta-700 border border-cta-100 font-bold">Step 1</Badge>
              <h2 className="text-2xl font-black font-heading text-slate-900">What primary pain area are we treating?</h2>
              <p className="text-sm text-slate-600 leading-relaxed">Select the condition that best describes your pain. This helps us pre-configure clinical protocols.</p>
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
                      ? 'border-medical-600 bg-medical-50 text-medical-700 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-slate-350 hover:bg-slate-50'
                  }`}
                >
                  <span>{cond.title}</span>
                  <CheckCircle2 className={`h-5 w-5 transition-opacity duration-200 ${
                    selectedCondition === cond.title ? 'text-medical-600 opacity-100' : 'text-slate-300 opacity-0 group-hover:opacity-100'
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
              <Badge variant="primary" className="bg-cta-100 text-cta-700 border border-cta-100 font-bold">Step 2</Badge>
              <h2 className="text-2xl font-black font-heading text-slate-900">Choose a preferred treatment type</h2>
              <p className="text-sm text-slate-600 leading-relaxed">If you are unsure, select "First Consultation / Diagnostic Block" and Dr. Amara will diagnose you.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Add a default Diagnostic Consultation option */}
              <button
                type="button"
                onClick={() => {
                  setSelectedTreatment("Diagnostic Consultation / Specialist Evaluation");
                  nextStep();
                }}
                className={`px-5 py-4 rounded-xl border font-bold text-left transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                  selectedTreatment === "Diagnostic Consultation / Specialist Evaluation"
                    ? 'border-medical-600 bg-medical-50 text-medical-700 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-slate-355 hover:bg-slate-50'
                }`}
              >
                <span>Diagnostic Consultation &amp; Evaluation</span>
                <CheckCircle2 className="h-5 w-5 text-medical-600" />
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
                      ? 'border-medical-600 bg-medical-50 text-medical-700 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-slate-355 hover:bg-slate-50'
                  }`}
                >
                  <span>{treat.title}</span>
                  <CheckCircle2 className={`h-5 w-5 transition-opacity duration-200 ${
                    selectedTreatment === treat.title ? 'text-medical-600 opacity-100' : 'text-slate-300 opacity-0 group-hover:opacity-100'
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
              <Badge variant="primary" className="bg-cta-100 text-cta-700 border border-cta-100 font-bold">Step 3</Badge>
              <h2 className="text-2xl font-black font-heading text-slate-900">Select your medical provider</h2>
              <p className="text-sm text-slate-600 leading-relaxed">Choose a specific clinical specialist or select First Available for faster appointment slots.</p>
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
                      ? 'border-medical-600 bg-medical-50 text-medical-700 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-slate-355 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span>{prov.name}</span>
                    <span className="block text-xs text-slate-400 font-medium mt-0.5">{prov.role}</span>
                  </div>
                  <CheckCircle2 className={`h-5 w-5 transition-opacity duration-200 ${
                    selectedProvider === prov.name ? 'text-medical-600 opacity-100' : 'text-slate-300 opacity-0 group-hover:opacity-100'
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
              <Badge variant="primary" className="bg-cta-100 text-cta-700 border border-cta-100 font-bold">Step 4</Badge>
              <h2 className="text-2xl font-black font-heading text-slate-900">Choose an appointment slot</h2>
              <p className="text-sm text-slate-600 leading-relaxed">Select a convenient date and an available morning or afternoon time slot.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              {/* Date picker (Left) */}
              <div className="md:col-span-5 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]} // Block past dates
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-205 rounded-xl text-sm focus:outline-none focus:border-medical-600 focus:ring-1 focus:ring-medical-600 shadow-sm transition-all duration-200"
                />
              </div>

              {/* Time Slots (Right) */}
              <div className="md:col-span-7 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Available Time Slots</label>
                {selectedDate ? (
                  <div className="grid grid-cols-2 gap-2.5">
                    {timeSlots.map((time, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2.5 rounded-xl border text-sm font-bold text-center transition-all duration-200 cursor-pointer ${
                          selectedTime === time
                            ? 'border-medical-600 bg-medical-50 text-medical-700 shadow-sm'
                            : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
                    <Calendar className="h-8 w-8 mb-2" />
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
              <Badge variant="primary" className="bg-cta-100 text-cta-700 border border-cta-100 font-bold">Step 5</Badge>
              <h2 className="text-2xl font-black font-heading text-slate-900">Enter patient details</h2>
              <p className="text-sm text-slate-600 leading-relaxed">Provide your basic credentials. Your information is protected under HIPAA-conscious safeguards.</p>
            </div>
            
            {/* Split layout: inputs vs selection summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              {/* Inputs */}
              <div className="md:col-span-7 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={patientDetails.firstName}
                      onChange={handleInputChange}
                      placeholder="e.g. John"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-205 rounded-xl text-sm focus:outline-none focus:border-medical-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={patientDetails.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Doe"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-205 rounded-xl text-sm focus:outline-none focus:border-medical-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={patientDetails.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 704-555-0199"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-205 rounded-xl text-sm focus:outline-none focus:border-medical-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      required
                      value={patientDetails.dob}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-205 rounded-xl text-sm focus:outline-none focus:border-medical-600"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={patientDetails.email}
                    onChange={handleInputChange}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-205 rounded-xl text-sm focus:outline-none focus:border-medical-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Insurance Provider (Optional)</label>
                  <input
                    type="text"
                    name="insurance"
                    value={patientDetails.insurance}
                    onChange={handleInputChange}
                    placeholder="e.g. BCBS, Medicare, United"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-205 rounded-xl text-sm focus:outline-none focus:border-medical-600"
                  />
                </div>
              </div>

              {/* Selection Summary Column */}
              <div className="md:col-span-5">
                <Card variant="slate" padding="sm" className="border-slate-200 space-y-4 text-xs h-full flex flex-col justify-between bg-slate-100/50">
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">Appointment Summary</h4>
                    <div className="space-y-2">
                      <p><strong>Condition:</strong> <span className="text-slate-655 font-medium">{selectedCondition}</span></p>
                      <p><strong>Treatment:</strong> <span className="text-slate-655 font-medium">{selectedTreatment}</span></p>
                      <p><strong>Provider:</strong> <span className="text-slate-655 font-medium">{selectedProvider}</span></p>
                      <p><strong>Scheduled:</strong> <span className="text-slate-655 font-medium">{selectedDate} at {selectedTime}</span></p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5 leading-relaxed text-slate-600 shadow-sm">
                    <div className="flex gap-1.5 text-slate-900 font-bold text-xs">
                      <ShieldAlert className="h-4.5 w-4.5 text-medical-600 shrink-0" />
                      <span>Flat Fee Verification</span>
                    </div>
                    <span>We never charge hospital facility fees, saving you up to 60% out-of-pocket.</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: BOOKING SUCCESS SCREEN */}
        {bookingSuccess && (
          <div className="text-center py-12 space-y-6">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            
            <div className="space-y-2">
              <Badge variant="success" className="bg-emerald-50 text-emerald-800 border border-emerald-100">Confirmed Appointment</Badge>
              <h2 className="text-3xl font-black font-heading text-slate-900">Appointment Requested!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your request has been successfully registered. Your booking reference code is:
              </p>
              <span className="inline-block px-5 py-2 bg-slate-100 text-slate-900 font-black text-lg rounded-xl tracking-wider border border-slate-200 shadow-inner">
                {generatedBookingId}
              </span>
            </div>

            <div className="max-w-md mx-auto p-5 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-3 text-xs text-slate-600 leading-relaxed shadow-sm">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <FileText className="h-4.5 w-4.5 text-medical-600" /> Next Steps &amp; Preparation:
              </h4>
              <p>&bull; A clinical patient coordinator will call or email you within <strong>24 business hours</strong> to finalize insurance details and confirm your slot.</p>
              <p>&bull; Please download and fill out the <Link to="/patients#forms" className="text-medical-600 font-bold hover:underline">New Patient Intake Packet</Link> prior to your visit to save time.</p>
              <p>&bull; Bring a valid government photo ID, your insurance card, and any recent MRIs/imaging discs related to your pain condition.</p>
            </div>

            <div className="pt-4">
              <Button variant="outline" size="sm" onClick={resetWizard} className="text-slate-900 border-slate-350 hover:border-slate-400">
                Book Another Appointment
              </Button>
            </div>
          </div>
        )}

        {/* FOOTER WIZARD NAVIGATION BAR */}
        {!bookingSuccess && (
          <div className="border-t border-slate-100 pt-6 mt-8 flex justify-between items-center">
            {step > 1 ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={prevStep}
                icon={ChevronLeft}
                iconPosition="left"
                className="text-slate-900 border-slate-350 hover:border-slate-400"
              >
                Back
              </Button>
            ) : (
              <div className="w-10" /> // Spacer
            )}

            {step < 5 ? (
              <Button
                variant="secondary"
                size="sm"
                disabled={!isStepValid()}
                onClick={nextStep}
                icon={ChevronRight}
                iconPosition="right"
                className="bg-medical-600 hover:bg-medical-700 text-white"
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                loading={isSubmitting}
                disabled={!isStepValid()}
                onClick={submitAppointment}
                icon={CheckCircle2}
                iconPosition="right"
                className="bg-cta-600 hover:bg-cta-700 text-white"
              >
                Submit Booking Request
              </Button>
            )}
          </div>
        )}
      </Card>

    </div>
  );
}
