import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, CalendarCheck2, Award, Shield } from 'lucide-react';
import Button from '../ui/Button';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stats = [
  { value: '10,000+', label: 'Patients Treated' },
  { value: '15+ Yrs', label: 'Specialized Care' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] py-14 lg:py-20 w-full flex items-center bg-[#3A3838] overflow-hidden border-b border-[#585454]" aria-label="Amara Pain & Spine — Hero">
      {/* Subtle ambient glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#323030]/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-8 gap-12">
        
        {/* Left Side Copy */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show" 
          className="max-w-2xl text-left space-y-6 lg:w-1/2"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#363434] border border-[#585454] text-emerald-300 text-xs font-bold uppercase tracking-widest shadow-inner">
            <Award size={14} className="text-emerald-400" />
            Board-Certified Pain Care
          </motion.div>

          <motion.h1
            variants={item}
            className="font-heading text-[34px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-black text-[#FFFFFF] leading-[1.1] tracking-tight"
          >
            Restore Movement. <br />
            <span className="text-emerald-400">Reduce Pain.</span> <br />
            Get Back to Life.
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-[17px] sm:text-[18px] md:text-[20px] leading-relaxed text-[#F0F0F0] font-normal"
          >
            Charlotte's leading interventional specialists delivering advanced, evidence-based pain relief built around your body, your diagnostics, and your life outside of the clinic.
          </motion.p>

          {/* Transparent pricing tag */}
          <motion.div 
            variants={item}
            className="inline-flex items-center gap-3.5 p-4 bg-[#363434] border border-[#585454] rounded-2xl shadow-xl max-w-md text-left"
          >
            <div className="p-2.5 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 rounded-xl shrink-0">
              <Shield className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-[13px] text-[#FFFFFF]">Zero Hospital Facility Fees</h4>
              <p className="text-xs text-[#D1D5DB] mt-0.5">We charge one flat, transparent office fee. No surprise billing.</p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/book">
              <Button variant="primary" size="lg" icon={CalendarCheck2} className="font-bold">
                Book Appointment
              </Button>
            </Link>

            <a href="tel:+17045039338">
              <Button variant="outline" size="lg" icon={Phone}>
                Call +1 704-503-9338
              </Button>
            </a>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div
            variants={item}
            className="pt-6 border-t border-[#585454] flex flex-wrap gap-8 text-left max-w-lg"
          >
            {stats.map((s) => (
              <div key={s.label} className="min-w-[120px]">
                <div className="font-heading text-2xl md:text-3xl font-extrabold text-[#FFFFFF]">
                  {s.value}
                </div>
                <div className="mt-0.5 text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side Visual Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-1/2 relative w-full"
        >
          <div className="relative mx-auto max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#454242]">
            <img 
              src="/images/audience/hero_senior_mobility.jpg" 
              alt="Active senior couple walking outdoors in a park enjoying restored mobility after pain care" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Quick accepted tag */}
            <div className="absolute top-4 right-4 bg-[#323030]/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#585454] shadow-sm text-xs font-bold text-emerald-300">
              BCBS &amp; Medicare Accepted
            </div>
          </div>

          {/* Clinical quality tag */}
          <div className="absolute -bottom-4 left-4 bg-[#363434] p-3.5 rounded-2xl shadow-xl border border-[#585454] hidden md:flex items-center gap-3">
            <div className="p-2 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 rounded-xl">
              <Award className="h-5 w-5" />
            </div>
            <div className="text-left">
              <span className="block text-[11px] font-bold text-[#D1D5DB] uppercase tracking-wider">Clinical Standards</span>
              <span className="text-sm font-extrabold text-[#FFFFFF]">Board-Certified Specialists</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
