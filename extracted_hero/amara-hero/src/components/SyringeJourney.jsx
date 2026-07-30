import { useEffect, useRef, useState } from 'react'
import SyringeStage from './SyringeStage'

// Wraps Hero + Conditions + Treatments. Tracks scroll across the whole span
// (not per-section) so the same syringe instance can be posed continuously,
// and paints one uninterrupted gradient backdrop behind all three so there's
// no hard color seam or dead space between sections.
export default function SyringeJourney({ children }) {
  const wrapperRef = useRef(null)
  const progress = useRef(0)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0
      progress.current = p

      // fade the whole 3D stage in/out at the very edges so it never pops —
      // the fade-out window is wide because the exit is a depth recede
      // (dolly back + drift), not a scale-down, so it needs room to read
      // before it disappears
      const fadeIn = Math.min(p / 0.05, 1)
      const fadeOut = 1 - Math.max((p - 0.9) / 0.1, 0)
      setOpacity(Math.min(fadeIn, fadeOut))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={wrapperRef} className="relative">
      {/* single continuous backdrop — replaces per-section bg colors so
          there is never a hard cut or blank frame between stages */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, #060d17 0%, #0a1120 30%, #0b1626 55%, #0a1424 80%, #0d1a2c 100%)',
        }}
      />
      <SyringeStage scrollProgress={progress} opacity={opacity} />
      {children}
    </div>
  )
}
