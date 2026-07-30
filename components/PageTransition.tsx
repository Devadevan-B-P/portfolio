"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionContextType {
  triggerTransition: (href: string) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(null);

export const usePageTransition = () => {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used inside PageTransitionProvider");
  }
  return ctx;
};

import CustomCursor from "./CustomCursor";

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetHref, setTargetHref] = useState("");

  const triggerTransition = (href: string) => {
    if (href === pathname) return;
    setTargetHref(href);
    setIsTransitioning(true);
  };

  useEffect(() => {
    // When the path changes, close the transition curtain
    setIsTransitioning(false);
  }, [pathname]);

  const handleAnimationComplete = () => {
    if (isTransitioning && targetHref) {
      router.push(targetHref);
    }
  };

  return (
    <PageTransitionContext.Provider value={{ triggerTransition, isTransitioning }}>
      <CustomCursor />
      
      {/* Root Scale Zoom out effect during transition */}
      <motion.div
        animate={{
          scale: isTransitioning ? 0.95 : 1,
          opacity: isTransitioning ? 0.85 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen origin-center bg-black"
        style={!isTransitioning ? { transform: "none", filter: "none" } : undefined}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={handleAnimationComplete}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black overflow-hidden pointer-events-auto"
          >
            {/* Blueprint Grid Lines */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(79, 140, 255, 0.15) 1.5px, transparent 1.5px),
                  linear-gradient(90deg, rgba(79, 140, 255, 0.15) 1.5px, transparent 1.5px)
                `,
                backgroundSize: "36px 36px",
                backgroundPosition: "center",
              }}
            />

            {/* Cinematic HUD drawing elements */}
            <div className="relative w-[360px] h-[360px] flex items-center justify-center">
              {/* Expanding rotating technical dash circle */}
              <motion.div
                initial={{ rotate: 0, scale: 0.7, opacity: 0 }}
                animate={{ rotate: 180, scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-full border border-dashed border-accent/40"
              />

              {/* Inner double line circles */}
              <motion.div
                initial={{ rotate: 0, scale: 0.4, opacity: 0 }}
                animate={{ rotate: -180, scale: 0.9, opacity: 0.6 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-60 h-60 rounded-full border border-double border-accent/30"
              />

              {/* Center HUD crosshair path */}
              <svg className="w-72 h-72 overflow-visible" viewBox="0 0 100 100">
                <motion.path
                  d="M 50 5 V 95 M 5 50 H 95"
                  stroke="rgba(79, 140, 255, 0.6)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
                
                {/* Expanding technical box */}
                <motion.rect
                  x="44"
                  y="44"
                  width="12"
                  height="12"
                  stroke="#4f8cff"
                  strokeWidth="0.8"
                  fill="none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                />
              </svg>

              <div className="absolute font-mono text-[9px] text-accent uppercase tracking-[0.25em] animate-pulse">
                INITIALIZING BLUEPRINT SETUP...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
}
