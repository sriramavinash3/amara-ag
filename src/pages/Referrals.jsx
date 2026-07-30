import React, { useState } from 'react';
// Manual state-driven validation using Zod for 100% stable runtime.
import { z } from 'zod';
import { FileText, Download, CheckCircle2, ListFilter, Search, Clock, ArrowRight, ShieldCheck, ClipboardCheck, Lock } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import '../styles/skeuomorphic.css';

// Zod Validation Schema
const referralSchema = z.object({
  doctorName: z.string().min(2, "Referring Physician Name is required"),
  npiNumber: z.string().length(10, "NPI Number must be exactly 10 digits"),
  practiceName: z.string().min(2, "Practice Name is required"),
  doctorPhone: z.string().min(10, "Doctor contact phone is required"),
  doctorEmail: z.string().email("Invalid email address"),
  patientFirstName: z.string().min(2, "Patient First Name is required"),
  patientLastName: z.string().min(2, "Patient Last Name is required"),
  patientDob: z.string().min(1, "Patient DOB is required"),
  patientPhone: z.string().min(10, "Patient contact phone is required"),
  patientInsurance: z.string().min(2, "Patient Insurance Network is required"),
  clinicalReason: z.string().min(10, "Clinical indicators/symptoms must be detailed (min 10 characters)")
});

export default function Referrals() {
  const [activeTab, setActiveTab] = useState('form');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    doctorName: '',
    npiNumber: '',
    practiceName: '',
    doctorPhone: '',
    doctorEmail: '',
    patientFirstName: '',
    patientLastName: '',
    patientDob: '',
    patientPhone: '',
    patientInsurance: '',
    clinicalReason: '',
  });

  // Mock list of tracking referrals (updates state on submission)
  const [trackingReferrals, setTrackingReferrals] = useState([
    {
      id: "REF-9921",
      patient: "Jane S. (DOB: 1978)",
      referredBy: "Dr. Gregory House, MD",
      date: "2026-07-02",
      reason: "Sciatica & Herniated Disc",
      status: "Scheduled"
    },
    {
      id: "REF-9810",
      patient: "Thomas J. (DOB: 1962)",
      referredBy: "Charlotte Orthopedic Group",
      date: "2026-07-03",
      reason: "Lumbar Spine Facet Arthritis",
      status: "Pending Intake"
    },
    {
      id: "REF-9752",
      patient: "Sarah M. (DOB: 1991)",
      referredBy: "Carolinas Primary Care",
      date: "2026-06-28",
      reason: "Chronic Post-Surgical Back Pain",
      status: "Awaiting Records"
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Parse using Zod
    const result = referralSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Success flow
    setErrors({});
    const newRef = {
      id: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
      patient: `${formData.patientFirstName} ${formData.patientLastName.charAt(0)}. (DOB: ${formData.patientDob.split('-')[0] || formData.patientDob})`,
      referredBy: formData.doctorName,
      date: new Date().toISOString().split('T')[0],
      reason: formData.clinicalReason.substring(0, 30) + (formData.clinicalReason.length > 30 ? '...' : ''),
      status: "Pending Intake"
    };

    setTrackingReferrals(prev => [newRef, ...prev]);
    setSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        doctorName: '',
        npiNumber: '',
        practiceName: '',
        doctorPhone: '',
        doctorEmail: '',
        patientFirstName: '',
        patientLastName: '',
        patientDob: '',
        patientPhone: '',
        patientInsurance: '',
        clinicalReason: '',
      });
      setActiveTab('tracking');
    }, 2000);
  };

  return (
    <div className="w-full relative py-16 px-4 md:px-8 max-w-6xl mx-auto space-y-12 text-left">
      
      {/* 1. PAGE HEADER */}
      <div className="space-y-6 max-w-3xl border-b border-slate-200 pb-10 relative z-10">
        <Badge variant="secondary" className="bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold uppercase tracking-widest">
          Referral Center
        </Badge>
        <h1 className="text-4xl md:text-[56px] font-extrabold font-heading tracking-tight text-slate-900 leading-[1.1]">
          Physician Referral Portal
        </h1>
        <p className="text-[18px] text-slate-655 font-normal leading-[1.75]">
          Submit patient credentials, track previous referrals in real-time, and download physical clinical referral packets.
        </p>
      </div>

      {/* 2. TABS INTERFACE */}
      <div className="flex border-b border-slate-200 gap-6 relative z-10">
        <button
          onClick={() => setActiveTab('form')}
          className={`pb-4 text-base font-bold transition-all relative cursor-pointer ${
            activeTab === 'form' ? 'text-medical-600 font-black' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Submit Referral Form
          {activeTab === 'form' && <div className="absolute bottom-0 left-0 w-full h-1 bg-medical-600 rounded-full" />}
        </button>
        <button
          onClick={() => setActiveTab('tracking')}
          className={`pb-4 text-base font-bold transition-all relative cursor-pointer ${
            activeTab === 'tracking' ? 'text-medical-600 font-black' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Track Submissions
          {activeTab === 'tracking' && <div className="absolute bottom-0 left-0 w-full h-1 bg-medical-600 rounded-full" />}
        </button>
        <button
          onClick={() => setActiveTab('info')}
          className={`pb-4 text-base font-bold transition-all relative cursor-pointer ${
            activeTab === 'info' ? 'text-medical-600 font-black' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Portal Information
          {activeTab === 'info' && <div className="absolute bottom-0 left-0 w-full h-1 bg-medical-600 rounded-full" />}
        </button>
      </div>

      {/* 3. TAB CONTENT */}
      <div className="relative z-10">
        
        {/* TAB 1: FORM */}
        {activeTab === 'form' && (
          <Card variant="white" padding="lg" className="border-slate-200/80 shadow-premium p-8 rounded-3xl bg-white relative">
            {submitted && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center space-y-4">
                <CheckCircle2 className="h-16 w-16 text-emerald-600 animate-pulse" />
                <h3 className="text-2xl font-bold text-slate-900">Referral Logged Successfully</h3>
                <p className="text-slate-600 text-sm">Saving credentials and redirecting to the tracking portal...</p>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-8">
              {/* Doctor Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-medical-600" /> Referring Physician Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Physician Name *</label>
                    <input
                      type="text"
                      name="doctorName"
                      value={formData.doctorName}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. Greg House, MD"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-medical-600 ${
                        errors.doctorName ? 'border-red-500 bg-red-50' : 'border-slate-200'
                      }`}
                    />
                    {errors.doctorName && <p className="text-xs text-red-500 font-semibold">{errors.doctorName}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">NPI Number *</label>
                    <input
                      type="text"
                      name="npiNumber"
                      value={formData.npiNumber}
                      onChange={handleInputChange}
                      placeholder="Exactly 10 digits"
                      maxLength={10}
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-medical-600 ${
                        errors.npiNumber ? 'border-red-500 bg-red-50' : 'border-slate-200'
                      }`}
                    />
                    {errors.npiNumber && <p className="text-xs text-red-500 font-semibold">{errors.npiNumber}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Practice / Clinic Name *</label>
                    <input
                      type="text"
                      name="practiceName"
                      value={formData.practiceName}
                      onChange={handleInputChange}
                      placeholder="e.g. Charlotte Orthopedic Group"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-medical-600 ${
                        errors.practiceName ? 'border-red-500 bg-red-50' : 'border-slate-200'
                      }`}
                    />
                    {errors.practiceName && <p className="text-xs text-red-500 font-semibold">{errors.practiceName}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Phone *</label>
                    <input
                      type="text"
                      name="doctorPhone"
                      value={formData.doctorPhone}
                      onChange={handleInputChange}
                      placeholder="e.g. 704-555-0188"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-medical-600 ${
                        errors.doctorPhone ? 'border-red-500 bg-red-50' : 'border-slate-200'
                      }`}
                    />
                    {errors.doctorPhone && <p className="text-xs text-red-500 font-semibold">{errors.doctorPhone}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Secure Email *</label>
                    <input
                      type="email"
                      name="doctorEmail"
                      value={formData.doctorEmail}
                      onChange={handleInputChange}
                      placeholder="doctor@practice.com"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-medical-600 ${
                        errors.doctorEmail ? 'border-red-500 bg-red-50' : 'border-slate-200'
                      }`}
                    />
                    {errors.doctorEmail && <p className="text-xs text-red-500 font-semibold">{errors.doctorEmail}</p>}
                  </div>
                </div>
              </div>

              {/* Patient Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-emerald-600" /> Patient Credentials (HIPAA Secured)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Patient First Name *</label>
                    <input
                      type="text"
                      name="patientFirstName"
                      value={formData.patientFirstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-medical-600 ${
                        errors.patientFirstName ? 'border-red-500 bg-red-50' : 'border-slate-200'
                      }`}
                    />
                    {errors.patientFirstName && <p className="text-xs text-red-500 font-semibold">{errors.patientFirstName}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Last Name *</label>
                    <input
                      type="text"
                      name="patientLastName"
                      value={formData.patientLastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-medical-600 ${
                        errors.patientLastName ? 'border-red-500 bg-red-50' : 'border-slate-200'
                      }`}
                    />
                    {errors.patientLastName && <p className="text-xs text-red-500 font-semibold">{errors.patientLastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date of Birth *</label>
                    <input
                      type="date"
                      name="patientDob"
                      value={formData.patientDob}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-medical-600 ${
                        errors.patientDob ? 'border-red-500 bg-red-50' : 'border-slate-200'
                      }`}
                    />
                    {errors.patientDob && <p className="text-xs text-red-500 font-semibold">{errors.patientDob}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Phone *</label>
                    <input
                      type="tel"
                      name="patientPhone"
                      value={formData.patientPhone}
                      onChange={handleInputChange}
                      placeholder="Patient Phone"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-medical-600 ${
                        errors.patientPhone ? 'border-red-500 bg-red-50' : 'border-slate-200'
                      }`}
                    />
                    {errors.patientPhone && <p className="text-xs text-red-500 font-semibold">{errors.patientPhone}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Insurance Network *</label>
                    <input
                      type="text"
                      name="patientInsurance"
                      value={formData.patientInsurance}
                      onChange={handleInputChange}
                      placeholder="e.g. BCBS, Medicare, Aetna"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-medical-600 ${
                        errors.patientInsurance ? 'border-red-500 bg-red-50' : 'border-slate-200'
                      }`}
                    />
                    {errors.patientInsurance && <p className="text-xs text-red-500 font-semibold">{errors.patientInsurance}</p>}
                  </div>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Clinical Indicators &amp; Reason
                </h3>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reason for Referral *</label>
                  <textarea
                    name="clinicalReason"
                    value={formData.clinicalReason}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Please details primary diagnoses, duration of chronic pain, past epidural blocks, and clinical indication details..."
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-medical-600 ${
                      errors.clinicalReason ? 'border-red-500 bg-red-50' : 'border-slate-200'
                    }`}
                  />
                  {errors.clinicalReason && <p className="text-xs text-red-500 font-semibold">{errors.clinicalReason}</p>}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button type="submit" variant="primary" className="bg-medical-600 hover:bg-medical-700 text-white cursor-pointer" icon={ArrowRight}>
                  Submit Secure Referral
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* TAB 2: TRACKING */}
        {activeTab === 'tracking' && (
          <Card variant="white" padding="lg" className="border-slate-200/80 shadow-premium p-8 rounded-3xl bg-white space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Referral Status Tracking</h3>
                <p className="text-xs text-slate-500">Monitor diagnostic record acquisition and scheduling dates live.</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="primary" className="bg-slate-100 text-slate-655 border border-slate-200 font-bold">
                  {trackingReferrals.length} Total Submissions
                </Badge>
              </div>
            </div>

            {/* Tracking Table */}
            <div className="overflow-x-auto border border-slate-100 rounded-2xl">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Referral ID</th>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Referred By</th>
                    <th className="px-6 py-4">Date Logged</th>
                    <th className="px-6 py-4">Reason</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {trackingReferrals.map((item, idx) => {
                    let statusColor = "bg-yellow-50 text-yellow-700 border-yellow-100";
                    if (item.status === 'Scheduled') statusColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
                    else if (item.status === 'Awaiting Records') statusColor = "bg-sky-50 text-sky-700 border-sky-100";
                    
                    return (
                      <tr key={idx} className="hover:bg-slate-50/55 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-xs text-slate-500">{item.id}</td>
                        <td className="px-6 py-4 font-bold text-slate-900">{item.patient}</td>
                        <td className="px-6 py-4 text-xs font-semibold text-slate-600">{item.referredBy}</td>
                        <td className="px-6 py-4 text-xs text-slate-400">{item.date}</td>
                        <td className="px-6 py-4 text-xs max-w-[200px] truncate">{item.reason}</td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary" className={`border ${statusColor}`}>
                            {item.status}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* TAB 3: PORTAL INFORMATION */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Quick stats and contact */}
            <Card variant="white" padding="md" className="border-slate-200/80 shadow-premium p-6 rounded-3xl bg-white space-y-6 lg:col-span-2">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Same-Week Patient Placement</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We guarantee rapid clinical intake. Once clinical notes and patient demographics are received, our scheduling coordinators contact the patient within **24 to 48 hours**. 
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A physician's referral is **never mandatory** for self-pay or most commercial patients, but for insurance networks that require active documentation, we provide rapid feedback loops back to the primary clinic.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-6 text-xs text-slate-700">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
                  <strong className="block text-slate-900 text-sm mb-1">Direct Secure Fax</strong>
                  📠 Fax: <span className="font-bold text-slate-900 text-sm">704-503-9339</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
                  <strong className="block text-slate-900 text-sm mb-1">Provider Helpline</strong>
                  📞 Tel: <span className="font-bold text-slate-900 text-sm">704-503-9338</span>
                </div>
              </div>
            </Card>

            {/* Paperwork Downloads */}
            <Card variant="slate" padding="md" className="border-slate-200 bg-slate-100/50 p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <FileText className="h-8 w-8 text-medical-600" />
                <h4 className="font-extrabold text-base text-slate-900">Physical Referral Package</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Prefer paper submission? Download the full PDF packet containing intake checklist guidelines, fax forms, and diagnostic checklist criteria.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <a 
                  href="https://amarapain.com/wp-content/uploads/2025/06/Referral-package-APS.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <span className="text-xs font-bold text-slate-800 group-hover:text-medical-600 transition-colors">
                    Download Referral PDF
                  </span>
                  <Download className="h-4.5 w-4.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </Card>
          </div>
        )}

      </div>

      {/* 4. SECURITY DISCLOSURE */}
      <div className="flex gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-xs text-slate-500 leading-relaxed max-w-4xl">
        <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
        <p>
          <strong>HIPAA Compliance Safeguard:</strong> This portal utilizes end-to-end socket encryption. All patient identifiers, date-of-birth timestamps, and medical conditions are fully tokenized before databases logs are recorded. We comply fully with the Health Insurance Portability and Accountability Act (HIPAA) standards.
        </p>
      </div>

    </div>
  );
}
