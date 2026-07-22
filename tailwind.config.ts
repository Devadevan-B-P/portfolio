import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#050505",
          secondary: "#0D0D0D",
        },
        surface: "rgba(255,255,255,0.03)",
        card: "rgba(255,255,255,0.04)",
        border: {
          subtle: "rgba(255,255,255,0.08)",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B5B5B5",
          muted: "#7B7B7B",
        },
        accent: {
          DEFAULT: "#4F8CFF",
          glow: "rgba(79,140,255,0.25)",
          dim: "rgba(79,140,255,0.08)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        hero: ["96px", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "hero-tablet": ["72px", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "hero-mobile": ["44px", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        btn: "16px",
        card: "24px",
        img: "28px",
        pill: "999px",
      },
      boxShadow: {
        layered: "0 10px 40px rgba(0,0,0,0.35), 0 1px 1px rgba(255,255,255,0.08) inset",
        glow: "0 0 80px rgba(79,140,255,0.25)",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(.22,.61,.36,1)",
      },
      spacing: {
        section: "180px",
        "section-mobile": "96px",
      },
    },
  },
  plugins: [],
};
export default config;
