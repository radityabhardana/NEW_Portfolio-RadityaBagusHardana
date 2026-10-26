import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.matchMedia("(pointer: coarse)").matches) return;

    let hover = false;
    let rafId = 0;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    const setX = gsap.quickSetter(cursor, "x", "px");
    const setY = gsap.quickSetter(cursor, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      cursor.style.opacity = "1";
    };

    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        setX(cursorPos.x);
        setY(cursorPos.y);
      }
      rafId = requestAnimationFrame(loop);
    };

    const onMouseOver = (e: MouseEvent) => {
      const element = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      if (!element) return;
      if (e.relatedTarget instanceof Node && element.contains(e.relatedTarget)) {
        return;
      }
      const rect = element.getBoundingClientRect();

      if (element.dataset.cursor === "icons") {
        cursor.classList.add("cursor-icons");
        gsap.to(cursor, {
          x: rect.left,
          y: rect.top,
          duration: 0.1,
          overwrite: "auto",
        });
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }
      if (element.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const element = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      if (!element) return;
      if (e.relatedTarget instanceof Node && element.contains(e.relatedTarget)) {
        return;
      }
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
