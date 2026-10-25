import "./styles/TechStack.css";

interface Tool {
  name: string;
  kind: string;
  image: string;
}

const tools: Tool[] = [
  { name: "React", kind: "UI Library", image: "/images/react2.webp" },
  { name: "Next.js", kind: "Framework", image: "/images/next2.webp" },
  { name: "TypeScript", kind: "Language", image: "/images/typescript.webp" },
  { name: "JavaScript", kind: "Language", image: "/images/javascript.webp" },
  { name: "Node.js", kind: "Runtime", image: "/images/node2.webp" },
  { name: "Express", kind: "Backend", image: "/images/express.webp" },
  { name: "MongoDB", kind: "Database", image: "/images/mongo.webp" },
  { name: "MySQL", kind: "Database", image: "/images/mysql.webp" },
];

const TechStack = () => {
  return (
    <div className="techstack">
      <div className="techstack-head">
        <div className="techstack-eyebrow">
          <span className="u-label">06 — Toolkit</span>
          <span className="techstack-rule" />
        </div>
        <h2>
          My <span>Techstack</span>
        </h2>
        <p className="techstack-note">
          A working index of the languages, libraries and runtimes behind the
          build.
        </p>
      </div>

      <div className="tech-colhead" aria-hidden="true">
        <span>Index</span>
        <span>Tool</span>
        <span>Category</span>
      </div>

      <ul className="tech-index">
        {tools.map((tool, index) => (
          <li className="tech-item" key={tool.name}>
            <span className="tech-num">{String(index + 1).padStart(2, "0")}</span>
            <span className="tech-tool">
              <span className="tech-mark">
                <img src={tool.image} alt="" loading="lazy" />
              </span>
              <span className="tech-name">{tool.name}</span>
            </span>
            <span className="tech-kind">{tool.kind}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechStack;
