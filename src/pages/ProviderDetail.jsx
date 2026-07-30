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
    name: "Dr. Ashvin K. Amara, MD",
    role: "Founder & Lead Physician",
    credentials: "Double Board-Certified in Pain Medicine & Anesthesiology",
    bio: "Dr. Ashvin K. Amara, MD, is a highly trusted physician in Charlotte, NC. With over 15 years of interventional pain management experience, he completed advanced fellowship training specifically targeting chronic spine and joint conditions. His patient-focused approach avoids heavy hospitalization markups, focusing instead on double board-certified clinical accuracy and compassionate care.",
    detailedBio: "Dr. Amara established Amara Pain & Spine Management to offer a true alternative to corporate hospital chains. He believes that chronic pain management requires a tailored approach. Pain is personal, and a standard one-size-fits-all plan is rarely successful. Our specialist care plans use targeted anti-inflammatory blocks, radiofrequency ablations, and spinal cord neuromodulation to block pain pathways at their source.",
    education: [
      "Fellowship in Pain Management - Interventional Pain Medicine",
      "Residency in Anesthesiology - Board Certified Specialist",
      "Medical Doctor Degree (MD) - Licensed Practitioner in NC"
    ],
    memberships: [
      "American Society of Anesthesiologists (ASA)",
      "American Society of Interventional Pain Physicians (ASIPP)",
      "North Carolina Medical Society (NCMS)"
    ],
    specializations: [
      "Facet Joint Blocks & Ablations",
      "Epidural Steroid Injections (ESI)",
      "Spinal Cord Stimulator (SCS) Trials & Implants",
      "Genicular Nerve Blocks for Knee Pain"
    ],
    languages: ["English", "Spanish", "Hindi", "Telugu"],
    experience: "15+ Years",
    certifications: [
      "Board Certified in Pain Medicine - American Board of Anesthesiology",
      "Board Certified in Anesthesiology - American Board of Anesthesiology",
      "Advanced Cardiac Life Support (ACLS) Certified"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Dr. Ashvin K. Amara, MD",
      "medicalSpecialty": "PainManagement",
      "knowsLanguage": ["English", "Spanish", "Hindi", "Telugu"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "6429 Bannington Road, Suite B",
        "addressLocality": "Charlotte",
        "addressRegion": "NC",
        "postalCode": "28226"
      }
    }
  },
  "nurse-practitioners": {
    id: "nurse-practitioners",
    name: "Nurse Practitioners (NPs)",
    role: "Advanced Practice Clinical Group",
    credentials: "Board-Certified Family Nurse Practitioners",
    bio: "Our highly trained Family Nurse Practitioners work in close clinical partnership with Dr. Amara. They provide comprehensive evaluations, follow-ups, trigger point injections, and coaching for our medical weight loss program.",
    detailedBio: "Our Advanced Practice Registered Nurses (APRNs) are integral to your clinical journey. They collaborate daily with Dr. Amara to ensure that your treatments are adjusted to your recovery speed, coordinate physical therapy programs, and perform diagnostic evaluations. They validate your concerns and support your daily return to active living.",
    education: [
      "Master of Science in Nursing (MSN) - Advanced Practice Nursing",
      "Board Certified Family Nurse Practitioners (AANP / ANCC)",
      "Specialized Interventional Training in Myofascial Knots & Joint Injections"
    ],
    memberships: [
      "American Association of Nurse Practitioners (AANP)",
      "North Carolina Nurses Association (NCNA)"
    ],
    specializations: [
      "Trigger Point Injections (TPI) for Myofascial Knots",
      "Joint & Soft Tissue Injections",
      "Medically Supervised Weight Loss Coaching",
      "Chronic Pain Progress Monitoring"
    ],
    languages: ["English", "Spanish"],
    experience: "Combined Clinical Practice",
    certifications: [
      "Registered Nurse (RN) Licensure - North Carolina",
      "Family Nurse Practitioner Board Certification (FNP-BC)"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Amara Pain Advanced Clinical Providers",
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
                  <span>Double Board-Certified Interventional Care</span>
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
                <h4 className="font-extrabold text-base text-slate-900 uppercase tracking-wider">Board Certifications</h4>
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
