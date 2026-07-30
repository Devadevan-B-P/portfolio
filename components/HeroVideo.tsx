"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  // Fade out between 0 and 500px of scroll
  const opacity = useTransform(scrollY, [0, 500], [0.35, 0]);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for mobile screens on mount and window resize
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Keep track of scroll to disable rendering when off-screen for performance
  useEffect(() => {
    if (isMobile) return;

    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 1000) {
        setShouldRender(false);
      } else {
        setShouldRender(true);
      }
    });
    return () => unsubscribe();
  }, [scrollY, isMobile]);

  if (isMobile) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#000000]"
        aria-hidden="true"
      >
        {/* Dark overlay gradients for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/40 to-[#000000]" />
        <div 
          className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle at center, transparent 30%, #000000 100%)" }}
        />
      </div>
    );
  }

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#000000]"
      aria-hidden="true"
    >
      <motion.div style={{ opacity }} className="h-full w-full">
        {mounted && (
          <video
            autoPlay
            loop
            muted
            playsInline
            onCanPlayThrough={() => setIsLoaded(true)}
            className={`h-full w-full object-cover transition-opacity duration-1000 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ filter: "brightness(0.3) contrast(1.15) blur(2px)" }}
          >
            <source src="/Create_a_seamless_looping_se.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>
      {/* Dark overlay gradients for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/30 to-[#000000]" />
      <div 
        className="absolute inset-0"
        style={{ backgroundImage: "radial-gradient(circle at center, transparent 20%, #000000 100%)" }}
      />
    </div>
  );
}

