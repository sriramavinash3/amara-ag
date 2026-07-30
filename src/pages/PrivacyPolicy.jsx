import React from 'react';
import { Shield, ShieldAlert, Heart, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import '../styles/skeuomorphic.css';

export default function PrivacyPolicy() {
  return (
    <div className="w-full relative py-20 px-4 md:px-8 max-w-4xl mx-auto space-y-16 text-left">

      {/* 1. PAGE HEADER */}
      <div className="space-y-6 border-b border-slate-200 pb-10 relative z-10">
        <Badge variant="secondary" className="bg-cyan-50 text-cyan-805 border border-cyan-200 font-bold uppercase tracking-widest">
          Compliance &amp; Security
        </Badge>
        <h1 className="text-4xl md:text-[56px] font-extrabold font-heading tracking-tight text-slate-900 leading-[1.1]">
          Privacy Policy &amp; HIPAA Notices
        </h1>
        <p className="text-sm text-slate-500">
          Last Updated: June 26, 2026 &bull; Effective Immediately
        </p>
      </div>

      {/* 2. SUMMARY CARD */}
      <Card variant="slate" padding="md" className="border-slate-200 bg-slate-100/50 flex gap-4 items-start relative z-10 shadow-sm p-6 max-w-[720px]">
        <Shield className="h-6 w-6 text-medical-600 shrink-0 mt-1" />
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
          <h3 className="font-bold text-sm text-slate-900">Your Privacy is Protected Under HIPAA Standards</h3>
          <p>
            At Amara Pain &amp; Spine Management, we are fully committed to protecting your Personal Health Information (PHI) and maintaining absolute confidentiality. This privacy notice describes how we collect, use, and safeguard your medical records and digital data in compliance with the Health Insurance Portability and Accountability Act (HIPAA).
          </p>
        </div>
      </Card>

      {/* 3. POLICY DETAILS */}
      <div className="space-y-12 text-sm text-slate-700 leading-relaxed relative z-10 max-w-[720px]">
        
        {/* Section 1 */}
        <div className="space-y-4">
          <h3 className="text-xl md:text-[28px] font-bold text-slate-900 font-heading border-b border-slate-200 pb-2">1. Collection of Health and Personal Information</h3>
          <p className="text-[18px] text-slate-600 font-normal leading-[1.75]">
            We collect personal information necessary to coordinate your medical care, process insurance claims, and verify your identity. This includes:
          </p>
          <ul className="list-disc pl-5 space-y-2.5 pl-6 text-[18px] text-slate-600">
            <li>Demographic details (name, date of birth, physical address, and contact details).</li>
            <li>Medical history, imaging reports, referral packages, and diagnostic records.</li>
            <li>Billing details, including insurance policy numbers, group IDs, and guarantor information.</li>
            <li>Digital form submissions from our contact forms or online scheduling wizards.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h3 className="text-xl md:text-[28px] font-bold text-slate-900 font-heading border-b border-slate-200 pb-2">2. How We Use Your Protected Health Information</h3>
          <p className="text-[18px] text-slate-600 font-normal leading-[1.75]">
            Your Protected Health Information (PHI) is utilized strictly for the following purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2.5 pl-6 text-[18px] text-slate-600">
            <li><strong>Medical Treatment:</strong> Sharing relevant diagnostics with referring doctors or care coordinators.</li>
            <li><strong>Billing and Claims:</strong> Submitting claims to your health insurer (e.g., Medicare, BCBS, Cigna) to secure payment for interventional procedures.</li>
            <li><strong>Healthcare Operations:</strong> Quality audits, provider reviews, and administrative optimizations within our independent clinic.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-4">
          <h3 className="text-xl md:text-[28px] font-bold text-slate-900 font-heading border-b border-slate-200 pb-2">3. Your Health Information Rights</h3>
          <p className="text-[18px] text-slate-600 font-normal leading-[1.75]">
            Under federal law, patients hold specific rights regarding their clinical and personal data:
          </p>
          <ul className="list-disc pl-5 space-y-2.5 pl-6 text-[18px] text-slate-600">
            <li><strong>Right to Inspect &amp; Copy:</strong> You have the right to request copies of your complete medical charts and billing records.</li>
            <li><strong>Right to Amend:</strong> If you believe your health records contain inaccuracies, you may request written amendments.</li>
            <li><strong>Right to Restrict Disclosures:</strong> You can request that we restrict disclosures of your health records to specific family members or insurers, particularly when paying out-of-pocket.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="space-y-4">
          <h3 className="text-xl md:text-[28px] font-bold text-slate-900 font-heading border-b border-slate-200 pb-2">4. Contact Our HIPAA Officer</h3>
          <p className="text-[18px] text-slate-600 font-normal leading-[1.75]">
            If you have any questions, concerns, or complaints regarding how your medical privacy has been managed at our clinic, you may contact our administrative privacy officer directly:
          </p>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs space-y-2 shadow-inner">
            <p className="text-sm font-bold text-slate-900">Amara Pain &amp; Spine Management</p>
            <p>Attn: Privacy &amp; HIPAA Officer</p>
            <p>6429 Bannington Road, Suite B, Charlotte, NC 28226</p>
            <p>Phone: 704-503-9338 &bull; Email: amarapain@gmail.com</p>
          </div>
        </div>

      </div>

    </div>
  );
}
