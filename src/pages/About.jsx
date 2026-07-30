import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, Shield, Calendar, MapPin, Heart, BookOpen, HeartHandshake } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/skeuomorphic.css';

export default function About() {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  const staff = [
    {
      name: "Dr. Ashvin K. Amara, MD",
      role: "Founder & Lead Physician",
      credentials: "Double Board-Certified in Pain Medicine & Anesthesiology",
      bio: "Dr. Amara has spent over 15 years diagnosing and treating complex spinal and joint pain disorders. He believes in a patient-centered model that combines advanced diagnostic blocks with minimally invasive outpatient treatments, avoiding unnecessary surgery. He is double board-certified by the American Board of Anesthesiology.",
      education: [
        "Fellowship in Pain Management - Interventional Pain Medicine",
        "Residency in Anesthesiology - Board Certified",
        "Medical Doctor Degree (MD) - Double Board Certified Specialist"
      ],
      memberships: [
        "American Society of Anesthesiologists (ASA)",
        "American Society of Interventional Pain Physicians (ASIPP)",
        "North Carolina Medical Society (NCMS)"
      ]
    },
    {
      name: "Nurse Practitioners (NPs)",
      role: "Advanced Clinical Providers",
      credentials: "Board-Certified Family Nurse Practitioners",
      bio: "Our highly trained Family Nurse Practitioners work in close clinical collaboration with Dr. Amara. They provide comprehensive evaluations, trigger point injections, chronic pain management follow-ups, and metabolic coaching for our medical weight loss program. They are dedicated to validating your concerns and supporting your daily recovery.",
      education: [
        "Master of Science in Nursing (MSN) - Advanced Practice Registered Nurse",
        "Board Certified Nurse Practitioners (AANP / ANCC)",
        "Specialized Clinical Training in Myofascial Release & Joint Injections"
      ],
      memberships: [
        "American Association of Nurse Practitioners (AANP)",
        "North Carolina Nurses Association (NCNA)"
      ]
    }
  ];

  return (
    <div ref={containerRef} className="w-full relative py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-24 text-left">

      {/* 1. PAGE HEADER */}
      <div className="space-y-6 max-w-3xl border-b border-slate-200 pb-10 relative z-10 animate-reveal">
        <Badge variant="secondary" className="bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold uppercase tracking-widest">
          About Our Clinic
        </Badge>
        <h1 className="text-4xl md:text-[56px] font-extrabold font-heading tracking-tight text-slate-900 leading-[1.1]">
          Our Story &amp; Mission
        </h1>
        <p className="text-[18px] text-slate-600 font-normal leading-[1.75] max-w-[720px]">
          Amara Pain &amp; Spine Management is an independent, physician-owned practice dedicated to delivering high-quality, transparent, and patient-centered interventional pain care in Charlotte, NC.
        </p>
      </div>

      {/* 2. OUR STORY & VALUE CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10 animate-reveal">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading leading-[1.2] text-slate-900">
            Dedicated to Safe, Evidence-Based Pain Relief
          </h2>
          <p className="text-[18px] text-slate-600 font-normal leading-[1.75] max-w-[720px]">
            We believe that chronic pain management requires a comprehensive, customized approach. Pain is highly personal, and a cookie-cutter treatment plan is rarely effective. Our interventional pain specialists are dedicated to accurately diagnosing your specific pain generators using advanced diagnostic nerve blocks and imaging.
          </p>
          <p className="text-[18px] text-slate-600 font-normal leading-[1.75] max-w-[720px]">
            We strive to relieve your pain utilizing the least invasive, non-surgical treatments first, such as epidural steroid injections, radiofrequency ablation, and regenerative therapies. By focusing on joint-preservation and nerve-calming procedures, we help you restore function and find quality, pain-free moments in your daily life.
          </p>

          {/* Three core values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="p-6 bg-white border border-slate-250 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 console-card-3d animate-reveal" style={{ animationDelay: '0.05s' }}>
              <Heart className="h-6 w-6 text-medical-600 mb-2" />
              <h4 className="font-bold text-sm text-slate-900 mb-1">Human Element</h4>
              <p className="text-xs text-slate-500 leading-relaxed">We validate your pain and treat every patient with empathy.</p>
            </div>
            <div className="p-6 bg-white border border-slate-250 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 console-card-3d animate-reveal" style={{ animationDelay: '0.1s' }}>
              <Shield className="h-6 w-6 text-accent-600 mb-2" />
              <h4 className="font-bold text-sm text-slate-900 mb-1">Affordable Care</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Flat office fee with absolutely zero facility fee markups.</p>
            </div>
            <div className="p-6 bg-white border border-slate-250 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 console-card-3d animate-reveal" style={{ animationDelay: '0.15s' }}>
              <BookOpen className="h-6 w-6 text-cta-600 mb-2" />
              <h4 className="font-bold text-sm text-slate-900 mb-1">Evidence-Based</h4>
              <p className="text-xs text-slate-500 leading-relaxed">FDA-approved interventional clinical techniques.</p>
            </div>
          </div>
        </div>

        {/* Value Proposition Graphic Card */}
        <div className="lg:col-span-5">
          <Card variant="slate" padding="lg" className="border-slate-200/80 space-y-6 relative overflow-hidden bg-slate-100/50 p-8">
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-medical-100/30 rounded-full blur-2xl -z-10" />
            <h3 className="text-xl font-bold font-heading text-slate-900">
              How We Are Different
            </h3>
            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent-600 shrink-0 mt-0.5" />
                <div>
                  <strong>No Hidden Facility Fees:</strong> Unlike hospital-owned clinics, our independent practice saves you hundreds of dollars by charging a single, transparent office visit fee.
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Double Board-Certified:</strong> Directed by a physician board-certified in both pain medicine and anesthesiology.
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Personalized Care Plans:</strong> We spend the time to listen, locate the exact pain sources, and adapt plans to your physical recovery progress.
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* 3. MEET THE CLINICAL TEAM */}
      <section className="space-y-8 pt-6 relative z-10 animate-reveal">
        <div className="space-y-2">
          <Badge variant="accent" className="bg-cyan-50 text-cyan-800 border border-cyan-200 font-semibold">
            Our Medical Providers
          </Badge>
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading leading-[1.2] text-slate-900">
            Meet Our Specialist &amp; Staff
          </h2>
          <p className="text-[18px] text-slate-600 font-normal leading-[1.75] max-w-[720px]">
            Our clinical team combines decades of specialized interventional pain medicine experience to deliver safe, precise, and compassionate care.
          </p>
        </div>

        {/* Providers Details List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {staff.map((provider, idx) => (
            <Card key={idx} variant="white" padding="lg" className="border-slate-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between h-full group p-8 console-card-3d animate-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-slate-900 group-hover:text-medical-600 transition-colors">
                      {provider.name}
                    </h3>
                    <span className="text-sm font-semibold text-slate-500 block mt-0.5">{provider.role}</span>
                  </div>
                  <Badge variant={idx === 0 ? "secondary" : "accent"} className={idx === 0 ? "bg-medical-50 text-medical-800 border border-medical-100" : "bg-cyan-50 text-cyan-800 border border-cyan-100"}>
                    {idx === 0 ? "Double Board Certified" : "Clinical Partner"}
                  </Badge>
                </div>

                {/* Bio text */}
                <p className="text-[18px] text-slate-600 font-normal leading-[1.75] max-w-[720px]">
                  {provider.bio}
                </p>

                {/* Education bulleted list */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Education &amp; Training:</h4>
                  <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
                    {provider.education.map((edu, eIdx) => (
                      <li key={eIdx} className="flex gap-2">
                        <span className="font-bold text-medical-600 shrink-0">&bull;</span>
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Memberships bulleted list */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Professional Memberships:</h4>
                  <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
                    {provider.memberships.map((member, mIdx) => (
                      <li key={mIdx} className="flex gap-2">
                        <span className="font-bold text-accent-600 shrink-0">&bull;</span>
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <HeartHandshake className="h-4.5 w-4.5 text-medical-600 animate-pulse" />
                  Accepting new patients.
                </span>
                <Link to="/book">
                  <Button variant="outline" size="sm" icon={Calendar} className="hover:border-medical-600 hover:text-medical-600 text-slate-700">
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
