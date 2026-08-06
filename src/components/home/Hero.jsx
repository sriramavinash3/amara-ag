import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, CalendarCheck2, ArrowUpRight } from 'lucide-react';
import PulseLine from './PulseLine';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const stats = [
  { value: '10,000+', label: 'Patients treated' },
  { value: '15+ Yrs', label: 'Specialized Care' },
  { value: '95%+', label: 'Lasting Pain Relief' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen py-28 lg:py-0 w-full flex items-center" aria-label="Amara Pain & Spine — hero">
      {/* Local ambient glow layered above the shared 3D stage */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 72% 40%, rgba(27,170,156,0.16) 0%, rgba(10,93,155,0.12) 35%, rgba(6,13,23,0) 70%)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col justify-center px-6 md:px-16">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl text-left">
          <motion.p
            variants={item}
            className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em]"
            style={{ color: 'var(--color-teal)' }}
          >
            Charlotte Pain &amp; Spine Specialists
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-[11vw] leading-[1.0] sm:text-[6.4vw] md:text-[4.6vw] text-mist font-bold"
          >
            Advanced pain relief.{' '}
            <span className="italic" style={{ color: 'var(--color-blue-light)' }}>
              Personalized care.
            </span>{' '}
            Better living.
          </motion.h1>

          <motion.div variants={item} className="my-7 max-w-md">
            <PulseLine className="h-10 w-full" />
          </motion.div>

          <motion.p
            variants={item}
            className="max-w-md text-[15px] leading-relaxed text-mist/70 md:text-base font-light"
          >
            Charlotte's leading specialists delivering advanced, evidence-based pain
            management — built around your body, your diagnosis, and your life outside
            of the clinic.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/book">
              <button
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,107,53,0.4)] cursor-pointer"
                style={{ background: 'var(--color-coral)', color: '#0b0b0b' }}
              >
                <CalendarCheck2 size={17} strokeWidth={2.2} />
                Book Appointment
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>

            <a href="tel:7045039338">
              <button
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold text-mist transition-colors duration-300 hover:bg-white/5 cursor-pointer"
                style={{ borderColor: 'rgba(245,247,250,0.25)' }}
              >
                <Phone size={16} strokeWidth={2.2} />
                Call 704-503-9338
              </button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t pt-6 text-left"
          style={{ borderColor: 'rgba(245,247,250,0.12)' }}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={item} className="min-w-[120px]">
              <div className="font-display text-2xl md:text-3xl font-bold text-mist">
                {s.value}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wide text-mist/50 font-mono">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
