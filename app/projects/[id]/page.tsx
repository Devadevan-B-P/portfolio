"use client";

import React, { use, useState } from "react";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import SpotlightCard from "@/components/SpotlightCard";
import { projects } from "@/lib/data";
import { usePageTransition } from "@/components/PageTransition";
import { ArrowLeft, Github, Globe, Terminal, ShieldAlert } from "lucide-react";

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { triggerTransition } = usePageTransition();
  const project = projects.find((p) => p.id === id);
  const [activeSlide, setActiveSlide] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-mono">
        <span className="text-red-500 mb-2">⚡ ERROR 404: PROJECT_NOT_FOUND</span>
        <button 
          onClick={() => triggerTransition("/engineering-archive")}
          className="text-accent underline text-xs uppercase"
        >
          Return to Archive
        </button>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <Navbar />
      <div className="noise-layer" />

      <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
        {/* HUD Subpage Header */}
        <div className="max-w-6xl mx-auto mb-12">
          <button
            onClick={() => triggerTransition("/engineering-archive")}
            className="group flex items-center gap-2 text-text-muted hover:text-white font-mono text-[10px] uppercase tracking-wider mb-6 transition-colors focus-visible:outline-none"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" /> Back to Archive
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-2 block">
                Project {project.index} // Case Study
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                {project.title}
              </h1>
              <p className="font-display text-base text-text-secondary">
                {project.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 md:mt-0">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-5 py-2.5 rounded-pill text-xs font-semibold text-text-secondary hover:text-white transition-colors flex items-center gap-2"
              >
                <Github className="h-4 w-4" /> Repository
              </a>
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-5 py-2.5 rounded-pill text-xs font-semibold text-accent hover:text-white transition-colors flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" /> Live Demo
                </a>
              )}
            </div>
          </div>
          <div className="h-[1px] bg-white/5 w-full mt-8" />
        </div>

        {/* Dynamic Project Details Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Column Left (Col-Span 7): Narrative Content */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Overview */}
            <section className="space-y-4">
              <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                Overview
              </h2>
              <p className="font-body text-sm leading-relaxed text-text-secondary">
                {project.overview}
              </p>
            </section>

            {/* Problem Statements */}
            <section className="space-y-4 border-t border-white/5 pt-8">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-red-500" />
                <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                  The Problem
                </h2>
              </div>
              <p className="font-body text-sm leading-relaxed text-text-secondary">
                {project.problem}
              </p>
            </section>

            {/* Architectural Solution */}
            <section className="space-y-4 border-t border-white/5 pt-8">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-accent" />
                <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                  The Solution
                </h2>
              </div>
              <p className="font-body text-sm leading-relaxed text-text-secondary">
                {project.solution}
              </p>
            </section>

            {/* Engineering Challenges */}
            <section className="space-y-4 border-t border-white/5 pt-8">
              <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                Engineering Challenges
              </h2>
              <p className="font-body text-sm leading-relaxed text-text-secondary">
                {project.challenges}
              </p>
            </section>

            {/* Tradeoffs Analysis */}
            <section className="space-y-4 border-t border-white/5 pt-8">
              <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                Architectural Tradeoffs
              </h2>
              <p className="font-body text-sm leading-relaxed text-text-secondary">
                {project.tradeoffs}
              </p>
            </section>

            {/* Key Lessons Learned */}
            <section className="space-y-4 border-t border-white/5 pt-8">
              <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                Lessons Learned
              </h2>
              <p className="font-body text-sm leading-relaxed text-text-secondary">
                {project.lessonsLearned}
              </p>
            </section>
          </div>

          {/* Column Right (Col-Span 5): System Specs & Diagrams */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Tech Stack */}
            <SpotlightCard className="p-6 border border-white/5 bg-white/[0.005]">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
                System Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span key={tag} className="mono-tag text-[9px] border border-white/10 rounded-pill px-3 py-1 text-text-secondary bg-white/[0.02]">
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>

            {/* Interactive Architecture Diagram */}
            <SpotlightCard className="p-6 border border-white/5 bg-white/[0.005]">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
                Architecture Flow Diagram
              </h3>
              <div className="flex items-center justify-center p-4 border border-white/5 rounded-md bg-black/40 h-56 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-grid-lines pointer-events-none" />
                <ProjectArchitectureSVG type={project.architectureDiagramType} />
              </div>
            </SpotlightCard>

            {/* Repository Folder Tree */}
            <SpotlightCard className="p-6 border border-white/5 bg-white/[0.005]">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
                Workspace Folder Layout
              </h3>
              <pre className="font-mono text-[9px] text-text-secondary leading-normal bg-black/40 border border-white/5 p-4 rounded h-56 overflow-y-auto">
                {project.folderStructure}
              </pre>
            </SpotlightCard>

            {/* AWS/Local Deployment Sequence */}
            <SpotlightCard className="p-6 border border-white/5 bg-white/[0.005]">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
                DevOps Deployment Sequence
              </h3>
              <div className="space-y-3 font-mono text-[9px] text-text-secondary leading-relaxed">
                {project.deployment.map((step, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-accent font-bold">[{idx + 1}]</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>

            {/* Gallery Slide Mockups */}
            <SpotlightCard className="p-6 border border-white/5 bg-white/[0.005]">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
                Operational Gallery
              </h3>
              <div className="relative h-44 w-full border border-white/5 bg-black/60 rounded overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <Terminal className="h-6 w-6 text-accent mb-2" />
                  <div className="text-[10px] text-white uppercase font-bold tracking-wider">
                    {project.title} Interface Visual {activeSlide + 1}
                  </div>
                  <div className="text-[8px] text-text-muted mt-1 uppercase">
                    Configured environment view: {activeSlide === 0 ? "Dashboard Telemetry" : "Network Logs"}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-2">
                  <span className="text-[7.5px] text-text-muted">SLIDE // {activeSlide + 1}_OF_2</span>
                  <div className="flex gap-2 text-[8px]">
                    <button 
                      onClick={() => setActiveSlide(0)}
                      className={`px-2 py-0.5 border ${activeSlide === 0 ? "border-accent text-accent" : "border-white/5 text-text-muted"}`}
                    >
                      01
                    </button>
                    <button 
                      onClick={() => setActiveSlide(1)}
                      className={`px-2 py-0.5 border ${activeSlide === 1 ? "border-accent text-accent" : "border-white/5 text-text-muted"}`}
                    >
                      02
                    </button>
                  </div>
                </div>
              </div>
            </SpotlightCard>

          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}

/* Custom Vector Diagrams based on architecture types */
function ProjectArchitectureSVG({ type }: { type: string }) {
  if (type === "forge-ai") {
    return (
      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 160">
        <line x1="50" y1="80" x2="150" y2="80" stroke="rgba(79, 140, 255, 0.4)" strokeWidth="1.5" />
        <circle cx="50" cy="80" r="14" fill="rgba(79, 140, 255, 0.1)" stroke="#4f8cff" strokeWidth="1.5" />
        <circle cx="100" cy="80" r="14" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <circle cx="150" cy="80" r="14" fill="rgba(79, 140, 255, 0.1)" stroke="#4f8cff" strokeWidth="1.5" />
        <text x="50" y="83" textAnchor="middle" fill="white" className="font-mono text-[7px]">PM</text>
        <text x="100" y="83" textAnchor="middle" fill="white" className="font-mono text-[7px]">CODE</text>
        <text x="150" y="83" textAnchor="middle" fill="white" className="font-mono text-[7px]">AWS</text>
      </svg>
    );
  }
  if (type === "object-detector") {
    return (
      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 160">
        <line x1="100" y1="40" x2="100" y2="120" stroke="rgba(79, 140, 255, 0.4)" strokeWidth="1.5" />
        <circle cx="100" cy="40" r="12" fill="rgba(79, 140, 255, 0.1)" stroke="#4f8cff" strokeWidth="1.5" />
        <circle cx="100" cy="80" r="12" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <circle cx="100" cy="120" r="12" fill="rgba(79, 140, 255, 0.1)" stroke="#4f8cff" strokeWidth="1.5" />
        <text x="100" y="43" textAnchor="middle" fill="white" className="font-mono text-[6px]">INPUT</text>
        <text x="100" y="83" textAnchor="middle" fill="white" className="font-mono text-[6px]">CUDA</text>
        <text x="100" y="123" textAnchor="middle" fill="white" className="font-mono text-[6px]">YOLOv8</text>
      </svg>
    );
  }
  if (type === "civic-reporter") {
    return (
      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 160">
        <polygon points="100,20 150,110 50,110" fill="rgba(79, 140, 255, 0.05)" stroke="rgba(79, 140, 255, 0.3)" strokeWidth="1" />
        <circle cx="100" cy="20" r="10" fill="black" stroke="#4f8cff" strokeWidth="1.5" />
        <circle cx="50" cy="110" r="10" fill="black" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <circle cx="150" cy="110" r="10" fill="black" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <text x="100" y="23" textAnchor="middle" fill="white" className="font-mono text-[5px]">CLIENT</text>
        <text x="50" y="113" textAnchor="middle" fill="white" className="font-mono text-[5px]">FASTAPI</text>
        <text x="150" y="113" textAnchor="middle" fill="white" className="font-mono text-[5px]">MONGO</text>
      </svg>
    );
  }
  // Default to E-Commerce/AWS
  return (
    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 160">
      <rect x="30" y="60" width="35" height="35" rx="4" fill="rgba(79, 140, 255, 0.05)" stroke="#4f8cff" strokeWidth="1" />
      <rect x="85" y="60" width="35" height="35" rx="4" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <rect x="140" y="60" width="35" height="35" rx="4" fill="rgba(79, 140, 255, 0.05)" stroke="#4f8cff" strokeWidth="1" />
      <text x="47" y="80" textAnchor="middle" fill="white" className="font-mono text-[5.5px]">ORDERS</text>
      <text x="102" y="80" textAnchor="middle" fill="white" className="font-mono text-[5.5px]">PGSQL</text>
      <text x="157" y="80" textAnchor="middle" fill="white" className="font-mono text-[5.5px]">AWS S3</text>
    </svg>
  );
}
