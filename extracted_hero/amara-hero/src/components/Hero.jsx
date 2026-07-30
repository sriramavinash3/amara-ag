import { motion } from 'framer-motion'
import { PhoneCall, CalendarCheck2, ArrowUpRight } from 'lucide-react'
import PulseLine from './PulseLine'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const stats = [
  { value: '18,000+', label: 'Patients treated' },
  { value: '14 yrs', label: 'In practice, Charlotte' },
  { value: '92%', label: 'Report lasting relief' },
]

export default function Hero() {
  return (
    <section className="relative h-screen w-full" aria-label="Amara Pain & Spine — hero">
      {/* Local ambient glow layered above the shared 3D stage */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 72% 40%, rgba(27,170,156,0.16) 0%, rgba(10,93,155,0.12) 35%, rgba(6,13,23,0) 70%)',
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 md:px-16">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.p
            variants={item}
            className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em]"
            style={{ color: 'var(--color-teal)' }}
          >
            Charlotte Pain &amp; Spine Specialists
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-[13vw] leading-[0.98] sm:text-[6.4vw] md:text-[4.6vw]"
            style={{ color: 'var(--color-mist)' }}
          >
            Advanced pain relief.{' '}
            <span className="italic" style={{ color: 'var(--color-blue-light)' }}>
              Personalized care.
            </span>{' '}
            Better living.
          </motion.h1>

          <motion.div variants={item} className="my-7 max-w-md">
            <PulseLine className="h-10 w-full" />
          </motion.div>

          <motion.p
            variants={item}
            className="max-w-md text-[15px] leading-relaxed text-mist/70 md:text-base"
          >
            Charlotte's leading specialists delivering advanced, evidence-based pain
            management — built around your body, your diagnosis, and your life outside
            of the clinic.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <button
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: 'var(--color-coral)', color: '#0b0b0b' }}
            >
              <CalendarCheck2 size={17} strokeWidth={2.2} />
              Book Appointment
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold text-mist transition-colors duration-300 hover:bg-white/5"
              style={{ borderColor: 'rgba(245,247,250,0.25)' }}
            >
              <PhoneCall size={16} strokeWidth={2.2} />
              Call Now
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 flex max-w-xl gap-10 border-t pt-6"
          style={{ borderColor: 'rgba(245,247,250,0.12)' }}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={item}>
              <div className="font-display text-2xl md:text-3xl" style={{ color: 'var(--color-mist)' }}>
                {s.value}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wide text-mist/50">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[11px] uppercase tracking-[0.25em] text-mist/40"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll
      </motion.div>
    </section>
  )
}
