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

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <span className="navbar-mark">RBH</span>
          <span className="navbar-title-text">
            <span className="navbar-name">Raditya Bagus Hardana</span>
            <span className="navbar-role">Design Engineer</span>
          </span>
        </a>

        <div className="navbar-status">
          <span className="navbar-status-dot" />
          Jakarta · GMT+7
        </div>

        <ul>
          <li>
            <a data-href="#about" href="#about">
              <span className="navbar-idx">01</span>
              <HoverLinks text="About" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <span className="navbar-idx">02</span>
              <HoverLinks text="Work" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <span className="navbar-idx">03</span>
              <HoverLinks text="Contact" />
            </a>
          </li>
        </ul>
      </div>

      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
