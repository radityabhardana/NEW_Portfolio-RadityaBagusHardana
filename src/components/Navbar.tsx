import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: isCoarsePointer ? 0 : 1.7,
      speed: isCoarsePointer ? 1 : 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(false);
    ScrollTrigger.refresh();

    const links = document.querySelectorAll<HTMLAnchorElement>(".header ul a");
    const onLinkClick = (e: MouseEvent) => {
      e.preventDefault();
      const elem = e.currentTarget as HTMLAnchorElement;
      const section = elem.getAttribute("data-href");
      if (!section) return;
      const isPinnedWork =
        section === "#work" && !document.querySelector(".work-section.is-empty");
      const offset = isPinnedWork ? "top top" : "top 72px";
      smoother.scrollTo(section, true, offset);
    };
    links.forEach((element) => {
      element.addEventListener("click", onLinkClick);
    });
    const onResize = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", onResize);

    return () => {
      links.forEach((element) => {
        element.removeEventListener("click", onLinkClick);
      });
      window.removeEventListener("resize", onResize);
      smoother.kill();
    };
  }, []);

  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (smoother) {
      e.preventDefault();
      smoother.scrollTo(0, true);
    }
  };

  return (
    <>
      <div className="header">
        <a
          href="/#"
          className="navbar-status"
          onClick={handleScrollTop}
          data-cursor="disable"
          aria-label="Kembali ke atas"
        >
          <span className="navbar-status-dot" />
          Bogor · WIB
        </a>

        <ul>
          <li>
            <a data-href="#about" href="#about">
              <span className="navbar-idx">01</span>
              <HoverLinks text="Tentang" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <span className="navbar-idx">02</span>
              <HoverLinks text="Karya" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <span className="navbar-idx">03</span>
              <HoverLinks text="Kontak" />
            </a>
          </li>
        </ul>
      </div>

      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
