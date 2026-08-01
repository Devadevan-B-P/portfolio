import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devadevan B P — Full-Stack AI Software Engineer",
  description:
    "Portfolio of Devadevan B P — Computer Science Engineering student specializing in scalable full-stack applications, cloud systems, GPU acceleration, and autonomous AI agents.",
  keywords: [
    "Devadevan B P",
    "Software Engineer",
    "Full-Stack Developer",
    "AI Software Engineer",
    "Computer Science Engineer",
    "FastAPI",
    "Next.js",
    "React",
    "Python",
    "CUDA",
    "AWS",
    "Docker"
  ],
  authors: [{ name: "Devadevan B P" }],
  creator: "Devadevan B P",
  metadataBase: new URL("https://forge-ai-dev.cloud-ip.cc"),
  openGraph: {
    title: "Devadevan B P — Full-Stack AI Software Engineer",
    description: "Designing software that thinks before it ships. Explore full-stack AI projects, architecture blueprints, and cloud infrastructure.",
    type: "website",
    locale: "en_US",
    siteName: "Devadevan B P Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devadevan B P — Full-Stack AI Software Engineer",
    description: "Designing software that thinks before it ships. Explore full-stack AI projects, architecture blueprints, and cloud infrastructure.",
  },
  icons: {
    icon: "/icon.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

import PageTransitionProvider from "@/components/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>
        <Analytics />
      </body>
    </html>
  );
}
