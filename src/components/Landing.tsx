import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-grid" aria-hidden="true">
          <span className="landing-grid-line" />
          <span className="landing-grid-line" />
        </div>

        <div className="landing-frame" aria-hidden="true">
          <span className="landing-frame-top">
            <span className="landing-frame-dash" />
            Specimen — 001
            <span className="landing-frame-dash" />
          </span>
          <span className="landing-frame-spine" />
          <span className="landing-frame-bottom">
            <span className="landing-frame-dash" />
            R.B.H / WebGL subject
          </span>
        </div>

        <div className="landing-intro">
          <h2 className="landing-kicker">Portfolio — Jakarta, ID</h2>
          <h1 className="landing-name">
            <span>Raditya</span>
            <span className="landing-name-2">Bagus Hardana</span>
          </h1>
          <p className="landing-lede">
            Creative developer working across interface, motion and real-time
            3D — building considered products with an editorial eye.
          </p>
        </div>

        <div className="landing-info">
          <div className="landing-role-wrap">
            <span className="landing-label">Rôle</span>
            <h3 className="landing-role">Design Engineer</h3>
          </div>

          <dl className="landing-spec">
            <div className="landing-spec-row">
              <dt>Focus</dt>
              <dd>Interface · Motion · 3D</dd>
            </div>
            <div className="landing-spec-row">
              <dt>Based</dt>
              <dd>Jakarta, Indonesia</dd>
            </div>
          </dl>

          <div className="landing-status">
            <span className="landing-dot" />
            Open for select work
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Landing;
