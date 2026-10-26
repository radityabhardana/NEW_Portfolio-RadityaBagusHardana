import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { smoother } from "./Navbar";
import "./styles/Certificates.css";

export type CertificateCategory = "Projects" | "Certifications" | "Others";

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  category: CertificateCategory;
  pinned?: boolean;
}

export const certificates: Certificate[] = [
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

  const restoreId = useRef<number | null>(null);

  const dismiss = useCallback((id: number | null) => {
    if (id !== null) restoreId.current = id;
    setActiveId(null);
    smoother?.paused(false);
  }, []);

  const open = (id: number) => {
    smoother?.paused(true);
    setActiveId(id);
  };

  // Return focus to the triggering card the moment the lightbox unmounts.
  // A layout effect runs synchronously right after that commit; requestAnimationFrame
  // is not used because it never fires in hidden/headless tabs.
  useLayoutEffect(() => {
    if (activeId === null && restoreId.current !== null) {
      const id = restoreId.current;
      restoreId.current = null;
      triggers.current[id]?.focus();
    }
  }, [activeId]);

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
    <div className="records-section section-container" id="certificates">
      <div className="records-head">
        <span className="u-label">05 — Certificates</span>
        <h2 className="records-title">Records</h2>
      </div>

      <ul className="records-list">
        {ordered.map((cert) => (
          <li className="records-row" key={cert.id}>
            <button
              type="button"
              className="record"
              aria-label={`Preview certificate: ${cert.title}`}
              onClick={() => open(cert.id)}
              ref={(el) => {
                triggers.current[cert.id] = el;
              }}
            >
              <span className="record-thumb">
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="record-body">
                <span className="record-title">{cert.title}</span>
                <span className="record-issuer">{cert.issuer}</span>
                <span className="record-meta">
                  {cert.date} · {cert.category}
                </span>
              </span>
              <span className="record-date">{cert.date}</span>
              <span className="record-category">{cert.category}</span>
            </button>
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
