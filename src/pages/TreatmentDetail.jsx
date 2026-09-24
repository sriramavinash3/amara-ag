import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, Calendar, Phone, ShieldCheck, Clock, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Accordion from '../components/ui/Accordion';
import useScrollReveal from '../hooks/useScrollReveal';
import { treatments } from '../utils/medicalData';
import '../styles/skeuomorphic.css';

export default function TreatmentDetail() {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  const { id } = useParams();
  const navigate = useNavigate();
  const treat = treatments[id];

  // Dynamically update metadata for SEO
  useEffect(() => {
    if (treat) {
      document.title = treat.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', treat.metaDesc);
      }
    }
    window.scrollTo(0, 0);
  }, [treat]);

  if (!treat) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 md:px-8 text-center space-y-6 text-left">
        <AlertCircle className="h-16 w-16 text-cta-600 mx-auto" />
        <h1 className="text-[28px] font-extrabold font-heading text-slate-900">Procedure Not Found</h1>
        <p className="text-[18px] text-slate-605 font-normal leading-[1.75]">We couldn't find the pain treatment procedure you were looking for.</p>
        <Button variant="primary" onClick={() => navigate('/treatments')}>
          Back to Treatments
        </Button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full relative py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-left">

      {/* 1. BREADCRUMBS & BACK LINK */}
      <div className="flex flex-col gap-3 relative z-10 animate-reveal">
        <Link 
          to="/treatments" 
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D1D5DB] hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Treatments</span>
        </Link>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-[#D1D5DB] font-bold">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/treatments" className="hover:text-white">Pain Treatments</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white truncate">{treat.title}</span>
        </div>
      </div>

      {/* 2. HEADER BLOCK */}
      <div className="border-b border-[#585454] pb-5 my-6 space-y-4 relative z-10 animate-reveal">
        <Badge variant="accent" className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-widest">
          Procedure Guide
        </Badge>
        <h1 className="text-[28px] md:text-[54px] font-extrabold font-heading tracking-tight text-white leading-[1.1]">
          {treat.title}
        </h1>
        <p className="text-xs md:text-sm text-[#D1D5DB] font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-emerald-400" />
          Outpatient Recovery: 1-3 Days &bull; Minimally Invasive
        </p>
      </div>

      {/* 3. DUAL COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Clinical Content */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Overview */}
          <div className="space-y-4 animate-reveal">
            <h2 className="text-[22px] md:text-[40px] font-extrabold font-heading leading-[1.2] text-white">Procedure Overview</h2>
            <p className="text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
              {treat.overview}
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4 animate-reveal">
            <h2 className="text-[22px] md:text-[40px] font-extrabold font-heading leading-[1.2] text-white">Clinical Benefits</h2>
            <p className="text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
              Precision interventional procedures offer major advantages over major surgery and daily oral pain medications:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#F0F0F0]">
              {treat.benefits.map((benefit, bIdx) => (
                <li key={bIdx} className="flex items-start gap-3 bg-[#454242] border border-[#585454] p-6 rounded-xl shadow-lg hover:border-emerald-500/40 transition-all duration-300">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-white font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recovery */}
          <div className="space-y-4 animate-reveal">
            <h2 className="text-[22px] md:text-[40px] font-extrabold font-heading leading-[1.2] text-white">Recovery &amp; Aftercare</h2>
            <p className="text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
              {treat.recovery}
            </p>
          </div>

          {/* FAQs */}
          <div className="space-y-4 animate-reveal">
            <h2 className="text-[22px] md:text-[40px] font-extrabold font-heading leading-[1.2] text-white">Frequently Asked Questions</h2>
            <div className="bg-[#454242] border border-[#585454] rounded-2xl p-8 shadow-xl">
              {treat.faqs.map((faq, fIdx) => (
                <Accordion key={fIdx} title={faq.q}>
                  {faq.a}
                </Accordion>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Booking Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border border-[#585454] shadow-xl relative sticky top-24 p-8 bg-[#454242] rounded-2xl animate-reveal">
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-950/30 rounded-full blur-xl -z-10 animate-pulse" />
            
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-[#585454] shadow-sm bg-[#323030]">
              <img 
                src="/images/audience/interventional_procedure_suite.jpg" 
                alt="State-of-the-art interventional pain management procedure suite with C-arm fluoroscopy"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

            <div className="space-y-4 text-left">
              <Badge variant="secondary" className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-wide text-[10px]">
                Affordable Pain Tech
              </Badge>
              <h3 className="text-[18px] font-bold font-heading text-white leading-tight">
                Schedule {treat.title}
              </h3>
              <p className="text-xs text-[#D1D5DB] leading-relaxed font-medium">
                Take a vital step toward long-term relief. Our outpatient procedures are performed with absolute precision in our local Charlotte clinic.
              </p>
              
              <div className="space-y-3 pt-4 text-xs text-[#F0F0F0] border-t border-[#585454] font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>FDA-approved clinical methods</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Fluoroscopic (X-ray) precision</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Zero hospital facility fee markup</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <Link 
                to="/book" 
                state={{ prefilledTreatment: treat.title }}
                className="w-full block"
              >
                <Button variant="primary" className="w-full" icon={Calendar}>
                  Request Procedure
                </Button>
              </Link>
              
              <a href="tel:+17045039338" className="w-full block">
                <Button variant="outline" className="w-full" icon={Phone}>
                  Call +1 704-503-9338
                </Button>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
