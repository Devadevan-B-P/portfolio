"use client";

import { useState, useEffect } from "react";
import { MotionValue } from "framer-motion";
import { chapters, ChapterId } from "./data";

export interface JourneyState {
  activeChapter: ChapterId;
  activeStep: number;
  progress: number;
  isDesktop: boolean;
}

export function useJourneyProgress(scrollYProgress: MotionValue<number>): JourneyState {
  const [activeChapter, setActiveChapter] = useState<ChapterId>("problem");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  // 1. Monitor viewport size responsively
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);
    
    const listener = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // 2. Track scroll progression and map it to chapters/sub-steps
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setProgress(latest);

      // Find which chapter corresponds to the current scroll level
      const matchingChapter = chapters.find(
        (ch) => latest >= ch.range[0] && latest <= ch.range[1]
      );

      if (matchingChapter) {
        setActiveChapter(matchingChapter.id);

        // Map sub-steps specifically for the Forge AI engine chapter
        if (matchingChapter.id === "engine") {
          const [start, end] = matchingChapter.range;
          const subProgress = (latest - start) / (end - start);
          
          // Divide 0 to 1 subProgress into 5 steps
          const stepIndex = Math.min(Math.floor(subProgress * 5), 4);
          setActiveStep(stepIndex);
        } else {
          setActiveStep(0);
        }
      }
    });
  }, [scrollYProgress]);

  return {
    activeChapter,
    activeStep,
    progress,
    isDesktop,
  };
}
