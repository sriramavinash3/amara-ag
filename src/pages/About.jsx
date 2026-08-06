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
      name: "Ashvin K. Amara, MD",
      role: "Founder & Medical Director",
      credentials: "Board Certified in Anesthesiology & Pain Medicine",
      bio: "Ashvin K. Amara, MD, is a highly trusted double board-certified physician in both Anesthesiology and Interventional Pain Medicine. He completed his comprehensive fellowship training in pain management and has dedicated over 15 years to helping patients in Charlotte, NC, find relief from complex chronic and acute pain conditions.",
      education: [
        "Fellowship in Interventional Pain Management – John H. Stroger Hospital of Cook County, Chicago, IL",
        "Residency in Anesthesiology – Brookdale University Hospital Medical Center, Brooklyn, NY",
        "Internship – Richmond University Medical Center, Staten Island, NY",
        "Medical Doctor (MD) – Osmania Medical College, India"
      ],
      memberships: [
        "American Society of Anesthesiologists (ASA)",
        "American Society of Interventional Pain Physicians (ASIPP)",
        "American Academy of Pain Medicine (AAPM)",
        "North American Spine Society (NASS)",
        "Spine Intervention Society (SIS)"
      ]
    },
    {
      name: "Eunice Babalola, NP, MSN",
      role: "Nurse Practitioner",
      credentials: "Board-Certified Family Nurse Practitioner",
      bio: "Eunice Babalola, NP, MSN, is a board-certified Nurse Practitioner at Amara Pain & Spine Management. She is dedicated to walking alongside patients on their path to recovery, focusing on holistic, evidence-based pain management and customized care plans to promote long-term comfort and well-being.",
      education: [
        "Master of Science in Nursing (MSN-FNP) – University of North Carolina at Charlotte (UNCC)",
        "Board Certified Family Nurse Practitioner (AANP)",
        "Board Certified Medical-Surgical Nurse (ANCC)"
      ],
      memberships: [
        "American Nurses Association (ANA)",
        "North Carolina Nurses Association (NCNA)"
      ]
    },
    {
      name: "Alexander Carmenaty Rodriguez, MSN, FNP-C",
      role: "Nurse Practitioner",
      credentials: "Board-Certified Family Nurse Practitioner",
      bio: "Alexander Carmenaty Rodriguez, MSN, FNP-C, is a board-certified Nurse Practitioner at Amara Pain & Spine Management. He possesses a diverse international background in healthcare, enabling him to identify patient needs and develop highly effective medical plans and treatments.",
      education: [
        "Master of Science in Nursing (MSN-FNP) – South University, Savannah, GA",
        "Doctor of Medicine (MD Equivalent) / Family Physician Training – Cuba",
        "Advanced Life Support (ALS) Certified"
      ],
      memberships: [
        "American Association of Nurse Practitioners (AANP)"
      ]
    }
  ];

  return (
    <div ref={containerRef} className="w-full relative py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-20 text-left">

      {/* 1. PAGE HEADER */}
      <div className="space-y-6 max-w-3xl border-b border-stone-200 pb-10 relative z-10 animate-reveal">
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-850 border border-emerald-200 font-bold uppercase tracking-widest">
          About Our Clinic
        </Badge>
        <h1 className="text-4xl md:text-[56px] font-extrabold font-heading tracking-tight text-stone-905 leading-[1.1]">
          Our Story &amp; Mission
        </h1>
        <p className="text-[18px] text-stone-600 font-normal leading-[1.75] max-w-[720px]">
          Amara Pain &amp; Spine Management is an independent, physician-owned practice dedicated to delivering high-quality, transparent, and patient-centered interventional pain care in Charlotte, NC.
        </p>
      </div>

      {/* 2. OUR STORY & VALUE CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10 animate-reveal">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading leading-[1.2] text-stone-900">
            Dedicated to Safe, Evidence-Based Pain Relief
          </h2>
          <p className="text-[18px] text-stone-600 font-normal leading-[1.75] max-w-[720px]">
            We believe that chronic pain management requires a comprehensive, customized approach. Pain is highly personal, and a cookie-cutter treatment plan is rarely effective. Our interventional pain specialists are dedicated to accurately diagnosing your specific pain generators using advanced diagnostic nerve blocks and imaging.
          </p>
          <p className="text-[18px] text-stone-600 font-normal leading-[1.75] max-w-[720px]">
            We strive to relieve your pain utilizing the least invasive, non-surgical treatments first, such as epidural steroid injections, radiofrequency ablation, and regenerative therapies. By focusing on joint-preservation and nerve-calming procedures, we help you restore function and find quality, pain-free moments in your daily life.
          </p>

          {/* Three core values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 console-card-3d animate-reveal" style={{ animationDelay: '0.05s' }}>
              <Heart className="h-6 w-6 text-emerald-600 mb-2" />
              <h4 className="font-bold text-sm text-stone-900 mb-1">Human Element</h4>
              <p className="text-xs text-stone-500 leading-relaxed">We validate your pain and treat every patient with empathy.</p>
            </div>
            <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 console-card-3d animate-reveal" style={{ animationDelay: '0.1s' }}>
              <Shield className="h-6 w-6 text-emerald-600 mb-2" />
              <h4 className="font-bold text-sm text-stone-900 mb-1">Affordable Care</h4>
              <p className="text-xs text-stone-500 leading-relaxed">Flat office fee with absolutely zero facility fee markups.</p>
            </div>
            <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 console-card-3d animate-reveal" style={{ animationDelay: '0.15s' }}>
              <BookOpen className="h-6 w-6 text-emerald-600 mb-2" />
              <h4 className="font-bold text-sm text-stone-900 mb-1">Evidence-Based</h4>
              <p className="text-xs text-stone-500 leading-relaxed">FDA-approved interventional clinical techniques.</p>
            </div>
          </div>
        </div>

        {/* Value Proposition Graphic Card */}
        <div className="lg:col-span-5">
          <Card variant="slate" padding="lg" className="border-stone-200 space-y-6 relative overflow-hidden bg-stone-50 p-8">
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-100/10 rounded-full blur-2xl -z-10" />
            <h3 className="text-xl font-bold font-heading text-stone-900">
              How We Are Different
            </h3>
            <ul className="space-y-4 text-sm text-stone-700">
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>No Hidden Facility Fees:</strong> Unlike hospital-owned clinics, our independent practice saves you hundreds of dollars by charging a single, transparent office visit fee.
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Double-Certified Specialist:</strong> Directed by a physician certified in both pain medicine and anesthesiology.
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
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
          <Badge variant="accent" className="bg-emerald-50 text-emerald-850 border border-emerald-250 font-semibold">
            Our Medical Providers
          </Badge>
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading leading-[1.2] text-stone-900">
            Meet Our Specialist &amp; Staff
          </h2>
          <p className="text-[18px] text-stone-600 font-normal leading-[1.75] max-w-[720px]">
            Our clinical team combines decades of specialized interventional pain medicine experience to deliver safe, precise, and compassionate care.
          </p>
        </div>

        {/* Providers Details List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {staff.map((provider, idx) => (
            <Card key={idx} variant="white" padding="lg" className="border-stone-200 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between h-full group p-8 console-card-3d animate-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-stone-100 pb-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-stone-900 group-hover:text-emerald-700 transition-colors">
                      {provider.name}
                    </h3>
                    <span className="text-sm font-semibold text-stone-500 block mt-0.5">{provider.role}</span>
                  </div>
                  <Badge variant={idx === 0 ? "secondary" : "accent"} className={idx === 0 ? "bg-emerald-50 text-emerald-800 border border-emerald-100" : "bg-stone-100 text-stone-700 border border-stone-200"}>
                    {idx === 0 ? "Double-Certified Specialist" : "Clinical Partner"}
                  </Badge>
                </div>

                {/* Bio text */}
                <p className="text-[18px] text-stone-600 font-normal leading-[1.75] max-w-[720px]">
                  {provider.bio}
                </p>

                {/* Education bulleted list */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wider">Education &amp; Training:</h4>
                  <ul className="space-y-3 text-xs text-stone-700 leading-relaxed">
                    {provider.education.map((edu, eIdx) => (
                      <li key={eIdx} className="flex gap-2">
                        <span className="font-bold text-emerald-600 shrink-0">&bull;</span>
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Memberships bulleted list */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wider">Professional Memberships:</h4>
                  <ul className="space-y-3 text-xs text-stone-700 leading-relaxed">
                    {provider.memberships.map((member, mIdx) => (
                      <li key={mIdx} className="flex gap-2">
                        <span className="font-bold text-emerald-600 shrink-0">&bull;</span>
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 flex items-center gap-1.5 font-medium">
                  <HeartHandshake className="h-4.5 w-4.5 text-emerald-600 animate-pulse" />
                  Accepting new patients.
                </span>
                <Link to="/book">
                  <Button variant="outline" size="sm" icon={Calendar} className="hover:border-emerald-600 hover:text-emerald-700 text-stone-700">
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
