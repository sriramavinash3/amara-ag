import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'

// The syringe holds ONE stage position for the whole journey (no left/right
// travel — that read as gimmicky). What changes is orientation: it drops in
// standing upright, then tips onto its side into a flat display pose and
// rotates slowly on its own axis like a product on a turntable. It never
// shrinks to exit — it recedes in depth (dollies back and drifts up) while
// the page fades it out, which reads as it leaving the scene rather than
// deflating.
const WAYPOINTS = [
  // entrance: drop in from above, upright, tiny -> full size
  { p: 0.00, pos: [0.9, 2.6, 0.0], rot: [0.05, 0.5, 0.05], scale: 0.4 },
  { p: 0.09, pos: [0.9, 0.05, 0.0], rot: [0.05, 0.5, 0.35], scale: 1.0 },
  // settle: tip from upright into the flat, angled "display" pose
  { p: 0.20, pos: [0.9, 0.0, 0.0], rot: [0.08, 0.45, 1.15], scale: 1.0 },
  // long hold across Conditions + Treatments — position barely moves,
  // barrel-roll spin (handled separately below) does the work
  { p: 0.75, pos: [0.9, -0.05, 0.0], rot: [0.05, 0.45, 1.2], scale: 1.0 },
  // exit: dolly back into depth + drift up and out, no scale collapse
  { p: 0.92, pos: [0.9, 0.6, -5.5], rot: [0.02, 0.45, 1.05], scale: 0.94 },
  { p: 1.00, pos: [0.9, 1.4, -11], rot: [0.0, 0.45, 0.95], scale: 0.9 },
]

function sampleWaypoints(p) {
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    const a = WAYPOINTS[i]
    const b = WAYPOINTS[i + 1]
    if (p >= a.p && p <= b.p) {
      const t = b.p === a.p ? 0 : (p - a.p) / (b.p - a.p)
      const eased = t * t * (3 - 2 * t) // smoothstep for a less mechanical settle
      const lerp3 = (u, v) => u.map((val, idx) => THREE.MathUtils.lerp(val, v[idx], eased))
      return {
        pos: lerp3(a.pos, b.pos),
        rot: lerp3(a.rot, b.rot),
        scale: THREE.MathUtils.lerp(a.scale, b.scale, eased),
      }
    }
  }
  const last = WAYPOINTS[WAYPOINTS.length - 1]
  return { pos: last.pos, rot: last.rot, scale: last.scale }
}

// How fast the barrel-roll (rotation along the syringe's own long axis)
// spins at a given scroll progress: ramps up out of the entrance, holds a
// steady showcase speed through the hold, eases to a stop before the exit.
function spinRate(p) {
  if (p < 0.2) return THREE.MathUtils.smoothstep(p, 0.09, 0.2)
  if (p < 0.82) return 1
  if (p < 0.92) return 1 - THREE.MathUtils.smoothstep(p, 0.82, 0.92)
  return 0
}

export default function SyringeModel({ scrollProgress }) {
  const group = useRef()
  const { scene } = useGLTF('/models/syringe.glb')

  const model = useMemo(() => {
    const clone = scene.clone(true)
    const box = new THREE.Box3().setFromObject(clone)
    const size = new THREE.Vector3()
    box.getSize(size)
    const center = new THREE.Vector3()
    box.getCenter(center)
    clone.position.sub(center)

    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const scale = 2.6 / maxDim
    clone.scale.setScalar(scale)

    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) child.material.envMapIntensity = 1.4
      }
    })
    return clone
  }, [scene])

  const pointer = useRef({ x: 0, y: 0 })
  const barrelSpin = useRef(0)
  const innerRef = useRef()

  useFrame((state, delta) => {
    if (!group.current) return
    const sp = scrollProgress.current
    const target = sampleWaypoints(sp)

    barrelSpin.current += delta * 0.5 * spinRate(sp)
    if (innerRef.current) innerRef.current.rotation.y = barrelSpin.current

    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04

    const posLerp = sp > 0.85 ? 0.045 : 0.09 // slower, weightier motion during the exit dolly
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, target.pos[0], posLerp)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, target.pos[1], posLerp)
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, target.pos[2], posLerp)

    // barrel roll happens on the local Y axis of the *tipped* syringe, so once
    // flat it spins like a rotisserie rather than tumbling end over end
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      target.rot[0] - pointer.current.y * 0.12,
      0.07
    )
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      target.rot[1] + pointer.current.x * 0.08,
      0.07
    )
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, target.rot[2], 0.07)

    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, target.scale, 0.08))
  })

  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.35}>
      <group ref={group} dispose={null}>
        {/* the barrel spin rotates the model independently of the outer
            group's waypoint orientation, so the two motions don't fight */}
        <group ref={innerRef} rotation={[0, 0, 0]}>
          <primitive object={model} />
        </group>
      </group>
    </Float>
  )
}

useGLTF.preload('/models/syringe.glb')
