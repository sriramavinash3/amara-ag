import React, { useState } from 'react';
// Manual state-driven validation using Zod for 100% stable runtime.
import { z } from 'zod';
import { FileText, Download, CheckCircle2, Clock, ArrowRight, ShieldCheck, ClipboardCheck, Lock } from 'lucide-react';
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

  // Tracking referrals (populated from form submissions)
  const [trackingReferrals, setTrackingReferrals] = useState([]);

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
      id: `REF-${Date.now().toString().slice(-6)}`,
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
      setActiveTab('form');
    }, 2000);
  };

  return (
    <div className="w-full relative py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-left">
      
      {/* 1. PAGE HEADER */}
      <div className="space-y-6 max-w-3xl border-b border-[#585454] pb-6 relative z-10">
        <Badge variant="secondary" className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-bold uppercase tracking-widest">
          Referral Center
        </Badge>
        <h1 className="text-[34px] md:text-[54px] font-extrabold font-heading tracking-tight text-[#FFFFFF] leading-[1.1]">
          Physician Referral Portal
        </h1>
        <p className="text-[18px] text-[#F0F0F0] font-normal leading-[1.75]">
          Submit patient credentials, track previous referrals in real-time, and download physical clinical referral packets.
        </p>
      </div>

      {/* Referral Collaboration Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#363434] rounded-3xl p-6 md:p-8 border border-[#585454] shadow-2xl relative z-10 my-8">
        <div className="md:col-span-7 space-y-3">
          <Badge variant="secondary" className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-bold uppercase tracking-wider text-[10px]">
            Physician Partnership
          </Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-[#FFFFFF] leading-tight">
            Collaborative Interventional Care for Your Complex Pain Patients
          </h2>
          <p className="text-sm text-[#F0F0F0] leading-relaxed font-normal">
            We partner closely with referring primary care doctors, orthopedists, and neurologists to ensure rapid diagnostic evaluations, prompt note delivery, and coordinated treatment plans for older adult patients.
          </p>
          <div className="flex flex-wrap gap-4 pt-1 text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Same-Week Patient Placement</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-emerald-400" /> 24-48h Clinical Sync</span>
          </div>
        </div>
        <div className="md:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#585454] shadow-sm bg-[#323030]">
          <img 
            src="/images/audience/physician_referral_collaboration.jpg" 
            alt="Physicians reviewing patient referral chart and spinal MRI during clinical consultation"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>

      {/* 2. TABS INTERFACE */}
      <div className="flex border-b border-[#585454] gap-6 relative z-10 my-8">
        <button
          onClick={() => setActiveTab('form')}
          className={`pb-4 text-base transition-all relative cursor-pointer border-none bg-transparent ${
            activeTab === 'form' ? 'text-emerald-400 font-extrabold' : 'text-[#D1D5DB] font-bold hover:text-[#F0F0F0]'
          }`}
        >
          Submit Referral Form
          {activeTab === 'form' && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-full" />}
        </button>
        <button
          onClick={() => setActiveTab('info')}
          className={`pb-4 text-base transition-all relative cursor-pointer border-none bg-transparent ${
            activeTab === 'info' ? 'text-emerald-400 font-extrabold' : 'text-[#D1D5DB] font-bold hover:text-[#F0F0F0]'
          }`}
        >
          Portal Information
          {activeTab === 'info' && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-full" />}
        </button>
      </div>

      {/* 3. TAB CONTENT */}
      <div className="relative z-10 my-8">
        
        {/* TAB 1: FORM */}
        {activeTab === 'form' && (
          <Card variant="white" padding="lg" className="border-[#585454] shadow-2xl p-8 rounded-3xl bg-[#454242] relative">
            {submitted && (
              <div className="absolute inset-0 bg-[#323030]/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl">
                <CheckCircle2 className="h-16 w-16 text-emerald-400 animate-pulse" />
                <h3 className="text-[22px] font-bold text-[#FFFFFF]">Referral Logged Successfully</h3>
                <p className="text-[#F0F0F0] text-sm font-medium">Saving credentials and redirecting to the tracking portal...</p>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-8">
              {/* Doctor Details */}
              <div className="space-y-4">
                <h3 className="text-[16px] font-bold text-[#FFFFFF] border-b border-[#585454] pb-2 flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-emerald-400" /> Referring Physician Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-1">
                    <label htmlFor="ref-doctor-name" className="text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">Physician Name *</label>
                    <input
                      id="ref-doctor-name"
                      type="text"
                      name="doctorName"
                      value={formData.doctorName}
                      onChange={handleInputChange}
                      placeholder="Physician name"
                      className={`w-full px-4 py-2.5 bg-[#363434] border rounded-xl text-sm text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                        errors.doctorName ? 'border-rose-500 bg-rose-950/20' : 'border-[#585454]'
                      }`}
                    />
                    {errors.doctorName && <p className="text-xs text-rose-400 font-semibold">{errors.doctorName}</p>}
                  </div>
                  <div className="space-y-1 text-left">
                    <label htmlFor="ref-npi-number" className="text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">NPI Number *</label>
                    <input
                      id="ref-npi-number"
                      type="text"
                      name="npiNumber"
                      value={formData.npiNumber}
                      onChange={handleInputChange}
                      placeholder="Exactly 10 digits"
                      maxLength={10}
                      className={`w-full px-4 py-2.5 bg-[#363434] border rounded-xl text-sm text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                        errors.npiNumber ? 'border-rose-500 bg-rose-950/20' : 'border-[#585454]'
                      }`}
                    />
                    {errors.npiNumber && <p className="text-xs text-rose-400 font-semibold">{errors.npiNumber}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="space-y-1">
                    <label htmlFor="ref-practice-name" className="text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">Practice / Clinic Name *</label>
                    <input
                      id="ref-practice-name"
                      type="text"
                      name="practiceName"
                      value={formData.practiceName}
                      onChange={handleInputChange}
                      placeholder="Practice or clinic name"
                      className={`w-full px-4 py-2.5 bg-[#363434] border rounded-xl text-sm text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                        errors.practiceName ? 'border-rose-500 bg-rose-950/20' : 'border-[#585454]'
                      }`}
                    />
                    {errors.practiceName && <p className="text-xs text-rose-400 font-semibold">{errors.practiceName}</p>}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="ref-doctor-phone" className="text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">Contact Phone *</label>
                    <input
                      id="ref-doctor-phone"
                      type="text"
                      name="doctorPhone"
                      value={formData.doctorPhone}
                      onChange={handleInputChange}
                      placeholder="e.g. 704-555-0188"
                      className={`w-full px-4 py-2.5 bg-[#363434] border rounded-xl text-sm text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                        errors.doctorPhone ? 'border-rose-500 bg-rose-950/20' : 'border-[#585454]'
                      }`}
                    />
                    {errors.doctorPhone && <p className="text-xs text-rose-400 font-semibold">{errors.doctorPhone}</p>}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="ref-doctor-email" className="text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">Secure Email *</label>
                    <input
                      id="ref-doctor-email"
                      type="email"
                      name="doctorEmail"
                      value={formData.doctorEmail}
                      onChange={handleInputChange}
                      placeholder="doctor@practice.com"
                      className={`w-full px-4 py-2.5 bg-[#363434] border rounded-xl text-sm text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                        errors.doctorEmail ? 'border-rose-500 bg-rose-950/20' : 'border-[#585454]'
                      }`}
                    />
                    {errors.doctorEmail && <p className="text-xs text-rose-400 font-semibold">{errors.doctorEmail}</p>}
                  </div>
                </div>
              </div>

              {/* Patient Details */}
              <div className="space-y-4">
                <h3 className="text-[16px] font-bold text-[#FFFFFF] border-b border-[#585454] pb-2 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-emerald-400" /> Patient Credentials (HIPAA Secured)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-1">
                    <label htmlFor="ref-patient-first-name" className="text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">Patient First Name *</label>
                    <input
                      id="ref-patient-first-name"
                      type="text"
                      name="patientFirstName"
                      value={formData.patientFirstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className={`w-full px-4 py-2.5 bg-[#363434] border rounded-xl text-sm text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                        errors.patientFirstName ? 'border-rose-500 bg-rose-950/20' : 'border-[#585454]'
                      }`}
                    />
                    {errors.patientFirstName && <p className="text-xs text-rose-400 font-semibold">{errors.patientFirstName}</p>}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="ref-patient-last-name" className="text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">Patient Last Name *</label>
                    <input
                      id="ref-patient-last-name"
                      type="text"
                      name="patientLastName"
                      value={formData.patientLastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className={`w-full px-4 py-2.5 bg-[#363434] border rounded-xl text-sm text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                        errors.patientLastName ? 'border-rose-500 bg-rose-950/20' : 'border-[#585454]'
                      }`}
                    />
                    {errors.patientLastName && <p className="text-xs text-rose-400 font-semibold">{errors.patientLastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="space-y-1">
                    <label htmlFor="ref-patient-dob" className="text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">Date of Birth *</label>
                    <input
                      id="ref-patient-dob"
                      type="date"
                      name="patientDob"
                      value={formData.patientDob}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 bg-[#363434] border rounded-xl text-sm text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                        errors.patientDob ? 'border-rose-500 bg-rose-950/20' : 'border-[#585454]'
                      }`}
                    />
                    {errors.patientDob && <p className="text-xs text-rose-400 font-semibold">{errors.patientDob}</p>}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="ref-patient-phone" className="text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">Contact Phone *</label>
                    <input
                      id="ref-patient-phone"
                      type="tel"
                      name="patientPhone"
                      value={formData.patientPhone}
                      onChange={handleInputChange}
                      placeholder="Patient Phone"
                      className={`w-full px-4 py-2.5 bg-[#363434] border rounded-xl text-sm text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                        errors.patientPhone ? 'border-rose-500 bg-rose-950/20' : 'border-[#585454]'
                      }`}
                    />
                    {errors.patientPhone && <p className="text-xs text-rose-400 font-semibold">{errors.patientPhone}</p>}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="ref-patient-ins" className="text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">Insurance Network *</label>
                    <input
                      id="ref-patient-ins"
                      type="text"
                      name="patientInsurance"
                      value={formData.patientInsurance}
                      onChange={handleInputChange}
                      placeholder="e.g. BCBS, Medicare, Aetna"
                      className={`w-full px-4 py-2.5 bg-[#363434] border rounded-xl text-sm text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                        errors.patientInsurance ? 'border-rose-500 bg-rose-950/20' : 'border-[#585454]'
                      }`}
                    />
                    {errors.patientInsurance && <p className="text-xs text-rose-400 font-semibold">{errors.patientInsurance}</p>}
                  </div>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="space-y-4 text-left">
                <h3 className="text-[16px] font-bold text-[#FFFFFF] border-b border-[#585454] pb-2">
                  Clinical Indicators &amp; Reason
                </h3>
                <div className="space-y-1">
                  <label htmlFor="ref-clinical-reason" className="text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">Reason for Referral *</label>
                  <textarea
                    id="ref-clinical-reason"
                    name="clinicalReason"
                    value={formData.clinicalReason}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Please detail primary diagnoses, duration of chronic pain, past epidural blocks, and clinical indication details..."
                    className={`w-full px-4 py-2.5 bg-[#363434] border rounded-xl text-sm text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                      errors.clinicalReason ? 'border-rose-500 bg-rose-950/20' : 'border-[#585454]'
                    }`}
                  />
                  {errors.clinicalReason && <p className="text-xs text-rose-400 font-semibold">{errors.clinicalReason}</p>}
                </div>
              </div>

              <div className="pt-4 border-t border-[#585454] flex justify-end">
                <Button type="submit" variant="primary" icon={ArrowRight}>
                  Submit Secure Referral
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* TAB 2: TRACKING */}
        {activeTab === 'tracking' && (
          <Card variant="white" padding="lg" className="border-[#585454] shadow-2xl p-8 rounded-3xl bg-[#454242] space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
              <div className="space-y-1">
                <h3 className="text-[18px] font-bold text-[#FFFFFF]">Referral Status Tracking</h3>
                <p className="text-xs text-[#D1D5DB] font-medium">Monitor diagnostic record acquisition and scheduling dates live.</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="primary" className="bg-[#363434] text-[#F0F0F0] border border-[#585454] font-bold">
                  {trackingReferrals.length} Total Submissions
                </Badge>
              </div>
            </div>

            {/* Tracking Table */}
            {trackingReferrals.length > 0 ? (
            <div className="overflow-x-auto border border-[#585454] rounded-2xl shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#363434] text-[#D1D5DB] font-bold text-xs uppercase tracking-wider border-b border-[#585454]">
                  <tr>
                    <th className="px-6 py-4">Referral ID</th>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Referred By</th>
                    <th className="px-6 py-4">Date Logged</th>
                    <th className="px-6 py-4">Reason</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#585454] text-[#F0F0F0] font-medium">
                  {trackingReferrals.map((item, idx) => {
                    let statusColor = "bg-amber-950/40 text-amber-300 border-amber-800/50";
                    if (item.status === 'Scheduled') statusColor = "bg-emerald-950/40 text-emerald-300 border-emerald-800/50";
                    else if (item.status === 'Awaiting Records') statusColor = "bg-[#363434] text-[#F0F0F0] border-[#585454]";
                    
                    return (
                      <tr key={idx} className="hover:bg-[#363434]/60 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-xs text-[#D1D5DB]">{item.id}</td>
                        <td className="px-6 py-4 font-extrabold text-[#FFFFFF]">{item.patient}</td>
                        <td className="px-6 py-4 text-xs font-semibold text-[#F0F0F0]">{item.referredBy}</td>
                        <td className="px-6 py-4 text-xs text-[#D1D5DB]">{item.date}</td>
                        <td className="px-6 py-4 text-xs max-w-[200px] truncate font-normal">{item.reason}</td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${statusColor}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            ) : (
              <div className="text-center py-10 bg-[#363434] border border-[#585454] rounded-2xl">
                <p className="text-[#D1D5DB] text-sm">No referrals submitted yet. Referrals will appear here after form submission.</p>
              </div>
            )}
          </Card>
        )}

        {/* TAB 3: PORTAL INFORMATION */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Quick stats and contact */}
            <Card variant="white" padding="md" className="border-[#585454] shadow-2xl p-6 rounded-3xl bg-[#454242] space-y-6 lg:col-span-2">
              <div className="space-y-4">
                <h3 className="text-[18px] font-bold text-[#FFFFFF]">Same-Week Patient Placement</h3>
                <p className="text-sm text-[#F0F0F0] leading-relaxed font-normal">
                  We guarantee rapid clinical intake. Once clinical notes and patient demographics are received, our scheduling coordinators contact the patient within **24 to 48 hours**. 
                </p>
                <p className="text-sm text-[#F0F0F0] leading-relaxed font-normal">
                  A physician's referral is **never mandatory** for self-pay or most commercial patients, but for insurance networks that require active documentation, we provide rapid feedback loops back to the primary clinic.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#585454] pt-6 text-xs text-[#F0F0F0]">
                <div className="p-4 bg-[#363434] rounded-2xl border border-[#585454]">
                  <strong className="block text-[#FFFFFF] text-sm mb-1">Direct Secure Fax</strong>
                  📠 Fax: <span className="font-bold text-emerald-400 text-sm">704-503-9339</span>
                </div>
                <div className="p-4 bg-[#363434] rounded-2xl border border-[#585454]">
                  <strong className="block text-[#FFFFFF] text-sm mb-1">Provider Helpline</strong>
                  📞 Tel: <span className="font-bold text-emerald-400 text-sm">+1 704-503-9338</span>
                </div>
              </div>
            </Card>

            {/* Paperwork Downloads */}
            <Card variant="slate" padding="md" className="border-[#585454] bg-[#363434] p-6 space-y-6 flex flex-col justify-between shadow-2xl rounded-3xl">
              <div className="space-y-4 text-left">
                <FileText className="h-8 w-8 text-emerald-400" />
                <h4 className="font-extrabold text-[14px] text-[#FFFFFF]">Physical Referral Package</h4>
                <p className="text-xs text-[#D1D5DB] leading-relaxed">
                  Prefer paper submission? Download the full PDF packet containing intake checklist guidelines, fax forms, and diagnostic checklist criteria.
                </p>
              </div>

              <div className="pt-6 border-t border-[#585454]">
                <a 
                  href="https://amarapain.com/wp-content/uploads/2025/06/Referral-package-APS.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-3.5 bg-[#454242] border border-[#585454] rounded-xl hover:bg-[#514E4E] transition-colors cursor-pointer group"
                >
                  <span className="text-xs font-bold text-[#FFFFFF] group-hover:text-emerald-400 transition-colors">
                    Download Referral PDF
                  </span>
                  <Download className="h-4.5 w-4.5 text-[#D1D5DB] group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </Card>
          </div>
        )}

      </div>

      {/* 4. SECURITY DISCLOSURE */}
      <div className="flex gap-3 bg-[#363434] border border-[#585454] rounded-2xl p-6 text-xs text-[#F0F0F0] leading-relaxed w-full my-8">
        <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
        <p className="font-medium">
          <strong className="text-[#FFFFFF]">HIPAA Compliance Safeguard:</strong> This portal utilizes end-to-end socket encryption. All patient identifiers, date-of-birth timestamps, and medical conditions are fully tokenized before database logs are recorded. We comply fully with the Health Insurance Portability and Accountability Act (HIPAA) standards.
        </p>
      </div>

    </div>
  );
}
