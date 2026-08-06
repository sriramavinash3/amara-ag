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
    <section className="bg-stone-50 px-6 py-20 md:px-16" id="blog">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 text-left">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-800 font-bold">
              Patient Education
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
              Understand Your Care, in Plain English
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="rounded-full border px-4 py-1.5 text-xs font-bold transition-all cursor-pointer"
                style={{
                  borderColor: filter === c ? '#059669' : '#e7e5e4',
                  background: filter === c ? '#059669' : '#ffffff',
                  color: filter === c ? '#ffffff' : '#4b5563',
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
            className="mb-8 block rounded-2xl p-9 text-white text-left hover:brightness-105 transition-all shadow-md bg-gradient-to-br from-emerald-800 to-emerald-950"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-200 font-bold">{featured.category} · Featured</span>
            <h3 className="mt-3 font-heading text-2xl md:text-3xl font-extrabold">{featured.title}</h3>
            <p className="mt-2 max-w-lg text-sm text-emerald-50 leading-relaxed font-normal">{featured.excerpt}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold">
              Read Article <ArrowRight size={15} />
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
                className="rounded-2xl border border-stone-200 bg-white p-6 flex flex-col justify-between hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 h-full shadow-premium"
              >
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest font-extrabold text-emerald-800">{p.category}</span>
                  <h3 className="mt-2 font-heading text-lg font-bold text-stone-900">{p.title}</h3>
                  <p className="mt-2 text-sm text-stone-600 font-normal leading-relaxed">{p.excerpt}</p>
                </div>
                <span className="mt-4 flex items-center gap-1 text-xs text-stone-400 font-bold font-mono">
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
