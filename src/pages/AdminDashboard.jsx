import React, { useState, useEffect } from 'react';
import { useAppointment } from '../context/AppointmentContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  Users, UserCheck, Calendar, Phone, Activity, ArrowRight, CheckCircle2, 
  Clock, Trash2, ShieldAlert, TrendingUp, HelpCircle, Eye 
} from 'lucide-react';
import '../styles/skeuomorphic.css';

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  // Pre-populate mock leads if localStorage is empty to show a working dashboard immediately
  const ensureMockLeads = () => {
    const existing = localStorage.getItem('APS_LEADS');
    if (!existing || JSON.parse(existing).length === 0) {
      const mockInitialLeads = [
        {
          id: 'APS-834291',
          type: 'appointment',
          dateCreated: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
          status: 'New',
          condition: 'Sciatica Treatment',
          treatment: 'Epidural Injections',
          provider: 'Dr. Ashvin K. Amara, MD',
          appointmentDate: '2026-06-29',
          appointmentTime: '10:30 AM',
          patient: {
            firstName: 'Rebecca',
            lastName: 'Miller',
            email: 'rebecca.miller@example.com',
            phone: '704-555-0144',
            dob: '1982-08-14',
            insurance: 'Blue Cross Blue Shield (BCBS)',
            comments: 'Experiencing severe shooting pain down my left leg for 3 weeks. OTC pain relievers are not helping.'
          }
        },
        {
          id: 'APS-294018',
          type: 'contact',
          dateCreated: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
          status: 'Contacted',
          condition: 'N/A',
          treatment: 'N/A',
          provider: 'N/A',
          appointmentDate: 'N/A',
          appointmentTime: 'N/A',
          patient: {
            firstName: 'David',
            lastName: 'Chen',
            email: 'david.chen@example.com',
            phone: '704-555-0211',
            dob: 'N/A',
            insurance: 'N/A',
            comments: '[Subject: Insurance & Billing Question] Do you accept Cigna Novant Employee Packages for trigger point injections?'
          }
        },
        {
          id: 'APS-924810',
          type: 'appointment',
          dateCreated: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
          status: 'Consultation Scheduled',
          condition: 'Knee Pain & Leg Pain',
          treatment: 'Regenerative Treatments',
          provider: 'Dr. Ashvin K. Amara, MD',
          appointmentDate: '2026-07-02',
          appointmentTime: '01:30 PM',
          patient: {
            firstName: 'Marcus',
            lastName: 'Johnson',
            email: 'marcus.j@example.com',
            phone: '704-555-0192',
            dob: '1975-04-20',
            insurance: 'Medicare Part B',
            comments: 'Interested in PRP therapies for moderate knee osteoarthritis. I want to avoid knee replacement surgery.'
          }
        },
        {
          id: 'APS-104928',
          type: 'appointment',
          dateCreated: new Date(Date.now() - 3600000 * 120).toISOString(), // 5 days ago
          status: 'Converted',
          condition: 'Back Pain & Leg Pain',
          treatment: 'Radiofrequency Ablation (RFA)',
          provider: 'Dr. Ashvin K. Amara, MD',
          appointmentDate: '2026-06-24',
          appointmentTime: '09:00 AM',
          patient: {
            firstName: 'Eleanor',
            lastName: 'Vance',
            email: 'eleanor.v@example.com',
            phone: '704-555-0187',
            dob: '1959-11-03',
            insurance: 'United Healthcare',
            comments: 'Had diagnostic block done last week with 80% relief. Scheduling long-term RFA ablation.'
          }
        }
      ];
      localStorage.setItem('APS_LEADS', JSON.stringify(mockInitialLeads));
      return mockInitialLeads;
    }
    return JSON.parse(existing);
  };

  useEffect(() => {
    const loadedLeads = ensureMockLeads();
    setLeads(loadedLeads);
  }, []);

  const updateLeadStatus = (leadId, newStatus) => {
    const updated = leads.map(lead => {
      if (lead.id === leadId) {
        return { ...lead, status: newStatus };
      }
      return lead;
    });
    setLeads(updated);
    localStorage.setItem('APS_LEADS', JSON.stringify(updated));
    
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const deleteLead = (leadId) => {
    const updated = leads.filter(lead => lead.id !== leadId);
    setLeads(updated);
    localStorage.setItem('APS_LEADS', JSON.stringify(updated));
    setSelectedLead(null);
  };

  // Status Stages
  const stages = ['New', 'Contacted', 'Consultation Scheduled', 'Converted', 'Closed'];

  // Metrics
  const totalLeads = leads.length;
  const appointmentLeads = leads.filter(l => l.type === 'appointment').length;
  const contactLeads = leads.filter(l => l.type === 'contact').length;
  const convertedLeads = leads.filter(l => l.status === 'Converted').length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  return (
    <div className="w-full relative py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-8 text-left">

      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8 relative z-10">
        <div className="space-y-4">
          <Badge variant="primary" className="bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold uppercase tracking-widest">
            Clinical Administration
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-slate-900 leading-none">
            Lead Management Dashboard
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed max-w-3xl font-medium">
            Track patient inquiries, consultations, and appointment requests. Drag, drop, or update lead status stages to streamline patient intake and follow-up pipelines.
          </p>
        </div>
      </div>

      {/* 2. CLINICAL METRICS CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        
        <Card variant="white" padding="sm" className="border-slate-200/80 shadow-premium flex items-center gap-4">
          <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl border border-cyan-100 shadow-inner">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Total Leads</span>
            <span className="text-2xl font-black text-slate-900">{totalLeads}</span>
          </div>
        </Card>

        <Card variant="white" padding="sm" className="border-slate-200/80 shadow-premium flex items-center gap-4">
          <div className="p-3 bg-cta-50 text-cta-600 rounded-xl border border-cta-100 shadow-inner">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Appointments</span>
            <span className="text-2xl font-black text-slate-900">{appointmentLeads}</span>
          </div>
        </Card>

        <Card variant="white" padding="sm" className="border-slate-200/80 shadow-premium flex items-center gap-4">
          <div className="p-3 bg-accent-50 text-accent-600 rounded-xl border border-accent-100 shadow-inner">
            <Phone className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">General Contacts</span>
            <span className="text-2xl font-black text-slate-900">{contactLeads}</span>
          </div>
        </Card>

        <Card variant="white" padding="sm" className="border-slate-200/80 shadow-premium flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 shadow-inner">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Conversion Rate</span>
            <span className="text-2xl font-black text-slate-900">{conversionRate}%</span>
          </div>
        </Card>

      </div>

      {/* 3. KANBAN PIPELINE COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 overflow-x-auto pb-4 relative z-10">
        {stages.map((stage) => {
          const stageLeads = leads.filter(l => l.status === stage);
          return (
            <div key={stage} className="bg-slate-100/50 border border-slate-200/80 rounded-2xl p-4 min-w-[220px] flex flex-col space-y-4 shadow-sm">
              {/* Column Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-black text-xs text-slate-900 uppercase tracking-widest">{stage}</span>
                <Badge variant="neutral" className="bg-slate-200 text-slate-755 border border-slate-250 font-bold px-2 py-0.5">{stageLeads.length}</Badge>
              </div>

              {/* Cards Container */}
              <div className="flex-1 space-y-3 min-h-[300px]">
                {stageLeads.map((lead) => (
                  <Card 
                    key={lead.id} 
                    variant="white" 
                    padding="sm" 
                    className={`border-slate-200/80 shadow-premium hover:shadow-premium-hover cursor-pointer transition-all duration-200 ${
                      selectedLead && selectedLead.id === lead.id ? 'ring-2 ring-medical-600 shadow-premium-hover' : ''
                    }`}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                        <span>{lead.id}</span>
                        <Badge variant={lead.type === 'appointment' ? 'secondary' : 'accent'} className={lead.type === 'appointment' ? "bg-medical-50 text-medical-805" : "bg-cyan-50 text-cyan-805"}>
                          {lead.type === 'appointment' ? 'Booking' : 'Contact'}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 leading-snug">
                        {lead.patient.firstName} {lead.patient.lastName}
                      </h4>
                      {lead.type === 'appointment' && (
                        <div className="text-[11px] text-slate-600 space-y-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <p className="truncate"><strong>Condition:</strong> {lead.condition.split(' & ')[0]}</p>
                          <p><strong>Date:</strong> {lead.appointmentDate}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
                {stageLeads.length === 0 && (
                  <div className="h-full flex items-center justify-center py-10 text-xs text-slate-400 text-center border border-dashed border-slate-200 rounded-xl">
                    No leads at this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. DETAIL DRAWER / POPUP */}
      {selectedLead && (
        <Card variant="white" padding="lg" className="border-slate-200/80 shadow-premium relative z-10 space-y-6 animate-fade-in">
          <div className="flex justify-between items-start border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-2xl font-bold font-heading text-slate-900">
                Lead Detail: {selectedLead.patient.firstName} {selectedLead.patient.lastName}
              </h3>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Received on: {new Date(selectedLead.dateCreated).toLocaleString()} &bull; ID: {selectedLead.id}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                className="text-slate-400 hover:text-rose-600 p-2 rounded-full cursor-pointer" 
                onClick={() => deleteLead(selectedLead.id)}
                title="Delete Lead"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedLead(null)} className="text-slate-900 border-slate-350 hover:border-slate-400">
                Close Detail
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            
            {/* Patient Contacts */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1">Patient Contacts</h4>
              <ul className="space-y-2.5 text-slate-700">
                <li><strong>Phone:</strong> <a href={`tel:${selectedLead.patient.phone}`} className="text-medical-600 font-semibold hover:underline">{selectedLead.patient.phone}</a></li>
                <li><strong>Email:</strong> <a href={`mailto:${selectedLead.patient.email}`} className="text-medical-600 hover:underline">{selectedLead.patient.email}</a></li>
                <li><strong>Date of Birth:</strong> {selectedLead.patient.dob}</li>
                <li><strong>Insurance:</strong> {selectedLead.patient.insurance}</li>
              </ul>
            </div>

            {/* Appointment Details */}
            {selectedLead.type === 'appointment' && (
              <div className="space-y-4">
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1">Appointment Details</h4>
                <ul className="space-y-2.5 text-slate-700">
                  <li><strong>Condition:</strong> {selectedLead.condition}</li>
                  <li><strong>Treatment:</strong> {selectedLead.treatment}</li>
                  <li><strong>Provider:</strong> {selectedLead.provider}</li>
                  <li><strong>Slot:</strong> {selectedLead.appointmentDate} at {selectedLead.appointmentTime}</li>
                </ul>
              </div>
            )}

            {/* Comments & Message */}
            <div className="space-y-4 md:col-span-1">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1">Comments / Inquiries</h4>
              <p className="text-slate-650 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs max-h-40 overflow-y-auto whitespace-pre-line shadow-inner">
                {selectedLead.patient.comments || "No comment provided."}
              </p>
            </div>

          </div>

          {/* Action Stages Bar */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-3 items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Update Lead Stage:</span>
            <div className="flex flex-wrap gap-2">
              {stages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => updateLeadStatus(selectedLead.id, stage)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                    selectedLead.status === stage
                      ? 'bg-medical-600 text-white shadow-sm'
                      : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-800'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

    </div>
  );
}
