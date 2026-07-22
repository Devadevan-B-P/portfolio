"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Lightbulb, 
  Map, 
  Cpu, 
  Globe, 
  Eye, 
  Award, 
  BookOpen, 
  ArrowRight,
  Database,
  Terminal,
  Server,
  Layers,
  CheckCircle2,
  Github,
  Mail,
  Linkedin
} from "lucide-react";
import { projects, education, certifications, profile } from "@/lib/data";
import SpotlightCard from "./SpotlightCard";

// Types for chapters
type ChapterId = 
  | "problem" 
  | "blueprint" 
  | "engine" 
  | "network" 
  | "edge" 
  | "credibility" 
  | "lessons" 
  | "final";

export default function EngineeringJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState<ChapterId>("problem");
  const [activeSubStep, setActiveSubStep] = useState<number>(0);

  // Scroll monitoring
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to active chapter
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest < 0.12) {
        setActiveChapter("problem");
      } else if (latest >= 0.12 && latest < 0.25) {
        setActiveChapter("blueprint");
      } else if (latest >= 0.25 && latest < 0.58) {
        setActiveChapter("engine");
        // Sub-steps of Forge AI
        const subProgress = (latest - 0.25) / (0.58 - 0.25);
        if (subProgress < 0.2) setActiveSubStep(0); // Input
        else if (subProgress >= 0.2 && subProgress < 0.4) setActiveSubStep(1); // PRD
        else if (subProgress >= 0.4 && subProgress < 0.6) setActiveSubStep(2); // Architecture
        else if (subProgress >= 0.6 && subProgress < 0.8) setActiveSubStep(3); // Folders
        else setActiveSubStep(4); // Deployment
      } else if (latest >= 0.58 && latest < 0.7) {
        setActiveChapter("network");
      } else if (latest >= 0.7 && latest < 0.82) {
        setActiveChapter("edge");
      } else if (latest >= 0.82 && latest < 0.9) {
        setActiveChapter("credibility");
      } else if (latest >= 0.9 && latest < 0.97) {
        setActiveChapter("lessons");
      } else {
        setActiveChapter("final");
      }
    });
  }, [scrollYProgress]);

  // SVG Drawing progress (height mapped)
  const pathLength = useTransform(scrollYProgress, [0, 0.98], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-[850vh] bg-bg-primary">
      
      {/* DESKTOP VIEW */}
      <div className="hidden md:flex">
        
        {/* Left Side: Sticky Visualizer */}
        <div className="sticky top-0 flex h-screen w-[45%] items-center justify-center border-r border-border-subtle p-12 overflow-hidden bg-bg-primary">
          
          {/* Timeline Node Sidebar (Left margin of the visualizer) */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20">
            <div className="relative w-0.5 h-[320px] bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                style={{ scaleY: pathLength, originY: 0 }}
                className="w-full h-full bg-accent shadow-[0_0_12px_#4f8cff]"
              />
            </div>
            
            {/* Tiny indicator icons on the vertical sidebar line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex flex-col justify-between py-1 pointer-events-none">
              <SidebarDot active={activeChapter === "problem"} icon={Lightbulb} />
              <SidebarDot active={activeChapter === "blueprint"} icon={Map} />
              <SidebarDot active={activeChapter === "engine"} icon={Cpu} />
              <SidebarDot active={activeChapter === "network"} icon={Globe} />
              <SidebarDot active={activeChapter === "edge"} icon={Eye} />
              <SidebarDot active={activeChapter === "credibility"} icon={Award} />
              <SidebarDot active={activeChapter === "lessons"} icon={BookOpen} />
            </div>
          </div>

          {/* Main Visual Display Canvas */}
          <div className="relative w-full h-[70vh] rounded-card border border-border-subtle bg-surface/30 p-8 flex flex-col justify-between overflow-hidden shadow-layered backdrop-blur-md">
            
            {/* Screen bezel corner highlight */}
            <span className="absolute left-3 top-3 h-2 w-2 border-l border-t border-white/20" />
            <span className="absolute right-3 top-3 h-2 w-2 border-r border-t border-white/20" />
            <span className="absolute left-3 bottom-3 h-2 w-2 border-l border-b border-white/20" />
            <span className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-white/20" />
            
            {/* Header Telemetry bar */}
            <div className="flex items-center justify-between border-b border-border-subtle pb-4 text-[10px] uppercase tracking-[0.2em] text-text-muted mono-tag font-mono">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span>SYSTEM DIAGRAM VISUALIZER</span>
              </div>
              <div>STAGE: {activeChapter.toUpperCase()}</div>
            </div>

            {/* Dynamic Stage Renderings */}
            <div className="flex-1 flex items-center justify-center py-6 relative">
              <AnimatePresence mode="wait">
                {activeChapter === "problem" && (
                  <VisualProblem key="problem" />
                )}
                {activeChapter === "blueprint" && (
                  <VisualBlueprint key="blueprint" />
                )}
                {activeChapter === "engine" && (
                  <VisualForgeAI key="engine" step={activeSubStep} />
                )}
                {activeChapter === "network" && (
                  <VisualNetwork key="network" />
                )}
                {activeChapter === "edge" && (
                  <VisualEdge key="edge" />
                )}
                {activeChapter === "credibility" && (
                  <VisualCredibility key="credibility" />
                )}
                {activeChapter === "lessons" && (
                  <VisualLessons key="lessons" />
                )}
                {activeChapter === "final" && (
                  <VisualFinal key="final" />
                )}
              </AnimatePresence>
            </div>

            {/* Footer Telemetry bar */}
            <div className="border-t border-border-subtle pt-3 flex items-center justify-between text-[9px] text-text-muted mono-tag font-mono">
              <span>RESOLUTION: VEC_CANVAS_0.4</span>
              <span>RENDER: GPU_ACCELERATED</span>
            </div>
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

          {/* Stage 7: Lessons Learned */}
          <section className="min-h-[100vh] flex flex-col justify-center py-[20vh]">
            <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">07 // Philosophy</span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-6">
              Lessons Learned
            </h2>
            <p className="font-body text-base leading-relaxed text-text-secondary max-w-xl mb-8">
              Building autonomous platforms like Forge AI and managing local computer vision architectures has reshaped my perspective on software development.
            </p>
          </section>

          {/* Stage 8: Final Scene */}
          <section id="contact" className="min-h-[100vh] flex flex-col justify-center py-[20vh]">
            {/* Minimal spacing, text CTA is revealed by visual final node */}
          </section>
        </div>
      </div>


      {/* MOBILE VIEW (Simplified vertical timeline) */}
      <div className="md:hidden px-6 py-20 flex flex-col gap-16 relative">
        <div className="absolute left-10 top-24 bottom-24 w-0.5 bg-white/5" />

        {/* mobile items mapping */}
        <div className="relative pl-12 space-y-20">
          
          {/* Mobile Node 1 */}
          <MobileSection title="01 // The Problem" icon={Lightbulb}>
            <p className="font-body text-sm leading-relaxed text-text-secondary">
              Mapping complex requirements into clean architectural folder structures to bypass engineering bottlenecks.
            </p>
          </MobileSection>

          {/* Mobile Node 2 */}
          <MobileSection title="02 // The Blueprint" icon={Map}>
            <p className="font-body text-sm leading-relaxed text-text-secondary">
              Designing relational database schemas, microservice APIs, and secure deployment maps prior to code synthesis.
            </p>
          </MobileSection>

          {/* Mobile Node 3: Forge AI */}
          <MobileSection title="03 // Forge AI (Flagship)" icon={Cpu} highlighted>
            <div className="space-y-4">
              <p className="font-body text-sm leading-relaxed text-text-secondary font-medium">
                An autonomous coding engine converting natural text requirements to production-ready deployed apps.
              </p>
              <div className="border-l border-accent/20 pl-4 space-y-3 py-1">
                <MobileStep title="User Input" desc='forge create app "CRM platform"' />
                <MobileStep title="PRD Generation" desc="Extracting features, data boundaries" />
                <MobileStep title="Architecture" desc="Generating schemas & routing maps" />
                <MobileStep title="Code Synthesis" desc="Writing React files & API models" />
                <MobileStep title="Deployment" desc="Building Docker, shipping to AWS" />
              </div>
            </div>
          </MobileSection>

          {/* Mobile Node 4 */}
          <MobileSection title="04 // The Network" icon={Globe}>
            <p className="font-body text-sm leading-relaxed text-text-secondary">
              Integrating real-time geocoding WebSockets (Civic Reporting System) and transactional PostgreSQL engines (E-Commerce Platform).
            </p>
          </MobileSection>

          {/* Mobile Node 5 */}
          <MobileSection title="05 // The Edge" icon={Eye}>
            <p className="font-body text-sm leading-relaxed text-text-secondary">
              Accelerating computer vision inference frames directly in GPU/CUDA buffers, yielding real-time YOLOv8 speeds.
            </p>
          </MobileSection>

          {/* Mobile Node 6 */}
          <MobileSection title="06 // Credibility" icon={Award}>
            <div className="space-y-3">
              <div className="border border-border-subtle bg-card rounded-btn p-4">
                <span className="mono-tag text-[9px] text-accent font-semibold block uppercase">ICT ACADEMY OF KERALA</span>
                <p className="font-display text-sm font-semibold text-white mt-1">AWS Fundamentals Internship</p>
              </div>
              <div className="border border-border-subtle bg-card rounded-btn p-4">
                <span className="mono-tag text-[9px] text-accent font-semibold block uppercase">GOOGLE CLOUD</span>
                <p className="font-display text-sm font-semibold text-white mt-1">Prompt Design in Vertex AI</p>
              </div>
            </div>
          </MobileSection>

          {/* Mobile Node 7 */}
          <MobileSection title="07 // Lessons Learned" icon={BookOpen}>
            <ul className="space-y-2 text-xs text-text-secondary font-body">
              <li>• Prompt engineering is not enough: code structure determines stability.</li>
              <li>• Latency is user retention: local GPU memory handling improves frame throughput.</li>
              <li>• Deploy and monitor continuously: automation must be verified.</li>
            </ul>
          </MobileSection>

          {/* Mobile Node 8: Final Scene */}
          <div className="pt-8">
            <h3 className="font-display text-3xl font-semibold tracking-tight text-white mb-2">Let&apos;s Build The Next One.</h3>
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
        </div>
      </div>
    </div>
  );
}

// Subcomponents

function SidebarDot({ active, icon: Icon }: { active: boolean; icon: any }) {
  return (
    <div 
      className={`h-7 w-7 rounded-full flex items-center justify-center border transition-all duration-500 bg-bg-primary ${
        active 
          ? "border-accent text-accent shadow-[0_0_10px_rgba(79,140,255,0.4)] scale-110" 
          : "border-white/10 text-text-muted"
      }`}
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative"
    >
      <div 
        className={`absolute -left-[54px] top-0 h-9 w-9 rounded-full flex items-center justify-center border bg-bg-primary ${
          highlighted ? "border-accent text-accent" : "border-white/10 text-white/60"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="font-display text-lg font-semibold text-white mb-2">{title}</h3>
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

/* LEFT PANEL VISUAL SUB-COMPONENTS */

// 1. Discovery/Problem Visualizer
function VisualProblem() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <svg className="w-56 h-56" viewBox="0 0 200 200">
        {/* Chaotic input lines */}
        <motion.path 
          d="M 10 50 Q 70 80, 100 100" 
          stroke="rgba(255,255,255,0.08)" 
          strokeWidth="1.5" 
          fill="none" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />
        <motion.path 
          d="M 10 100 Q 50 110, 100 100" 
          stroke="rgba(255,255,255,0.08)" 
          strokeWidth="1.5" 
          fill="none" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8 }}
        />
        <motion.path 
          d="M 10 150 Q 60 120, 100 100" 
          stroke="rgba(255,255,255,0.08)" 
          strokeWidth="1.5" 
          fill="none" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2 }}
        />
        
        {/* Filtering node */}
        <circle cx="100" cy="100" r="14" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <motion.circle 
          cx="100" 
          cy="100" 
          r="8" 
          fill="#4f8cff" 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Output target line */}
        <motion.path 
          d="M 108 100 H 190" 
          stroke="#4f8cff" 
          strokeWidth="2" 
          strokeDasharray="4 2"
          fill="none" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        
        <circle cx="190" cy="100" r="4" fill="#4f8cff" />
      </svg>
      <div className="absolute bottom-6 font-mono text-[9px] text-text-secondary uppercase tracking-[0.1em]">
        Filtering user requests into scope
      </div>
    </motion.div>
  );
}

// 2. Blueprint/Architecture Design Visualizer
function VisualBlueprint() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <div className="grid grid-cols-3 gap-6 w-72 text-center text-[10px] font-mono text-text-secondary">
        <div className="border border-white/10 rounded px-2 py-3 bg-white/[0.01]">
          <span>CLIENT</span>
          <div className="mt-1 h-0.5 bg-white/10 w-full" />
          <div className="mt-2 text-[8px] text-text-muted">React APP</div>
        </div>
        <div className="border border-accent/20 rounded px-2 py-3 bg-accent/5 flex flex-col justify-between">
          <span className="text-accent">API GATEWAY</span>
          <div className="mt-1 h-0.5 bg-accent/20 w-full" />
          <div className="mt-2 text-[8px] text-accent">FastAPI</div>
        </div>
        <div className="border border-white/10 rounded px-2 py-3 bg-white/[0.01]">
          <span>DB CLUSTER</span>
          <div className="mt-1 h-0.5 bg-white/10 w-full" />
          <div className="mt-2 text-[8px] text-text-muted">PostgreSQL</div>
        </div>
      </div>
      
      <svg className="absolute w-72 h-32 pointer-events-none" viewBox="0 0 288 128">
        {/* Gateway connection lines */}
        <motion.path 
          d="M 96 64 H 192" 
          stroke="#4f8cff" 
          strokeWidth="1.5" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2 }}
        />
        <motion.path 
          d="M 96 64 C 144 64, 144 64, 192 64" 
          stroke="#4f8cff" 
          strokeWidth="1.5" 
          fill="none" 
        />
      </svg>
      
      <div className="absolute bottom-6 font-mono text-[9px] text-text-secondary uppercase tracking-[0.1em]">
        System Flow Blueprint Mapping
      </div>
    </motion.div>
  );
}

// 3. Forge AI Visualizer (Deep-dive dynamic stages)
function VisualForgeAI({ step }: { step: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-sm rounded-btn border border-border-subtle bg-bg-secondary p-4 font-mono text-xs text-text-secondary">
        
        {/* Dynamic content depending on scroll-guided step */}
        {step === 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[10px] text-text-muted">
              <span>USER_PROMPT_INTAKE</span>
              <span>INPUT.TXT</span>
            </div>
            <div className="border border-white/5 rounded p-2.5 bg-white/[0.01] text-accent">
              &gt; forge create app &quot;Automated task tracker with a clean PostgreSQL db connection&quot;
            </div>
            <div className="text-[10px] text-text-muted animate-pulse">
              Parsing request dependencies...
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] text-accent">
              <span>PRODUCT_REQUIREMENTS_DOCUMENT</span>
              <span>PRD.MD</span>
            </div>
            <div className="border border-white/5 rounded p-2.5 bg-white/[0.01] space-y-1.5 text-[10px] text-text-secondary">
              <div className="text-white font-semibold">1. SYSTEM SCOPE:</div>
              <div>• User Auth (JWT token mapping)</div>
              <div>• Task entity (id, title, status, timestamp)</div>
              <div>• Relational Task-to-User schema boundaries</div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] text-text-muted">
              <span>SYSTEM_ARCHITECTURE_MAP</span>
              <span>TOPOLOGY.JSON</span>
            </div>
            <div className="border border-white/5 rounded p-2 bg-white/[0.01] text-[10px] space-y-1 text-text-muted">
              <div><span className="text-white">FRONTEND:</span> Next.js (Tailwind & Framer)</div>
              <div><span className="text-white">BACKEND:</span> Python FastAPI</div>
              <div><span className="text-white">DATABASES:</span> PostgreSQL (SQLAlchemy ORM)</div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] text-text-muted">
              <span>CODEBASE_FOLDER_GENERATOR</span>
              <span>WORKSPACE/</span>
            </div>
            <div className="border border-white/5 rounded p-2 bg-white/[0.01] text-[10px] font-mono text-text-secondary space-y-1">
              <div className="text-accent">📁 src/</div>
              <div className="pl-3 text-accent">📁 components/</div>
              <div className="pl-6 text-text-muted">📄 TaskBoard.tsx</div>
              <div className="pl-3 text-accent">📁 api/</div>
              <div className="pl-6 text-text-muted">📄 routes.py</div>
              <div className="pl-3 text-text-muted">📄 docker-compose.yml</div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[10px] text-green-400">
              <span>DEPLOYMENT_STATUS</span>
              <span>SUCCESS</span>
            </div>
            <div className="border border-white/5 rounded p-2 bg-white/[0.01] text-[10px] space-y-1">
              <div className="flex items-center gap-1.5 text-text-secondary">
                <CheckCircle2 className="h-3 w-3 text-green-400" />
                <span>Docker containers verified.</span>
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <CheckCircle2 className="h-3 w-3 text-green-400" />
                <span>Provisioned AWS EC2/S3 instance targets.</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-6 font-mono text-[9px] text-text-secondary uppercase tracking-[0.1em]">
        Forge AI Generation Steps
      </div>
    </motion.div>
  );
}

// 4. Network/Fullstack Visualizer
function VisualNetwork() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center p-6"
    >
      <div className="border border-white/10 rounded-btn p-4 bg-bg-secondary w-64 text-[10px] font-mono text-text-secondary">
        <div className="border-b border-white/10 pb-2 mb-2 flex items-center justify-between text-accent font-semibold">
          <span>TABLE: tasks</span>
          <Database className="h-3.5 w-3.5" />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span>id</span>
            <span className="text-text-muted">UUID (PK)</span>
          </div>
          <div className="flex justify-between">
            <span>user_id</span>
            <span className="text-text-muted">UUID (FK)</span>
          </div>
          <div className="flex justify-between">
            <span>title</span>
            <span className="text-text-muted">VARCHAR(255)</span>
          </div>
          <div className="flex justify-between">
            <span>status</span>
            <span className="text-text-muted">VARCHAR(50)</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 font-mono text-[9px] text-text-secondary uppercase tracking-[0.1em]">
        Relational Schema Constraints
      </div>
    </motion.div>
  );
}

// 5. Edge AI / Computer Vision Visualizer
function VisualEdge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <div className="relative border border-white/10 w-72 h-44 rounded-btn overflow-hidden bg-[#050505] flex items-center justify-center">
        {/* grid wireframe overlay */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-20">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/30" />
          ))}
        </div>
        
        {/* Bounding box mock */}
        <div className="relative border-2 border-accent/80 rounded h-28 w-28 flex flex-col justify-between p-1.5 shadow-[0_0_15px_rgba(79,140,255,0.2)]">
          <span className="absolute -left-1 -top-1 h-2.5 w-2.5 border-l-2 border-t-2 border-accent" />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 border-r-2 border-t-2 border-accent" />
          <span className="absolute -left-1 -bottom-1 h-2.5 w-2.5 border-l-2 border-b-2 border-accent" />
          <span className="absolute -right-1 -bottom-1 h-2.5 w-2.5 border-r-2 border-b-2 border-accent" />
          
          <div className="mono-tag text-[8px] bg-accent text-[#050505] font-bold px-1 py-0.5 rounded-sm w-max uppercase">
            person: 99.2%
          </div>
          
          <div className="mono-tag text-[8px] text-accent/80 text-right self-end">
            TRACKING: OK
          </div>
        </div>

        {/* Telemetry info */}
        <div className="absolute top-2 right-2 text-[8px] font-mono text-white/50 flex flex-col items-end">
          <span>FPS: 60.0</span>
          <span>LATENCY: 12ms</span>
          <span className="text-accent">INFERENCE: CUDA</span>
        </div>
      </div>
      <div className="absolute bottom-6 font-mono text-[9px] text-text-secondary uppercase tracking-[0.1em]">
        GPU Accelerated Matrix Inference
      </div>
    </motion.div>
  );
}

// 6. Credibility / Proof Visualizer
function VisualCredibility() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center p-6"
    >
      <div className="grid grid-cols-7 gap-1 w-64 opacity-60">
        {Array.from({ length: 49 }).map((_, i) => {
          // Mock a github contribution heat map
          const active = i % 3 === 0 || i % 7 === 0;
          return (
            <div 
              key={i} 
              className={`aspect-square w-full rounded-sm border-[0.5px] border-white/5 ${
                active ? "bg-accent/40" : "bg-white/[0.03]"
              }`} 
            />
          );
        })}
      </div>
      <div className="absolute bottom-6 font-mono text-[9px] text-text-secondary uppercase tracking-[0.1em]">
        Verified GitHub Contributions
      </div>
    </motion.div>
  );
}

// 7. Lessons Learned Visualizer
function VisualLessons() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-start justify-center p-12 text-left"
    >
      <div className="space-y-4 font-mono text-[10px] leading-relaxed text-text-secondary">
        <div>
          <span className="text-accent font-bold"># LESSON_01 //</span>
          <p className="text-white mt-1 text-xs font-semibold">Prompt engineering is not enough.</p>
          <span className="text-text-muted">A project requires structural constraints, static typing, and schema validation.</span>
        </div>
        <div>
          <span className="text-accent font-bold"># LESSON_02 //</span>
          <p className="text-white mt-1 text-xs font-semibold">System latency determines user retention.</p>
          <span className="text-text-muted">Optimizing parallel buffers and indexing is critical for interactive systems.</span>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] text-text-secondary uppercase tracking-[0.1em]">
        Engineering Wisdom Metrics
      </div>
    </motion.div>
  );
}

// 8. Final Scene Visualizer
function VisualFinal() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center text-center p-6"
    >
      <h3 className="font-display text-3xl font-semibold tracking-tight text-white mb-2">Let&apos;s Build The Next One.</h3>
      <p className="font-body text-xs text-text-secondary mb-8 max-w-xs">
        Open to full-stack AI roles, internships, and complex system engineering problems.
      </p>
      
      <div className="flex flex-col gap-3 w-48 text-xs font-semibold">
        <a 
          href={`mailto:${profile.email}`} 
          className="glass-strong hover:bg-accent hover:text-black py-3 rounded-pill text-white transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Mail className="h-4 w-4" /> Email Me
        </a>
        <div className="flex gap-2">
          <a 
            href={profile.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1 glass py-2.5 rounded-pill text-text-secondary hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
          <a 
            href={profile.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1 glass py-2.5 rounded-pill text-text-secondary hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <Linkedin className="h-3.5 w-3.5" /> LinkedIn
          </a>
        </div>
      </div>
    </motion.div>
  );
}
