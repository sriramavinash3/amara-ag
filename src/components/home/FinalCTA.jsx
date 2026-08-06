import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheck2, PhoneCall } from 'lucide-react';
import PulseLine from './PulseLine';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-stone-50 px-6 py-20 text-center md:px-16 border-t border-stone-200/60">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(50% 60% at 50% 30%, rgba(16,185,129,0.06) 0%, rgba(250,250,249,0) 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-2xl"
      >
        <h2 className="font-heading text-4xl text-stone-900 font-bold leading-tight">
          Take the First Step Toward Living Pain-Free
        </h2>
        <p className="mt-4 text-stone-600 font-normal text-[18px]">
          Same-week appointments available. Most major insurances accepted.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link to="/book">
            <button
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white cursor-pointer shadow-md transition-all hover:bg-emerald-700 bg-emerald-600"
            >
              <CalendarCheck2 size={17} /> Book Appointment
            </button>
          </Link>
          <a href="tel:7045039338">
            <button
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-7 py-3.5 text-sm font-semibold text-stone-850 cursor-pointer bg-white hover:bg-stone-50"
            >
              <PhoneCall size={16} /> Call 704-503-9338
            </button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
