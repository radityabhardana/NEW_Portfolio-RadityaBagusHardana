import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <span className="landing-frame" aria-hidden="true" />

        <div className="landing-lane">
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
            <h3 className="landing-role">Design Engineer</h3>

            <dl className="landing-spec">
              <div className="landing-spec-row">
                <dt>Focus</dt>
                <dd>Interface · Motion · 3D</dd>
              </div>
              <div className="landing-spec-row">
                <dt>Status</dt>
                <dd>Open for select work</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Landing;