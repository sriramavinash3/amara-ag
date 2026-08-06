import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Award, BookOpen, CheckCircle2, ChevronRight, Calendar, Phone, ShieldCheck, HeartHandshake, ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/skeuomorphic.css';

const providerData = {
  "dr-ashvin-amara": {
    id: "dr-ashvin-amara",
    name: "Ashvin K. Amara, MD",
    role: "Founder & Medical Director",
    credentials: "Board Certified in Anesthesiology & Pain Medicine",
    bio: "Ashvin K. Amara, MD, is a highly trusted double board-certified physician in both Anesthesiology and Interventional Pain Medicine. He completed his comprehensive fellowship training in pain management and has dedicated over 15 years to helping patients in Charlotte, NC, find relief from complex chronic and acute pain conditions.",
    detailedBio: "Amara graduated from Osmania Medical College in India. He completed a one-year internship at Richmond University Medical Center (Staten Island, NY) followed by a four-year residency at Brookdale University Hospital Medical Center (Brooklyn, NY). He went on to complete a one-year sub-specialist fellowship in Interventional Pain Management at John H. Stroger Hospital of Cook County (Chicago, IL). Throughout his career, Amara has rotated through prestigious institutions including Staten Island University Hospital, Memorial Sloan Kettering Cancer Center, and St. Luke's Roosevelt Hospital Center. He established Amara Pain & Spine Management to offer high-quality, transparent, and patient-centered care without corporate hospital markups.",
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
    ],
    specializations: [
      "Facet Joint Blocks & Ablations",
      "Epidural Steroid Injections (ESI)",
      "Spinal Cord Stimulator (SCS) Trials & Implants",
      "Radiofrequency Ablation (RFA)",
      "Genicular Nerve Blocks & Joint Injections"
    ],
    languages: ["English", "Hindi", "Telugu", "Spanish"],
    experience: "15+ Years",
    certifications: [
      "Board Certified in Pain Management – American Board of Anesthesiology",
      "Board Certified in Anesthesiology – American Board of Anesthesiology",
      "Medical License – North Carolina Medical Board"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Ashvin K. Amara, MD",
      "medicalSpecialty": "PainManagement",
      "knowsLanguage": ["English", "Hindi", "Telugu", "Spanish"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "6429 Bannington Road, Suite B",
        "addressLocality": "Charlotte",
        "addressRegion": "NC",
        "postalCode": "28226"
      }
    }
  },
  "eunice-babalola": {
    id: "eunice-babalola",
    name: "Eunice Babalola, NP, MSN",
    role: "Nurse Practitioner",
    credentials: "Board-Certified Family Nurse Practitioner",
    bio: "Eunice Babalola, NP, MSN, is a board-certified Nurse Practitioner at Amara Pain & Spine Management. She is dedicated to walking alongside patients on their path to recovery, focusing on holistic, evidence-based pain management and customized care plans to promote long-term comfort and well-being.",
    detailedBio: "Eunice earned her Master of Science in Nursing (MSN-FNP) from the University of North Carolina at Charlotte (UNCC). Her extensive clinical background includes medical-surgical and neurosurgical care, which guides her safe and thorough approach to patient assessments. Eunice is board-certified by the American Association of Nurse Practitioners (AANP) and is also a board-certified Medical-Surgical Nurse through the American Nurses Credentialing Center (ANCC). She is an active member of the American Nurses Association (ANA) and the North Carolina Nurses Association (NCNA). Eunice focuses on patient-centered care and enjoys incorporating evidence-based practices like aromatherapy to maximize comfort.",
    education: [
      "Master of Science in Nursing (MSN-FNP) – University of North Carolina at Charlotte (UNCC)",
      "Bachelor of Science in Nursing (BSN) – Registered Nurse"
    ],
    memberships: [
      "American Nurses Association (ANA)",
      "North Carolina Nurses Association (NCNA)"
    ],
    specializations: [
      "Chronic Pain Management & Monitoring",
      "Medication Management & Patient Guidance",
      "Myofascial Trigger Point Therapy",
      "Complementary & Holistic Wellness Care",
      "Aromatherapy for Patient Comfort"
    ],
    languages: ["English", "Spanish"],
    experience: "Board Certified",
    certifications: [
      "Certified Family Nurse Practitioner – American Association of Nurse Practitioners (AANP)",
      "Certified Medical-Surgical Nurse – American Nurses Credentialing Center (ANCC)",
      "Registered Nurse (RN) Licensure – North Carolina"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Eunice Babalola, NP, MSN",
      "medicalSpecialty": "PainManagement",
      "knowsLanguage": ["English", "Spanish"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "6429 Bannington Road, Suite B",
        "addressLocality": "Charlotte",
        "addressRegion": "NC",
        "postalCode": "28226"
      }
    }
  },
  "alexander-carmenaty": {
    id: "alexander-carmenaty",
    name: "Alexander Carmenaty Rodriguez, MSN, FNP-C",
    role: "Nurse Practitioner",
    credentials: "Board-Certified Family Nurse Practitioner",
    bio: "Alexander Carmenaty Rodriguez, MSN, FNP-C, is a board-certified Nurse Practitioner at Amara Pain & Spine Management. He possesses a diverse international background in healthcare, enabling him to identify patient needs and develop highly effective medical plans and treatments.",
    detailedBio: "Alexander earned his Master of Science in Nursing (MSN-FNP) from South University–Savannah. He gained valuable clinical experience as a Registered Nurse in pediatric home health and specialized rehabilitation facilities. Furthermore, he holds extensive international medical experience, having previously served as a Family Physician in Cuba, Venezuela, and Brazil. Alexander is board-certified by the American Association of Nurse Practitioners (AANP), is a member of the American Association of Nurse Practitioners, and holds Advanced Life Support (ALS) certification. He is dedicated to helping patients restore their physical function and achieve their long-term well-being goals.",
    education: [
      "Master of Science in Nursing (MSN-FNP) – South University, Savannah, GA",
      "Doctor of Medicine (MD Equivalent) / Family Physician Training – Cuba"
    ],
    memberships: [
      "American Association of Nurse Practitioners (AANP)"
    ],
    specializations: [
      "Spine & Joint Injection Assistance",
      "Chronic Pain Evaluation & Assessment",
      "Patient-Centered Treatment Planning",
      "International Primary Care",
      "Rehabilitation Care Coordination"
    ],
    languages: ["English", "Spanish", "Portuguese"],
    experience: "Board Certified",
    certifications: [
      "Family Nurse Practitioner Certification (FNP-C) – American Association of Nurse Practitioners (AANP)",
      "Advanced Life Support (ALS) Certified",
      "Registered Nurse (RN) Licensure – North Carolina"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Alexander Carmenaty Rodriguez, MSN, FNP-C",
      "medicalSpecialty": "PainManagement",
      "knowsLanguage": ["English", "Spanish", "Portuguese"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "6429 Bannington Road, Suite B",
        "addressLocality": "Charlotte",
        "addressRegion": "NC",
        "postalCode": "28226"
      }
    }
  }
};

export default function ProviderDetail() {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  const { id } = useParams();
  const navigate = useNavigate();
  const provider = providerData[id];

  useEffect(() => {
    if (provider) {
      document.title = `${provider.name} | Amara Pain & Spine Charlotte NC`;
      
      // Inject dynamic schema markup for SEO
      const existingScript = document.getElementById('provider-schema');
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.id = 'provider-schema';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(provider.schema);
      document.head.appendChild(script);
    }
    window.scrollTo(0, 0);
  }, [provider]);

  if (!provider) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 text-center space-y-6">
        <Award className="h-16 w-16 text-cta-600 mx-auto" />
        <h1 className="text-3xl font-extrabold font-heading text-slate-900">Provider Not Found</h1>
        <p className="text-[18px] text-slate-655 font-normal leading-relaxed">We couldn't find the medical provider profile you were looking for.</p>
        <Button variant="primary" onClick={() => navigate('/about')}>
          Back to Team
        </Button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full relative py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-12 text-left">
      {/* 1. BREADCRUMBS */}
      <div className="flex flex-col gap-4 relative z-10 animate-reveal">
        <Link to="/about" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-medical-600 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Our Team</span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/about" className="hover:text-slate-900">About Us</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-500">{provider.name}</span>
        </div>
      </div>

      {/* 2. DUAL-COLUMN PROVIDER PROFILE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column: Visual Highlight Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card variant="white" padding="lg" className="border-slate-200/80 shadow-premium text-center space-y-6 p-8 relative overflow-hidden bg-white/95 rounded-3xl flex flex-col justify-between h-full group">
            <div className="space-y-6">
              {/* Visual avatar slot */}
              <div className="mx-auto w-36 h-36 rounded-full bg-gradient-to-tr from-medical-600 to-accent-500 p-1 shadow-md flex items-center justify-center text-white">
                <Award className="h-16 w-16" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-2xl font-black font-heading text-slate-900 leading-tight">
                  {provider.name}
                </h2>
                <span className="text-sm font-bold text-medical-600 uppercase tracking-wider block">
                  {provider.role}
                </span>
                <span className="text-xs text-slate-400 block font-medium">
                  Experience: {provider.experience}
                </span>
              </div>

              {/* Quick badges */}
              <div className="border-t border-slate-100 pt-6 space-y-2.5 text-xs text-slate-600 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>Double-Certified Interventional Care</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>Languages: {provider.languages.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>Accepting New Patients</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
              <Link to="/book" state={{ prefilledProvider: provider.name }} className="w-full">
                <Button variant="primary" className="w-full bg-cta-600 hover:bg-cta-700 text-white shadow-sm" icon={Calendar}>
                  Book Appointment
                </Button>
              </Link>
              <a href="tel:7045039338" className="w-full">
                <Button variant="outline" className="w-full text-slate-900 border-slate-300" icon={Phone}>
                  Call 704-503-9338
                </Button>
              </a>
            </div>
          </Card>
        </div>

        {/* Right Column: Profile Detailed Credentials */}
        <div className="lg:col-span-8 space-y-10">
          {/* Biography */}
          <div className="space-y-4 animate-reveal">
            <Badge variant="secondary" className="bg-medical-50 text-medical-700 font-bold uppercase tracking-wider">
              Profile Bio
            </Badge>
            <h3 className="text-3xl font-extrabold font-heading text-slate-900">
              Biography &amp; Clinical Focus
            </h3>
            <p className="text-base text-slate-655 font-normal leading-[1.75]">
              {provider.bio}
            </p>
            <p className="text-base text-slate-655 font-normal leading-[1.75]">
              {provider.detailedBio}
            </p>
          </div>

          {/* Specializations Grid */}
          <div className="space-y-4 animate-reveal">
            <h4 className="font-extrabold text-lg text-slate-900">Clinical Focus Areas:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {provider.specializations.map((spec, idx) => (
                <div key={idx} className="flex gap-2.5 items-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <CheckCircle2 className="h-5 w-5 text-accent-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            
            {/* Education */}
            <div className="space-y-4 animate-reveal">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <BookOpen className="h-5 w-5 text-medical-600" />
                <h4 className="font-extrabold text-base text-slate-900 uppercase tracking-wider">Education &amp; Training</h4>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-700 leading-relaxed">
                {provider.education.map((edu, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="font-bold text-medical-600 text-sm leading-none mt-0.5">&bull;</span>
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications & Licensure */}
            <div className="space-y-4 animate-reveal">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <Award className="h-5 w-5 text-accent-600" />
                <h4 className="font-extrabold text-base text-slate-900 uppercase tracking-wider">Certifications &amp; Licensure</h4>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-700 leading-relaxed">
                {provider.certifications.map((cert, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="font-bold text-accent-600 text-sm leading-none mt-0.5">&bull;</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Memberships */}
          <div className="space-y-4 pt-4 animate-reveal">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <HeartHandshake className="h-5 w-5 text-cta-600" />
              <h4 className="font-extrabold text-base text-slate-900 uppercase tracking-wider">Professional Memberships</h4>
            </div>
            <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
              {provider.memberships.map((member, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="font-bold text-cta-600 text-sm leading-none mt-0.5">&bull;</span>
                  <span>{member}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
