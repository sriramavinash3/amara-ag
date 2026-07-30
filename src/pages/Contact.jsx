import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Printer, Send, Info, Bus, Car, Navigation, CheckCircle2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import '../styles/skeuomorphic.css';

export default function Contact() {
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

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const newLead = {
      id: 'APS-' + Math.floor(100000 + Math.random() * 900000),
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
    <div className="w-full relative py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-16 text-left">

      {/* 1. PAGE HEADER */}
      <div className="space-y-4 max-w-3xl border-b border-slate-200 pb-8 relative z-10">
        <Badge variant="secondary" className="bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold uppercase tracking-widest">
          Connect With Us
        </Badge>
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-slate-900 leading-none">
          Contact Our Pain Clinic
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed font-medium">
          Have questions about insurance, billing, or interventional treatments? Reach out to our care team today or find driving and public transit directions.
        </p>
      </div>

      {/* 2. CONTACT DETAILS & FORM DUAL PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-2xl font-black font-heading text-slate-900">
            Clinic Contact Points
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {/* Phone & Fax Card */}
            <Card variant="white" padding="md" className="border-slate-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex gap-4 items-start console-card-3d animate-reveal-3d" style={{ animationDelay: '0.05s' }}>
              <Phone className="h-6 w-6 text-medical-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Phone &amp; Fax</h3>
                <a href="tel:7045039338" className="block text-lg font-black text-medical-600 hover:text-medical-700 mt-1">
                  704-503-9338
                </a>
                <span className="block text-xs text-slate-400 font-medium mt-1">Fax Number: 704-503-9339</span>
              </div>
            </Card>

            {/* Address Card */}
            <Card variant="white" padding="md" className="border-slate-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex gap-4 items-start console-card-3d animate-reveal-3d" style={{ animationDelay: '0.1s' }}>
              <MapPin className="h-6 w-6 text-accent-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Location Address</h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-1">
                  6429 Bannington Road, Suite B,<br />
                  Charlotte, NC 28226
                </p>
                <a 
                  href="https://maps.google.com/?q=6429+Bannington+Road,+Suite+B,+Charlotte,+NC+28226" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-accent-600 hover:text-accent-700 mt-2"
                >
                  Get Directions
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </Card>

            {/* Office Hours Card */}
            <Card variant="white" padding="md" className="border-slate-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex gap-4 items-start console-card-3d animate-reveal-3d" style={{ animationDelay: '0.15s' }}>
              <Clock className="h-6 w-6 text-cta-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Office Hours</h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-1">
                  Monday - Friday: 8:00 AM - 5:00 PM
                </p>
                <span className="block text-xs text-slate-400 font-medium mt-1">Closed Saturday &amp; Sunday</span>
              </div>
            </Card>

            {/* Email Card */}
            <Card variant="white" padding="md" className="border-slate-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex gap-4 items-start console-card-3d animate-reveal-3d" style={{ animationDelay: '0.2s' }}>
              <Mail className="h-6 w-6 text-slate-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Administrative Email</h3>
                <a href="mailto:amarapain@gmail.com" className="block text-sm text-slate-605 hover:text-medical-600 mt-1">
                  amarapain@gmail.com
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-black font-heading text-slate-900">
            Send an Inquiry
          </h2>

          <Card variant="white" padding="lg" className="border-slate-200/80 shadow-premium relative console-card-3d animate-reveal-3d" style={{ animationDelay: '0.1s' }}>
            {submitSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900">Inquiry Sent Successfully</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out! Our clinical coordinators will review your message and contact you within 24 to 48 business hours.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitSuccess(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-205 rounded-xl text-sm focus:outline-none focus:border-medical-600 focus:ring-1 focus:ring-medical-600 shadow-sm transition-all duration-200"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 704-555-0199"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-205 rounded-xl text-sm focus:outline-none focus:border-medical-600 focus:ring-1 focus:ring-medical-600 shadow-sm transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-205 rounded-xl text-sm focus:outline-none focus:border-medical-600 focus:ring-1 focus:ring-medical-600 shadow-sm transition-all duration-200"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Inquiry Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-205 rounded-xl text-sm focus:outline-none focus:border-medical-600 focus:ring-1 focus:ring-medical-600 shadow-sm transition-all duration-200 text-slate-700 font-semibold"
                  >
                    <option>General Inquiry</option>
                    <option>Insurance &amp; Billing Question</option>
                    <option>Referral Coordination</option>
                    <option>Prescription Refill Question</option>
                    <option>Other Topic</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Message / Comments</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your question in detail..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-205 rounded-xl text-sm focus:outline-none focus:border-medical-600 focus:ring-1 focus:ring-medical-600 shadow-sm transition-all duration-200"
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full bg-cta-600 hover:bg-cta-700 text-white shadow-md hover:shadow-lg"
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

      {/* 3. MAPS & DRIVING DIRECTIONS SECTION */}
      <section className="space-y-8 pt-6 relative z-10">
        <h2 className="text-3xl font-black font-heading tracking-tight text-slate-900 text-center">
          Location Map &amp; Driving Directions
        </h2>

        {/* Mock/Styled Google Map Card */}
        <Card variant="white" padding="none" className="border-slate-200/80 shadow-premium overflow-hidden aspect-[21/9] w-full bg-slate-200 relative group">
          {/* Static premium graphic representation of a map */}
          <div className="absolute inset-0 bg-gradient-to-br from-medical-50/20 via-slate-100 to-slate-200 flex items-center justify-center p-6 text-center">
            <div className="space-y-4 max-w-md">
              <div className="p-3 bg-white text-medical-600 rounded-2xl shadow-md w-14 h-14 flex items-center justify-center mx-auto border border-slate-100">
                <MapPin className="h-7 w-7 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-lg text-slate-900">Amara Pain &amp; Spine Management</h4>
                <p className="text-xs text-slate-500">6429 Bannington Road, Suite B, Charlotte, NC 28226</p>
              </div>
              <a 
                href="https://maps.google.com/?q=6429+Bannington+Road,+Suite+B,+Charlotte,+NC+28226" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="sm" icon={Navigation} className="bg-medical-600 hover:bg-medical-700 text-white">
                  Open in Google Maps
                </Button>
              </a>
            </div>
          </div>
          {/* Decorative geometric background lines to look like roads */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0284c7_1.5px,transparent_1.5px),linear-gradient(to_bottom,#0284c7_1.5px,transparent_1.5px)] bg-[size:48px_48px] pointer-events-none" />
        </Card>

        {/* Direction Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Driving Directions */}
          <Card variant="white" padding="md" className="border-slate-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-300 space-y-4">
            <div className="flex items-center gap-2 text-medical-600 border-b border-slate-100 pb-2">
              <Car className="h-5 w-5" />
              <h3 className="font-bold text-base text-slate-900 font-heading">Driving Directions</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Driving on <strong>I-485 outer</strong>, take <strong>Exit 64-A</strong> to <strong>Hwy 51 North</strong> (Pineville Matthews Rd).
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Turn left at <strong>Bannington Rd</strong> (near the office complexes), and drive further down to see <strong>Bannington Office Park</strong>.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Drive into the office park and take two quick right turns. Our pain center is located directly in <strong>Suite B</strong>. Call us at 704-503-9338 if you need further guidance.
            </p>
          </Card>

          {/* Card 2: Public Transit (CATS) */}
          <Card variant="white" padding="md" className="border-slate-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-300 space-y-4">
            <div className="flex items-center gap-2 text-accent-600 border-b border-slate-100 pb-2">
              <Bus className="h-5 w-5" />
              <h3 className="font-bold text-base text-slate-900 font-heading">CATS Bus Routes</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Amara Pain &amp; Spine is accessible via the <strong>Charlotte Area Transit System (CATS)</strong> bus routes.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Take the <strong>Route 51 Bus (Pineville / Matthews)</strong>, which stops directly on Hwy 51 (Pineville-Matthews Road) near the intersection of Bannington Road.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              From the bus stop, it is a short, flat walk of approximately 3-5 minutes into Bannington Office Park, making the clinic highly accessible for all patients.
            </p>
          </Card>

          {/* Card 3: Rideshare &amp; Taxis */}
          <Card variant="white" padding="md" className="border-slate-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-300 space-y-4">
            <div className="flex items-center gap-2 text-slate-500 border-b border-slate-100 pb-2">
              <Navigation className="h-5 w-5" />
              <h3 className="font-bold text-base text-slate-900 font-heading">Uber, Lyft, &amp; Taxi</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              For patients utilizing rideshares, input the destination address exactly: <strong>6429 Bannington Road, Suite B, Charlotte, NC 28226</strong>.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our building has a dedicated patient drop-off zone directly in front of the lobby entrance, with a ramp for wheelchair and walker accessibility.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              If you require our staff to coordinate a pickup via local taxi providers or Crown Cab post-procedure, please notify our front desk upon check-in.
            </p>
          </Card>

        </div>
      </section>

    </div>
  );
}
