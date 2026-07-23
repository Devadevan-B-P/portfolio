"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "@/lib/data";

const links = [
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll and pause Lenis scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isOpen]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -45, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
        className="fixed top-6 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 pointer-events-none"
      >
        <a
          href="#top"
          onClick={(e) => handleScroll(e, "#top")}
          className="glass flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-semibold text-white pointer-events-auto hover:border-accent/40 transition-colors"
        >
          D.
        </a>

        {/* Desktop Menu */}
        <nav className="glass hidden items-center gap-1 rounded-pill px-1.5 py-1.5 md:flex pointer-events-auto">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="rounded-pill px-5 py-2 font-body text-xs uppercase tracking-wider font-semibold text-text-secondary transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Resume */}
        <a
          href="/Devadevan_B_P_Resume.pdf"
          download
          className="glass-strong group hidden md:flex items-center gap-1.5 rounded-pill px-6 py-2.5 font-body text-xs uppercase tracking-wider font-semibold text-white transition-transform duration-300 ease-cinematic hover:scale-[1.03] pointer-events-auto"
        >
          Résumé
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="glass flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden pointer-events-auto"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.header>

      {/* Mobile Menu Panel & Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              className="glass-strong fixed top-20 left-6 right-6 z-40 flex flex-col gap-2 rounded-card p-6 md:hidden"
            >
              {links.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    setIsOpen(false);
                    handleScroll(e, link.href);
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-btn px-4 py-3 font-body text-sm font-semibold uppercase tracking-wider text-text-secondary transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="my-2 border-t border-white/5" />
              <motion.a
                href="/Devadevan_B_P_Resume.pdf"
                download
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.05 }}
                className="flex items-center justify-between rounded-btn bg-white/5 hover:bg-accent hover:text-black px-4 py-3 font-body text-sm font-semibold uppercase tracking-wider text-white transition-colors"
              >
                <span>Résumé</span>
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
