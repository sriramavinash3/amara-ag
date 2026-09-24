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
    <section className="bg-[#3A3838] py-12 md:py-16 m-0 border-t border-[#585454]" id="faq-assistant">
      <div className="mx-auto grid max-w-7xl px-4 sm:px-6 md:px-8 gap-8 md:gap-10 md:grid-cols-2 md:items-center">
        <div className="text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-400 font-bold">
            Interactive FAQ System
          </p>
          <h2 className="font-heading text-[32px] sm:text-[38px] md:text-[44px] font-bold text-[#FFFFFF] leading-tight">
            Answers Before Your First Appointment
          </h2>
          <p className="mt-5 max-w-md text-[17px] sm:text-[18px] leading-relaxed text-[#F0F0F0] font-normal">
            Our interactive FAQ system helps you understand symptoms, check insurance coverage, and points you toward the right specialist details — available any time.
          </p>

          <ul className="mt-6 space-y-2.5 text-sm text-[#D1D5DB] font-medium">
            <li>· Educational symptom matching guidelines</li>
            <li>· Insurance, clinic, and treatment FAQs</li>
            <li>· Appointment suggestions matched to your case</li>
          </ul>

          <button
            onClick={() => setActive(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white cursor-pointer hover:bg-emerald-500 transition-all border-none bg-emerald-600 shadow-md"
          >
            <HelpCircle size={16} />
            {active ? 'Replay Demo' : 'See It in Action'}
          </button>
        </div>

        <div
          className="rounded-2xl border border-[#585454] p-5 shadow-xl text-left bg-[#454242]"
        >
          <div className="mb-4 flex items-center gap-2 border-b border-[#585454] pb-4">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600"
            >
              <HelpCircle size={15} color="white" />
            </span>
            <div>
              <p className="text-sm font-bold text-[#FFFFFF]">Amara FAQ Assistant</p>
              <p className="text-[11px] text-emerald-300 font-bold">Online &amp; Active</p>
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
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.from === 'user' ? 'self-end text-white' : 'self-start border border-[#585454]'}`}
                  style={{
                    background: m.from === 'user' ? '#059669' : '#363434',
                    color: '#FFFFFF',
                  }}
                >
                  {m.text}
                </motion.div>
              ))}
            </AnimatePresence>
            {!active && (
              <div className="flex flex-1 items-center justify-center text-sm text-[#D1D5DB] font-medium">
                Click "See It in Action" to preview a conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
