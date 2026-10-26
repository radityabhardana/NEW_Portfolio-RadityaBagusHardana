import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { smoother } from "./Navbar";
import "./styles/Certificates.css";

type CertificateCategory = "Projects" | "Certifications" | "Others";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  category: CertificateCategory;
  pinned?: boolean;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Clevio — Workshop GameDev",
    issuer: "Clevio",
    date: "2025",
    image: "/certificate/clevio.jpg",
    category: "Projects",
  },
  {
    id: 2,
    title: "IDN — WebDev Competition",
    issuer: "IDN Academy",
    date: "2025",
    image: "/certificate/idn.jpg",
    category: "Projects",
  },
  {
    id: 3,
    title: "Microvac — Seminar",
    issuer: "Microvac",
    date: "2024",
    image: "/certificate/microvac.jpg",
    category: "Others",
  },
  {
    id: 4,
    title: "Oscar — WebDev Competition",
    issuer: "Oscar Program",
    date: "2025",
    image: "/certificate/oscar.jpg",
    category: "Projects",
  },
  {
    id: 5,
    title: "Binance — AWS Blockchain Node Runner",
    issuer: "Binance Program",
    date: "2025",
    image: "/certificate/binance1.png",
    category: "Certifications",
    pinned: true,
  },
  {
    id: 6,
    title: "AWS — Machine Learning",
    issuer: "AWS Skill Builder",
    date: "2025",
    image: "/certificate/aws1.png",
    category: "Certifications",
    pinned: true,
  },
];

// Pinned certificates surface first. Array.prototype.sort is stable, so the
// remaining records keep their original relative order.
const ordered = [...certificates].sort(
  (a, b) => Number(!!b.pinned) - Number(!!a.pinned)
);

const Certificates = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const triggers = useRef<Record<number, HTMLButtonElement | null>>({});
  const closeRef = useRef<HTMLButtonElement>(null);

  const active = certificates.find((cert) => cert.id === activeId) ?? null;

  const dismiss = useCallback((id: number | null) => {
    setActiveId(null);
    smoother?.paused(false);
    if (id !== null) {
      requestAnimationFrame(() => triggers.current[id]?.focus());
    }
  }, []);

  const open = (id: number) => {
    smoother?.paused(true);
    setActiveId(id);
  };

  useEffect(() => {
    if (activeId === null) return;
    const id = activeId;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss(id);
      } else if (event.key === "Tab") {
        // the dialog has a single focusable control: trap focus on it
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeId, dismiss]);

  return (
    <div className="certificates-section section-container" id="certificates">
      <div className="cert-head">
        <div className="cert-eyebrow">
          <span className="u-label">05 — Certificates</span>
          <span className="cert-rule" />
          <span className="u-label">06 records</span>
        </div>
        <h2>Certificates</h2>
      </div>

      <ul className="cert-grid">
        {ordered.map((cert, index) => (
          <li
            className={`cert-card${cert.pinned ? " is-pinned" : ""}`}
            key={cert.id}
          >
            <button
              type="button"
              className="cert-plate"
              aria-label={`Preview certificate: ${cert.title}`}
              onClick={() => open(cert.id)}
              ref={(el) => {
                triggers.current[cert.id] = el;
              }}
            >
              <img
                src={cert.image}
                alt={cert.title}
                loading="lazy"
                decoding="async"
              />
              {cert.pinned && <span className="cert-pin">Pinned</span>}
            </button>

            <div className="cert-meta">
              <div className="cert-meta-row">
                <span className="cert-index u-label">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="cert-category u-label">{cert.category}</span>
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-sub">
                {cert.issuer} <span className="cert-sep">·</span> {cert.date}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {active &&
        createPortal(
          <div
            className="cert-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate preview: ${active.title}`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) dismiss(active.id);
            }}
          >
            <button
              type="button"
              className="cert-lightbox-close"
              ref={closeRef}
              onClick={() => dismiss(active.id)}
            >
              Close
            </button>

            <figure className="cert-lightbox-figure">
              <img src={active.image} alt={active.title} decoding="async" />
              <figcaption>
                <span className="cert-lightbox-title">{active.title}</span>
                <span className="cert-lightbox-sub">
                  {active.issuer} · {active.date} · {active.category}
                </span>
              </figcaption>
            </figure>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Certificates;
