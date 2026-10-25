import "./styles/WhatIDo.css";

const capabilities = [
  {
    index: "01",
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
    index: "02",
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
          <h2 className="title">
            W<span className="hat-h2">HAT</span>
            <div>
              I<span className="do-h2"> DO</span>
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
                <span className="u-label">Toolkit</span>
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
