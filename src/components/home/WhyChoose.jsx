import React from 'react';
import { motion } from 'framer-motion';
import { Award, HeartHandshake, FlaskConical, Users, ShieldCheck, Compass } from 'lucide-react';

const pillars = [
  { icon: Award, title: 'Interventional Specialists', copy: 'Physician training in anesthesiology and interventional pain medicine.' },
  { icon: HeartHandshake, title: 'Focused Clinical Evaluation', copy: 'We review your diagnostic imaging and medical history to evaluate what is causing your pain.' },
  { icon: FlaskConical, title: 'Image-Guided Precision', copy: 'All procedures use fluoroscopy (real-time X-ray) or ultrasound guidance to verify target anatomy.' },
  { icon: Users, title: 'Transparent In-Office Billing', copy: 'As an independent practice, we charge transparent office fees with zero hospital facility charges.' },
  { icon: ShieldCheck, title: 'Targeted Non-Surgical Care', copy: 'We provide outpatient procedures including epidural injections, nerve blocks, and neuromodulation.' },
  { icon: Compass, title: 'Prompt Scheduling', copy: 'Offering same-week consultations, prior authorization coordination, and direct communication with referring physicians.' },
];

export default function WhyChoose() {
  return (
    <section className="bg-mist px-4 sm:px-6 md:px-8 py-16 md:py-20" id="why-amara">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-xl text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-blue)' }}>
            Why Choose Amara
          </p>
          <h2 className="font-display text-[34px] md:text-[46px] font-bold text-text-dark leading-tight">
            Clinical Care at Amara Pain &amp; Spine
          </h2>
        </div>

        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ 
                  opacity: 0, 
                  x: i % 3 === 0 ? -100 : i % 3 === 2 ? 100 : 0, 
                  y: i % 3 === 1 ? 70 : 40,
                  rotate: i % 3 === 0 ? -5 : i % 3 === 2 ? 5 : 0,
                  scale: 0.88
                }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 90, 
                  damping: 11, 
                  mass: 0.95,
                  delay: (i % 3) * 0.12 
                }}
                whileHover={{ x: 4, borderColor: 'rgba(10,93,155,0.7)' }}
                className="border-l-2 pl-6"
                style={{ borderColor: 'rgba(10,93,155,0.2)' }}
              >
                <motion.div whileHover={{ rotate: -10, scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }} className="inline-block">
                  <Icon size={22} style={{ color: 'var(--color-blue)' }} strokeWidth={1.8} />
                </motion.div>
                <h3 className="mt-4 font-display text-[18px] font-semibold text-text-dark">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-dark/70 font-light">{p.copy}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
