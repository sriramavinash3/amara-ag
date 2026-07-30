import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';

export default function StickyActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-t border-slate-100 px-4 py-3 shadow-[0_-10px_25px_rgba(15,23,42,0.06)] flex items-center justify-between gap-3 lg:hidden safe-bottom">
      {/* 1. CALL CLINIC BUTTON */}
      <a
        href="tel:7045039338"
        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-slate-200 hover:border-slate-300 text-primary-900 font-bold text-sm transition-all duration-200 bg-white shadow-sm"
      >
        <Phone className="h-4 w-4 text-medical-600 animate-pulse" />
        <span>Call Clinic</span>
      </a>

      {/* 2. BOOK APPOINTMENT BUTTON */}
      <Link
        to="/book"
        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-cta-600 text-white font-bold text-sm hover:bg-cta-700 transition-all duration-200 shadow-md shadow-cta-600/25"
      >
        <Calendar className="h-4 w-4" />
        <span>Book Online</span>
      </Link>
    </div>
  );
}
