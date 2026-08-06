import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Languages, BadgeCheck, ArrowRight } from 'lucide-react';

const providers = [
  {
    id: 'dr-ashvin-amara',
    name: 'Ashvin K. Amara, MD',
    role: 'Founder & Medical Director',
    education: 'Fellowship in Interventional Pain Management',
    certs: 'Board Certified — Anesthesiology & Pain Medicine',
    languages: 'English, Hindi, Telugu, Spanish',
    specialties: 'Facet joint blocks, epidural steroid injections, spinal cord stimulator implants, radiofrequency ablation',
  },
  {
    id: 'eunice-babalola',
    name: 'Eunice Babalola, NP, MSN',
    role: 'Nurse Practitioner',
    education: 'MSN-FNP, University of North Carolina at Charlotte',
    certs: 'Board Certified — AANP & ANCC',
    languages: 'English, Spanish',
    specialties: 'Chronic pain management, medication management, complementary care, myofascial trigger point therapy',
  },
  {
    id: 'alexander-carmenaty',
    name: 'Alexander Carmenaty Rodriguez, MSN, FNP-C',
    role: 'Nurse Practitioner',
    education: 'MSN-FNP, South University–Savannah',
    certs: 'Board Certified — AANP',
    languages: 'English, Spanish, Portuguese',
    specialties: 'Spine & joint injection assistance, clinical evaluations, chronic pain management',
  },
];

export default function Providers() {
  return (
    <section className="bg-stone-50 px-6 py-20 md:px-16 border-t border-stone-200/60" id="providers">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 max-w-xl text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-800 font-bold">
            Provider Spotlight
          </p>
          <h2 className="font-heading text-4xl text-stone-900 md:text-5xl font-bold leading-tight">
            The Specialized Team Dedicated to Your Care
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 text-left">
          {providers.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ 
                opacity: 0, 
                x: i === 0 ? -100 : i === 2 ? 100 : 0, 
                y: 40,
                scale: 0.9, 
                rotateX: 5 
              }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ 
                type: 'spring', 
                stiffness: 85, 
                damping: 10.5, 
                mass: 0.9,
                delay: i * 0.15 
              }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(11,28,21,0.04)' }}
              className="group relative z-10 rounded-2xl border border-stone-200/80 p-7 flex flex-col justify-between bg-white shadow-premium"
              style={{ transformPerspective: 800 }}
            >
              <div>
                <motion.div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-full font-heading text-lg text-white font-extrabold bg-gradient-to-tr from-emerald-600 to-emerald-400 shadow-inner"
                  whileHover={{ scale: 1.1, rotate: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                >
                  {p.name.split(' ').filter(w => !['Dr.', 'K.', 'MD', 'APRN', 'NPs', 'Advanced', 'Practice'].includes(w)).map(w => w[0]).slice(0, 2).join('') || 'NP'}
                </motion.div>

                <h3 className="font-heading text-xl text-stone-900 font-bold">{p.name}</h3>
                <p className="mt-1 text-sm font-bold text-emerald-700">{p.role}</p>

                <div className="mt-5 space-y-3 text-sm text-stone-600">
                  <div className="flex gap-2.5">
                    <GraduationCap size={16} className="mt-0.5 shrink-0 text-stone-400" />
                    <span>{p.education}</span>
                  </div>
                  <div className="flex gap-2.5">
                    <BadgeCheck size={16} className="mt-0.5 shrink-0 text-stone-400" />
                    <span>{p.certs}</span>
                  </div>
                  <div className="flex gap-2.5">
                    <Languages size={16} className="mt-0.5 shrink-0 text-stone-400" />
                    <span>{p.languages}</span>
                  </div>
                </div>

                <p className="mt-5 border-t border-stone-150 pt-4 text-xs leading-relaxed text-stone-500 font-medium" style={{ borderColor: '#e7e5e4' }}>
                  Specialties: {p.specialties}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-150 flex justify-end">
                <Link to={`/providers/${p.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-750 cursor-pointer">
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
