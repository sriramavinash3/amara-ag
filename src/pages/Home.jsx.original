import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Zap, Shield, Smile, Star, Award, CheckCircle2, 
  ArrowRight, Phone, Calendar, Clock, MapPin, Sparkles, AlertCircle 
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { conditions, treatments, blogPosts } from '../utils/medicalData';

export default function Home() {
  const [activeTreatmentTab, setActiveTreatmentTab] = useState('epidural-injections');

  const highlightGrid = [
    { title: 'Restore Function', desc: 'Restore better quality of life and reclaim active days.', icon: Activity },
    { title: 'Quality Pain-Free Time', desc: 'Helping you find comfortable, pain-free daily moments.', icon: Sparkles },
    { title: 'Double Board Certified', desc: 'Evidence-based, safe interventional pain care.', icon: Award },
    { title: 'Caring Clinical Staff', desc: 'We listen to, understand, and validate your pain.', icon: Smile },
    { title: 'Result-Oriented Plans', desc: 'Tailored treatments engineered for optimum outcomes.', icon: CheckCircle2 },
  ];

  const testimonialVideos = [
    {
      title: "SI Joint Pain & Needle Phobia Relief",
      embedId: "nMBF_8eDTFo",
      desc: "Knee and joint pain patient sharing their anxiety-free treatment experience."
    },
    {
      title: "Sacroiliac Joint & Back Pain Recovery",
      embedId: "TKW6w1Y_IYQ",
      desc: "Patient sharing their journey to pain-free walking after targeted therapy."
    }
  ];

  const googleReviews = [
    { name: "Sarah M.", rating: 5, date: "2 weeks ago", text: "Dr. Amara is wonderful! He actually listened to my pain concerns after years of other doctors brushing me off. The injections have given me my life back." },
    { name: "Robert K.", rating: 5, date: "1 month ago", text: "Independent clinic with zero hidden hospital fees. Flat rates are highly transparent. Excellent double board-certified treatment for my sciatica." },
    { name: "Elena D.", rating: 5, date: "3 months ago", text: "The medical weight loss program combined with knee blocks changed everything. I have lost 25 pounds and can walk upstairs without knee pain!" }
  ];

  const insuranceLogos = [
    "Medicare", "Medicaid", "Blue Cross Blue Shield", "Medcost", "United Healthcare", 
    "Cigna", "Aetna", "Humana", "Novant Employee Plan", "Workers' Comp"
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-white via-medical-50/30 to-slate-100 py-20 md:py-28 px-4 md:px-8 overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-96 h-96 bg-medical-100/40 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100/30 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="secondary" className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-medical-100 text-medical-700">
              Double Board-Certified Pain Care
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-primary-900 leading-[1.1]">
              Restore Your Active Life, <span className="text-medical-600">Pain-Free</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-700 leading-relaxed max-w-2xl">
              Precision interventional pain management and spine care in Charlotte, NC. We locate the exact source of your pain and deliver evidence-based, minimally invasive relief.
            </p>

            {/* Flat Fee Highlight Card */}
            <div className="inline-flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-premium max-w-md">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Shield className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm text-primary-900">Zero Hospital Facility Fees</h4>
                <p className="text-xs text-slate-500">We charge one flat, affordable office fee. No hidden costs.</p>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/book">
                <Button variant="primary" size="lg" icon={Calendar}>
                  Book Appointment
                </Button>
              </Link>
              <a href="tel:7045039338">
                <Button variant="outline" size="lg" icon={Phone}>
                  Call: 704-503-9338
                </Button>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/60 max-w-lg text-left">
              <div>
                <span className="block text-3xl font-black font-heading text-primary-900">15+</span>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Years Experience</span>
              </div>
              <div>
                <span className="block text-3xl font-black font-heading text-primary-900">0</span>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Facility Fees</span>
              </div>
              <div>
                <span className="block text-3xl font-black font-heading text-primary-900">100%</span>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Patient-Centered</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[420px] aspect-square rounded-3xl bg-gradient-to-tr from-medical-600 to-accent-500 p-1 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-primary-900/10 mix-blend-multiply" />
              {/* Premium Abstract Health Grid Layout */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-white z-10">
                <div className="flex justify-between items-start">
                  <Badge variant="primary" className="bg-white/20 text-white backdrop-blur-md border border-white/20">
                    Charlotte Clinic
                  </Badge>
                  <Activity className="h-8 w-8 text-white/80 animate-pulse" />
                </div>
                <div className="space-y-2 text-left">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/80">Pain &amp; Spine Specialist</span>
                  <h3 className="text-2xl font-bold font-heading">Dr. Ashvin K. Amara, MD</h3>
                  <p className="text-sm text-white/90">Anesthesiology &amp; Interventional Pain Medicine Fellowship Trained</p>
                </div>
              </div>
              {/* Visual geometric grid lines */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent" />
            </div>
            
            {/* Floating Quick Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:flex items-center gap-3 animate-bounce-slow">
              <div className="p-2 bg-accent-50 text-accent-600 rounded-xl">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Insurances</span>
                <span className="text-sm font-bold text-primary-900">BCBS &amp; Medicare Accepted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HIGHLIGHTS GRID */}
      <section className="py-12 bg-white px-4 md:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {highlightGrid.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col text-left space-y-2.5 p-4 rounded-xl hover:bg-slate-50 transition-colors duration-300">
                  <div className="p-2 bg-medical-50 text-medical-600 rounded-xl self-start">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-base text-primary-900">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE PAIN SELECTOR (CONDITIONS) */}
      <section className="py-20 bg-slate-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4 max-w-3xl mx-auto">
            <Badge variant="accent" className="bg-accent-100 text-accent-700">
              Conditions We Treat
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black font-heading tracking-tight text-primary-900">
              Where is Your Pain?
            </h2>
            <p className="text-base md:text-lg text-primary-700">
              Select your primary area of discomfort to explore diagnostic details, common causes, and non-surgical relief options.
            </p>
          </div>

          {/* Conditions Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(conditions).map((cond) => (
              <Card 
                key={cond.id} 
                hoverable 
                variant="white"
                className="flex flex-col justify-between text-left h-full group"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-medical-50 text-medical-600 rounded-2xl w-12 h-12 flex items-center justify-center group-hover:bg-medical-600 group-hover:text-white transition-colors duration-300">
                    <Activity className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-primary-900">{cond.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{cond.shortDesc}</p>
                </div>
                
                <div className="pt-6 mt-4 border-t border-slate-50">
                  <Link 
                    to={`/conditions/${cond.id}`}
                    className="inline-flex items-center text-sm font-bold text-medical-600 hover:text-medical-700 gap-1.5"
                  >
                    <span>Relief Options</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="pt-4">
            <Link to="/conditions">
              <Button variant="outline" icon={ArrowRight} iconPosition="right">
                View All Conditions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. TREATMENTS SHOWCASE (TABBED INTERACTIVE PANEL) */}
      <section className="py-20 bg-white px-4 md:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4 max-w-3xl mx-auto">
            <Badge variant="secondary" className="bg-medical-100 text-medical-700">
              Advanced Clinical Procedures
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black font-heading tracking-tight text-primary-900">
              Precision-Guided Treatments
            </h2>
            <p className="text-base md:text-lg text-primary-700">
              We specialize in state-of-the-art outpatient procedures performed under high-definition fluoroscopy and ultrasound.
            </p>
          </div>

          {/* Tabs Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            
            {/* Tabs List (Left) */}
            <div className="lg:col-span-4 space-y-2 flex flex-col">
              {Object.values(treatments).map((treat) => (
                <button
                  key={treat.id}
                  onClick={() => setActiveTreatmentTab(treat.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl font-bold transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    activeTreatmentTab === treat.id
                      ? 'bg-medical-600 text-white shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 text-primary-800'
                  }`}
                >
                  <span>{treat.title}</span>
                  <ArrowRight className={`h-4 w-4 transition-transform duration-200 ${
                    activeTreatmentTab === treat.id ? 'translate-x-0' : '-translate-x-2 opacity-0'
                  }`} />
                </button>
              ))}
            </div>

            {/* Tab Content Display (Right) */}
            <div className="lg:col-span-8">
              {Object.values(treatments).map((treat) => {
                if (treat.id !== activeTreatmentTab) return null;
                return (
                  <Card key={treat.id} variant="white" padding="lg" className="h-full flex flex-col justify-between border-slate-100 shadow-premium-hover">
                    <div className="space-y-6">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                        <h3 className="text-2xl md:text-3xl font-black font-heading text-primary-900">
                          {treat.title}
                        </h3>
                        <Badge variant="accent">Outpatient Procedure</Badge>
                      </div>

                      <div className="space-y-4">
                        <p className="text-primary-700 leading-relaxed text-base">
                          {treat.overview}
                        </p>
                        
                        {/* Benefits list */}
                        <div className="space-y-2.5 pt-2">
                          <h4 className="font-bold text-sm text-primary-900 uppercase tracking-wider">Key Advantages:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-primary-700">
                            {treat.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4.5 w-4.5 text-accent-500 shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 mt-6 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                      <span className="text-sm text-slate-500 flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-medical-600" />
                        Quick recovery: typically 1-3 days.
                      </span>
                      <Link to={`/treatments/${treat.id}`}>
                        <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                          Detailed Procedure Guide
                        </Button>
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 5. DOCTOR SPOTLIGHT & WHY CHOOSE US */}
      <section className="py-20 bg-slate-50 px-4 md:px-8 border-b border-slate-100" id="meet-staff">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Certifications & Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <Badge variant="primary" className="bg-cta-100 text-cta-700">
                Meet Your Specialist
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black font-heading tracking-tight text-primary-900">
                Dr. Ashvin K. Amara, MD
              </h2>
              <h4 className="text-lg font-bold text-medical-600 leading-none mt-1">
                Double Board-Certified Pain Management Specialist
              </h4>
              
              <p className="text-base text-primary-700 leading-relaxed">
                Dr. Ashvin K. Amara, MD, is a highly trusted double board-certified physician in both Anesthesiology and Interventional Pain Medicine. He completed his comprehensive fellowship training in pain management and has dedicated over 15 years to helping patients in Charlotte, NC, find relief from complex chronic and acute pain conditions.
              </p>

              <p className="text-base text-primary-700 leading-relaxed">
                Our core clinic value is simple: **We value the human element and your pain relief.** We listen to your concerns, locate the exact pain generators, and design personalized plans utilizing the least invasive interventional treatments.
              </p>

              {/* Bulleted credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-primary-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent-500 shrink-0" />
                  <div>
                    <strong className="text-primary-900 block">Double Board Certified</strong>
                    American Board of Anesthesiology
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent-500 shrink-0" />
                  <div>
                    <strong className="text-primary-900 block">Fellowship Trained</strong>
                    Interventional Pain Medicine Specialist
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent-500 shrink-0" />
                  <div>
                    <strong className="text-primary-900 block">Languages Spoken</strong>
                    English, Spanish, Hindi, Telugu
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent-500 shrink-0" />
                  <div>
                    <strong className="text-primary-900 block">Independent Clinic</strong>
                    No hospital markup or facility fees
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/about">
                  <Button variant="secondary" icon={ArrowRight} iconPosition="right">
                    Read Dr. Amara's Story
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Doctor Spotlight Visual Cards */}
            <div className="lg:col-span-5 space-y-4">
              <Card variant="white" padding="md" className="border-slate-100 shadow-premium relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-medical-50 rounded-full blur-2xl -z-10" />
                
                {/* Certification stamp */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-medical-50 text-medical-600 rounded-2xl">
                    <Award className="h-7 w-7" />
                  </div>
                  <Badge variant="success">Active Certifications</Badge>
                </div>

                <div className="space-y-4 text-left">
                  <h4 className="font-bold text-base text-primary-900 uppercase tracking-wider">Clinical Board Certifications:</h4>
                  <ul className="space-y-3 text-sm text-primary-700">
                    <li className="flex gap-2">
                      <span className="font-bold text-medical-600 shrink-0">&bull;</span>
                      <span>Board Certified in <strong>Pain Medicine</strong> - American Board of Anesthesiology</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-medical-600 shrink-0">&bull;</span>
                      <span>Board Certified in <strong>Anesthesiology</strong> - American Board of Anesthesiology</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-medical-600 shrink-0">&bull;</span>
                      <span>Licensed Provider in the state of <strong>North Carolina</strong></span>
                    </li>
                  </ul>
                </div>
              </Card>

              {/* Office hours snippet card */}
              <Card variant="slate" padding="sm" className="flex items-center gap-4 text-left border-slate-200">
                <Clock className="h-8 w-8 text-medical-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-primary-900">Convenient Office Hours</h4>
                  <p className="text-xs text-slate-500">Monday through Friday: 8:00 AM to 5:00 PM. Same-week appointments are often available.</p>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* 6. PATIENT TESTIMONIALS (VIDEOS & TEXT REVIEWS) */}
      <section className="py-20 bg-white px-4 md:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4 max-w-3xl mx-auto">
            <Badge variant="accent" className="bg-accent-100 text-accent-700">
              Patient Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black font-heading tracking-tight text-primary-900">
              What Our Pain Patients Share
            </h2>
            <p className="text-base md:text-lg text-primary-700">
              Real patients sharing their clinical experiences, recovery stories, and returns to active daily living.
            </p>
          </div>

          {/* Embedded YouTube Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {testimonialVideos.map((video, idx) => (
              <Card key={idx} variant="white" padding="none" className="border-slate-100 shadow-premium group overflow-hidden">
                {/* Responsive Video Container */}
                <div className="relative aspect-video w-full bg-slate-900">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-primary-900 group-hover:text-medical-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {video.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Google Text Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
            {googleReviews.map((review, idx) => (
              <Card key={idx} variant="slate" padding="md" className="border-slate-200 relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-bold text-primary-900 block">{review.name}</span>
                    <span className="text-xs text-slate-500">{review.date}</span>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-primary-700 leading-relaxed italic">
                  "{review.text}"
                </p>
                {/* Visual Google Star Overlay */}
                <span className="absolute bottom-4 right-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                  Google Review
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INSURANCE & QUICK INTAKE */}
      <section className="py-20 bg-slate-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Insurance Info */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <Badge variant="primary" className="bg-medical-100 text-medical-700">
                Billing &amp; Access
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black font-heading tracking-tight text-primary-900">
                Accepted Insurances &amp; Billing
              </h2>
              <p className="text-base text-primary-700 leading-relaxed">
                We work diligently with major insurance networks to make double board-certified interventional pain care accessible and affordable. We accept Medicare, Medicaid, workers' compensation, and most major commercial networks.
              </p>

              {/* Insurance Grid Layout */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                {insuranceLogos.map((logo, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2 p-3 bg-white border border-slate-200/60 rounded-xl font-semibold text-sm text-primary-800 shadow-sm"
                  >
                    <CheckCircle2 className="h-4.5 w-4.5 text-accent-500 shrink-0" />
                    <span>{logo}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-xs text-amber-900 leading-relaxed max-w-xl">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>No Doctor Referral Needed:</strong> Patients can schedule consultations directly without an existing referral. For referring physicians, we provide rapid same-week schedule slots and direct clinical feedback.
                </p>
              </div>
            </div>

            {/* Right: Intake Forms Card */}
            <div className="lg:col-span-5">
              <Card variant="white" padding="lg" className="border-slate-100 shadow-2xl relative text-left space-y-6">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-50 rounded-full blur-xl -z-10" />
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-heading text-primary-900">
                    Patient Referral &amp; Intake
                  </h3>
                  <p className="text-sm text-slate-500">
                    Please download, print, and fill out our registration packets in advance to streamline your check-in process.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Referral PDF download button */}
                  <a 
                    href="https://amarapain.com/wp-content/uploads/2025/06/Referral-package-APS.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors group cursor-pointer"
                  >
                    <div>
                      <span className="block font-bold text-sm text-primary-900 group-hover:text-medical-600 transition-colors">
                        Referral Package (APS-Referral)
                      </span>
                      <span className="text-xs text-slate-500">Official physician referral guidelines [PDF]</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </a>

                  {/* Intake DOCX download button */}
                  <a 
                    href="https://amarapain.com/wp-content/themes/amara-pain/documents/APS-New-patient-intake-form.docx" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors group cursor-pointer"
                  >
                    <div>
                      <span className="block font-bold text-sm text-primary-900 group-hover:text-medical-600 transition-colors">
                        New Patient Intake Pack
                      </span>
                      <span className="text-xs text-slate-500">Demographics &amp; history form [DOCX]</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link to="/book" className="w-full block text-center">
                    <Button variant="primary" className="w-full" icon={Calendar}>
                      Book Appointment Online
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
