import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Float, Resize } from '@react-three/drei';
import { SyringeModel } from './SyringeModel';

export function AnimatedSyringe({ scrollYProgress }) {
  const syringeRef = useRef();

  useEffect(() => {
    // Subscribe to framer-motion's scroll progress (0 to 1)
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (!syringeRef.current) return;

      const p = latest; // Progress from 0 to 1

      // 1. Scale Animation
      // Starts massive in the hero, shrinks for content, grows at the end.
      let scale = 2.5;
      if (p < 0.2) scale = 2.5 - (p / 0.2) * 1.5; // Shrink to 1.0
      else if (p > 0.8) scale = 1.0 + ((p - 0.8) / 0.2) * 1.5; // Grow to 2.5
      else scale = 1.0;

      // 2. Position Animation (Y-axis vertical movement and X-axis shifting)
      let yPos = 0;
      let xPos = 0;
      if (p < 0.3) {
        yPos = -(p / 0.3) * 2;
        xPos = (p / 0.3) * 3;
      } else if (p < 0.6) {
        yPos = -2 + ((p - 0.3) / 0.3) * 4;
        xPos = 3 - ((p - 0.3) / 0.3) * 6;
      } else {
        yPos = 2 - ((p - 0.6) / 0.4) * 2;
        xPos = -3 + ((p - 0.6) / 0.4) * 3;
      }

      // 3. Rotation Animation (True 3D WebGL rotation)
      const rotX = p * Math.PI * 4; // Tumble
      const rotY = p * Math.PI * 2; // Spin

      syringeRef.current.scale.setScalar(scale);
      syringeRef.current.position.set(xPos, yPos, 0);
      syringeRef.current.rotation.x = rotX;
      syringeRef.current.rotation.y = rotY;
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Constant slow idle rotation on Z
  useFrame((state, delta) => {
    if (syringeRef.current) {
      syringeRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={syringeRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Center>
          <Resize scale={3}>
            <SyringeModel />
          </Resize>
        </Center>
      </Float>
    </group>
  );
}
