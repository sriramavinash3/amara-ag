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
      <div className="max-w-7xl mx-auto py-20 px-4 text-center space-y-6 text-left">
        <AlertCircle className="h-16 w-16 text-cta-600 mx-auto" />
        <h1 className="text-3xl font-extrabold font-heading text-slate-900">Condition Not Found</h1>
        <p className="text-[18px] text-slate-600 font-normal leading-[1.75]">We couldn't find the pain condition you were looking for.</p>
        <Button variant="primary" onClick={() => navigate('/conditions')}>
          Back to Conditions
        </Button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full relative py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-12 text-left">

      {/* 1. BREADCRUMBS & BACK LINK */}
      <div className="flex flex-col gap-4 relative z-10 animate-reveal">
        <Link 
          to="/conditions" 
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-medical-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Conditions</span>
        </Link>

        {/* Breadcrumb row */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/conditions" className="hover:text-slate-900">Conditions We Treat</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-500 truncate">{cond.title}</span>
        </div>
      </div>

      {/* 2. HEADER BLOCK */}
      <div className="border-b border-slate-200 pb-8 space-y-6 relative z-10 animate-reveal">
        <Badge variant="secondary" className="bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold uppercase tracking-widest">
          Pain Guide
        </Badge>
        <h1 className="text-3xl md:text-[56px] font-extrabold font-heading tracking-tight text-slate-900 leading-[1.1]">
          {cond.title}
        </h1>
        <p className="text-[18px] text-slate-600 font-normal leading-[1.75] max-w-[720px]">
          {cond.shortDesc}
        </p>
      </div>

      {/* 3. DUAL-COLUMN CONTENT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column: Detailed Content */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Overview */}
          <div className="space-y-4 animate-reveal">
            <h2 className="text-2xl md:text-[42px] font-extrabold font-heading leading-[1.2] text-slate-900">Condition Overview</h2>
            <p className="text-[18px] text-slate-605 font-normal leading-[1.75] max-w-[720px]">
              {cond.overview}
            </p>
          </div>

          {/* Symptoms */}
          <div className="space-y-4 animate-reveal">
            <h2 className="text-2xl md:text-[42px] font-extrabold font-heading leading-[1.2] text-slate-900">Common Symptoms</h2>
            <p className="text-[18px] text-slate-605 font-normal leading-[1.75] max-w-[720px]">
              Patients suffering from {cond.title.toLowerCase()} often report experiencing one or more of the following symptoms:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
              {cond.symptoms.map((sym, sIdx) => (
                <li key={sIdx} className="flex items-start gap-3 bg-white border border-slate-250 p-6 rounded-xl shadow-premium hover:shadow-premium-hover transition-all duration-300">
                  <CheckCircle2 className="h-4.5 w-4.5 text-accent-600 shrink-0 mt-0.5" />
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div className="space-y-4 animate-reveal">
            <h2 className="text-2xl md:text-[42px] font-extrabold font-heading leading-[1.2] text-slate-900">Underlying Causes</h2>
            <p className="text-[18px] text-slate-605 font-normal leading-[1.75] max-w-[720px]">
              Pain is a complex signal. {cond.title.toLowerCase()} can be triggered by structural wear-and-tear, injury, or nerve irritation:
            </p>
            <ul className="space-y-3 text-sm text-slate-700">
              {cond.causes.map((cause, cIdx) => (
                <li key={cIdx} className="flex gap-3 items-start">
                  <span className="font-bold text-medical-600 text-lg leading-none mt-0.5">&bull;</span>
                  <span className="leading-relaxed">{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Treatments */}
          <div className="space-y-4 animate-reveal">
            <h2 className="text-2xl md:text-[42px] font-extrabold font-heading leading-[1.2] text-slate-900">Clinical Treatment Options</h2>
            <p className="text-[18px] text-slate-650 font-normal leading-[1.75] max-w-[720px]">
              We specialize in targeted, non-surgical therapies that alleviate inflammation, block pain transmission, and promote tissue healing:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cond.treatments.map((treat, tIdx) => (
                <Link key={tIdx} to={treat.path}>
                  <Card hoverable variant="white" padding="md" className="border-slate-200/80 flex items-center justify-between group cursor-pointer shadow-premium hover:shadow-premium-hover transition-all duration-300 p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-cyan-50 text-cyan-600 rounded-xl group-hover:bg-cyan-600 group-hover:text-white transition-colors border border-cyan-100 shadow-inner">
                        <Activity className="h-4.5 w-4.5" />
                      </div>
                      <span className="font-bold text-sm text-slate-900 group-hover:text-cyan-700 transition-colors">
                        {treat.name}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Condition Specific FAQs */}
          <div className="space-y-4 animate-reveal">
            <h2 className="text-2xl md:text-[42px] font-extrabold font-heading leading-[1.2] text-slate-900">Frequently Asked Questions</h2>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-premium">
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
          <Card variant="white" padding="lg" className="border-slate-200/80 shadow-premium relative sticky top-24 p-8 animate-reveal">
            <div className="absolute top-0 right-0 w-20 h-20 bg-medical-50 rounded-full blur-xl -z-10" />
            
            <div className="space-y-4 text-left">
              <Badge variant="primary" className="bg-cta-100 text-cta-700 border border-cta-100 font-bold">
                Direct Clinic Intake
              </Badge>
              <h3 className="text-xl font-bold font-heading text-slate-900 leading-tight">
                Schedule Relief for {cond.title.split(' & ')[0]}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Take the first step toward reclaiming your quality of life. Consult directly with our board-certified pain specialist.
              </p>
              
              <div className="space-y-3 pt-4 text-xs text-slate-600 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Double board-certified specialist care</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Affordable flat fee (no facility fees)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Rapid schedule bookings</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              {/* Button linking to Booking Wizard, passing state context if needed */}
              <Link 
                to="/book" 
                state={{ prefilledCondition: cond.title }}
                className="w-full block"
              >
                <Button variant="primary" className="w-full bg-cta-600 hover:bg-cta-700 text-white shadow-md hover:shadow-lg" icon={Calendar}>
                  Book Online Now
                </Button>
              </Link>
              
              <a href="tel:7045039338" className="w-full block">
                <Button variant="outline" className="w-full text-slate-900 border-slate-300 hover:border-slate-400" icon={Phone}>
                  Call 704-503-9338
                </Button>
              </a>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
