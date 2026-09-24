import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';

export default function StickyActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#323030]/95 backdrop-blur-lg border-t border-[#585454] px-4 py-3 shadow-[0_-10px_25px_rgba(0,0,0,0.5)] flex items-center justify-between gap-3 lg:hidden safe-bottom">
      {/* 1. CALL CLINIC BUTTON */}
      <a
        href="tel:+17045039338"
        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#585454] hover:bg-[#514E4E] text-[#FFFFFF] font-bold text-sm transition-all duration-200 bg-[#454242] shadow-sm"
      >
        <Phone className="h-4 w-4 text-emerald-400 animate-pulse" />
        <span>Call Clinic</span>
      </a>

      {/* 2. BOOK APPOINTMENT BUTTON */}
      <Link
        to="/book"
        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-all duration-200 shadow-md shadow-emerald-950/40"
      >
        <Calendar className="h-4 w-4" />
        <span>Book Online</span>
      </Link>
    </div>
  );
}
