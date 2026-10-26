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

  useEffect(() => {
    const containerEl = canvasDiv.current;
    if (containerEl) {
      let disposed = false;
      let cleanupHover: (() => void) | undefined;
      const rect = containerEl.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = new THREE.Scene();

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      containerEl.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.set(0, 13.3, 25.2);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: THREE.Object3D | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene, () => disposed);
      const { loadCharacter } = setCharacter(
        renderer,
        scene,
        camera,
        () => disposed
      );

      let characterObj: THREE.Object3D | null = null;
      const onResize = () => {
        if (characterObj) handleResize(renderer, camera, canvasDiv, characterObj);
      };
      loadCharacter().then((gltf) => {
        if (gltf && !disposed) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) {
            cleanupHover = animations.hover(gltf, hoverDivRef.current);
          }
          mixer = animations.mixer;
          const character = gltf.scene;
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
        const bounds = containerEl.getBoundingClientRect();
        const isOffscreen =
          containerEl.style.visibility === "hidden" ||
          bounds.bottom < -100 ||
          bounds.top > window.innerHeight + 100;
        if (isOffscreen) return;

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
        disposed = true;
        cleanupHover?.();
        cancelAnimationFrame(rafId);
        clearTimeout(debounce);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("mousemove", onMouseMove);
        touchEl?.removeEventListener("touchmove", onTouchMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
        if (containerEl.contains(renderer.domElement)) {
          containerEl.removeChild(renderer.domElement);
        }
        light.dispose();
        scene.clear();
        renderer.dispose();
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
