export const profile = {
  name: "Devadevan B P",
  role: "Full-Stack AI Software Engineer",
  headline: "Designing software that thinks before it ships.",
  location: "Thiruvananthapuram, Kerala, India",
  email: "needprojects123@gmail.com",
  github: "https://github.com/devadevan-b-p",
  linkedin: "https://www.linkedin.com/in/devadevan-b-p-894000356/",
  summary:
    "Computer Science Engineering student specializing in designing and shipping scalable, AI-powered software products. Proficient in React, Next.js, FastAPI, Python, AWS, Docker, PyTorch, and CUDA. Passionate about system architecture, latency optimization, and building robust, developer-first systems.",
};

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string[];
  tech: string[];
  github: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "forge-ai",
    index: "01",
    title: "Forge AI",
    subtitle: "Flagship Autonomous AI Engineer",
    description: [
      "Designed and developed an autonomous software engineering agent system that builds and deploys complete applications from text prompts.",
      "Implements a multi-agent hierarchy: Product Manager Agent writes PRDs, Architect Agent creates system topology, Coder Agent writes code, and DevOps Agent containerizes and deploys.",
      "Generates complete, production-ready React/FastAPI codebases with database integrations, CI/CD pipelines, and AWS configuration scripts.",
      "DevOps Agent configures Caddy reverse proxy with automatic HTTPS (SSL), packages the system inside Docker containers, and prepares AWS EC2 launch instances connected to MongoDB Atlas."
    ],
    tech: ["React", "FastAPI", "Python", "Docker", "AWS EC2", "Caddy", "MongoDB Atlas"],
    github: "https://github.com/devadevan-b-p",
    featured: true,
  },
  {
    id: "realtime-object-detector",
    index: "02",
    title: "Real-Time Object Detector",
    subtitle: "Edge AI & GPU Acceleration",
    description: [
      "Built a high-throughput computer vision engine using YOLOv8 and OpenCV for webcam-based object recognition.",
      "Leveraged PyTorch with CUDA bindings for GPU-accelerated parallel inference, achieving real-time processing speeds.",
      "Implemented a customized bounding box rendering pipeline with concurrent tracking, displaying confidence matrices overlayed on high-fps feeds."
    ],
    tech: ["Python", "YOLOv8", "OpenCV", "PyTorch", "CUDA"],
    github: "https://github.com/devadevan-b-p",
  },
  {
    id: "civic-issue-reporting",
    index: "03",
    title: "Civic Issue Reporting System",
    subtitle: "Real-Time Geo-Mapping Webapp",
    description: [
      "Developed a full-stack web application for public reporting and administrative tracking of civic issues using geolocations.",
      "Implemented real-time administration dashboard powered by WebSockets to broadcast state transitions instantly to support staff.",
      "Constructed custom MongoDB spatial queries to cluster and map incidents dynamically on an interactive map canvas."
    ],
    tech: ["React (Vite)", "FastAPI", "MongoDB", "Tailwind CSS", "WebSockets", "Caddy"],
    github: "https://github.com/devadevan-b-p",
  },
  {
    id: "ecommerce-platform",
    index: "04",
    title: "E-Commerce Microservices",
    subtitle: "Scalable Order & Inventory Engine",
    description: [
      "Built a secure backend order processing and inventory management platform for high-volume transactions.",
      "Integrated AWS S3 object storage for high-availability media assets with secure IAM policies.",
      "Implemented PostgreSQL indexing and transactional boundaries to handle race conditions in parallel checkout operations."
    ],
    tech: ["React", "FastAPI", "PostgreSQL", "AWS S3", "Docker"],
    github: "https://github.com/devadevan-b-p",
  },
];

export const education = {
  degree: "B.Tech in Computer Science Engineering",
  school: "Marian Engineering College, Thiruvananthapuram",
  graduation: "Expected Graduation: 2028",
  cgpa: "CGPA: 7.0 / 10",
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
  ],
};

export const certifications = [
  {
    title: "AWS Fundamentals Internship",
    issuer: "ICT Academy of Kerala",
    date: "2024",
  },
  {
    title: "Prompt Design in Vertex AI",
    issuer: "Google Cloud Skills Boost",
    date: "2024",
  },
];

export const principles = [
  {
    title: "Build for users before scale",
    desc: "Solve real problems today; don't over-engineer for hypothetical traffic.",
  },
  {
    title: "Prefer simple architectures",
    desc: "Reduce moving parts. Monoliths first; distribute only when bottlenecks force it.",
  },
  {
    title: "Measure before optimizing",
    desc: "Profile latencies and queries before tweaking code. Data dictates efficiency.",
  },
  {
    title: "Ship, learn, improve",
    desc: "Get code to production daily. Real feedback is better than modular perfection.",
  },
];

export type ChapterId = 
  | "problem" 
  | "blueprint" 
  | "engine" 
  | "network" 
  | "edge" 
  | "credibility" 
  | "lessons" 
  | "final";

export interface Chapter {
  id: ChapterId;
  number: string;
  label: string;
  title: string;
  subtitle?: string;
  range: [number, number];
}

export const chapters: Chapter[] = [
  {
    id: "problem",
    number: "01",
    label: "Discovery",
    title: "The Problem",
    range: [0, 0.12],
  },
  {
    id: "blueprint",
    number: "02",
    label: "Design",
    title: "The Blueprint",
    range: [0.12, 0.25],
  },
  {
    id: "engine",
    number: "03",
    label: "Flagship Project",
    title: "Forge AI: The Engine",
    subtitle: "Autonomous Software Engineer Agent",
    range: [0.25, 0.58],
  },
  {
    id: "network",
    number: "04",
    label: "Systems",
    title: "The Network",
    range: [0.58, 0.70],
  },
  {
    id: "edge",
    number: "05",
    label: "Edge Processing",
    title: "The Edge",
    range: [0.70, 0.82],
  },
  {
    id: "credibility",
    number: "06",
    label: "Credibility",
    title: "Impact & Trust",
    range: [0.82, 0.90],
  },
  {
    id: "lessons",
    number: "07",
    label: "Philosophy",
    title: "Lessons Learned",
    range: [0.90, 0.97],
  },
  {
    id: "final",
    number: "08",
    label: "Final Scene",
    title: "Let's Build The Next One",
    range: [0.97, 1.0],
  },
];
export type Principle = {
  title: string;
  desc: string;
};
