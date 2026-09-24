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
    <div ref={containerRef} className="w-full relative py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-left overflow-hidden bg-[#3A3838] text-[#F0F0F0]">
      
      {/* Abstract Background */}
      <motion.div 
        style={{ y, opacity: 0.12 }}
        className="absolute left-0 top-0 w-full h-[120%] pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A3838] via-transparent to-[#3A3838] z-10" />
        <img src="/images/conditions_bg.png" alt="Healing Background" className="w-full h-full object-cover object-top opacity-20" />
      </motion.div>

      {/* 1. PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#585454] pb-6 relative z-10 animate-reveal">
        <div className="space-y-4 max-w-2xl">
          <Badge variant="accent" className="bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 font-bold uppercase tracking-widest">
            Patient Education
          </Badge>
          <h1 className="text-[34px] sm:text-[42px] md:text-[54px] font-extrabold font-heading tracking-tight text-[#FFFFFF] leading-[1.1]">
            Pain Conditions We Treat
          </h1>
          <p className="text-[17px] sm:text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
            Understanding your pain is the first step toward recovery. Explore our comprehensive, physician-reviewed guides on symptoms, causes, and non-surgical relief options.
          </p>
        </div>

        {/* Dynamic Search Bar */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#D1D5DB]" />
          <input
            type="text"
            placeholder="Search symptoms or pain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#302E2E] border border-[#585454] rounded-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 text-sm text-[#FFFFFF] placeholder-[#D1D5DB] shadow-sm transition-all duration-200"
          />
        </div>
      </div>

      {/* 2. CLINICAL ASSESSMENT SPOTLIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#363434] rounded-3xl p-6 md:p-8 border border-[#585454] shadow-xl relative z-10 animate-reveal my-8">
        <div className="lg:col-span-7 space-y-4">
          <Badge variant="secondary" className="bg-[#302E2E] text-emerald-300 border border-[#585454] font-bold uppercase tracking-wider text-[11px]">
            Comprehensive Diagnostic Approach
          </Badge>
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold font-heading text-[#FFFFFF] leading-tight">
            Accurate Diagnosis Precedes Every Treatment Plan
          </h2>
          <p className="text-base text-[#F0F0F0] leading-relaxed">
            Chronic back, neck, and joint pain can arise from multiple overlapping pain generators. Our specialists take time to evaluate your posture, joint range, and spinal alignment using advanced imaging and physical evaluation before recommending therapy.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Anatomical Precision</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Senior Mobility Focused</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Non-Surgical Priority</span>
          </div>
        </div>
        <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#585454] shadow-md bg-[#302E2E]">
          <img 
            src="/images/audience/senior_spine_check.jpg" 
            alt="Senior African American patient reviewing spinal anatomy with physician during consultation"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>

      {/* 3. CONDITIONS CARDS GRID WITH DEDICATED IMAGES */}
      <div className="relative z-10 my-8">
        {filteredConditions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredConditions.map((cond) => (
              <div 
                key={cond.id} 
                className="flex flex-col justify-between h-full group bg-[#454242] rounded-2xl border border-[#585454] shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-reveal"
              >
                {/* Condition Dedicated Image Container */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#323030] border-b border-[#585454]">
                  <img
                    src={cond.image}
                    alt={cond.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-[#302E2E]/90 backdrop-blur-md text-emerald-300 border border-[#585454] font-bold uppercase tracking-wide text-[10px] shadow-sm">
                      Evidence-Based Care
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-950/70 text-emerald-300 rounded-xl flex items-center justify-center border border-emerald-500/30 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-inner shrink-0">
                        <Activity className="h-5 w-5" />
                      </div>
                      <h3 className="text-[18px] sm:text-[20px] font-bold font-heading text-[#FFFFFF] group-hover:text-emerald-300 transition-colors leading-snug">
                        {cond.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[#F0F0F0] leading-relaxed line-clamp-3">
                      {cond.shortDesc}
                    </p>
                  </div>

                  {/* Action and link */}
                  <div className="pt-4 border-t border-[#585454] flex items-center justify-between">
                    <span className="text-xs text-[#D1D5DB] flex items-center gap-1 font-bold">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      Clinically Proven
                    </span>
                    <Link 
                      to={`/conditions/${cond.id}`}
                      className="inline-flex items-center text-sm font-bold text-emerald-300 hover:text-emerald-200 gap-1.5 transition-colors"
                    >
                      <span>Explore Guide</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#454242] rounded-2xl border border-[#585454] space-y-4 shadow-sm p-6">
            <p className="text-[#D1D5DB] text-base">No conditions found matching your search term.</p>
            <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* 5. CALL TO ACTION SECTION */}
      <div className="bg-[#363434] border border-[#585454] text-center space-y-6 py-10 my-8 relative overflow-hidden z-10 shadow-xl p-6 sm:p-8 animate-reveal rounded-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-[22px] sm:text-[28px] md:text-[34px] font-extrabold font-heading leading-[1.2] text-[#FFFFFF]">
            Ready to Find Long-Lasting Pain Relief?
          </h2>
          <p className="text-sm sm:text-base text-[#F0F0F0] leading-relaxed">
            You do not have to live with chronic, debilitating pain. Book a comprehensive, same-week consultation with our double-certified specialist today.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link to="/book">
            <Button variant="primary" icon={Calendar} className="font-bold">
              Book Appointment
            </Button>
          </Link>
          <a href="tel:+17045039338">
            <Button variant="outline" icon={Phone}>
              Call +1 704-503-9338
            </Button>
          </a>
        </div>
      </div>

    </div>
  );
}
