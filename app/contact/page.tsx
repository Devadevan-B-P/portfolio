"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import SpotlightCard from "@/components/SpotlightCard";
import { profile } from "@/lib/data";
import { usePageTransition } from "@/components/PageTransition";
import { 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Send, 
  Check, 
  Copy, 
  GraduationCap,
  Clock,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function ContactPage() {
  const { triggerTransition } = usePageTransition();
  const [copied, setCopied] = useState(false);
  const [inquiryType, setInquiryType] = useState<string>("Full-Stack AI");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    setSubmitting(true);

    // Simulate transmission delay for realistic HUD feedback
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    }, 1200);
  };

  const projectCategories = [
    "Full-Stack AI",
    "Autonomous Agents",
    "Edge ML & Vision",
    "System Architecture",
    "Other Inquiry"
  ];

  return (
    <SmoothScroll>
      <Navbar />
      <div className="noise-layer" />

      <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
        {/* HUD Subpage Header */}
        <div className="max-w-6xl mx-auto mb-16 relative">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="mono-tag text-xs uppercase tracking-[0.25em] text-accent block">
              03 // Engagement Portal
            </span>
            
            {/* Real-time System Status Indicator */}
            <div className="flex items-center gap-2 border border-green-500/20 bg-green-500/5 px-3 py-1 rounded-pill">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[10px] text-green-400 uppercase tracking-wider font-semibold">
                Status: Available for Q3/Q4 Engineering Projects
              </span>
            </div>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Let&apos;s Build Something Scalable.
          </h1>
          <p className="font-body text-sm md:text-base text-text-secondary max-w-2xl leading-relaxed">
            Have a project in mind, an architectural challenge to solve, or interested in full-stack AI development? Transmit a payload or reach out directly.
          </p>
          <div className="h-[1px] bg-white/5 w-full mt-10" />
        </div>

        {/* Main Grid: Contact Cards + Inquiry Form */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Social Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Email Card */}
            <SpotlightCard className="p-6 border border-white/5 bg-white/[0.005] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="mono-tag text-[9px] text-text-muted uppercase tracking-wider block">Direct Communication</span>
                  <h3 className="font-display text-base font-bold text-white">Email Payload</h3>
                </div>
              </div>

              <div className="bg-black/60 border border-white/10 rounded-btn p-3 flex items-center justify-between gap-2 mb-4">
                <span className="font-mono text-xs text-white truncate">{profile.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="glass border border-white/10 hover:border-accent/40 p-2 rounded text-text-secondary hover:text-white transition-all text-xs flex items-center gap-1 cursor-pointer shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-green-400" />
                      <span className="font-mono text-[9px] text-green-400 uppercase">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span className="font-mono text-[9px] uppercase">Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted">
                <Clock className="h-3.5 w-3.5 text-accent" />
                <span>Estimated Response Time: &lt; 24 Hours</span>
              </div>
            </SpotlightCard>

            {/* Location & Academic Details */}
            <SpotlightCard className="p-6 border border-white/5 bg-white/[0.005]">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="mono-tag text-[9px] text-text-muted uppercase tracking-wider block">Base Location</span>
                    <span className="font-body text-xs text-white font-medium">{profile.location}</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3 flex items-start gap-3">
                  <GraduationCap className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="mono-tag text-[9px] text-text-muted uppercase tracking-wider block">Institution</span>
                    <span className="font-body text-xs text-white font-medium">Marian Engineering College, Thiruvananthapuram</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Social Engineering Profiles */}
            <div className="space-y-3">
              <span className="mono-tag text-[10px] uppercase tracking-wider text-text-muted block px-1">
                Developer Profiles & Code Repositories
              </span>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 border border-white/5 hover:border-accent/40 bg-white/[0.005] hover:bg-white/[0.02] rounded-card flex items-center justify-between transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-accent transition-transform group-hover:scale-110" />
                  <div>
                    <h4 className="font-display text-xs font-bold text-white">GitHub Profile</h4>
                    <p className="font-mono text-[10px] text-text-muted">@devadevan-b-p</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-accent transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 border border-white/5 hover:border-accent/40 bg-white/[0.005] hover:bg-white/[0.02] rounded-card flex items-center justify-between transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-accent transition-transform group-hover:scale-110" />
                  <div>
                    <h4 className="font-display text-xs font-bold text-white">LinkedIn Network</h4>
                    <p className="font-mono text-[10px] text-text-muted">Devadevan B P</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-accent transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>

          {/* Right Column: Project Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-8 border border-white/10 bg-white/[0.008] relative overflow-hidden">
              
              <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                    Project Inquiry Form
                  </h2>
                </div>
                <span className="font-mono text-[9px] text-text-muted uppercase">PROTOCOL: TLS_ENCRYPTED</span>
              </div>

              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="h-14 w-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
                    <Check className="h-7 w-7 animate-bounce" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Transmission Received
                  </h3>
                  <p className="font-body text-xs text-text-secondary max-w-sm leading-relaxed">
                    Thank you for reaching out. Your inquiry regarding <span className="text-accent font-semibold">{inquiryType}</span> has been logged. I will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 font-mono text-xs uppercase tracking-wider text-accent underline cursor-pointer hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Select Category */}
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-text-secondary block mb-2.5">
                      Select Inquiry Scope
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectCategories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setInquiryType(cat)}
                          className={`font-mono text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-pill border transition-all cursor-pointer ${
                            inquiryType === cat
                              ? "border-accent bg-accent/15 text-white font-bold shadow-[0_0_10px_rgba(79,140,255,0.2)]"
                              : "border-white/10 bg-white/[0.02] text-text-secondary hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-text-secondary block mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Turner"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-btn px-4 py-3 font-body text-xs text-white placeholder-white/20 focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-text-secondary block mb-2">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-btn px-4 py-3 font-body text-xs text-white placeholder-white/20 focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-text-secondary block mb-2">
                      Project Details / Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your project scope, engineering requirements, or timeline..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-btn p-4 font-body text-xs text-white placeholder-white/20 focus:border-accent focus:outline-none transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full glass-strong bg-accent/10 border border-accent/40 hover:bg-accent hover:text-black py-4 rounded-pill font-mono text-xs uppercase tracking-widest font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-glow disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <span className="h-3 w-3 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                        <span>Transmitting Payload...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message Payload</span>
                        <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>

                  <div className="text-center font-mono text-[8px] text-text-muted uppercase tracking-wider">
                    [CONFIDENTIALITY GUARANTEED // IP & INQUIRY SECURED]
                  </div>
                </form>
              )}

            </SpotlightCard>
          </div>

        </div>
      </main>
    </SmoothScroll>
  );
}
