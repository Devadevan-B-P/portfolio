"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { profile } from "@/lib/data";
import HeroVideo from "./HeroVideo";
import SpotlightCard from "./SpotlightCard";

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function Hero({ startAnimation = true }: { startAnimation?: boolean }) {
  const { scrollY } = useScroll();
  
  // Dissolve effect on scroll: fade out and slide up slightly
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, -40]);

  const headingWords = profile.headline.split(" ");

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-32 md:px-12 bg-[#050505]"
    >
      {/* Background loop video fades out on scroll */}
      <HeroVideo />

      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="mono-tag text-xs uppercase tracking-[0.25em] text-text-secondary">
            {profile.name} · {profile.role}
          </span>
        </motion.div>

        {/* Large Cinematic Headline with blur-to-sharp fade in */}
        <h1 className="font-display font-bold leading-[1.0] tracking-tight text-white mb-6 select-none text-[36px] sm:text-[48px] md:text-[72px] lg:text-[90px] max-w-4xl text-center">
          {headingWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ filter: "blur(12px)", opacity: 0, y: 30 }}
              animate={startAnimation ? { filter: "blur(0px)", opacity: 1, y: 0 } : { filter: "blur(12px)", opacity: 0, y: 30 }}
              transition={{ duration: 1.1, ease, delay: 0.2 + i * 0.12 }}
              className="inline-block mx-2 text-gradient"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, ease, delay: 1.0 }}
          className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-text-secondary md:text-base text-center"
        >
          {profile.summary}
        </motion.p>

        {/* Action button with cursor spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, ease, delay: 1.2 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-4"
        >
          <a
            href="#journey"
            onClick={(e) => handleScroll(e, "#journey")}
            className="group relative focus-visible:outline-none"
          >
            <SpotlightCard className="rounded-pill border border-border-subtle bg-white/[0.01] px-8 py-4 font-body text-xs uppercase tracking-wider font-semibold text-white transition-all duration-300 hover:border-accent/40 shadow-glow">
              <span className="flex items-center gap-2">
                Enter Journey
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
            </SpotlightCard>
          </a>
        </motion.div>
      </motion.div>

      {/* Decorative corners HUD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={startAnimation ? { opacity: 0.4 } : { opacity: 0 }}
        transition={{ duration: 1, ease, delay: 1.4 }}
        className="pointer-events-none absolute bottom-12 right-6 hidden md:block md:right-12"
      >
        <div className="relative h-20 w-44 rounded-md border border-white/5 bg-white/[0.01] backdrop-blur-sm">
          <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-accent" />
          <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-accent" />
          <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-accent" />
          <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-accent" />
          <div className="mono-tag absolute left-3 top-2.5 text-[8px] uppercase tracking-wider text-accent">
            ENG_CANVAS: ACTIVE
          </div>
          <div className="mono-tag absolute bottom-2.5 right-3 text-[8px] tracking-wider text-text-muted">
            {profile.location}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
