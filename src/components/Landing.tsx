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

        <div className="landing-intro">
          <h2 className="landing-kicker">Portofolio — Bogor, ID</h2>
          <h1 className="landing-name">
            <span>Raditya</span>
            <span className="landing-name-2">Bagus Hardana</span>
          </h1>
          <p className="landing-lede">
            Berbekal 2 tahun pengalaman membangun aplikasi web modern, sistem
            basis data, serta solusi berbasis AI dan teknologi blockchain.
          </p>
        </div>

        <div className="landing-info">
          <div className="landing-role-wrap">
            <span className="landing-label">Peran</span>
            <h3 className="landing-role">Software Engineer</h3>
          </div>

          <dl className="landing-spec">
            <div className="landing-spec-row">
              <dt>Fokus</dt>
              <dd>Web · AI · Blockchain</dd>
            </div>
            <div className="landing-spec-row">
              <dt>Domisili</dt>
              <dd>Bogor, Indonesia</dd>
            </div>
          </dl>

          <div className="landing-status">
            <span className="landing-dot" />
            Siap bekerja
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Landing;
