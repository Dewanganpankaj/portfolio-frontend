// ============================================================
// portfolio.config.ts
// ── Central data file for your portfolio.
//    Edit this file to update your info, skills, projects, etc.
// ============================================================

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;       // Optional: deployed project URL
  githubUrl?: string;     // Optional: GitHub repository URL
  category: "genai" | "java" | "fullstack" | "other";
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number;         // 0–100
  category: "language" | "framework" | "ai" | "tool";
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
}

// ── Personal Info ─────────────────────────────────────────
export const personalInfo = {
  name: "Pankaj Dewangan",
  tagline: "Building Intelligent Systems",
  email: "dewanganpankaj246@gmail.com",
  github: "https://github.com/Dewanganpankaj",     // ← change this
  linkedin: "https://www.linkedin.com/in/pankaj-dewangan-b707511b6/",
  location: "Hyderabad, India",
  resumeUrl: "/resume.pdf",                       // put resume.pdf in /public
  // The rotating roles shown in the hero section
  roles: [
    "Software Engineer",
    "GenAI Developer",
    "Java Developer",
    "Full-Stack Engineer",
    "LLM Integration Expert",
  ],
  // Developer message shown at the bottom of the page
  developerMessage: `Hey there! 👋 I'm passionate about building things that matter.
Whether it's crafting intelligent GenAI pipelines, architecting scalable Java microservices,
or shipping polished full-stack products — I love turning complex problems into elegant solutions.
If you're here to collaborate, hire, or just geek out about AI and code, let's connect.
The best systems are built by curious people. I hope you are one too. ✨`,
};

// ── Skills ────────────────────────────────────────────────
export const skills: Skill[] = [
  // Languages
  { name: "Java", level: 92, category: "language" },
  { name: "Python", level: 88, category: "language" },
  { name: "SQL", level: 85, category: "language" },
  { name: "JavaScript", level: 87, category: "language" },
  // Frameworks
  { name: "Spring Boot", level: 90, category: "framework" },
  { name: "React", level: 84, category: "framework" },
  { name: "FastAPI", level: 80, category: "framework" },
  // AI
  { name: "LangChain", level: 85, category: "ai" },
  { name: "LlamaIndex", level: 78, category: "ai" },
  { name: "OpenAI API", level: 90, category: "ai" },
  { name: "Embeddings", level: 75, category: "ai" },
  { name: "RAG Pipelines", level: 88, category: "ai" },
  // Tools
  { name: "Docker", level: 82, category: "tool" },
  { name: "Kubernetes", level: 70, category: "tool" },
  { name: "AWS", level: 78, category: "tool" },
  { name: "Git", level: 95, category: "tool" },
  { name: "MySQL Workbench", level: 95, category: "tool"},
];

// ── Experience ────────────────────────────────────────────
export const experience: Experience[] = [
  {
    company: "Capgemini",
    role: "Senior Analyst / GenAI Developer",
    period: "2024 – Present",
    description:
      "Building production-grade LLM pipelines, RAG systems, and Java microservices. Integrating OpenAI and open-source models into enterprise workflows.",
    tech: ["Java", "Spring Boot", "Python", "LangChain", "OpenAI API", "Kubernetes","FastAPI"],
  },
  {
    company: "M. Tech from NIT Allahabad in Computer Science",
    role: "Technical Assistant",
    period: "2022 – 2024",
    description:
    "Programmable SDN Data Plane using P4 for Custom Packet Generation & Protocol Design. Developed a P4-based programmable data plane for SDN, enabling custom packet generation and protocol design. Implemented and evaluated the system on a software switch, demonstrating enhanced network programmability and performance.",
    tech: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Docker"],
  },
  {
    company: "Freelance",
    role: "Software service provider",
    period: "2024 – Present",
    description:
      "Delivered end-to-end web applications for clients. Built React frontends, FastAPI backends, and deployed on AWS.",
    tech: ["React", "FastAPI", "TypeScript", "AWS", "MongoDB"],
  },
];

// ── Projects ──────────────────────────────────────────────
// Add YOUR projects here. liveUrl and githubUrl are optional.
// If githubUrl is set, clicking the GitHub button redirects automatically.
export const projects: Project[] = [
  {
    id: "ChatGPT for Enterprise Knowledge Bases",
    title: "ChatGPT for Enterprise Knowledge Bases",
    description:
      "Enterprise knowledge base assistant using Retrieval-Augmented Generation. Ingests PDFs, docs, and web pages; answers queries with source citations. Built with LangChain, OpenAI, and Pinecone.",
    techStack: ["Python", "Groq AI", "Pinecone", "FastAPI", "react"],
    githubUrl: "https://github.com/Dewanganpankaj/grovyAI",
    category: "genai",
    featured: true,
  },
  {
    id: "Root Cause Analysis with LLMs",
    title: "Root Cause Analysis with LLMs",
    description:
      "Developed an AI-powered root cause analysis tool using Azure OpenAI to analyze client ticket data and automatically identify underlying issues. The system leverages large language models to detect patterns, assess business impact, and highlight key areas for improvement, enabling faster decision-making and operational efficiency.",
    techStack: ["Python", "LangChain", "OpenAI", "Pinecone", "FastAPI", "React"],
    githubUrl: "https://github.com/yourusername/root-cause-analysis",

    category: "genai",
    featured: true,
  },
  {
    id: "Sentiment Analysis for Customer Feedback",
    title: "Sentiment Analysis for Customer Feedback",
    description:
      "Developed a sentiment analysis tool using LLMs to analyze customer feedback and provide insights into customer satisfaction. The system leverages large language models to classify sentiments and identify key themes in customer reviews.",
    techStack: ["Python", "OpenAI", "FastAPI"],
    githubUrl: "https://github.com/yourusername/sentiment-analysis",
    category: "genai",
    featured: true,
  },
  {
    id: "Financial Data Dashboard with Real-Time Updates",
    title: "Real-Time Analytics Dashboard",
    description:
      "Built a real-time analytics dashboard for financial data visualization. The dashboard features interactive charts and graphs that update in real-time, providing users with up-to-date insights into market trends and portfolio performance.",
    techStack: ["Python", "OpenAI", "FastAPI", "Chart.js"],
    // liveUrl: "https://your-dashboard.vercel.app",
    githubUrl: "https://github.com/Dewanganpankaj/yahoo-finance",
    category: "genai",
    featured: false,
  },
  {
    id: "Dynamic Booking and Scheduling System",
    title: "Dynamic Booking and Scheduling System",
    description:
      "Developed a dynamic booking and scheduling system using LLMs to automate appointment management and optimize resource allocation. The system leverages large language models to provide intelligent suggestions and improve user experience.",
    techStack: ["Java","Spring Boot", "React", "Next.js"],
    githubUrl: "https://github.com/Dewanganpankaj/Java_Repo",
    category: "java",
    featured: false,
  },
];

// ── Stats shown in the hero ────────────────────────────────
export const stats = [
  { label: "Years Experience", value: "1.7+" },
  { label: "Projects Shipped", value: "4+" },
  { label: "LLM Integrations", value: "15+" },
];
