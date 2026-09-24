import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Languages, BadgeCheck, ArrowRight } from 'lucide-react';

const providers = [
  {
    id: 'dr-ashvin-amara',
    name: 'Ashvin K. Amara, MD',
    role: 'Founder & Medical Director',
    image: '/images/ashvin-amara.jpg',
    education: 'Fellowship in Interventional Pain Management',
    certs: 'Board Certified — Anesthesiology & Pain Medicine',
    languages: 'English, Hindi, Telugu, Spanish',
    specialties: 'Facet joint blocks, epidural steroid injections, spinal cord stimulator implants, radiofrequency ablation',
  },
  {
    id: 'eunice-babalola',
    name: 'Eunice Babalola, NP, MSN',
    role: 'Nurse Practitioner',
    image: '/images/eunice-babalola.jpg',
    education: 'MSN-FNP, University of North Carolina at Charlotte',
    certs: 'Board Certified — AANP & ANCC',
    languages: 'English, Spanish',
    specialties: 'Chronic pain management, medication management, complementary care, myofascial trigger point therapy',
  },
  {
    id: 'alexander-carmenaty',
    name: 'Alexander Carmenaty Rodriguez, MSN, FNP-C',
    role: 'Nurse Practitioner',
    image: '/images/alexander-carmenaty.jpg',
    education: 'MSN-FNP, South University–Savannah',
    certs: 'Board Certified — AANP',
    languages: 'English, Spanish, Portuguese',
    specialties: 'Spine & joint injection assistance, clinical evaluations, chronic pain management',
  },
];

export default function Providers() {
  return (
    <section className="bg-[#3A3838] py-12 md:py-16 border-t border-[#585454] m-0" id="providers">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-8 max-w-xl text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-400 font-bold">
            Provider Spotlight
          </p>
          <h2 className="font-heading text-[32px] sm:text-[38px] md:text-[44px] font-bold text-[#FFFFFF] leading-tight">
            The Specialized Team Dedicated to Your Care
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 text-left">
          {providers.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ 
                opacity: 0, 
                x: i === 0 ? -60 : i === 2 ? 60 : 0, 
                y: 30,
                scale: 0.92, 
              }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ 
                type: 'spring', 
                stiffness: 85, 
                damping: 10.5, 
                mass: 0.9,
                delay: i * 0.15 
              }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
              className="group relative z-10 rounded-2xl border border-[#585454] p-6 sm:p-7 flex flex-col justify-between bg-[#454242] shadow-xl hover:border-emerald-500/50"
            >
              <div>
                <div className="mb-5 flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-emerald-500/40 shadow-md shrink-0 bg-[#323030]">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-heading text-base font-extrabold text-white bg-gradient-to-tr from-emerald-600 to-emerald-400">
                        {p.name.split(' ').filter(w => !['Dr.', 'K.', 'MD', 'APRN', 'NPs', 'Advanced', 'Practice'].includes(w)).map(w => w[0]).slice(0, 2).join('') || 'NP'}
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="font-heading text-[18px] sm:text-[20px] text-[#FFFFFF] font-bold">{p.name}</h3>
                <p className="mt-1 text-sm font-bold text-emerald-300">{p.role}</p>

                <div className="mt-5 space-y-3 text-sm text-[#F0F0F0]">
                  <div className="flex gap-2.5">
                    <GraduationCap size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>{p.education}</span>
                  </div>
                  <div className="flex gap-2.5">
                    <BadgeCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>{p.certs}</span>
                  </div>
                  <div className="flex gap-2.5">
                    <Languages size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>{p.languages}</span>
                  </div>
                </div>

                <p className="mt-5 border-t border-[#585454] pt-4 text-xs leading-relaxed text-[#D1D5DB] font-medium">
                  Specialties: {p.specialties}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#585454] flex justify-end">
                <Link to={`/providers/${p.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 hover:text-emerald-200 cursor-pointer">
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
