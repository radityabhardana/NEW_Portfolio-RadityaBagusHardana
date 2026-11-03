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
  description: string;
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

// Data proyek diambil dari repo GitHub pemilik (README + bahasa repo).
// Kartu terakhir (link GitHub) dirender statis di bawah.
const workItems: WorkItem[] = [
  {
    title: "Inventaris",
    category: "Sistem Web",
    tools: "PHP · MySQL · JavaScript",
    description:
      "Sistem inventaris berbasis PHP dan MySQL: login multi-peran, pencatatan barang masuk dan keluar, scan barcode, grafik stok, notifikasi, dan ekspor laporan.",
    image: "/project/mockup-inventory.webp",
    alt: "Tampilan proyek Inventaris di dalam mockup laptop",
    link: "https://github.com/radityabhardana/Inventory-System",
  },
  {
    title: "Personal Portfolio",
    category: "Situs Pribadi",
    tools: "React · TypeScript · Three.js · GSAP",
    description:
      "Situs portofolio 3D: potret WebGL Three.js dengan pencahayaan HDRI, koreografi gulir GSAP ScrollTrigger, dan arsip sertifikat dengan lightbox.",
    image: "/project/mockup-personalportfolio.webp",
    alt: "Tampilan proyek Personal Portfolio di dalam mockup laptop",
    link: "https://github.com/radityabhardana/NEW_Portfolio-RadityaBagusHardana",
  },
  {
    title: "Ragdoll Fighting Championship",
    category: "Game 3D",
    tools: "Three.js · Cannon-es · JavaScript",
    description:
      "Game tempur 3D di browser: ragdoll aktif berbasis fisika Cannon-es, sistem striking biomekanik, stamina dua lapis, dan AI sparring dengan empat karakter.",
    image: "/project/mockup-ragdollfightingchampionship.webp",
    alt: "Tampilan proyek Ragdoll Fighting Championship di dalam mockup laptop",
    link: "https://github.com/radityabhardana/RagdollFightingChampionship",
  },
  {
    title: "Spectre Motion",
    category: "Otomasi AI",
    tools: "Python · Whisper · OpenCV",
    description:
      "Pipeline otomasi yang memotong video panjang jadi klip vertikal 9:16: transkripsi Whisper, deteksi momen viral lewat LLM, pelacakan wajah, dan subtitle karaoke.",
    image: "/project/mockup-spectremotion.webp",
    alt: "Tampilan proyek Spectre Motion di dalam mockup laptop",
    link: "https://github.com/radityabhardana/SpectreMotion",
  },
];

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

      // jarak tahan setelah kartu terakhir mentok: reel berhenti bergeser,
      // tapi section masih terpin selama HOLD px supaya kartu GitHub sempat dibaca.
      const HOLD = 1360;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => {
            const amount = getScrollAmount();
            return `+=${amount + (amount > 0 ? HOLD : 0)}`;
          },
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          id: "work",
        },
      });

      timeline.to(workFlex, {
        x: () => -getScrollAmount(),
        // geseran selesai lebih awal, sisa progress dipakai untuk diam di tempat
        ease: (t: number) => {
          const amount = getScrollAmount();
          if (amount <= 0) return 1;
          return Math.min(1, (t * (amount + HOLD)) / amount);
        },
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
          <h2 className="work-title">
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
                  <h3 className="work-name">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="disable"
                      >
                        {item.title}
                        <MdArrowOutward aria-hidden="true" />
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="work-desc">{item.description}</p>
                  <p className="work-tools">{item.tools}</p>
                </div>
              </div>
            ))}

            {/* Kartu penutup: tautan keluar ke GitHub. Statis, bukan dari workItems,
                tapi wajib tetap .work-box supaya getScrollAmount ikut menghitungnya. */}
            <a
              className="work-box work-box-more"
              href="https://github.com/radityabhardana"
              target="_blank"
              rel="noreferrer"
              aria-label="Lihat lebih banyak di GitHub"
              data-cursor="disable"
            >
              <span className="work-more" aria-hidden="true">
                <span className="work-more-plate">
                  <span className="work-more-top u-label">
                    Lanjutan
                    <MdArrowOutward className="work-more-arrow" />
                  </span>
                  <span className="work-more-word">GitHub</span>
                  <span className="work-more-url u-label">
                    github.com/radityabhardana
                  </span>
                </span>
                <span className="work-info">
                  <span className="work-head">
                    <span className="work-category u-label">Repositori</span>
                    <span className="work-index u-label">Eksternal</span>
                  </span>
                  <span className="work-name">Lihat lebih banyak di GitHub</span>
                  <span className="work-tools">
                    Kode dan eksperimen lain di luar daftar ini.
                  </span>
                </span>
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Work;
