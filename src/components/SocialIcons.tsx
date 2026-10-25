import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import "./styles/SocialIcons.css";

const socials = [
  { name: "GitHub", href: "https://github.com/AFDAlKURNIAWAN", Icon: FaGithub },
  { name: "LinkedIn", href: "https://www.linkedin.com", Icon: FaLinkedinIn },
  { name: "Twitter", href: "https://x.com", Icon: FaXTwitter },
  { name: "Instagram", href: "https://www.instagram.com", Icon: FaInstagram },
];

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <nav
        className="social-rail"
        id="social"
        data-cursor="icons"
        aria-label="Elsewhere"
      >
        <span className="social-rail-label">Elsewhere</span>
        <ul className="social-list">
          {socials.map(({ name, href, Icon }) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noreferrer" aria-label={name}>
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a className="resume-button" href="#" data-cursor="disable">
        <span className="resume-label">Resume</span>
        <span className="resume-icon">
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
