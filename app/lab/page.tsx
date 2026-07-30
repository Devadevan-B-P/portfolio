"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import SpotlightCard from "@/components/SpotlightCard";
import { labItems } from "@/lib/data";
import { usePageTransition } from "@/components/PageTransition";
import { ArrowLeft, GitBranch } from "lucide-react";

export default function LabPage() {
  const { triggerTransition } = usePageTransition();

  return (
    <SmoothScroll>
      <Navbar />
      <div className="noise-layer" />

      <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
        {/* HUD Subpage Header */}
        <div className="max-w-6xl mx-auto mb-16 relative">
          <button
            onClick={() => triggerTransition("/engineering-archive")}
            className="group flex items-center gap-2 text-text-muted hover:text-white font-mono text-[10px] uppercase tracking-wider mb-6 transition-colors focus-visible:outline-none"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" /> Back to Archive
          </button>
          
          <span className="mono-tag text-xs uppercase tracking-[0.25em] text-accent mb-3 block">
            Sandbox // Workspace Lab
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            The Engineering Lab
          </h1>
          <p className="font-body text-sm md:text-base text-text-secondary max-w-2xl leading-relaxed">
            A digital directory of prototypes, lightweight utilities, CUDA kernel experiments, and AI model evaluation tests.
          </p>
          <div className="h-[1px] bg-white/5 w-full mt-10" />
        </div>

        {/* Lab Grid Layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {labItems.map((item) => (
            <SpotlightCard key={item.id} className="p-6 border border-white/5 bg-white/[0.005] flex flex-col justify-between h-72">
              <div>
                {/* Header tags */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="mono-tag text-[9px] uppercase tracking-wider text-text-secondary font-bold font-mono">
                      LAB_ID: {item.id.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex gap-1.5">
                    <span className="mono-tag text-[8px] border border-white/10 rounded-pill px-2.5 py-0.5 text-text-secondary bg-white/[0.02] uppercase font-bold">
                      {item.type}
                    </span>
                    <span className={`mono-tag text-[8px] rounded-pill px-2.5 py-0.5 uppercase font-bold ${
                      item.status === "Active" 
                        ? "bg-green-400/10 text-green-400 border border-green-400/20" 
                        : "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-3">
                  {item.title}
                </h3>
                
                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mt-4 border-t border-white/5 pt-4">
                  {item.tech.map((t) => (
                    <span key={t} className="mono-tag text-[8.5px] border border-white/5 rounded px-2 py-0.5 text-text-secondary font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-mono text-[7px] text-text-muted">BUILD // SANDBOX_STABLE</span>
                  <a 
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group font-mono text-[9px] uppercase tracking-wider text-accent hover:text-white flex items-center gap-1 transition-colors font-semibold"
                  >
                    Inspect Source <GitBranch className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </main>
    </SmoothScroll>
  );
}
