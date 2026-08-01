# Devadevan B P — Portfolio & Engineering Showcase

A cinematic, high-performance, and responsive software engineering portfolio built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Nodemailer**, and **Framer Motion**.

🌐 **Forge AI Flagship Demo**: [https://forge-ai-dev.cloud-ip.cc/](https://forge-ai-dev.cloud-ip.cc/)

---

## ⚡ Key Features & Architecture

- **Cinematic HUD Interface**: Dark theme (`#050505`) with custom electric-blue (`#4F8CFF`) accents, hardware-accelerated glassmorphism cards, and fluid page transitions.
- **Interactive Engineering Journey**: A dynamic 8-stage interactive timeline showcasing project blueprints, AI agent topology graphs, system architectures, and edge computer vision processing.
- **Live Contact Payload Gateway**: Integrated Next.js API route (`/api/contact`) sending HTML inquiry payloads directly to `needprojects123@gmail.com` using Nodemailer and Gmail SMTP authentication.
- **Credentials & Impact Index**: Verified academic and industry credentials including:
  - **IEDC District Cluster Level Hackathon 2026** (*Kerala Startup Mission & IEDC*)
  - **Prompt Design in Vertex AI** (*Google Cloud*)
  - **AWS Fundamentals Internship** (*ICT Academy of Kerala*)
- **Mobile First Optimization**: Dynamic mobile video unmounting, touch-optimized button targets, and CSS hardware GPU acceleration for smooth 60 FPS performance on all viewports.
- **Production Ready SEO**: Pre-rendered static pages (`SSG`), complete OpenGraph social card previews, and automated response compression.

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/Devadevan-B-P/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# GitHub Contributions Chart (Optional)
GITHUB_TOKEN=your_github_token

# Contact Form Email Gateway
TO_EMAIL=needprojects123@gmail.com
GMAIL_USER=needprojects123@gmail.com
GMAIL_APP_PASSWORD=your_16_char_google_app_password
```

### 3. Launch Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Production Build

To compile and verify an optimized production bundle:

```bash
# Compile production build
npm run build

# Start local production server
npm run start
```

---

## 📂 Project Structure

```
├── app/
│   ├── api/
│   │   ├── contact/           # Nodemailer email payload gateway
│   │   └── github/            # Cached GitHub GraphQL contributions endpoint
│   ├── contact/               # Contact page & engagement portal
│   ├── engineering-archive/   # Project case studies & credentials catalog
│   ├── projects/[id]/         # Dynamic project detail pages
│   ├── resume/                # Printable professional CV page
│   ├── globals.css            # Global design tokens & GPU utilities
│   ├── layout.tsx             # Root layout & SEO OpenGraph metadata
│   └── page.tsx               # Portfolio landing page
├── components/                # Modular UI components (Hero, Navbar, Journey, etc.)
├── lib/                       # Data schemas (data.ts) & custom React hooks
└── public/                    # Video loops, favicon, and downloadable PDF resume
```

---

## ⚙️ Content & Customization

- **Profile Data**: All project records, education metrics, social links, and credentials are managed in [`lib/data.ts`](file:///c:/Users/devad/Desktop/portfolio/lib/data.ts).
- **Styling Tokens**: Tailwind design system and colors are defined in `tailwind.config.ts`.
- **Site Favicon**: Managed via [`app/icon.jpg`](file:///c:/Users/devad/Desktop/portfolio/app/icon.jpg).

---

## 📄 License

Created by **Devadevan B P** — [https://github.com/devadevan-b-p](https://github.com/devadevan-b-p)

