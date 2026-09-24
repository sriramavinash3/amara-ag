import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from '../components/home/Hero';
import InsuranceMarquee from '../components/home/InsuranceMarquee';
import WhyChooseAndConditions from '../components/home/WhyChooseAndConditions';
import Providers from '../components/home/Providers';
import Testimonials from '../components/home/Testimonials';
import AppointmentJourney from '../components/home/AppointmentJourney';
import AIAssistant from '../components/home/AIAssistant';
import InsuranceVerification from '../components/home/InsuranceVerification';
import Blog from '../components/home/Blog';
import FinalCTA from '../components/home/FinalCTA';

export default function Home() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="bg-[#3A3838] min-h-screen text-[#F0F0F0]">
      <Hero />
      <InsuranceMarquee />
      <Testimonials />
      <AppointmentJourney />
      <AIAssistant />
      <InsuranceVerification />
      <WhyChooseAndConditions />
      <Providers />
      <Blog />
      <FinalCTA />
    </main>
  );
}
