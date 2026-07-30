import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const treatments = [
  {
    name: 'Epidural Injections',
    summary: 'Targeted anti-inflammatory relief delivered directly to the spinal nerve root.',
    benefits: ['Reduces nerve inflammation', 'Non-surgical', 'Same-day procedure'],
    recovery: 'Return to light activity same day',
    outcome: '78% report significant relief within 2 weeks',
  },
  {
    name: 'Nerve Blocks',
    summary: 'Precision-guided anesthetic to interrupt pain signals at their source.',
    benefits: ['Diagnostic + therapeutic', 'Minimally invasive', 'Fast-acting'],
    recovery: '24–48 hour recovery window',
    outcome: '81% report reduced pain intensity',
  },
  {
    name: 'Radiofrequency Ablation',
    summary: 'Heat-based nerve deactivation for longer-lasting chronic pain control.',
    benefits: ['Relief up to 12+ months', 'Outpatient procedure', 'Repeatable'],
    recovery: '3–5 days of light restriction',
    outcome: '85% report sustained relief at 6 months',
  },
  {
    name: 'Spinal Cord Stimulation',
    summary: 'An implanted device that replaces pain signals with mild stimulation.',
    benefits: ['Trial before permanent implant', 'Adjustable via remote', 'Opioid-sparing'],
    recovery: '1–2 weeks post-implant',
    outcome: '73% reduction in reported pain scores',
  },
  {
    name: 'Trigger Point Therapy',
    summary: 'Direct injection into tight muscle bands driving referred pain.',
    benefits: ['Rapid muscle release', 'Low downtime', 'Pairs with PT'],
    recovery: 'Same-day return to activity',
    outcome: '70% report relief within 48 hours',
  },
  {
    name: 'Regenerative Treatments',
    summary: "The body's own healing factors, concentrated and reintroduced at the injury site.",
    benefits: ['Biologic, non-synthetic', 'Supports tissue repair', 'Low complication rate'],
    recovery: 'Gradual improvement over 4–8 weeks',
    outcome: '68% report improved function at 3 months',
  },
]

function Row({ t, index, openIndex, setOpenIndex }) {
  const open = openIndex === index
  return (
    <motion.div
      className="relative border-b"
      style={{ borderColor: 'rgba(245,247,250,0.1)' }}
      whileHover={{ paddingLeft: 8 }}
      transition={{ duration: 0.25 }}
    >
      <motion.span
        className="absolute left-0 top-0 h-full w-0.5"
        style={{ background: 'linear-gradient(180deg, var(--color-teal), var(--color-blue-light))' }}
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.3 }}
      />
      <button
        onClick={() => setOpenIndex(open ? null : index)}
        className="flex w-full items-center justify-between gap-6 py-7 text-left"
      >
        <div className="flex items-baseline gap-5">
          <span className="font-mono text-xs text-mist/35">{String(index + 1).padStart(2, '0')}</span>
          <span className="font-display text-2xl text-mist md:text-3xl">{t.name}</span>
        </div>
        <ChevronDown
          size={20}
          className={`shrink-0 text-mist/50 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-9 pl-10 md:grid-cols-3">
              <p className="text-sm leading-relaxed text-mist/65 md:col-span-1">{t.summary}</p>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-teal" style={{ color: 'var(--color-teal)' }}>Benefits</p>
                <ul className="space-y-1.5 text-sm text-mist/70">
                  {t.benefits.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-teal" style={{ color: 'var(--color-teal)' }}>Recovery &amp; Outcomes</p>
                <p className="text-sm text-mist/70">{t.recovery}</p>
                <p className="mt-1 text-sm font-medium text-mist/90">{t.outcome}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Treatments() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="relative px-6 py-32 md:px-16" id="treatments">
      <div className="mx-auto max-w-[1200px] md:pr-[32%]">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-blue-light)' }}>
            Treatments
          </p>
          <h2 className="font-display text-4xl text-mist md:text-5xl">
            Interventional care, matched to your diagnosis.
          </h2>
        </div>

        <div>
          {treatments.map((t, i) => (
            <Row key={t.name} t={t} index={i} openIndex={openIndex} setOpenIndex={setOpenIndex} />
          ))}
        </div>
      </div>
    </section>
  )
}
