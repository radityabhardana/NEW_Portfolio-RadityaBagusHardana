import * as THREE from "three";
import gsap from "gsap";

let screenLightInterval: ReturnType<typeof setInterval> | null = null;

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  let intensity = 0;
  if (screenLightInterval) {
    clearInterval(screenLightInterval);
    screenLightInterval = null;
  }
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  let screenLight: THREE.Mesh<
    THREE.BufferGeometry,
    THREE.MeshStandardMaterial
  > | null = null;
  let monitor: THREE.Mesh<
    THREE.BufferGeometry,
    THREE.MeshStandardMaterial
  > | null = null;
  for (const object of character?.children ?? []) {
    if (object.name === "Plane004") {
      for (const child of object.children) {
        const mesh = child as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.MeshStandardMaterial
        >;
        if (!mesh.material) continue;
        mesh.material.transparent = true;
        mesh.material.opacity = 0;
        if (mesh.material.name === "Material.027") {
          monitor = mesh;
          mesh.material.color.set("#FFFFFF");
        }
      }
    }
    if (object.name === "screenlight") {
      const lightMesh = object as THREE.Mesh<
        THREE.BufferGeometry,
        THREE.MeshStandardMaterial
      >;
      if (!lightMesh.material) continue;
      lightMesh.material.transparent = true;
      lightMesh.material.opacity = 0;
      lightMesh.material.emissive.set("#A996FF");
      screenLightInterval = setInterval(() => {
        intensity = Math.random();
      }, 200);
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(lightMesh.material, {
        emissiveIntensity: () => intensity * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
      screenLight = lightMesh;
    }
  }
  const neckBone = character?.getObjectByName("spine005");
  if (window.innerWidth > 1024) {
    if (character) {
      tl1
        .fromTo(
          character.rotation,
          { y: -Math.PI / 2 },
          { y: -Math.PI / 2 + 0.6, duration: 1 },
          0
        )
        .fromTo(
          camera.position,
          { z: 25.2, y: 13.3 },
          { z: 25.6, y: 13.45, duration: 1 },
          0
        )
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%", opacity: 0 }, { y: "0%", opacity: 1 }, 0);

      tl2
        .to(
          camera.position,
          { z: 30.5, y: 13.55, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: "-10.5%", delay: 2, duration: 5 },
          0
        )
        .to(
          character.rotation,
          { y: -Math.PI / 2 + 0.42, x: 0.03, delay: 2.5, duration: 3.5 },
          0
        );

      if (neckBone) {
        tl2.to(neckBone.rotation, { x: 0.6, delay: 2, duration: 3 }, 0);
      }
      if (monitor) {
        tl2
          .to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
          .fromTo(
            monitor.position,
            { y: -10, z: 2 },
            { y: 0, z: 0, delay: 1.5, duration: 3 },
            0
          );
      }
      if (screenLight) {
        tl2.to(screenLight.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0);
      }

      tl2.fromTo(
        ".character-rim",
        { opacity: 1, scaleX: 1.4 },
        { opacity: 0.42, scale: 1.05, y: "58%", duration: 5, delay: 2 },
        0.3
      );

      tl3
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-100%", duration: 1, ease: "none" },
          0
        )
        .fromTo(
          ".character-model",
          { autoAlpha: 1 },
          { autoAlpha: 0, duration: 0.55, delay: 0.1, ease: "power1.inOut" },
          0
        )
        .to(character.rotation, { x: -0.04, duration: 0.6 }, 0);
    }
  }
}

export function setAllTimeline() {
  gsap.fromTo(
    ".whatIDO .cap",
    { autoAlpha: 0, y: 36 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".whatIDO",
        start: "top 72%",
        toggleActions: "play none none reverse",
      },
    }
  );
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )

    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}
