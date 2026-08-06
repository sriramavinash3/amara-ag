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
        {/* 1. Book App */}
        <Hero />
        <InsuranceMarquee />

        {/* Transition Dark -> Light */}
        <div
          aria-hidden="true"
          className="relative z-10"
          style={{ height: '10rem', background: 'linear-gradient(180deg, #0d1a2c 0%, #f5f7fa 100%)' }}
        />

        {/* 2. Testimonial */}
        <div className="relative z-10">
          <Testimonials />
        </div>

        {/* Transition Light -> Dark */}
        <div
          aria-hidden="true"
          className="relative z-10"
          style={{ height: '10rem', background: 'linear-gradient(180deg, #f5f7fa 0%, #060d17 100%)' }}
        />

        {/* 3. 5 steps for your 1st Visit */}
        <AppointmentJourney />

        {/* Transition Dark -> Light */}
        <div
          aria-hidden="true"
          className="relative z-10"
          style={{ height: '10rem', background: 'linear-gradient(180deg, #060d17 0%, #f5f7fa 100%)' }}
        />

        {/* 4. Ans for your [FAQs] */}
        <div className="relative z-10">
          <AIAssistant />
        </div>

        {/* Transition Light -> Dark */}
        <div
          aria-hidden="true"
          className="relative z-10"
          style={{ height: '10rem', background: 'linear-gradient(180deg, #f5f7fa 0%, #0c1422 100%)' }}
        />

        {/* 5. Insurance */}
        <InsuranceVerification />

        {/* 6. Pain Conditions */}
        <Conditions />

        {/* Transition Dark -> Light */}
        <div
          aria-hidden="true"
          className="relative z-10"
          style={{ height: '10rem', background: 'linear-gradient(180deg, #0a1120 0%, #f5f7fa 100%)' }}
        />

        {/* 7. 6 Reasons */}
        <div className="relative z-10">
          <WhyChoose />
        </div>

        {/* Transition Light -> Dark */}
        <div
          aria-hidden="true"
          className="relative z-10"
          style={{ height: '10rem', background: 'linear-gradient(180deg, #f5f7fa 0%, #0c1422 100%)' }}
        />

        {/* 8. Doctor */}
        <Providers />
      </SyringeJourney>
    </main>
  );
}
