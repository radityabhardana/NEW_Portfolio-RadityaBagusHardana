import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

let activeLandingSplit: SplitText | null = null;

export function initialFX() {
  document.body.style.overflowY = "auto";
  if (smoother) {
    smoother.paused(false);
  }
  document.getElementsByTagName("main")[0]?.classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a090f",
    duration: 0.3,
    delay: 0.1,
  });

  if (activeLandingSplit) {
    activeLandingSplit.revert();
  }

  // Masthead + role reveal: character-by-character, no rotating loop.
  activeLandingSplit = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    activeLandingSplit.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.022,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}
