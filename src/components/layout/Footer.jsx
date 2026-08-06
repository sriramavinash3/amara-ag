import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Printer, ShieldAlert } from 'lucide-react';
import Card from '../ui/Card';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/pages/Amara-Pain-Spine/1480683785492327',
      icon: (props) => (
        <svg className="fill-current" viewBox="0 0 24 24" {...props}>
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/AmaraPainSpine',
      icon: (props) => (
        <svg className="fill-current" viewBox="0 0 24 24" {...props}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'http://www.linkedin.com/pub/ashvin-k-amara-md/42/80/31a/',
      icon: (props) => (
        <svg className="fill-current" viewBox="0 0 24 24" {...props}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      name: 'Youtube',
      url: 'http://www.youtube.com/playlist?list=PLH428YywjuMJ94QQPjt0JwSXTW-eY3vEQ',
      icon: (props) => (
        <svg className="fill-current" viewBox="0 0 24 24" {...props}>
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.522 3.5 12 3.5 12 3.5s-7.522 0-9.388.555a3.002 3.002 0 0 0-2.11 2.108C0 8.029 0 12 0 12s0 3.971.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.478 20.5 12 20.5 12 20.5s7.522 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.971 24 12 24 12s0-3.971-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    },
  ];

  return (
    <footer className="w-full bg-primary-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Column 1: Brand Info */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/images/amara_logo.png" alt="Amara logo" className="h-8 w-auto object-contain shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-xl md:text-2xl font-black font-heading text-white tracking-tight leading-none">
                  AMARA<span className="text-medical-500 ml-0.5">PAIN</span>
                </span>
                <span className="text-[9px] md:text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase mt-0.5 leading-none">
                  &amp; Spine Management
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Transforming pain care in Charlotte, NC. Led by double-certified specialists, we offer personalized, non-invasive treatments designed to restore your quality of life.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-800 text-slate-400 hover:text-white hover:bg-medical-600 rounded-full transition-all duration-300 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-medical-500"
                    title={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white border-l-2 border-medical-500 pl-3">
              Redesign Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-medical-500 hover:translate-x-1 inline-block transition-all duration-200">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-medical-500 hover:translate-x-1 inline-block transition-all duration-200">
                  Our Story &amp; Team
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="hover:text-medical-500 hover:translate-x-1 inline-block transition-all duration-200">
                  Conditions We Treat
                </Link>
              </li>
              <li>
                <Link to="/treatments" className="hover:text-medical-500 hover:translate-x-1 inline-block transition-all duration-200">
                  Pain Treatments
                </Link>
              </li>
              <li>
                <Link to="/referrals" className="hover:text-medical-500 hover:translate-x-1 inline-block transition-all duration-200 font-semibold text-sky-400">
                  Physician Referrals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Patient Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white border-l-2 border-medical-500 pl-3">
              Patient Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/patients" className="hover:text-medical-500 hover:translate-x-1 inline-block transition-all duration-200">
                  FAQ &amp; Intake Guides
                </Link>
              </li>
              <li>
                <Link to="/providers/dr-ashvin-amara" className="hover:text-medical-500 hover:translate-x-1 inline-block transition-all duration-200">
                  Dr. Ashvin K. Amara Bio
                </Link>
              </li>
              <li>
                <Link to="/providers/dr-ashvin-amara" className="hover:text-medical-500 hover:translate-x-1 inline-block transition-all duration-200">
                  Dr. Ashvin K. Amara, MD
                </Link>
              </li>
              <li>
                <Link to="/providers/sarah-whitfield" className="hover:text-medical-500 hover:translate-x-1 inline-block transition-all duration-200">
                  Sarah Whitfield, NP
                </Link>
              </li>
              <li>
                <Link to="/providers/james-okafor" className="hover:text-medical-500 hover:translate-x-1 inline-block transition-all duration-200">
                  James Okafor, PA-C
                </Link>
              </li>
              <li>
                <Link to="/patients#forms" className="hover:text-medical-500 hover:translate-x-1 inline-block transition-all duration-200">
                  Referral Pack (Forms)
                </Link>
              </li>
              <li>
                <a
                  href="https://portal.kareo.com/app/new/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-medical-500 hover:translate-x-1 inline-block transition-all duration-200 text-sky-400 font-semibold"
                >
                  Tebra Patient Portal Login
                </a>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-medical-500 hover:translate-x-1 inline-block transition-all duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white border-l-2 border-medical-500 pl-3">
              Contact Details
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-medical-500 shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/Cpc15Mb3JtU5n8Ho7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed"
                >
                  6429 Bannington Road, Suite B,<br />Charlotte, NC 28226
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent-500 shrink-0" />
                <a href="tel:7045039338" className="hover:text-white transition-colors font-bold text-slate-100">
                  704-503-9338
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Printer className="h-4 w-4 text-slate-500 shrink-0" />
                <span>Fax: 704-503-9339</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="h-4 w-4 text-slate-500 shrink-0" />
                <a href="mailto:contact@amarapain.com" className="hover:text-white transition-colors">
                  contact@amarapain.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <Clock className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Mon - Fri: 8 AM - 5 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Top/Middle divider for disclaimer */}
        <div className="border-t border-slate-800/80 pt-8 pb-6">
          <Card variant="slate" padding="sm" className="bg-slate-800/40 border-slate-800 text-xs text-slate-400 leading-relaxed flex gap-3">
            <ShieldAlert className="h-5 w-5 text-accent-500 shrink-0" />
            <p>
              <strong>Disclaimer:</strong> Amara Pain &amp; Spine Management is an independent physician practice. The clinical, treatment, and condition information provided on this website is exclusively for educational and informational purposes. It is not intended to be, and should not be used as, a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider regarding any chronic pain conditions or medical concerns.
            </p>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; 2026 Amara Pain &amp; Spine Management. - Maintained by Freddie Business Solutions</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Directions &amp; Hours</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
