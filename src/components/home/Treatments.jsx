import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { treatments } from '../../utils/medicalData';

function Row({ t, index, openIndex, setOpenIndex }) {
  const open = openIndex === index;
  return (
    <motion.div
      className="relative border-b text-left border-stone-250/70"
      whileHover={{ paddingLeft: 8 }}
      transition={{ duration: 0.25 }}
    >
      <motion.span
        className="absolute left-0 top-0 h-full w-0.5"
        style={{ background: '#059669' }}
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.3 }}
      />
      <button
        onClick={() => setOpenIndex(open ? null : index)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left border-none bg-transparent cursor-pointer"
      >
        <div className="flex items-baseline gap-5">
          <span className="font-mono text-xs text-stone-400 font-bold">{String(index + 1).padStart(2, '0')}</span>
          <span className="font-heading text-xl md:text-2xl text-stone-900 font-bold hover:text-emerald-700 transition-colors">{t.title}</span>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-stone-400 transition-transform duration-300 ${open ? 'rotate-180 text-emerald-600' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-8 pl-10 md:grid-cols-3">
              <div className="md:col-span-1 space-y-4">
                <p className="text-sm leading-relaxed text-stone-600">{t.overview}</p>
                <Link to={`/treatments/${t.id}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 pt-2 cursor-pointer">
                  <span>View Treatment Page</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-emerald-850 font-bold">Benefits</p>
                <ul className="space-y-1.5 text-sm text-stone-600 list-disc list-inside">
                  {t.benefits.map((b) => <li key={b} className="leading-relaxed">{b}</li>)}
                </ul>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-emerald-850 font-bold">Recovery &amp; Outcomes</p>
                <p className="text-sm text-stone-600 leading-relaxed"><strong className="text-stone-900 font-bold">Downtime:</strong> {t.recovery}</p>
                {t.outcome && (
                  <p className="mt-2 text-sm text-stone-850 leading-relaxed font-bold"><strong className="text-stone-500 font-mono text-[10px] block uppercase tracking-wider">Clinical Efficacy:</strong> {t.outcome}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Treatments() {
  const [openIndex, setOpenIndex] = useState(0);
  const treatList = Object.values(treatments);

  return (
    <section className="relative px-6 py-20 md:px-16 bg-white border-y border-stone-200/50 animate-reveal" id="treatments">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mb-14 max-w-xl text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-800 font-bold">
            Treatments
          </p>
          <h2 className="font-heading text-4xl text-stone-900 md:text-5xl font-bold leading-tight">
            Interventional Care, Matched to Your Diagnosis
          </h2>
        </div>

        <div>
          {treatList.map((t, i) => (
            <Row key={t.id} t={t} index={i} openIndex={openIndex} setOpenIndex={setOpenIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}
