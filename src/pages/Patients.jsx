import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FileText, CreditCard, UserCheck, ShieldCheck, Download, Calendar, Search, HelpCircle, Phone } from 'lucide-react';
import Card from '../components/ui/Card';
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
    <div ref={containerRef} className="w-full relative py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-20 text-left">

      {/* 1. PAGE HEADER */}
      <div className="space-y-6 max-w-3xl border-b border-stone-200 pb-10 relative z-10 animate-reveal">
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-850 border border-emerald-200 font-bold uppercase tracking-widest">
          Patient Resources
        </Badge>
        <h1 className="text-4xl md:text-[56px] font-extrabold font-heading tracking-tight text-stone-900 leading-[1.1]">
          Portal &amp; Resources Hub
        </h1>
        <p className="text-[18px] text-stone-600 font-normal leading-[1.75] max-w-[720px]">
          Access your Patient Portal, pay medical bills, download clinical registration packets, and find answers to billing, insurance, and clinical procedures.
        </p>
      </div>

      {/* 2. PORTAL & PORTAL ACTION CARDS */}
      <section className="space-y-8 relative z-10 animate-reveal">
        <h2 className="text-3xl md:text-[42px] font-extrabold font-heading leading-[1.2] text-stone-900">
          Tebra Patient Portal Login
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Patient Portal */}
          <Card variant="white" padding="lg" className="border-stone-200 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between h-full group p-8 bg-white">
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-12 h-12 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                <UserCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-stone-900">
                Tebra Patient Portal
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed font-medium">
                Log in securely to view your clinical records, access diagnostic updates, message our care coordinators, request prescription refills, and review clinical summaries from previous visits.
              </p>
            </div>
            <div className="pt-8 border-t border-stone-150">
              <a 
                href="https://portal.kareo.com/app/new/login" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full block"
              >
                <Button variant="secondary" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                  Tebra Patient Portal Login
                </Button>
              </a>
            </div>
          </Card>

          {/* Card 2: Pay Bills */}
          <Card variant="white" padding="lg" className="border-stone-200 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between h-full group p-8 bg-white">
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 text-emerald-650 rounded-2xl w-12 h-12 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-stone-900">
                Online Bill Payment
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed font-medium">
                Log in securely to your account portal to pay statement balances, review invoices, and handle medical balances with zero hassle.
              </p>
            </div>
            <div className="pt-8 border-t border-stone-150">
              <a 
                href="https://portal.kareo.com/app/new/login" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full block"
              >
                <Button variant="outline" className="w-full text-stone-850 hover:bg-stone-50 border-stone-300 font-bold">
                  Patient Portal Login
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. DOWNLOADABLE FORMS SECTION */}
      <section className="space-y-8 pt-6 relative z-10 animate-reveal" id="forms">
        <h2 className="text-3xl md:text-[42px] font-extrabold font-heading leading-[1.2] text-stone-900">
          Clinical Forms &amp; Registration Packets
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card: Referral Package */}
          <Card variant="white" padding="md" className="border-stone-200 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between h-full group p-6 bg-white">
            <div className="space-y-4">
              <FileText className="h-8 w-8 text-emerald-600" />
              <h3 className="text-lg font-bold text-stone-900">Physician Referral Pack</h3>
              <p className="text-xs text-stone-500 leading-relaxed font-medium">
                For physicians seeking to refer patients to our pain management clinic. Download the official referral package to coordinate care.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-stone-150">
              <a 
                href="https://amarapain.com/wp-content/uploads/2025/06/Referral-package-APS.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-750"
              >
                <Download className="h-4 w-4 animate-bounce" />
                <span>Download Referral PDF</span>
              </a>
            </div>
          </Card>

          {/* Card: New Patient Intake */}
          <Card variant="white" padding="md" className="border-stone-200 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between h-full group p-6 bg-white">
            <div className="space-y-4">
              <FileText className="h-8 w-8 text-emerald-600" />
              <h3 className="text-lg font-bold text-stone-900">New Patient Intake Packet</h3>
              <p className="text-xs text-stone-500 leading-relaxed font-medium">
                Skip the waiting room paperwork! Download, print, and complete our demographic and medical history forms in advance of your first visit.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-stone-150">
              <a 
                href="https://amarapain.com/wp-content/themes/amara-pain/documents/APS-New-patient-intake-form.docx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-750"
              >
                <Download className="h-4 w-4 animate-bounce" />
                <span>Download Intake DOCX</span>
              </a>
            </div>
          </Card>

          {/* Card: Billing Notice */}
          <Card variant="slate" padding="md" className="border-stone-200 bg-stone-50 flex flex-col justify-between h-full p-6 shadow-premium rounded-2xl">
            <div className="space-y-3">
              <ShieldCheck className="h-8 w-8 text-emerald-650" />
              <h3 className="text-lg font-bold text-stone-900">Financial Transparency</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                As a private, independent practice, Amara Pain &amp; Spine charges a flat office fee. We never charge hospital facility fees, keeping patient costs low and transparent.
              </p>
            </div>
            <div className="pt-6 mt-4 text-xs text-emerald-800 font-bold uppercase tracking-wider">
              BCBS, Medicare, &amp; Medicaid Accepted
            </div>
          </Card>

        </div>
      </section>

      {/* 4. GENERAL FAQS SECTION */}
      <section className="space-y-8 pt-6 relative z-10 animate-reveal" id="faqs">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <Badge variant="accent" className="bg-emerald-50 text-emerald-850 border border-emerald-200 font-bold">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-[42px] font-extrabold font-heading leading-[1.2] text-stone-900">
              Frequently Asked Questions
            </h2>
            <p className="text-[18px] text-stone-600 font-normal leading-[1.75] max-w-[720px]">
              Find quick answers to common questions about clinic policies, referrals, accepted insurance, and procedure safety.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-stone-300 rounded-full focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm shadow-sm"
            />
          </div>
        </div>

        {/* FAQs Accordions list */}
        {filteredFaqs.length > 0 ? (
          <Card variant="white" padding="md" className="border-stone-200 shadow-premium divide-y divide-stone-150 p-8 bg-white rounded-2xl animate-reveal">
            {filteredFaqs.map((faq, idx) => (
              <Accordion key={idx} title={faq.q} className="py-1">
                {faq.a}
              </Accordion>
            ))}
          </Card>
        ) : (
          <div className="text-center py-12 bg-white border border-stone-200 rounded-2xl">
            <p className="text-stone-500">No FAQ answers match your search term.</p>
          </div>
        )}
      </section>

      {/* 5. MOCK SCHEDULE PROMPT */}
      <Card variant="slate" padding="lg" className="bg-gradient-to-br from-emerald-800 to-emerald-950 border-none text-white flex flex-col md:flex-row gap-8 items-center justify-between shadow-premium relative z-10 p-8 animate-reveal rounded-2xl">
        <div className="space-y-3 text-left">
          <h3 className="text-2xl font-bold font-heading text-white">Need to Speak with a Clinical Assistant?</h3>
          <p className="text-sm text-emerald-50 leading-relaxed font-normal">Our patient coordinators are ready to help you navigate referrals, billing questions, or scheduling.</p>
        </div>
        <div className="flex gap-4 shrink-0 w-full md:w-auto">
          <Link to="/book" className="w-full md:w-auto">
            <Button variant="primary" className="bg-white text-emerald-850 hover:bg-emerald-50 hover:text-emerald-950 font-bold shadow-none w-full md:w-auto" icon={Calendar}>
              Book Online
            </Button>
          </Link>
          <a href="tel:7045039338" className="w-full md:w-auto">
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 w-full md:w-auto" icon={Phone}>
              Call 704-503-9338
            </Button>
          </a>
        </div>
      </Card>

    </div>
  );
}
