import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import CommandPalette from "./CommandPalette";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

// Sections that own an id on the page. Shared with the command palette.
export const NAV_SECTIONS = [
  { id: "#landingDiv", label: "Landing" },
  { id: "#about", label: "About" },
  { id: "#certificates", label: "Records" },
  { id: "#work", label: "Work" },
  { id: "#contact", label: "Contact" },
] as const;

const Navbar = () => {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(false);
    ScrollTrigger.refresh();

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const current = e.currentTarget as HTMLAnchorElement;
          const section = current.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });

    const onResize = () => ScrollSmoother.refresh(true);
    window.addEventListener("resize", onResize);

    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <span className="navbar-name">Raditya Bagus Hardana</span>
          <span className="navbar-role">Design Engineer</span>
        </a>

        <div className="ws-right">
          <ul>
            <li>
              <a data-href="#about" href="#about">
                <HoverLinks text="About" />
              </a>
            </li>
            <li>
              <a data-href="#work" href="#work">
                <HoverLinks text="Work" />
              </a>
            </li>
            <li>
              <a data-href="#contact" href="#contact">
                <HoverLinks text="Contact" />
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="ws-command"
            onClick={() => setPaletteOpen(true)}
            data-cursor="disable"
            aria-label="Open command palette"
            aria-haspopup="dialog"
            aria-expanded={paletteOpen}
            aria-keyshortcuts="Meta+K Control+K"
          >
            <span className="ws-command-keys" aria-hidden="true">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </span>
          </button>
        </div>
      </div>

      <div className="nav-fade"></div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
};

export default Navbar;
