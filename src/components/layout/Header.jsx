import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, Clock, MapPin, Menu, X, ChevronDown, Calendar } from 'lucide-react';
import Button from '../ui/Button';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Handle header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    {
      name: 'About Clinic',
      path: '/about',
      submenu: [
        { name: 'Our Story & Team', path: '/about' },
        { name: 'Ashvin K. Amara, MD', path: '/providers/dr-ashvin-amara' },
        { name: 'Eunice Babalola, NP, MSN', path: '/providers/eunice-babalola' },
        { name: 'Alexander Carmenaty Rodriguez, MSN, FNP-C', path: '/providers/alexander-carmenaty' },
      ]
    },
    {
      name: 'Pain Treatments',
      path: '/treatments',
      submenu: [
        { name: 'Overview', path: '/treatments' },
        { name: 'Epidural Injections', path: '/treatments/epidural-injections' },
        { name: 'Nerve Blocks & Ablations', path: '/treatments/nerve-blocks' },
        { name: 'Radiofrequency Ablation', path: '/treatments/radiofrequency-ablation' },
        { name: 'Spinal Cord Stimulation', path: '/treatments/spinal-cord-stimulation' },
        { name: 'Trigger Point Therapy', path: '/treatments/trigger-point-therapy' },
        { name: 'Regenerative Medicine', path: '/treatments/regenerative-treatments' },
        { name: 'Medical Weight Loss', path: '/treatments/weight-loss' },
      ]
    },
    {
      name: 'Conditions We Treat',
      path: '/conditions',
      submenu: [
        { name: 'Overview', path: '/conditions' },
        { name: 'Back Pain & Leg Pain', path: '/conditions/back-pain' },
        { name: 'Neck Pain & Arm Pain', path: '/conditions/neck-pain' },
        { name: 'Sciatica', path: '/conditions/sciatica' },
        { name: 'Joint Pain & Arthritis', path: '/conditions/joint-pain' },
        { name: 'Knee Pain', path: '/conditions/knee-pain' },
        { name: 'Shoulder & Abdomen Pain', path: '/conditions/shoulder-pain' },
        { name: 'Neuropathy & Nerve Pain', path: '/conditions/neuropathic-pain' },
        { name: 'Sports & Work Injuries', path: '/conditions/sports-injuries' },
        { name: 'Joint Arthritis & Preservation', path: '/conditions/arthritis' },
        { name: 'Post-Surgical Pain & FBSS', path: '/conditions/post-surgical-pain' },
      ]
    },
    {
      name: 'Patients',
      path: '/patients',
      submenu: [
        { name: 'Overview & Resources', path: '/patients' },
        { name: 'Tebra Patient Portal Login', path: 'https://portal.kareo.com/app/new/login', external: true },
        { name: 'FAQs', path: '/patients#faqs' },
        { name: 'Referral Submission', path: '/referrals' },
        { name: 'Download Intake Forms', path: '/patients#forms' },
      ]
    },
    { name: 'Referrals', path: '/referrals' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const toggleDropdown = (index, e) => {
    if (window.innerWidth < 1280) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#323030] shadow-md border-b border-[#585454]">
      {/* 1. TOP SUBHEADER BAR */}
      <div className="w-full bg-[#2E2C2C] text-[#F0F0F0] text-xs py-2.5 border-b border-[#585454] hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-3">
          {/* Clinic Details */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a
              href="https://maps.app.goo.gl/Cpc15Mb3JtU5n8Ho7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#F0F0F0] hover:text-emerald-300 transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              6429 Bannington Road, Suite B, Charlotte, NC 28226
            </a>
            <span className="flex items-center gap-1.5 text-[#D1D5DB]">
              <Clock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              Mon - Fri: 8:00 AM - 5:00 PM
            </span>
          </div>

          {/* Action Contacts */}
          <div className="flex items-center gap-x-6">
            <span className="text-[#D1D5DB]">Fax: 704-503-9339</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <nav className={`w-full transition-all duration-300 ${scrolled
        ? 'bg-[#323030]/95 backdrop-blur-md shadow-lg py-2.5'
        : 'bg-[#323030] py-3.5 border-b border-[#585454]'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-3">
          {/* Noticeably Larger Logo with Preserved Proportions */}
          <Link to="/" className="flex items-center focus-visible:outline-2 focus-visible:outline-emerald-500 rounded-lg py-0.5 shrink-0">
            <img
              src="/images/AmaraPain_Logo_dark.png"
              alt="Amara Pain & Spine logo"
              className="h-12 sm:h-14 md:h-16 lg:h-[68px] xl:h-[76px] 2xl:h-20 w-auto object-contain shrink-0 transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-x-0.5 2xl:gap-x-1 min-w-0">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.submenu ? (
                  <button
                    onClick={(e) => toggleDropdown(index, e)}
                    className="flex items-center gap-0.5 px-2 2xl:px-2.5 py-2 text-[12.5px] 2xl:text-[13.5px] font-semibold text-[#F0F0F0] hover:text-[#FFFFFF] hover:bg-[#454242] transition-colors rounded-full cursor-pointer focus-visible:outline-emerald-500 whitespace-nowrap"
                  >
                    {item.name}
                    <ChevronDown className="h-3.5 w-3.5 text-[#D1D5DB] transition-transform duration-300 group-hover:rotate-180 group-hover:text-emerald-400" />
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `block px-2 2xl:px-2.5 py-2 text-[12.5px] 2xl:text-[13.5px] font-semibold transition-colors rounded-full focus-visible:outline-emerald-500 whitespace-nowrap ${isActive
                      ? 'text-white bg-emerald-600 font-bold shadow-sm'
                      : 'text-[#F0F0F0] hover:text-[#FFFFFF] hover:bg-[#454242]'
                      }`}
                  >
                    {item.name}
                  </NavLink>
                )}

                {/* Submenu Dropdown */}
                {item.submenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-[#454242] border border-[#585454] rounded-2xl shadow-2xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top scale-95 group-hover:scale-100">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 border-8 border-transparent border-b-[#454242]" />
                    {item.submenu.map((sub, sIdx) => (
                      sub.external ? (
                        <a
                          key={sIdx}
                          href={sub.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-6 py-2.5 text-[14px] font-medium text-[#F0F0F0] hover:text-emerald-300 hover:bg-[#514E4E] transition-all duration-150"
                        >
                          {sub.name}
                        </a>
                      ) : (
                        <NavLink
                          key={sIdx}
                          to={sub.path}
                          end
                          className={({ isActive }) => `block px-6 py-2.5 text-[14px] font-medium transition-all duration-150 ${isActive
                            ? 'text-emerald-300 bg-[#514E4E] font-bold'
                            : 'text-[#F0F0F0] hover:text-emerald-300 hover:bg-[#514E4E]'
                            }`}
                        >
                          {sub.name}
                        </NavLink>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden xl:flex items-center gap-2 2xl:gap-3 shrink-0">
            <Link to="/book">
              <Button variant="primary" size="xs" icon={Calendar} iconPosition="left" className="font-bold">
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Mobile Header Actions with Generous Touch Targets */}
          <div className="flex xl:hidden items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href="tel:+17045039338"
              className="p-2.5 bg-[#454242] text-emerald-300 rounded-full border border-[#585454] flex items-center justify-center focus-visible:outline-emerald-500 min-w-[44px] min-h-[44px] active:scale-95 transition-transform"
              aria-label="Call Clinic"
            >
              <Phone className="h-5 w-5" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 text-[#FFFFFF] rounded-xl bg-[#454242] hover:bg-[#514E4E] border border-[#585454] flex items-center justify-center focus:outline-none cursor-pointer min-w-[44px] min-h-[44px] active:scale-95 transition-transform"
              aria-expanded={isOpen}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. MOBILE FULL-SCREEN OVERLAY MENU */}
      <div className={`fixed inset-0 top-[72px] sm:top-[82px] md:top-[128px] z-40 bg-[#323030] border-t border-[#585454] xl:hidden flex flex-col justify-between overflow-y-auto transition-all duration-300 transform ${isOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'
        }`}>
        {/* Navigation Items list */}
        <div className="px-6 py-6 space-y-2 flex-1">
          {navItems.map((item, index) => (
            <div key={index} className="border-b border-[#585454] pb-2 last:border-0">
              {item.submenu ? (
                <div>
                  <button
                    onClick={(e) => toggleDropdown(index, e)}
                    className="w-full flex items-center justify-between py-2.5 text-lg font-bold text-[#FFFFFF] text-left focus:outline-none"
                  >
                    {item.name}
                    <ChevronDown className={`h-5 w-5 text-[#D1D5DB] transition-transform duration-300 ${activeDropdown === index ? 'rotate-180 text-emerald-400' : ''
                      }`} />
                  </button>

                  {/* Mobile Submenu items */}
                  <div className={`mt-1 pl-4 space-y-1 transition-all duration-300 overflow-hidden ${activeDropdown === index ? 'max-h-[460px] opacity-100 py-1' : 'max-h-0 opacity-0'
                    }`}>
                    {item.submenu.map((sub, sIdx) => (
                      sub.external ? (
                        <a
                          key={sIdx}
                          href={sub.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-2.5 text-base font-medium text-[#F0F0F0] hover:text-emerald-300"
                        >
                          {sub.name}
                        </a>
                      ) : (
                        <Link
                          key={sIdx}
                          to={sub.path}
                          className="block py-2.5 text-base font-medium text-[#F0F0F0] hover:text-emerald-300"
                        >
                          {sub.name}
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className="block py-2.5 text-lg font-bold text-[#FFFFFF] hover:text-emerald-300"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile menu bottom contact details */}
        <div className="p-6 bg-[#2E2C2C] border-t border-[#585454] space-y-4">
          <div className="space-y-2 text-sm text-[#F0F0F0]">
            <a
              href="https://maps.app.goo.gl/Cpc15Mb3JtU5n8Ho7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-medium hover:text-emerald-300 transition-colors"
            >
              <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>6429 Bannington Road, Suite B, Charlotte, NC</span>
            </a>
            <p className="flex items-center gap-2 text-[#D1D5DB]">
              <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
              Mon - Fri: 8:00 AM - 5:00 PM
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Link to="/book" className="w-full">
              <Button variant="primary" className="w-full font-bold" icon={Calendar}>
                Book Appointment
              </Button>
            </Link>
            <a href="tel:+17045039338" className="w-full">
              <Button variant="secondary" className="w-full" icon={Phone}>
                Call +1 704-503-9338
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
