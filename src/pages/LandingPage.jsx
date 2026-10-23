import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import {
  Phone,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Award,
  ChevronRight,
  Activity,
  HeartPulse,
  Sparkles
} from 'lucide-react';

const LANDING_PAGE_DATA = {
  'pain-management-charlotte': {
    slug: 'pain-management-charlotte',
    badge: 'Comprehensive Interventional Care',
    metaTitle: 'Pain Management Charlotte NC | Comprehensive Non-Surgical Relief | Amara Pain',
    metaDesc: 'Charlotte\'s trusted physician-led pain management clinic. Dr. Ashvin K. Amara provides advanced interventional solutions, fluoroscopy-guided care, same-week appointments, and zero hospital facility fees.',
    headline: 'Expert, Non-Surgical Pain Management in Charlotte, NC',
    subheadline: 'Restore your mobility and quality of life with double-board-certified interventional care. Personalized, image-guided treatments targeting the source of chronic pain—with same-week availability and zero hospital facility fees.',
    painType: 'Comprehensive Pain Evaluation',
    heroPoints: [
      'Double-board-certified fellowship-trained physician (Dr. Ashvin K. Amara, MD)',
      'Precision fluoroscopy-guided outpatient injections & nerve blocks',
      'Zero hospital facility fees—significant out-of-pocket savings',
      'In-network with Medicare, BCBS, UnitedHealthcare, Aetna & Cigna',
      'Same-week consultations and prompt clinical follow-ups'
    ],
    conditions: [
      { name: 'Lower Back & Lumbar Pain', desc: 'Herniated discs, sciatica, spinal stenosis, and degenerative disc disease.' },
      { name: 'Chronic Neck & Cervical Pain', desc: 'Whiplash, cervical radiculopathy, facet arthritis, and radiating tension.' },
      { name: 'Sciatica & Nerve Compression', desc: 'Sharp, shooting pain and numbness traveling from the spine down into the legs.' },
      { name: 'Joint & Arthritis Pain', desc: 'Knee osteoarthritis, hip pain, sacroiliac (SI) joint dysfunction, and shoulder stiffness.' },
      { name: 'Failed Back Surgery Syndrome', desc: 'Persistent spinal discomfort following prior laminectomies or fusions.' },
      { name: 'Complex Neuropathy', desc: 'Burning, tingling, and chronic peripheral or diabetic neuropathic pain.' }
    ],
    procedures: [
      { name: 'Epidural Steroid Injections (ESI)', desc: 'Fluoroscopy-guided cervical, thoracic, and lumbar injections to extinguish nerve root inflammation.' },
      { name: 'Radiofrequency Ablation (RFA)', desc: 'Targeted nerve interruption providing 9 to 18 months of long-lasting spinal facet joint relief.' },
      { name: 'Diagnostic Facet & Medial Branch Blocks', desc: 'Precise numbing injections to verify exact anatomical pain generators.' },
      { name: 'Sacroiliac (SI) Joint Injections', desc: 'High-accuracy anti-inflammatory relief for lower back and pelvic pain.' },
      { name: 'Spinal Cord Stimulation (SCS)', desc: 'Advanced outpatient neuromodulation trials for intractable chronic spine or leg pain.' }
    ],
    faqs: [
      { q: 'Do I need a physician referral to schedule an appointment?', a: 'In most cases, patients can self-refer directly to Amara Pain & Spine. If your specific HMO insurance plan mandates a referral, our clinical intake team will help you coordinate paperwork.' },
      { q: 'How quickly can I be seen by Dr. Amara?', a: 'We reserve daily appointment slots for new patients experiencing acute or chronic pain flare-ups, typically offering consultations within the same week.' },
      { q: 'What does "Zero Hospital Facility Fees" mean for me?', a: 'Unlike hospital-owned outpatient clinics that bill separate, expensive hospital facility charges, Amara Pain & Spine is an independent clinic. You only pay for your physician consultation and clinical procedure, often saving hundreds to thousands in out-of-pocket expenses.' }
    ]
  },

  'back-pain-doctor-charlotte': {
    slug: 'back-pain-doctor-charlotte',
    badge: 'Lumbar Spine & Lower Back Specialists',
    metaTitle: 'Back Pain Doctor Charlotte NC | Interventional Lumbar Spine Relief | Amara Pain',
    metaDesc: 'Relieve lower back pain, herniated discs, and spinal stenosis without surgery. Consult Dr. Ashvin K. Amara in South Charlotte. Zero hospital facility fees.',
    headline: 'Charlotte\'s Premier Back Pain Doctor: Lasting Relief Without Surgery',
    subheadline: 'Suffering from chronic lower back stiffness, herniated discs, or degenerative spine conditions? Get definitive diagnostic clarity and precision interventional therapy from fellowship-trained physician Dr. Ashvin K. Amara.',
    painType: 'Lower Back & Lumbar Spine',
    heroPoints: [
      'Targeted non-surgical treatments for herniated, bulging, or slipped discs',
      'Precision image-guided epidural steroid injections & radiofrequency ablation',
      'Independent clinic setting with zero hospital facility surcharges',
      'Fellowship-trained, double-board-certified spine care specialist',
      'Same-week appointments for acute lower back pain flare-ups'
    ],
    conditions: [
      { name: 'Lumbar Herniated Discs', desc: 'Disc material irritating adjacent spinal nerves causing intense lumbar and leg pain.' },
      { name: 'Lumbar Spinal Stenosis', desc: 'Narrowing of the spinal canal causing aching stiffness while standing or walking.' },
      { name: 'Facet Joint Arthropathy', desc: 'Arthritic wear and tear of spinal joints exacerbated by twisting and extending backward.' },
      { name: 'Degenerative Disc Disease (DDD)', desc: 'Age-related loss of spinal cushioning leading to persistent aching in the lower spine.' },
      { name: 'Spondylolisthesis & Instability', desc: 'Slippage of a vertebra causing muscular spasms and spinal nerve impingement.' },
      { name: 'Persistent Post-Surgical Back Pain', desc: 'Evaluation and non-surgical relief options after prior spine surgeries.' }
    ],
    procedures: [
      { name: 'Lumbar Epidural Steroid Injections', desc: 'Direct anti-inflammatory delivery around inflamed nerve roots under live X-ray guidance.' },
      { name: 'Lumbar Medial Branch Blocks', desc: 'Diagnostic testing to pinpoint whether spinal facet joints are driving your back pain.' },
      { name: 'Lumbar Radiofrequency Ablation (RFA)', desc: 'Electromagnetic thermal treatment offering 12+ months of significant pain reduction.' },
      { name: 'Trigger Point & Myofascial Injections', desc: 'Rapid release of severe muscular spasms and tension knots in the lower back.' }
    ],
    faqs: [
      { q: 'Will I be forced to have spine surgery?', a: 'No. Our practice is 100% focused on non-surgical, interventional therapies designed to resolve pain and restore mobility while helping patients avoid invasive spine operations whenever possible.' },
      { q: 'How do you know where my back pain is coming from?', a: 'Dr. Amara performs thorough clinical examinations, reviews your MRI/CT scans, and uses diagnostic fluoroscopy-guided blocks to verify the exact anatomical source of your discomfort.' },
      { q: 'Are back pain procedures painful?', a: 'All interventional procedures are performed with gentle local anesthetic numbing and light sedation options when clinically indicated, ensuring a comfortable, quick outpatient experience.' }
    ]
  },

  'neck-pain-doctor-charlotte': {
    slug: 'neck-pain-doctor-charlotte',
    badge: 'Cervical Spine & Radiculopathy Care',
    metaTitle: 'Neck Pain Doctor Charlotte NC | Cervical Spine & Whiplash Relief | Amara Pain',
    metaDesc: 'Target neck stiffness, cervical radiculopathy, and radiating shoulder pain with precision interventional care in Charlotte. Double-board certified pain physician.',
    headline: 'Charlotte Neck Pain Doctor: Targeted Relief for Cervical Spine Pain',
    subheadline: 'Stop letting chronic neck stiffness, radiating shoulder tension, or cervical pinched nerves hold you back. Experience precision image-guided therapies in a comfortable outpatient setting.',
    painType: 'Neck & Cervical Spine',
    heroPoints: [
      'Comprehensive care for cervical radiculopathy, whiplash, and facet arthritis',
      'Fluoroscopy-guided cervical epidural injections and diagnostic blocks',
      'Avoid surgery with fellowship-trained interventional spine techniques',
      'Independent clinic setting with zero hospital facility fees',
      'In-network with Medicare and major private health plans'
    ],
    conditions: [
      { name: 'Cervical Radiculopathy', desc: 'Pinched nerves in the neck radiating sharp pain, tingling, or weakness into the arm and hand.' },
      { name: 'Cervical Facet Arthritis', desc: 'Inflammation of cervical joints causing painful stiffness when turning your head.' },
      { name: 'Whiplash & Post-Collision Pain', desc: 'Ligamentous strain and joint micro-injuries following vehicular accidents.' },
      { name: 'Cervical Spondylosis', desc: 'Chronic wear-and-tear of cervical vertebrae and shock-absorbing intervertebral discs.' },
      { name: 'Cervicogenic Headaches', desc: 'Severe occipital headaches originating from irritated cervical nerves at the base of the skull.' },
      { name: 'Myofascial Neck & Shoulder Tension', desc: 'Deep muscle spasms across the trapezius, levator scapulae, and upper back.' }
    ],
    procedures: [
      { name: 'Cervical Epidural Steroid Injections', desc: 'Targeted medication delivered under fluoroscopy to relieve nerve root compression.' },
      { name: 'Cervical Medial Branch Blocks', desc: 'Diagnostic testing to confirm facet arthritis as the cause of your neck stiffness.' },
      { name: 'Cervical Radiofrequency Neurotomy', desc: 'Deactivation of sensory nerve fibers providing 9-18 months of neck pain relief.' },
      { name: 'Occipital Nerve Blocks', desc: 'Rapid relief for cervicogenic headaches and occipital neuralgia pain.' }
    ],
    faqs: [
      { q: 'Can neck pain cause tingling or numbness in my fingers?', a: 'Yes. Irritation or compression of cervical nerve roots (cervical radiculopathy) commonly radiates pain, tingling, or numbness down the shoulder, arm, and into the fingers.' },
      { q: 'How long does a cervical epidural injection take?', a: 'The injection itself typically takes under 15 minutes in our sterile procedure suite. Patients rest in recovery for 15-20 minutes and return home the same day.' },
      { q: 'Is a hospital stay required?', a: 'Never. All our neck procedures are strictly outpatient, performed in our comfortable South Charlotte clinical suite with zero hospital facility surcharges.' }
    ]
  },

  'sciatica-treatment-charlotte': {
    slug: 'sciatica-treatment-charlotte',
    badge: 'Sciatic Nerve & Radicular Pain Relief',
    metaTitle: 'Sciatica Treatment Charlotte NC | Pinched Nerve & Leg Pain Relief | Amara Pain',
    metaDesc: 'Fast, targeted sciatica relief in Charlotte, NC. Dr. Ashvin K. Amara provides precision fluoroscopy-guided epidural injections to calm inflamed sciatic nerves.',
    headline: 'Targeted Sciatica Treatment in Charlotte: Stop Burning Leg & Nerve Pain',
    subheadline: 'Radiating buttock pain, burning leg sensations, and numbness are signs of nerve compression. Our fellowship-trained interventional specialists deliver precision injections to rapidly reduce inflammation.',
    painType: 'Sciatica & Sciatic Nerve',
    heroPoints: [
      'Rapid relief for burning, shooting nerve pain traveling from hip to foot',
      'Precision fluoroscopy-guided lumbar epidural steroid injections',
      'Detailed diagnosis identifying disc herniations vs. spinal stenosis vs. piriformis syndrome',
      'Zero hospital facility fees—affordable outpatient care',
      'Same-week appointments for urgent sciatic nerve flare-ups'
    ],
    conditions: [
      { name: 'Acute Sciatica Flare-Ups', desc: 'Severe sudden pain shooting down the back of the thigh, calf, and foot.' },
      { name: 'Lumbar Disc Herniations', desc: 'Discs pressing directly on the L4, L5, or S1 nerve roots forming the sciatic nerve.' },
      { name: 'Spinal Stenosis with Claudication', desc: 'Narrowing of nerve pathways causing leg cramping and heaviness while walking.' },
      { name: 'Piriformis Syndrome', desc: 'Deep buttock muscle spasms entrapping and irritating the underlying sciatic nerve.' },
      { name: 'Degenerative Spondylolisthesis', desc: 'Shifted vertebrae compressing lower spinal nerve roots.' },
      { name: 'Chronic Radiculopathy', desc: 'Lingering numbness, pins-and-needles, or weakness in the lower extremities.' }
    ],
    procedures: [
      { name: 'Transforaminal Epidural Steroid Injections', desc: 'Precision delivery of concentrated anti-inflammatory medicine directly to the exit point of the irritated sciatic nerve.' },
      { name: 'Interlaminar Lumbar Epidural Injections', desc: 'Broad therapeutic coverage for multi-level stenosis and bilateral sciatica symptoms.' },
      { name: 'Piriformis Muscle Injections', desc: 'Targeted ultrasound-guided injection to relieve muscle spasming around the sciatic nerve.' },
      { name: 'Diagnostic Nerve Root Blocks', desc: 'Selective blocks to isolate the exact spinal nerve root causing your pain.' }
    ],
    faqs: [
      { q: 'How fast can I get relief from a sciatica injection?', a: 'Many patients experience initial relief within 24 to 72 hours as the concentrated steroid reduces swelling around the compressed nerve root.' },
      { q: 'Do I have to live with sciatica forever?', a: 'No. Sciatica is a symptom of an underlying anatomical condition. Once the inflammation is cooled down and nerve pressure is relieved, most patients make a full return to daily activities.' },
      { q: 'What should I bring to my appointment?', a: 'Please bring any existing MRI or CT imaging reports, your insurance cards, photo ID, and a list of any current medications.' }
    ]
  },

  'spine-pain-specialist-charlotte': {
    slug: 'spine-pain-specialist-charlotte',
    badge: 'Advanced Spine Diagnostics & Second Opinions',
    metaTitle: 'Spine Pain Specialist Charlotte NC | Double-Board Certified Spine Care | Amara Pain',
    metaDesc: 'Seek expert spine diagnostics and second opinions with Dr. Ashvin K. Amara in Charlotte. Fellowship-trained interventional spine specialist offering non-surgical care.',
    headline: 'Charlotte Spine Pain Specialist: Comprehensive Non-Surgical Spine Solutions',
    subheadline: 'Facing persistent back or neck discomfort, failed back surgery, or considering an invasive operation? Get a definitive second opinion and diagnostic clarity from double-board-certified specialist Dr. Ashvin K. Amara.',
    painType: 'Spine Diagnostics & Second Opinion',
    heroPoints: [
      'Double-board-certified in Anesthesiology and Pain Medicine (Fellowship Trained)',
      'Expert second opinions before committing to major spinal fusion or disc surgery',
      'Advanced neuromodulation and spinal cord stimulation (SCS) trials',
      'Modern in-office fluoroscopy suite with zero hospital facility surcharges',
      'Independent clinical practice focused entirely on patient recovery'
    ],
    conditions: [
      { name: 'Complex & Chronic Spine Pain', desc: 'Multi-level degenerative changes across cervical, thoracic, and lumbar regions.' },
      { name: 'Failed Back Surgery Syndrome (FBSS)', desc: 'Ongoing or recurrent pain following previous laminectomies, discectomies, or fusions.' },
      { name: 'Severe Spinal Stenosis', desc: 'Progressive nerve compression causing neurogenic claudication and mobility loss.' },
      { name: 'Post-Traumatic Spine Injuries', desc: 'Persistent pain and instability following fractures, falls, or sports trauma.' },
      { name: 'Thoracic Spine Pain', desc: 'Mid-back pain, costovertebral joint arthritis, and intercostal nerve irritation.' },
      { name: 'Spinal Instability & Spondylolisthesis', desc: 'Structural slippage of vertebrae requiring specialized diagnostic mapping.' }
    ],
    procedures: [
      { name: 'Comprehensive Spine Diagnostic Mapping', desc: 'Correlating imaging studies with precision diagnostic blocks to isolate pain generators.' },
      { name: 'Spinal Cord Stimulation (SCS) Trials', desc: '5-7 day non-invasive outpatient trial allowing you to test 50-80% pain reduction before committing.' },
      { name: 'Multi-Level Radiofrequency Ablation', desc: 'Long-term nerve interruption for advanced arthritis across cervical and lumbar facet joints.' },
      { name: 'Targeted Epidural Neuroplasty', desc: 'Minimally invasive management of post-surgical epidural scar tissue and adhesions.' }
    ],
    faqs: [
      { q: 'Should I get a second opinion before spine surgery?', a: 'Yes. Major spine surgery is irreversible. A second opinion from an interventional spine specialist frequently reveals non-surgical treatments that provide equal or superior pain relief without surgical risks.' },
      { q: 'What is a Spinal Cord Stimulation trial?', a: 'An SCS trial is an outpatient procedure where temporary leads are placed under fluoroscopy. You test the system at home for 5-7 days to determine if it delivers at least 50% pain relief.' },
      { q: 'What are Dr. Amara\'s qualifications?', a: 'Dr. Ashvin K. Amara, MD completed residency and ACGME-accredited fellowship training at premier academic institutions and is double-board-certified by the American Board of Medical Specialties (ABMS).' }
    ]
  },

  'interventional-pain-treatment': {
    slug: 'interventional-pain-treatment',
    badge: 'Advanced Interventional Outpatient Procedures',
    metaTitle: 'Interventional Pain Treatment Charlotte NC | Outpatient Procedures | Amara Pain',
    metaDesc: 'State-of-the-art outpatient interventional pain procedures in Charlotte. Epidural injections, radiofrequency ablation, nerve blocks with zero hospital facility fees.',
    headline: 'Modern Interventional Pain Procedures in Charlotte, NC',
    subheadline: 'Move beyond pills and invasive surgery. Our dedicated outpatient fluoroscopy suite delivers targeted image-guided procedures with rapid recovery, high satisfaction, and no hospital facility fees.',
    painType: 'Interventional Procedures',
    heroPoints: [
      'Image-guided precision utilizing high-definition C-arm fluoroscopy',
      'Targeted treatments delivering medication directly to the pain source',
      'Minimally invasive with rapid recovery—return home within 30 minutes',
      'Zero hospital facility fees—transparent, affordable outpatient care',
      'In-network with Medicare, BCBS, UnitedHealthcare, Aetna, Cigna, and Humana'
    ],
    conditions: [
      { name: 'Cervical, Thoracic & Lumbar Radiculopathy', desc: 'Nerve root irritation across all spine levels causing radiating pain.' },
      { name: 'Facet Joint Arthritis & Spondylosis', desc: 'Degenerative joint inflammation treated with radiofrequency ablation.' },
      { name: 'Sacroiliac (SI) Joint Pain', desc: 'Pelvic and buttock joint dysfunction relieved by precision joint injections.' },
      { name: 'Peripheral Neuropathy & CRPS', desc: 'Complex regional pain syndrome and chronic nerve pain addressed with sympathetic blocks.' },
      { name: 'Joint Osteoarthritis (Knee, Hip, Shoulder)', desc: 'Advanced joint preservation and nerve-targeting genicular/suprascapular blocks.' },
      { name: 'Persistent Musculoskeletal Spasms', desc: 'Deep myofascial pain relieved by guided interventional trigger point techniques.' }
    ],
    procedures: [
      { name: 'Fluoroscopy-Guided Epidural Steroid Injections', desc: 'Sub-millimeter accuracy for cervical, thoracic, lumbar, and caudal approaches.' },
      { name: 'Radiofrequency Neurotomy / Ablation (RFA)', desc: 'Interrupting sensory pain signals for 12 to 18 months without narcotics.' },
      { name: 'Diagnostic Medial Branch Nerve Blocks', desc: 'Verifying facet arthropathy before proceeding to radiofrequency ablation.' },
      { name: 'Peripheral & Sympathetic Nerve Blocks', desc: 'Celiac plexus, stellate ganglion, lumbar sympathetic, and genicular blocks.' },
      { name: 'Joint Preservation Injections', desc: 'Corticosteroid and viscosupplementation injections for knees, hips, and shoulders.' }
    ],
    faqs: [
      { q: 'What is interventional pain management?', a: 'Interventional pain management utilizes minimally invasive procedures—such as image-guided injections, nerve blocks, and radiofrequency ablation—to directly address the physical cause of pain rather than masking symptoms with medications.' },
      { q: 'Will I need to miss work after a procedure?', a: 'Most patients return to light activities and work the following day. Interventional procedures involve no surgical incisions and minimal post-procedure soreness.' },
      { q: 'Is fluoroscopy safe?', a: 'Yes. Modern C-arm fluoroscopes use very low doses of pulsed X-rays while providing real-time visualization of anatomical landmarks and needle positioning.' }
    ]
  },

  'schedule-consultation': {
    slug: 'schedule-consultation',
    badge: 'Fast-Track Patient Intake',
    metaTitle: 'Schedule a Pain Consultation Charlotte NC | Fast-Track Intake | Amara Pain',
    metaDesc: 'Schedule your pain consultation in Charlotte, NC. Fast-track appointment intake with Dr. Ashvin K. Amara. Same-week availability and in-network insurance coverage.',
    headline: 'Schedule Your Consultation: Fast-Track Pain Relief in Charlotte',
    subheadline: 'Take the first step toward lasting relief. Complete our 60-second consultation request form, and our clinical care coordinators will connect with you to confirm your same-week appointment.',
    painType: 'General Pain Consultation',
    heroPoints: [
      'Direct contact from dedicated clinical care coordinators within 24 hours',
      'Same-week appointment availability in South Charlotte',
      'Comprehensive insurance coverage verification before your visit',
      'Zero hospital facility fees—significant out-of-pocket savings',
      'Consult with double-board-certified specialist Dr. Ashvin K. Amara, MD'
    ],
    conditions: [
      { name: 'Chronic Lower Back Pain & Sciatica', desc: 'Herniated discs, spinal stenosis, facet joint arthritis, and nerve compression.' },
      { name: 'Persistent Neck & Shoulder Tension', desc: 'Cervical radiculopathy, whiplash, and cervicogenic headaches.' },
      { name: 'Knee, Hip & Sacroiliac Joint Pain', desc: 'Osteoarthritis, bursitis, and joint dysfunction resistant to conservative care.' },
      { name: 'Neuropathy & Nerve Pain', desc: 'Burning sensations, pins-and-needles, and post-surgical discomfort.' }
    ],
    procedures: [
      { name: 'Same-Week Clinical Intake', desc: 'Prompt initial consultation, complete medical history evaluation, and physical examination.' },
      { name: 'In-Depth Diagnostic Imaging Review', desc: 'Bring your MRI or CT disc—Dr. Amara personally reviews films with you.' },
      { name: 'Customized Interventional Care Plan', desc: 'Tailored non-surgical roadmap targeting your pain generators.' }
    ],
    faqs: [
      { q: 'How long does the initial consultation take?', a: 'Initial consultations typically last 45 to 60 minutes. Dr. Amara performs a comprehensive examination, reviews your medical history and imaging, and explains all recommended treatment options.' },
      { q: 'What insurance plans do you accept?', a: 'We accept Medicare, Blue Cross Blue Shield, UnitedHealthcare, Aetna, Cigna, Humana, and most major commercial PPO plans. Our team will verify your benefits prior to your appointment.' },
      { q: 'Can I book online via Tebra EHR?', a: 'Yes! If you prefer real-time calendar booking, you can also use our interactive appointment booking wizard at any time.' }
    ]
  }
};

export default function LandingPage({ slug: propSlug }) {
  const location = useLocation();

  // Resolve slug from props or URL pathname
  const derivedSlug = (propSlug || location.pathname.replace(/^\/|\/$/g, '')).toLowerCase();
  const pageData = LANDING_PAGE_DATA[derivedSlug] || LANDING_PAGE_DATA['pain-management-charlotte'];

  // SEO metadata setup
  useSEO({
    title: pageData.metaTitle,
    description: pageData.metaDesc,
    url: `/${pageData.slug}/`
  });

  // Intake Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    condition: pageData.painType,
    preferredTime: 'Morning',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState('');

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';

    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (!cleanedPhone || cleanedPhone.length < 10) {
      errors.phone = 'Please provide a valid 10-digit phone number';
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const leadId = `APS-${Date.now().toString(36).toUpperCase()}`;

      // Build lead object adhering to the authoritative APS_LEADS schema
      const newLead = {
        id: leadId,
        type: 'appointment',
        status: 'New',
        dateCreated: new Date().toISOString(),
        source: pageData.slug,
        patient: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim().toLowerCase()
        },
        condition: formData.condition || pageData.painType,
        preferredTime: formData.preferredTime,
        notes: formData.notes.trim() || `Inquiry from Google Ads landing page: ${pageData.slug}`,
        appointmentDate: new Date().toLocaleDateString()
      };

      // Persist to localStorage for AdminDashboard.jsx
      try {
        const existing = JSON.parse(localStorage.getItem('APS_LEADS') || '[]');
        existing.unshift(newLead);
        localStorage.setItem('APS_LEADS', JSON.stringify(existing));
      } catch (storageErr) {
        console.warn('Could not save to localStorage:', storageErr);
      }

      // Google Ads Conversion Event Trigger
      const storageKey = `APS_GOOGLE_ADS_CONVERSIONS_${leadId}`;
      let hasFired = false;
      try {
        hasFired = sessionStorage.getItem(storageKey) === 'fired';
      } catch (_err) {
        // Storage access check
      }

      if (!hasFired && typeof window !== 'undefined' && typeof window.gtag === 'function') {
        const conversionLabel =
          (typeof window !== 'undefined' && window.GOOGLE_ADS_CONVERSION_LABEL) ||
          import.meta.env?.VITE_GOOGLE_ADS_CONVERSION_LABEL ||
          null;

        if (conversionLabel) {
          window.gtag('event', 'conversion', {
            send_to: `AW-18533378516/${conversionLabel}`,
            transaction_id: leadId
          });
          console.info(`[Google Ads] Conversion event fired for lead: ${leadId}`);
        } else {
          window.gtag('event', 'lead_form_submitted', {
            send_to: 'AW-18533378516',
            transaction_id: leadId,
            campaign_slug: pageData.slug,
            method: 'Landing Page Form'
          });
          console.info(`[Google Ads] Conversion dispatched as 'lead_form_submitted' for ${leadId}.`);
        }

        try {
          sessionStorage.setItem(storageKey, 'fired');
        } catch (_err) {
          // Ignore private browsing storage errors
        }
      }

      setSubmittedLeadId(leadId);
      setSubmitSuccess(true);
    } catch (err) {
      console.error('Lead submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      
      {/* 1. TOP ANNOUNCEMENT & ASSURANCE STRIP */}
      <div className="bg-slate-900 text-white text-xs py-2.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-emerald-300">Accepting New Patients:</span>
            <span className="text-slate-200">Same-Week Consultations Available</span>
          </div>
          <div className="flex items-center gap-6 mx-auto sm:mx-0 font-medium text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Zero Hospital Facility Fees
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Double-Board Certified Physician
            </span>
            <a
              href="tel:+17045039338"
              className="flex items-center gap-1.5 text-emerald-300 hover:text-white font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> (704) 503-9338
            </a>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION WITH EMBEDDED INTAKE FORM */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-10 pb-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-transparent to-slate-100/50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Targeted Medical Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {pageData.badge}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {pageData.headline}
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed font-normal">
                {pageData.subheadline}
              </p>

              {/* Key Assurances List */}
              <div className="space-y-3 pt-2">
                {pageData.heroPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-slate-800">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Emergency Call-Out & Direct Phone */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Immediate Phone Assistance</div>
                  <div className="text-lg font-black text-slate-900">Speak With Our Clinical Staff</div>
                </div>
                <a
                  href="tel:+17045039338"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all"
                >
                  <Phone className="w-4 h-4" /> (704) 503-9338
                </a>
              </div>
            </div>

            {/* Right Column: 60-Second Lead Intake Form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 text-left relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600"></div>

                {submitSuccess ? (
                  <div className="py-8 text-center space-y-4 animate-fade-in">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Consultation Request Received!</h3>
                    <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting Amara Pain & Spine. Our clinical coordinator will call you shortly to confirm your consultation time and verify your insurance coverage.
                    </p>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700">
                      Confirmation ID: <strong className="text-slate-900">{submittedLeadId}</strong>
                    </div>
                    <div className="pt-2">
                      <a
                        href="tel:+17045039338"
                        className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
                      >
                        <Phone className="w-4 h-4" /> Call Clinic Directly: (704) 503-9338
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Fast-Track Clinical Intake</div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Request Same-Week Visit</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Fill out this brief form and our team will contact you to secure your preferred slot.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First Name"
                          className={`w-full px-3 py-2 text-sm rounded-lg border ${
                            formErrors.firstName ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                          } focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white`}
                        />
                        {formErrors.firstName && <p className="text-xs text-red-600 mt-0.5">{formErrors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last Name"
                          className={`w-full px-3 py-2 text-sm rounded-lg border ${
                            formErrors.lastName ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                          } focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white`}
                        />
                        {formErrors.lastName && <p className="text-xs text-red-600 mt-0.5">{formErrors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(704) 555-0123"
                        className={`w-full px-3 py-2 text-sm rounded-lg border ${
                          formErrors.phone ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white`}
                      />
                      {formErrors.phone && <p className="text-xs text-red-600 mt-0.5">{formErrors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="patient@example.com"
                        className={`w-full px-3 py-2 text-sm rounded-lg border ${
                          formErrors.email ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white`}
                      />
                      {formErrors.email && <p className="text-xs text-red-600 mt-0.5">{formErrors.email}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Primary Area of Pain</label>
                        <select
                          name="condition"
                          value={formData.condition}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                        >
                          <option value="Lower Back & Lumbar Spine">Lower Back / Lumbar</option>
                          <option value="Neck & Cervical Spine">Neck & Shoulder Tension</option>
                          <option value="Sciatica & Leg Pain">Sciatica & Leg Pain</option>
                          <option value="Joint & Arthritis Pain">Joint & Knee Arthritis</option>
                          <option value="Spine Diagnostics & Second Opinion">Spine Second Opinion</option>
                          <option value="Failed Back Surgery">Post-Surgical Pain</option>
                          <option value="Comprehensive Pain Evaluation">Comprehensive Evaluation</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Best Time to Contact</label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                        >
                          <option value="Morning">Morning (8am - 12pm)</option>
                          <option value="Afternoon">Afternoon (12pm - 5pm)</option>
                          <option value="Anytime">Anytime Today</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Symptoms or Brief Notes (Optional)</label>
                      <textarea
                        name="notes"
                        rows="2"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Briefly describe your pain, how long you've had it, or prior treatments..."
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Securing Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Same-Week Consultation</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-500 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>HIPAA Compliant. Your personal data is confidential and secure.</span>
                    </div>

                    <div className="text-center pt-1 border-t border-slate-100">
                      <Link
                        to="/book"
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1"
                      >
                        Prefer live online scheduling? Use our interactive Tebra booking calendar &rarr;
                      </Link>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. IN-NETWORK INSURANCE & ZERO FACILITY FEES GUARANTEE STRIP */}
      <section className="bg-slate-100 border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left max-w-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Insurance & Cost Transparency</span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">In-Network With Major Insurers & Zero Hospital Fees</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                As an independent practice, our procedures carry no hospital facility fee markups. You receive fellowship-quality care with minimal out-of-pocket costs.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-700">
              <span className="px-3 py-1.5 bg-white border border-slate-300 rounded-md shadow-2xs">Medicare</span>
              <span className="px-3 py-1.5 bg-white border border-slate-300 rounded-md shadow-2xs">Blue Cross Blue Shield</span>
              <span className="px-3 py-1.5 bg-white border border-slate-300 rounded-md shadow-2xs">UnitedHealthcare</span>
              <span className="px-3 py-1.5 bg-white border border-slate-300 rounded-md shadow-2xs">Aetna</span>
              <span className="px-3 py-1.5 bg-white border border-slate-300 rounded-md shadow-2xs">Cigna</span>
              <span className="px-3 py-1.5 bg-white border border-slate-300 rounded-md shadow-2xs">Humana</span>
              <span className="px-3 py-1.5 bg-white border border-slate-300 rounded-md shadow-2xs">Tricare</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TARGETED CONDITIONS SECTION */}
      <section className="py-16 bg-white border-b border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Clinical Focus Areas</div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Conditions We Treat with Targeted Interventions
            </h2>
            <p className="text-base text-slate-600 mt-2">
              We focus on identifying the precise anatomical source of pain rather than just prescribing painkillers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageData.conditions.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERVENTIONAL PROCEDURES HIGHLIGHT */}
      <section className="py-16 bg-slate-50 border-b border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Fluoroscopy-Guided Outpatient Care</div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Advanced Non-Surgical Procedures
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Conducted in our sterile on-site procedure suite with real-time fluoroscopic imaging for maximum patient safety and therapeutic accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageData.procedures.map((proc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex-shrink-0 flex items-center justify-center mt-1">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{proc.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{proc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PHYSICIAN LEADERSHIP & CREDENTIALS */}
      <section className="py-16 bg-white border-b border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
                <img
                  src="/images/ashvin-amara.jpg"
                  alt="Dr. Ashvin K. Amara, MD - Interventional Pain Specialist Charlotte NC"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="p-4 bg-slate-900 text-white">
                  <div className="text-sm font-bold text-emerald-400">Ashvin K. Amara, MD</div>
                  <div className="text-xs text-slate-300">Interventional Pain Specialist & Anesthesiologist</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                Physician Leadership
              </div>

              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Meet Dr. Ashvin K. Amara, MD
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Dr. Ashvin K. Amara is double-board-certified in Anesthesiology and Interventional Pain Medicine. He completed rigorous residency and ACGME-accredited fellowship training at premier academic medical centers.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Dedicated to non-opioid, non-surgical pain management, Dr. Amara leverages cutting-edge fluoroscopy guidance and neuromodulation to diagnose and resolve complex chronic pain conditions while helping patients avoid invasive spine surgeries.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-sm">Double-Board Certified</div>
                  <div className="text-xs text-slate-600 mt-0.5">American Board of Medical Specialties (ABMS)</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-sm">Fellowship Trained</div>
                  <div className="text-xs text-slate-600 mt-0.5">ACGME-Accredited Interventional Pain Medicine</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-sm">Zero Hospital Facility Fees</div>
                  <div className="text-xs text-slate-600 mt-0.5">Independent clinic saving patients hundreds in costs</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-sm">Same-Week Scheduling</div>
                  <div className="text-xs text-slate-600 mt-0.5">Dedicated slots reserved for acute pain inquiries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 bg-slate-50 border-b border-slate-200 text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Patient Inquiries</div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Have questions about your consultation, procedures, or insurance coverage?
            </p>
          </div>

          <div className="space-y-4">
            {pageData.faqs.map((faq, idx) => (
              <div key={idx} className="p-6 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2">
                  <span className="text-emerald-600 font-black">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CLINIC LOCATION, HOURS & DIRECT CONTACT */}
      <section className="py-16 bg-white text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                South Charlotte Location
              </div>

              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Visit Our Modern Charlotte Clinic
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Conveniently located off South Boulevard and Highway 51 in South Charlotte, our independent outpatient center features comfortable consultation suites and on-site fluoroscopy facilities.
              </p>

              <div className="space-y-3 pt-2 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Amara Pain & Spine</strong>
                    <span>6429 Bannington Road, Suite B, Charlotte, NC 28226</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Clinic Hours</strong>
                    <span>Monday – Friday: 8:00 AM – 5:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Phone & Appointments</strong>
                    <a href="tel:+17045039338" className="text-emerald-700 font-bold hover:underline">
                      (704) 503-9338
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="https://maps.google.com/?q=6429+Bannington+Road+Suite+B+Charlotte+NC+28226"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-colors inline-flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" /> Open in Google Maps
                </a>
                <a
                  href="tel:+17045039338"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Call (704) 503-9338
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-xl space-y-6">
                <div>
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Ready to Begin?</div>
                  <h3 className="text-2xl font-black mt-1">Get Back to Living Pain-Free</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Same-week consultations are available. We are in-network with Medicare and major private health plans.
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href="tel:+17045039338"
                    className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Phone className="w-4 h-4" /> Call to Book: (704) 503-9338
                  </a>
                  <Link
                    to="/book"
                    className="w-full py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all"
                  >
                    <Calendar className="w-4 h-4 text-emerald-400" /> Book Online via Tebra EHR
                  </Link>
                </div>

                <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center">
                  Zero Hospital Facility Fees &bull; In-Network Specialists &bull; Charlotte, NC
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
