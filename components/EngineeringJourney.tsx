"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Lightbulb, 
  Map as MapIcon, 
  Cpu, 
  Globe, 
  Eye, 
  Award, 
  BookOpen, 
  Database,
  CheckCircle2,
  Github,
  Mail,
  Linkedin,
  FileText,
  Workflow,
  Code2,
  FolderOpen,
  CloudLightning,
  Activity,
  GitBranch
} from "lucide-react";
import { projects, education, profile, chapters, principles, ChapterId } from "@/lib/data";
import { useJourneyProgress } from "@/lib/useJourneyProgress";
import SpotlightCard from "./SpotlightCard";

interface VisualProps {
  active: boolean;
}

export default function EngineeringJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [githubDays, setGithubDays] = useState<any[]>([]);

  // Pre-fetch GitHub contribution calendar data on initial component mount
  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        if (data.days) {
          setGithubDays(data.days.slice(-49));
        }
      })
      .catch(() => {
        // Fall back gracefully to mock preview if errors or token missing
      });
  }, []);
  
  // Scroll monitoring
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Extract journey state from progress hook
  const { activeChapter, activeStep, isDesktop } = useJourneyProgress(scrollYProgress);

  // SVG Drawing progress (height mapped)
  const pathLength = useTransform(scrollYProgress, [0, 0.97], [0, 1]);

  // Cinematic "Final Scene" Fadeout of surrounding UI elements:
  // As scroll progress goes past 0.96 to 0.98, the timeline bars, sidebars, and bezel outlines dissolve to 0 opacity.
  const uiOpacity = useTransform(scrollYProgress, [0.96, 0.98], [1, 0]);

  return (
    <div ref={containerRef} className={`relative bg-bg-primary ${isDesktop ? "min-h-[850vh]" : "min-h-0"}`}>
      
      {/* DESKTOP VIEW */}
      {isDesktop ? (
        <div className="flex">
        
        {/* Left Side: Sticky Visualizer */}
        <div className="sticky top-0 flex h-screen w-[45%] items-center justify-center border-r border-border-subtle p-12 overflow-hidden bg-bg-primary">
          
          {/* Timeline Node Sidebar (Fades out in final credits stage) */}
          <motion.div 
            style={{ opacity: uiOpacity }}
            className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20 pointer-events-none"
          >
            <div className="relative w-0.5 h-[320px] bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                style={{ scaleY: pathLength, originY: 0 }}
                className="w-full h-full bg-accent shadow-[0_0_12px_#4f8cff]"
              />
            </div>
            
            {/* Indicator icons built dynamically from configuration */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex flex-col justify-between py-1">
              {chapters.slice(0, 7).map((ch) => {
                let Icon = Lightbulb;
                if (ch.id === "blueprint") Icon = MapIcon;
                else if (ch.id === "engine") Icon = Cpu;
                else if (ch.id === "network") Icon = Globe;
                else if (ch.id === "edge") Icon = Eye;
                else if (ch.id === "credibility") Icon = Award;
                else if (ch.id === "lessons") Icon = BookOpen;

                return (
                  <SidebarDot 
                    key={ch.id} 
                    active={activeChapter === ch.id} 
                    icon={Icon} 
                    label={ch.label}
                  />
                );
              })}
            </div>
          </motion.div>

          {/* Main Visual Display Canvas */}
          <div className="relative w-full h-[70vh] rounded-card border border-border-subtle bg-surface/10 p-8 flex flex-col justify-between overflow-hidden shadow-layered backdrop-blur-sm">
            
            {/* Screen bezel corner highlight (Fades out in final stage) */}
            <motion.span style={{ opacity: uiOpacity }} className="absolute left-3 top-3 h-2 w-2 border-l border-t border-white/20 pointer-events-none" />
            <motion.span style={{ opacity: uiOpacity }} className="absolute right-3 top-3 h-2 w-2 border-r border-t border-white/20 pointer-events-none" />
            <motion.span style={{ opacity: uiOpacity }} className="absolute left-3 bottom-3 h-2 w-2 border-l border-b border-white/20 pointer-events-none" />
            <motion.span style={{ opacity: uiOpacity }} className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-white/20 pointer-events-none" />
            
            {/* Header Telemetry bar (Fades out in final stage) */}
            <motion.div 
              style={{ opacity: uiOpacity }}
              className="flex items-center justify-between border-b border-border-subtle pb-4 text-[10px] uppercase tracking-[0.2em] text-text-muted mono-tag font-mono pointer-events-none"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span>SYSTEM DIAGRAM VISUALIZER</span>
              </div>
              <div>STAGE: {activeChapter.toUpperCase()}</div>
            </motion.div>

            {/* Dynamic Stage Renderings */}
            <div className="flex-1 flex items-center justify-center py-6 relative">
              <AnimatePresence mode="wait">
                {activeChapter === "problem" && (
                  <VisualProblem key="problem" active={activeChapter === "problem"} />
                )}
                {activeChapter === "blueprint" && (
                  <VisualBlueprint key="blueprint" active={activeChapter === "blueprint"} />
                )}
                {activeChapter === "engine" && (
                  <VisualForgeAI key="engine" step={activeStep} active={activeChapter === "engine"} />
                )}
                {activeChapter === "network" && (
                  <VisualNetwork key="network" active={activeChapter === "network"} />
                )}
                {activeChapter === "edge" && (
                  <VisualEdge key="edge" active={activeChapter === "edge"} />
                )}
                {activeChapter === "credibility" && (
                   <VisualCredibility key="credibility" active={activeChapter === "credibility"} daysData={githubDays} />
                 )}
                {activeChapter === "lessons" && (
                  <VisualLessons key="lessons" active={activeChapter === "lessons"} />
                )}
                {activeChapter === "final" && (
                  <VisualFinal key="final" active={activeChapter === "final"} />
                )}
              </AnimatePresence>
            </div>

            {/* Footer Telemetry bar (Fades out in final stage) */}
            <motion.div 
              style={{ opacity: uiOpacity }}
              className="border-t border-border-subtle pt-3 flex items-center justify-between text-[9px] text-text-muted mono-tag font-mono pointer-events-none"
            >
              <span>RESOLUTION: ENGINE_CANVAS_v1.0</span>
              <span>RENDER: GPU_ACCELERATED</span>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Scrollable Story Content */}
        <div className="w-[55%] px-16 lg:px-24">
          
          {/* Stage 1: The Problem */}
          <section className="min-h-[100vh] flex flex-col justify-center py-[20vh]">
            <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">01 // Discovery</span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-6">
              The Problem
            </h2>
            <p className="font-body text-base lg:text-lg leading-relaxed text-text-secondary max-w-xl mb-6">
              Software engineering is undergoing a tectonic shift. Building today requires mapping complex requirements into microservices, deploying across cloud infrastructure, and maintaining real-time states, often creating bottlenecks for small teams.
            </p>
            <p className="font-body text-sm leading-relaxed text-text-muted max-w-xl">
              I focus on identifying core architectural flaws—disconnects between user intent and folder implementation—to design automated workflows that translate abstract ideas into robust running products.
            </p>
          </section>

          {/* Stage 2: The Blueprint */}
          <section className="min-h-[100vh] flex flex-col justify-center py-[20vh]">
            <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">02 // Design</span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-6">
              The Blueprint
            </h2>
            <p className="font-body text-base lg:text-lg leading-relaxed text-text-secondary max-w-xl mb-6">
              Before writing a single line of code, software must be mapped. Modern product development requires rigorous planning—defining transactional boundaries, structuring relational schemas, and planning AWS network routing topologies.
            </p>
            <p className="font-body text-sm leading-relaxed text-text-muted max-w-xl">
              Through designing architectures for high availability, I bridge frontend applications to server arrays and container deployments, ensuring every dependency tree is clean and scalable.
            </p>
          </section>

          {/* Stage 3: Forge AI Flagship Chapter */}
          <div className="border-l border-white/5 pl-8 ml-[-32px] my-10 space-y-10">
            
            {/* Step 3.1: Forge Intro */}
            <section className="min-h-[90vh] flex flex-col justify-center py-[15vh]">
              <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">03.1 // Flagship Project</span>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-4">
                Forge AI: The Engine
              </h2>
              <p className="mono-tag text-sm uppercase tracking-wide text-text-muted mb-6">
                Autonomous Software Engineer Agent
              </p>
              <p className="font-body text-base leading-relaxed text-text-secondary max-w-xl mb-6">
                Forge AI was created to answer a single question: Can we automate the entire pipeline of building full-stack software from a text prompt? 
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {projects[0].tech.map((t) => (
                  <span key={t} className="mono-tag rounded-pill border border-border-subtle px-3 py-1 text-[11px] text-text-secondary bg-surface/20">
                    {t}
                  </span>
                ))}
              </div>
            </section>

            {/* Step 3.2: User Input */}
            <section className="min-h-[80vh] flex flex-col justify-center py-[10vh]">
              <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">03.2 // Step One</span>
              <h3 className="font-display text-2xl font-medium text-white mb-4">User Prompt Intake</h3>
              <p className="font-body text-sm leading-relaxed text-text-secondary max-w-xl">
                The journey begins with user intent. Forge AI ingests natural language prompts, mapping unstructured ideas into initial system requirements. No prompts are parsed directly as code: instead, we structure user constraints first.
              </p>
            </section>

            {/* Step 3.3: PRD Gen */}
            <section className="min-h-[80vh] flex flex-col justify-center py-[10vh]">
              <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">03.3 // Step Two</span>
              <h3 className="font-display text-2xl font-medium text-white mb-4">Autonomous PRD Generation</h3>
              <p className="font-body text-sm leading-relaxed text-text-secondary max-w-xl">
                A Product Manager Agent analyzes the prompts, building out comprehensive Product Requirements Documents (PRDs). It extracts features, maps data models, establishes routing specs, and scopes boundaries.
              </p>
            </section>

            {/* Step 3.4: Architecture Mapping */}
            <section className="min-h-[80vh] flex flex-col justify-center py-[10vh]">
              <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">03.4 // Step Three</span>
              <h3 className="font-display text-2xl font-medium text-white mb-4">Topology Mapping</h3>
              <p className="font-body text-sm leading-relaxed text-text-secondary max-w-xl">
                The Architect Agent converts features into system topology diagrams. It selects core stacks (e.g. Next.js, FastAPI, PostgreSQL), outlines API schemas, and designs database relations.
              </p>
            </section>

            {/* Step 3.5: Folder & Code Gen */}
            <section className="min-h-[80vh] flex flex-col justify-center py-[10vh]">
              <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">03.5 // Step Four</span>
              <h3 className="font-display text-2xl font-medium text-white mb-4">Code Synthesis</h3>
              <p className="font-body text-sm leading-relaxed text-text-secondary max-w-xl">
                The Code Engine constructs the folder structure. It generates modular React components, setups API router endpoints, configures ORM models, and packages the workspace with Dockerfiles.
              </p>
            </section>

            {/* Step 3.6: AWS Topology */}
            <section className="min-h-[80vh] flex flex-col justify-center py-[10vh]">
              <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">03.6 // Step Five</span>
              <h3 className="font-display text-2xl font-medium text-white mb-4">Infrastructure Provisioning</h3>
              <p className="font-body text-sm leading-relaxed text-text-secondary max-w-xl">
                The final deployment topology is generated. Using AWS integration scripts, Forge prepares configurations to provision secure buckets, compute instances, and load balancer routers automatically.
              </p>
            </section>
          </div>

          {/* Stage 4: The Network (Full-Stack Systems) */}
          <section className="min-h-[100vh] flex flex-col justify-center py-[20vh]">
            <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">04 // Systems</span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-6">
              The Network
            </h2>
            <p className="font-body text-base lg:text-lg leading-relaxed text-text-secondary max-w-xl mb-6">
              Systems architecture is about managing data flow. In my projects, like the <span className="text-white font-medium">Civic Issue Reporting System</span> and the <span className="text-white font-medium">E-Commerce Microservices</span>, database structure and network design determine success.
            </p>
            <p className="font-body text-sm leading-relaxed text-text-muted max-w-xl">
              I implement real-time WebSockets to synchronize client dashboards with active MongoDB geo-clusters and ensure PostgreSQL indexes are tuned for high-volume transactions under complex database schemas.
            </p>
          </section>

          {/* Stage 5: The Edge (Vision & Processing) */}
          <section className="min-h-[100vh] flex flex-col justify-center py-[20vh]">
            <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">05 // Edge Processing</span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-6">
              The Edge
            </h2>
            <p className="font-body text-base lg:text-lg leading-relaxed text-text-secondary max-w-xl mb-6">
              Deploying computer vision models requires minimizing latencies at the hardware level. Building the <span className="text-white font-medium">Real-Time Object Detector</span> meant bridging PyTorch and YOLOv8 with local CUDA acceleration.
            </p>
            <p className="font-body text-sm leading-relaxed text-text-muted max-w-xl">
              By offloading frame arrays directly to NVIDIA GPU memory buffers, the system bypasses bottlenecking host CPU-to-device transfers, rendering inference matrices at solid 60 FPS feeds.
            </p>
          </section>

          {/* Stage 6: Credibility & Impact */}
          <section className="min-h-[100vh] flex flex-col justify-center py-[20vh]">
            <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">06 // Credibility</span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-8">
              Impact & Trust
            </h2>
            <div className="grid gap-6 w-full max-w-xl">
              
              {/* Internship Card */}
              <SpotlightCard className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="mono-tag text-[10px] text-accent uppercase tracking-wider">Experience</span>
                    <h3 className="font-display text-lg font-semibold text-white mt-1">AWS Fundamentals Internship</h3>
                    <p className="font-body text-xs text-text-secondary">ICT Academy of Kerala</p>
                  </div>
                  <span className="mono-tag text-xs text-text-muted">2024</span>
                </div>
                <p className="mt-4 font-body text-xs text-text-secondary leading-relaxed">
                  Engineered and deployed modular cloud systems, integrating AWS services for data processing pipelines and secure identity control configurations.
                </p>
              </SpotlightCard>

              {/* Certifications Card */}
              <SpotlightCard className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="mono-tag text-[10px] text-accent uppercase tracking-wider">Education & Certs</span>
                    <h3 className="font-display text-lg font-semibold text-white mt-1">Prompt Design in Vertex AI</h3>
                    <p className="font-body text-xs text-text-secondary">Google Cloud Skills Boost</p>
                  </div>
                  <span className="mono-tag text-xs text-text-muted">2024</span>
                </div>
                <p className="mt-4 font-body text-xs text-text-secondary leading-relaxed">
                  Mastered architectural prompt templates and model tuning architectures using Vertex LLMs to handle complex reasoning tasks.
                </p>
              </SpotlightCard>

              {/* Degree Card */}
              <SpotlightCard className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="mono-tag text-[10px] text-accent uppercase tracking-wider">Academics</span>
                    <h3 className="font-display text-lg font-semibold text-white mt-1">B.Tech in Computer Science</h3>
                    <p className="font-body text-xs text-text-secondary">{education.school}</p>
                  </div>
                  <span className="mono-tag text-xs text-text-muted">Grad 2028</span>
                </div>
                <div className="mt-4 border-t border-white/5 pt-4 flex flex-wrap gap-1.5">
                  {education.coursework.slice(0, 3).map(c => (
                    <span key={c} className="mono-tag text-[9px] border border-border-subtle rounded-pill px-2 py-0.5 text-text-secondary">
                      {c}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          </section>

          {/* Stage 7: Engineering Principles (Lessons Learned / Philosophy) */}
          <section className="min-h-[100vh] flex flex-col justify-center py-[20vh]">
            <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">07 // Principles</span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-8">
              Engineering Principles
            </h2>
            <div className="space-y-8 max-w-xl">
              {principles.map((pr, idx) => (
                <div key={idx} className="border-l-2 border-white/5 pl-4 hover:border-accent/40 transition-colors duration-300">
                  <h3 className="font-display text-base font-semibold text-white mb-1.5">{pr.title}</h3>
                  <p className="font-body text-xs text-text-secondary leading-relaxed">{pr.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stage 8: Final Scene with movie credits spacing */}
          <section id="contact" className="min-h-[160vh] flex flex-col justify-center py-[20vh]">
            {/* Empty right column: let visual visualizer capture full viewport center and fade in */}
          </section>
        </div>
      </div>
      ) : (
        /* MOBILE VIEW (Simplified vertical timeline) */
        <div className="px-6 py-20 flex flex-col gap-16 relative">
          {/* Timeline Vertical Line aligned at left-10 (40px) */}
          <div className="absolute left-10 top-24 bottom-24 w-0.5 bg-white/5" />

          <div className="relative pl-12 space-y-20">
            
            <MobileSection title="01 // The Problem" icon={Lightbulb}>
              <p className="font-body text-sm leading-relaxed text-text-secondary mb-6">
                Mapping complex requirements into clean architectural folder structures to bypass engineering bottlenecks.
              </p>
              <div className="relative border border-border-subtle bg-surface/10 rounded-card p-4 flex items-center justify-center overflow-hidden w-full max-w-sm backdrop-blur-sm h-80">
                <VisualProblem active={true} />
              </div>
            </MobileSection>

            <MobileSection title="02 // The Blueprint" icon={MapIcon}>
              <p className="font-body text-sm leading-relaxed text-text-secondary mb-6">
                Designing relational database schemas, microservice APIs, and secure deployment maps prior to code synthesis.
              </p>
              <div className="relative border border-border-subtle bg-surface/10 rounded-card p-4 flex items-center justify-center overflow-hidden w-full max-w-sm backdrop-blur-sm h-80">
                <VisualBlueprint active={true} />
              </div>
            </MobileSection>

            <MobileSection title="03 // Forge AI (Flagship)" icon={Cpu} highlighted>
              <div className="space-y-4">
                <p className="font-body text-sm leading-relaxed text-text-secondary font-medium">
                  An autonomous coding engine converting natural text requirements to production-ready deployed apps using Docker, Caddy HTTPS, AWS EC2, and MongoDB Atlas.
                </p>
                <div className="border-l border-accent/20 pl-4 space-y-3 py-1 mb-6">
                  <MobileStep title="User Input" desc='forge create app "CRM platform"' />
                  <MobileStep title="PRD Generation" desc="Extracting features, data boundaries" />
                  <MobileStep title="Architecture" desc="Generating schemas & routing maps" />
                  <MobileStep title="Code Synthesis" desc="Writing React files & API models" />
                  <MobileStep title="Deployment" desc="Building Docker, shipping to AWS" />
                </div>
                <div className="relative border border-border-subtle bg-surface/10 rounded-card p-4 flex flex-col items-center justify-center overflow-hidden w-full max-w-sm backdrop-blur-sm h-[380px]">
                  <VisualForgeAI active={true} step={0} />
                </div>
              </div>
            </MobileSection>

            <MobileSection title="04 // The Network" icon={Globe}>
              <p className="font-body text-sm leading-relaxed text-text-secondary mb-6">
                Integrating real-time geocoding WebSockets (Civic Reporting System) and transactional PostgreSQL engines (E-Commerce Platform), routing queries securely via Caddy reverse proxies.
              </p>
              <div className="relative border border-border-subtle bg-surface/10 rounded-card p-4 flex items-center justify-center overflow-hidden w-full max-w-sm backdrop-blur-sm h-80">
                <VisualNetwork active={true} />
              </div>
            </MobileSection>

            <MobileSection title="05 // The Edge" icon={Eye}>
              <p className="font-body text-sm leading-relaxed text-text-secondary mb-6">
                Accelerating computer vision inference frames directly in GPU/CUDA buffers, yielding real-time YOLOv8 speeds.
              </p>
              <div className="relative border border-border-subtle bg-surface/10 rounded-card p-4 flex items-center justify-center overflow-hidden w-full max-w-sm backdrop-blur-sm h-80">
                <VisualEdge active={true} />
              </div>
            </MobileSection>

            <MobileSection title="06 // Credibility" icon={Award}>
              <div className="space-y-4">
                <div className="space-y-3 mb-6">
                  <div className="border border-border-subtle bg-card rounded-btn p-4">
                    <span className="mono-tag text-[9px] text-accent font-semibold block uppercase">ICT ACADEMY OF KERALA</span>
                    <p className="font-display text-sm font-semibold text-white mt-1">AWS Fundamentals Internship</p>
                  </div>
                  <div className="border border-border-subtle bg-card rounded-btn p-4">
                    <span className="mono-tag text-[9px] text-accent font-semibold block uppercase">GOOGLE CLOUD</span>
                    <p className="font-display text-sm font-semibold text-white mt-1">Prompt Design in Vertex AI</p>
                  </div>
                </div>
                <div className="relative border border-border-subtle bg-surface/10 rounded-card p-4 flex items-center justify-center overflow-hidden w-full max-w-sm backdrop-blur-sm h-80">
                  <VisualCredibility active={true} daysData={githubDays} />
                </div>
              </div>
            </MobileSection>

            <MobileSection title="07 // Principles" icon={BookOpen}>
              <div className="space-y-6">
                <div className="space-y-4 text-xs font-body text-text-secondary">
                  {principles.map((pr, idx) => (
                    <div key={idx} className="border-l border-white/10 pl-3">
                      <h4 className="font-display text-white font-semibold text-xs mb-1">{pr.title}</h4>
                      <p className="text-[11px] text-text-muted">{pr.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="relative border border-border-subtle bg-surface/10 rounded-card p-4 flex items-center justify-center overflow-hidden w-full max-w-sm backdrop-blur-sm min-h-[320px] py-8">
                  <VisualLessons active={true} />
                </div>
              </div>
            </MobileSection>

            <MobileSection title="08 // Final Scene" icon={CheckCircle2}>
              <div className="pt-2">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-white mb-2">Let&apos;s Build The Next One.</h3>
                <p className="font-body text-xs text-text-secondary mb-6">Open to engineering roles, collaborations, and challenging software puzzles.</p>
                <div className="flex gap-4">
                  <a href={`mailto:${profile.email}`} className="glass px-4 py-2 text-xs font-semibold rounded-pill text-white flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" /> Email
                  </a>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="glass px-4 py-2 text-xs font-semibold rounded-pill text-white flex items-center gap-1.5">
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="glass px-4 py-2 text-xs font-semibold rounded-pill text-white flex items-center gap-1.5">
                    <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                  </a>
                </div>
              </div>
            </MobileSection>
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponents

function SidebarDot({ 
  active, 
  icon: Icon, 
  label 
}: { 
  active: boolean; 
  icon: any; 
  label: string;
}) {
  return (
    <div 
      className={`h-7 w-7 rounded-full flex items-center justify-center border transition-all duration-500 bg-bg-primary ${
        active 
          ? "border-accent text-accent shadow-[0_0_10px_rgba(79,140,255,0.4)] scale-110" 
          : "border-white/10 text-text-muted"
      }`}
      role="img"
      aria-label={label}
    >
      <Icon className="h-3.5 w-3.5" />
    </div>
  );
}

function MobileSection({ 
  title, 
  icon: Icon, 
  highlighted = false,
  children 
}: { 
  title: string; 
  icon: any; 
  highlighted?: boolean;
  children: React.ReactNode 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="relative"
    >
      <div 
        className={`absolute -left-[50px] top-0 h-9 w-9 rounded-full flex items-center justify-center border bg-bg-primary ${
          highlighted ? "border-accent text-accent" : "border-white/10 text-white/60"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="font-display text-base font-semibold text-white mb-2">{title}</h3>
      {children}
    </motion.div>
  );
}

function MobileStep({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h4 className="font-display text-xs font-semibold text-white">{title}</h4>
      <p className="font-body text-[11px] text-text-muted">{desc}</p>
    </div>
  );
}

/* LEFT PANEL VISUAL SUB-COMPONENTS - MEMOIZED FOR PERFORMANCE */

const VisualProblem = React.memo(function VisualProblem({ active }: VisualProps) {
  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <svg className="w-56 h-56" viewBox="0 0 200 200" aria-label="System requirement congestion diagram">
        <motion.path 
          d="M 10 50 Q 70 80, 100 100" 
          stroke="rgba(79, 140, 255, 0.2)" 
          strokeWidth="1.5" 
          fill="none" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />
        <motion.path 
          d="M 10 100 Q 50 110, 100 100" 
          stroke="rgba(79, 140, 255, 0.2)" 
          strokeWidth="1.5" 
          fill="none" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8 }}
        />
        <motion.path 
          d="M 10 150 Q 60 120, 100 100" 
          stroke="rgba(79, 140, 255, 0.2)" 
          strokeWidth="1.5" 
          fill="none" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2 }}
        />
        
        <circle cx="100" cy="100" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <motion.circle 
          cx="100" 
          cy="100" 
          r="8" 
          fill="#4f8cff" 
          animate={{ scale: [1, 1.15, 1] }} 
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.path 
          d="M 108 100 H 190" 
          stroke="#4f8cff" 
          strokeWidth="1.5" 
          strokeDasharray="4 2"
          fill="none" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />
        <circle cx="190" cy="100" r="3" fill="#4f8cff" />
      </svg>
      <div className="absolute bottom-6 font-mono text-[9px] text-text-secondary uppercase tracking-[0.1em]">
        System entry requests matching scope
      </div>
    </motion.div>
  );
});

const VisualBlueprint = React.memo(function VisualBlueprint({ active }: VisualProps) {
  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <div className="grid grid-cols-3 gap-6 w-72 text-center text-[10px] font-mono text-text-secondary">
        <div className="border border-white/5 rounded-btn px-2 py-4 bg-white/[0.005]">
          <span className="text-white font-semibold">CLIENT</span>
          <div className="mt-2 h-[1px] bg-white/5 w-full" />
          <div className="mt-2 text-[8px] text-text-muted">React SPA</div>
        </div>
        <div className="border border-accent/10 rounded-btn px-2 py-4 bg-accent/[0.01] flex flex-col justify-between">
          <span className="text-accent font-semibold">GATEWAY</span>
          <div className="mt-2 h-[1px] bg-accent/10 w-full" />
          <div className="mt-2 text-[8px] text-accent/80">FastAPI API</div>
        </div>
        <div className="border border-white/5 rounded-btn px-2 py-4 bg-white/[0.005]">
          <span className="text-white font-semibold">DATABASE</span>
          <div className="mt-2 h-[1px] bg-white/5 w-full" />
          <div className="mt-2 text-[8px] text-text-muted">PostgreSQL</div>
        </div>
      </div>
      
      <svg className="absolute w-72 h-32 pointer-events-none" viewBox="0 0 288 128">
        <motion.path 
          d="M 96 64 H 192" 
          stroke="#4f8cff" 
          strokeWidth="1" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
      </svg>
      
      <div className="absolute bottom-6 font-mono text-[9px] text-text-secondary uppercase tracking-[0.1em]">
        System Flow Blueprint Mapping
      </div>
    </motion.div>
  );
});

interface VisualForgeAIProps extends VisualProps {
  step: number;
}

const VisualForgeAI = React.memo(function VisualForgeAI({ step, active }: VisualForgeAIProps) {
  const [localStep, setLocalStep] = useState<number>(0);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);

  useEffect(() => {
    if (!userInteracted) {
      setLocalStep(step);
    }
  }, [step, userInteracted]);

  if (!active) return null;

  const tabs = [
    { id: 0, label: "PRD", icon: FileText },
    { id: 1, label: "Architecture", icon: Workflow },
    { id: 2, label: "API Design", icon: Code2 },
    { id: 3, label: "Folders", icon: FolderOpen },
    { id: 4, label: "Deployment", icon: CloudLightning },
  ];

  const handleTabClick = (tabId: number) => {
    setLocalStep(tabId);
    setUserInteracted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-between p-2"
    >
      <div className="flex gap-1.5 bg-white/[0.02] border border-white/5 rounded-pill p-1 mb-4 z-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = localStep === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-[9px] uppercase tracking-wider font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                isSelected 
                  ? "bg-accent text-bg-primary shadow-glow" 
                  : "text-text-secondary hover:text-white"
              }`}
              aria-selected={isSelected}
              role="tab"
            >
              <Icon className="h-3 w-3" />
              <span className="hidden lg:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="w-full max-w-sm flex-1 rounded-btn border border-border-subtle bg-bg-secondary/40 p-4 font-mono text-xs text-text-secondary flex flex-col justify-between overflow-y-auto min-h-0 select-text">
        <AnimatePresence mode="wait">
          {localStep === 0 && (
            <motion.div
              key="prd"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="space-y-2.5"
            >
              <div className="flex items-center justify-between text-[10px] text-accent uppercase tracking-wider font-semibold">
                <span>1. Product Requirements</span>
                <span>PRD.MD</span>
              </div>
              <div className="h-[1px] bg-white/5 w-full" />
              <div className="space-y-2 text-[10px] leading-relaxed text-text-secondary">
                <div><span className="text-white font-bold">Project Target:</span> Autonomous developer server</div>
                <div><span className="text-white font-bold">Scope Constraints:</span></div>
                <div className="pl-3">• Stateless JWT OAuth credentials mapping</div>
                <div className="pl-3">• Task schema: UUID Primary Key, status enums</div>
                <div className="pl-3">• Real-time WebSockets state updates feed</div>
              </div>
            </motion.div>
          )}

          {localStep === 1 && (
            <motion.div
              key="arch"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="space-y-2.5"
            >
              <div className="flex items-center justify-between text-[10px] text-accent uppercase tracking-wider font-semibold">
                <span>2. Core System Architecture</span>
                <span>SYSTEM_MAP.TXT</span>
              </div>
              <div className="h-[1px] bg-white/5 w-full" />
              <div className="space-y-2 text-[9px] leading-relaxed text-text-muted">
                <div>[React Client] <span className="text-white">←(HTTP/WS)→</span> [Caddy Proxy]</div>
                <div className="pl-4 text-accent">|__ [FastAPI Router] (AWS EC2 Compute)</div>
                <div className="pl-8 text-accent">|__ [MongoDB Atlas Cluster] (Database)</div>
              </div>
            </motion.div>
          )}

          {localStep === 2 && (
            <motion.div
              key="api"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="space-y-2.5"
            >
              <div className="flex items-center justify-between text-[10px] text-accent uppercase tracking-wider font-semibold">
                <span>3. OpenAPI Spec Schema</span>
                <span>OPENAPI.YAML</span>
              </div>
              <div className="h-[1px] bg-white/5 w-full" />
              <pre className="text-[8px] leading-normal text-text-muted bg-white/[0.01] p-2 rounded overflow-x-auto">
{`paths:
  /api/v1/tasks:
    post:
      summary: Create task
      requestBody:
        content:
          application/json:
            schema: TaskCreate
      responses:
        201:
          description: Created`}
              </pre>
            </motion.div>
          )}

          {localStep === 3 && (
            <motion.div
              key="folders"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-[10px] text-accent uppercase tracking-wider font-semibold">
                <span>4. Repository Directory Layout</span>
                <span>TREE.TXT</span>
              </div>
              <div className="h-[1px] bg-white/5 w-full" />
              <div className="text-[9px] leading-relaxed font-mono">
                <div className="text-accent font-bold">📂 src/</div>
                <div className="pl-3 text-accent font-bold">📂 client/</div>
                <div className="pl-6 text-text-secondary">📄 page.tsx</div>
                <div className="pl-3 text-accent font-bold">📂 api/</div>
                <div className="pl-6 text-text-secondary">📄 main.py</div>
                <div className="pl-6 text-text-secondary">📄 models.py</div>
                <div className="text-text-muted">📄 docker-compose.yml</div>
              </div>
            </motion.div>
          )}

          {localStep === 4 && (
            <motion.div
              key="deploy"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="space-y-2.5"
            >
              <div className="flex items-center justify-between text-[10px] text-green-400 uppercase tracking-wider font-semibold">
                <span>5. DevOps Deployment Topology</span>
                <span>STATUS: HTTPS_ONLINE</span>
              </div>
              <div className="h-[1px] bg-white/5 w-full" />
              <div className="space-y-2 text-[10px] leading-relaxed text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                  <span>Docker containers verified & mapped.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                  <span>Caddy SSL configuration active.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                  <span>MongoDB Atlas connections verified.</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {userInteracted && (
        <button 
          onClick={() => setUserInteracted(false)}
          className="mt-3 text-[9px] uppercase tracking-wider font-semibold text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded px-2 py-0.5"
        >
          Reset to Scroll Sync
        </button>
      )}

      <div className="absolute bottom-6 font-mono text-[9px] text-text-secondary uppercase tracking-[0.1em] pointer-events-none">
        Forge AI Generation Steps
      </div>
    </motion.div>
  );
});

const VisualNetwork = React.memo(function VisualNetwork({ active }: VisualProps) {
  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-center p-6"
    >
      <div className="border border-white/5 rounded-btn p-4 bg-bg-secondary w-64 text-[10px] font-mono text-text-secondary shadow-layered">
        <div className="border-b border-white/10 pb-2 mb-2 flex items-center justify-between text-accent font-semibold">
          <span>SQL DB SCHEMA: tasks</span>
          <Database className="h-3.5 w-3.5" />
        </div>
        <div className="space-y-1.5 text-[9px]">
          <div className="flex justify-between">
            <span>id</span>
            <span className="text-text-muted">UUID (PRIMARY KEY)</span>
          </div>
          <div className="flex justify-between">
            <span>user_id</span>
            <span className="text-text-muted">UUID (FOREIGN KEY)</span>
          </div>
          <div className="flex justify-between">
            <span>title</span>
            <span className="text-text-muted">VARCHAR(255) NOT NULL</span>
          </div>
          <div className="flex justify-between">
            <span>status</span>
            <span className="text-text-muted">VARCHAR(50) DEFAULT &apos;todo&apos;</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 font-mono text-[9px] text-text-secondary uppercase tracking-[0.1em]">
        Relational Schema Constraints
      </div>
    </motion.div>
  );
});

const VisualEdge = React.memo(function VisualEdge({ active }: VisualProps) {
  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <div className="relative border border-white/5 w-72 h-44 rounded-btn overflow-hidden bg-black/60 flex items-center justify-center shadow-layered">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-10">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/30" />
          ))}
        </div>
        
        <div className="relative border border-accent rounded h-28 w-28 flex flex-col justify-between p-1.5 shadow-[0_0_15px_rgba(79,140,255,0.15)]">
          <span className="absolute -left-0.5 -top-0.5 h-2 w-2 border-l border-t border-accent" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 border-r border-t border-accent" />
          <span className="absolute -left-0.5 -bottom-0.5 h-2 w-2 border-l border-b border-accent" />
          <span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 border-r border-b border-accent" />
          
          <div className="mono-tag text-[7px] bg-accent text-[#050505] font-bold px-1 py-0.5 rounded-sm w-max uppercase">
            person: 99.2%
          </div>
          
          <div className="mono-tag text-[7px] text-accent/80 text-right self-end font-semibold">
            TRACKING
          </div>
        </div>

        <div className="absolute top-2.5 right-3 text-[7px] font-mono text-white/40 flex flex-col items-end gap-0.5">
          <span>FPS: 60.0</span>
          <span>LATENCY: 12ms</span>
          <span className="text-accent">DEVICE: CUDA GPU</span>
        </div>
      </div>
      <div className="absolute bottom-6 font-mono text-[9px] text-text-secondary uppercase tracking-[0.1em]">
        GPU Accelerated Matrix Inference
      </div>
    </motion.div>
  );
});

interface VisualCredibilityProps extends VisualProps {
  daysData: any[];
}

const VisualCredibility = React.memo(function VisualCredibility({ active, daysData }: VisualCredibilityProps) {
  if (!active) return null;

  const renderMock = daysData.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-center p-6"
    >
      <div className="grid grid-cols-7 gap-1.5 w-60 opacity-50" aria-label="Commit tracking visual chart">
        {renderMock
          ? Array.from({ length: 49 }).map((_, i) => {
              const activeNode = i % 3 === 0 || i % 7 === 0;
              return (
                <div 
                  key={i} 
                  className={`aspect-square w-full rounded-sm border-[0.5px] border-white/5 ${
                    activeNode ? "bg-accent/30" : "bg-white/[0.02]"
                  }`} 
                />
              );
            })
          : daysData.map((day, i) => {
              const count = day.contributionCount;
              let styleClass = "bg-white/[0.02] border-white/5";
              if (count > 0 && count <= 2) {
                styleClass = "bg-accent/15 border-accent/20";
              } else if (count > 2 && count <= 4) {
                styleClass = "bg-accent/35 border-accent/30";
              } else if (count > 4 && count <= 7) {
                styleClass = "bg-accent/60 border-accent/50 shadow-[0_0_8px_rgba(79,140,255,0.15)]";
              } else if (count > 7) {
                styleClass = "bg-accent/80 border-accent/70 shadow-[0_0_10px_rgba(79,140,255,0.3)]";
              }
              return (
                <div 
                  key={day.date || i} 
                  title={`${day.date}: ${count} commits`}
                  className={`aspect-square w-full rounded-sm border-[0.5px] transition-all duration-500 ${styleClass}`} 
                />
              );
            })
        }
      </div>
      <div className="absolute bottom-6 font-mono text-[9px] text-text-secondary uppercase tracking-[0.1em]">
        {renderMock ? "Verified GitHub Contributions" : "Real GitHub Contributions Active"}
      </div>
    </motion.div>
  );
});

// 7. Principles visualizer sub-component
const VisualLessons = React.memo(function VisualLessons({ active }: VisualProps) {
  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-8 text-left font-mono text-[9px]"
    >
      {/* Principle 1: Users Before Scale */}
      <div className="border border-white/5 rounded-btn p-3 bg-white/[0.005] flex flex-col justify-between">
        <span className="text-accent font-bold">01 // DEMAND</span>
        <div className="flex items-center gap-2 text-white font-semibold my-1 text-[10px]">
          <Activity className="h-3.5 w-3.5 text-accent" />
          <span>User Value</span>
        </div>
        <div className="text-text-muted leading-tight">Focus on active metrics prior to scaling abstractions.</div>
      </div>

      {/* Principle 2: Simple Architectures */}
      <div className="border border-white/5 rounded-btn p-3 bg-white/[0.005] flex flex-col justify-between">
        <span className="text-accent font-bold">02 // ARCH</span>
        <div className="flex items-center gap-2 text-white font-semibold my-1 text-[10px]">
          <Workflow className="h-3.5 w-3.5 text-accent" />
          <span>Simple Flows</span>
        </div>
        <div className="text-text-muted leading-tight">Reduce distributed dependencies; isolate bounds cleanly.</div>
      </div>

      {/* Principle 3: Measure First */}
      <div className="border border-white/5 rounded-btn p-3 bg-white/[0.005] flex flex-col justify-between">
        <span className="text-accent font-bold">03 // METRIC</span>
        <div className="flex items-center gap-2 text-white font-semibold my-1 text-[10px]">
          <Code2 className="h-3.5 w-3.5 text-accent" />
          <span>Profile First</span>
        </div>
        <div className="text-text-muted leading-tight">Validate system bottleneck latencies prior to rewrite loops.</div>
      </div>

      {/* Principle 4: Ship & Improve */}
      <div className="border border-white/5 rounded-btn p-3 bg-white/[0.005] flex flex-col justify-between">
        <span className="text-accent font-bold">04 // LIFECYCLE</span>
        <div className="flex items-center gap-2 text-white font-semibold my-1 text-[10px]">
          <GitBranch className="h-3.5 w-3.5 text-accent" />
          <span>Iterative Release</span>
        </div>
        <div className="text-text-muted leading-tight">Release daily loops to gather real user feedback.</div>
      </div>
    </motion.div>
  );
});

// 8. Final Scene Visualizer (The Movie Credits-Style Ending)
const VisualFinal = React.memo(function VisualFinal({ active }: VisualProps) {
  if (!active) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.35,
            delayChildren: 0.5
          }
        }
      }}
      className="w-full h-full flex flex-col items-center justify-center text-center p-6"
    >
      {/* Title fade in (credits typography) */}
      <motion.h3 
        variants={{
          hidden: { opacity: 0, y: 15, filter: "blur(5px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 0.61, 0.36, 1] } }
        }}
        className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3"
      >
        Let&apos;s Build The Next One.
      </motion.h3>

      <motion.p 
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 0.5, y: 0, transition: { duration: 0.8 } }
        }}
        className="font-body text-xs text-text-secondary mb-10 max-w-xs leading-relaxed"
      >
        Open to engineering roles, collaborations, and challenging software puzzles.
      </motion.p>
      
      {/* Staggered Contact Buttons reveal */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
        }}
        className="flex flex-col gap-2.5 w-48 text-xs font-semibold"
      >
        <a 
          href={`mailto:${profile.email}`} 
          className="glass-strong hover:bg-accent hover:text-black py-3 rounded-pill text-white transition-all duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        >
          <Mail className="h-4 w-4" /> Email Me
        </a>
        <div className="flex gap-2">
          <a 
            href={profile.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1 glass py-2.5 rounded-pill text-text-secondary hover:text-white transition-colors flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
          <a 
            href={profile.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1 glass py-2.5 rounded-pill text-text-secondary hover:text-white transition-colors flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <Linkedin className="h-3.5 w-3.5" /> LinkedIn
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
});
