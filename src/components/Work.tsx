import { useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowOutward } from "react-icons/md";
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

const workItems: WorkItem[] = [];

const Work = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);
  const isEmpty = workItems.length === 0;

  useGSAP(
    () => {
      if (isEmpty) return;
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
    { scope: containerRef, dependencies: [isEmpty] }
  );

  return (
    <div
      className={`work-section${isEmpty ? " is-empty" : ""}`}
      id="work"
      ref={containerRef}
    >
      <div className="work-container section-container">
        <div className="work-header">
          <div className="work-eyebrow">
            <span className="u-label">06 — Karya</span>
            <span className="work-rule" />
            <span className="u-label">
              {isEmpty
                ? "Status · Ongoing"
                : `${String(workItems.length).padStart(2, "0")} proyek`}
            </span>
          </div>
          <h2>
            Karya <span>Pilihan</span>
          </h2>
        </div>

        {isEmpty ? (
          <div className="work-ongoing">
            <div className="work-ongoing-badge">
              <span className="work-ongoing-dot" />
              Ongoing · Dalam Pengembangan
            </div>
            <h3 className="work-ongoing-title">
              Proyek terbaru sedang dalam tahap <em>pengerjaan &amp; kurasi</em>.
            </h3>
            <p className="work-ongoing-desc">
              Daftar karya pilihan sementara dikosongkan karena sedang disiapkan
              versi studi kasus terbaru. Perkembangan kode dan eksperimen aktif
              tetap dapat dilihat langsung melalui GitHub.
            </p>
            <a
              href="https://github.com/radityabhardana"
              target="_blank"
              rel="noreferrer"
              className="work-ongoing-link"
              data-cursor="disable"
            >
              Lihat Repositori GitHub <MdArrowOutward aria-hidden="true" />
            </a>
          </div>
        ) : (
          <div className="work-flex" ref={flexRef}>
            {workItems.map((item, index) => (
              <div className="work-box" key={item.title}>
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
        )}
      </div>
    </div>
  );
};

export default Work;
