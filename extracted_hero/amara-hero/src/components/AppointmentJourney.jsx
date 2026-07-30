import { useState } from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, ClipboardList, UserCheck, CalendarDays, CheckCircle2 } from 'lucide-react'

const steps = [
  { icon: Stethoscope, title: 'Select Condition', copy: 'Tell us what brings you in — back, neck, joint, or nerve pain.' },
  { icon: ClipboardList, title: 'Choose Treatment', copy: 'Review options matched to your condition and history.' },
  { icon: UserCheck, title: 'Select Provider', copy: 'Pick a specialist, or let us match you to the right fit.' },
  { icon: CalendarDays, title: 'Select Date', copy: 'Browse real-time openings — most patients are seen within a week.' },
  { icon: CheckCircle2, title: 'Confirm', copy: 'Review your details and lock in your appointment.' },
]

export default function AppointmentJourney() {
  const [step, setStep] = useState(0)

  return (
    <section className="bg-ink px-6 py-28 md:px-16" id="book">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-16 max-w-xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-blue-light)' }}>
            Booking, Simplified
          </p>
          <h2 className="font-display text-4xl text-mist md:text-5xl">Five steps to your first visit.</h2>
        </div>

        {/* Progress rail */}
        <div className="relative mb-14 flex justify-between">
          <div className="absolute top-5 left-0 right-0 h-px" style={{ background: 'rgba(245,247,250,0.12)' }} />
          <motion.div
            className="absolute top-5 left-0 h-px"
            style={{ background: 'linear-gradient(90deg, var(--color-teal), var(--color-blue-light))' }}
            animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
          {steps.map((s, i) => {
            const Icon = s.icon
            const done = i <= step
            return (
              <button
                key={s.title}
                onClick={() => setStep(i)}
                className="relative z-10 flex flex-col items-center gap-3"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300"
                  style={{
                    borderColor: done ? 'var(--color-teal)' : 'rgba(245,247,250,0.2)',
                    background: done ? 'var(--color-teal)' : 'var(--color-ink)',
                  }}
                >
                  <Icon size={16} color={done ? '#06131' : 'rgba(245,247,250,0.4)'} />
                </span>
                <span className="hidden text-[11px] font-medium text-mist/50 sm:block">{s.title}</span>
              </button>
            )
          })}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border p-10"
          style={{ borderColor: 'rgba(245,247,250,0.1)', background: 'rgba(245,247,250,0.03)' }}
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-mist/40">
            Step {step + 1} of {steps.length}
          </p>
          <h3 className="mt-3 font-display text-2xl text-mist md:text-3xl">{steps[step].title}</h3>
          <p className="mt-3 max-w-md text-sm text-mist/60">{steps[step].copy}</p>

          <div className="mt-8 flex gap-3">
            <button
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="rounded-full border px-5 py-2.5 text-sm text-mist/70 disabled:opacity-30"
              style={{ borderColor: 'rgba(245,247,250,0.2)' }}
            >
              Back
            </button>
            <button
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              className="rounded-full px-5 py-2.5 text-sm font-semibold"
              style={{ background: 'var(--color-coral)', color: '#0b0b0b' }}
            >
              {step === steps.length - 1 ? 'Confirm Appointment' : 'Continue'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
