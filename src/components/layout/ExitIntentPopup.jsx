import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Calendar, Phone, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      return Boolean(sessionStorage.getItem('exit_intent_seen'));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (dismissed) return;

    const handleMouseLeave = (e) => {
      // Trigger when mouse moves out of top viewport (typical exit path)
      if (e.clientY < 20) {
        setIsVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dismissed]);

  const handleClose = () => {
    setIsVisible(false);
    setDismissed(true);
    try {
      sessionStorage.setItem('exit_intent_seen', 'true');
    } catch {
      // Ignore storage errors in private browsing
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#3A3838]/85 backdrop-blur-md transition-all duration-300">
      <Card variant="white" padding="lg" className="relative w-full max-w-lg border-[#585454] shadow-2xl p-6 sm:p-8 bg-[#454242] rounded-3xl text-left">
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 p-2 text-[#D1D5DB] hover:text-[#FFFFFF] rounded-full hover:bg-[#514E4E] transition-colors cursor-pointer"
          aria-label="Close popup"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Don't Live in Pain</span>
            <h3 className="text-[22px] font-black font-heading text-[#FFFFFF] leading-tight">
              Get Your Pain Evaluated This Week
            </h3>
            <p className="text-sm text-[#F0F0F0] leading-relaxed">
              We offer same-week consultations in Charlotte, NC. Directed by double-certified specialists with zero facility fees.
            </p>
          </div>

          <div className="bg-[#363434] border border-[#585454] rounded-2xl p-4.5 space-y-3">
            <div className="flex gap-2.5 text-xs text-[#F0F0F0] items-start">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#FFFFFF] block">Independent Private Practice</strong>
                No hidden hospital fees or markups—saving you up to 60%.
              </div>
            </div>
            <div className="flex gap-2.5 text-xs text-[#F0F0F0] items-start">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#FFFFFF] block">No Referral Required</strong>
                Self-schedule directly today for rapid pain diagnostic testing.
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link to="/book" onClick={handleClose} className="flex-grow">
              <Button variant="primary" className="w-full font-bold" icon={Calendar}>
                Book Appointment
              </Button>
            </Link>
            <a href="tel:+17045039338" onClick={handleClose} className="flex-grow">
              <Button variant="secondary" className="w-full" icon={Phone}>
                Call +1 704-503-9338
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
