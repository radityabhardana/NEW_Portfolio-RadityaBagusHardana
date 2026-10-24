global.self = global;
global.createImageBitmap = async () => ({ width: 1, height: 1, close() {} });

import * as THREE from "three";
import { GLTFLoader, MeshoptDecoder } from "three-stdlib";
import { SimplifyModifier } from "three/examples/jsm/modifiers/SimplifyModifier.js";
import fs from "fs";

console.log("Loading GLTF...");
const loader = new GLTFLoader();
const decoder = typeof MeshoptDecoder === "function" ? MeshoptDecoder() : MeshoptDecoder;
loader.setMeshoptDecoder(decoder);

const buffer = fs.readFileSync("./public/models/karakter.glb");
const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

loader.parse(arrayBuffer, "", (gltf) => {
  console.log("Loaded!");
  let mesh;
  gltf.scene.traverse((c) => { if (c.isMesh) mesh = c; });
  console.log("Original vertex count:", mesh.geometry.attributes.position.count);
  console.log("Original index count:", mesh.geometry.index ? mesh.geometry.index.count : 0);
});
