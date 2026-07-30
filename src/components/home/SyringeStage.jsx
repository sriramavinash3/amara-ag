import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import SyringeModel from './SyringeModel';
import ParticleField from './ParticleField';

export default function SyringeStage({ scrollProgress, opacity }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 transition-opacity duration-300"
      style={{ opacity, zIndex: 5 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 38 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[4, 5, 5]} angle={0.35} penumbra={0.8} intensity={2.2} color="#4fa4e0" />
        <spotLight position={[-4, -2, 3]} angle={0.5} penumbra={1} intensity={1.1} color="#1baa9c" />
        <Suspense fallback={null}>
          <SyringeModel scrollProgress={scrollProgress} isMobile={isMobile} />
          <ParticleField count={isMobile ? 100 : 220} />
          <Environment preset="city" />
          {!isMobile && (
            <ContactShadows position={[0, -1.8, 0]} opacity={0.3} blur={2.6} far={3} color="#000000" />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
