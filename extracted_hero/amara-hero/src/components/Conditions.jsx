import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity, Bone, Zap, PersonStanding, Footprints,
  ShieldAlert, Waves, Dumbbell, HeartPulse, Stethoscope, Plus,
} from 'lucide-react'

const conditions = [
  { name: 'Back Pain', icon: Activity, desc: 'Chronic and acute lumbar & upper back conditions.' },
  { name: 'Neck Pain', icon: PersonStanding, desc: 'Cervical strain, disc, and nerve-related pain.' },
  { name: 'Sciatica', icon: Zap, desc: 'Nerve compression radiating through the leg.' },
  { name: 'Joint Pain', icon: Bone, desc: 'Degenerative and inflammatory joint conditions.' },
  { name: 'Knee Pain', icon: Footprints, desc: 'Mechanical and arthritic knee dysfunction.' },
  { name: 'Shoulder Pain', icon: Dumbbell, desc: 'Rotator cuff, impingement, and overuse injury.' },
  { name: 'Neuropathic Pain', icon: Waves, desc: 'Nerve-driven pain from diabetes or injury.' },
  { name: 'Sports Injuries', icon: HeartPulse, desc: 'Acute injury care and return-to-play plans.' },
  { name: 'Arthritis', icon: ShieldAlert, desc: 'Osteo- and rheumatoid arthritis management.' },
  { name: 'Post-Surgical Pain', icon: Stethoscope, desc: 'Recovery support after spine or joint surgery.' },
]

function ConditionCard({ c, index }) {
  const [open, setOpen] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const Icon = c.icon

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -10, y: px * 10 })
  }

  return (
    <motion.button
      onClick={() => setOpen((v) => !v)}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 45, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.65, delay: (index % 5) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        background: 'linear-gradient(155deg, rgba(245,247,250,0.09), rgba(245,247,250,0.03))',
        borderColor: 'rgba(245,247,250,0.12)',
      }}
      className="group relative flex flex-col items-start overflow-hidden rounded-2xl border p-6 text-left backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(27,170,156,0.18)]"
    >
      <motion.div
        className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(120px 120px at var(--mx,50%) var(--my,0%), rgba(79,164,224,0.18), transparent 70%)',
          transition: 'opacity 0.3s',
        }}
      />
      <motion.div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-teal))' }}
        whileHover={{ rotate: 12, scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
      >
        <Icon size={20} color="white" strokeWidth={2} />
      </motion.div>
      <h3 className="font-display text-lg text-mist">{c.name}</h3>

      <motion.p
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden text-sm leading-relaxed text-mist/60"
      >
        <span className="block pt-2">{c.desc}</span>
      </motion.p>

      <span
        className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide"
        style={{ color: 'var(--color-teal)' }}
      >
        <Plus size={13} className={`transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
        {open ? 'Close' : 'Learn more'}
      </span>
    </motion.button>
  )
}

export default function Conditions() {
  return (
    <section className="relative px-6 py-32 md:px-16" id="conditions">
      <div className="mx-auto max-w-[1400px] md:pr-[30%]">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-blue-light)' }}>
            Conditions We Treat
          </p>
          <h2 className="font-display text-4xl text-mist md:text-5xl">
            Whatever the source of your pain, we've likely already treated it.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {conditions.map((c, i) => (
            <ConditionCard key={c.name} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
