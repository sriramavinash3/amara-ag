import React, { useState, useEffect } from 'react';
import { X, Calendar, Phone, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed it in this session
    const hasSeen = sessionStorage.getItem('exit_intent_seen');
    if (hasSeen) {
      setDismissed(true);
      return;
    }

    const handleMouseLeave = (e) => {
      if (dismissed) return;
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
    sessionStorage.setItem('exit_intent_seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md transition-all duration-300">
      <Card variant="white" padding="lg" className="relative w-full max-w-lg border-slate-200/80 shadow-2xl p-8 bg-white/95 rounded-3xl text-left">
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-655 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
          aria-label="Close popup"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-medical-605 uppercase">Don't Live in Pain</span>
            <h3 className="text-2xl font-black font-heading text-slate-900 leading-tight">
              Get Your Pain Evaluated This Week
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We offer same-week consultations in Charlotte, NC. Directed by double board-certified specialists with zero facility fees.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4.5 space-y-3">
            <div className="flex gap-2.5 text-xs text-slate-700 items-start">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Independent Private Practice</strong>
                No hidden hospital fees or markups—saving you up to 60%.
              </div>
            </div>
            <div className="flex gap-2.5 text-xs text-slate-700 items-start">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">No Referral Required</strong>
                Self-schedule directly today for rapid pain diagnostic testing.
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a href="/book" onClick={handleClose} className="flex-grow">
              <Button variant="primary" className="w-full bg-cta-600 hover:bg-cta-700 text-white shadow-md cursor-pointer" icon={Calendar}>
                Book Appointment
              </Button>
            </a>
            <a href="tel:7045039338" onClick={handleClose} className="flex-grow">
              <Button variant="outline" className="w-full text-slate-900 border-slate-350 cursor-pointer" icon={Phone}>
                Call 704-503-9338
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
