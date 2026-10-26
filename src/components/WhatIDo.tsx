import "./styles/WhatIDo.css";

const capabilities = [
  {
    title: "Develop",
    description:
      "Building responsive, performant, and interactive web experiences leveraging modern frontend frameworks, 3D graphics, and fluid animations.",
    tools: [
      "JavaScript",
      "TypeScript",
      "Three.js",
      "React",
      "CSS",
      "Node.js",
      "Next.js",
      "Express.js",
      "PHP",
      "MySQL",
    ],
  },
  {
    title: "Design",
    description:
      "Crafting modern, intuitive user interfaces, digital identities, and interactive 3D visuals that deliver memorable digital experiences.",
    tools: [
      "Blender",
      "Zbrush",
      "UI Design",
      "Motion",
      "Rigging",
      "3D Animation",
      "Character Design",
      "Modelling",
    ],
  },
];

const WhatIDo = () => {
  return (
    <div className="whatIDO">
      <div className="what-box">
        <div className="what-head">
          <span className="u-label">03 — What I do</span>
          <h2 className="title">Capabilities</h2>
        </div>
      </div>

      <div className="what-box">
        <div className="what-box-in">
          {capabilities.map((cap) => (
            <article className="cap" key={cap.title}>
              <h3 className="cap-title">{cap.title}</h3>
              <p className="cap-desc">{cap.description}</p>
              <ul className="cap-tools">
                {cap.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;