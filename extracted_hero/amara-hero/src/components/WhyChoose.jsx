import { motion } from 'framer-motion'
import { Award, HeartHandshake, FlaskConical, Users, ShieldCheck, Compass } from 'lucide-react'

const pillars = [
  { icon: Award, title: 'Experienced Specialists', copy: 'Board-certified interventional pain physicians with 14+ years treating Charlotte.' },
  { icon: HeartHandshake, title: 'Personalized Care', copy: 'A plan built around your diagnosis, goals, and daily life — not a standard protocol.' },
  { icon: FlaskConical, title: 'Advanced Treatments', copy: 'From regenerative medicine to spinal cord stimulation, matched to what you actually need.' },
  { icon: Users, title: 'Insurance Support', copy: 'In-network with most major providers, with a team that handles the paperwork.' },
  { icon: ShieldCheck, title: 'Evidence-Based Care', copy: 'Every recommendation is grounded in outcomes data, not guesswork.' },
  { icon: Compass, title: 'Patient Focus', copy: 'Same-week appointments and a care team that answers the phone.' },
]

export default function WhyChoose() {
  return (
    <section className="bg-mist px-6 py-28 md:px-16" id="why-amara">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 max-w-xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-blue)' }}>
            Why Choose Amara
          </p>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--color-text-dark)' }}>
            Six reasons patients stay with us for years, not one visit.
          </h2>
        </div>

        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40, x: -10 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 4, borderColor: 'rgba(10,93,155,0.7)' }}
                className="border-l-2 pl-6"
                style={{ borderColor: 'rgba(10,93,155,0.2)' }}
              >
                <motion.div whileHover={{ rotate: -10, scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }} className="inline-block">
                  <Icon size={22} style={{ color: 'var(--color-blue)' }} strokeWidth={1.8} />
                </motion.div>
                <h3 className="mt-4 font-display text-xl" style={{ color: 'var(--color-text-dark)' }}>{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(27,27,27,0.62)' }}>{p.copy}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
