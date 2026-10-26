import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <span className="u-label contact-eyebrow">08 — Contact</span>

        <h3>Let&rsquo;s build something.</h3>

        <a
          className="contact-email"
          href="mailto:raditya.hardana@gmail.com"
          data-cursor="disable"
        >
          <span>raditya.hardana@gmail.com</span>
          <MdArrowOutward />
        </a>

        <div className="contact-meta">
          <div className="contact-col">
            <span className="u-label">Direct</span>
            <a href="tel:+628123456789" data-cursor="disable">
              +62 812 3456 7890
            </a>
          </div>

          <div className="contact-col">
            <span className="u-label">Elsewhere</span>
            <div className="contact-socials">
              <a
                href="https://github.com/radityabhardana"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Github <MdArrowOutward />
              </a>
              <a
                href="https://www.linkedin.com/in/raditya-hardana-962373382/"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Linkedin <MdArrowOutward />
              </a>
              <a
                href="https://www.instagram.com/zxlyn_16/"
                target="_blank"
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
          <span>Designed &amp; developed in Jakarta</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;