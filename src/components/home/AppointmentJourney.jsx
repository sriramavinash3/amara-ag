import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, ClipboardList, UserCheck, CalendarDays, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { conditions, treatments } from '../../utils/medicalData';
import { useAppointment } from '../../context/AppointmentContext';
import Button from '../ui/Button';

const steps = [
  { icon: Stethoscope, title: 'Select Condition', copy: 'Tell us what brings you in — back, neck, joint, or nerve pain.' },
  { icon: ClipboardList, title: 'Choose Treatment', copy: 'Review options matched to your condition and history.' },
  { icon: UserCheck, title: 'Select Provider', copy: 'Pick a specialist, or let us match you to the right fit.' },
  { icon: CalendarDays, title: 'Select Date', copy: 'Browse real-time openings — most patients are seen within a week.' },
  { icon: CheckCircle2, title: 'Confirm Details', copy: 'Review your details and lock in your appointment.' },
];

export default function AppointmentJourney() {
  const [localStep, setLocalStep] = useState(0);
  const { 
    selectedCondition, setSelectedCondition,
    selectedTreatment, setSelectedTreatment,
    selectedProvider, setSelectedProvider,
    setStep: setContextStep
  } = useAppointment();

  const condList = Object.values(conditions).slice(0, 5);
  const treatList = Object.values(treatments).slice(0, 5);
  const providers = ['Ashvin K. Amara, MD', 'Eunice Babalola, NP, MSN', 'Alexander Carmenaty Rodriguez, MSN, FNP-C', 'First Available Provider'];

  const handleSelectCondition = (title) => {
    setSelectedCondition(title);
    setLocalStep(1);
  };

  const handleSelectTreatment = (title) => {
    setSelectedTreatment(title);
    setLocalStep(2);
  };

  const handleSelectProvider = (name) => {
    setSelectedProvider(name);
    setLocalStep(3);
  };

  const handleConfirm = () => {
    setContextStep(4);
  };

  return (
    <section className="bg-[#363434] py-12 md:py-16 m-0 border-t border-[#585454]" id="book">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-10 max-w-xl text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-400 font-bold">
            Booking, Simplified
          </p>
          <h2 className="font-heading text-[32px] sm:text-[38px] md:text-[44px] text-[#FFFFFF] font-bold">
            Five Steps to Your First Visit
          </h2>
        </div>

        {/* Progress rail */}
        <div className="relative mb-8 flex justify-between">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#585454]" />
          <motion.div
            className="absolute top-5 left-0 h-0.5 bg-emerald-500"
            animate={{ width: `${(localStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done = i <= localStep;
            return (
              <button
                key={s.title}
                onClick={() => setLocalStep(i)}
                className="relative z-10 flex flex-col items-center gap-3 border-none bg-transparent cursor-pointer group focus:outline-none"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 shadow-sm"
                  style={{
                    borderColor: done ? '#10B981' : '#585454',
                    background: done ? '#059669' : '#454242',
                  }}
                >
                  <Icon size={16} color={done ? '#ffffff' : '#D1D5DB'} />
                </span>
                <span className={`hidden text-[11px] font-bold uppercase tracking-wider sm:block transition-colors duration-300 ${done ? 'text-emerald-300' : 'text-[#D1D5DB]'}`}>
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Form Container */}
        <motion.div
          key={localStep}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-[#585454] bg-[#454242] p-6 sm:p-8 md:p-10 text-left shadow-xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#D1D5DB] font-bold">
            Step {localStep + 1} of {steps.length}
          </p>
          <h3 className="mt-2 font-heading text-[22px] text-[#FFFFFF] font-bold">{steps[localStep].title}</h3>
          
          <div className="mt-6 min-h-[140px]">
            {localStep === 0 && (
              <div className="space-y-4">
                <p className="text-sm text-[#F0F0F0]">{steps[0].copy}</p>
                <div className="flex flex-wrap gap-2.5">
                  {condList.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCondition(c.title)}
                      className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        selectedCondition === c.title
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-sm'
                          : 'bg-[#363434] border-[#585454] text-[#F0F0F0] hover:border-emerald-500/50 hover:bg-[#514E4E]'
                      }`}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {localStep === 1 && (
              <div className="space-y-4">
                <p className="text-sm text-[#F0F0F0]">{steps[1].copy}</p>
                <div className="flex flex-wrap gap-2.5">
                  {treatList.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTreatment(t.title)}
                      className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        selectedTreatment === t.title
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-sm'
                          : 'bg-[#363434] border-[#585454] text-[#F0F0F0] hover:border-emerald-500/50 hover:bg-[#514E4E]'
                      }`}
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {localStep === 2 && (
              <div className="space-y-4 text-left">
                <p className="text-sm text-[#F0F0F0]">{steps[2].copy}</p>
                
                {/* Yellow alert badge */}
                <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3 text-xs text-amber-200 leading-relaxed max-w-md">
                  <strong className="text-amber-300">Specialist Matching:</strong> Select your preferred specialist or opt for "First Available Provider" for speedier scheduling.
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {providers.map((p) => (
                    <button
                      key={p}
                      onClick={() => handleSelectProvider(p)}
                      className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        selectedProvider === p
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-sm'
                          : 'bg-[#363434] border-[#585454] text-[#F0F0F0] hover:border-emerald-500/50 hover:bg-[#514E4E]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {localStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-[#F0F0F0]">{steps[3].copy}</p>
                <div className="p-4 bg-[#363434] border border-[#585454] rounded-xl text-xs text-[#F0F0F0] max-w-lg">
                  We offer direct, same-week schedules. Proceed to confirmation to trigger our real-time clinic scheduler.
                </div>
              </div>
            )}

            {localStep === 4 && (
              <div className="space-y-6">
                <p className="text-sm text-[#F0F0F0]">{steps[4].copy}</p>
                <div className="grid gap-3 p-5 bg-[#363434] border border-[#585454] rounded-xl text-xs text-[#F0F0F0] max-w-md">
                  <p><strong className="text-[#FFFFFF]">Primary Concern:</strong> {selectedCondition || 'Not chosen yet'}</p>
                  <p><strong className="text-[#FFFFFF]">Suggested Procedure:</strong> {selectedTreatment || 'Not chosen yet'}</p>
                  <p><strong className="text-[#FFFFFF]">Clinical Specialist:</strong> {selectedProvider || 'Not chosen yet'}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between gap-3 pt-6 border-t border-[#585454]">
            <Button
              disabled={localStep === 0}
              onClick={() => setLocalStep((s) => Math.max(0, s - 1))}
              variant="outline"
              size="sm"
              icon={ArrowLeft}
            >
              Back
            </Button>
            
            {localStep < steps.length - 1 ? (
              <Button
                onClick={() => setLocalStep((s) => Math.min(steps.length - 1, s + 1))}
                variant="primary"
                size="sm"
                icon={ChevronRight}
                iconPosition="right"
              >
                Continue
              </Button>
            ) : (
              <Link to="/book" onClick={handleConfirm}>
                <Button
                  variant="primary"
                  size="sm"
                  className="font-bold"
                >
                  Finalize Booking Slots
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
