"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

let hasLoadedGlobal = false;

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(hasLoadedGlobal ? 100 : 0);
  const [isDone, setIsDone] = useState(hasLoadedGlobal);

  useEffect(() => {
    if (hasLoadedGlobal) {
      onComplete();
      return;
    }

    // 1. Lock scrolling on body and Lenis
    document.body.style.overflow = "hidden";
    if ((window as any).lenis) {
      (window as any).lenis.stop();
    }

    // 2. High-performance requestAnimationFrame animate from 0 to 100
    const controls = animate(0, 100, {
      duration: 2.2,
      ease: [0.25, 1, 0.5, 1], // Cubic-bezier OutQuart for clean deceleration deceleration
      onUpdate: (value) => {
        setProgress(Math.floor(value));
      },
      onComplete: () => {
        hasLoadedGlobal = true;
        setTimeout(() => {
          setIsDone(true);
          // 3. Unlock scroll actions on completion
          document.body.style.overflow = "";
          if ((window as any).lenis) {
            (window as any).lenis.start();
          }
          setTimeout(onComplete, 850); // Delay calling completion until slide exit finishes
        }, 400);
      }
    });

    return () => {
      controls.stop();
      document.body.style.overflow = "";
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }} // Heavy cubic-bezier split slide-up
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] select-none"
        >
          {/* Subtle noise grid overlay */}
          <div className="absolute inset-0 noise-layer opacity-[0.015]" />

          <div className="w-64 flex flex-col items-stretch gap-4 relative">
            {/* Header label */}
            <div className="flex justify-between text-[8px] uppercase tracking-[0.25em] text-text-secondary font-mono mono-tag">
              <span>DEVADEVAN B P</span>
              <span className="text-accent animate-pulse">BOOTING</span>
            </div>

            {/* Main percentage count */}
            <div className="text-center font-display font-semibold text-white tracking-tighter text-4xl py-2 relative flex items-baseline justify-center">
              <span className="text-5xl md:text-6xl tabular-nums font-bold">
                {progress.toString().padStart(3, "0")}
              </span>
              <span className="text-xs text-accent font-mono mono-tag ml-1">%</span>
            </div>

            {/* Precise loading bar */}
            <div className="h-[1px] w-full bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-accent shadow-[0_0_8px_#4f8cff]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Bottom status metadata */}
            <div className="flex justify-between text-[8px] uppercase tracking-[0.2em] text-text-muted font-mono mono-tag">
              <span>SYS_INGEST: ACTIVE</span>
              <span>STABLE_v1.0</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
