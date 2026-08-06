import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, ClipboardList, UserCheck, CalendarDays, CheckCircle2 } from 'lucide-react';
import { conditions, treatments } from '../../utils/medicalData';
import { useAppointment } from '../../context/AppointmentContext';

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
  const providers = ['Dr. Ashvin K. Amara, MD', 'Sarah Whitfield, NP', 'James Okafor, PA-C', 'First Available Provider'];

  const handleSelectCondition = (title) => {
    console.log("Stepper selection - Condition:", title);
    setSelectedCondition(title);
    setLocalStep(1);
  };

  const handleSelectTreatment = (title) => {
    console.log("Stepper selection - Treatment:", title);
    setSelectedTreatment(title);
    setLocalStep(2);
  };

  const handleSelectProvider = (name) => {
    console.log("Stepper selection - Provider:", name);
    setSelectedProvider(name);
    setLocalStep(3);
  };

  const handleConfirm = () => {
    console.log("Stepper confirmation triggered. Transitioning to context scheduler.");
    setContextStep(4); // Advance to completion check in scheduler
  };

  return (
    <section className="bg-ink px-6 py-28 md:px-16" id="book">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-16 max-w-xl text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-blue-light)' }}>
            Booking, Simplified
          </p>
          <h2 className="font-display text-4xl text-mist md:text-5xl font-bold">Five steps to your first visit.</h2>
        </div>

        {/* Progress rail */}
        <div className="relative mb-14 flex justify-between">
          <div className="absolute top-5 left-0 right-0 h-px" style={{ background: 'rgba(245,247,250,0.12)' }} />
          <motion.div
            className="absolute top-5 left-0 h-px"
            style={{ background: 'linear-gradient(90deg, var(--color-teal), var(--color-blue-light))' }}
            animate={{ width: `${(localStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done = i <= localStep;
            return (
              <button
                key={s.title}
                onClick={() => {
                  console.log("Stepper rail nav to:", i);
                  setLocalStep(i);
                }}
                className="relative z-10 flex flex-col items-center gap-3 border-none bg-transparent cursor-pointer"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300 shadow-sm"
                  style={{
                    borderColor: done ? 'var(--color-teal)' : 'rgba(245,247,250,0.2)',
                    background: done ? 'var(--color-teal)' : 'var(--color-ink)',
                  }}
                >
                  <Icon size={16} color={done ? '#060d17' : 'rgba(245,247,250,0.4)'} />
                </span>
                <span className="hidden text-[11px] font-semibold text-mist/50 sm:block">{s.title}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={localStep}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border p-10 text-left"
          style={{ borderColor: 'rgba(245,247,250,0.1)', background: 'rgba(245,247,250,0.03)' }}
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-mist/40">
            Step {localStep + 1} of {steps.length}
          </p>
          <h3 className="mt-3 font-display text-2xl text-mist font-bold">{steps[localStep].title}</h3>
          
          <div className="mt-6">
            {localStep === 0 && (
              <div className="space-y-4">
                <p className="text-sm text-mist/60">{steps[0].copy}</p>
                <div className="flex flex-wrap gap-2.5">
                  {condList.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCondition(c.title)}
                      className={`px-4 py-2 border rounded-xl text-xs font-semibold cursor-pointer ${
                        selectedCondition === c.title
                          ? 'bg-cyan-950/60 border-cyan-500 text-cyan-400 font-bold border-cyan-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
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
                <p className="text-sm text-mist/60">{steps[1].copy}</p>
                <div className="flex flex-wrap gap-2.5">
                  {treatList.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTreatment(t.title)}
                      className={`px-4 py-2 border rounded-xl text-xs font-semibold cursor-pointer ${
                        selectedTreatment === t.title
                          ? 'bg-cyan-950/60 border-cyan-500 text-cyan-400 font-bold border-cyan-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
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
                <p className="text-sm text-mist/60">{steps[2].copy}</p>
                <div className="bg-amber-950/40 border border-amber-900/50 rounded-xl p-3 text-xs text-amber-300 leading-relaxed max-w-md">
                  <strong>Notice:</strong> This section is currently pending review [to be discussed]. Select any provider below to proceed.
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {providers.map((p) => (
                    <button
                      key={p}
                      onClick={() => handleSelectProvider(p)}
                      className={`px-4 py-2 border rounded-xl text-xs font-semibold cursor-pointer ${
                        selectedProvider === p
                          ? 'bg-cyan-950/60 border-cyan-500 text-cyan-400 font-bold border-cyan-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
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
                <p className="text-sm text-mist/60">{steps[3].copy}</p>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl text-xs text-mist/70">
                  We offer direct, same-week schedules. Continue to the summary to launch the live appointment calendar.
                </div>
              </div>
            )}

            {localStep === 4 && (
              <div className="space-y-6">
                <p className="text-sm text-mist/60">{steps[4].copy}</p>
                <div className="grid gap-3 p-5 bg-slate-950 border border-slate-850 rounded-xl text-xs text-mist/70 max-w-md">
                  <p><strong>Primary Concern:</strong> {selectedCondition || 'Not chosen yet'}</p>
                  <p><strong>Suggested Procedure:</strong> {selectedTreatment || 'Not chosen yet'}</p>
                  <p><strong>Clinical Specialist:</strong> {selectedProvider || 'Not chosen yet'}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              disabled={localStep === 0}
              onClick={() => setLocalStep((s) => Math.max(0, s - 1))}
              className="rounded-full border px-5 py-2.5 text-sm text-mist/70 disabled:opacity-30 cursor-pointer border-slate-800 hover:bg-white/5"
            >
              Back
            </button>
            {localStep < steps.length - 1 ? (
              <button
                onClick={() => {
                  console.log("Stepper manual continue to:", localStep + 1);
                  setLocalStep((s) => Math.min(steps.length - 1, s + 1));
                }}
                className="rounded-full px-5 py-2.5 text-sm font-semibold cursor-pointer"
                style={{ background: 'var(--color-coral)', color: '#0b0b0b' }}
              >
                Continue
              </button>
            ) : (
              <Link to="/book" onClick={handleConfirm}>
                <button
                  className="rounded-full px-5 py-2.5 text-sm font-semibold cursor-pointer shadow-[0_0_20px_rgba(255,107,53,0.4)]"
                  style={{ background: 'var(--color-coral)', color: '#0b0b0b' }}
                >
                  Finalize Booking Slots
                </button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
