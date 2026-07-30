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
    <main className="bg-ink">
      <SyringeJourney>
        <Hero />
        <InsuranceMarquee />
        <Conditions />
        <Treatments />
      </SyringeJourney>

      <div className="relative z-10">
        {/* smooth ink -> mist handoff, no hard cut into the light sections */}
        <div
          aria-hidden="true"
          style={{ height: '10rem', background: 'linear-gradient(180deg, #0d1a2c 0%, #f5f7fa 100%)' }}
        />
        <WhyChoose />
      </div>

      <Providers />

      <div className="relative z-10">
        <Testimonials />
        <AppointmentJourney />
        <AIAssistant />
      </div>

      <InsuranceVerification />

      <div className="relative z-10">
        <Blog />
        <FinalCTA />
      </div>
    </main>
  );
}
