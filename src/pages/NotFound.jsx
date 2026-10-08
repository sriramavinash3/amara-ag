import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, Phone, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <Card variant="slate" padding="lg" className="max-w-xl w-full text-center space-y-6 bg-[#363434] border border-[#585454] p-8 md:p-12 rounded-3xl shadow-2xl">
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <Badge variant="primary" className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-bold uppercase tracking-widest text-xs">
            Page Not Found &bull; 404
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-white">
            We Couldn't Find That Page
          </h1>
          <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed max-w-md mx-auto">
            The link you followed may be broken or the clinical page has been moved. Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" icon={Home} className="w-full font-bold">
              Return Home
            </Button>
          </Link>
          <Link to="/book" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" icon={Calendar} className="w-full font-bold">
              Book Appointment
            </Button>
          </Link>
          <a href="tel:+17045039338" className="w-full sm:w-auto">
            <Button variant="outline" size="md" icon={Phone} className="w-full">
              Call Clinic
            </Button>
          </a>
        </div>

        <div className="pt-6 border-t border-[#585454] flex flex-wrap justify-center gap-4 text-xs font-semibold text-emerald-400">
          <Link to="/conditions" className="hover:underline">Conditions Treated</Link>
          <span className="text-[#585454]">&bull;</span>
          <Link to="/treatments" className="hover:underline">Procedures &amp; Therapies</Link>
          <span className="text-[#585454]">&bull;</span>
          <Link to="/about" className="hover:underline">Our Providers</Link>
          <span className="text-[#585454]">&bull;</span>
          <Link to="/contact" className="hover:underline">Location &amp; Directions</Link>
        </div>
      </Card>
    </div>
  );
}
