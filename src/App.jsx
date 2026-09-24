import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StickyActionBar from './components/layout/StickyActionBar';
import AIChatbot from './components/features/ai-chat/AIChatbot';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Conditions from './pages/Conditions';
import ConditionDetail from './pages/ConditionDetail';
import Treatments from './pages/Treatments';
import TreatmentDetail from './pages/TreatmentDetail';
import Patients from './pages/Patients';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Referrals from './pages/Referrals';
import ProviderDetail from './pages/ProviderDetail';
import NotFound from './pages/NotFound';
import ExitIntentPopup from './components/layout/ExitIntentPopup';
import { AppointmentProvider } from './context/AppointmentContext';
import useScrollProgress from './hooks/useScrollProgress';
import './styles/skeuomorphic.css';

function MainLayout() {
  const containerRef = useRef(null);
  useScrollProgress(containerRef);

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-[#3A3838] text-[#F0F0F0] selection:bg-emerald-950 selection:text-emerald-300 pb-[68px] lg:pb-0 relative">
      {/* Removed Global Parallax Ambient Orbs to preserve dark mode integrity */}

      {/* Main Navigation Header */}
      <Header />

      {/* Main Scrollable Content area */}
      <main className="flex-grow w-full relative z-10 pt-[72px] md:pt-[112px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* Conditions Hub & Dynamic SEO Landing Pages */}
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/conditions/:id" element={<ConditionDetail />} />
          
          {/* Treatments Hub & Dynamic Procedure Guides */}
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/treatments/:id" element={<TreatmentDetail />} />
          
          {/* Patient resources, FAQS, and portals */}
          <Route path="/patients" element={<Patients />} />
          
          {/* Blog and articles */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          
          {/* Contact, maps, transit directions */}
          <Route path="/contact" element={<Contact />} />
          
          {/* Smart Booking Flow */}
          <Route path="/book" element={<BookAppointment />} />
          
          {/* Administrative Lead dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Compliance documents */}
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* Referral Center */}
          <Route path="/referrals" element={<Referrals />} />

          {/* Dynamic Provider Detail Pages */}
          <Route path="/providers/:id" element={<ProviderDetail />} />

          {/* 404 Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Clinical Footer */}
      <Footer />

      {/* Mobile-only Sticky Action Bar */}
      <StickyActionBar />

      {/* AI Symptom & FAQ chatbot assistant */}
      <AIChatbot />

      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </div>
  );
}

export default function App() {
  return (
    <AppointmentProvider>
      <Router>
        <ScrollToTop />
        <MainLayout />
      </Router>
    </AppointmentProvider>
  );
}
