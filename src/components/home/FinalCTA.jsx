import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheck2, PhoneCall } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#3A3838] py-14 md:py-16 text-center border-t border-[#585454] m-0">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(50% 60% at 50% 30%, rgba(16,185,129,0.12) 0%, rgba(58,56,56,0) 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl"
        >
        <h2 className="font-heading text-[30px] sm:text-[34px] md:text-[38px] text-[#FFFFFF] font-bold leading-tight">
          Take the First Step Toward Living Pain-Free
        </h2>
        <p className="mt-4 text-[#F0F0F0] font-normal text-[16px] sm:text-[17px] md:text-[18px]">
          Same-week appointments available. Most major insurances accepted.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/book">
            <button
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white cursor-pointer shadow-lg transition-all hover:bg-emerald-500 bg-emerald-600 shadow-emerald-950/40"
            >
              <CalendarCheck2 size={17} /> Book Appointment
            </button>
          </Link>
          <a href="tel:+17045039338">
            <button
              className="inline-flex items-center gap-2 rounded-full border border-[#585454] px-7 py-3.5 text-sm font-semibold text-[#FFFFFF] cursor-pointer bg-[#454242] hover:bg-[#514E4E] hover:border-emerald-500/50 transition-all"
            >
              <PhoneCall size={16} /> Call +1 704-503-9338
            </button>
          </a>
        </div>
      </motion.div>
      </div>
    </section>
  );
}
