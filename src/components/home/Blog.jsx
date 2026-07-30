import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../../utils/medicalData';

export default function Blog() {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(blogPosts.map(p => p.category))];
  const filtered = filter === 'All' ? blogPosts : blogPosts.filter((p) => p.category === filter);
  
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section className="bg-mist px-6 py-28 md:px-16" id="blog">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 text-left">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-blue)' }}>
              Patient Education
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-dark leading-tight">
              Understand your care, in plain language.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer border-slate-300"
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
          <Link 
            to={`/blog/${featured.id}`}
            className="mb-8 block rounded-2xl p-9 text-white text-left hover:brightness-110 transition-all shadow-md"
            style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-ink-2))' }}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-white/60">{featured.category} · Featured</span>
            <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold">{featured.title}</h3>
            <p className="mt-2 max-w-lg text-sm text-white/70 font-light leading-relaxed">{featured.excerpt}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
              Read article <ArrowRight size={15} />
            </span>
          </Link>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {rest.map((p, i) => (
            <Link
              to={`/blog/${p.id}`}
              key={p.id}
              className="block h-full"
            >
              <motion.div
                initial={{ 
                  opacity: 0, 
                  x: i % 3 === 0 ? -80 : i % 3 === 2 ? 80 : 0, 
                  y: i % 3 === 1 ? 60 : 30,
                  rotate: i % 3 === 0 ? -3 : i % 3 === 2 ? 3 : 0,
                  scale: 0.9 
                }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 85, 
                  damping: 11, 
                  delay: i * 0.1 
                }}
                className="rounded-xl border bg-white/70 p-6 flex flex-col justify-between hover:shadow-[0_18px_40px_rgba(10,93,155,0.12)] hover:-translate-y-1 transition-all duration-300 h-full"
                style={{ borderColor: 'rgba(10,93,155,0.1)' }}
              >
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest font-semibold" style={{ color: 'var(--color-blue)' }}>{p.category}</span>
                  <h3 className="mt-2 font-display text-lg font-bold text-text-dark">{p.title}</h3>
                  <p className="mt-2 text-sm text-text-dark/70 font-light leading-relaxed">{p.excerpt}</p>
                </div>
                <span className="mt-4 flex items-center gap-1 text-xs text-text-dark/40 font-mono">
                  <Clock size={12} /> {p.readTime || '5 min'} read
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
