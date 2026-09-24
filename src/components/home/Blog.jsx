import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../../utils/medicalData';
import Button from '../ui/Button';

export default function Blog() {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(blogPosts.map(p => p.category))];
  const filtered = filter === 'All' ? blogPosts : blogPosts.filter((p) => p.category === filter);
  
  const featured = filtered[0];
  const rest = filtered.slice(1, 4);

  return (
    <section className="bg-[#363434] py-12 md:py-16 m-0 border-t border-[#585454]" id="blog">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 text-left">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-400 font-bold">
              Patient Education
            </p>
            <h2 className="font-heading text-[32px] sm:text-[38px] md:text-[44px] font-bold text-[#FFFFFF] leading-tight">
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
                  borderColor: filter === c ? '#10B981' : '#585454',
                  background: filter === c ? '#059669' : '#454242',
                  color: '#FFFFFF',
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
            className="mb-8 block rounded-3xl overflow-hidden text-[#FFFFFF] text-left hover:brightness-105 transition-all shadow-xl bg-[#454242] grid md:grid-cols-12 border border-[#585454] hover:border-emerald-500/50"
          >
            <div className="p-6 sm:p-8 md:p-10 md:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-bold">{featured.category} · Featured</span>
                <h3 className="mt-3 font-heading text-[22px] md:text-[28px] font-extrabold text-[#FFFFFF]">{featured.title}</h3>
                <p className="mt-2 max-w-lg text-sm text-[#F0F0F0] leading-relaxed font-normal">{featured.excerpt}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-300">
                Read Article <ArrowRight size={15} />
              </span>
            </div>
            {featured.image && (
              <div className="md:col-span-5 relative aspect-[16/10] md:aspect-auto min-h-[220px]">
                <img 
                  src={featured.image} 
                  alt={featured.title} 
                  className="w-full h-full object-cover object-center" 
                  loading="lazy" 
                />
              </div>
            )}
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
                  x: i % 3 === 0 ? -60 : i % 3 === 2 ? 60 : 0, 
                  y: 30,
                  scale: 0.92 
                }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 85, 
                  damping: 11, 
                  delay: i * 0.1 
                }}
                className="rounded-2xl border border-[#585454] bg-[#454242] p-6 flex flex-col justify-between hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 h-full shadow-lg overflow-hidden group"
              >
                <div>
                  {p.image && (
                    <div className="relative aspect-[16/9] -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl bg-[#323030] border-b border-[#585454]">
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy" 
                      />
                    </div>
                  )}
                  <span className="text-[11px] font-mono uppercase tracking-widest font-extrabold text-emerald-300">{p.category}</span>
                  <h3 className="mt-2 font-heading text-[16px] font-bold text-[#FFFFFF] group-hover:text-emerald-300 transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-[#F0F0F0] font-normal leading-relaxed line-clamp-3">{p.excerpt}</p>
                </div>
                <span className="mt-4 flex items-center gap-1 text-xs text-[#D1D5DB] font-bold font-mono">
                  <Clock size={12} /> {p.readTime || '5 min'} read
                </span>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center border-t border-[#585454] pt-8">
          <Link to="/blog" aria-label="See more blog posts">
            <Button variant="outline-stone" size="md" icon={ArrowRight} iconPosition="right">
              See More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
