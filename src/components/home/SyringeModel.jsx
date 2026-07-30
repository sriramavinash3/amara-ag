import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, Resize, Center } from '@react-three/drei';
import * as THREE from 'three';
import spineModelUrl from '../../assets/spine_collection_of_thunthu.glb';

// Waypoints corresponding to sections: drop in, settle, barrel-roll, and depth recede.
function sampleWaypoints(p, waypointsList) {
  for (let i = 0; i < waypointsList.length - 1; i++) {
    const a = waypointsList[i];
    const b = waypointsList[i + 1];
    if (p >= a.p && p <= b.p) {
      const t = b.p === a.p ? 0 : (p - a.p) / (b.p - a.p);
      const eased = t * t * (3 - 2 * t);
      const lerp3 = (u, v) => u.map((val, idx) => THREE.MathUtils.lerp(val, v[idx], eased));
      return {
        pos: lerp3(a.pos, b.pos),
        rot: lerp3(a.rot, b.rot),
        scale: THREE.MathUtils.lerp(a.scale, b.scale, eased),
      };
    }
  }
  const last = waypointsList[waypointsList.length - 1];
  return { pos: last.pos, rot: last.rot, scale: last.scale };
}

function spinRate(p) {
  return 1;
}

export default function SyringeModel({ scrollProgress, isMobile }) {
  const group = useRef();
  const { scene } = useGLTF(spineModelUrl);

  // Compute responsive waypoints list dynamically based on viewport category
  const waypoints = useMemo(() => {
    if (isMobile) {
      return [
        { p: 0.00, pos: [0.35, -0.4, -0.6], rot: [0.0, 0.5, 0.0], scale: 0.6 },
        { p: 0.09, pos: [0.35, -0.4, -0.6], rot: [0.05, 0.5, 0.35], scale: 0.6 },
        { p: 0.20, pos: [0.35, -0.42, -0.6], rot: [0.08, 0.45, 1.15], scale: 0.6 },
        // Settle centered but scaled down on mobile to not overwhelm the Conditions section cards
        { p: 0.50, pos: [0.0, 0.0, 0.2], rot: [0.3, 0.7, 1.3], scale: 0.95 },
        { p: 0.78, pos: [0.35, -0.22, -0.6], rot: [0.05, 0.45, 1.2], scale: 0.6 },
        { p: 1.00, pos: [0.35, -0.22, -0.6], rot: [0.05, 0.45, 1.2], scale: 0.6 },
      ];
    }
    return [
      { p: 0.00, pos: [0.9, -0.22, 0.0], rot: [0.0, 0.5, 0.0], scale: 1.0 },
      { p: 0.09, pos: [0.9, -0.22, 0.0], rot: [0.05, 0.5, 0.35], scale: 1.0 },
      { p: 0.20, pos: [0.9, -0.25, 0.0], rot: [0.08, 0.45, 1.15], scale: 1.0 },
      { p: 0.50, pos: [0.0, 0.1, 2.3], rot: [0.3, 0.7, 1.3], scale: 1.65 },
      { p: 0.78, pos: [0.9, -0.05, 0.0], rot: [0.05, 0.45, 1.2], scale: 1.0 },
      { p: 1.00, pos: [0.9, -0.05, 0.0], rot: [0.05, 0.45, 1.2], scale: 1.0 },
    ];
  }, [isMobile]);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) child.material.envMapIntensity = 1.4;
      }
    });
    
    return clone;
  }, [scene]);

  const pointer = useRef({ x: 0, y: 0 });
  const barrelSpin = useRef(0);
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    const sp = scrollProgress.current;
    const target = sampleWaypoints(sp, waypoints);

    barrelSpin.current += delta * 0.5 * spinRate(sp);
    if (innerRef.current) innerRef.current.rotation.y = barrelSpin.current;

    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04;

    const posLerp = sp > 0.85 ? 0.045 : 0.09;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, target.pos[0], posLerp);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, target.pos[1], posLerp);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, target.pos[2], posLerp);

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      target.rot[0] - pointer.current.y * 0.12,
      0.07
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      target.rot[1] + pointer.current.x * 0.08,
      0.07
    );
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, target.rot[2], 0.07);

    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, target.scale, 0.08));
  });

  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.35}>
      <group ref={group} dispose={null}>
        <group ref={innerRef} rotation={[0, 0, 0]}>
          <Center>
            <Resize scale={2.6}>
              {/* The model is often rotated strangely out of Blender, flip and stand it up here */}
              <primitive object={model} rotation={[Math.PI / 2, 0, Math.PI]} />
            </Resize>
          </Center>
        </group>
      </group>
    </Float>
  );
}

useGLTF.preload(spineModelUrl);
