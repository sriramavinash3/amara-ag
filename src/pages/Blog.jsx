import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, User, ArrowRight, Activity } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { blogPosts } from '../utils/medicalData';
import '../styles/skeuomorphic.css';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Patient Education', 'Billing & Insurance', 'Tips & Wellness'];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="w-full relative py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-16 text-left">

      {/* 1. PAGE HEADER */}
      <div className="space-y-6 max-w-3xl border-b border-slate-200 pb-10 relative z-10">
        <Badge variant="secondary" className="bg-cyan-50 text-cyan-805 border border-cyan-200 font-bold uppercase tracking-widest">
          Clinical Insights
        </Badge>
        <h1 className="text-4xl md:text-[56px] font-extrabold font-heading tracking-tight text-slate-900 leading-[1.1]">
          Patient Education Blog
        </h1>
        <p className="text-[18px] text-slate-600 font-normal leading-[1.75] max-w-[720px]">
          Stay informed with evidence-based articles, lifestyle tips, and clinical updates on chronic pain management and spine health.
        </p>
      </div>

      {/* 2. CATEGORY FILTERS */}
      <div className="flex flex-wrap gap-2 pt-2 relative z-10">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-medical-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-855 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. BLOG POSTS GRID */}
      <div className="relative z-10">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card 
                key={post.id} 
                hoverable 
                variant="white" 
                className="flex flex-col justify-between h-full group border-slate-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-300 p-6 console-card-3d animate-reveal-3d"
              >
                <div className="space-y-4">
                  {/* Meta Row */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-medical-500" />
                      {post.date}
                    </span>
                    <Badge variant="accent" className="bg-cyan-50 text-cyan-800 border border-cyan-100">{post.category}</Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-heading text-slate-900 group-hover:text-medical-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      By {post.author}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read Full Button */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <BookOpen className="h-4 w-4 text-emerald-600" />
                    5 min read
                  </span>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-sm font-bold text-medical-600 hover:text-medical-700 gap-1.5"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white border border-slate-200/80 rounded-2xl">
            <p className="text-slate-500">No articles published in this category yet.</p>
          </div>
        )}
      </div>

      {/* 4. CLINICAL CARE HIGHLIGHT */}
      <Card variant="slate" padding="lg" className="border-slate-200/80 bg-slate-100/50 flex gap-4 items-start max-w-4xl relative z-10 shadow-sm p-8">
        <Activity className="h-6 w-6 text-medical-600 shrink-0 mt-1" />
        <div className="space-y-3 text-left">
          <h4 className="font-bold text-base text-slate-900">Do you have a topic suggestion?</h4>
          <p className="text-sm text-slate-650 leading-relaxed">
            Our medical writing team regularly publishes clinical breakdowns based on common questions from our patient community in Charlotte. If you would like us to explain a specific condition, treatment, or clinical study, feel free to drop your suggestion via our Contact Us form.
          </p>
        </div>
      </Card>

    </div>
  );
}
