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
    <section className="bg-white px-6 py-20 md:px-16" id="book">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-16 max-w-xl text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-800 font-bold">
            Booking, Simplified
          </p>
          <h2 className="font-heading text-4xl text-stone-900 md:text-5xl font-bold">
            Five Steps to Your First Visit
          </h2>
        </div>

        {/* Progress rail */}
        <div className="relative mb-14 flex justify-between">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-stone-200" />
          <motion.div
            className="absolute top-5 left-0 h-0.5 bg-emerald-600"
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
                    borderColor: done ? '#059669' : '#e7e5e4',
                    background: done ? '#059669' : '#ffffff',
                  }}
                >
                  <Icon size={16} color={done ? '#ffffff' : '#a8a29e'} />
                </span>
                <span className={`hidden text-[11px] font-bold uppercase tracking-wider sm:block transition-colors duration-300 ${done ? 'text-emerald-800' : 'text-stone-400'}`}>
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
          className="rounded-2xl border border-stone-200 bg-stone-50 p-8 md:p-10 text-left shadow-premium"
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-stone-400 font-bold">
            Step {localStep + 1} of {steps.length}
          </p>
          <h3 className="mt-2 font-heading text-2xl text-stone-900 font-bold">{steps[localStep].title}</h3>
          
          <div className="mt-6 min-h-[140px]">
            {localStep === 0 && (
              <div className="space-y-4">
                <p className="text-sm text-stone-600">{steps[0].copy}</p>
                <div className="flex flex-wrap gap-2.5">
                  {condList.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCondition(c.title)}
                      className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        selectedCondition === c.title
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                          : 'bg-white border-stone-200 text-stone-600 hover:border-emerald-650 hover:bg-emerald-50/50'
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
                <p className="text-sm text-stone-600">{steps[1].copy}</p>
                <div className="flex flex-wrap gap-2.5">
                  {treatList.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTreatment(t.title)}
                      className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        selectedTreatment === t.title
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                          : 'bg-white border-stone-200 text-stone-600 hover:border-emerald-650 hover:bg-emerald-50/50'
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
                <p className="text-sm text-stone-600">{steps[2].copy}</p>
                
                {/* Yellow alert badge */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800 leading-relaxed max-w-md">
                  <strong>Specialist Matching:</strong> Select your preferred specialist or opt for "First Available Provider" for speedier scheduling.
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {providers.map((p) => (
                    <button
                      key={p}
                      onClick={() => handleSelectProvider(p)}
                      className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        selectedProvider === p
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                          : 'bg-white border-stone-200 text-stone-600 hover:border-emerald-650 hover:bg-emerald-50/50'
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
                <p className="text-sm text-stone-600">{steps[3].copy}</p>
                <div className="p-4 bg-white border border-stone-200 rounded-xl text-xs text-stone-600 max-w-lg">
                  We offer direct, same-week schedules. Proceed to confirmation to trigger our real-time clinic scheduler.
                </div>
              </div>
            )}

            {localStep === 4 && (
              <div className="space-y-6">
                <p className="text-sm text-stone-600">{steps[4].copy}</p>
                <div className="grid gap-3 p-5 bg-white border border-stone-200 rounded-xl text-xs text-stone-600 max-w-md">
                  <p><strong>Primary Concern:</strong> {selectedCondition || 'Not chosen yet'}</p>
                  <p><strong>Suggested Procedure:</strong> {selectedTreatment || 'Not chosen yet'}</p>
                  <p><strong>Clinical Specialist:</strong> {selectedProvider || 'Not chosen yet'}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between gap-3 pt-6 border-t border-stone-200">
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
