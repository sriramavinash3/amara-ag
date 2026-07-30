import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'

const categories = ['All', 'Back Pain', 'Recovery', 'Treatments', 'Insurance']

const posts = [
  { title: 'When Back Pain Needs More Than Rest', category: 'Back Pain', readTime: '6 min', excerpt: 'How to tell the difference between a strain that heals on its own and one that needs a specialist.' },
  { title: 'What to Expect After an Epidural Injection', category: 'Treatments', readTime: '4 min', excerpt: 'A step-by-step look at recovery timelines and what "normal" soreness looks like.' },
  { title: 'Understanding Your Insurance Before Your First Visit', category: 'Insurance', readTime: '5 min', excerpt: 'The questions to ask your provider so there are no surprises at checkout.' },
  { title: 'Sciatica: Causes, Red Flags, and Relief', category: 'Back Pain', readTime: '7 min', excerpt: 'Why sciatica shows up, when it resolves on its own, and when to see someone.' },
  { title: 'Building a Return-to-Activity Plan After Surgery', category: 'Recovery', readTime: '5 min', excerpt: "A realistic timeline for getting back to the activities you're missing." },
]

export default function Blog() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? posts : posts.filter((p) => p.category === filter)
  const [featured, ...rest] = filtered

  return (
    <section className="bg-mist px-6 py-28 md:px-16" id="blog">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-blue)' }}>
              Patient Education
            </p>
            <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--color-text-dark)' }}>
              Understand your care, in plain language.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="rounded-full border px-4 py-1.5 text-xs font-medium transition-colors"
                style={{
                  borderColor: filter === c ? 'var(--color-blue)' : 'rgba(10,93,155,0.15)',
                  background: filter === c ? 'var(--color-blue)' : 'transparent',
                  color: filter === c ? 'white' : 'var(--color-text-dark)',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {featured && (
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 block rounded-2xl p-9 text-white"
            style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-ink-2))' }}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-white/60">{featured.category} · Featured</span>
            <h3 className="mt-3 font-display text-2xl md:text-3xl">{featured.title}</h3>
            <p className="mt-2 max-w-lg text-sm text-white/70">{featured.excerpt}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold">
              Read article <ArrowRight size={15} />
            </span>
          </motion.a>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <motion.a
              href="#"
              key={p.title}
              initial={{ opacity: 0, y: 45, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: '0 18px 40px rgba(10,93,155,0.12)' }}
              className="rounded-xl border bg-white/70 p-6"
              style={{ borderColor: 'rgba(10,93,155,0.1)' }}
            >
              <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: 'var(--color-blue)' }}>{p.category}</span>
              <h3 className="mt-2 font-display text-lg" style={{ color: 'var(--color-text-dark)' }}>{p.title}</h3>
              <p className="mt-2 text-sm" style={{ color: 'rgba(27,27,27,0.6)' }}>{p.excerpt}</p>
              <span className="mt-4 flex items-center gap-1 text-xs text-mist-fallback" style={{ color: 'rgba(27,27,27,0.4)' }}>
                <Clock size={12} /> {p.readTime} read
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
