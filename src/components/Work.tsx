import { useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface WorkItem {
  title: string;
  category: string;
  tools: string;
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

// Placeholder content — real project data gets dropped in here later.
const placeholderItem: WorkItem = {
  title: "Project Name",
  category: "Category",
  tools: "Javascript, TypeScript, React, Threejs",
  image: "/images/placeholder.webp",
  alt: "",
};

const workItems: WorkItem[] = Array.from({ length: 6 }, () => ({
  ...placeholderItem,
}));

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
        <div className="work-header">
          <div className="work-eyebrow">
            <span className="u-label">05 — Work</span>
            <span className="work-rule" />
          </div>
          <h2>
            Selected <span>Work</span>
          </h2>
        </div>

        <div className="work-flex" ref={flexRef}>
          {workItems.map((item, index) => (
            <div className="work-box" key={index}>
              <WorkImage
                image={item.image}
                alt={item.alt}
                video={item.video}
                link={item.link}
              />
              <div className="work-info">
                <div className="work-head">
                  <span className="work-index u-label">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="work-category u-label">{item.category}</span>
                </div>
                <h4 className="work-name">{item.title}</h4>
                <p className="work-tools">{item.tools}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
