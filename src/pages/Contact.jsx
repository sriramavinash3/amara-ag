import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Printer, Send, Bus, Car, Navigation, CheckCircle2, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/skeuomorphic.css';

export default function Contact() {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newLead = {
      id: 'APS-MSG-' + Date.now(),
      type: 'contact',
      dateCreated: new Date().toISOString(),
      status: 'New',
      patient: {
        firstName: formData.name.split(' ')[0] || '',
        lastName: formData.name.split(' ').slice(1).join(' ') || '',
        email: formData.email,
        phone: formData.phone,
        dob: 'N/A',
        insurance: 'N/A',
        comments: `[Subject: ${formData.subject}] ${formData.message}`
      }
    };

    try {
      const existingLeads = JSON.parse(localStorage.getItem('APS_LEADS') || '[]');
      existingLeads.unshift(newLead);
      localStorage.setItem('APS_LEADS', JSON.stringify(existingLeads));
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    } catch (error) {
      console.error("Error saving contact lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="w-full relative py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-left">

      {/* 1. PAGE HEADER */}
      <div className="space-y-4 max-w-3xl border-b border-[#585454] pb-6 relative z-10">
        <Badge variant="secondary" className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-bold uppercase tracking-widest">
          Connect With Us
        </Badge>
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-[#FFFFFF] leading-none">
          Contact Our Pain Clinic
        </h1>
        <p className="text-lg text-[#F0F0F0] leading-relaxed font-medium">
          Have questions about insurance, billing, or interventional treatments? Reach out to our care team today or find driving and public transit directions.
        </p>
      </div>

      {/* 2. CONTACT DETAILS & FORM DUAL PANEL */}
      <div className="space-y-8 relative z-10 my-8">
        {/* Hero Image */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-[#585454] bg-[#323030] group">
          <img 
            src="/images/audience/senior_clinic_welcome.jpg" 
            alt="Older African American patient arriving and being warmly greeted at clinic check-in desk"
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A3838]/85 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-[#FFFFFF]">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">Warm Clinic Welcome</span>
            <p className="text-xs font-semibold mt-0.5 leading-snug text-[#F0F0F0]">Our front desk staff is dedicated to making every visit comfortable, accessible, and unhurried.</p>
          </div>
        </div>

        {/* Two-Column Layout: Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl font-black font-heading text-[#FFFFFF]">
              Clinic Contact Points
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Phone Card */}
              <Card variant="white" padding="md" className="border-[#585454] shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex gap-4 items-start bg-[#454242] p-6 rounded-2xl">
                <Phone className="h-6 w-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-sm text-[#D1D5DB] uppercase tracking-wider">Phone</h3>
                  <a href="tel:+17045039338" className="block text-lg font-black text-emerald-400 hover:text-emerald-300 mt-1">
                    +1 704-503-9338
                  </a>
                </div>
              </Card>

              {/* Fax Card */}
              <Card variant="white" padding="md" className="border-[#585454] shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex gap-4 items-start bg-[#454242] p-6 rounded-2xl">
                <Printer className="h-6 w-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-sm text-[#D1D5DB] uppercase tracking-wider">Fax</h3>
                  <span className="block text-lg font-black text-[#FFFFFF] mt-1">704-503-9339</span>
                </div>
              </Card>

              {/* Address Card */}
              <Card variant="white" padding="md" className="border-[#585454] shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex gap-4 items-start bg-[#454242] p-6 rounded-2xl">
                <MapPin className="h-6 w-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-sm text-[#D1D5DB] uppercase tracking-wider">Location Address</h3>
                  <a 
                    href="https://maps.app.goo.gl/Cpc15Mb3JtU5n8Ho7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-lg font-black text-[#FFFFFF] hover:text-emerald-400 transition-colors leading-relaxed mt-1"
                  >
                    6429 Bannington Road, Suite B,<br />
                    Charlotte, NC 28226
                  </a>
                  <a 
                    href="https://maps.app.goo.gl/Cpc15Mb3JtU5n8Ho7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 mt-2"
                  >
                    Get Directions
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </Card>

              {/* Office Hours Card */}
              <Card variant="white" padding="md" className="border-[#585454] shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex gap-4 items-start bg-[#454242] p-6 rounded-2xl">
                <Clock className="h-6 w-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-sm text-[#D1D5DB] uppercase tracking-wider">Office Hours</h3>
                  <p className="text-sm text-[#F0F0F0] leading-relaxed mt-1 font-medium">
                    Monday - Friday: 8:00 AM - 5:00 PM
                  </p>
                  <span className="block text-xs text-[#D1D5DB] font-bold mt-1">Closed Saturday &amp; Sunday</span>
                </div>
              </Card>

              {/* Email Card */}
              <Card variant="white" padding="md" className="border-[#585454] shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex gap-4 items-start bg-[#454242] p-6 rounded-2xl">
                <Mail className="h-6 w-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-sm text-[#D1D5DB] uppercase tracking-wider">Email</h3>
                  <a href="mailto:contact@amarapain.com" className="block text-sm text-[#F0F0F0] hover:text-emerald-400 mt-1 font-medium">
                    contact@amarapain.com
                  </a>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl font-black font-heading text-[#FFFFFF]">
              Send an Inquiry
            </h2>

            <Card variant="white" padding="lg" className="border-[#585454] shadow-2xl relative bg-[#454242] p-8 rounded-2xl">
            {submitSuccess ? (
              <div className="text-center py-12 space-y-4" aria-live="polite">
                <div className="p-3 bg-emerald-950/60 text-emerald-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto border border-emerald-800/60">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#FFFFFF]">Inquiry Sent Successfully</h3>
                <p className="text-sm text-[#F0F0F0] max-w-md mx-auto">
                  Thank you for reaching out! Our clinical coordinators will review your message and contact you within 24 to 48 business hours.
                </p>
                <Button variant="secondary" size="sm" onClick={() => setSubmitSuccess(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5" aria-label="Contact clinic form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">Your Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      aria-required="true"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 bg-[#363434] border border-[#585454] text-[#FFFFFF] placeholder-[#D1D5DB] rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm transition-all duration-200"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="contact-phone" className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">Phone Number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      required
                      aria-required="true"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 704-555-0199"
                      className="w-full px-4 py-2.5 bg-[#363434] border border-[#585454] text-[#FFFFFF] placeholder-[#D1D5DB] rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    aria-required="true"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full px-4 py-2.5 bg-[#363434] border border-[#585454] text-[#FFFFFF] placeholder-[#D1D5DB] rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm transition-all duration-200"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label htmlFor="contact-subject" className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">Inquiry Subject</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#363434] border border-[#585454] rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm transition-all duration-200 text-[#FFFFFF] font-medium"
                  >
                    <option value="General Inquiry" className="bg-[#363434] text-[#FFFFFF]">General Inquiry</option>
                    <option value="Insurance & Billing Question" className="bg-[#363434] text-[#FFFFFF]">Insurance &amp; Billing Question</option>
                    <option value="Referral Coordination" className="bg-[#363434] text-[#FFFFFF]">Referral Coordination</option>
                    <option value="Prescription Refill Question" className="bg-[#363434] text-[#FFFFFF]">Prescription Refill Question</option>
                    <option value="Other Topic" className="bg-[#363434] text-[#FFFFFF]">Other Topic</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">Message / Comments</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    aria-required="true"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your question in detail..."
                    className="w-full px-4 py-2.5 bg-[#363434] border border-[#585454] text-[#FFFFFF] placeholder-[#D1D5DB] rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm transition-all duration-200"
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full font-bold"
                  loading={isSubmitting}
                  icon={Send}
                >
                  Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>

        </div>

      </div>

      {/* 3. MAPS & DRIVING DIRECTIONS SECTION */}
      <section className="space-y-6 relative z-10 my-8 pt-8 border-t border-[#585454]/60">
        <h2 className="text-3xl font-black font-heading tracking-tight text-[#FFFFFF] text-left">
          Location Map &amp; Driving Directions
        </h2>

        {/* Styled Google Map Card */}
        <Card variant="white" padding="none" className="border-[#585454] shadow-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] w-full bg-[#323030] relative group rounded-2xl">
          {/* Static premium graphic representation of a map */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-[#323030] to-[#363434] flex items-center justify-center p-6 text-center">
            <div className="space-y-4 max-w-md">
              <div className="p-3 bg-[#454242] text-emerald-400 rounded-2xl shadow-md w-14 h-14 flex items-center justify-center mx-auto border border-[#585454]">
                <MapPin className="h-7 w-7 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-lg text-[#FFFFFF]">Amara Pain &amp; Spine Management</h4>
                <a 
                  href="https://maps.app.goo.gl/Cpc15Mb3JtU5n8Ho7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-[#D1D5DB] hover:text-emerald-400 transition-colors underline decoration-dotted block"
                >
                  6429 Bannington Road, Suite B, Charlotte, NC 28226
                </a>
              </div>
              <a 
                href="https://maps.app.goo.gl/Cpc15Mb3JtU5n8Ho7" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="sm" icon={Navigation}>
                  Open in Google Maps
                </Button>
              </a>
            </div>
          </div>
          {/* Decorative geometric background lines to look like roads */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#10b981_1.5px,transparent_1.5px),linear-gradient(to_bottom,#10b981_1.5px,transparent_1.5px)] bg-[size:48px_48px] pointer-events-none" />
        </Card>

        {/* Direction Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Driving Directions */}
          <Card variant="white" padding="md" className="border-[#585454] shadow-2xl hover:border-emerald-500/50 transition-all duration-300 space-y-4 bg-[#454242] p-6 rounded-2xl h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 border-b border-[#585454] pb-2 mb-4">
                <Car className="h-5 w-5 animate-pulse" />
                <h3 className="font-bold text-base text-[#FFFFFF] font-heading">Driving Directions</h3>
              </div>
              <p className="text-xs text-[#F0F0F0] leading-relaxed font-medium mb-3">
                Driving on <strong className="text-[#FFFFFF]">I-485 outer</strong>, take <strong className="text-[#FFFFFF]">Exit 64-A</strong> to <strong className="text-[#FFFFFF]">Hwy 51 North</strong> (Pineville Matthews Rd).
              </p>
              <p className="text-xs text-[#F0F0F0] leading-relaxed font-medium mb-3">
                Turn left at <strong className="text-[#FFFFFF]">Bannington Rd</strong> (near the office complexes), and drive further down to see <strong className="text-[#FFFFFF]">Bannington Office Park</strong>.
              </p>
            </div>
            <p className="text-xs text-[#F0F0F0] leading-relaxed font-medium pt-2 border-t border-[#585454]/40">
              Drive into the office park and take two quick right turns. Our pain center is located directly in <strong className="text-[#FFFFFF]">Suite B</strong>. Call us at 704-503-9338 if you need further guidance.
            </p>
          </Card>

          {/* Card 2: Public Transit (CATS) */}
          <Card variant="white" padding="md" className="border-[#585454] shadow-2xl hover:border-emerald-500/50 transition-all duration-300 space-y-4 bg-[#454242] p-6 rounded-2xl h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 border-b border-[#585454] pb-2 mb-4">
                <Bus className="h-5 w-5 animate-pulse" />
                <h3 className="font-bold text-base text-[#FFFFFF] font-heading">CATS Bus Routes</h3>
              </div>
              <p className="text-xs text-[#F0F0F0] leading-relaxed font-medium mb-3">
                Amara Pain &amp; Spine is accessible via the <strong className="text-[#FFFFFF]">Charlotte Area Transit System (CATS)</strong> bus routes.
              </p>
              <p className="text-xs text-[#F0F0F0] leading-relaxed font-medium mb-3">
                Take the <strong className="text-[#FFFFFF]">Route 51 Bus (Pineville / Matthews)</strong>, which stops directly on Hwy 51 (Pineville-Matthews Road) near the intersection of Bannington Road.
              </p>
            </div>
            <p className="text-xs text-[#F0F0F0] leading-relaxed font-medium pt-2 border-t border-[#585454]/40">
              From the bus stop, it is a short, flat walk of approximately 3-5 minutes into Bannington Office Park, making the clinic highly accessible for all patients.
            </p>
          </Card>

          {/* Card 3: Rideshare & Taxis */}
          <Card variant="white" padding="md" className="border-[#585454] shadow-2xl hover:border-emerald-500/50 transition-all duration-300 space-y-4 bg-[#454242] p-6 rounded-2xl h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 border-b border-[#585454] pb-2 mb-4">
                <Navigation className="h-5 w-5 animate-pulse" />
                <h3 className="font-bold text-base text-[#FFFFFF] font-heading">Uber, Lyft, &amp; Taxi</h3>
              </div>
              <p className="text-xs text-[#F0F0F0] leading-relaxed font-medium mb-3">
                For patients utilizing rideshares, input the destination address exactly: <strong className="text-[#FFFFFF]">6429 Bannington Road, Suite B, Charlotte, NC 28226</strong>.
              </p>
              <p className="text-xs text-[#F0F0F0] leading-relaxed font-medium mb-3">
                Our building has a dedicated patient drop-off zone directly in front of the lobby entrance, with a ramp for wheelchair and walker accessibility.
              </p>
            </div>
            <p className="text-xs text-[#F0F0F0] leading-relaxed font-medium pt-2 border-t border-[#585454]/40">
              If you require our staff to coordinate a pickup via local taxi providers or Crown Cab post-procedure, please notify our front desk upon check-in.
            </p>
          </Card>

        </div>
      </section>

    </div>
  );
}
