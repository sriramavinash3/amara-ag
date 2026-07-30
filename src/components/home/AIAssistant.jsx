import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const script = [
  { from: 'user', text: '🔍 Symptom Checker' },
  { from: 'faq', text: 'Where are you experiencing pain? Select an area: Back & Leg Pain, Neck & Arm Pain, Sciatica Nerve Pain, Joint Pain...' },
  { from: 'user', text: '💳 Insurance & Fees' },
  { from: 'faq', text: 'At Amara Pain & Spine, we believe in complete financial transparency. We charge one flat office fee and zero hospital facility fees. We accept Medicare, Medicaid, Blue Cross Blue Shield, United, Cigna, and Aetna.' },
];

function useTypedScript(active) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (!active) return;
    setVisible(0);
    const id = setInterval(() => {
      setVisible((v) => (v < script.length ? v + 1 : v));
    }, 1500);
    return () => clearInterval(id);
  }, [active]);
  return visible;
}

export default function AIAssistant() {
  const [active, setActive] = useState(false);
  const visible = useTypedScript(active);

  return (
    <section className="bg-mist px-6 py-28 md:px-16" id="faq-assistant">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-2 md:items-center">
        <div className="text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-blue)' }}>
            Interactive FAQ System
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-dark leading-tight">
            Answers before your first appointment.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-text-dark/70 font-light">
            Our interactive FAQ system helps you understand what might be
            going on, checks insurance coverage, and points you toward the
            right specialist — available any time, day or night.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-text-dark/60">
            <li>· Educational symptom matching guidelines</li>
            <li>· Insurance, clinic, and treatment FAQs</li>
            <li>· Appointment suggestions matched to your case</li>
          </ul>

          <button
            onClick={() => setActive(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white cursor-pointer hover:shadow-lg transition-shadow border-none"
            style={{ background: 'var(--color-blue)' }}
          >
            <HelpCircle size={16} />
            {active ? 'Replay demo' : 'See it in action'}
          </button>
        </div>

        <div
          className="rounded-2xl border p-5 shadow-xl text-left"
          style={{ borderColor: 'rgba(10,93,155,0.12)', background: 'white' }}
        >
          <div className="mb-4 flex items-center gap-2 border-b pb-4" style={{ borderColor: 'rgba(10,93,155,0.08)' }}>
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-teal))' }}
            >
              <HelpCircle size={15} color="white" />
            </span>
            <div>
              <p className="text-sm font-semibold text-text-dark">Amara FAQ Guide</p>
              <p className="text-[11px] text-emerald-600 font-semibold">Online</p>
            </div>
          </div>

          <div className="flex min-h-[260px] flex-col gap-3 justify-end">
            <AnimatePresence>
              {script.slice(0, visible).map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from === 'user' ? 'self-end text-white' : 'self-start'}`}
                  style={{
                    background: m.from === 'user' ? 'var(--color-blue)' : 'var(--color-mist)',
                    color: m.from === 'user' ? 'white' : 'var(--color-text-dark)',
                  }}
                >
                  {m.text}
                </motion.div>
              ))}
            </AnimatePresence>
            {!active && (
              <div className="flex flex-1 items-center justify-center text-sm" style={{ color: 'rgba(27,27,27,0.35)' }}>
                Click "See it in action" to preview a conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
