import React, { useEffect } from 'react';
import Lenis from 'lenis';
import SyringeJourney from '../components/home/SyringeJourney';
import Hero from '../components/home/Hero';
import InsuranceMarquee from '../components/home/InsuranceMarquee';
import Conditions from '../components/home/Conditions';
import Treatments from '../components/home/Treatments';
import WhyChoose from '../components/home/WhyChoose';
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
    <main className="bg-stone-50 min-h-screen">
      <Hero />
      <InsuranceMarquee />

      <div className="space-y-16 md:space-y-24 py-8 md:py-12">
        <Testimonials />
        <AppointmentJourney />
        <AIAssistant />
        <InsuranceVerification />
        <Conditions />
        <WhyChoose />
        <Providers />
      </div>
    </main>
  );
}
