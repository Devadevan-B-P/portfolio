"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import SpotlightCard from "@/components/SpotlightCard";
import SmoothScroll from "@/components/SmoothScroll";
import { usePageTransition } from "@/components/PageTransition";
import { projects, credentials } from "@/lib/data";
import { ArrowRight, FileText, Award, ExternalLink, Github, Terminal } from "lucide-react";

export default function EngineeringArchive() {
  const { triggerTransition } = usePageTransition();

  return (
    <SmoothScroll>
      <Navbar />
      <div className="noise-layer" />
      
      <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
        {/* Cinematic HUD Header */}
        <div className="max-w-6xl mx-auto mb-16 relative">
          <span className="mono-tag text-xs uppercase tracking-[0.25em] text-accent mb-3 block">
            Archive // Repository Index
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Engineering Archive
          </h1>
          <p className="font-body text-sm md:text-base text-text-secondary max-w-2xl leading-relaxed">
            A centralized index of structural software systems, cloud infrastructure deployments, academic credentials, and active sandboxed experiments.
          </p>
          <div className="absolute right-0 top-0 hidden lg:block opacity-45">
            <div className="h-16 w-32 border border-white/5 rounded-md flex items-center justify-center font-mono text-[9px] uppercase tracking-wider text-text-muted">
              INDEX_v2.0
            </div>
          </div>
          <div className="h-[1px] bg-white/5 w-full mt-10" />
        </div>

        {/* Grid Layout of Archive Sections */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left columns (Featured Projects & Open Source) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Featured Projects Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                  Featured Case Studies
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {projects.map((proj) => (
                  <SpotlightCard key={proj.id} className="p-6 border border-white/5 bg-white/[0.005] hover:border-accent/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <span className="mono-tag text-[9px] text-accent uppercase tracking-wider font-semibold">
                          Project {proj.index}
                        </span>
                        <h3 className="font-display text-lg font-bold text-white mt-1">
                          {proj.title}
                        </h3>
                        <p className="font-body text-xs text-text-secondary mt-1 max-w-xl">
                          {proj.overview}
                        </p>
                      </div>
                      <button
                        onClick={() => triggerTransition(`/projects/${proj.id}`)}
                        className="glass px-4 py-2 rounded-pill text-[10px] text-white hover:bg-accent hover:text-black uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
                      >
                        Inspect Architecture <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                      {proj.tech.map((tag) => (
                        <span key={tag} className="mono-tag text-[9px] border border-white/5 rounded-pill px-2.5 py-0.5 text-text-secondary bg-white/[0.01]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </section>

            {/* Open Source Contribution Section */}
            <section className="space-y-6 border-t border-white/5 pt-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                  Open Source Library Index
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpotlightCard className="p-5 border border-white/5 bg-white/[0.005]">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-semibold text-white">fastapi/fastapi</span>
                    <Github className="h-4 w-4 text-text-muted" />
                  </div>
                  <p className="text-[11px] text-text-secondary font-body leading-relaxed mt-3">
                    Contributed documentation patches and test-suite fixes detailing Pydantic v2 validation constraints.
                  </p>
                </SpotlightCard>

                <SpotlightCard className="p-5 border border-white/5 bg-white/[0.005]">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-semibold text-white">caddyserver/caddy</span>
                    <Github className="h-4 w-4 text-text-muted" />
                  </div>
                  <p className="text-[11px] text-text-secondary font-body leading-relaxed mt-3">
                    Submited localized docker documentation modifications on automated Let's Encrypt DNS verification settings.
                  </p>
                </SpotlightCard>
              </div>
            </section>

          </div>

          {/* Right column (Credentials, Resume & Lab Shortcuts) */}
          <div className="space-y-12">
            
            {/* Credentials Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                  Credentials
                </h2>
              </div>

              <div className="space-y-6">
                {credentials.map((cred) => (
                  <SpotlightCard key={cred.id} className="p-5 border border-white/5 bg-white/[0.005] flex flex-col gap-4">
                    {/* Visual Preview Container */}
                    <div className="relative h-32 w-full rounded border border-white/5 bg-black/60 overflow-hidden flex items-center justify-center select-none">
                      <div className="absolute inset-0 opacity-5 bg-grid-lines" />
                      <div className="text-center p-4">
                        <Award className="h-8 w-8 text-accent/80 mx-auto mb-2 animate-pulse" />
                        <span className="mono-tag text-[8px] uppercase tracking-widest text-text-muted">
                          {cred.issuer}
                        </span>
                        <div className="text-[9px] font-bold font-mono text-white mt-1 uppercase max-w-[200px] truncate">
                          {cred.title}
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 font-mono text-[7px] text-white/30">
                        PREVIEW_OK
                      </span>
                    </div>

                    {/* Metadata Details */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-text-secondary">
                        <span className="text-text-muted">ID:</span>
                        <span>{cred.credentialId}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-text-secondary">
                        <span className="text-text-muted">Date:</span>
                        <span>{cred.date}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cred.skillsLearned.map((s) => (
                          <span key={s} className="mono-tag text-[8px] border border-white/5 rounded-pill px-2 py-0.5 text-text-secondary">
                            {s}
                          </span>
                        ))}
                      </div>

                      <a 
                        href={cred.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full flex items-center justify-center gap-1.5 px-4 py-2 border border-white/5 hover:border-accent/40 rounded text-[9px] uppercase tracking-wider font-semibold font-mono text-accent bg-white/[0.01] hover:bg-accent hover:text-black transition-colors"
                      >
                        Verify Credential <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </section>

            {/* Resume Summary Card */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                  Curriculum Vitae
                </h2>
              </div>

              <SpotlightCard className="p-5 border border-white/5 bg-white/[0.005] flex flex-col justify-between h-44">
                <div>
                  <div className="flex items-center gap-2 text-white mb-2">
                    <FileText className="h-4 w-4 text-accent" />
                    <span className="font-display text-sm font-semibold uppercase">Professional Resume</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-text-secondary font-body">
                    Review academic details, engineering milestones, software internships, and localized skillset trees formatted for easy indexing.
                  </p>
                </div>
                <button
                  onClick={() => triggerTransition("/resume")}
                  className="w-full flex items-center justify-between text-xs font-mono text-accent hover:text-white border-t border-white/5 pt-4 transition-colors font-semibold uppercase tracking-wider cursor-pointer"
                >
                  View Dedicated Resume Page <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </SpotlightCard>
            </section>

            {/* Lab Sandbox Summary Card */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                  Developer Sandbox
                </h2>
              </div>

              <SpotlightCard className="p-5 border border-white/5 bg-white/[0.005] flex flex-col justify-between h-44">
                <div>
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Terminal className="h-4 w-4 text-accent" />
                    <span className="font-display text-sm font-semibold uppercase">The Lab</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-text-secondary font-body">
                    CUDA extension tests, ML prompt assessors, and docker network prototypes run inside active workspaces.
                  </p>
                </div>
                <button
                  onClick={() => triggerTransition("/lab")}
                  className="w-full flex items-center justify-between text-xs font-mono text-accent hover:text-white border-t border-white/5 pt-4 transition-colors font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Enter Developer Lab <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </SpotlightCard>
            </section>

          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
