import React from 'react';
import { motion } from 'framer-motion';

const insurers = [
  'Blue Cross Blue Shield', 'Medicare', 'Medicaid', 'Aetna', 'Cigna',
  'UnitedHealthcare', 'Humana', 'Tricare', 'Medcost', 'Workers\' Comp'
];

export default function InsuranceMarquee() {
  const row = [...insurers, ...insurers];

  return (
    <section className="relative overflow-hidden border-y bg-stone-50 py-10" style={{ borderColor: '#e7e5e4' }}>
      <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.28em] text-stone-500 font-bold">
        In-Network with Most Major Insurers
      </p>

      <div className="group relative flex overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-stone-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-stone-50 to-transparent" />

        <motion.div
          className="flex shrink-0 items-center gap-14 pr-14 group-hover:[animation-play-state:paused]"
          style={{ animation: 'marquee 32s linear infinite' }}
        >
          {row.map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-heading text-lg text-stone-400 hover:text-emerald-700 transition-all duration-300 font-semibold"
            >
              {name}
            </span>
          ))}
        </motion.div>
        <motion.div
          className="flex shrink-0 items-center gap-14 pr-14 group-hover:[animation-play-state:paused]"
          style={{ animation: 'marquee 32s linear infinite' }}
          aria-hidden="true"
        >
          {row.map((name, i) => (
            <span
              key={`b${i}`}
              className="whitespace-nowrap font-heading text-lg text-stone-400 hover:text-emerald-700 transition-all duration-300 font-semibold"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}
