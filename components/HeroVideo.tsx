"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  const { scrollY } = useScroll();
  // Fade out between 0 and 700px of scroll
  const opacity = useTransform(scrollY, [0, 700], [0.25, 0]);

  // Keep track of scroll to disable rendering when off-screen for performance
  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 1000) {
        if (shouldRender) setShouldRender(false);
      } else {
        if (!shouldRender) setShouldRender(true);
      }
    });
  }, [scrollY, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div style={{ opacity }} className="h-full w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setIsLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ filter: "brightness(0.35) contrast(1.1) blur(4px)" }}
        >
          <source src="/Create_a_seamless_looping_se.mp4" type="video/mp4" />
        </video>
      </motion.div>
      {/* Dark overlay gradients for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]" />
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, #050505 100%)" />
    </div>
  );
}
