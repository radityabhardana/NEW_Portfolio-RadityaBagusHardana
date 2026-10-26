import { IconType } from "react-icons";
import {
  SiBlockchaindotcom,
  SiBootstrap,
  SiGit,
  SiGodotengine,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiSqlite,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import "./styles/TechStack.css";

interface Tool {
  name: string;
  kind: string;
  Icon: IconType;
  color: string;
}

const tools: Tool[] = [
  { name: "React", kind: "Pengembangan Web · Pustaka UI", Icon: SiReact, color: "#61dafb" },
  { name: "Next.js", kind: "Pengembangan Web · Kerangka Kerja", Icon: SiNextdotjs, color: "#f4f1ea" },
  { name: "TypeScript", kind: "Pengembangan Web · Bahasa", Icon: SiTypescript, color: "#3178c6" },
  { name: "JavaScript", kind: "Pengembangan Web · Bahasa", Icon: SiJavascript, color: "#f7df1e" },
  { name: "Three.js", kind: "Grafika WebGL · 3D Interaktif", Icon: SiThreedotjs, color: "#f4f1ea" },
  { name: "PHP", kind: "Web Fullstack · Backend", Icon: SiPhp, color: "#777bb4" },
  { name: "MySQL", kind: "Basis Data · Relasional", Icon: SiMysql, color: "#4479a1" },
  { name: "SQLite", kind: "Basis Data · Ringan", Icon: SiSqlite, color: "#58b4e6" },
  { name: "Tailwind CSS", kind: "Pengembangan Web · Tata Gaya", Icon: SiTailwindcss, color: "#06b6d4" },
  { name: "Bootstrap", kind: "Pengembangan Web · Kerangka UI", Icon: SiBootstrap, color: "#7952b3" },
  { name: "Python", kind: "Bahasa · Otomasi & Skrip", Icon: SiPython, color: "#3776ab" },
  { name: "Blockchain", kind: "Sistem Terdesentralisasi · Node", Icon: SiBlockchaindotcom, color: "#a996ff" },
  { name: "Godot Engine", kind: "Pengembangan Gim · Mesin 2D", Icon: SiGodotengine, color: "#478cbf" },
  { name: "Vite", kind: "Perangkat · Pembungkus Modul", Icon: SiVite, color: "#646cff" },
  { name: "Git", kind: "Perangkat · Kontrol Versi", Icon: SiGit, color: "#f1502f" },
];

const TechStack = () => {
  return (
    <div className="techstack">
      <div className="techstack-head">
        <div className="techstack-eyebrow">
          <span className="u-label">07 — Perangkat</span>
          <span className="techstack-rule" />
          <span className="u-label">Web · Basis Data · AI · Blockchain</span>
        </div>
        <h2>
          Teknologi <span>Andalan</span>
        </h2>
        <p className="techstack-note">
          Daftar bahasa pemrograman, pustaka, basis data, dan perangkat
          pengembangan yang saya gunakan dalam membangun proyek.
        </p>
      </div>

      <div className="tech-colhead" aria-hidden="true">
        <span>No.</span>
        <span>Teknologi</span>
        <span>Kategori</span>
      </div>

      <ul className="tech-index">
        {tools.map(({ name, kind, Icon, color }, index) => (
          <li className="tech-item" key={name}>
            <span className="tech-num">{String(index + 1).padStart(2, "0")}</span>
            <span className="tech-tool">
              <span className="tech-mark" aria-hidden="true">
                <Icon style={{ color }} />
              </span>
              <span className="tech-name">{name}</span>
            </span>
            <span className="tech-kind">{kind}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechStack;
