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
        { name: 'Dr. Ashvin K. Amara, MD', path: '/providers/dr-ashvin-amara' },
        { name: 'Sarah Whitfield, NP', path: '/providers/sarah-whitfield' },
        { name: 'James Okafor, PA-C', path: '/providers/james-okafor' },
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
    if (window.innerWidth < 1024) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white shadow-sm">
      {/* 1. TOP SUBHEADER BAR */}
      <div className="w-full bg-primary-900 text-slate-300 text-xs py-2.5 px-4 md:px-8 border-b border-slate-800/50 hidden md:block">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          {/* Clinic Details */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a
              href="https://maps.app.goo.gl/Cpc15Mb3JtU5n8Ho7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 text-medical-500" />
              6429 Bannington Road, Suite B, Charlotte, NC 28226
            </a>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-medical-500" />
              Mon - Fri: 8:00 AM - 5:00 PM
            </span>
          </div>

          {/* Action Contacts */}
          <div className="flex items-center gap-x-6">
            <a href="tel:7045039338" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3.5 w-3.5 text-accent-500" />
              Call: <span className="font-semibold text-white">704-503-9338</span>
            </a>
            <span className="text-slate-500">|</span>
            <span>Fax: 704-503-9339</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <nav className={`w-full transition-all duration-300 ${scrolled
        ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
        : 'bg-white py-4 border-b border-slate-100'
        }`}>
        <div className=" mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-medical-600 rounded-lg pr-2">
            <img src="/images/amara_logo.png" alt="Amara logo" className="h-8 w-auto object-contain shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-xl md:text-2xl font-black font-heading text-primary-900 tracking-tight flex items-center leading-none">
                AMARA<span className="text-medical-600 ml-0.5">PAIN</span>
              </span>
              <span className="text-[9px] md:text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase mt-0.5 leading-none">
                &amp; Spine Management
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-x-1">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.submenu ? (
                  <button
                    onClick={(e) => toggleDropdown(index, e)}
                    className="flex items-center gap-1 px-1 py-2 text-[14px] xl:text-[15px] font-semibold text-primary-800 hover:text-medical-600 transition-colors rounded-full cursor-pointer focus-visible:outline-medical-600 whitespace-nowrap"
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `block px-1 py-2 text-[14px] xl:text-[15px] font-semibold transition-colors rounded-full focus-visible:outline-medical-600 whitespace-nowrap ${isActive
                      ? 'text-medical-600 bg-medical-50'
                      : 'text-primary-800 hover:text-medical-600'
                      }`}
                  >
                    {item.name}
                  </NavLink>
                )}

                {/* Submenu Dropdown */}
                {item.submenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top scale-95 group-hover:scale-100">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 border-8 border-transparent border-b-white" />
                    {item.submenu.map((sub, sIdx) => (
                      sub.external ? (
                        <a
                          key={sIdx}
                          href={sub.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-6 py-2.5 text-[14px] font-medium text-primary-700 hover:text-medical-600 hover:bg-medical-50 transition-all duration-150"
                        >
                          {sub.name}
                        </a>
                      ) : (
                        <NavLink
                          key={sIdx}
                          to={sub.path}
                          end
                          className={({ isActive }) => `block px-6 py-2.5 text-[14px] font-medium transition-all duration-150 ${isActive
                            ? 'text-medical-600 bg-medical-50 font-semibold'
                            : 'text-primary-700 hover:text-medical-600 hover:bg-slate-50'
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
          <div className="hidden xl:flex items-center gap-2 2xl:gap-4 shrink-0">
            <a href="tel:7045039338" className="text-primary-800 hover:text-medical-600 font-bold transition-colors text-sm flex items-center gap-1.5 focus-visible:outline-medical-600 rounded-full px-2 py-1 whitespace-nowrap">
              <Phone className="h-4 w-4 text-medical-600" />
              704-503-9338
            </a>
            <Link to="/book">
              <Button variant="primary" size="sm" icon={Calendar} iconPosition="left">
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex xl:hidden items-center gap-3">
            <a
              href="tel:7045039338"
              className="p-2 bg-slate-50 text-medical-600 rounded-full border border-slate-100 flex items-center justify-center focus-visible:outline-medical-600"
              aria-label="Call Clinic"
            >
              <Phone className="h-5 w-5" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-primary-900 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 flex items-center justify-center focus:outline-none cursor-pointer"
              aria-expanded={isOpen}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. MOBILE FULL-SCREEN OVERLAY MENU */}
      <div className={`fixed inset-0 top-[60px] md:top-[100px] z-40 bg-white border-t border-slate-100 xl:hidden flex flex-col justify-between overflow-y-auto transition-all duration-300 transform ${isOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'
        }`}>
        {/* Navigation Items list */}
        <div className="px-6 py-6 space-y-2 flex-1">
          {navItems.map((item, index) => (
            <div key={index} className="border-b border-slate-50 pb-2 last:border-0">
              {item.submenu ? (
                <div>
                  <button
                    onClick={(e) => toggleDropdown(index, e)}
                    className="w-full flex items-center justify-between py-2 text-lg font-bold text-primary-900 text-left focus:outline-none"
                  >
                    {item.name}
                    <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180 text-medical-600' : ''
                      }`} />
                  </button>

                  {/* Mobile Submenu items */}
                  <div className={`mt-1 pl-4 space-y-1 transition-all duration-300 overflow-hidden ${activeDropdown === index ? 'max-h-[400px] opacity-100 py-1' : 'max-h-0 opacity-0'
                    }`}>
                    {item.submenu.map((sub, sIdx) => (
                      sub.external ? (
                        <a
                          key={sIdx}
                          href={sub.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-2 text-base font-medium text-slate-600 hover:text-medical-600"
                        >
                          {sub.name}
                        </a>
                      ) : (
                        <Link
                          key={sIdx}
                          to={sub.path}
                          className="block py-2 text-base font-medium text-slate-600 hover:text-medical-600"
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
                  className="block py-2 text-lg font-bold text-primary-900 hover:text-medical-600"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile menu bottom contact details */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
          <div className="space-y-2 text-sm text-slate-600">
            <a
              href="https://maps.app.goo.gl/Cpc15Mb3JtU5n8Ho7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-medium hover:text-medical-600 transition-colors"
            >
              <MapPin className="h-4 w-4 text-medical-600 shrink-0" />
              <span>6429 Bannington Road, Suite B, Charlotte, NC</span>
            </a>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-medical-600 shrink-0" />
              Mon - Fri: 8:00 AM - 5:00 PM
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Link to="/book" className="w-full">
              <Button variant="primary" className="w-full" icon={Calendar}>
                Book Appointment
              </Button>
            </Link>
            <a href="tel:7045039338" className="w-full">
              <Button variant="outline" className="w-full text-primary-900 border-slate-300" icon={Phone}>
                Call 704-503-9338
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
