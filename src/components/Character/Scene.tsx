import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());

  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      let characterObj: THREE.Object3D | null = null;
      const onResize = () => {
        if (characterObj) handleResize(renderer, camera, canvasDiv, characterObj);
      };
      loadCharacter().then((gltf) => {
        if (gltf) {
          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          let character = gltf.scene;
          characterObj = character;
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          light.turnOnLights();
          animations.startIntro();
          window.addEventListener("resize", onResize);
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      const onTouchMove = (event: TouchEvent) => {
        handleTouchMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      let touchEl: HTMLElement | null = null;
      const onTouchStart = (event: TouchEvent) => {
        touchEl = event.target as HTMLElement;
        debounce = setTimeout(() => {
          touchEl?.addEventListener("touchmove", onTouchMove);
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      let rafId = 0;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        } else if (characterObj && window.scrollY < 200) {
          const targetRotY = -Math.PI / 2 + mouse.x * 0.35;
          const targetRotX = -mouse.y * 0.15;
          characterObj.rotation.y = THREE.MathUtils.lerp(
            characterObj.rotation.y,
            targetRotY,
            0.05
          );
          characterObj.rotation.x = THREE.MathUtils.lerp(
            characterObj.rotation.x,
            targetRotX,
            0.05
          );
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(debounce);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("mousemove", onMouseMove);
        touchEl?.removeEventListener("touchmove", onTouchMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
        if (canvasDiv.current?.contains(renderer.domElement)) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        scene.clear();
        renderer.dispose();
        renderer.forceContextLoss();
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
