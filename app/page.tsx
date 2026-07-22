"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EngineeringJourney from "@/components/EngineeringJourney";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SmoothScroll>
      <CustomCursor />
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
