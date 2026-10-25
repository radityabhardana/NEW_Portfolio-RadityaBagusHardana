import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <div className="about-eyebrow">
          <span className="u-label">02 — About</span>
          <span className="about-rule" />
          <span className="u-label">Jakarta, ID</span>
        </div>

        <h3 className="title">About Me</h3>

        <p className="para">
          I'm a creative developer & designer with a passion for blending
          technical expertise with creative edge. Driven by curiosity, I always
          try to explore and learn new skills to build engaging, interactive
          digital experiences.
        </p>

        <dl className="about-facts">
          <div>
            <dt>Based</dt>
            <dd>Jakarta, Indonesia</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>Interface · Motion · 3D</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>Open for select work</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default About;
