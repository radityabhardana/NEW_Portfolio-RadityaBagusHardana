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
        <span className="u-label techstack-eyebrow">07 — Toolkit</span>
        <h2>My Techstack</h2>
      </div>

      <ul className="tech-index">
        {tools.map((tool) => (
          <li className="tech-item" key={tool.name}>
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