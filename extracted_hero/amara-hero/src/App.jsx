import { useEffect } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero'
import SyringeJourney from './components/SyringeJourney'
import InsuranceMarquee from './components/InsuranceMarquee'
import Conditions from './components/Conditions'
import Treatments from './components/Treatments'
import WhyChoose from './components/WhyChoose'
import Providers from './components/Providers'
import Testimonials from './components/Testimonials'
import AppointmentJourney from './components/AppointmentJourney'
import AIAssistant from './components/AIAssistant'
import InsuranceVerification from './components/InsuranceVerification'
import Blog from './components/Blog'
import FinalCTA from './components/FinalCTA'
import StickyActions from './components/StickyActions'

export default function App() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <main className="bg-ink">
      <SyringeJourney>
        <Hero />
        <InsuranceMarquee />
        <Conditions />
        <Treatments />
      </SyringeJourney>

      {/* smooth ink -> mist handoff, no hard cut into the light sections */}
      <div
        aria-hidden="true"
        style={{ height: '10rem', background: 'linear-gradient(180deg, #0d1a2c 0%, #f5f7fa 100%)' }}
      />

      <WhyChoose />
      <Providers />
      <Testimonials />
      <AppointmentJourney />
      <AIAssistant />
      <InsuranceVerification />
      <Blog />
      <FinalCTA />
      <StickyActions />
    </main>
  )
}
