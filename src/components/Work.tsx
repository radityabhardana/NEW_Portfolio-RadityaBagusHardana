import { useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Work = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const workFlex = flexRef.current;
      const container = containerRef.current;
      if (!workFlex || !container) return;

      const getScrollAmount = () => {
        const boxes = container.querySelectorAll<HTMLElement>(".work-box");
        if (boxes.length === 0) return 0;
        const lastBox = boxes[boxes.length - 1];
        const containerPadding = 120;
        const totalCardsWidth = lastBox.offsetLeft + lastBox.offsetWidth;
        return Math.max(0, totalCardsWidth - window.innerWidth + containerPadding);
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          id: "work",
        },
      });

      timeline.to(workFlex, {
        x: () => -getScrollAmount(),
        ease: "none",
      });
    },
    { scope: containerRef }
  );
  return (
    <div className="work-section" id="work" ref={containerRef}>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex" ref={flexRef}>
          {[...Array(6)].map((_value, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>Project Name</h4>
                    <p>Category</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>Javascript, TypeScript, React, Threejs</p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
