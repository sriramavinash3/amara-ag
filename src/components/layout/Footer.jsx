import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Printer } from 'lucide-react';

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
    <footer className="w-full bg-[#323030] text-[#F0F0F0] pt-14 pb-8 border-t border-[#585454]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Column 1: Brand Info */}
          <div className="space-y-5 text-left">
            <Link to="/" className="inline-block bg-[#363434] p-2.5 rounded-xl border border-[#585454] shadow-sm">
              <img src="/images/AmaraPain_Logo_dark.png" alt="Amara Pain & Spine logo" className="h-11 sm:h-12 w-auto object-contain shrink-0" />
            </Link>
            <p className="text-sm leading-relaxed text-[#F0F0F0]">
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
                    className="p-2.5 bg-[#454242] text-[#F0F0F0] hover:text-white hover:bg-emerald-600 border border-[#585454] rounded-full transition-all duration-300 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-emerald-500"
                    title={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4 text-left">
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#FFFFFF] border-l-2 border-emerald-500 pl-3">
              Redesign Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[#F0F0F0] hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#F0F0F0] hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">
                  Our Story &amp; Team
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="text-[#F0F0F0] hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">
                  Conditions We Treat
                </Link>
              </li>
              <li>
                <Link to="/treatments" className="text-[#F0F0F0] hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">
                  Pain Treatments
                </Link>
              </li>
              <li>
                <Link to="/referrals" className="hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200 font-semibold text-emerald-400">
                  Physician Referrals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Patient Resources */}
          <div className="space-y-4 text-left">
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#FFFFFF] border-l-2 border-emerald-500 pl-3">
              Patient Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/patients" className="text-[#F0F0F0] hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">
                  FAQ &amp; Intake Guides
                </Link>
              </li>
              <li>
                <Link to="/providers/dr-ashvin-amara" className="text-[#F0F0F0] hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">
                  Ashvin K. Amara, MD
                </Link>
              </li>
              <li>
                <Link to="/providers/eunice-babalola" className="text-[#F0F0F0] hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">
                  Eunice Babalola, NP, MSN
                </Link>
              </li>
              <li>
                <Link to="/providers/alexander-carmenaty" className="text-[#F0F0F0] hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">
                  Alexander Carmenaty, MSN, FNP-C
                </Link>
              </li>
              <li>
                <Link to="/patients#forms" className="text-[#F0F0F0] hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">
                  Referral Pack (Forms)
                </Link>
              </li>
              <li>
                <a
                  href="https://portal.kareo.com/app/new/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200 text-emerald-400 font-semibold"
                >
                  Tebra Patient Portal Login
                </a>
              </li>
              <li>
                <Link to="/privacy" className="text-[#F0F0F0] hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4 text-left">
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#FFFFFF] border-l-2 border-emerald-500 pl-3">
              Contact Details
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/Cpc15Mb3JtU5n8Ho7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 text-[#F0F0F0] transition-colors leading-relaxed"
                >
                  6429 Bannington Road, Suite B,<br />Charlotte, NC 28226
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="tel:+17045039338" className="hover:text-emerald-300 transition-colors font-bold text-[#FFFFFF]">
                  +1 704-503-9338
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#D1D5DB]">
                <Printer className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Fax: 704-503-9339</span>
              </li>
              <li className="flex items-center gap-2 text-[#D1D5DB]">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="mailto:contact@amarapain.com" className="hover:text-emerald-300 transition-colors text-[#F0F0F0]">
                  contact@amarapain.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#D1D5DB]">
                <Clock className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Mon - Fri: 8 AM - 5 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#585454] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#D1D5DB]">
          <p>&copy; {currentYear} Amara Pain &amp; Spine Management. - Maintained by Freddie Business Solutions</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-emerald-300 transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link to="/contact" className="hover:text-emerald-300 transition-colors">Directions &amp; Hours</Link>
            <span>&bull;</span>
            <Link to="/referrals" className="hover:text-emerald-300 transition-colors">Physician Referrals</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
