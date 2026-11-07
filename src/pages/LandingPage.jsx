import React, { useState, useRef, useEffect } from 'react';
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
  Sparkles,
  ChevronDown
} from 'lucide-react';

const INSURANCE_PROVIDERS = [
  { name: 'Blue Cross Blue Shield NC', logo: '/images/insurers/BCBS NC.png', alt: 'Blue Cross Blue Shield NC', type: 'Commercial & Medicare' },
  { name: 'BCBS Blue Advantage', logo: '/images/insurers/BCBS Blue Advantage.png', alt: 'BCBS Blue Advantage' },
  { name: 'BCBS Blue Options', logo: '/images/insurers/BCBS Blue Options.png', alt: 'BCBS Blue Options' },
  { name: 'NC State Health Plan', logo: '/images/insurers/BCBS NC State Health Plan Network.png', alt: 'NC State Health Plan' },
  { name: 'Healthy Blue', logo: '/images/insurers/HealthyBlue-HB.png', alt: 'Healthy Blue NC', type: 'Medicaid' },
  { name: 'Aetna Commercial', logo: '/images/insurers/Aetna Commercial.png', alt: 'Aetna Commercial' },
  { name: 'Aetna Medicare', logo: '/images/insurers/Aetna Medicare.png', alt: 'Aetna Medicare Advantage' },
  { name: 'UnitedHealthcare', logo: '/images/insurers/United Healthcare Commercial.png', alt: 'UnitedHealthcare', type: 'Choice Plus' },
  { name: 'Cigna Healthcare', logo: '/images/insurers/Cigna-Logo.png', alt: 'Cigna Healthcare' },
  { name: 'Humana', logo: '/images/insurers/Humana logo png.png', alt: 'Humana', type: 'Medicare Advantage' },
  { name: 'NC Medicaid Direct', logo: '/images/insurers/Medicaid NC Drect logo.png', alt: 'NC Medicaid Direct' },
  { name: 'Wellcare', logo: '/images/insurers/Wellcare logo png.png', alt: 'Wellcare' },
  { name: 'AmeriHealth Caritas', logo: '/images/insurers/amerihealth-consd-logo.jpg', alt: 'AmeriHealth Caritas' },
  { name: 'Carolina Complete Health', logo: '/images/insurers/carolina-complete-health-logo.jpg', alt: 'Carolina Complete Health' },
  { name: 'Traditional Medicare', badge: 'CMS', type: 'Part B' },
  { name: 'MedCost', badge: 'MED', type: 'Carolinas Network' },
  { name: 'MultiPlan / PHCS', badge: 'PHCS' },
  { name: 'Choice-Health', badge: 'CHC' },
  { name: 'Novant Health Plan', badge: 'NOV' },
  { name: "Workers' Compensation", badge: 'WORK', type: 'Occupational Claims' }
];

const INSURER_LOGOS = INSURANCE_PROVIDERS.filter(p => p.logo).map(p => ({ name: p.name, src: p.logo }));

const LANDING_PAGE_DATA = {
  'pain-management-charlotte': {
    slug: 'pain-management-charlotte',
    badge: 'Comprehensive Interventional Care',
    metaTitle: 'Pain Management Charlotte NC | Comprehensive Non-Surgical Relief | Amara Pain',
    metaDesc: "Charlotte's trusted physician-led pain management clinic. Dr. Ashvin K. Amara provides advanced interventional solutions, fluoroscopy-guided care, same-week appointments, and zero hospital facility fees.",
    headline: 'Expert, Non-Surgical Pain Management in Charlotte, NC',
    subheadline: 'Restore your mobility and quality of life with double-board-certified interventional care. Personalized, image-guided treatments targeting the source of chronic pain—with same-week availability and zero hospital facility fees.',
    painType: 'Comprehensive Pain Evaluation',
    formButtonText: 'Request a Consultation',
    heroPoints: [
      'Quick Intake Response: Our Charlotte team reviews your details and coordinates your consultation slot.',
      'Zero Hospital Facility Surcharges: Independent practice protects you from high hospital fees.',
      'Major Insurances Accepted: Medicare Part B, NC/SC Medicaid, BCBS, UnitedHealthcare, Aetna, Cigna, and Humana.',
      'Double-board-certified fellowship-trained physician (Dr. Ashvin K. Amara, MD)',
      'Precision fluoroscopy-guided outpatient injections & nerve blocks'
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
    headline: "Charlotte's Premier Back Pain Doctor: Lasting Relief Without Surgery",
    subheadline: 'Suffering from chronic lower back stiffness, herniated discs, or degenerative spine conditions? Get definitive diagnostic clarity and precision interventional therapy from fellowship-trained physician Dr. Ashvin K. Amara.',
    painType: 'Lower Back & Lumbar Spine',
    formButtonText: 'Request a Back Pain Consultation',
    heroPoints: [
      'Quick Intake Response: Our Charlotte team reviews your details and coordinates your consultation slot.',
      'Zero Hospital Facility Surcharges: Independent practice protects you from high hospital fees.',
      'Major Insurances Accepted: Medicare Part B, NC/SC Medicaid, BCBS, UnitedHealthcare, Aetna, Cigna, and Humana.',
      'Targeted non-surgical treatments for herniated, bulging, or slipped discs',
      'Precision image-guided epidural steroid injections & radiofrequency ablation'
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
    formButtonText: 'Request a Neck Pain Consultation',
    heroPoints: [
      'Quick Intake Response: Our Charlotte team reviews your details and coordinates your consultation slot.',
      'Zero Hospital Facility Surcharges: Independent practice protects you from high hospital fees.',
      'Major Insurances Accepted: Medicare Part B, NC/SC Medicaid, BCBS, UnitedHealthcare, Aetna, Cigna, and Humana.',
      'Comprehensive care for cervical radiculopathy, whiplash, and facet arthritis',
      'Fluoroscopy-guided cervical epidural injections and diagnostic blocks'
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
    formButtonText: 'Request a Sciatica Consultation',
    heroPoints: [
      'Quick Intake Response: Our Charlotte team reviews your details and coordinates your consultation slot.',
      'Zero Hospital Facility Surcharges: Independent practice protects you from high hospital fees.',
      'Major Insurances Accepted: Medicare Part B, NC/SC Medicaid, BCBS, UnitedHealthcare, Aetna, Cigna, and Humana.',
      'Rapid relief for burning, shooting nerve pain traveling from hip to foot',
      'Precision fluoroscopy-guided lumbar epidural steroid injections'
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
    formButtonText: 'Request a Spine Consultation',
    heroPoints: [
      'Quick Intake Response: Our Charlotte team reviews your details and coordinates your consultation slot.',
      'Zero Hospital Facility Surcharges: Independent practice protects you from high hospital fees.',
      'Major Insurances Accepted: Medicare Part B, NC/SC Medicaid, BCBS, UnitedHealthcare, Aetna, Cigna, and Humana.',
      'Double-board-certified in Anesthesiology and Pain Medicine (Fellowship Trained)',
      'Expert second opinions before committing to major spinal fusion or disc surgery'
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
      { q: 'What are Dr. Amara\'s qualifications?', a: "Dr. Ashvin K. Amara, MD completed residency and ACGME-accredited fellowship training at premier academic institutions and is double-board-certified by the American Board of Medical Specialties (ABMS)." }
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
    formButtonText: 'Request a Procedure Consultation',
    heroPoints: [
      'Quick Intake Response: Our Charlotte team reviews your details and coordinates your consultation slot.',
      'Zero Hospital Facility Surcharges: Independent practice protects you from high hospital fees.',
      'Major Insurances Accepted: Medicare Part B, NC/SC Medicaid, BCBS, UnitedHealthcare, Aetna, Cigna, and Humana.',
      'Image-guided precision utilizing high-definition C-arm fluoroscopy',
      'Targeted treatments delivering medication directly to the pain source'
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
    formButtonText: 'Submit Consultation Request',
    heroPoints: [
      'Quick Intake Response: Our Charlotte team reviews your details and coordinates your consultation slot.',
      'Zero Hospital Facility Surcharges: Independent practice protects you from high hospital fees.',
      'Major Insurances Accepted: Medicare Part B, NC/SC Medicaid, BCBS, UnitedHealthcare, Aetna, Cigna, and Humana.',
      'Direct contact from dedicated clinical care coordinators within 24 hours',
      'Same-week appointment availability in South Charlotte'
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

/**
 * DEDICATED HIGH-CONVERTING HEALTHCARE LANDING PAGE FOR CHARLOTTE
 * Route: /pain-management-charlotte/
 *
 * Implements:
 * - Minimal Header (Logo + Click-to-call, no navigation distractions)
 * - Patient-Focused Hero ("Live With Less Pain. Get Back to What Matters.")
 * - Simple 2-Field Lead Form (Full Name + Phone Number ONLY)
 * - Mobile-First, Accessible (Large fonts, high contrast, WCAG AAA compliant)
 * - Trust & Experience (Physician credentials, zero facility fees, guided care)
 * - In-Network Insurance Providers (20 verified providers, authentic logos)
 * - Final Conversion CTA & Minimal Footer
 * - Mobile Sticky Call Now / Request Call Back Bar
 */

/**
 * Google Ads Lead Conversion Event Tracker for Pain Management Charlotte
 * Target URL: https://amarapain.com/pain-management-charlotte/
 * Conversion ID: AW-18239109920 | Conversion Label: Rb8WCPqP87MdEKD2ivlD
 */
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };

  const gtagFn = (typeof window !== 'undefined' && typeof window.gtag === 'function')
    ? window.gtag
    : null;

  if (gtagFn) {
    gtagFn('event', 'conversion', {
      'send_to': 'AW-18239109920/Rb8WCPqP87MdEKD2ivlD',
      'event_callback': callback
    });
  }

  return false;
}

function DedicatedPainManagementLandingPage({ pageData, formRenderTimeRef }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedLeadId, setSubmittedLeadId] = useState('');

  // Register gtag_report_conversion in window scope exclusively on Pain Management Charlotte
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.gtag_report_conversion = gtag_report_conversion;
    }
    return () => {
      if (typeof window !== 'undefined' && window.gtag_report_conversion === gtag_report_conversion) {
        delete window.gtag_report_conversion;
      }
    };
  }, []);

  const formatUSPhone = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const formatted = formatUSPhone(value);
      setFormData((prev) => ({ ...prev, phone: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters)';
    }
    const digits = formData.phone.replace(/\D/g, '');
    if (!digits || digits.length < 10) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const leadId = `APS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    try {
      const parts = formData.fullName.trim().split(/\s+/);
      const firstName = parts[0] || '';
      const lastName = parts.slice(1).join(' ') || 'Patient';

      const submitPayload = {
        idempotencyKey: leadId,
        fullName: formData.fullName.trim(),
        firstName,
        lastName,
        phone: formData.phone.trim(),
        email: '',
        landingPage: 'pain-management-charlotte',
        pageIntent: 'Comprehensive Pain Evaluation',
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        pageTitle: pageData.metaTitle || 'Pain Management Charlotte NC | Comprehensive Non-Surgical Relief | Amara Pain',
        formName: 'callback-request-form',
        clientRenderTime: formRenderTimeRef?.current || Date.now()
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotency-Key': leadId
        },
        body: JSON.stringify(submitPayload)
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result || !result.success) {
        const errorMsg =
          (result && result.error && result.error.message) ||
          'Unable to submit your call back request at this time. Please call our Charlotte clinic directly at (704) 503-9338.';
        setSubmitError(errorMsg);
        setIsSubmitting(false);
        return;
      }

      // Persist to localStorage for AdminDashboard
      try {
        const existing = JSON.parse(localStorage.getItem('APS_LEADS') || '[]');
        const newLead = {
          id: result.leadId || leadId,
          type: 'callback',
          status: 'New',
          dateCreated: new Date().toISOString(),
          source: 'pain-management-charlotte',
          patient: {
            firstName,
            lastName,
            phone: formData.phone.trim(),
            email: ''
          },
          condition: 'Comprehensive Pain Evaluation',
          appointmentDate: new Date().toLocaleDateString()
        };
        existing.unshift(newLead);
        localStorage.setItem('APS_LEADS', JSON.stringify(existing));
      } catch (storageErr) {
        console.warn('Could not save to localStorage:', storageErr);
      }

      // Google Ads Lead Conversion Event Trigger
      const storageKey = `APS_GOOGLE_ADS_CONVERSIONS_${leadId}`;
      let hasFired = false;
      try {
        hasFired = sessionStorage.getItem(storageKey) === 'fired';
      } catch (_err) {
        // Storage access check
      }

      if (!hasFired) {
        try {
          gtag_report_conversion();
          sessionStorage.setItem(storageKey, 'fired');
        } catch (gtagErr) {
          console.warn('Google Ads conversion tracking unavailable:', gtagErr);
        }
      }

      setSubmittedLeadId(result.leadId || leadId);
      setSubmitSuccess(true);
    } catch (err) {
      console.error('Lead submission failed:', err);
      setSubmitError('Unable to transmit request. Please call our clinic directly at (704) 503-9338.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = (e) => {
    e?.preventDefault();
    const elem = document.getElementById('primary-lead-form');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = elem.querySelector('input[name="fullName"]');
      if (input) setTimeout(() => input.focus(), 500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans antialiased">
      {/* SECTION 1 — MINIMAL HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg">
            <img
              src="/images/AmaraPain_Logo.png"
              alt="Amara Pain & Spine Management - Charlotte NC"
              className="h-9 sm:h-12 w-auto object-contain"
              width="180"
              height="48"
            />
          </a>
          <a
            href="tel:+17045039338"
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-base transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Call Amara Pain clinic directly at (704) 503-9338"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">Call Now:</span>
            <span className="font-extrabold text-emerald-300 sm:text-white">(704) 503-9338</span>
          </a>
        </div>
      </header>

      {/* TOP PATIENT ASSURANCE BANNER (Desktop only to guarantee mobile form priority above fold) */}
      <div className="hidden lg:block bg-slate-900 text-white text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 mx-auto sm:mx-0 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-300 font-bold">Accepting New Patients:</span>
            <span className="text-slate-200">Same-Week Consultations Available</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-300 font-medium text-xs">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Zero Hospital Facility Fees
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Double-Board Certified Physician
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT WRAPPER WITH RESPONSIVE CSS ORDERING */}
      <main className="flex flex-col">
        {/* SECTION 2 (MOBILE ORDER 1): HERO SECTION / TOP LEAD FORM */}
        <section id="top" className="order-1 lg:order-1 relative bg-gradient-to-b from-white via-slate-50 to-white pt-3 pb-6 sm:py-8 lg:py-16 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Desktop Left Column: Compelling Patient Copy & Trust Checkpoints (Hidden on mobile to prioritize form above fold) */}
              <div className="hidden lg:block lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold tracking-wide">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  South Charlotte Interventional Pain Care
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Live With Less Pain. <br className="hidden sm:inline" />
                  <span className="text-emerald-700">Get Back to What Matters.</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  Personalized pain management care designed to help you move comfortably and improve your quality of life.
                </p>

                {/* Exact Recovered SLO Checkpoints */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-semibold text-slate-800">
                      Double-board-certified fellowship-trained physician (Dr. Ashvin K. Amara, MD)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-medium text-slate-700">
                      Zero Hospital Facility Surcharges: Independent practice protects you from high hospital fees.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-medium text-slate-700">
                      Quick Intake Response: Our Charlotte team reviews your details and coordinates your consultation slot.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-medium text-slate-700">
                      Major Insurances Accepted: Medicare Part B, NC/SC Medicaid, BCBS, UnitedHealthcare, Aetna, Cigna, and Humana.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-medium text-slate-700">
                      Precision fluoroscopy-guided outpatient injections &amp; nerve blocks
                    </span>
                  </div>
                </div>

                {/* Authentic Senior Photography: Restoring Mobility */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm mt-4">
                  <picture className="shrink-0">
                    <source srcSet="/images/audience/hero_senior_mobility.webp" type="image/webp" />
                    <img
                      src="/images/audience/hero_senior_mobility.jpg"
                      alt="Approachable older adult enjoying restored comfort and mobility"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-emerald-300"
                      loading="eager"
                      width="80"
                      height="80"
                    />
                  </picture>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-slate-900">
                      Dedicated to Restoring Daily Comfort &amp; Mobility
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-snug mt-1">
                      Helping older adults and active seniors in South Charlotte return to everyday life without surgery.
                    </p>
                  </div>
                </div>

                {/* Immediate Telephone Intake Callout */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Prefer Immediate Telephone Intake?</div>
                      <a href="tel:+17045039338" className="text-xl sm:text-2xl font-black text-white hover:text-emerald-300 transition-colors">
                        (704) 503-9338
                      </a>
                    </div>
                  </div>
                  <a
                    href="tel:+17045039338"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide text-center transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    Call Clinic Directly
                  </a>
                </div>
              </div>

              {/* Right Column (Mobile: FIRST MAIN CONTENT VISIBLE): SECTION 3 — SIMPLE LEAD FORM */}
              <div className="lg:col-span-5 w-full" id="primary-lead-form">
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-4 sm:p-6 lg:p-8 text-left relative">
                  
                  {submitSuccess ? (
                    <div className="py-6 sm:py-8 text-center space-y-4 sm:space-y-5" role="status" aria-live="polite">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Request Confirmed!</h2>
                        <p className="text-sm font-semibold text-emerald-700 mt-1">We will call you shortly.</p>
                      </div>
                      {submittedLeadId && (
                        <div className="inline-block px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-700">
                          Confirmation ID: <span className="font-bold">{submittedLeadId}</span>
                        </div>
                      )}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                        Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Our Charlotte clinical intake team has received your call back request and will contact you at <strong className="text-slate-900">{formData.phone}</strong> within 24 hours to coordinate your visit.
                      </p>
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-4 text-left space-y-2 text-xs text-slate-700">
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">Next Steps:</div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-emerald-600">1. Review:</span>
                          <span>Clinical staff reviews your request.</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-emerald-600">2. Phone Call:</span>
                          <span>We call to coordinate a consultation slot that fits your schedule.</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-emerald-600">3. Specialist Visit:</span>
                          <span>Comprehensive diagnostic examination with Dr. Amara.</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <a
                          href="tel:+17045039338"
                          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-sm sm:text-base hover:bg-slate-800 transition-colors shadow-sm"
                        >
                          <Phone className="w-4 h-4 text-emerald-400" />
                          Call Our Clinic: (704) 503-9338
                        </a>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                      <div className="border-b border-slate-100 pb-3 sm:pb-4">
                        <span className="text-[11px] sm:text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                          Simple Fast-Track Intake
                        </span>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mt-0.5 sm:mt-1">
                          Request a Call Back
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                          Enter your name and phone number below. Our Charlotte clinical intake team will contact you promptly.
                        </p>
                      </div>

                      {/* Submission Error Alert */}
                      {submitError && (
                        <div className="p-3 sm:p-4 rounded-xl bg-red-50 border border-red-200 text-left space-y-1.5" role="alert">
                          <div className="text-xs font-bold text-red-800">Submission Notice</div>
                          <p className="text-xs text-red-700 leading-relaxed">{submitError}</p>
                          <div className="pt-1">
                            <a
                              href="tel:+17045039338"
                              className="text-xs font-bold text-emerald-800 hover:underline inline-flex items-center gap-1"
                            >
                              <Phone className="w-3.5 h-3.5" /> Call Clinic Directly: (704) 503-9338
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Field 1: Full Name */}
                      <div>
                        <label htmlFor="hero-fullName" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                          Full Name *
                        </label>
                        <input
                          id="hero-fullName"
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g., Robert Smith"
                          autoComplete="name"
                          aria-required="true"
                          aria-invalid={!!formErrors.fullName}
                          aria-describedby={formErrors.fullName ? 'hero-fullName-error' : undefined}
                          className={`w-full px-3.5 py-3 sm:py-3.5 text-base rounded-xl border ${
                            formErrors.fullName ? 'border-red-500 bg-red-50/40 ring-1 ring-red-400' : 'border-slate-300'
                          } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 bg-white placeholder-slate-400 transition-colors`}
                        />
                        {formErrors.fullName && (
                          <p id="hero-fullName-error" className="text-xs font-semibold text-red-600 mt-1" role="alert">
                            {formErrors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Field 2: Phone Number */}
                      <div>
                        <label htmlFor="hero-phone" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                          Phone Number *
                        </label>
                        <input
                          id="hero-phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(704) 555-0123"
                          autoComplete="tel"
                          aria-required="true"
                          aria-invalid={!!formErrors.phone}
                          aria-describedby={formErrors.phone ? 'hero-phone-error' : undefined}
                          className={`w-full px-3.5 py-3 sm:py-3.5 text-base rounded-xl border ${
                            formErrors.phone ? 'border-red-500 bg-red-50/40 ring-1 ring-red-400' : 'border-slate-300'
                          } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 bg-white placeholder-slate-400 transition-colors`}
                        />
                        {formErrors.phone && (
                          <p id="hero-phone-error" className="text-xs font-semibold text-red-600 mt-1" role="alert">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 sm:py-4 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-sm sm:text-base lg:text-lg tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Connecting With Clinic...</span>
                          </>
                        ) : (
                          <>
                            <span>REQUEST A CALL BACK</span>
                            <ChevronRight className="w-5 h-5" />
                          </>
                        )}
                      </button>

                      {/* Privacy Reassurance & Trust Statement */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-start gap-1.5 text-left text-[11px] sm:text-xs text-slate-500 leading-snug">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            We respect your privacy. Contact details are collected solely for appointment coordination. No health data is shared with advertising platforms. Read our{' '}
                            <Link to="/privacy" className="text-emerald-700 hover:underline font-semibold">
                              Privacy Policy
                            </Link>.
                          </span>
                        </div>
                        <div className="text-center text-[11px] sm:text-xs font-bold text-emerald-900 bg-emerald-50 py-1.5 sm:py-2 px-3 rounded-lg border border-emerald-200">
                          Direct contact from dedicated clinical care coordinators within 24 hours
                        </div>
                      </div>
                    </form>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4 (MOBILE ORDER 2): IN-NETWORK INSURANCE PROVIDERS */}
        <section className="order-2 lg:order-4 insurance-static-section bg-slate-50 border-b border-slate-200 py-10 sm:py-12 lg:py-16" aria-label="Insurance and Payer Networks">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-center sm:text-left mb-6 sm:mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">Coverage &amp; Affordability</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Accepted Insurance Providers &amp; Plans</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                Medicare Part B, NC/SC Medicaid, and major commercial health plans accepted. Zero hospital facility fee markups.
              </p>
            </div>

            {/* Static Responsive Grid (Stationary on Desktop, Tablet, and Mobile) */}
            <div className="insurance-logos-grid">
              {INSURANCE_PROVIDERS.map((item, idx) => (
                <div key={idx} className="insurance-logo-card">
                  {item.logo ? (
                    <div className="insurance-logo-box">
                      <img src={item.logo} alt={item.alt || item.name} className="insurance-logo-img" loading="lazy" />
                    </div>
                  ) : (
                    <div className="insurance-card-badge">{item.badge}</div>
                  )}
                  <div className="insurance-card-info">
                    <span className="insurance-card-name" title={item.name}>{item.name}</span>
                    {item.type && <span className="insurance-card-type">{item.type}</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center sm:text-left">
              <p className="text-xs text-slate-500 insurance-notice-text">
                Insurance coverage and provider availability may vary by hospital and plan. We verify active benefits directly with your insurer prior to treatment.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 (MOBILE ORDER 3): SUPPORTING HEALTHCARE IMAGES & CLINICAL LEADERSHIP */}
        <section className="order-3 lg:order-3 py-12 sm:py-16 bg-white border-b border-slate-200 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">Clinical Leadership &amp; Facility</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mt-1">
                Compassionate Care &amp; Advanced Facilities
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                Experience focused, personalized medical attention in a modern outpatient practice designed for senior comfort and mobility.
              </p>
            </div>

            {/* Physician Spotlight & Authentic Imagery */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden p-6 sm:p-8">
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 relative">
                  <picture>
                    <source srcSet="/images/ashvin-amara.webp" type="image/webp" />
                    <img
                      src="/images/ashvin-amara.jpg"
                      alt="Dr. Ashvin Kumar Amara, MD - Double-Board Certified Interventional Pain Specialist"
                      className="w-full aspect-[4/3] lg:aspect-square object-cover object-top"
                      loading="lazy"
                      width="500"
                      height="500"
                    />
                  </picture>
                  <div className="p-3.5 bg-slate-900 text-white">
                    <div className="text-sm font-bold text-emerald-400">Ashvin Kumar Amara, MD</div>
                    <div className="text-xs text-slate-300 mt-0.5">Double-Board Certified · Anesthesiology &amp; Interventional Pain Medicine · NPI: 1356658389</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-emerald-700" />
                  Double-Board Certified Physician Leadership
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Meet Dr. Ashvin Kumar Amara, MD
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Dr. Ashvin Kumar Amara is double-board-certified in Anesthesiology and Interventional Pain Medicine. He completed rigorous residency and ACGME-accredited fellowship training at premier academic medical centers.
                </p>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Dedicated to non-opioid, non-surgical pain management, Dr. Amara leverages precision fluoroscopy guidance to diagnose and resolve complex chronic pain conditions while helping patients avoid invasive spine surgeries.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Request a Call Back With Our Team</span>
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Supporting Clinical Images: Consultation & Outpatient Procedure Suite */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                <picture>
                  <source srcSet="/images/audience/senior_consultation.webp" type="image/webp" />
                  <img
                    src="/images/audience/senior_consultation.jpg"
                    alt="Senior patient consulting with physician regarding chronic pain relief"
                    className="w-full h-56 sm:h-64 object-cover"
                    loading="lazy"
                    width="600"
                    height="256"
                  />
                </picture>
                <div className="p-5">
                  <h4 className="font-bold text-slate-900 text-base">Compassionate, One-on-One Consultations</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    We take the time to listen, review past imaging, and understand how pain impacts your daily life.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                <picture>
                  <source srcSet="/images/audience/interventional_procedure_suite.webp" type="image/webp" />
                  <img
                    src="/images/audience/interventional_procedure_suite.jpg"
                    alt="In-Office Interventional Fluoroscopy Procedure Suite - Amara Pain & Spine"
                    className="w-full h-56 sm:h-64 object-cover"
                    loading="lazy"
                    width="600"
                    height="256"
                  />
                </picture>
                <div className="p-5">
                  <h4 className="font-bold text-slate-900 text-base">Sterile In-Office Fluoroscopy Suite</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    All procedures performed on-site with live X-ray guidance and zero hospital facility surcharges.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Supporting Mobility Photo Card */}
            <div className="lg:hidden flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-emerald-200 shadow-sm">
              <picture className="shrink-0">
                <source srcSet="/images/audience/hero_senior_mobility.webp" type="image/webp" />
                <img
                  src="/images/audience/hero_senior_mobility.jpg"
                  alt="Approachable older adult enjoying restored comfort and mobility"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-emerald-300"
                  loading="lazy"
                  width="80"
                  height="80"
                />
              </picture>
              <div>
                <div className="text-sm sm:text-base font-bold text-slate-900">
                  Dedicated to Restoring Daily Comfort &amp; Mobility
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-snug mt-1">
                  Helping older adults and active seniors in South Charlotte return to everyday life without surgery.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 6 (MOBILE ORDER 4): BRIEF TREATMENT BENEFITS & CLINICAL CONTENT */}
        <section className="order-4 lg:order-2 py-12 sm:py-16 lg:py-20 bg-slate-50 lg:bg-white border-b border-slate-200 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            
            {/* Header */}
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">Trust &amp; Clinical Excellence</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mt-1">
                Experienced, Patient-Focused Pain Relief in Charlotte
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 mt-2 leading-relaxed">
                We specialize in targeted, non-surgical interventional care to diagnose and relieve the anatomical source of pain—helping you regain comfort, mobility, and independence.
              </p>
            </div>

            {/* Mobile Summary of Core Value Propositions & SLO Checkpoints */}
            <div className="lg:hidden bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="text-sm font-bold text-slate-900">Why Patients Choose Amara Pain &amp; Spine:</div>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Double-Board Certified:</strong> Dr. Ashvin K. Amara, MD provides specialized spine and joint expertise.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Hospital Surcharges:</strong> Independent outpatient clinic saves you hundreds in hospital facility fees.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Quick Intake Response:</strong> Our Charlotte team reviews your details and coordinates your consultation slot.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Major Insurances Accepted:</strong> Medicare Part B, NC/SC Medicaid, BCBS, UnitedHealthcare, Aetna, Cigna, and Humana.</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Need immediate help?</span>
                <a href="tel:+17045039338" className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> (704) 503-9338
                </a>
              </div>
            </div>

            {/* 4 Pillars of Care */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white lg:bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Double-Board Certified</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Led by Dr. Ashvin Kumar Amara, MD, fellowship-trained in Anesthesiology and Interventional Pain Medicine.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white lg:bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Zero Hospital Facility Fees</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  As an independent clinic, we never charge expensive hospital facility surcharges, saving you hundreds out-of-pocket.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white lg:bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Image-Guided Precision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Advanced fluoroscopy (live C-arm X-ray) guidance ensures accurate, sub-millimeter medication placement.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white lg:bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Personalized Recovery</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our treatments aim for lasting functional restoration so you can walk, bend, garden, and enjoy family activities.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 7 (MOBILE ORDER 5): FINAL CONVERSION CTA */}
        <section className="order-5 lg:order-5 py-14 sm:py-16 lg:py-20 bg-slate-900 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Take the First Step</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Ready to Take the Next Step Toward Relief?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Do not let chronic pain dictate what you can and cannot do. Request a callback or call our Charlotte clinic directly today to schedule your evaluation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 sm:pt-4">
              <button
                type="button"
                onClick={scrollToForm}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm sm:text-base uppercase tracking-wider transition-all shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                REQUEST A CALL BACK
              </button>
              <a
                href="tel:+17045039338"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-black text-sm sm:text-base uppercase tracking-wider transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <Phone className="w-5 h-5 text-emerald-400" />
                Call (704) 503-9338
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* SECTION 8 — MINIMAL FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 pb-24 lg:pb-12 border-t border-slate-800 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800 text-center sm:text-left">
            <div className="space-y-1">
              <div className="text-white font-black text-base">Amara Pain &amp; Spine</div>
              <div className="text-slate-400 text-xs">6429 Bannington Road, Suite B, Charlotte, NC 28226</div>
              <div className="text-slate-400 text-xs">Hours: Mon – Fri: 8:00 AM – 5:00 PM</div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="tel:+17045039338"
                className="inline-flex items-center gap-1.5 text-white hover:text-emerald-300 font-bold text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                (704) 503-9338
              </a>
              <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors underline">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="space-y-3 text-slate-500 text-[11px] leading-relaxed text-center sm:text-left">
            <p>
              Healthcare Disclaimer: The information provided on this landing page is for educational and appointment coordination purposes only and does not constitute formal medical advice or a doctor-patient relationship. Always seek the advice of a qualified physician regarding any medical condition.
            </p>
            <p>
              &copy; 2026 Amara Pain &amp; Spine. All rights reserved. Double-Board Certified Interventional Spine &amp; Pain Care.
            </p>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CALL NOW / REQUEST CALL BACK BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-4 lg:hidden shadow-2xl">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <a
            href="tel:+17045039338"
            className="flex-1 py-3 px-3 rounded-xl bg-slate-900 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call Clinic</span>
          </a>
          <button
            type="button"
            onClick={scrollToForm}
            className="flex-1 py-3 px-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Request Call Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}

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

  // Intake Form State - Strictly 4 Approved Fields (First Name, Last Name, Phone, Email)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedLeadId, setSubmittedLeadId] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const formRenderTimeRef = useRef(0);
  useEffect(() => {
    formRenderTimeRef.current = Date.now();
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const leadId = `APS-${Date.now().toString(36).toUpperCase()}`;

    try {
      // 1. Submit lead to Google Sheets via Cloudflare Pages Function (/api/leads)
      const submitPayload = {
        idempotencyKey: leadId,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        landingPage: pageData.slug,
        pageIntent: pageData.painType || 'comprehensive-pain',
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        pageTitle: pageData.metaTitle || '',
        formName: 'consultation-form',
        clientRenderTime: formRenderTimeRef.current
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotency-Key': leadId
        },
        body: JSON.stringify(submitPayload)
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result || !result.success) {
        const errorMsg = (result && result.error && result.error.message)
          ? result.error.message
          : 'Unable to submit your consultation request at this time. Please call our Charlotte clinic directly at (704) 503-9338.';
        setSubmitError(errorMsg);
        setIsSubmitting(false);
        return;
      }

      // 2. Persist to localStorage for AdminDashboard.jsx
      try {
        const existing = JSON.parse(localStorage.getItem('APS_LEADS') || '[]');
        const newLead = {
          id: result.leadId || leadId,
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
          condition: pageData.painType,
          appointmentDate: new Date().toLocaleDateString()
        };
        existing.unshift(newLead);
        localStorage.setItem('APS_LEADS', JSON.stringify(existing));
      } catch (storageErr) {
        console.warn('Could not save to localStorage:', storageErr);
      }

      // 3. Google Ads Conversion Event Trigger
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
            send_to: `AW-18239109920/${conversionLabel}`,
            transaction_id: leadId
          });
          console.info(`[Google Ads] Conversion event fired for lead: ${leadId}`);
        } else {
          window.gtag('event', 'lead_form_submitted', {
            send_to: 'AW-18239109920',
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

      setSubmittedLeadId(result.leadId || leadId);
      setSubmitSuccess(true);
    } catch (err) {
      console.error('Lead submission failed:', err);
      setSubmitError('Unable to transmit request. Please call our clinic directly at (704) 503-9338.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dedicated single-page high-converting layout for primary campaign landing page
  if (derivedSlug === 'pain-management-charlotte') {
    return (
      <DedicatedPainManagementLandingPage
        pageData={pageData}
        formRenderTimeRef={formRenderTimeRef}
      />
    );
  }

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
      <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-8 pb-16 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-transparent to-slate-100/50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Targeted Medical Copy & SLO Reassurance */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {pageData.badge}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {pageData.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {pageData.subheadline}
              </p>

              {/* Exact Recovered SLO Checkpoints */}
              <div className="space-y-3 pt-2">
                {pageData.heroPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700 leading-snug">{point}</span>
                  </div>
                ))}
              </div>

              {/* Recovered Audience Mobility Reassurance Badge */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-emerald-100 shadow-2xs mt-4">
                <img
                  src="/images/audience/hero_senior_mobility.jpg"
                  alt="Dedicated to Restoring Daily Comfort & Mobility"
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-emerald-300"
                  loading="lazy"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Dedicated to Restoring Daily Comfort &amp; Mobility</div>
                  <div className="text-[11px] text-slate-600 leading-tight mt-0.5">
                    Helping older adults and active seniors in South Charlotte return to everyday life without surgery.
                  </div>
                </div>
              </div>

              {/* Direct Telephone Intake Callout */}
              <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Prefer Immediate Telephone Intake?</div>
                    <div className="text-lg font-black text-white">(704) 503-9338</div>
                  </div>
                </div>
                <a
                  href="tel:+17045039338"
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider text-center transition-colors"
                >
                  Call Clinic Directly
                </a>
              </div>
            </div>

            {/* Right Column: Fast-Track Consultation Intake Form (Strictly NO Appointment Timing Options) */}
            <div className="lg:col-span-5" id="consultation-form">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 text-left relative">
                
                {submitSuccess ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Consultation Request Received</h3>
                    {submittedLeadId && (
                      <div className="inline-block px-3 py-1 bg-slate-100 border border-slate-200 rounded-md text-xs font-mono text-slate-600">
                        Reference ID: {submittedLeadId}
                      </div>
                    )}
                    <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                      Thank you. Our Charlotte clinical intake team will review your symptom notes and insurance, then contact you promptly to coordinate your appointment.
                    </p>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2 text-xs">
                      <div className="font-bold text-slate-800">What happens next:</div>
                      <div className="flex items-start gap-2 text-slate-600">
                        <span className="font-bold text-emerald-600">1. Review:</span>
                        <span>Clinical staff reviews your symptoms and coverage.</span>
                      </div>
                      <div className="flex items-start gap-2 text-slate-600">
                        <span className="font-bold text-emerald-600">2. Coordination:</span>
                        <span>We call to confirm your consultation slot that fits your schedule.</span>
                      </div>
                      <div className="flex items-start gap-2 text-slate-600">
                        <span className="font-bold text-emerald-600">3. Specialist Visit:</span>
                        <span>In-depth examination and diagnostic review with Dr. Amara.</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href="tel:+17045039338"
                        className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-emerald-400" />
                        Call Our Clinic: (704) 503-9338
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Direct Clinic Scheduling</span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">Request a Consultation</h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Connect with our Charlotte clinical coordination team to schedule your diagnostic visit.
                      </p>
                    </div>

                    {/* Submission Error Alert */}
                    {submitError && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-left space-y-1.5">
                        <div className="text-xs font-bold text-red-800">Submission Notice</div>
                        <p className="text-xs text-red-700 leading-relaxed">{submitError}</p>
                        <div className="pt-0.5">
                          <a
                            href="tel:+17045039338"
                            className="text-xs font-bold text-emerald-800 hover:underline inline-flex items-center gap-1"
                          >
                            <Phone className="w-3.5 h-3.5" /> Call Clinic Directly: (704) 503-9338
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Patient Name Fields */}
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

                    {/* Contact Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(704) 555-0199"
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
                          placeholder="jane@example.com"
                          className={`w-full px-3 py-2 text-sm rounded-lg border ${
                            formErrors.email ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                          } focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white`}
                        />
                        {formErrors.email && <p className="text-xs text-red-600 mt-0.5">{formErrors.email}</p>}
                      </div>
                    </div>

                    {/* Submit Button with Condition-Specific CTA */}
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
                          <span>{pageData.formButtonText || 'Request a Consultation'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {/* Privacy & SLO Guarantees */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-start gap-2 text-center sm:text-left text-[11px] text-slate-500">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>HIPAA-Conscious Intake: Contact details are collected solely for appointment coordination. No health data is shared with advertising platforms.</span>
                      </div>
                      <div className="text-center text-[11px] font-semibold text-emerald-800 bg-emerald-50 py-1.5 px-3 rounded-md border border-emerald-200">
                        Quick Intake Guarantee: Direct contact from dedicated clinical care coordinators within 24 hours
                      </div>
                    </div>

                    {/* Alternative Online Booking Link */}
                    <div className="text-center pt-2 border-t border-slate-100">
                      <Link
                        to="/book"
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1"
                      >
                        Prefer live online calendar scheduling? Use interactive Tebra booking &rarr;
                      </Link>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. STATIC IN-NETWORK INSURANCE & PAYER PROVIDERS SECTION */}
      <section className="insurance-static-section bg-slate-50 border-b border-slate-200 py-10" aria-label="Insurance and Payer Networks">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">In-Network Insurance &amp; Payers</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">Accepted Insurance Providers &amp; Plans</h2>
            </div>
            <p className="text-xs text-slate-600 max-w-md">
              Medicare Part B, NC/SC Medicaid, and major commercial health plans accepted. Zero hospital facility fee markups.
            </p>
          </div>

          {/* Static Responsive Grid (Stationary on Desktop, Tablet, and Mobile) */}
          <div className="insurance-logos-grid">
            {INSURANCE_PROVIDERS.map((item, idx) => (
              <div key={idx} className="insurance-logo-card">
                {item.logo ? (
                  <div className="insurance-logo-box">
                    <img src={item.logo} alt={item.alt || item.name} className="insurance-logo-img" loading="lazy" />
                  </div>
                ) : (
                  <div className="insurance-card-badge">{item.badge}</div>
                )}
                <div className="insurance-card-info">
                  <span className="insurance-card-name" title={item.name}>{item.name}</span>
                  {item.type && <span className="insurance-card-type">{item.type}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center sm:text-left">
            <p className="text-[11px] text-slate-500 insurance-notice-text">
              Insurance coverage and provider availability may vary by hospital and plan. We verify active benefits directly with your insurer prior to treatment.
            </p>
          </div>
        </div>
      </section>

      {/* 4. TARGETED CONDITIONS SECTION */}
      <section className="py-16 bg-white border-b border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Clinical Focus Areas</div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Common Causes &amp; Conditions We Evaluate
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

      {/* 5. SOUTH CHARLOTTE ADVANTAGE: ZERO FACILITY FEES & IN-OFFICE PROCEDURE SUITE */}
      <section className="py-16 bg-slate-50 border-b border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Cost Transparency</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Zero Hospital Facility Fees: Why Independent Practice Matters
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Hospital-owned outpatient clinics frequently bill two separate fees for a single procedure: a physician professional fee plus a mandatory hospital facility fee that can add $750 to $3,000+ to your out-of-pocket costs.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                As an independent spine and pain clinic, Amara Pain &amp; Spine conducts all fluoroscopy-guided procedures in our sterile in-office suite with zero facility surcharges.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
                <img
                  src="/images/audience/interventional_procedure_suite.jpg"
                  alt="In-Office Interventional Fluoroscopy Procedure Suite - Amara Pain & Spine"
                  className="w-full h-72 object-cover"
                  loading="lazy"
                />
                <div className="p-4 bg-slate-900 text-white">
                  <div className="text-sm font-bold text-emerald-400">On-Site Interventional Fluoroscopy Suite</div>
                  <div className="text-xs text-slate-300 mt-0.5">High-definition C-arm X-ray guidance for maximum sub-millimeter precision and safety.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. OUR 3-STEP CLINICAL METHODOLOGY */}
      <section className="py-16 bg-white border-b border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Methodical Care</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              How We Evaluate &amp; Treat Pain
            </h2>
            <p className="text-base text-slate-600 mt-2">
              We avoid one-size-fits-all treatments and never recommend procedures before conducting a comprehensive diagnostic examination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-2xl font-black text-emerald-600 mb-2">01</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">In-Depth Diagnostic Review</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dr. Amara personally evaluates your spine mobility, neurological reflexes, and past imaging (MRI, X-ray) to identify the true pain generator.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-2xl font-black text-emerald-600 mb-2">02</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Targeted Non-Surgical Plan</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We develop a graduated care strategy that may include physical therapy coordination, conservative medications, or precision fluoroscopy-guided injections.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-2xl font-black text-emerald-600 mb-2">03</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Functional Recovery Tracking</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our goal is sustained functional independence—helping you return to walking, gardening, driving, working, and enjoying daily life with family.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="#consultation-form"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-sm"
            >
              <span>Schedule Your Diagnostic Evaluation</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. PHYSICIAN LEADERSHIP & PROVIDER SPOTLIGHT */}
      <section className="py-16 bg-slate-50 border-b border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
                <img
                  src="/images/ashvin-amara.jpg"
                  alt="Dr. Ashvin Kumar Amara, MD - Founder & Double-Board Certified Interventional Pain Specialist"
                  className="w-full aspect-square sm:aspect-[4/3] lg:aspect-square object-cover object-top"
                  loading="lazy"
                />
                <div className="p-4 bg-slate-900 text-white">
                  <div className="text-sm font-bold text-emerald-400">Ashvin Kumar Amara, MD</div>
                  <div className="text-xs text-slate-300">Double-Board Certified · Anesthesiology &amp; Interventional Pain Medicine · NPI: 1356658389</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                Physician Leadership
              </div>

              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Meet Dr. Ashvin Kumar Amara, MD
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Dr. Ashvin Kumar Amara is double-board-certified in Anesthesiology and Interventional Pain Medicine. He completed rigorous residency and ACGME-accredited fellowship training at premier academic medical centers.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Dedicated to non-opioid, non-surgical pain management, Dr. Amara leverages cutting-edge fluoroscopy guidance and neuromodulation to diagnose and resolve complex chronic pain conditions while helping patients avoid invasive spine surgeries.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="font-bold text-slate-900 text-sm">Double-Board Certified</div>
                  <div className="text-xs text-slate-500 mt-0.5">American Board of Medical Specialties (ABMS) certified in Anesthesiology and Pain Medicine.</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="font-bold text-slate-900 text-sm">Fellowship-Trained Specialist</div>
                  <div className="text-xs text-slate-500 mt-0.5">Sub-specialty trained in image-guided spine injections, radiofrequency ablation, and neuromodulation.</div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#consultation-form"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
                >
                  <span>Schedule Consultation with Dr. Amara</span>
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CONDITION-SPECIFIC FAQS */}
      <section className="py-16 bg-white border-b border-slate-200 text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Patient Clarity</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Transparent answers regarding our treatments, insurance coverage, and appointment process.
            </p>
          </div>

          <div className="space-y-4">
            {pageData.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-100/80 transition-colors cursor-pointer"
                  aria-expanded={openFaq === idx}
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LOCATION & CLINIC ACCESS */}
      <section className="py-16 bg-slate-50 border-b border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">South Charlotte Spine Clinic</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Visit Amara Pain &amp; Spine</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dedicated to patients throughout Charlotte, Ballantyne, Pineville, Matthews, Fort Mill, and Rock Hill.
              </p>

              <div className="space-y-3 pt-2 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Address:</strong>
                    6429 Bannington Road, Suite B, Charlotte, NC 28226
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Clinic Hours:</strong>
                    Monday – Friday: 8:00 AM – 5:00 PM (Closed Saturday &amp; Sunday)
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Direct Inquiries:</strong>
                    Phone: <a href="tel:+17045039338" className="text-emerald-700 font-bold hover:underline">(704) 503-9338</a> | Fax: (704) 503-9339
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-3">
              <h3 className="text-base font-bold text-slate-900">Convenient South Charlotte Access</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Located right off Highway 51 (Pineville-Matthews Rd) and Johnston Road, minutes from Ballantyne and I-485. Free ground-level parking directly adjacent to the entrance.
              </p>
              <a
                href="https://maps.google.com/?q=6429+Bannington+Road+Suite+B+Charlotte+NC+28226"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA BANNER */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Take the First Step</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Ready to Regain Mobility and Lasting Comfort?
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Do not let chronic pain dictate what you can and cannot do. Connect with our Charlotte clinical coordination team to confirm your consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#consultation-form"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg"
            >
              Request a Consultation
            </a>
            <a
              href="tel:+17045039338"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              Call (704) 503-9338
            </a>
          </div>
        </div>
      </section>

      {/* 11. MOBILE STICKY CTA BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-4 lg:hidden shadow-lg">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <a
            href="tel:+17045039338"
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Call Clinic</span>
          </a>
          <a
            href="#consultation-form"
            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Request Visit</span>
          </a>
        </div>
      </div>

    </div>
  );
}
