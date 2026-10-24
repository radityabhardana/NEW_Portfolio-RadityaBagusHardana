global.self = global;
global.createImageBitmap = async () => ({ width: 1, height: 1, close() {} });

import * as THREE from "three";
import { GLTFLoader, MeshoptDecoder } from "three-stdlib";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { MeshoptSimplifier } from "meshoptimizer";
import fs from "fs";

await MeshoptSimplifier.ready;

console.log("Loading GLTF...");
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
  const origIndices = geom.index.array;
  
  console.log(`Original indices: ${origIndices.length} (${origIndices.length / 3} triangles)`);
  console.log(`Original vertices: ${posAttr.count}`);
  
  // Target 50,000 triangles = 150,000 indices
  const targetIndices = 120000;
  const targetError = 0.01;
  
  console.log("Simplifying with MeshoptSimplifier...");
  const t0 = Date.now();
  const [newIndices, resError] = MeshoptSimplifier.simplify(
    new Uint32Array(origIndices),
    new Float32Array(posAttr.array),
    3, // stride in floats (x, y, z)
    targetIndices,
    targetError
  );
  console.log(`Done in ${Date.now() - t0}ms!`);
  console.log(`New indices: ${newIndices.length} (${newIndices.length / 3} triangles), error: ${resError}`);
  
  // Update geometry with new indices
  geom.setIndex(new THREE.BufferAttribute(newIndices, 1));
  
  console.log("Exporting to GLB...");
  const exporter = new GLTFExporter();
  exporter.parse(
    gltf.scene,
    (result) => {
      fs.writeFileSync("./public/models/karakter_decimated.glb", Buffer.from(result));
      const sz = fs.statSync("./public/models/karakter_decimated.glb").size;
      console.log(`Exported karakter_decimated.glb: ${sz} bytes (${(sz / (1024*1024)).toFixed(2)} MB)`);
    },
    (err) => {
      console.error("Export error:", err);
    },
    { binary: true }
  );
});
