import "./styles/WhatIDo.css";

const capabilities = [
  {
    index: "01",
    title: "Pengembangan Web & Perangkat Lunak",
    description:
      "Membangun aplikasi web responsif, perangkat lunak desktop, serta pengelolaan basis data relasional untuk kebutuhan operasional dan produk nyata.",
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "PHP",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "MySQL",
      "SQLite",
      "Three.js",
      "Python",
    ],
  },
  {
    index: "02",
    title: "Otomasi AI, Blockchain & Interaktif",
    description:
      "Mengoptimalkan pengembangan perangkat lunak dengan agen AI, mengeksplorasi arsitektur & infrastruktur node blockchain, serta merancang antarmuka interaktif 2D/3D.",
    tools: [
      "Blockchain",
      "Infrastruktur Node",
      "Alur Agen AI",
      "Otomasi AI",
      "Integrasi API",
      "Git & GitHub",
      "Vite",
      "Godot Engine",
      "Desain UI/UX",
      "Figma",
      "GSAP",
    ],
  },
];

const WhatIDo = () => {
  return (
    <div className="whatIDO">
      <div className="what-box">
        <div className="what-head">
          <span className="u-label">03 — Keahlian</span>
          <h2 className="title">
            B<span className="hat-h2">IDANG</span>
            <div>
              F<span className="do-h2">OKUS</span>
            </div>
          </h2>
        </div>
      </div>

      <div className="what-box">
        <div className="what-box-in">
          {capabilities.map((cap) => (
            <article className="cap" key={cap.title}>
              <header className="cap-head">
                <span className="cap-index u-label">{cap.index}</span>
                <h3 className="cap-title">{cap.title}</h3>
              </header>
              <p className="cap-desc">{cap.description}</p>
              <div className="cap-tools">
                <span className="u-label">Teknologi</span>
                <ul>
                  {cap.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
