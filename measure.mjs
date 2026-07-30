import fs from 'fs';
import { NodeIO } from '@gltf-transform/core';

async function measure() {
  const io = new NodeIO();
  const document = await io.read('./src/assets/spine_collection_of_thunthu.glb');
  
  // Just print some basics
  const root = document.getRoot();
  const meshes = root.listMeshes();
  console.log(`Found ${meshes.length} meshes.`);
  
  const nodes = root.listNodes();
  nodes.forEach(node => {
    console.log(`Node: ${node.getName()}, Scale: ${node.getScale()}, Translation: ${node.getTranslation()}`);
  });
}

measure().catch(console.error);
