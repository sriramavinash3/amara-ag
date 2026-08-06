import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Search, ArrowRight, ShieldCheck, Calendar, Info, Phone } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import useScrollReveal from '../hooks/useScrollReveal';
import { conditions } from '../utils/medicalData';
import '../styles/skeuomorphic.css';

export default function Conditions() {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  const [searchQuery, setSearchQuery] = useState('');
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const filteredConditions = Object.values(conditions).filter(cond => 
    cond.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cond.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cond.symptoms.some(sym => sym.toLowerCase().includes(searchQuery.toLowerCase())) ||
    cond.causes.some(cau => cau.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div ref={containerRef} className="w-full relative py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-16 text-left overflow-hidden">
      
      {/* Abstract Background */}
      <motion.div 
        style={{ y, opacity: 0.4 }}
        className="absolute left-0 top-0 w-full h-[120%] pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-10" />
        <img src="/images/conditions_bg.png" alt="Healing Background" className="w-full h-full object-cover object-top mix-blend-multiply opacity-30" />
      </motion.div>

      {/* 1. PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-10 relative z-10 animate-reveal">
        <div className="space-y-6 max-w-2xl">
          <Badge variant="accent" className="bg-emerald-50 text-emerald-850 border border-emerald-200 font-bold uppercase tracking-widest">
            Patient Education
          </Badge>
          <h1 className="text-4xl md:text-[56px] font-extrabold font-heading tracking-tight text-stone-900 leading-[1.1]">
            Pain Conditions We Treat
          </h1>
          <p className="text-[18px] text-stone-600 font-normal leading-[1.75] max-w-[720px]">
            Understanding your pain is the first step toward recovery. Explore our comprehensive, physician-reviewed guides on symptoms, causes, and non-surgical relief options.
          </p>
        </div>

        {/* Dynamic Search Bar */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search symptoms or pain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-stone-300 rounded-full focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm shadow-sm transition-all duration-200"
          />
        </div>
      </div>

      {/* 2. WARNING CALLOUT */}
      <Card variant="slate" padding="sm" className="bg-amber-50/60 border-amber-200 flex gap-3.5 items-start relative z-10 p-6 animate-reveal">
        <Info className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-850 leading-relaxed">
          <strong>Important Note:</strong> The conditions listed below represent broad clinical categories we treat. Pain can manifest in highly complex, overlapping ways. A physical evaluation and review of recent diagnostics (such as MRIs or X-rays) by our double-certified specialist is necessary to formulate an accurate, targeted treatment plan.
        </p>
      </Card>

      {/* 3. CONDITIONS CARDS GRID */}
      <div className="relative z-10">
        {filteredConditions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredConditions.map((cond) => (
              <Card 
                key={cond.id} 
                hoverable 
                variant="white" 
                className="flex flex-col justify-between h-full group border-stone-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-300 p-6 console-card-3d animate-reveal"
              >
                <div className="space-y-4">
                  {/* Header Icon */}
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-12 h-12 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                    <Activity className="h-6 w-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-heading text-stone-900 group-hover:text-emerald-705 transition-colors">
                      {cond.title}
                    </h3>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-800 font-bold uppercase tracking-wide text-[10px]">
                      Evidence-Based Care
                    </Badge>
                  </div>

                  <p className="text-sm text-stone-605 leading-relaxed line-clamp-3">
                    {cond.shortDesc}
                  </p>
                </div>

                {/* Action and link */}
                <div className="pt-6 mt-6 border-t border-stone-150 flex items-center justify-between">
                  <span className="text-xs text-stone-400 flex items-center gap-1 font-bold">
                    <ShieldCheck className="h-4 w-4 text-emerald-650" />
                    Clinically Proven
                  </span>
                  <Link 
                    to={`/conditions/${cond.id}`}
                    className="inline-flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-750 gap-1.5"
                  >
                    <span>Explore Guide</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 space-y-4 shadow-sm">
            <p className="text-stone-500 text-base">No conditions found matching your search term.</p>
            <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* 4. CALL TO ACTION SECTION */}
      <Card variant="slate" padding="lg" className="bg-gradient-to-br from-emerald-800 to-emerald-950 border-none text-white text-center space-y-6 pt-12 pb-12 mt-12 relative overflow-hidden z-10 shadow-premium p-8 animate-reveal rounded-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-[36px] font-extrabold font-heading leading-[1.2] text-white">
            Ready to Find Long-Lasting Pain Relief?
          </h2>
          <p className="text-sm md:text-base text-emerald-50 leading-relaxed">
            You do not have to live with chronic, debilitating pain. Book a comprehensive, same-week consultation with our double-certified specialist today.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link to="/book">
            <Button variant="primary" icon={Calendar} className="bg-white text-emerald-900 hover:bg-emerald-50 hover:text-emerald-950 font-bold shadow-md hover:shadow-lg">
              Book Appointment
            </Button>
          </Link>
          <a href="tel:7045039338">
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10" icon={Phone}>
              Call 704-503-9338
            </Button>
          </a>
        </div>
      </Card>

    </div>
  );
}
