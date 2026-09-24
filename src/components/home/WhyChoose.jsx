import React from 'react';
import { motion } from 'framer-motion';
import { Award, HeartHandshake, FlaskConical, Users, ShieldCheck, Compass } from 'lucide-react';

const pillars = [
  { icon: Award, title: 'Experienced Specialists', copy: 'Led by double-certified specialist training with over 15 years diagnosing and treating complex spinal & joint pain.' },
  { icon: HeartHandshake, title: 'Patient-First Focus', copy: 'We take the time to listen, locate the biological cause of pain, and design personalized recovery plans.' },
  { icon: FlaskConical, title: 'Fluoroscopic Precision', copy: 'All procedures utilize advanced live X-ray or ultrasound guidance for safety and diagnostic accuracy.' },
  { icon: Users, title: 'Billing Transparency', copy: 'As an independent practice, we charge zero hospital facility fees, saving patients hundreds of dollars.' },
  { icon: ShieldCheck, title: 'Evidence-Based Care', copy: 'We specialize in clinically proven treatments—from nerve blocks to regenerative therapies—not guesswork.' },
  { icon: Compass, title: 'Direct Care Access', copy: 'Offering same-week appointments, rapid prior authorization reviews, and direct primary provider sync.' },
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
            Six reasons patients stay with us for years, not one visit.
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
