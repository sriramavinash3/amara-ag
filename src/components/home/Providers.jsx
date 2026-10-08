import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Languages, BadgeCheck, ArrowRight } from 'lucide-react';

const providers = [
  {
    id: 'dr-ashvin-amara',
    name: 'Ashvin K. Amara, MD',
    role: 'Founder & Medical Director',
    credentials: 'Anesthesiology & Pain Medicine',
    acceptingNewPatients: true,
    image: '/images/ashvin-amara.jpg',
    education: 'Fellowship in Interventional Pain Management',
    certs: 'Anesthesiology & Interventional Pain Medicine',
    languages: 'English, Hindi, Telugu, Spanish',
    specialties: 'Facet joint blocks, epidural steroid injections, spinal cord stimulator implants, radiofrequency ablation',
  },
  {
    id: 'eunice-babalola',
    name: 'Eunice Babalola, NP, MSN',
    role: 'Nurse Practitioner',
    credentials: 'Family Nurse Practitioner',
    acceptingNewPatients: false,
    image: '/images/eunice-babalola.jpg',
    education: 'MSN-FNP, University of North Carolina at Charlotte',
    certs: 'AANP & ANCC',
    languages: 'English, Spanish',
    specialties: 'Chronic pain management, medication management, complementary care, myofascial trigger point therapy',
  },
  {
    id: 'alexander-carmenaty',
    name: 'Alexander Carmenaty Rodriguez, MSN, FNP-C',
    role: 'Nurse Practitioner',
    credentials: 'Family Nurse Practitioner',
    acceptingNewPatients: false,
    image: '/images/alexander-carmenaty.jpg',
    education: 'MSN-FNP, South University–Savannah',
    certs: 'AANP',
    languages: 'English, Spanish, Portuguese',
    specialties: 'Spine & joint injection assistance, clinical evaluations, chronic pain management',
  },
];

export default function Providers() {
  return (
    <section className="bg-[#3A3838] py-14 md:py-20 border-t border-[#585454] m-0" id="providers" aria-label="Our Specialized Clinical Team">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-10 max-w-2xl text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-400 font-bold">
            Provider Spotlight · Physician-Led Care
          </p>
          <h2 className="font-heading text-[32px] sm:text-[38px] md:text-[44px] font-bold text-[#FFFFFF] leading-tight">
            The Specialized Team Dedicated to Your Relief
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#D1D5DB] leading-relaxed">
            Every patient is evaluated and treated directly by pain physicians and experienced specialist nurse practitioners.
          </p>
        </div>

        {/* Responsive Grid: 3 columns desktop, 2 columns tablet, 1 column mobile — All 3 providers always rendered */}
        <div className="grid gap-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
          {providers.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ 
                opacity: 0, 
                x: i === 0 ? -40 : i === 2 ? 40 : 0, 
                y: 30,
                scale: 0.95, 
              }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ 
                type: 'spring', 
                stiffness: 85, 
                damping: 12, 
                mass: 0.9,
                delay: i * 0.12 
              }}
              whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.45)' }}
              className="group relative z-10 rounded-3xl border border-[#585454] p-6 sm:p-7 flex flex-col justify-between bg-[#454242] shadow-xl hover:border-emerald-500/60 transition-all duration-300"
            >
              <div>
                {/* Prominent Provider Portrait Container — 15-25%+ Visual Presence Enhancement */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[1/1] max-h-[320px] overflow-hidden rounded-2xl border-2 border-[#585454] group-hover:border-emerald-500/50 shadow-lg shrink-0 bg-[#323030] mb-6">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`${p.name} - ${p.role} at Amara Pain & Spine Charlotte`}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-heading text-2xl font-extrabold text-white bg-gradient-to-tr from-emerald-600 to-emerald-400">
                      {p.name.split(' ').filter(w => !['Dr.', 'K.', 'MD', 'APRN', 'NPs', 'Advanced', 'Practice'].includes(w)).map(w => w[0]).slice(0, 2).join('') || 'NP'}
                    </div>
                  )}

                  {/* Gradient Framing Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Accepting New Patients Badge — Dr. Amara */}
                  {p.acceptingNewPatients && (
                    <div className="absolute top-3.5 right-3.5 bg-emerald-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/60 shadow-md text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Accepting New Patients
                    </div>
                  )}
                </div>

                <h3 className="font-heading text-[22px] sm:text-[24px] text-[#FFFFFF] font-bold tracking-tight">{p.name}</h3>
                <p className="mt-1 text-sm sm:text-[15px] font-bold text-emerald-300">{p.role}</p>
                <p className="text-xs text-[#D1D5DB] mt-0.5 font-medium">{p.credentials}</p>

                <div className="mt-5 space-y-3 text-sm text-[#F0F0F0]">
                  <div className="flex gap-2.5 items-start">
                    <GraduationCap size={17} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span className="leading-snug">{p.education}</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <BadgeCheck size={17} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span className="leading-snug">{p.certs}</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <Languages size={17} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span className="leading-snug">{p.languages}</span>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#585454] pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] block mb-1">Key Focus Areas</span>
                  <p className="text-xs leading-relaxed text-[#D1D5DB] font-medium">
                    {p.specialties}
                  </p>
                </div>
              </div>

              <div className="mt-7 pt-4 border-t border-[#585454] flex items-center justify-between">
                <span className="text-xs text-[#A3A3A3]">Charlotte, NC</span>
                <Link 
                  to={`/providers/${p.id}`} 
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-300 hover:text-emerald-200 cursor-pointer group-hover:translate-x-0.5 transition-all duration-200"
                >
                  <span>View Full Profile</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
