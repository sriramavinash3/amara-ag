import { motion } from 'framer-motion'

const insurers = [
  'Blue Cross Blue Shield', 'Medicare', 'Medicaid', 'Aetna', 'Cigna',
  'UnitedHealthcare', 'Humana', 'Tricare', 'Ambetter', 'WellCare',
]

export default function InsuranceMarquee() {
  const row = [...insurers, ...insurers]

  return (
    <section className="relative overflow-hidden border-y bg-ink-2 py-10" style={{ borderColor: 'rgba(245,247,250,0.08)' }}>
      <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.28em] text-mist/40">
        In-network with most major insurers
      </p>

      <div className="group relative flex overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-2 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-2 to-transparent" />

        <motion.div
          className="flex shrink-0 items-center gap-14 pr-14 group-hover:[animation-play-state:paused]"
          style={{ animation: 'marquee 32s linear infinite' }}
        >
          {row.map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-lg text-mist/35 grayscale transition-all duration-300 hover:text-mist hover:grayscale-0"
            >
              {name}
            </span>
          ))}
        </motion.div>
        <motion.div
          className="flex shrink-0 items-center gap-14 pr-14 group-hover:[animation-play-state:paused]"
          style={{ animation: 'marquee 32s linear infinite' }}
          aria-hidden="true"
        >
          {row.map((name, i) => (
            <span
              key={`b${i}`}
              className="whitespace-nowrap font-display text-lg text-mist/35 grayscale transition-all duration-300 hover:text-mist hover:grayscale-0"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  )
}
