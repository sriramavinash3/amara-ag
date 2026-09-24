import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Activity, ArrowLeft, CheckCircle2, ChevronRight, Calendar, Phone, ShieldCheck, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Accordion from '../components/ui/Accordion';
import useScrollReveal from '../hooks/useScrollReveal';
import { conditions } from '../utils/medicalData';
import '../styles/skeuomorphic.css';

export default function ConditionDetail() {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  const { id } = useParams();
  const navigate = useNavigate();
  const cond = conditions[id];

  // Dynamically update page titles and meta descriptions for SEO
  useEffect(() => {
    if (cond) {
      document.title = cond.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', cond.metaDesc);
      }
    }
    window.scrollTo(0, 0);
  }, [cond]);

  if (!cond) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 md:px-8 text-center space-y-6 text-left bg-[#3A3838] text-[#F0F0F0] min-h-[60vh]">
        <AlertCircle className="h-16 w-16 text-emerald-400 mx-auto" />
        <h1 className="text-[28px] font-extrabold font-heading text-[#FFFFFF]">Condition Not Found</h1>
        <p className="text-[18px] text-[#F0F0F0] font-normal leading-[1.75]">We couldn't find the pain condition you were looking for.</p>
        <Button variant="primary" onClick={() => navigate('/conditions')}>
          Back to Conditions
        </Button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full relative py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-left bg-[#3A3838] text-[#F0F0F0]">

      {/* 1. BREADCRUMBS & BACK LINK */}
      <div className="flex flex-col gap-3 relative z-10 animate-reveal">
        <Link 
          to="/conditions" 
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D1D5DB] hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Conditions</span>
        </Link>

        {/* Breadcrumb row */}
        <div className="flex items-center gap-1.5 text-xs text-[#D1D5DB] font-bold">
          <Link to="/" className="hover:text-[#FFFFFF]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/conditions" className="hover:text-[#FFFFFF]">Conditions We Treat</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#FFFFFF] truncate">{cond.title}</span>
        </div>
      </div>

      {/* 2. HEADER BLOCK */}
      <div className="border-b border-[#585454] pb-6 my-6 space-y-4 relative z-10 animate-reveal">
        <Badge variant="secondary" className="bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 font-bold uppercase tracking-widest">
          Pain Guide
        </Badge>
        <h1 className="text-[32px] sm:text-[42px] md:text-[54px] font-extrabold font-heading tracking-tight text-[#FFFFFF] leading-[1.1]">
          {cond.title}
        </h1>
        <p className="text-[17px] sm:text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
          {cond.shortDesc}
        </p>
      </div>

      {/* 3. DUAL-COLUMN CONTENT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Detailed Content */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Overview */}
          <div className="space-y-4 animate-reveal">
            <h2 className="text-[22px] sm:text-[28px] md:text-[36px] font-extrabold font-heading leading-[1.2] text-[#FFFFFF]">Condition Overview</h2>
            <p className="text-[17px] sm:text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
              {cond.overview}
            </p>
          </div>

          {/* Symptoms */}
          <div className="space-y-4 animate-reveal">
            <h2 className="text-[22px] sm:text-[28px] md:text-[36px] font-extrabold font-heading leading-[1.2] text-[#FFFFFF]">Common Symptoms</h2>
            <p className="text-[17px] sm:text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
              Patients suffering from {cond.title.toLowerCase()} often report experiencing one or more of the following symptoms:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#F0F0F0]">
              {cond.symptoms.map((sym, sIdx) => (
                <li key={sIdx} className="flex items-start gap-3 bg-[#454242] border border-[#585454] p-5 sm:p-6 rounded-xl shadow-lg hover:border-emerald-500/50 transition-all duration-300">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-[#FFFFFF] font-medium">{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div className="space-y-4 animate-reveal">
            <h2 className="text-[22px] sm:text-[28px] md:text-[36px] font-extrabold font-heading leading-[1.2] text-[#FFFFFF]">Underlying Causes</h2>
            <p className="text-[17px] sm:text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
              Pain is a complex signal. {cond.title.toLowerCase()} can be triggered by structural wear-and-tear, injury, or nerve irritation:
            </p>
            <ul className="space-y-3 text-sm text-[#F0F0F0] font-medium">
              {cond.causes.map((cause, cIdx) => (
                <li key={cIdx} className="flex gap-3 items-start">
                  <span className="font-bold text-emerald-400 text-lg leading-none mt-0.5">&bull;</span>
                  <span className="leading-relaxed">{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Treatments */}
          <div className="space-y-4 animate-reveal">
            <h2 className="text-[22px] sm:text-[28px] md:text-[36px] font-extrabold font-heading leading-[1.2] text-[#FFFFFF]">Clinical Treatment Options</h2>
            <p className="text-[17px] sm:text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
              We specialize in targeted, non-surgical therapies that alleviate inflammation, block pain transmission, and promote tissue healing:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cond.treatments.map((treat, tIdx) => (
                <Link key={tIdx} to={treat.path}>
                  <div className="bg-[#454242] border border-[#585454] rounded-xl flex items-center justify-between group cursor-pointer shadow-lg hover:border-emerald-500/50 transition-all duration-300 p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-950/70 text-emerald-300 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors border border-emerald-500/30 shadow-inner">
                        <Activity className="h-4.5 w-4.5" />
                      </div>
                      <span className="font-bold text-sm text-[#FFFFFF] group-hover:text-emerald-300 transition-colors">
                        {treat.name}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#D1D5DB] group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Condition Specific FAQs */}
          <div className="space-y-4 animate-reveal">
            <h2 className="text-[22px] sm:text-[28px] md:text-[36px] font-extrabold font-heading leading-[1.2] text-[#FFFFFF]">Frequently Asked Questions</h2>
            <div className="bg-[#454242] border border-[#585454] rounded-2xl p-6 sm:p-8 shadow-xl">
              {cond.faqs.map((faq, fIdx) => (
                <Accordion key={fIdx} title={faq.q}>
                  {faq.a}
                </Accordion>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Appointment Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Schedule Card */}
          <div className="border border-[#585454] shadow-xl relative sticky top-28 p-6 sm:p-8 bg-[#454242] rounded-2xl animate-reveal">
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-950/30 rounded-full blur-xl -z-10 animate-pulse" />
            
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-[#585454] shadow-sm bg-[#323030]">
              <img 
                src={cond.image || "/images/conditions/back-pain.jpg"} 
                alt={`${cond.title} care plan`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

            <div className="space-y-4 text-left">
              <Badge variant="primary" className="bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 font-bold uppercase tracking-wide text-[10px]">
                Direct Clinic Intake
              </Badge>
              <h3 className="text-[18px] sm:text-[20px] font-bold font-heading text-[#FFFFFF] leading-tight">
                Schedule Relief for {cond.title.split(' & ')[0]}
              </h3>
              <p className="text-xs text-[#D1D5DB] leading-relaxed font-medium">
                Take the first step toward reclaiming your quality of life. Consult directly with our certified pain specialist.
              </p>
              
              <div className="space-y-3 pt-4 text-xs text-[#F0F0F0] border-t border-[#585454] font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Double-certified specialist care</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Affordable flat fee (no facility fees)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Rapid schedule bookings</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              {/* Button linking to Booking Wizard */}
              <Link 
                to="/book" 
                state={{ prefilledCondition: cond.title }}
                className="w-full block"
              >
                <Button variant="primary" className="w-full font-bold" icon={Calendar}>
                  Book Online Now
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
