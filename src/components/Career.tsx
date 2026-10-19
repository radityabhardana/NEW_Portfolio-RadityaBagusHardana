import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend & Creative Developer</h4>
                <h5>Independent / Freelance</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Specializing in modern interactive web development, 3D animations,
              and visually immersive web applications using React, Three.js, and GSAP.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Digital Solutions</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Architected responsive web applications and full-stack solutions,
              integrating modern REST APIs, databases, and optimized frontend architecture.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Creative Tech & UI Engineer</h4>
                <h5>Freelance & Open Source</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Designing and building cutting-edge web interfaces, experimenting with
              WebGL, shaders, interactive 3D graphics, and responsive UI systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
