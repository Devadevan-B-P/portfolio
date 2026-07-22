import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EngineeringJourney from "@/components/EngineeringJourney";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <div className="noise-layer" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div id="journey">
          <EngineeringJourney />
        </div>
      </main>
    </SmoothScroll>
  );
}
