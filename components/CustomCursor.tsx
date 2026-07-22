"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isFinePointer || prefersReducedMotion) return;
    
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    let ringX = 0;
    let ringY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let currentScale = 1;
    let targetScale = 1;
    let isHovered = false;
    let raf: number;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest(
        'a, button, input, select, textarea, [role="button"], [data-cursor-hover]'
      );
      if (interactive) {
        isHovered = true;
        targetScale = 1.75;
        ringRef.current?.classList.add("cursor-ring--hover");
      }
    }

    function onMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement;
      const leaving = target?.closest(
        'a, button, input, select, textarea, [role="button"], [data-cursor-hover]'
      );
      const entering = related?.closest(
        'a, button, input, select, textarea, [role="button"], [data-cursor-hover]'
      );
      if (leaving && !entering) {
        isHovered = false;
        targetScale = 1.0;
        ringRef.current?.classList.remove("cursor-ring--hover");
      }
    }

    function onDown() {
      targetScale = 0.65;
    }

    function onUp() {
      targetScale = isHovered ? 1.75 : 1.0;
    }

    function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      currentScale += (targetScale - currentScale) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${currentScale})`;
      }
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 transition-[border-color,background-color] duration-300 ease-out"
      />
    </>
  );
}
