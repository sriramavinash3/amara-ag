import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheck2, PhoneCall } from 'lucide-react';
import PulseLine from './PulseLine';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-32 text-center md:px-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(50% 60% at 50% 30%, rgba(27,170,156,0.18) 0%, rgba(6,13,23,0) 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-2xl"
      >
        <PulseLine className="mx-auto mb-6 h-8 w-64" />
        <h2 className="font-display text-4xl text-mist font-bold leading-tight">
          Take the first step toward living pain free.
        </h2>
        <p className="mt-4 text-mist/60 font-light text-base">
          Same-week appointments available. Most major insurances accepted.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link to="/book">
            <button
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold cursor-pointer shadow-[0_0_20px_rgba(255,107,53,0.4)]"
              style={{ background: 'var(--color-coral)', color: '#0b0b0b' }}
            >
              <CalendarCheck2 size={17} /> Book Appointment
            </button>
          </Link>
          <a href="tel:7045039338">
            <button
              className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold text-mist cursor-pointer border-slate-700 hover:bg-white/5"
            >
              <PhoneCall size={16} /> Call 704-503-9338
            </button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
