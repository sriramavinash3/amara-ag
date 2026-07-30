import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Languages, BadgeCheck, ArrowRight } from 'lucide-react';

const providers = [
  {
    id: 'dr-ashvin-amara',
    name: 'Dr. Ashvin K. Amara, MD',
    role: 'Founder & Lead Interventionalist',
    education: 'Fellowship in Interventional Pain Management',
    certs: 'ABA Board Certified — Anesthesiology & Pain Medicine',
    languages: 'English, Spanish, Hindi, Telugu',
    specialties: 'Spinal cord stimulation, fluoroscopic injections, radiofrequency ablation',
  },
  {
    id: 'nurse-practitioners',
    name: 'Advanced Practice NPs',
    role: 'Board-Certified Nurse Practitioners',
    education: 'Master of Science in Nursing (MSN)',
    certs: 'AANP Certified - Family Practice',
    languages: 'English, Spanish',
    specialties: 'Clinical diagnostics, trigger point blocks, joint injections, metabolic therapy',
  },
];

export default function Providers() {
  return (
    <section className="bg-ink-2 px-6 py-28 md:px-16" id="providers">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 max-w-xl text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-teal)' }}>
            Provider Spotlight
          </p>
          <h2 className="font-display text-4xl text-mist md:text-5xl font-bold leading-tight">
            The board-certified team behind your care plan.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 text-left">
          {providers.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ 
                opacity: 0, 
                x: i === 0 ? -120 : 120, 
                y: 40,
                rotate: i === 0 ? -4 : 4,
                scale: 0.88, 
                rotateX: 10 
              }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ 
                type: 'spring', 
                stiffness: 85, 
                damping: 10.5, 
                mass: 0.9,
                delay: i * 0.15 
              }}
              whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(27,170,156,0.15)' }}
              className="group relative z-10 rounded-2xl border p-7 flex flex-col justify-between"
              style={{ borderColor: 'rgba(245,247,250,0.1)', background: 'rgba(245,247,250,0.03)', transformPerspective: 800 }}
            >
              <div>
                <motion.div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-full font-display text-lg text-mist font-bold"
                  style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-teal))' }}
                  whileHover={{ scale: 1.1, rotate: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                >
                  {p.name.split(' ').filter(w => !['Dr.', 'K.', 'MD', 'APRN', 'NPs', 'Advanced', 'Practice'].includes(w)).map(w => w[0]).slice(0, 2).join('') || 'NP'}
                </motion.div>

                <h3 className="font-display text-xl text-mist font-bold">{p.name}</h3>
                <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--color-teal)' }}>{p.role}</p>

                <div className="mt-5 space-y-3 text-sm text-mist/65">
                  <div className="flex gap-2.5">
                    <GraduationCap size={16} className="mt-0.5 shrink-0 text-mist/40" />
                    <span>{p.education}</span>
                  </div>
                  <div className="flex gap-2.5">
                    <BadgeCheck size={16} className="mt-0.5 shrink-0 text-mist/40" />
                    <span>{p.certs}</span>
                  </div>
                  <div className="flex gap-2.5">
                    <Languages size={16} className="mt-0.5 shrink-0 text-mist/40" />
                    <span>{p.languages}</span>
                  </div>
                </div>

                <p className="mt-5 border-t pt-4 text-xs leading-relaxed text-mist/45 font-mono" style={{ borderColor: 'rgba(245,247,250,0.08)' }}>
                  Specialties: {p.specialties}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
                <Link to={`/providers/${p.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer">
                  <span>View Full Profile</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
