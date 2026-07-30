import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const stories = [
  { name: 'Karen M.', condition: 'Chronic back pain', quote: 'After years of pain, I got my mornings back within a month of starting treatment here.' },
  { name: 'Robert T.', condition: 'Sciatica', quote: 'The team explained every option clearly and let me choose what felt right for my life.' },
  { name: 'Denise L.', condition: 'Post-surgical recovery', quote: 'I was walking without a limp again for the first time in two years.' },
]

const reviews = [
  { name: 'Angela P.', rating: 5, text: 'Professional staff, short wait times, and Dr. Amara actually listens.' },
  { name: 'Marcus H.', rating: 5, text: 'Best pain management experience I have had in Charlotte, by far.' },
  { name: 'Priya S.', rating: 5, text: 'The nerve block changed my quality of life within days.' },
  { name: 'Tom W.', rating: 4, text: 'Great care, though scheduling took a little longer than expected.' },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [reviewIndex, setReviewIndex] = useState(0)

  return (
    <section className="bg-mist px-6 py-28 md:px-16" id="testimonials">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-blue)' }}>
            Patient Success Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--color-text-dark)' }}>
            Real patients, real relief.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((s, i) => (
            <motion.button
              key={s.name}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl text-left"
              style={{ background: 'linear-gradient(155deg, var(--color-blue), var(--color-ink-2))' }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: 'radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.08), transparent 70%)' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <Play size={20} color="white" fill="white" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <p className="font-display text-lg text-white">{s.name}</p>
                <p className="text-xs text-white/70">{s.condition}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.blockquote
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="mx-auto mt-10 max-w-2xl text-center font-display text-2xl italic"
            style={{ color: 'var(--color-text-dark)' }}
          >
            <Quote size={22} className="mx-auto mb-3 opacity-30" />
            "{stories[active].quote}"
          </motion.blockquote>
        </AnimatePresence>

        {/* Written reviews carousel */}
        <div className="mt-20 flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-blue)' }}>
            Google Reviews · 4.9 average
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border"
              style={{ borderColor: 'rgba(10,93,155,0.25)' }}
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setReviewIndex((i) => (i + 1) % reviews.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border"
              style={{ borderColor: 'rgba(10,93,155,0.25)' }}
              aria-label="Next review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden">
          <motion.div
            className="flex gap-5"
            animate={{ x: `-${reviewIndex * (100 / reviews.length)}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: `${reviews.length * 100}%` }}
          >
            {reviews.map((r) => (
              <div
                key={r.name}
                className="rounded-xl border bg-white/60 p-5 backdrop-blur"
                style={{ width: `${100 / reviews.length}%`, borderColor: 'rgba(10,93,155,0.1)' }}
              >
                <div className="mb-2 flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={13} fill="var(--color-coral)" color="var(--color-coral)" />
                  ))}
                </div>
                <p className="text-sm" style={{ color: 'rgba(27,27,27,0.75)' }}>{r.text}</p>
                <p className="mt-3 text-xs font-semibold" style={{ color: 'var(--color-text-dark)' }}>{r.name}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
