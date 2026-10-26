import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import "./styles/SocialIcons.css";

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

// Bottom dock: social links + resume, held in the shell instead of a floating
// left rail. The wrapper is a pass-through layer; only the dock is interactive.
const SocialIcons = () => {
  return (
    <div className="icons-section">
      <nav
        className="social-dock"
        id="social"
        data-cursor="icons"
        aria-label="Elsewhere"
      >
        <ul className="social-list">
          {socials.map(({ name, href, Icon }) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noreferrer" aria-label={name}>
                <Icon />
              </a>
            </li>
          ))}
        </ul>

        <a className="resume-button" href="#" data-cursor="disable">
          <span className="resume-label">Resume</span>
          <TbNotes className="resume-icon" />
        </a>
      </nav>
    </div>
  );
};

export default SocialIcons;
