import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Search, ArrowRight, Shield, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import useScrollReveal from '../hooks/useScrollReveal';
import { treatments } from '../utils/medicalData';
import '../styles/skeuomorphic.css';

export default function Treatments() {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredTreatments = Object.values(treatments).filter(treat => 
    treat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    treat.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
    treat.benefits.some(ben => ben.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div ref={containerRef} className="w-full relative py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-left">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#585454] pb-6 relative z-10 animate-reveal">
        <div className="space-y-4 max-w-2xl">
          <Badge variant="secondary" className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-widest">
            Clinic Procedures
          </Badge>
          <h1 className="text-[34px] md:text-[54px] font-extrabold font-heading tracking-tight text-white leading-[1.1]">
            Interventional Pain Treatments
          </h1>
          <p className="text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
            Discover our advanced, FDA-approved outpatient therapies. We focus on non-surgical joint-preservation, muscle spasm release, and nerve-calming procedures.
          </p>
        </div>

        {/* Search Filter */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#D1D5DB]" />
          <input
            type="text"
            placeholder="Search treatments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#454242] border border-[#585454] rounded-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 text-sm text-white placeholder-[#D1D5DB] shadow-sm transition-all duration-200"
          />
        </div>
      </div>

      {/* 2. REHABILITATION & RESTORATIVE CARE SPOTLIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#363434] rounded-3xl p-6 md:p-8 border border-[#585454] shadow-xl relative z-10 animate-reveal my-8">
        <div className="lg:col-span-7 space-y-4">
          <Badge variant="secondary" className="bg-[#323030] text-emerald-400 border border-[#585454] font-bold uppercase tracking-wider text-[11px]">
            Restorative Mobility
          </Badge>
          <h2 className="text-[24px] md:text-[32px] font-bold font-heading text-white leading-tight">
            Targeted Relief to Support Active Rehabilitation
          </h2>
          <p className="text-base text-[#F0F0F0] leading-relaxed">
            Our outpatient interventional therapies are designed to relieve acute and chronic pain barriers, empowering older adults to return to rehabilitation, daily walks, and active family life without lengthy hospital downtime.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-emerald-400" /> Outpatient Procedures</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-emerald-400" /> Rapid 1-3 Day Recovery</span>
            <span className="flex items-center gap-1.5"><Activity className="h-4 w-4 text-emerald-400" /> Restores Joint Flexibility</span>
          </div>
        </div>
        <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#585454] shadow-md bg-[#323030]">
          <img 
            src="/images/audience/senior_rehabilitation.jpg" 
            alt="Senior patient engaging in guided physical therapy and mobility rehabilitation"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>

      {/* 3. TREATMENTS GRID */}
      <div className="relative z-10 my-8">
        {filteredTreatments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTreatments.map((treat) => (
              <div 
                key={treat.id} 
                className="flex flex-col justify-between h-full group bg-[#454242] rounded-2xl border border-[#585454] shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 p-6 animate-reveal"
              >
                <div className="space-y-5">
                  {/* Top Badge and Icon */}
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-emerald-950/60 text-emerald-400 rounded-2xl w-12 h-12 flex items-center justify-center border border-emerald-500/30 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                      <Activity className="h-6 w-6" />
                    </div>
                    <Badge variant="accent" className="bg-[#363434] text-emerald-400 border border-[#585454] font-bold tracking-wide text-[10px]">Minimally Invasive</Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-[18px] md:text-[22px] font-bold font-heading text-white group-hover:text-emerald-400 transition-colors">
                      {treat.title}
                    </h3>
                    <span className="text-xs text-[#D1D5DB] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-emerald-400" /> Outpatient Recovery: 1-3 Days
                    </span>
                  </div>

                  <p className="text-sm text-[#F0F0F0] leading-relaxed line-clamp-3">
                    {treat.overview}
                  </p>
                </div>

                {/* Action and link */}
                <div className="pt-6 mt-6 border-t border-[#585454] flex items-center justify-between">
                  <span className="text-xs text-[#D1D5DB] flex items-center gap-1 font-bold">
                    <Shield className="h-4 w-4 text-emerald-400" />
                    FDA Approved
                  </span>
                  <Link 
                    to={`/treatments/${treat.id}`}
                    className="inline-flex items-center text-sm font-bold text-emerald-400 hover:text-emerald-300 gap-1.5"
                  >
                    <span>Procedure Details</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#454242] rounded-2xl border border-[#585454] space-y-4 shadow-sm">
            <p className="text-[#D1D5DB] text-base">No treatments found matching your search term.</p>
            <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* 3. HOSPITAL FEE REMINDER PANEL */}
      <div className="border border-[#585454] bg-[#363434] flex flex-col md:flex-row gap-6 items-center justify-between relative z-10 shadow-xl p-8 animate-reveal rounded-2xl my-8">
        <div className="space-y-3 max-w-2xl text-left">
          <h3 className="text-[18px] font-bold font-heading text-white">
            A Financial Advantage: Zero Hidden Facility Charges
          </h3>
          <p className="text-sm text-[#F0F0F0] leading-relaxed font-normal">
            Hospital-owned outpatient departments routinely bill an extra "facility fee" just for scheduling a room. As an independent clinical center, Amara Pain &amp; Spine charges only the single standard physician fee, saving patients and their insurers up to 60% on total procedure costs.
          </p>
        </div>
        <Link to="/contact" className="shrink-0 w-full md:w-auto">
          <Button variant="outline" className="w-full md:w-auto">
            Verify Insurance Coverage
          </Button>
        </Link>
      </div>

    </div>
  );
}
