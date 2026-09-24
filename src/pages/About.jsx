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
      image: "/images/ashvin-amara.jpg",
      credentials: "Board Certified in Anesthesiology & Pain Medicine",
      acceptingNewPatients: true,
      bio: "Ashvin K. Amara, MD, is a highly trusted physician board-certified in both Anesthesiology and Interventional Pain Medicine. He completed his comprehensive fellowship training in pain management and has dedicated over 15 years to helping patients in Charlotte, NC, find relief from complex chronic and acute pain conditions.",
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
      image: "/images/eunice-babalola.jpg",
      credentials: "Board-Certified Family Nurse Practitioner",
      acceptingNewPatients: false,
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
      role: "Board-Certified Family Nurse Practitioner",
      image: "/images/alexander-carmenaty.jpg",
      credentials: "Board-Certified Family Nurse Practitioner",
      acceptingNewPatients: false,
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
    <div ref={containerRef} className="w-full relative py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-left">

      {/* 1. PAGE HEADER */}
      <div className="space-y-4 max-w-3xl border-b border-[#585454] pb-6 relative z-10 animate-reveal">
        <Badge variant="secondary" className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-widest">
          About Our Clinic
        </Badge>
        <h1 className="text-[34px] md:text-[54px] font-extrabold font-heading tracking-tight text-white leading-[1.1]">
          Our Story &amp; Mission
        </h1>
        <p className="text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
          Amara Pain &amp; Spine Management is an independent, physician-owned practice dedicated to delivering high-quality, transparent, and patient-centered interventional pain care in Charlotte, NC.
        </p>
      </div>

      {/* 2. OUR STORY & VALUE CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10 animate-reveal my-8">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-[28px] md:text-[40px] font-extrabold font-heading leading-[1.2] text-white">
            Dedicated to Safe, Evidence-Based Pain Relief
          </h2>
          <p className="text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
            We believe that chronic pain management requires a comprehensive, customized approach. Pain is highly personal, and a cookie-cutter treatment plan is rarely effective. Our interventional pain specialists are dedicated to accurately diagnosing your specific pain generators using advanced diagnostic nerve blocks and imaging.
          </p>
          <p className="text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
            We strive to relieve your pain utilizing the least invasive, non-surgical treatments first, such as epidural steroid injections, radiofrequency ablation, and regenerative therapies. By focusing on joint-preservation and nerve-calming procedures, we help you restore function and find quality, pain-free moments in your daily life.
          </p>

          {/* Three core values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="p-6 bg-[#454242] border border-[#585454] rounded-2xl shadow-xl hover:border-emerald-500/40 transition-all duration-300 animate-reveal" style={{ animationDelay: '0.05s' }}>
              <Heart className="h-6 w-6 text-emerald-400 mb-2" />
              <h4 className="font-bold text-[13px] text-white mb-1">Human Element</h4>
              <p className="text-xs text-[#D1D5DB] leading-relaxed">We validate your pain and treat every patient with empathy.</p>
            </div>
            <div className="p-6 bg-[#454242] border border-[#585454] rounded-2xl shadow-xl hover:border-emerald-500/40 transition-all duration-300 animate-reveal" style={{ animationDelay: '0.1s' }}>
              <Shield className="h-6 w-6 text-emerald-400 mb-2" />
              <h4 className="font-bold text-[13px] text-white mb-1">Affordable Care</h4>
              <p className="text-xs text-[#D1D5DB] leading-relaxed">Flat office fee with absolutely zero facility fee markups.</p>
            </div>
            <div className="p-6 bg-[#454242] border border-[#585454] rounded-2xl shadow-xl hover:border-emerald-500/40 transition-all duration-300 animate-reveal" style={{ animationDelay: '0.15s' }}>
              <BookOpen className="h-6 w-6 text-emerald-400 mb-2" />
              <h4 className="font-bold text-[13px] text-white mb-1">Evidence-Based</h4>
              <p className="text-xs text-[#D1D5DB] leading-relaxed">FDA-approved interventional clinical techniques.</p>
            </div>
          </div>
        </div>

        {/* Value Proposition Graphic Card & Authentic Senior Consultation Image */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[#585454] bg-[#323030] group">
            <img 
              src="/images/audience/senior_consultation.jpg" 
              alt="Older African American patient having a reassuring, personalized consultation with an interventional pain physician"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3A3838]/90 via-[#3A3838]/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">Patient-Centered Experience</span>
              <p className="text-sm font-semibold mt-1 leading-snug text-white">Personalized, unhurried care where older adults and chronic pain patients are truly listened to.</p>
            </div>
          </div>

          <div className="border border-[#585454] rounded-2xl space-y-6 relative overflow-hidden bg-[#363434] p-8 shadow-xl">
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-950/20 rounded-full blur-2xl -z-10" />
            <h3 className="text-[18px] font-bold font-heading text-white">
              How We Are Different
            </h3>
            <ul className="space-y-4 text-sm text-[#F0F0F0]">
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">No Hidden Facility Fees:</strong> Unlike hospital-owned clinics, our independent practice saves you hundreds of dollars by charging a single, transparent office visit fee.
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Double-Certified Specialist:</strong> Directed by a physician certified in both pain medicine and anesthesiology.
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Personalized Care Plans:</strong> We spend the time to listen, locate the exact pain sources, and adapt plans to your physical recovery progress.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. MEET THE CLINICAL TEAM */}
      <section className="space-y-6 relative z-10 animate-reveal border-t border-[#585454]/60 pt-10 my-8">
        <div className="space-y-2">
          <Badge variant="accent" className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-semibold">
            Our Medical Providers
          </Badge>
          <h2 className="text-[28px] md:text-[40px] font-extrabold font-heading leading-[1.2] text-white">
            Meet Our Specialist &amp; Staff
          </h2>
          <p className="text-[18px] text-[#F0F0F0] font-normal leading-[1.75] max-w-[720px]">
            Our clinical team combines decades of specialized interventional pain medicine experience to deliver safe, precise, and compassionate care.
          </p>
        </div>

        {/* Providers Details List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {staff.map((provider, idx) => (
            <div key={idx} className="border border-[#585454] rounded-2xl bg-[#454242] shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between h-full group p-8 animate-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-[#585454] pb-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex items-center gap-4">
                    {provider.image && (
                      <div className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-emerald-500/30 shadow-md shrink-0 bg-[#363434]">
                        <img 
                          src={provider.image} 
                          alt={provider.name} 
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-[22px] font-bold font-heading text-white group-hover:text-emerald-400 transition-colors">
                        {provider.name}
                      </h3>
                      <span className="text-sm font-semibold text-emerald-400 block mt-0.5">{provider.role}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-[#363434] text-emerald-400 border border-[#585454] shrink-0">
                    {idx === 0 ? "Double-Certified Specialist" : "Clinical Partner"}
                  </Badge>
                </div>

                {/* Bio text */}
                <p className="text-[16px] text-[#F0F0F0] font-normal leading-[1.7] max-w-[720px]">
                  {provider.bio}
                </p>

                {/* Education bulleted list */}
                <div className="space-y-3">
                  <h4 className="font-bold text-[11px] text-white uppercase tracking-wider">Education &amp; Training:</h4>
                  <ul className="space-y-2 text-xs text-[#F0F0F0] leading-relaxed">
                    {provider.education.map((edu, eIdx) => (
                      <li key={eIdx} className="flex gap-2">
                        <span className="font-bold text-emerald-400 shrink-0">&bull;</span>
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Memberships bulleted list */}
                <div className="space-y-3">
                  <h4 className="font-bold text-[11px] text-white uppercase tracking-wider">Professional Memberships:</h4>
                  <ul className="space-y-2 text-xs text-[#F0F0F0] leading-relaxed">
                    {provider.memberships.map((member, mIdx) => (
                      <li key={mIdx} className="flex gap-2">
                        <span className="font-bold text-emerald-400 shrink-0">&bull;</span>
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-[#585454] flex items-center justify-between">
                {provider.acceptingNewPatients && (
                  <span className="text-xs text-[#D1D5DB] flex items-center gap-1.5 font-medium">
                    <HeartHandshake className="h-4.5 w-4.5 text-emerald-400 animate-pulse" />
                    Accepting new patients.
                  </span>
                )}
                <Link to="/book">
                  <Button variant="outline" size="sm" icon={Calendar}>
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
