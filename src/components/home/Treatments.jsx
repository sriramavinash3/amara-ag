import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { treatments } from '../../utils/medicalData';

function Row({ t, index, openIndex, setOpenIndex }) {
  const open = openIndex === index;
  return (
    <motion.div
      className="relative border-b text-left border-[#585454]"
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
          <span className="font-mono text-xs text-emerald-400 font-bold">{String(index + 1).padStart(2, '0')}</span>
          <span className="font-heading text-[18px] md:text-[22px] text-[#FFFFFF] font-bold hover:text-emerald-300 transition-colors">{t.title}</span>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#D1D5DB] transition-transform duration-300 ${open ? 'rotate-180 text-emerald-400' : ''}`}
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
            <div className="grid gap-8 pb-8 pl-6 md:pl-10 md:grid-cols-3">
              <div className="md:col-span-1 space-y-4">
                <p className="text-sm leading-relaxed text-[#F0F0F0]">{t.overview}</p>
                <Link to={`/treatments/${t.id}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-emerald-200 pt-2 cursor-pointer">
                  <span>View Treatment Page</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-emerald-300 font-bold">Benefits</p>
                <ul className="space-y-1.5 text-sm text-[#F0F0F0] list-disc list-inside">
                  {t.benefits.map((b) => <li key={b} className="leading-relaxed">{b}</li>)}
                </ul>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-emerald-300 font-bold">Recovery &amp; Outcomes</p>
                <p className="text-sm text-[#F0F0F0] leading-relaxed"><strong className="text-[#FFFFFF] font-bold">Downtime:</strong> {t.recovery}</p>
                {t.outcome && (
                  <p className="mt-2 text-sm text-[#F0F0F0] leading-relaxed font-bold"><strong className="text-[#D1D5DB] font-mono text-[10px] block uppercase tracking-wider">Clinical Efficacy:</strong> {t.outcome}</p>
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
    <section className="relative px-4 sm:px-6 md:px-8 py-10 md:py-12 bg-[#3A3838] border-y border-[#585454] animate-reveal m-0 text-[#F0F0F0]" id="treatments">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 max-w-xl text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-400 font-bold">
            Treatments
          </p>
          <h2 className="font-heading text-[32px] sm:text-[38px] md:text-[46px] font-bold text-[#FFFFFF] leading-tight">
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
