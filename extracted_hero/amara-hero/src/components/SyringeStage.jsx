import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import SyringeModel from './SyringeModel'
import ParticleField from './ParticleField'

// One Canvas, mounted once, positioned fixed behind the scrollable content.
// scrollProgress (0-1) is driven externally by the section it's currently
// bridging (Hero -> Conditions -> Treatments) so the syringe never "hands off"
// to a new element — it's the same object the whole way down.
export default function SyringeStage({ scrollProgress, opacity }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{ opacity }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[4, 5, 5]} angle={0.35} penumbra={0.8} intensity={2.2} color="#4fa4e0" />
        <spotLight position={[-4, -2, 3]} angle={0.5} penumbra={1} intensity={1.1} color="#1baa9c" />
        <Suspense fallback={null}>
          <SyringeModel scrollProgress={scrollProgress} />
          <ParticleField />
          <Environment preset="city" />
          <ContactShadows position={[0, -1.8, 0]} opacity={0.3} blur={2.6} far={3} color="#000000" />
        </Suspense>
      </Canvas>
    </div>
  )
}
