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

  const loadLeads = () => {
    const existing = localStorage.getItem('APS_LEADS');
    return existing ? JSON.parse(existing) : [];
  };

  useEffect(() => {
    const loadedLeads = loadLeads();
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
    <div className="w-full relative py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-6 text-left">

      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#585454] pb-6 relative z-10">
        <div className="space-y-4">
          <Badge variant="primary" className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-bold uppercase tracking-widest">
            Clinical Administration
          </Badge>
          <h1 className="text-[34px] md:text-[46px] font-black font-heading tracking-tight text-[#FFFFFF] leading-none">
            Lead Management Dashboard
          </h1>
          <p className="text-lg text-[#F0F0F0] leading-relaxed max-w-3xl font-medium">
            Track patient inquiries, consultations, and appointment requests. Drag, drop, or update lead status stages to streamline patient intake and follow-up pipelines.
          </p>
        </div>
      </div>

      {/* 2. CLINICAL METRICS CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        
        <Card variant="white" padding="sm" className="border-[#585454] shadow-2xl flex items-center gap-4 p-5 rounded-2xl bg-[#454242]">
          <div className="p-3 bg-[#363434] text-emerald-400 rounded-xl border border-[#585454] shadow-inner">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-[#D1D5DB] text-xs font-bold uppercase tracking-wider">Total Leads</span>
            <span className="text-2xl font-black text-[#FFFFFF]">{totalLeads}</span>
          </div>
        </Card>

        <Card variant="white" padding="sm" className="border-[#585454] shadow-2xl flex items-center gap-4 p-5 rounded-2xl bg-[#454242]">
          <div className="p-3 bg-[#363434] text-amber-400 rounded-xl border border-[#585454] shadow-inner">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-[#D1D5DB] text-xs font-bold uppercase tracking-wider">Appointments</span>
            <span className="text-2xl font-black text-[#FFFFFF]">{appointmentLeads}</span>
          </div>
        </Card>

        <Card variant="white" padding="sm" className="border-[#585454] shadow-2xl flex items-center gap-4 p-5 rounded-2xl bg-[#454242]">
          <div className="p-3 bg-[#363434] text-emerald-400 rounded-xl border border-[#585454] shadow-inner">
            <Phone className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-[#D1D5DB] text-xs font-bold uppercase tracking-wider">General Contacts</span>
            <span className="text-2xl font-black text-[#FFFFFF]">{contactLeads}</span>
          </div>
        </Card>

        <Card variant="white" padding="sm" className="border-[#585454] shadow-2xl flex items-center gap-4 p-5 rounded-2xl bg-[#454242]">
          <div className="p-3 bg-[#363434] text-emerald-400 rounded-xl border border-[#585454] shadow-inner">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-[#D1D5DB] text-xs font-bold uppercase tracking-wider">Conversion Rate</span>
            <span className="text-2xl font-black text-[#FFFFFF]">{conversionRate}%</span>
          </div>
        </Card>

      </div>

      {/* 3. KANBAN PIPELINE COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 overflow-x-auto pb-4 relative z-10">
        {stages.map((stage) => {
          const stageLeads = leads.filter(l => l.status === stage);
          return (
            <div key={stage} className="bg-[#363434] border border-[#585454] rounded-2xl p-4 min-w-[220px] flex flex-col space-y-4 shadow-xl">
              {/* Column Header */}
              <div className="flex items-center justify-between border-b border-[#585454] pb-2">
                <span className="font-extrabold text-xs text-[#FFFFFF] uppercase tracking-widest">{stage}</span>
                <Badge variant="neutral" className="bg-[#323030] text-[#F0F0F0] border border-[#585454] font-bold px-2 py-0.5">{stageLeads.length}</Badge>
              </div>

              {/* Cards Container */}
              <div className="flex-1 space-y-3 min-h-[300px]">
                {stageLeads.map((lead) => (
                  <Card 
                    key={lead.id} 
                    variant="white" 
                    padding="sm" 
                    className={`border-[#585454] shadow-xl hover:border-emerald-500/50 cursor-pointer transition-all duration-200 bg-[#454242] rounded-xl ${
                      selectedLead && selectedLead.id === lead.id ? 'ring-2 ring-emerald-500' : ''
                    }`}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] text-[#D1D5DB] font-bold">
                        <span>{lead.id}</span>
                        <Badge variant={lead.type === 'appointment' ? 'secondary' : 'accent'} className={lead.type === 'appointment' ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800/60" : "bg-[#363434] text-[#F0F0F0] border border-[#585454]"}>
                          {lead.type === 'appointment' ? 'Booking' : 'Contact'}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-[12px] text-[#FFFFFF] leading-snug">
                        {lead.patient.firstName} {lead.patient.lastName}
                      </h4>
                      {lead.type === 'appointment' && (
                        <div className="text-[11px] text-[#F0F0F0] space-y-1 bg-[#323030] p-2 rounded-lg border border-[#585454] font-medium">
                          <p className="truncate"><strong className="text-[#FFFFFF]">Condition:</strong> {lead.condition.split(' & ')[0]}</p>
                          <p><strong className="text-[#FFFFFF]">Date:</strong> {lead.appointmentDate}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
                {stageLeads.length === 0 && (
                  <div className="h-full flex items-center justify-center py-10 text-xs text-[#D1D5DB] text-center border border-dashed border-[#585454] rounded-xl">
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
        <Card variant="white" padding="lg" className="border-[#585454] shadow-2xl relative z-10 space-y-6 animate-fade-in bg-[#454242] p-8 rounded-3xl">
          <div className="flex justify-between items-start border-b border-[#585454] pb-4">
            <div>
              <h3 className="text-[22px] font-bold font-heading text-[#FFFFFF]">
                Lead Detail: {selectedLead.patient.firstName} {selectedLead.patient.lastName}
              </h3>
              <span className="text-xs text-[#D1D5DB] font-bold uppercase tracking-wider">
                Received on: {new Date(selectedLead.dateCreated).toLocaleString()} &bull; ID: {selectedLead.id}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost-dark" 
                onClick={() => deleteLead(selectedLead.id)}
                title="Delete Lead"
                className="text-[#D1D5DB] hover:text-rose-400"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setSelectedLead(null)}>
                Close Detail
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            
            {/* Patient Contacts */}
            <div className="space-y-4">
              <h4 className="font-extrabold text-[10px] text-[#FFFFFF] uppercase tracking-widest border-b border-[#585454] pb-1">Patient Contacts</h4>
              <ul className="space-y-2.5 text-[#F0F0F0] font-medium">
                <li><strong className="text-[#FFFFFF]">Phone:</strong> <a href={`tel:${selectedLead.patient.phone}`} className="text-emerald-400 font-bold hover:underline">{selectedLead.patient.phone}</a></li>
                <li><strong className="text-[#FFFFFF]">Email:</strong> <a href={`mailto:${selectedLead.patient.email}`} className="text-emerald-400 font-medium hover:underline">{selectedLead.patient.email}</a></li>
                <li><strong className="text-[#FFFFFF]">Date of Birth:</strong> {selectedLead.patient.dob}</li>
                <li><strong className="text-[#FFFFFF]">Insurance:</strong> {selectedLead.patient.insurance}</li>
              </ul>
            </div>

            {/* Appointment Details */}
            {selectedLead.type === 'appointment' && (
              <div className="space-y-4">
                <h4 className="font-extrabold text-[10px] text-[#FFFFFF] uppercase tracking-widest border-b border-[#585454] pb-1">Appointment Details</h4>
                <ul className="space-y-2.5 text-[#F0F0F0] font-medium">
                  <li><strong className="text-[#FFFFFF]">Condition:</strong> {selectedLead.condition}</li>
                  <li><strong className="text-[#FFFFFF]">Treatment:</strong> {selectedLead.treatment}</li>
                  <li><strong className="text-[#FFFFFF]">Provider:</strong> {selectedLead.provider}</li>
                  <li><strong className="text-[#FFFFFF]">Slot:</strong> {selectedLead.appointmentDate} at {selectedLead.appointmentTime}</li>
                </ul>
              </div>
            )}

            {/* Comments & Message */}
            <div className="space-y-4 md:col-span-1">
              <h4 className="font-extrabold text-[10px] text-[#FFFFFF] uppercase tracking-widest border-b border-[#585454] pb-1">Comments / Inquiries</h4>
              <p className="text-[#F0F0F0] leading-relaxed bg-[#363434] p-4 rounded-xl border border-[#585454] text-xs max-h-40 overflow-y-auto whitespace-pre-line shadow-inner font-medium">
                {selectedLead.patient.comments || "No comment provided."}
              </p>
            </div>

          </div>

          {/* Action Stages Bar */}
          <div className="pt-6 border-t border-[#585454] flex flex-wrap gap-3 items-center justify-between">
            <span className="text-xs font-bold text-[#D1D5DB] uppercase tracking-wider">Update Lead Stage:</span>
            <div className="flex flex-wrap gap-2">
              {stages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => updateLeadStatus(selectedLead.id, stage)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                    selectedLead.status === stage
                      ? 'bg-emerald-600 text-white shadow-sm border-none'
                      : 'bg-[#363434] hover:bg-[#514E4E] border border-[#585454] text-[#F0F0F0]'
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
