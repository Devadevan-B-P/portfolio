"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import SpotlightCard from "@/components/SpotlightCard";
import { education, profile, projects } from "@/lib/data";
import { usePageTransition } from "@/components/PageTransition";
import { ArrowLeft, Download, Printer, Mail, MapPin, Github, Linkedin, Calendar, Code, ExternalLink } from "lucide-react";

export default function ResumePage() {
  const { triggerTransition } = usePageTransition();

  const handlePrint = () => {
    window.print();
  };

  const skillGroups = [
    { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "SQL", "C++", "C", "HTML", "CSS"] },
    { category: "Frameworks & Libraries", items: ["React", "Next.js", "FastAPI", "Express", "Node.js", "PyTorch", "OpenCV"] },
    { category: "Cloud & DevOps", items: ["AWS (EC2, S3)", "Docker", "Git / GitHub", "Caddy Server", "Nginx", "Linux (Ubuntu)"] },
    { category: "ML / GPU Acceleration", items: ["CUDA", "YOLOv8 Inference", "Vertex AI Prompting", "Few-Shot Instruction Tuning"] }
  ];

  return (
    <SmoothScroll>
      <Navbar />
      <div className="noise-layer" />

      {/* Styled styles for print layout formatting */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          header, nav, footer, button, .no-print {
            display: none !important;
          }
          .print-container {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            background: white !important;
            color: black !important;
          }
          .print-card {
            border: none !important;
            background: transparent !important;
            color: black !important;
            padding: 0 !important;
            margin-bottom: 1.5rem !important;
          }
          h1, h2, h3, p, span, li {
            color: black !important;
          }
          .print-divider {
            border-color: #ccc !important;
          }
          .print-badge {
            border: 1px solid #777 !important;
            color: black !important;
            background: transparent !important;
          }
        }
      `}</style>

      <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 print-container">
        
        {/* Subpage Header HUD - Hidden on print */}
        <div className="max-w-4xl mx-auto mb-12 no-print">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <button
              onClick={() => triggerTransition("/engineering-archive")}
              className="group flex items-center gap-2 text-text-muted hover:text-white font-mono text-[10px] uppercase tracking-wider transition-colors focus-visible:outline-none"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" /> Back to Archive
            </button>

            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="glass px-4 py-2 rounded-pill text-[10px] uppercase tracking-wider font-semibold text-white hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5" /> Print / Save PDF
              </button>
              <a
                href="/Devadevan_B_P_Resume.pdf"
                download
                className="glass-strong bg-white/5 px-4 py-2 rounded-pill text-[10px] uppercase tracking-wider font-semibold text-white hover:bg-accent hover:text-black transition-all flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" /> Download PDF
              </a>
            </div>
          </div>
          <div className="h-[1px] bg-white/5 w-full mt-6" />
        </div>

        {/* Resume Content Sheet */}
        <div className="max-w-4xl mx-auto bg-white/[0.005] border border-white/5 p-8 sm:p-12 rounded-card print-card shadow-layered">
          
          {/* Header Details */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/5 print-divider">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-1.5">
                {profile.name}
              </h1>
              <p className="font-display text-sm text-accent font-semibold tracking-wide uppercase">
                {profile.role}
              </p>
            </div>

            <div className="space-y-1.5 font-mono text-[10px] text-text-secondary">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-accent" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2 no-print">
                <Github className="h-3.5 w-3.5 text-accent" />
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:underline">{profile.github}</a>
              </div>
              <div className="flex items-center gap-2 no-print">
                <Linkedin className="h-3.5 w-3.5 text-accent" />
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn Profile</a>
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="py-8 border-b border-white/5 print-divider">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white mb-4">
              Profile Summary
            </h2>
            <p className="font-body text-xs leading-relaxed text-text-secondary">
              {profile.summary}
            </p>
          </div>

          {/* Skills Section */}
          <div className="py-8 border-b border-white/5 print-divider">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white mb-4">
              Technical Skillset
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skillGroups.map((group) => (
                <div key={group.category} className="space-y-2">
                  <h3 className="font-mono text-[10px] font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="h-3.5 w-3.5" /> {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {group.items.map((skill) => (
                      <span key={skill} className="mono-tag text-[9px] border border-white/5 print-badge rounded px-2 py-0.5 text-text-secondary bg-white/[0.005]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="py-8 border-b border-white/5 print-divider">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white mb-4">
              Education
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-display text-sm font-bold text-white">
                    {education.school}
                  </h3>
                  <span className="mono-tag text-[9px] text-text-muted flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {education.graduation}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10.5px] font-mono text-accent mt-0.5 font-semibold">
                  <span>{education.degree}</span>
                  <span>{education.cgpa}</span>
                </div>
                
                <div className="mt-3">
                  <span className="font-mono text-[9px] text-text-muted uppercase block mb-1.5">Core Coursework:</span>
                  <div className="flex flex-wrap gap-1">
                    {education.coursework.map((course) => (
                      <span key={course} className="mono-tag text-[8.5px] border border-white/5 print-badge rounded px-2 py-0.5 text-text-secondary">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience / Internships */}
          <div className="py-8 border-b border-white/5 print-divider">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white mb-4">
              Professional Internships
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-display text-sm font-bold text-white">
                    AWS Fundamentals Developer Intern
                  </h3>
                  <span className="mono-tag text-[9px] text-text-muted flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> 2024
                  </span>
                </div>
                <div className="font-mono text-[10.5px] text-accent mt-0.5 font-semibold">
                  ICT Academy of Kerala, Kerala
                </div>
                <ul className="list-disc list-inside mt-3 font-body text-[11px] text-text-secondary leading-relaxed space-y-1.5 pl-1.5">
                  <li>Configured AWS compute resources using secure EC2 instances and IAM user configurations.</li>
                  <li>Deployed backend microcontainers to AWS clouds running standard Caddy load balancer configurations.</li>
                  <li>Managed database persistence layers using AWS RDS setups connected to private Subnet blocks.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Projects Summary */}
          <div className="pt-8">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white mb-4">
              Core Engineering Projects
            </h2>
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id} className="page-break-inside-avoid">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-display text-sm font-bold text-white">
                      {proj.title} — <span className="font-normal text-text-secondary font-display text-xs">{proj.subtitle}</span>
                    </h3>
                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="mono-tag text-[9px] text-accent hover:underline flex items-center gap-0.5 no-print">
                      GitHub <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                  <p className="font-body text-[11px] text-text-secondary mt-1.5 leading-relaxed">
                    {proj.overview}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {proj.tech.map((tag) => (
                      <span key={tag} className="mono-tag text-[8px] border border-white/5 print-badge rounded px-1.5 py-0.2 text-text-secondary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </SmoothScroll>
  );
}
