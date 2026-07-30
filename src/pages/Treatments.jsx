import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Search, ArrowRight, Shield, Calendar, Clock } from 'lucide-react';
import Card from '../components/ui/Card';
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
    <div ref={containerRef} className="w-full relative py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-16 text-left">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-10 relative z-10 animate-reveal">
        <div className="space-y-6 max-w-2xl">
          <Badge variant="secondary" className="bg-cyan-50 text-cyan-805 border border-cyan-200 font-bold uppercase tracking-widest">
            Clinic Procedures
          </Badge>
          <h1 className="text-4xl md:text-[56px] font-extrabold font-heading tracking-tight text-slate-900 leading-[1.1]">
            Interventional Pain Treatments
          </h1>
          <p className="text-[18px] text-slate-600 font-normal leading-[1.75] max-w-[720px]">
            Discover our advanced, FDA-approved outpatient therapies. We focus on non-surgical joint-preservation, muscle spasm release, and nerve-calming procedures.
          </p>
        </div>

        {/* Search Filter */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search treatments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-250 rounded-full focus:outline-none focus:border-medical-600 focus:ring-1 focus:ring-medical-600 text-sm shadow-sm transition-all duration-200"
          />
        </div>
      </div>

      {/* 2. TREATMENTS GRID */}
      <div className="relative z-10">
        {filteredTreatments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTreatments.map((treat) => (
              <Card 
                key={treat.id} 
                hoverable 
                variant="white" 
                className="flex flex-col justify-between h-full group border-slate-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-300 p-6 console-card-3d animate-reveal"
              >
                <div className="space-y-5">
                  {/* Top Badge and Icon */}
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-cyan-50 text-cyan-600 rounded-2xl w-12 h-12 flex items-center justify-center border border-cyan-100 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                      <Activity className="h-6 w-6" />
                    </div>
                    <Badge variant="accent" className="bg-cyan-50 text-cyan-805 border border-cyan-200 font-semibold">Minimally Invasive</Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-900 group-hover:text-medical-600 transition-colors">
                      {treat.title}
                    </h3>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-medical-600" /> Outpatient Recovery: 1-3 Days
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                    {treat.overview}
                  </p>
                </div>

                {/* Action and link */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    FDA Approved
                  </span>
                  <Link 
                    to={`/treatments/${treat.id}`}
                    className="inline-flex items-center text-sm font-bold text-medical-600 hover:text-medical-700 gap-1.5"
                  >
                    <span>Procedure Details</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <p className="text-slate-500 text-base">No treatments found matching your search term.</p>
            <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* 3. MOCK HOSPITAL FEE REMINDER PANEL */}
      <Card variant="slate" padding="lg" className="border-slate-200/80 bg-slate-100/50 flex flex-col md:flex-row gap-6 items-center justify-between relative z-10 shadow-sm p-8 animate-reveal">
        <div className="space-y-3 max-w-2xl text-left">
          <h3 className="text-xl font-bold font-heading text-slate-900">
            A Financial Advantage: Zero Hidden Facility Charges
          </h3>
          <p className="text-sm text-slate-650 leading-relaxed">
            Hospital-owned outpatient departments routinely bill an extra "facility fee" just for scheduling a room. As an independent clinical center, Amara Pain &amp; Spine charges only the single standard physician fee, saving patients and their insurers up to 60% on total procedure costs.
          </p>
        </div>
        <Link to="/contact" className="shrink-0 w-full md:w-auto">
          <Button variant="outline" className="w-full md:w-auto text-slate-900 border-slate-350 hover:border-slate-400">
            Verify Insurance Coverage
          </Button>
        </Link>
      </Card>

    </div>
  );
}
