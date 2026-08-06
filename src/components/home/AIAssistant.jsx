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
    <section className="bg-stone-50 px-6 py-20 md:px-16" id="faq-assistant">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-2 md:items-center">
        <div className="text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-800 font-bold">
            Interactive FAQ System
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
            Answers Before Your First Appointment
          </h2>
          <p className="mt-5 max-w-md text-[18px] leading-relaxed text-stone-600 font-normal">
            Our interactive FAQ system helps you understand symptoms, check insurance coverage, and points you toward the right specialist details — available any time.
          </p>

          <ul className="mt-6 space-y-2.5 text-sm text-stone-500 font-medium">
            <li>· Educational symptom matching guidelines</li>
            <li>· Insurance, clinic, and treatment FAQs</li>
            <li>· Appointment suggestions matched to your case</li>
          </ul>

          <button
            onClick={() => setActive(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white cursor-pointer hover:bg-emerald-700 transition-all border-none bg-emerald-600 shadow-sm"
          >
            <HelpCircle size={16} />
            {active ? 'Replay Demo' : 'See It in Action'}
          </button>
        </div>

        <div
          className="rounded-2xl border border-stone-200 p-5 shadow-premium text-left bg-white"
        >
          <div className="mb-4 flex items-center gap-2 border-b border-stone-100 pb-4">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400"
            >
              <HelpCircle size={15} color="white" />
            </span>
            <div>
              <p className="text-sm font-bold text-stone-950">Amara FAQ Assistant</p>
              <p className="text-[11px] text-emerald-600 font-bold">Online &amp; Active</p>
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
                    background: m.from === 'user' ? 'var(--color-medical-600)' : '#f4f6f5',
                    color: m.from === 'user' ? 'white' : '#1c2e24',
                  }}
                >
                  {m.text}
                </motion.div>
              ))}
            </AnimatePresence>
            {!active && (
              <div className="flex flex-1 items-center justify-center text-sm text-stone-400 font-medium">
                Click "See It in Action" to preview a conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
