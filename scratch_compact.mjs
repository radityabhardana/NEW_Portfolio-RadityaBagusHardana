global.self = global;
global.createImageBitmap = async () => ({ width: 1, height: 1, close() {} });

import * as THREE from "three";
import { GLTFLoader, MeshoptDecoder } from "three-stdlib";
import { MeshoptSimplifier } from "meshoptimizer";
import fs from "fs";

await MeshoptSimplifier.ready;

const loader = new GLTFLoader();
const decoder = typeof MeshoptDecoder === "function" ? MeshoptDecoder() : MeshoptDecoder;
loader.setMeshoptDecoder(decoder);

const buffer = fs.readFileSync("./public/models/karakter.glb");
const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

loader.parse(arrayBuffer, "", async (gltf) => {
  let mesh;
  gltf.scene.traverse((c) => { if (c.isMesh) mesh = c; });
  
  const geom = mesh.geometry;
  const posAttr = geom.attributes.position;
  const normAttr = geom.attributes.normal;
  const uvAttr = geom.attributes.uv;
  const origIndices = geom.index.array;
  
  const targetIndices = 120000;
  const targetError = 0.01;
  
  const [newIndices, resError] = MeshoptSimplifier.simplify(
    new Uint32Array(origIndices),
    new Float32Array(posAttr.array),
    3,
    targetIndices,
    targetError
  );
  
  const [remap, uniqueVertices] = MeshoptSimplifier.compactMesh(newIndices);
  console.log(`Unique vertices: ${uniqueVertices}`);
  console.log(`Max index: ${Math.max(...newIndices)}`);
  
  // Compact position, normal, uv arrays:
  const newPositions = new Float32Array(uniqueVertices * 3);
  const newNormals = new Float32Array(uniqueVertices * 3);
  const newUvs = new Float32Array(uniqueVertices * 2);
  
  for (let i = 0; i < remap.length; i++) {
    const newIdx = remap[i];
    if (newIdx !== 0xFFFFFFFF) {
      newPositions[newIdx * 3 + 0] = posAttr.getX(i);
      newPositions[newIdx * 3 + 1] = posAttr.getY(i);
      newPositions[newIdx * 3 + 2] = posAttr.getZ(i);
      
      newNormals[newIdx * 3 + 0] = normAttr.getX(i);
      newNormals[newIdx * 3 + 1] = normAttr.getY(i);
      newNormals[newIdx * 3 + 2] = normAttr.getZ(i);
      
      newUvs[newIdx * 2 + 0] = uvAttr.getX(i);
      newUvs[newIdx * 2 + 1] = uvAttr.getY(i);
    }
  }
  
  // Remap indices:
  const remappedIndices = new Uint16Array(newIndices.length);
  for (let i = 0; i < newIndices.length; i++) {
    remappedIndices[i] = remap[newIndices[i]];
  }
  
  console.log("Remapped indices length:", remappedIndices.length);
  console.log("Positions length (bytes):", newPositions.byteLength);
  console.log("Normals length (bytes):", newNormals.byteLength);
  console.log("UVs length (bytes):", newUvs.byteLength);
  console.log("Indices length (bytes):", remappedIndices.byteLength);
  
  // Save compact binary buffers to scratch for GLB assembly:
  fs.writeFileSync("./scratch_positions.bin", Buffer.from(newPositions.buffer));
  fs.writeFileSync("./scratch_normals.bin", Buffer.from(newNormals.buffer));
  fs.writeFileSync("./scratch_uvs.bin", Buffer.from(newUvs.buffer));
  fs.writeFileSync("./scratch_indices.bin", Buffer.from(remappedIndices.buffer));
  console.log("Saved raw decimated buffers successfully!");
});
