import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import "./styles/SocialIcons.css";

const CV_URL = "/Raditya-Bagus-Hardana-CV.pdf";

const socials = [
  { name: "GitHub", href: "https://github.com/radityabhardana", Icon: FaGithub },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/raditya-hardana-962373382/",
    Icon: FaLinkedinIn,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/zxlyn_16/",
    Icon: FaInstagram,
  },
];

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <nav className="social-rail" id="social" aria-label="Media Sosial">
        <span className="social-rail-label">Sosial</span>
        <span className="social-rail-divider" aria-hidden="true" />
        <ul className="social-list">
          {socials.map(({ name, href, Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                data-cursor="disable"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a
        className="resume-button"
        href={CV_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="disable"
      >
        <span className="resume-label">Lihat CV</span>
        <span className="resume-icon">
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
