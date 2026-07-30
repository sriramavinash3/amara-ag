import React, { useEffect, useRef, useState } from 'react';
import SyringeStage from './SyringeStage';

export default function SyringeJourney({ children }) {
  const wrapperRef = useRef(null);
  const progress = useRef(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
      progress.current = p;

      setOpacity(1.0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
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
  );
}
