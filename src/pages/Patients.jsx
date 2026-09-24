import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FileText, CreditCard, UserCheck, ShieldCheck, Download, Calendar, Search, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Accordion from '../components/ui/Accordion';
import useScrollReveal from '../hooks/useScrollReveal';
import { faqs } from '../utils/medicalData';
import '../styles/skeuomorphic.css';

export default function Patients() {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  // Handle hash scrolling if navigating from another page (e.g., #forms or #faqs)
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={containerRef} className="w-full relative py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-left">

      {/* 1. PAGE HEADER */}
      <div className="space-y-4 max-w-3xl border-b border-[#585454] pb-6 relative z-10 animate-reveal">
        <Badge variant="secondary" className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-widest">
          Patient Resources
        </Badge>
        <h1 className="text-[34px] md:text-[54px] font-extrabold font-heading tracking-tight text-white leading-[1.1]">
          Portal &amp; Resources Hub
        </h1>
        <p className="text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
          Access your Patient Portal, pay medical bills, download clinical registration packets, and find answers to billing, insurance, and clinical procedures.
        </p>
      </div>

      {/* 2. PORTAL & RESOURCES SPOTLIGHT */}
      <section className="space-y-8 relative z-10 animate-reveal my-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#363434] rounded-3xl p-6 md:p-8 border border-[#585454] shadow-xl">
          <div className="lg:col-span-7 space-y-4">
            <Badge variant="secondary" className="bg-[#323030] text-emerald-400 border border-[#585454] font-bold uppercase tracking-wider text-[11px]">
              Easy Digital Access
            </Badge>
            <h2 className="text-[24px] md:text-[36px] font-bold font-heading text-white leading-tight">
              Manage Your Pain Care From the Comfort of Home
            </h2>
            <p className="text-base text-[#F0F0F0] leading-relaxed font-normal">
              Whether you are checking past visit summaries, requesting a prescription refill, or completing registration forms before your first visit, our secure Tebra portal is built for simple, barrier-free access on any device.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> HIPAA Compliant</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Senior-Friendly Layout</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Real-Time Records</span>
            </div>
          </div>
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#585454] shadow-md bg-[#323030]">
            <img 
              src="/images/audience/senior_patient_portal.jpg" 
              alt="Older adult patient comfortably reviewing her healthcare records on a digital tablet at home"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>

        <h2 className="text-[28px] md:text-[34px] font-extrabold font-heading leading-[1.2] text-white pt-4">
          Direct Portal Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Patient Portal */}
          <div className="border border-[#585454] rounded-2xl shadow-xl flex flex-col justify-between h-full group p-8 bg-[#454242] hover:border-emerald-500/40 transition-all duration-300">
            <div className="space-y-4">
              <div className="p-3 bg-emerald-950/60 text-emerald-400 rounded-2xl w-12 h-12 flex items-center justify-center border border-emerald-500/30 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                <UserCheck className="h-6 w-6" />
              </div>
              <h3 className="text-[18px] font-bold font-heading text-white">
                Tebra Patient Portal
              </h3>
              <p className="text-sm text-[#F0F0F0] leading-relaxed font-normal">
                Log in securely to view your clinical records, access diagnostic updates, message our care coordinators, request prescription refills, and review clinical summaries from previous visits.
              </p>
            </div>
            <div className="pt-8 border-t border-[#585454]">
              <a 
                href="https://portal.kareo.com/app/new/login" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full block"
              >
                <Button variant="primary" className="w-full">
                  Tebra Patient Portal Login
                </Button>
              </a>
            </div>
          </div>

          {/* Card 2: Pay Bills */}
          <div className="border border-[#585454] rounded-2xl shadow-xl flex flex-col justify-between h-full group p-8 bg-[#454242] hover:border-emerald-500/40 transition-all duration-300">
            <div className="space-y-4">
              <div className="p-3 bg-emerald-950/60 text-emerald-400 rounded-2xl w-12 h-12 flex items-center justify-center border border-emerald-500/30 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-[18px] font-bold font-heading text-white">
                Online Bill Payment
              </h3>
              <p className="text-sm text-[#F0F0F0] leading-relaxed font-normal">
                Log in securely to your account portal to pay statement balances, review invoices, and handle medical balances with zero hassle.
              </p>
            </div>
            <div className="pt-8 border-t border-[#585454]">
              <a 
                href="https://portal.kareo.com/app/new/login" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full block"
              >
                <Button variant="outline" className="w-full">
                  Patient Portal Login
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DOWNLOADABLE FORMS SECTION */}
      <section className="space-y-6 relative z-10 animate-reveal my-8 pt-8 border-t border-[#585454]/60" id="forms">
        <h2 className="text-[28px] md:text-[40px] font-extrabold font-heading leading-[1.2] text-white">
          Clinical Forms &amp; Registration Packets
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card: Referral Package */}
          <div className="border border-[#585454] rounded-2xl shadow-xl flex flex-col justify-between h-full group p-6 bg-[#454242] hover:border-emerald-500/40 transition-all duration-300">
            <div className="space-y-4">
              <FileText className="h-8 w-8 text-emerald-400" />
              <h3 className="text-[16px] font-bold text-white">Physician Referral Pack</h3>
              <p className="text-xs text-[#D1D5DB] leading-relaxed font-normal">
                For physicians seeking to refer patients to our pain management clinic. Download the official referral package to coordinate care.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-[#585454]">
              <a 
                href="https://amarapain.com/wp-content/uploads/2025/06/Referral-package-APS.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300"
              >
                <Download className="h-4 w-4 animate-bounce" />
                <span>Download Referral PDF</span>
              </a>
            </div>
          </div>

          {/* Card: New Patient Intake */}
          <div className="border border-[#585454] rounded-2xl shadow-xl flex flex-col justify-between h-full group p-6 bg-[#454242] hover:border-emerald-500/40 transition-all duration-300">
            <div className="space-y-4">
              <FileText className="h-8 w-8 text-emerald-400" />
              <h3 className="text-[16px] font-bold text-white">New Patient Intake Packet</h3>
              <p className="text-xs text-[#D1D5DB] leading-relaxed font-normal">
                Skip the waiting room paperwork! Download, print, and complete our demographic and medical history forms in advance of your first visit.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-[#585454]">
              <a 
                href="https://amarapain.com/wp-content/themes/amara-pain/documents/APS-New-patient-intake-form.docx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300"
              >
                <Download className="h-4 w-4 animate-bounce" />
                <span>Download Intake DOCX</span>
              </a>
            </div>
          </div>

          {/* Card: Billing Notice */}
          <div className="border border-[#585454] bg-[#363434] flex flex-col justify-between h-full p-6 shadow-xl rounded-2xl">
            <div className="space-y-3">
              <ShieldCheck className="h-8 w-8 text-emerald-400" />
              <h3 className="text-[16px] font-bold text-white">Financial Transparency</h3>
              <p className="text-xs text-[#F0F0F0] leading-relaxed font-normal">
                As a private, independent practice, Amara Pain &amp; Spine charges a flat office fee. We never charge hospital facility fees, keeping patient costs low and transparent.
              </p>
            </div>
            <div className="pt-6 mt-4 text-xs text-emerald-400 font-bold uppercase tracking-wider">
              BCBS, Medicare, &amp; Medicaid Accepted
            </div>
          </div>

        </div>
      </section>

      {/* 4. GENERAL FAQS SECTION */}
      <section className="space-y-6 relative z-10 animate-reveal my-8 pt-8 border-t border-[#585454]/60" id="faqs">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <Badge variant="accent" className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-bold">
              FAQ
            </Badge>
            <h2 className="text-[28px] md:text-[40px] font-extrabold font-heading leading-[1.2] text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
              Find quick answers to common questions about clinic policies, referrals, accepted insurance, and procedure safety.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#D1D5DB]" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#454242] border border-[#585454] rounded-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 text-sm text-white placeholder-[#D1D5DB] shadow-sm"
            />
          </div>
        </div>

        {/* FAQs Accordions list */}
        {filteredFaqs.length > 0 ? (
          <div className="border border-[#585454] shadow-xl divide-y divide-[#585454] p-8 bg-[#454242] rounded-2xl animate-reveal">
            {filteredFaqs.map((faq, idx) => (
              <Accordion key={idx} title={faq.q} className="py-1">
                {faq.a}
              </Accordion>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#454242] border border-[#585454] rounded-2xl">
            <p className="text-[#D1D5DB]">No FAQ answers match your search term.</p>
          </div>
        )}
      </section>

      {/* 5. SCHEDULE PROMPT */}
      <div className="border border-[#585454] bg-[#363434] text-white flex flex-col md:flex-row gap-8 items-center justify-between shadow-xl relative z-10 p-8 animate-reveal rounded-2xl my-8">
        <div className="space-y-3 text-left">
          <h3 className="text-[22px] font-bold font-heading text-white">Need to Speak with a Clinical Assistant?</h3>
          <p className="text-sm text-[#F0F0F0] leading-relaxed font-normal">Our patient coordinators are ready to help you navigate referrals, billing questions, or scheduling.</p>
        </div>
        <div className="flex gap-4 shrink-0 w-full md:w-auto">
          <Link to="/book" className="w-full md:w-auto">
            <Button variant="primary" className="w-full md:w-auto" icon={Calendar}>
              Book Online
            </Button>
          </Link>
          <a href="tel:+17045039338" className="w-full md:w-auto">
            <Button variant="outline" className="w-full md:w-auto" icon={Phone}>
              Call +1 704-503-9338
            </Button>
          </a>
        </div>
      </div>

    </div>
  );
}
