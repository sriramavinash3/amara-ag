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
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setIsOpen(false);
    setActiveDropdown(null);
  }

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
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#FAF9F7] shadow-xs border-b border-[#E8E5DF]">
      {/* 1. TOP SUBHEADER BAR */}
      <div className="w-full bg-[#F5F3EF] text-[#4A4846] text-xs py-2 border-b border-[#E8E5DF] hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-3">
          {/* Clinic Details */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a
              href="https://maps.app.goo.gl/Cpc15Mb3JtU5n8Ho7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#4A4846] hover:text-[#047857] transition-colors font-medium"
            >
              <MapPin className="h-3.5 w-3.5 text-[#059669] shrink-0" />
              6429 Bannington Road, Suite B, Charlotte, NC 28226
            </a>
            <span className="flex items-center gap-1.5 text-[#6B6864]">
              <Clock className="h-3.5 w-3.5 text-[#059669] shrink-0" />
              Mon - Fri: 8:00 AM - 5:00 PM
            </span>
          </div>

          {/* Action Contacts */}
          <div className="flex items-center gap-x-6">
            <span className="text-[#6B6864] font-medium">Fax: 704-503-9339</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <nav className={`w-full transition-all duration-300 ${scrolled
        ? 'bg-[#FAF9F7]/95 backdrop-blur-md shadow-sm py-2'
        : 'bg-[#FAF9F7] py-3 border-b border-[#E8E5DF]'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-3">
          {/* Dark Logo Version with Balanced Proportions on Warm Light Background */}
          <Link to="/" className="flex items-center focus-visible:outline-2 focus-visible:outline-emerald-600 rounded-lg py-0.5 shrink-0" aria-label="Amara Pain & Spine Home">
            <img
              src="/images/AmaraPain_Logo.png"
              alt="Amara Pain & Spine logo"
              className="h-10 sm:h-12 md:h-13 lg:h-[54px] xl:h-[58px] 2xl:h-[64px] w-auto object-contain shrink-0 transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation Links — ~20% Larger Typography (15px/16px) with Rebalanced Gaps */}
          <div className="hidden xl:flex items-center gap-x-0.5 2xl:gap-x-1.5 min-w-0">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.submenu ? (
                  <button
                    onClick={(e) => toggleDropdown(index, e)}
                    className="flex items-center gap-1 px-2.5 2xl:px-3 py-1.5 text-[14.5px] 2xl:text-[15.5px] font-semibold text-[#1C1C1C] hover:text-[#047857] hover:bg-[#EFECE6] transition-colors rounded-full cursor-pointer focus-visible:outline-emerald-600 whitespace-nowrap tracking-tight"
                  >
                    {item.name}
                    <ChevronDown className="h-3.5 w-3.5 text-[#6B6864] transition-transform duration-300 group-hover:rotate-180 group-hover:text-[#047857]" />
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `block px-2.5 2xl:px-3 py-1.5 text-[14.5px] 2xl:text-[15.5px] font-semibold transition-colors rounded-full focus-visible:outline-emerald-600 whitespace-nowrap tracking-tight ${isActive
                      ? 'text-[#065F46] bg-[#E6F4EA] font-bold shadow-xs'
                      : 'text-[#1C1C1C] hover:text-[#047857] hover:bg-[#EFECE6]'
                      }`}
                  >
                    {item.name}
                  </NavLink>
                )}

                {/* Submenu Dropdown */}
                {item.submenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-[#FAF9F7] border border-[#E8E5DF] rounded-2xl shadow-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top scale-95 group-hover:scale-100">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 border-8 border-transparent border-b-[#FAF9F7]" />
                    {item.submenu.map((sub, sIdx) => (
                      sub.external ? (
                        <a
                          key={sIdx}
                          href={sub.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-5 py-2.5 text-[15px] font-medium text-[#1C1C1C] hover:text-[#047857] hover:bg-[#EFECE6] transition-all duration-150"
                        >
                          {sub.name}
                        </a>
                      ) : (
                        <NavLink
                          key={sIdx}
                          to={sub.path}
                          end
                          className={({ isActive }) => `block px-5 py-2.5 text-[15px] font-medium transition-all duration-150 ${isActive
                            ? 'text-[#065F46] bg-[#E6F4EA] font-bold'
                            : 'text-[#1C1C1C] hover:text-[#047857] hover:bg-[#EFECE6]'
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
              <Button variant="primary" size="xs" icon={Calendar} iconPosition="left" className="font-bold shadow-sm">
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Mobile Header Actions with Generous Touch Targets */}
          <div className="flex xl:hidden items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href="tel:+17045039338"
              className="p-2.5 bg-[#F4F2EE] text-[#047857] hover:bg-[#EAE7E1] rounded-full border border-[#E8E5DF] flex items-center justify-center focus-visible:outline-emerald-600 min-w-[44px] min-h-[44px] active:scale-95 transition-transform"
              aria-label="Call Clinic"
            >
              <Phone className="h-5 w-5" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 text-[#1C1C1C] rounded-xl bg-[#F4F2EE] hover:bg-[#EAE7E1] border border-[#E8E5DF] flex items-center justify-center focus:outline-none cursor-pointer min-w-[44px] min-h-[44px] active:scale-95 transition-transform"
              aria-expanded={isOpen}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. MOBILE FULL-SCREEN OVERLAY MENU */}
      <div className={`fixed inset-0 top-[72px] sm:top-[76px] md:top-[112px] z-40 bg-[#FAF9F7] border-t border-[#E8E5DF] xl:hidden flex flex-col justify-between overflow-y-auto transition-all duration-300 transform ${isOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'
        }`}>
        {/* Navigation Items list */}
        <div className="px-6 py-6 space-y-2 flex-1">
          {navItems.map((item, index) => (
            <div key={index} className="border-b border-[#E8E5DF] pb-2 last:border-0">
              {item.submenu ? (
                <div>
                  <button
                    onClick={(e) => toggleDropdown(index, e)}
                    className="w-full flex items-center justify-between py-2.5 text-lg font-bold text-[#1C1C1C] text-left focus:outline-none"
                  >
                    {item.name}
                    <ChevronDown className={`h-5 w-5 text-[#6B6864] transition-transform duration-300 ${activeDropdown === index ? 'rotate-180 text-[#047857]' : ''
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
                          className="block py-2.5 text-base font-semibold text-[#1C1C1C] hover:text-[#047857]"
                        >
                          {sub.name}
                        </a>
                      ) : (
                        <Link
                          key={sIdx}
                          to={sub.path}
                          className="block py-2.5 text-base font-semibold text-[#1C1C1C] hover:text-[#047857]"
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
                  className="block py-2.5 text-lg font-bold text-[#1C1C1C] hover:text-[#047857]"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile menu bottom contact details */}
        <div className="p-6 bg-[#F5F3EF] border-t border-[#E8E5DF] space-y-4">
          <div className="space-y-2 text-sm text-[#4A4846]">
            <a
              href="https://maps.app.goo.gl/Cpc15Mb3JtU5n8Ho7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-medium hover:text-[#047857] transition-colors"
            >
              <MapPin className="h-4 w-4 text-[#059669] shrink-0" />
              <span>6429 Bannington Road, Suite B, Charlotte, NC</span>
            </a>
            <p className="flex items-center gap-2 text-[#6B6864]">
              <Clock className="h-4 w-4 text-[#059669] shrink-0" />
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
