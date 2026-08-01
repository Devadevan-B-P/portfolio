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
  tech: string[];
  github: string;
  liveDemo?: string;
  featured?: boolean;
  
  // Detailed fields for project detail page
  overview: string;
  problem: string;
  solution: string;
  challenges: string;
  tradeoffs: string;
  lessonsLearned: string;
  folderStructure: string;
  architectureDiagramType: "forge-ai" | "object-detector" | "civic-reporter" | "ecommerce";
  deployment: string[];
};

export const projects: Project[] = [
  {
    id: "forge-ai",
    index: "01",
    title: "Forge AI",
    subtitle: "Flagship Autonomous AI Engineer",
    tech: ["React", "FastAPI", "Python", "Docker", "AWS EC2", "Caddy", "MongoDB Atlas"],
    github: "https://github.com/devadevan-b-p",
    liveDemo: "https://forge-ai-dev.cloud-ip.cc/",
    featured: true,
    overview: "An autonomous software engineering agent system that translates natural language text prompts into fully functioning, deployed full-stack web applications.",
    problem: "Software development pipelines suffer from manual handoff latencies. Scoping requirements, detailing APIs, formatting directory trees, setting up dev servers, and deploying to servers takes hours. Simple AI coders only generate code snippets; they cannot coordinate the full multi-tier software lifecycle.",
    solution: "Built a hierarchical multi-agent framework. A PM Agent generates a complete markdown PRD; an Architect Agent maps database schemas and API routers; a Coder Agent synthesizes file directories and components; a DevOps Agent containerizes the codebase using Docker, routes traffic using Caddy reverse proxy, and deploys to AWS EC2 integrated with MongoDB Atlas.",
    challenges: "Maintaining logical synchronization between agents. If the Architect Agent changes database field names, the Coder Agent must update endpoints and client states accordingly. Resolving this required rigid structural JSON validation using Pydantic models at each agent boundary.",
    tradeoffs: "Opted for a stateless FastAPI server with JWT authentication rather than an enterprise Nest.js architecture. This minimal container memory footprint allows the entire gateway to compile and run efficiently on a cost-effective AWS EC2 micro instance.",
    lessonsLearned: "Systematic schema checks are more reliable than raw prompting. Introducing rigid syntax parsers to double-check agent outputs reduced file synthesis compilation errors by 80%.",
    architectureDiagramType: "forge-ai",
    folderStructure: `collaborative-whiteboard/
├── client/
│   ├── src/
│   │   ├── app/             # Next.js App Router
│   │   ├── components/      # Collaborative canvas, cursor tracking
│   │   └── hooks/           # useWebSockets hook
│   ├── Dockerfile
│   └── package.json
├── server/
│   ├── app/
│   │   ├── api/             # API Router endpoints
│   │   ├── websocket/       # WS Connection Manager
│   │   └── main.py          # FastAPI Entry
│   ├── Dockerfile
│   └── requirements.txt
├── Caddyfile                # Automated SSL reverse proxy
└── docker-compose.yml       # Multi-container orchestration`,
    deployment: [
      "1. Build frontend client and API backend Docker images.",
      "2. Provision EC2 Security Groups to allow ports 80, 443, and 22.",
      "3. Clone the synthesized codebase onto the Ubuntu instance.",
      "4. Launch container stacks in detached mode: docker compose up -d.",
      "5. Let Caddy resolve and bind automatic Let's Encrypt SSL certificates."
    ]
  },
  {
    id: "realtime-object-detector",
    index: "02",
    title: "Real-Time Object Detector",
    subtitle: "Edge AI & GPU Acceleration",
    tech: ["Python", "YOLOv8", "OpenCV", "PyTorch", "CUDA"],
    github: "https://github.com/devadevan-b-p",
    featured: true,
    overview: "A high-speed, GPU-accelerated computer vision processing tool engineered for real-time webcam video stream analysis.",
    problem: "Real-time object detection requires frame-by-frame analysis under 16ms to achieve 60 FPS feeds. Standard CPU-bound processing causes frame congestion, high latencies, and drops frame rates to single digits.",
    solution: "Leveraged PyTorch with custom CUDA bindings to execute parallel tensor operations directly on NVIDIA graphics cards. The camera video stream feeds frames directly into OpenCV buffers, which are mapped to GPU VRAM for instant YOLOv8 inference.",
    challenges: "CPU-to-GPU memory transfer overhead (Host-to-Device latency). Writing raw frames from RAM to VRAM repeatedly created bottlenecks. We solved this by using unified memory buffers and resizing image matrices in OpenCV before device allocation.",
    tradeoffs: "Chose YOLOv8-small over YOLOv8-large. Although YOLOv8-large increases classification confidence scores by 4.2%, it doubles inference latency. YOLOv8-small maintains 60 FPS under a stable 12ms GPU processing window.",
    lessonsLearned: "Hardware-level memory optimization is just as important as neural model complexity. Re-routing pixel arrays directly to local device buffers bypassed major memory lockups.",
    architectureDiagramType: "object-detector",
    folderStructure: `edge-detector/
├── app/
│   ├── core/
│   │   ├── engine.py        # CUDA frame processor
│   │   └── detector.py      # YOLOv8 inference engine
│   ├── ui/
│   │   └── renderer.py      # OpenCV overlay drawings
│   └── main.py              # Camera loop entry
├── models/
│   └── yolov8s.pt           # Pre-trained weights tensor
├── Dockerfile.gpu           # CUDA Toolkit runtime image
└── requirements.txt`,
    deployment: [
      "1. Install NVIDIA Container Toolkit on local hardware host.",
      "2. Build the Dockerfile configured with CUDA 12 support.",
      "3. Mount local webcam inputs inside the running Docker container.",
      "4. Run the image allocating the active GPU device via: --gpus all."
    ]
  },
  {
    id: "civic-issue-reporting",
    index: "03",
    title: "Civic Issue Reporting System",
    subtitle: "Real-Time Geo-Mapping Webapp",
    tech: ["React (Vite)", "FastAPI", "MongoDB", "Tailwind CSS", "WebSockets", "Caddy"],
    github: "https://github.com/devadevan-b-p",
    featured: true,
    overview: "A full-stack, geo-spatial reporting platform for public incident flagging and administrative tracking.",
    problem: "Local municipalities struggle with slow reporting systems. Citizens lack instant feedback when reporting issues like road potholes, and administrative dashboards lag behind current updates.",
    solution: "Designed a real-time geo-reporting web app. Citizens report incidents with coordinate mapping. FastAPI processes and writes reports to MongoDB using spatial indices. Administration views update live via a persistent WebSockets broadcaster.",
    challenges: "Handling spatial queries efficiently under high traffic. Scanning the database sequentially to find nearby cluster reports is slow. We resolved this by defining a 2dsphere spatial index on MongoDB geo-properties.",
    tradeoffs: "Used WebSockets instead of Server-Sent Events (SSE). While SSE uses fewer ports, WebSockets allows bi-directional communication, supporting interactive administrative chat and real-time state changes.",
    lessonsLearned: "Spatial clustering is essential to prevent map clutter. Grouping multiple markers using coordinate radius boundaries drastically improved rendering speeds on client devices.",
    architectureDiagramType: "civic-reporter",
    folderStructure: `civic-report/
├── frontend/
│   ├── src/
│   │   ├── components/      # Leaflet map, dashboard panels
│   │   └── App.tsx          # Client entry point
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── database/        # MongoDB client & spatial models
│   │   ├── routers/         # REST API endpoints
│   │   └── socket/          # WebSocket dashboard server
│   └── main.py
├── docker-compose.yml
└── Caddyfile`,
    deployment: [
      "1. Configure MongoDB Atlas cluster with geosphere indices.",
      "2. Containerize Vite client and FastAPI backend projects.",
      "3. Spin up services on virtual node using docker-compose.",
      "4. Set up Caddy to forward traffic and manage SSL."
    ]
  },
  {
    id: "ecommerce-platform",
    index: "04",
    title: "E-Commerce Microservices",
    subtitle: "Scalable Order & Inventory Engine",
    tech: ["React", "FastAPI", "PostgreSQL", "AWS S3", "Docker"],
    github: "https://github.com/devadevan-b-p",
    featured: true,
    overview: "A secure, scalable transactional microservice backend designed for checkout, inventory state, and asset handling.",
    problem: "E-commerce checkout platforms face inventory race conditions. If two users click buy on a single remaining item simultaneously, database latency can cause double-purchases and data corruption.",
    solution: "Implemented strict transactional boundaries and inventory locking models in PostgreSQL. Product images are stored securely on AWS S3, while backend services operate inside isolated Docker microcontainers.",
    challenges: "Preventing transaction lockouts during simultaneous checkouts. Pessimistic DB locking slows down operations. We solved this by using PostgreSQL row-level locks (SELECT FOR UPDATE) scoped strictly to active product inventory tables.",
    tradeoffs: "Used AWS S3 over local storage containers. While S3 adds remote network calls, it offloads heavy files from the compute node, ensuring high asset availability and scalable server performance.",
    lessonsLearned: "Database transactions must remain as short as possible. Performing long external HTTP requests inside PostgreSQL transactional blocks locks rows too long, creating severe bottlenecks.",
    architectureDiagramType: "ecommerce",
    folderStructure: `ecommerce-backend/
├── src/
│   ├── orders/              # Orders service router
│   ├── inventory/           # Inventory locking logic
│   └── storage/             # AWS S3 client wrappers
├── migrations/              # DB schemas (SQLAlchemy)
├── docker-compose.yml
└── main.py`,
    deployment: [
      "1. Provision PostgreSQL database on Amazon RDS.",
      "2. Set up AWS S3 bucket with restricted IAM read/write policies.",
      "3. Pack checkouts API inside microcontainers.",
      "4. Deploy container hosts onto cloud nodes."
    ]
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

export type Credential = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl: string;
  pdfPreview: string; // Used to render visual mock preview
  skillsLearned: string[];
};

export const credentials: Credential[] = [
  {
    id: "aws-fundamentals",
    title: "AWS Fundamentals Internship",
    issuer: "ICT Academy of Kerala",
    date: "2024",
    credentialId: "ICTAK-AWS-2024-9382",
    verificationUrl: "https://ictkerala.org/verification",
    pdfPreview: "aws-fundamentals",
    skillsLearned: ["EC2 Computing", "S3 Storage Pools", "IAM Security Roles", "VPC Subnetting", "RDS Database Ingest"],
  },
  {
    id: "vertex-ai-prompting",
    title: "Prompt Design in Vertex AI",
    issuer: "Google Cloud Skills Boost",
    date: "2024",
    credentialId: "GCP-VAI-8490-2810",
    verificationUrl: "https://www.cloudskillsboost.google/public_profiles/devadevan",
    pdfPreview: "vertex-ai",
    skillsLearned: ["LLM Hyperparameter Tuning", "Few-Shot Instruction Modeling", "System Prompts Scoping", "Vertex AI Studio"],
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
  | "forge-ai" 
  | "systems" 
  | "edge-ai" 
  | "impact" 
  | "lessons-learned" 
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
    id: "forge-ai",
    number: "03",
    label: "Flagship Project",
    title: "Forge AI",
    subtitle: "Autonomous Software Engineer Agent",
    range: [0.25, 0.58],
  },
  {
    id: "systems",
    number: "04",
    label: "Systems",
    title: "Systems",
    range: [0.58, 0.70],
  },
  {
    id: "edge-ai",
    number: "05",
    label: "Edge AI",
    title: "Edge AI",
    range: [0.70, 0.82],
  },
  {
    id: "impact",
    number: "06",
    label: "Impact",
    title: "Impact",
    range: [0.82, 0.90],
  },
  {
    id: "lessons-learned",
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

export type LabItem = {
  id: string;
  title: string;
  type: "Prototype" | "Experiment" | "Utility" | "Learning";
  status: "Active" | "WIP" | "Archived";
  description: string;
  tech: string[];
  github: string;
};

export const labItems: LabItem[] = [
  {
    id: "cuda-sandbox",
    title: "CUDA Kernel Vector Add",
    type: "Experiment",
    status: "Active",
    description: "Low-level PyTorch CUDA extension written in C++ and CUDA C to optimize vector summation operations across block Grids.",
    tech: ["CUDA C", "PyTorch", "C++", "Python"],
    github: "https://github.com/devadevan-b-p",
  },
  {
    id: "prompt-evaluator",
    title: "Vertex AI Prompt Assessor",
    type: "Utility",
    status: "WIP",
    description: "A Python utility to systematically benchmark Gemini model response variance across distinct temperature parameters.",
    tech: ["Python", "Vertex AI", "FastAPI"],
    github: "https://github.com/devadevan-b-p",
  },
  {
    id: "caddy-validator",
    title: "Docker Caddyfile Ingester",
    type: "Utility",
    status: "Active",
    description: "A fast terminal-based validator that inspects Caddyfile config layouts for container networking paths.",
    tech: ["Go", "Caddy", "Docker"],
    github: "https://github.com/devadevan-b-p",
  },
  {
    id: "agent-planner",
    title: "Multi-Agent Graph Planner",
    type: "Prototype",
    status: "WIP",
    description: "A graph-based planning engine testing task subdivision workflows for autonomous code generator loops.",
    tech: ["FastAPI", "Python", "WebSockets"],
    github: "https://github.com/devadevan-b-p",
  },
];
