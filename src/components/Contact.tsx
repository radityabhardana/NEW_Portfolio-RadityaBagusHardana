import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <div className="contact-eyebrow">
          <span className="u-label">08 — Kontak</span>
          <span className="contact-rule" />
          <span className="u-label">Bogor, Indonesia</span>
        </div>

        <h3>
          Mari wujudkan <em>sesuatu</em>.
        </h3>

        <a
          className="contact-email"
          href="mailto:raditya.bhardana@gmail.com"
          data-cursor="disable"
        >
          <span>raditya.bhardana@gmail.com</span>
          <MdArrowOutward />
        </a>

        <div className="contact-meta">
          <div className="contact-col">
            <span className="u-label">Dokumen</span>
            <div className="contact-socials">
              <a
                href="/Raditya-Bagus-Hardana-CV.pdf"
                download="CV-Raditya-Bagus-Hardana.pdf"
                data-cursor="disable"
                className="contact-social"
              >
                Unduh CV (PDF) <MdArrowOutward />
              </a>
            </div>
          </div>

          <div className="contact-col">
            <span className="u-label">Media Sosial</span>
            <div className="contact-socials">
              <a
                href="https://github.com/radityabhardana"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                GitHub <MdArrowOutward />
              </a>
              <a
                href="https://www.linkedin.com/in/raditya-hardana-962373382/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                LinkedIn <MdArrowOutward />
              </a>
              <a
                href="https://www.instagram.com/zxlyn_16/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                Instagram <MdArrowOutward />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-foot">
          <h5>
            <MdCopyright /> 2026 Raditya Bagus Hardana
          </h5>
          <span>Dirancang &amp; dikembangkan di Bogor, Indonesia</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
