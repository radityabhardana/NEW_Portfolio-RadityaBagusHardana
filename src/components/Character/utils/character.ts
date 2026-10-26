import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader, MeshoptDecoder } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  isDisposed: () => boolean = () => false
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);
  const decoder =
    typeof MeshoptDecoder === "function"
      ? (MeshoptDecoder as unknown as () => typeof MeshoptDecoder)()
      : MeshoptDecoder;
  loader.setMeshoptDecoder(decoder);

  const softenMaterial = (material: THREE.Material) => {
    if (material instanceof THREE.MeshStandardMaterial) {
      material.roughness = Math.max(material.roughness, 0.88);
      material.metalness = 0;
      material.envMapIntensity = 0.3;
      if (material instanceof THREE.MeshPhysicalMaterial) {
        material.specularIntensity = 0.2;
      }
      material.needsUpdate = true;
    }
  };

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      try {
        let character: THREE.Object3D;
        loader.load(
          "/models/karakter-opt.glb",
          async (gltf) => {
            if (isDisposed() || renderer.getContext().isContextLost()) {
              dracoLoader.dispose();
              resolve(null);
              return;
            }
            character = gltf.scene;

            // Compute bounding box to normalize scale and center position
            const box = new THREE.Box3().setFromObject(character);
            const size = new THREE.Vector3();
            box.getSize(size);
            const center = new THREE.Vector3();
            box.getCenter(center);

            // Scale character to fit the scene nicely (hips-up view, target height ~ 8.5 units)
            const targetHeight = 8.5;
            const scale = targetHeight / (size.y || 1);
            character.scale.set(scale, scale, scale);

            // Position so hips are near the bottom and head is near the top of the viewport
            character.position.x = -center.x * scale;
            character.position.y = 11.35 - center.y * scale;
            character.position.z = -center.z * scale;

            // Face directly forward towards the camera
            character.rotation.y = -Math.PI / 2;

            character.traverse((child: THREE.Object3D) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.frustumCulled = true;
                if (Array.isArray(mesh.material)) {
                  mesh.material.forEach(softenMaterial);
                } else if (mesh.material) {
                  softenMaterial(mesh.material);
                }
              }
            });
            await renderer.compileAsync(character, camera, scene);
            if (isDisposed() || renderer.getContext().isContextLost()) {
              dracoLoader.dispose();
              resolve(null);
              return;
            }
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            const footR = character.getObjectByName("footR");
            if (footR) footR.position.y = 3.36;
            const footL = character.getObjectByName("footL");
            if (footL) footL.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
