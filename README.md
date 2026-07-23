# Devadevan B P — Portfolio

A cinematic, high-performance, and responsive software engineering portfolio built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

The design language balances a sleek near-black background, custom electric-blue accents, hardware-accelerated glassmorphism surfaces, generous whitespace, and custom cubic-bezier easings.

---

## 🚀 Getting Started

To run the development server locally:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified in terminal) to view the application.

---

## 🛠️ Production Build

To compile and build an optimized production bundle:

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

---

## 📂 Project Structure

```
app/            Next.js App Router: Layout configurations, pages, and global CSS
components/     Re-usable UI components (Navbar, Hero, SpotlightCard, PageLoader, etc.)
lib/            Data schemas, local data models (data.ts), and React hooks
public/         Static media assets, loops, and PDF downloads (Résumé)
```

---

## ⚙️ Customization Guide

- **Content & Contact Details**: All resume details, including your email (`needprojects123@gmail.com`), social links, education, timeline events, and projects, are managed inside [lib/data.ts](file:///c:/Users/devad/Desktop/portfolio/lib/data.ts). Edit this file to update your portfolio details.
- **Design Tokens**: The color palette, border radiuses, and fonts are declared inside `tailwind.config.ts`. The primary accent is electric blue (`#4F8CFF`).
- **Favicon & Logo**: The site icon is managed via [app/icon.jpg](file:///c:/Users/devad/Desktop/portfolio/app/icon.jpg). Replace this image to update your site's browser tab favicon automatically.
- **Resume PDF**: Replace `public/Devadevan_B_P_Resume.pdf` with your updated resume file, ensuring the filename matches.

---

## ⚡ Performance & Cross-Browser Optimizations

The application incorporates a variety of state-of-the-art layout rendering and hardware performance optimizations:

### 1. Viewport & Bandwidth Savings
- **Dynamic Mobile Loop video bypass**: Bypasses rendering the heavy 2.5MB background `.mp4` video on mobile viewports (<768px), fallback-rendering a lightweight CSS radial-gradient backdrop. This saves mobile bandwidth and CPU cycle loads.
- **Headline Blur Bypass**: Media queries override text blur transitions natively on screens under 768px (`filter: none !important`) to prevent GPU rendering lag and font stutter on mobile Safari and Chrome.

### 2. Interaction & Coordinate tracking optimizations
- **Coarse pointer coordinate bypass**: Spotlight cards skip mouse movement coordinate calculations on touch devices (`pointer: coarse`), preventing redundant background events.
- **Dynamic Custom Cursor**: The custom dot and ring cursor unmounts and disables itself on mobile viewports (<768px) and touchscreens. Default system pointer behaviors are cleanly restored via CSS.

### 3. Cross-Browser Smooth Rendering
- **Compositer GPU Acceleration**: Glass containers utilize `transform: translateZ(0)` and `backface-visibility: hidden` properties to force hardware-accelerated GPU layer rendering. This prevents frame-rate stuttering during scroll animations.
- **Firefox MacOS Font Smoothing**: Added `-moz-osx-font-smoothing: grayscale` to target subpixel antialiasing in Firefox on MacOS.
- **Firefox Custom Scrollbars**: Integrated custom browser scrollbar color tokens (`scrollbar-width` and `scrollbar-color`) for native Firefox support.
- **Antialiased SVGs**: Configured `shape-rendering: geometricPrecision` rules globally so that timelined blueprints and charts render with ultra-crisp antialiasing.
