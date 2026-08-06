import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, CalendarCheck2, ArrowUpRight, Award, Shield } from 'lucide-react';
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
  { value: '0', label: 'Hospital Facility Fees' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] py-20 lg:py-28 w-full flex items-center bg-gradient-to-br from-white via-emerald-50/10 to-stone-100/60 overflow-hidden border-b border-stone-200/50" aria-label="Amara Pain & Spine — Hero">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/10 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col lg:flex-row items-center justify-between px-6 md:px-16 gap-12">
        
        {/* Left Side Copy */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show" 
          className="max-w-2xl text-left space-y-6 lg:w-1/2"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest">
            <Award size={14} className="text-emerald-700" />
            Board-Certified Pain Care
          </motion.div>

          <motion.h1
            variants={item}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 leading-[1.1] tracking-tight"
          >
            Restore Movement. <br />
            <span className="text-emerald-600">Reduce Pain.</span> <br />
            Get Back to Life.
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-[18px] md:text-[20px] leading-relaxed text-stone-600 font-normal"
          >
            Charlotte's leading interventional specialists delivering advanced, evidence-based pain relief built around your body, your diagnostics, and your life outside of the clinic.
          </motion.p>

          {/* Transparent pricing tag */}
          <motion.div 
            variants={item}
            className="inline-flex items-center gap-3 p-4 bg-white border border-stone-200/60 rounded-2xl shadow-premium max-w-md text-left"
          >
            <div className="p-2.5 bg-emerald-50 text-emerald-650 rounded-xl">
              <Shield className="h-6 w-6 text-emerald-655" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900">Zero Hospital Facility Fees</h4>
              <p className="text-xs text-stone-500">We charge one flat, transparent office fee. No surprise billing.</p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/book">
              <Button variant="primary" size="lg" icon={CalendarCheck2}>
                Book Appointment
              </Button>
            </Link>

            <a href="tel:7045039338">
              <Button variant="outline" size="lg" icon={Phone}>
                Call 704-503-9338
              </Button>
            </a>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div
            variants={item}
            className="pt-6 border-t border-stone-200 flex flex-wrap gap-8 text-left max-w-lg"
          >
            {stats.map((s) => (
              <div key={s.label} className="min-w-[120px]">
                <div className="font-heading text-2xl md:text-3xl font-extrabold text-stone-900">
                  {s.value}
                </div>
                <div className="mt-0.5 text-xs font-bold uppercase tracking-wider text-stone-500">
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
          className="lg:w-1/2 relative"
        >
          <div className="relative mx-auto max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="/images/active_couple.jpg" 
              alt="Active couple walking in the park smiling after pain relief treatment" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            
            {/* Quick accepted tag */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-stone-200/50 shadow-sm text-xs font-bold text-emerald-800">
              BCBS &amp; Medicare Accepted
            </div>
          </div>

          {/* Floating Testimonial snippet */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4.5 rounded-2xl shadow-xl border border-stone-200/50 hidden md:flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Award className="h-5 w-5" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider">Patient Care</span>
              <span className="text-sm font-bold text-stone-900">95%+ Lasting Pain Relief</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
