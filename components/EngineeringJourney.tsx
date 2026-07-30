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
  CheckCircle2,
  Github,
  Mail,
  Linkedin,
  FileText,
  Workflow,
  Code2,
  FolderOpen,
  CloudLightning,
  Play,
  RotateCcw,
  Maximize2,
  Activity,
  Layers,
  ArrowRight,
  Database
} from "lucide-react";
import { projects, education, profile, chapters, principles, ChapterId } from "@/lib/data";
import { useJourneyProgress } from "@/lib/useJourneyProgress";
import { usePageTransition } from "./PageTransition";
import SpotlightCard from "./SpotlightCard";

interface VisualProps {
  active: boolean;
}

export default function EngineeringJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { triggerTransition } = usePageTransition();
  const [githubDays, setGithubDays] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);
  
  // Forge AI expandable section tracking
  const [activeForgeSection, setActiveForgeSection] = useState<string>("requirement");

  const handleEmail = () => {
    const email = profile.email;
    const subject = encodeURIComponent("Portfolio Inquiry");
    const body = encodeURIComponent(
      `Hi Devad,\n\nI came across your portfolio and would like to connect.\n\nBest regards,\n`
    );

    const isGmail = typeof navigator !== "undefined" && navigator.userAgent.includes("Chrome");
    if (isGmail) {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`,
        "_blank"
      );
    } else {
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

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
  const { activeChapter, progress, isDesktop } = useJourneyProgress(scrollYProgress);

  // SVG Drawing progress (height mapped)
  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  // Cinematic "Final Scene" Fadeout of surrounding UI elements:
  const uiOpacity = useTransform(scrollYProgress, [0.93, 0.96], [1, 0]);

  // Sync scroll progress to active forge-ai section automatically if user hasn't selected manually
  useEffect(() => {
    if (activeChapter === "forge-ai") {
      // Divide the chapter scroll progress range [0.25, 0.58] into sub-steps
      const stepIndex = Math.min(Math.floor((progress - 0.25) / (0.33 / 7)), 6);
      const sections = ["requirement", "prd", "architecture", "techstack", "folders", "deployment", "live-diagram"];
      if (sections[stepIndex]) {
        setActiveForgeSection(sections[stepIndex]);
      }
    }
  }, [progress, activeChapter]);

  return (
    <div ref={containerRef} className={`relative bg-black ${isDesktop ? "min-h-[850vh]" : "min-h-0"}`}>
      
      {/* DESKTOP VIEW */}
      {isDesktop ? (
        <>
          <div className="flex">
          
          {/* Left Side: Sticky Visualizer */}
          <motion.div 
            style={{ opacity: uiOpacity }}
            className="sticky top-0 flex h-screen w-[45%] items-center justify-center border-r border-white/5 p-12 overflow-hidden bg-black"
          >
          
          {/* Evolving SVG Timeline Sidebar */}
          <motion.div 
            style={{ opacity: uiOpacity }}
            className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20 pointer-events-none"
          >
            <div className="relative w-6 h-[320px] flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 24 320" fill="none">
                {/* Background Line */}
                <path d="M 12 0 V 320" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                {/* Dynamic Scrolling Path */}
                <motion.path 
                  d="M 12 0 V 320" 
                  stroke="#4f8cff" 
                  strokeWidth="2" 
                  style={{ pathLength }}
                  className="drop-shadow-[0_0_8px_#4f8cff]"
                />
                
                {/* Evolving Curve when Forge AI is active */}
                {activeChapter === "forge-ai" && (
                  <motion.path
                    d="M 12 80 C 22 90, 24 100, 24 120 C 24 140, 22 150, 12 160"
                    stroke="#4f8cff"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
                
                {/* Evolving branching node when Systems is active */}
                {activeChapter === "systems" && (
                  <motion.path
                    d="M 12 160 C 2 170, 0 180, 0 200 C 0 220, 2 230, 12 240"
                    stroke="#4f8cff"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </svg>
            </div>
            
            {/* Dynamic sidebar indicators */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex flex-col justify-between py-1 pointer-events-auto">
              {chapters.slice(0, 7).map((ch) => {
                let Icon = Lightbulb;
                if (ch.id === "blueprint") Icon = MapIcon;
                else if (ch.id === "forge-ai") Icon = Cpu;
                else if (ch.id === "systems") Icon = Globe;
                else if (ch.id === "edge-ai") Icon = Eye;
                else if (ch.id === "impact") Icon = Award;
                else if (ch.id === "lessons-learned") Icon = BookOpen;

                return (
                  <SidebarDot 
                    key={ch.id} 
                    active={activeChapter === ch.id} 
                    icon={Icon} 
                    label={ch.label}
                    onClick={() => {
                      if ((window as any).lenis) {
                        // Scroll to respective chapter range start
                        const scrollRatio = ch.range[0];
                        const container = containerRef.current;
                        if (container) {
                          const scrollStart = container.offsetTop;
                          const scrollHeight = container.clientHeight - window.innerHeight;
                          (window as any).lenis.scrollTo(scrollStart + (scrollRatio * scrollHeight));
                        }
                      }
                    }}
                  />
                );
              })}
            </div>
          </motion.div>

          {/* Main Visual Display Canvas */}
          <div className="relative w-full h-[70vh] rounded-card border border-white/5 bg-white/[0.01] p-8 flex flex-col justify-between overflow-hidden shadow-layered backdrop-blur-sm">
            
            {/* Screen bezel HUD highlights */}
            <motion.span style={{ opacity: uiOpacity }} className="absolute left-3 top-3 h-2 w-2 border-l border-t border-white/10 pointer-events-none" />
            <motion.span style={{ opacity: uiOpacity }} className="absolute right-3 top-3 h-2 w-2 border-r border-t border-white/10 pointer-events-none" />
            <motion.span style={{ opacity: uiOpacity }} className="absolute left-3 bottom-3 h-2 w-2 border-l border-b border-white/10 pointer-events-none" />
            <motion.span style={{ opacity: uiOpacity }} className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-white/10 pointer-events-none" />
            
            {/* Header Telemetry bar */}
            <motion.div 
              style={{ opacity: uiOpacity }}
              className="flex items-center justify-between border-b border-white/5 pb-4 text-[10px] uppercase tracking-[0.2em] text-text-muted mono-tag font-mono pointer-events-none"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span>SYSTEM DIAGRAM VISUALIZER</span>
              </div>
              <div>STAGE: {activeChapter.toUpperCase()}</div>
            </motion.div>

            {/* Dynamic Stage Renderings */}
            <div className="flex-1 flex items-center justify-center py-6 relative min-h-0">
              <AnimatePresence mode="wait">
                {activeChapter === "problem" && (
                  <VisualProblem key="problem" active={activeChapter === "problem"} />
                )}
                {activeChapter === "blueprint" && (
                  <VisualBlueprint key="blueprint" active={activeChapter === "blueprint"} />
                )}
                {activeChapter === "forge-ai" && (
                  <VisualForgeAI key="forge-ai" activeSection={activeForgeSection} active={activeChapter === "forge-ai"} />
                )}
                {activeChapter === "systems" && (
                  <VisualSystems key="systems" active={activeChapter === "systems"} />
                )}
                {activeChapter === "edge-ai" && (
                  <VisualEdgeAI key="edge-ai" active={activeChapter === "edge-ai"} />
                )}
                {activeChapter === "impact" && (
                   <VisualImpact key="impact" active={activeChapter === "impact"} daysData={githubDays} />
                 )}
                {activeChapter === "lessons-learned" && (
                  <VisualLessons key="lessons" active={activeChapter === "lessons-learned"} />
                )}
              </AnimatePresence>
            </div>

            {/* Footer Telemetry bar */}
            <motion.div 
              style={{ opacity: uiOpacity }}
              className="border-t border-white/5 pt-3 flex items-center justify-between text-[9px] text-text-muted mono-tag font-mono pointer-events-none"
            >
              <span>RESOLUTION: ENGINE_CANVAS_v2.0</span>
              <span>RENDER: GPU_ACCELERATED_60FPS</span>
            </motion.div>
          </div>
          </motion.div>

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
              <div className="mt-8 border-t border-white/5 pt-4 flex gap-8 text-[10px] text-accent font-mono mono-tag">
                <div>[INTERACTION: CLICK RED CONGESTED NODES TO CLEAR PIPELINE]</div>
              </div>
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
              <div className="mt-8 border-t border-white/5 pt-4 flex gap-8 text-[10px] text-accent font-mono mono-tag">
                <div>[INTERACTION: CHOOSE COMPONENT NODES TO INSPECT RESPONSIBILITIES]</div>
              </div>
            </section>

            {/* Stage 3: Forge AI Flagship Chapter */}
            <div id="forge-ai" className="border-l border-white/5 pl-8 ml-[-32px] my-10 space-y-10">
              
              {/* Step 3.1: Forge Intro */}
              <section className="min-h-[90vh] flex flex-col justify-center py-[15vh]">
                <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">03.1 // Flagship Project</span>
                <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-4">
                  Forge AI: The Centerpiece
                </h2>
                <p className="mono-tag text-sm uppercase tracking-wide text-text-muted mb-6">
                  Autonomous Software Engineer Agent
                </p>
                <p className="font-body text-base leading-relaxed text-text-secondary max-w-xl mb-6">
                  Forge AI is the flagship case study of this portfolio. It is an agent system designed to solve a critical question: Can we automate the entire pipeline of building and deploying full-stack apps from a prompt?
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[0].tech.map((t) => (
                    <span key={t} className="mono-tag rounded-pill border border-white/10 px-3 py-1 text-[11px] text-text-secondary bg-white/[0.02]">
                      {t}
                    </span>
                  ))}
                </div>
              </section>

              {/* Accordion content sections for Forge AI */}
              <div className="space-y-4 max-w-xl pb-[10vh]">
                <ForgeAccordionItem 
                  id="requirement" 
                  title="User Requirement Ingest" 
                  active={activeForgeSection === "requirement"}
                  onClick={() => setActiveForgeSection("requirement")}
                >
                  <p className="text-xs leading-relaxed text-text-secondary font-mono mb-2">
                    INPUT QUERY:
                  </p>
                  <pre className="text-[10px] bg-white/[0.02] border border-white/5 p-3 rounded font-mono text-white leading-normal">
                    "Build a real-time collaborative whiteboard app with document sync, secure sharing, and database history."
                  </pre>
                </ForgeAccordionItem>

                <ForgeAccordionItem 
                  id="prd" 
                  title="Product Requirements Document (PRD)" 
                  active={activeForgeSection === "prd"}
                  onClick={() => setActiveForgeSection("prd")}
                >
                  <div className="text-[10px] leading-relaxed font-mono space-y-2 text-text-secondary bg-white/[0.02] border border-white/5 p-3 rounded h-40 overflow-y-auto">
                    <p className="text-white font-semibold">1. SYSTEM FUNCTIONAL REQUIREMENTS</p>
                    <p>• Draw canvas updates must sync to connected users within &lt;50ms.</p>
                    <p>• Documents must support UUID parameters and auth security scopes.</p>
                    <p>• Retain modification changes as chronological snapshots in DB.</p>
                    <p className="text-white font-semibold mt-2">2. DATA SCHEMAS</p>
                    <p>• user: {`{ id: UUID, email: string, auth: JWT }`}</p>
                    <p>• document: {`{ id: UUID, owner_id: UUID, stroke_history: JSONB }`}</p>
                  </div>
                </ForgeAccordionItem>

                <ForgeAccordionItem 
                  id="architecture" 
                  title="System Architecture Diagram" 
                  active={activeForgeSection === "architecture"}
                  onClick={() => setActiveForgeSection("architecture")}
                >
                  <div className="text-[10px] leading-relaxed font-mono text-text-secondary bg-white/[0.02] border border-white/5 p-3 rounded space-y-1.5">
                    <div><span className="text-accent font-semibold">NEXT.JS CLIENT</span>: Sends draw events via Socket.io.</div>
                    <div><span className="text-accent font-semibold">CADDY PROXY</span>: Routes SSL/API requests.</div>
                    <div><span className="text-accent font-semibold">FASTAPI BACKEND</span>: Auth routes, document logs.</div>
                    <div><span className="text-accent font-semibold">REDIS ENDPOINT</span>: Pub/Sub broker for collaboration.</div>
                    <div><span className="text-accent font-semibold">POSTGRES DB</span>: Permanent document snapshot stores.</div>
                  </div>
                </ForgeAccordionItem>

                <ForgeAccordionItem 
                  id="techstack" 
                  title="Tech Stack Integration" 
                  active={activeForgeSection === "techstack"}
                  onClick={() => setActiveForgeSection("techstack")}
                >
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-text-secondary bg-white/[0.02] border border-white/5 p-3 rounded">
                    <div>• Next.js Client Engine</div>
                    <div>• FastAPI Gateway</div>
                    <div>• Socket.io Connection API</div>
                    <div>• PostgreSQL DB Schema</div>
                    <div>• Redis Key Cache Store</div>
                    <div>• Docker Cluster Compose</div>
                  </div>
                </ForgeAccordionItem>

                <ForgeAccordionItem 
                  id="folders" 
                  title="Code Folder Structure Layout" 
                  active={activeForgeSection === "folders"}
                  onClick={() => setActiveForgeSection("folders")}
                >
                  <pre className="text-[9px] leading-normal text-text-secondary bg-white/[0.02] border border-white/5 p-3 rounded font-mono h-40 overflow-y-auto">
{`collaborative-whiteboard/
├── client/
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Collaboration tools
│   │   └── hooks/           # WebSockets hooks
│   ├── Dockerfile
│   └── package.json
├── server/
│   ├── app/
│   │   ├── api/             # HTTP endpoints
│   │   ├── websocket/       # WS broadcast
│   │   └── main.py          # FastAPI startup
│   ├── Dockerfile
│   └── requirements.txt
├── Caddyfile
└── docker-compose.yml`}
                  </pre>
                </ForgeAccordionItem>

                <ForgeAccordionItem 
                  id="deployment" 
                  title="AWS DevOps Deployment Plan" 
                  active={activeForgeSection === "deployment"}
                  onClick={() => setActiveForgeSection("deployment")}
                >
                  <div className="text-[10px] leading-relaxed font-mono text-text-secondary bg-white/[0.02] border border-white/5 p-3 rounded space-y-1.5">
                    <div>1. Launch AWS EC2 node with micro computing limits.</div>
                    <div>2. Open security ingress routing on 80/443 (HTTP/S) and 22 (SSH).</div>
                    <div>3. Clone and write environment variables configuration.</div>
                    <div>4. Run container stack build command: docker-compose up --build -d.</div>
                    <div>5. Automatic Let's Encrypt SSL resolves domains seamlessly.</div>
                  </div>
                </ForgeAccordionItem>

                <ForgeAccordionItem 
                  id="live-diagram" 
                  title="Interactive Agent Topology Diagram" 
                  active={activeForgeSection === "live-diagram"}
                  onClick={() => setActiveForgeSection("live-diagram")}
                >
                  <p className="text-[10px] font-mono leading-relaxed text-text-secondary">
                    Review the system layout details in the visual canvas on the left. Interact directly with nodes to display detailed routing descriptions and logs.
                  </p>
                </ForgeAccordionItem>
              </div>
            </div>

            {/* Stage 4: Systems (Full-Stack Systems) */}
            <section className="min-h-[100vh] flex flex-col justify-center py-[20vh]">
              <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">04 // Systems</span>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-6">
                Systems Architecture
              </h2>
              <p className="font-body text-base lg:text-lg leading-relaxed text-text-secondary max-w-xl mb-6">
                Systems architecture is about managing data flow. In my projects, like the <span className="text-white font-medium">Civic Issue Reporting System</span> and the <span className="text-white font-medium">E-Commerce Microservices</span>, database structure and network design determine success.
              </p>
              <p className="font-body text-sm leading-relaxed text-text-muted max-w-xl">
                I implement real-time WebSockets to synchronize client dashboards with active MongoDB geo-clusters and ensure PostgreSQL indexes are tuned for high-volume transactions under complex database schemas.
              </p>
              <div className="mt-8 border-t border-white/5 pt-4 flex gap-8 text-[10px] text-accent font-mono mono-tag">
                <div>[INTERACTION: TOGGLE SCHEMAS TO COMPARE LATENCY AND CACHE ADVANTAGES]</div>
              </div>
            </section>

            {/* Stage 5: Edge AI (Vision & Processing) */}
            <section className="min-h-[100vh] flex flex-col justify-center py-[20vh]">
              <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">05 // Edge AI</span>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-6">
                Edge AI
              </h2>
              <p className="font-body text-base lg:text-lg leading-relaxed text-text-secondary max-w-xl mb-6">
                Deploying computer vision models requires minimizing latencies at the hardware level. Building the <span className="text-white font-medium">Real-Time Object Detector</span> meant bridging PyTorch and YOLOv8 with local CUDA acceleration.
              </p>
              <p className="font-body text-sm leading-relaxed text-text-muted max-w-xl">
                By offloading frame arrays directly to NVIDIA GPU memory buffers, the system bypasses bottlenecking host CPU-to-device transfers, rendering inference matrices at solid 60 FPS feeds.
              </p>
              <div className="mt-8 border-t border-white/5 pt-4 flex gap-8 text-[10px] text-accent font-mono mono-tag">
                <div>[INTERACTION: SLIDE INFERENCE CONFIDENCE TO FILTER ARTIFACTS]</div>
              </div>
            </section>

            {/* Stage 6: Impact */}
            <section className="min-h-[100vh] flex flex-col justify-center py-[20vh]">
              <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-3">06 // Impact</span>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-8">
                Impact & Credentials
              </h2>
              <div className="grid gap-6 w-full max-w-xl">
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
                      <span key={c} className="mono-tag text-[9px] border border-white/10 rounded-pill px-2 py-0.5 text-text-secondary">
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
              <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-8">
                Lessons Learned
              </h2>
              <div className="space-y-8 max-w-xl">
                {principles.map((pr, idx) => (
                  <div key={idx} className="border-l-2 border-white/5 pl-4 hover:border-accent/40 transition-colors duration-300">
                    <h3 className="font-display text-base font-semibold text-white mb-1.5">{pr.title}</h3>
                    <p className="font-body text-xs text-text-secondary leading-relaxed">{pr.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-white/5 pt-4 flex gap-8 text-[10px] text-accent font-mono mono-tag">
                <div>[INTERACTION: CHOOSE DASHBOARD BLOCKS ON LEFT CANVAS TO FLIP FOR TRADEOFF ANALYSIS]</div>
              </div>
            </section>
          </div>
        </div>

        {/* Stage 8: Full-Width Cinematic Final Scene */}
        <section id="contact" className="min-h-screen w-full relative flex flex-col justify-center items-center py-20 px-6 md:px-12 lg:px-16 bg-black overflow-hidden border-t border-white/5">
          {/* Central glowing SVG final node */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-80 h-80 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.15, 0.35, 0.15]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-64 h-64 rounded-full bg-accent/10 blur-[60px]"
              />
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
                {/* Glowing terminal node */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="6"
                  fill="#4f8cff"
                  animate={{
                    r: [5, 7, 5],
                    filter: ["drop-shadow(0 0 6px #4f8cff)", "drop-shadow(0 0 14px #4f8cff)", "drop-shadow(0 0 6px #4f8cff)"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-xl text-center">
            <span className="mono-tag text-xs uppercase tracking-[0.2em] text-accent mb-4">
              08 // Final Scene
            </span>

            <h2 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tight text-gradient mb-6">
              Let&apos;s Build The Next One.
            </h2>

            <p className="font-body text-xs lg:text-sm text-text-secondary mb-12 max-w-md leading-relaxed tracking-wide">
              I develop products that bring order to system complexity. View my complete portfolio archives and labs catalog to inspect implementation files.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
              <button
                onClick={() => triggerTransition("/engineering-archive")}
                className="glass-strong bg-white/5 border border-accent/40 px-8 py-4 rounded-pill text-white text-xs uppercase tracking-wider font-semibold hover:bg-accent hover:text-black transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-glow"
              >
                Explore My Engineering Work
              </button>
            </div>

            <div className="flex justify-center gap-6 mt-12 text-xs font-semibold">
              <button
                onClick={handleEmail}
                className="text-text-secondary hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Mail className="h-4 w-4 text-accent" /> Email
              </button>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors flex items-center gap-1.5">
                <Github className="h-4 w-4 text-accent" /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors flex items-center gap-1.5">
                <Linkedin className="h-4 w-4 text-accent" /> LinkedIn
              </a>
            </div>
          </div>
        </section>
        </>
      ) : (
        /* MOBILE VIEW (Simplified dot-timeline, faster triggers) */
        <div className="px-6 py-20 flex flex-col gap-16 relative bg-black">
          {/* Vertical timeline line */}
          <div className="absolute left-10 top-24 bottom-24 w-0.5 bg-white/5" />

          <div className="relative pl-12 space-y-20">
            
            <MobileSection title="01 // The Problem" icon={Lightbulb}>
              <p className="font-body text-sm leading-relaxed text-text-secondary mb-4">
                Congested pipelines delay features. Solving architectural friction points is required before code writing.
              </p>
              <div className="relative border border-white/5 bg-white/[0.01] rounded-card p-4 flex items-center justify-center overflow-hidden w-full max-w-sm h-72">
                <VisualProblem active={true} />
              </div>
            </MobileSection>

            <MobileSection title="02 // The Blueprint" icon={MapIcon}>
              <p className="font-body text-sm leading-relaxed text-text-secondary mb-4">
                Drawing clean service topologies (Client, Route Gateway, Storage Schema) prior to implementation.
              </p>
              <div className="relative border border-white/5 bg-white/[0.01] rounded-card p-4 flex items-center justify-center overflow-hidden w-full max-w-sm h-72">
                <VisualBlueprint active={true} />
              </div>
            </MobileSection>

            <MobileSection title="03 // Forge AI (Centerpiece)" icon={Cpu} highlighted>
              <p className="font-body text-sm leading-relaxed text-text-secondary mb-6">
                Autonomous system synthesizing clean repositories, routing reverse SSL proxies, and deploying Docker stacks to EC2.
              </p>
              <div className="border border-white/5 bg-white/[0.01] rounded-card p-4 space-y-4 max-w-sm">
                <div className="text-[10px] font-mono text-accent uppercase tracking-wider pb-2 border-b border-white/5">
                  Expandable Artifacts
                </div>
                <MobileForgeSection title="1. Product Requirements" content='Prompt: "Build whiteboard app". Generates functional specs, model scopes.' />
                <MobileForgeSection title="2. Target Folder Layout" content="📂 client/ (Next.js components), 📂 server/ (FastAPI routers, WebSockets, Docker files)." />
                <MobileForgeSection title="3. Docker compose deployment" content="Launches Caddy SSL and PostgreSQL services automatically on virtual clouds." />
              </div>
            </MobileSection>

            <MobileSection title="04 // Systems" icon={Globe}>
              <p className="font-body text-sm leading-relaxed text-text-secondary mb-4">
                Routing high-volume data streams. Implementing WebSockets layers and PostgreSQL transactional queries.
              </p>
              <div className="relative border border-white/5 bg-white/[0.01] rounded-card p-4 flex items-center justify-center overflow-hidden w-full max-w-sm h-72">
                <VisualSystems active={true} />
              </div>
            </MobileSection>

            <MobileSection title="05 // Edge AI" icon={Eye}>
              <p className="font-body text-sm leading-relaxed text-text-secondary mb-4">
                Executing machine learning models on hardware devices. Caching frames directly in CUDA arrays.
              </p>
              <div className="relative border border-white/5 bg-white/[0.01] rounded-card p-4 flex items-center justify-center overflow-hidden w-full max-w-sm h-72">
                <VisualEdgeAI active={true} />
              </div>
            </MobileSection>

            <MobileSection title="06 // Impact" icon={Award}>
              <p className="font-body text-sm leading-relaxed text-text-secondary mb-4">
                Deploying cloud nodes, structuring prompt databases, and scaling engineering workflows.
              </p>
              <div className="relative border border-white/5 bg-white/[0.01] rounded-card p-4 flex items-center justify-center overflow-hidden w-full max-w-sm h-72">
                <VisualImpact active={true} daysData={githubDays} />
              </div>
            </MobileSection>

            <MobileSection title="07 // Philosophy" icon={BookOpen}>
              <p className="font-body text-sm leading-relaxed text-text-secondary mb-4">
                Designing software pragmatically: measure bottlenecks first, build lightweight structures, deploy daily.
              </p>
              <div className="relative border border-white/5 bg-white/[0.01] rounded-card p-4 flex items-center justify-center overflow-hidden w-full max-w-sm h-72">
                <VisualLessons active={true} />
              </div>
            </MobileSection>

            <MobileSection title="08 // Final Scene" icon={CheckCircle2}>
              <div className="pt-2 max-w-sm">
                <h3 className="font-display text-2xl font-bold tracking-tight text-white mb-2">Let&apos;s Build The Next One.</h3>
                <p className="font-body text-xs text-text-secondary mb-6 leading-relaxed">
                  Open to challenging developer puzzles, microservice designs, and AI projects.
                </p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => triggerTransition("/engineering-archive")}
                    className="glass-strong bg-accent text-black px-6 py-3 rounded-pill text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-colors w-full"
                  >
                    Explore My Engineering Work
                  </button>
                  <div className="flex gap-4 justify-center mt-2 text-xs">
                    <button onClick={handleEmail} className="text-text-secondary flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> Email
                    </button>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-text-secondary flex items-center gap-1">
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </MobileSection>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-strong px-5 py-3 rounded-full text-xs font-semibold text-white shadow-glow border border-accent/20 flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-accent" />
            Email copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sidebar indicator dot subcomponent
function SidebarDot({ 
  active, 
  icon: Icon, 
  label,
  onClick
}: { 
  active: boolean; 
  icon: any; 
  label: string;
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className={`h-7 w-7 rounded-full flex items-center justify-center border transition-all duration-500 bg-black pointer-events-auto hover:border-accent/80 focus-visible:outline-none ${
        active 
          ? "border-accent text-accent shadow-[0_0_10px_rgba(79,140,255,0.4)] scale-110" 
          : "border-white/10 text-text-muted"
      }`}
      role="button"
      aria-label={`Scroll to ${label}`}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}

// Mobile Section Helper
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
        className={`absolute -left-[50px] top-0 h-9 w-9 rounded-full flex items-center justify-center border bg-black ${
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

function MobileForgeSection({ title, content }: { title: string; content: string }) {
  return (
    <div className="space-y-1">
      <h4 className="text-xs font-semibold text-white font-mono">{title}</h4>
      <p className="text-[11px] text-text-secondary leading-relaxed">{content}</p>
    </div>
  );
}

// Forge AI expandable sections helper
function ForgeAccordionItem({ 
  id, 
  title, 
  active, 
  onClick, 
  children 
}: { 
  id: string; 
  title: string; 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}) {
  return (
    <div className="border border-white/5 rounded-card overflow-hidden bg-white/[0.005]">
      <button
        onClick={onClick}
        className="w-full px-5 py-4 flex items-center justify-between text-left font-display text-xs font-semibold text-white hover:bg-white/[0.015] transition-colors focus-visible:outline-none"
        aria-expanded={active}
      >
        <span className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-accent" : "bg-white/20"}`} />
          {title}
        </span>
        <motion.span 
          animate={{ rotate: active ? 90 : 0 }}
          className="text-text-muted text-xs"
        >
          <ArrowRight className="h-3 w-3" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 pt-1 border-t border-white/5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* INTERACTIVE VISUAL SUB-COMPONENTS */

// 1. The Problem: Click nodes to resolve process congestion
const VisualProblem = React.memo(function VisualProblem({ active }: VisualProps) {
  const [released, setReleased] = useState<number[]>([]);
  if (!active) return null;

  const nodes = [
    { cx: 40, cy: 50, label: "Intake" },
    { cx: 80, cy: 110, label: "PRD Schema" },
    { cx: 120, cy: 70, label: "Folders Scaffold" },
    { cx: 160, cy: 130, label: "EC2 Deploy" }
  ];

  const handleNodeClick = (idx: number) => {
    if (released.includes(idx)) return;
    setReleased([...released, idx]);
  };

  const isPipelineClear = released.length === nodes.length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-center p-4"
    >
      <svg className="w-64 h-48 border border-white/5 rounded-card bg-black/40 overflow-visible relative" viewBox="0 0 200 160">
        {/* Draw background path lines */}
        {nodes.map((n, i) => (
          i > 0 && (
            <line
              key={i}
              x1={nodes[i - 1].cx}
              y1={nodes[i - 1].cy}
              x2={n.cx}
              y2={n.cy}
              stroke={released.includes(i) ? "#4f8cff" : "rgba(239, 68, 68, 0.2)"}
              strokeWidth="1.5"
              strokeDasharray={released.includes(i) ? "none" : "3 3"}
            />
          )
        ))}
        
        {/* Render interactive nodes */}
        {nodes.map((n, idx) => {
          const isReleased = released.includes(idx);
          return (
            <g 
              key={idx} 
              className="cursor-pointer"
              onClick={() => handleNodeClick(idx)}
            >
              <circle
                cx={n.cx}
                cy={n.cy}
                r="10"
                fill={isReleased ? "rgba(79, 140, 255, 0.1)" : "rgba(239, 68, 68, 0.1)"}
                stroke={isReleased ? "#4f8cff" : "#ef4444"}
                strokeWidth="1.5"
              />
              <circle
                cx={n.cx}
                cy={n.cy}
                r="4"
                fill={isReleased ? "#4f8cff" : "#ef4444"}
                className={isReleased ? "" : "animate-pulse"}
              />
              <text 
                x={n.cx} 
                y={n.cy - 16} 
                textAnchor="middle" 
                fill="#888888" 
                className="font-mono text-[7px] uppercase tracking-wider"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.1em] text-center">
        {isPipelineClear ? (
          <span className="text-accent animate-pulse font-semibold">✔ PIPELINE STATUS: 100% CLEAR</span>
        ) : (
          <span className="text-red-400 font-semibold">⚡ PIPELINE STATUS: CONGESTED ({nodes.length - released.length} BLOCKED)</span>
        )}
      </div>
    </motion.div>
  );
});

// 2. The Blueprint: Click nodes to inspect core responsibilities
const VisualBlueprint = React.memo(function VisualBlueprint({ active }: VisualProps) {
  const [selected, setSelected] = useState<string>("client");
  if (!active) return null;

  const details: Record<string, string> = {
    client: "CLIENT CONTAINER: Renders visual UI canvas, sets websocket hooks, registers user strokes.",
    gateway: "GATEWAY ROUTER: Secure HTTPS endpoint scopes, passes API validation limits, manages token JWTs.",
    database: "DATABASE STORAGE: PostgreSQL cluster models transactional boundaries, stores stroke snapshots."
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-between p-4"
    >
      <div className="grid grid-cols-3 gap-4 w-72 text-center text-[10px] font-mono text-text-secondary z-10">
        <button 
          onClick={() => setSelected("client")}
          className={`border rounded-btn px-2 py-4 transition-all ${
            selected === "client" 
              ? "border-accent bg-accent/5 text-white" 
              : "border-white/5 bg-white/[0.005] hover:border-white/20"
          }`}
        >
          <span className="font-semibold block">CLIENT</span>
          <span className="text-[7px] text-text-muted mt-1 block">React SPA</span>
        </button>
        
        <button 
          onClick={() => setSelected("gateway")}
          className={`border rounded-btn px-2 py-4 transition-all ${
            selected === "gateway" 
              ? "border-accent bg-accent/5 text-white" 
              : "border-white/5 bg-white/[0.005] hover:border-white/20"
          }`}
        >
          <span className="font-semibold block">GATEWAY</span>
          <span className="text-[7px] text-text-muted mt-1 block">FastAPI</span>
        </button>

        <button 
          onClick={() => setSelected("database")}
          className={`border rounded-btn px-2 py-4 transition-all ${
            selected === "database" 
              ? "border-accent bg-accent/5 text-white" 
              : "border-white/5 bg-white/[0.005] hover:border-white/20"
          }`}
        >
          <span className="font-semibold block">DATABASE</span>
          <span className="text-[7px] text-text-muted mt-1 block">PostgreSQL</span>
        </button>
      </div>
      
      <svg className="absolute w-72 h-32 pointer-events-none" viewBox="0 0 288 128">
        <path d="M 64 64 H 224" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
        <motion.path 
          d="M 64 64 H 224" 
          stroke="#4f8cff" 
          strokeWidth="1" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
      </svg>
      
      <div className="w-full max-w-sm rounded border border-white/5 bg-black/40 p-4 font-mono text-[9px] text-text-secondary leading-relaxed h-16 flex items-center justify-center text-center">
        {details[selected]}
      </div>
    </motion.div>
  );
});

// 3. Forge AI: Flagship Visual representation showing Live agent flow
const VisualForgeAI = React.memo(function VisualForgeAI({ activeSection, active }: { activeSection: string; active: boolean }) {
  if (!active) return null;

  const agents = [
    { id: "prd", label: "PM Agent", cx: 60, cy: 50 },
    { id: "architecture", label: "Architect", cx: 140, cy: 50 },
    { id: "folders", label: "Coder", cx: 140, cy: 110 },
    { id: "deployment", label: "DevOps", cx: 60, cy: 110 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-between p-2"
    >
      <div className="text-[10px] text-accent uppercase tracking-wider font-mono mono-tag mb-2 font-semibold">
        Autonomous Code Synthesis Agent Flow
      </div>

      <svg className="w-72 h-44 border border-white/5 rounded-card bg-black/30 overflow-visible relative" viewBox="0 0 200 160">
        {/* Draw interconnect lines */}
        <line x1="60" y1="50" x2="140" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
        <line x1="140" y1="50" x2="140" y2="110" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
        <line x1="140" y1="110" x2="60" y2="110" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
        <line x1="60" y1="110" x2="60" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />

        {/* Dynamic highlights based on the active section */}
        {activeSection === "prd" && (
          <motion.line x1="60" y1="50" x2="140" y2="50" stroke="#4f8cff" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
        )}
        {activeSection === "architecture" && (
          <motion.line x1="140" y1="50" x2="140" y2="110" stroke="#4f8cff" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
        )}
        {activeSection === "folders" && (
          <motion.line x1="140" y1="110" x2="60" y2="110" stroke="#4f8cff" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
        )}
        {activeSection === "deployment" && (
          <motion.line x1="60" y1="110" x2="60" y2="50" stroke="#4f8cff" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
        )}

        {agents.map((ag) => {
          const isSelected = 
            (ag.id === "prd" && activeSection === "prd") ||
            (ag.id === "architecture" && activeSection === "architecture") ||
            (ag.id === "folders" && activeSection === "folders") ||
            (ag.id === "deployment" && activeSection === "deployment");

          return (
            <g key={ag.id}>
              <circle
                cx={ag.cx}
                cy={ag.cy}
                r="18"
                fill={isSelected ? "rgba(79, 140, 255, 0.15)" : "rgba(255,255,255,0.01)"}
                stroke={isSelected ? "#4f8cff" : "rgba(255, 255, 255, 0.1)"}
                strokeWidth={isSelected ? "1.5" : "1"}
              />
              <text 
                x={ag.cx} 
                y={ag.cy + 3} 
                textAnchor="middle" 
                fill={isSelected ? "#4f8cff" : "#888888"} 
                className="font-mono text-[6.5px] uppercase font-semibold"
              >
                {ag.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="w-full max-w-sm rounded border border-white/5 bg-black/40 px-3 py-2 font-mono text-[8px] text-text-secondary leading-normal text-center h-10 flex items-center justify-center">
        {activeSection === "requirement" && "1. REQUIREMENTS: Analyzing raw user requirements for code scoping."}
        {activeSection === "prd" && "2. PRODUCT: PM Agent maps requirements to functional specs."}
        {activeSection === "architecture" && "3. ARCHITECTURE: Architect maps network and DB endpoints."}
        {activeSection === "techstack" && "4. TECHSTACK: Selecting Next.js, FastAPI, PostgreSQL libraries."}
        {activeSection === "folders" && "5. SYNTHESIS: Coder structures repo and writes code files."}
        {activeSection === "deployment" && "6. DEVOPS: DevOps packs Docker containers, provisions cloud."}
        {activeSection === "live-diagram" && "7. COMPLETED: Full-stack application deployed successfully."}
      </div>
    </motion.div>
  );
});

// 4. Systems: SQL DB vs Redis Cache lookup simulator
const VisualSystems = React.memo(function VisualSystems({ active }: VisualProps) {
  const [viewMode, setViewMode] = useState<"postgres" | "redis">("postgres");
  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-between p-4"
    >
      <div className="flex gap-2 mb-4 bg-white/[0.02] border border-white/5 rounded-pill p-1">
        <button 
          onClick={() => setViewMode("postgres")}
          className={`px-3 py-1 rounded-pill text-[8px] uppercase tracking-wider font-semibold ${
            viewMode === "postgres" ? "bg-accent text-black font-bold" : "text-text-secondary hover:text-white"
          }`}
        >
          Postgres Schema
        </button>
        <button 
          onClick={() => setViewMode("redis")}
          className={`px-3 py-1 rounded-pill text-[8px] uppercase tracking-wider font-semibold ${
            viewMode === "redis" ? "bg-accent text-black font-bold" : "text-text-secondary hover:text-white"
          }`}
        >
          Redis Cache
        </button>
      </div>

      <div className="w-64 h-36 border border-white/5 rounded-card bg-black/40 p-4 font-mono text-[9px] text-text-secondary flex flex-col justify-between select-text">
        {viewMode === "postgres" ? (
          <>
            <div className="border-b border-white/5 pb-1 flex justify-between items-center text-accent font-semibold">
              <span>SQL TABLE: tasks</span>
              <Database className="h-3 w-3" />
            </div>
            <div className="space-y-1 mt-2 text-[8px]">
              <div className="flex justify-between"><span>id</span><span className="text-text-muted">UUID (PRIMARY KEY)</span></div>
              <div className="flex justify-between"><span>user_id</span><span className="text-text-muted">UUID (FOREIGN KEY)</span></div>
              <div className="flex justify-between"><span>status</span><span className="text-text-muted">VARCHAR(50) DEFAULT 'todo'</span></div>
            </div>
            <div className="text-[7.5px] text-red-400 mt-2 border-t border-white/5 pt-1 flex justify-between">
              <span>QUERY TIME (INDEX SCAN)</span>
              <span>48ms</span>
            </div>
          </>
        ) : (
          <>
            <div className="border-b border-white/5 pb-1 flex justify-between items-center text-accent font-semibold">
              <span>REDIS KEY-VALUE PAIRS</span>
              <Layers className="h-3 w-3" />
            </div>
            <div className="space-y-1 mt-2 text-[8px]">
              <div className="flex justify-between"><span>session:task_list_12</span><span className="text-text-muted">JSONB STROKES DATA</span></div>
              <div className="flex justify-between"><span>ttl</span><span className="text-text-muted">3600 SECONDS</span></div>
            </div>
            <div className="text-[7.5px] text-green-400 mt-2 border-t border-white/5 pt-1 flex justify-between font-semibold">
              <span>QUERY TIME (CACHE HIT)</span>
              <span>2ms</span>
            </div>
          </>
        )}
      </div>
      <div className="font-mono text-[8px] text-text-muted mt-2 text-center max-w-xs">
        {viewMode === "postgres" 
          ? "PostgreSQL row-level locking ensures consistency during simultaneous updates."
          : "Redis Cache memory stores bypass heavy disk I/O, delivering queries in milliseconds."
        }
      </div>
    </motion.div>
  );
});

// 5. Edge AI: Webcam Inference Simulator with Confidence Slider
const VisualEdgeAI = React.memo(function VisualEdgeAI({ active }: VisualProps) {
  const [confidence, setConfidence] = useState<number>(0.5);
  if (!active) return null;

  // Mock detection outputs
  const allDetections = [
    { label: "Person", conf: 0.94, x: 25, y: 15, w: 20, h: 25 },
    { label: "Laptop", conf: 0.82, x: 60, y: 35, w: 15, h: 12 },
    { label: "Phone", conf: 0.45, x: 15, y: 40, w: 8, h: 10 },
    { label: "Cup", conf: 0.28, x: 80, y: 45, w: 6, h: 8 }
  ];

  const visibleDetections = allDetections.filter(d => d.conf >= confidence);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-between p-4"
    >
      <div className="relative border border-white/5 w-64 h-36 rounded-card overflow-hidden bg-black/80 flex items-center justify-center">
        {/* Mock Grid Overlay */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-5">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/20" />
          ))}
        </div>

        {/* Display Simulated Camera bounding boxes */}
        {visibleDetections.map((det, i) => (
          <div 
            key={i}
            className="absolute border border-accent rounded p-0.5 flex flex-col justify-between shadow-[0_0_8px_rgba(79,140,255,0.2)]"
            style={{
              left: `${det.x}%`,
              top: `${det.y}%`,
              width: `${det.w}%`,
              height: `${det.h}%`
            }}
          >
            <span className="absolute -left-0.5 -top-0.5 h-1 w-1 border-l border-t border-accent" />
            <span className="absolute -right-0.5 -top-0.5 h-1 w-1 border-r border-t border-accent" />
            <div className="mono-tag text-[5.5px] bg-accent text-black font-extrabold px-0.5 py-0.2 rounded-sm w-max uppercase">
              {det.label}: {Math.floor(det.conf * 100)}%
            </div>
          </div>
        ))}

        <div className="absolute top-2 right-2 text-[6.5px] font-mono text-white/40 flex flex-col items-end gap-0.5 text-right">
          <span>INFERENCE: CUDA GPU</span>
          <span>LATENCY: 12ms</span>
          <span>FPS: 60.0</span>
        </div>
      </div>

      {/* Interactive Confidence Slider */}
      <div className="w-60 mt-3 flex flex-col gap-1.5 z-10 pointer-events-auto">
        <div className="flex justify-between font-mono text-[8px] text-text-secondary uppercase">
          <span>Confidence Threshold</span>
          <span className="text-accent">{Math.floor(confidence * 100)}%</span>
        </div>
        <input 
          type="range"
          min="0.15"
          max="0.9"
          step="0.05"
          value={confidence}
          onChange={(e) => setConfidence(parseFloat(e.target.value))}
          className="w-full accent-accent bg-white/10 h-0.5 rounded cursor-pointer"
        />
      </div>
    </motion.div>
  );
});

// 6. Impact: GitHub contributions Heat Grid
interface VisualImpactProps extends VisualProps {
  daysData: any[];
}
const VisualImpact = React.memo(function VisualImpact({ active, daysData }: VisualImpactProps) {
  if (!active) return null;
  const renderMock = daysData.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-center p-4"
    >
      <div className="grid grid-cols-7 gap-1.5 w-56 opacity-60" aria-label="Commit tracking visual chart">
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
      <div className="absolute bottom-6 font-mono text-[9px] text-text-secondary uppercase tracking-[0.1em] pointer-events-none">
        {renderMock ? "Verified GitHub Contributions" : "Real GitHub Contributions Active"}
      </div>
    </motion.div>
  );
});

// 7. Philosophy/Lessons: Flip-cards/Tradeoffs drawer
const VisualLessons = React.memo(function VisualLessons({ active }: VisualProps) {
  const [activePrinciple, setActivePrinciple] = useState<number | null>(null);
  if (!active) return null;

  const tradeoffs = [
    { title: "Scale Value", detail: "Solve existing issues immediately. Do not establish microservice layers before validation limits are reached. Avoid premature abstraction." },
    { title: "Simple Flows", detail: "Prefer monolithic codebase architectures initially. Divide routes only once concurrency limits create physical computing blockages." },
    { title: "Profile First", detail: "Identify latency bottlenecks using trace queries. Optimization without benchmarks creates code clutter without throughput gains." },
    { title: "Iterate Daily", detail: "Ship compiled packages daily. Real-world feedback corrects structural architecture bugs faster than offline design theory." }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col justify-between p-4"
    >
      <div className="grid grid-cols-2 gap-2 text-left font-mono text-[9px] z-10 pointer-events-auto">
        {tradeoffs.map((tr, idx) => (
          <button
            key={idx}
            onClick={() => setActivePrinciple(idx === activePrinciple ? null : idx)}
            className={`border rounded-btn p-3 flex flex-col justify-between text-left transition-all ${
              activePrinciple === idx
                ? "border-accent bg-accent/5 text-white"
                : "border-white/5 bg-white/[0.005] hover:border-white/20"
            }`}
          >
            <span className="text-accent font-bold">0{idx + 1} // TRADEOFF</span>
            <span className="text-white font-semibold text-[10px] mt-1 block">{tr.title}</span>
          </button>
        ))}
      </div>

      <div className="w-full max-w-sm rounded border border-white/5 bg-black/40 p-4 font-mono text-[9px] text-text-secondary leading-relaxed h-20 flex items-center justify-center text-center">
        {activePrinciple !== null 
          ? tradeoffs[activePrinciple].detail
          : "Click components above to inspect operational and architectural tradeoffs."
        }
      </div>
    </motion.div>
  );
});
