import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, User, ArrowRight, Activity } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import useScrollReveal from '../hooks/useScrollReveal';
import { blogPosts } from '../utils/medicalData';
import '../styles/skeuomorphic.css';

export default function Blog() {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Patient Education', 'Billing & Insurance', 'Tips & Wellness'];

  const posts = blogPosts || [];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post && post.category === selectedCategory);

  return (
    <div ref={containerRef} className="w-full relative py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-left">

      {/* 1. PAGE HEADER */}
      <div className="space-y-6 max-w-3xl border-b border-[#585454] pb-6 relative z-10">
        <Badge variant="accent" className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-bold uppercase tracking-widest">
          Clinical Insights
        </Badge>
        <h1 className="text-[34px] md:text-[54px] font-extrabold font-heading tracking-tight text-[#FFFFFF] leading-[1.1]">
          Patient Education Blog
        </h1>
        <p className="text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
          Stay informed with evidence-based articles, lifestyle tips, and clinical updates on chronic pain management and spine health.
        </p>
      </div>

      {/* 2. CATEGORY FILTERS */}
      <nav aria-label="Blog category filters" className="flex flex-wrap gap-2 my-8 relative z-10">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            aria-pressed={selectedCategory === cat}
            className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-[#363434] border border-[#585454] text-[#F0F0F0] hover:bg-[#454242] hover:text-[#FFFFFF]'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* 3. BLOG POSTS GRID */}
      <div className="relative z-10 my-8">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card 
                key={post.id} 
                hoverable 
                variant="white" 
                className="flex flex-col justify-between h-full group border-[#585454] bg-[#454242] shadow-2xl hover:border-emerald-500/50 transition-all duration-300 p-6 console-card-3d animate-reveal-3d"
              >
                <div className="space-y-4">
                  {post.image && (
                    <div className="relative aspect-[16/9] -mx-6 -mt-6 mb-2 overflow-hidden rounded-t-2xl bg-[#323030] border-b border-[#585454]">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Meta Row */}
                  <div className="flex items-center justify-between text-xs text-[#D1D5DB] font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                      {post.date}
                    </span>
                    <Badge variant="accent" className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">{post.category}</Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-[18px] font-bold font-heading text-[#FFFFFF] group-hover:text-emerald-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <span className="text-xs text-[#D1D5DB] font-bold flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-[#D1D5DB]" />
                      By {post.author}
                    </span>
                  </div>

                  <p className="text-sm text-[#F0F0F0] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read Full Button */}
                <div className="pt-6 mt-6 border-t border-[#585454] flex items-center justify-between">
                  <span className="text-xs text-[#D1D5DB] flex items-center gap-1 font-medium">
                    <BookOpen className="h-4 w-4 text-emerald-400" />
                    5 min read
                  </span>
                  <Link 
                    to={`/blog/${post.id}`}
                    aria-label={`Read article: ${post.title}`}
                    className="inline-flex items-center text-sm font-bold text-emerald-400 hover:text-emerald-300 gap-1.5"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#363434] border border-[#585454] rounded-2xl">
            <p className="text-[#D1D5DB]">No articles published in this category yet.</p>
          </div>
        )}
      </div>

      {/* 4. CLINICAL CARE HIGHLIGHT */}
      <Card variant="slate" padding="lg" className="border-[#585454] bg-[#363434] flex gap-4 items-start w-full relative z-10 shadow-2xl p-8 rounded-3xl my-8">
        <Activity className="h-6 w-6 text-emerald-400 shrink-0 mt-1" />
        <div className="space-y-3 text-left">
          <h4 className="font-bold text-[14px] text-[#FFFFFF]">Do you have a topic suggestion?</h4>
          <p className="text-sm text-[#F0F0F0] leading-relaxed">
            Our medical writing team regularly publishes clinical breakdowns based on common questions from our patient community in Charlotte. If you would like us to explain a specific condition, treatment, or clinical study, feel free to drop your suggestion via our Contact Us form.
          </p>
        </div>
      </Card>

    </div>
  );
}
