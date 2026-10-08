import React from 'react';
import { useGLTF } from '@react-three/drei';

export function SyringeModel(props) {
  const { nodes } = useGLTF('/images/medical_syringe.glb');
  
  // Since we don't know the exact structure of the .glb nodes, 
  // we will render the entire scene, but we can apply custom materials if needed.
  // For now, we will just use primitive to render the entire loaded scene.
  
  return (
    <group {...props} dispose={null}>
      <primitive object={nodes.Scene || nodes.scene || Object.values(nodes)[0]} />
    </group>
  );
}

useGLTF.preload('/images/medical_syringe.glb');
