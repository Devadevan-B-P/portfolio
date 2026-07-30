"use client";

import { useState, useEffect } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EngineeringJourney from "@/components/EngineeringJourney";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(hash);
          } else {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        }, 300);
      }
    }
  }, [isLoading]);

  return (
    <SmoothScroll>
      <PageLoader onComplete={() => setIsLoading(false)} />
      <div className="noise-layer" />
      <Navbar />
      <main className="relative z-10">
        <Hero startAnimation={!isLoading} />
        <div id="journey">
          <EngineeringJourney />
        </div>
      </main>
    </SmoothScroll>
  );
}
