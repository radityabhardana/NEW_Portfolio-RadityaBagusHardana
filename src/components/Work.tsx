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

const workItems: WorkItem[] = [
  {
    title: "Portofolio Pribadi",
    category: "Antarmuka Web",
    tools: "React, JavaScript, HTML, CSS",
    image: "/project/portfolio.webp",
    alt: "Portofolio Pribadi Raditya Bagus Hardana",
    link: "https://radityabagushardana.netlify.app/",
  },
  {
    title: "Toko Mode Urban Core",
    category: "Antarmuka Web",
    tools: "HTML, CSS, JavaScript",
    image: "/project/urban.webp",
    alt: "Toko E-commerce Mode Urban Core",
    link: "https://urbancore.netlify.app",
  },
  {
    title: "Sistem Manajemen Inventaris",
    category: "Web Fullstack",
    tools: "PHP, MySQL, JavaScript, HTML, CSS",
    image: "/project/inventory.webp",
    alt: "Sistem Manajemen Inventaris",
    link: "https://github.com/radityabhardana/Inventory-System",
  },
  {
    title: "Aplikasi Pemesanan Tiket Bus",
    category: "Aplikasi Desktop",
    tools: "VB.NET",
    image: "/project/tiketbus.webp",
    alt: "Aplikasi Pemesanan Tiket Bus",
    link: "https://github.com/radityabhardana/Pemesanan-Tiket-Bus-VBNET",
  },
  {
    title: "Kloning Web Petani Kode",
    category: "Antarmuka Web",
    tools: "HTML, Bootstrap",
    image: "/project/petanikode.webp",
    alt: "Kloning Situs Petani Kode",
  },
  {
    title: "Situs Web Rekayasa Antariksa",
    category: "Antarmuka Web",
    tools: "HTML, CSS, JavaScript",
    image: "/project/aether.webp",
    alt: "Situs Web Rekayasa Antariksa Aether",
  },
  {
    title: "Studi Kasus UI/UX Antariksa",
    category: "Desain UI/UX",
    tools: "Figma, Desain Antarmuka",
    image: "/project/figma.webp",
    alt: "Studi Kasus Desain UI/UX Antariksa",
  },
  {
    title: "Portal Berita Digital",
    category: "Antarmuka Web",
    tools: "HTML, CSS, JavaScript",
    image: "/project/websiteberita.webp",
    alt: "Portal Berita Digital",
  },
];

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
            <span className="u-label">06 — Karya</span>
            <span className="work-rule" />
            <span className="u-label">08 proyek</span>
          </div>
          <h2>
            Karya <span>Pilihan</span>
          </h2>
        </div>

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
      </div>
    </div>
  );
};

export default Work;
