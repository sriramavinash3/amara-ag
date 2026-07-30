import { motion } from 'framer-motion'
import { GraduationCap, Languages, BadgeCheck } from 'lucide-react'

const providers = [
  {
    name: 'Dr. Ashvin Amara, MD',
    role: 'Founder & Interventional Pain Specialist',
    education: 'MD, Fellowship in Interventional Pain Management',
    certs: 'Board Certified — Anesthesiology & Pain Medicine',
    languages: 'English, Hindi',
    specialties: 'Spinal cord stimulation, regenerative medicine, complex spine',
  },
  {
    name: 'Sarah Whitfield, NP',
    role: 'Nurse Practitioner',
    education: 'MSN, Family Nurse Practitioner Program',
    certs: 'Board Certified — Family Practice',
    languages: 'English, Spanish',
    specialties: 'Chronic pain management, medication management',
  },
  {
    name: 'James Okafor, PA-C',
    role: 'Physician Assistant',
    education: 'MPAS, Physician Assistant Studies',
    certs: 'NCCPA Certified',
    languages: 'English',
    specialties: 'Injection therapies, post-surgical pain',
  },
]

export default function Providers() {
  return (
    <section className="bg-ink-2 px-6 py-28 md:px-16" id="providers">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-teal)' }}>
            Provider Spotlight
          </p>
          <h2 className="font-display text-4xl text-mist md:text-5xl">
            The team behind your care plan.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {providers.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 50, scale: 0.92, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(27,170,156,0.15)' }}
              className="group rounded-2xl border p-7"
              style={{ borderColor: 'rgba(245,247,250,0.1)', background: 'rgba(245,247,250,0.03)', transformPerspective: 800 }}
            >
              <motion.div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-full font-display text-lg text-mist"
                style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-teal))' }}
                whileHover={{ scale: 1.1, rotate: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12 }}
              >
                {p.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </motion.div>

              <h3 className="font-display text-xl text-mist">{p.name}</h3>
              <p className="mt-1 text-sm" style={{ color: 'var(--color-teal)' }}>{p.role}</p>

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

              <p className="mt-5 border-t pt-4 text-xs leading-relaxed text-mist/45" style={{ borderColor: 'rgba(245,247,250,0.08)' }}>
                {p.specialties}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
