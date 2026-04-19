// ============================================================
// components/AboutSection.tsx
// About section — role cards, short bio, and tech marquee strip.
// ============================================================

"use client";

import { useEffect, useRef, useState } from "react";
import { Cpu, Coffee, Layers } from "lucide-react";
import { personalInfo } from "@/portfolio.config";

// ── Role cards shown in the about section ────────────────
const ROLE_CARDS = [
  {
    icon: <Coffee size={22} className="text-[#FF6B35]" />,
    title: "Java Developer",
    color: "#FF6B35",
    description:
      "Architect scalable microservices and REST APIs with Spring Boot. Event-driven systems with Kafka. Performance-obsessed, test-driven.",
    tag: "BACKEND",
  },
  {
    icon: <Cpu size={22} className="text-[#00FFC2]" />,
    title: "GenAI Developer",
    color: "#00FFC2",
    description:
      "Build production RAG pipelines, LLM agents, and intelligent automation. Expert with LangChain, OpenAI, Anthropic, and HuggingFace.",
    tag: "AI / ML",
  },
  {
    icon: <Layers size={22} className="text-[#9B5DE5]" />,
    title: "Full-Stack Engineer",
    color: "#9B5DE5",
    description:
      "Ship polished full-stack products with Next.js, React, TypeScript on the frontend and Java/Python on the backend.",
    tag: "FULL STACK",
  },
];

// ── Marquee tech strip items ──────────────────────────────
const TECH_STRIP = [
  "Java", "Spring Boot", "Python", "LangChain", "OpenAI API",
  "Next.js", "React", "TypeScript", "Docker", "Kubernetes",
  "PostgreSQL", "Kafka", "AWS", "RAG Pipelines", "FastAPI",
  "HuggingFace", "LlamaIndex", "Git",
];

// ── Simple scroll-reveal hook ─────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function AboutSection() {
  const { ref, visible } = useReveal();

  // Duplicate tech strip for seamless loop
  const doubled = [...TECH_STRIP, ...TECH_STRIP];

  return (
    <section id="about" className="py-24 relative">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* ── Section header ─────────────────────────────── */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[#00FFC2] text-sm">01.</span>
          <h2 className="font-display text-5xl tracking-widest text-[#F0F0F5]">ABOUT ME</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#1E1E2E] to-transparent" />
        </div>
        <p className="font-mono text-[#44445A] text-xs tracking-widest mb-16">
          // WHO AM I
        </p>

        {/* ── Two-column layout ──────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Left: bio text */}
          <div className="space-y-5 text-[#8888A8] font-body text-base leading-relaxed">
            <p>
              I'm a software engineer with a passion for building systems that are both
              <span className="text-[#F0F0F5]"> intelligent</span> and
              <span className="text-[#F0F0F5]"> scalable</span>. My work sits at the
              intersection of classical backend engineering and cutting-edge AI.
            </p>
            <p>
              On the <span className="text-[#FF6B35]">Java</span> side, I design microservices
              architectures, event-driven systems with Kafka, and high-throughput REST APIs using
              Spring Boot.
            </p>
            <p>
              On the <span className="text-[#00FFC2]">GenAI</span> side, I build RAG pipelines,
              fine-tune models, integrate LLMs into enterprise workflows, and ship AI-powered
              products using LangChain, LlamaIndex, and the OpenAI / Anthropic APIs.
            </p>
            <p>
              I thrive in environments where engineering rigour meets creative problem-solving.
              Always learning. Always shipping.
            </p>
          </div>

          {/* Right: code snippet aesthetic card */}
          <div className="glass-card rounded-xl p-6 font-mono text-sm border border-[#1E1E2E]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-2 text-[#44445A] text-xs">developer.ts</span>
            </div>
            <pre className="text-[#8888A8] text-xs leading-6 overflow-x-auto">
{`const developer = {
  name: "${personalInfo.name}",
  roles: [
    "Software Engineer",
    "GenAI Developer",
    "Java Developer",
  ],
  location: "${personalInfo.location}",
  passions: [
    "LLMs", "microservices",
    "clean code", "coffee ☕",
  ],
  currentlyLearning: "Agentic AI",
  openToWork: true,
};`}
            </pre>
          </div>
        </div>

        {/* ── Role Cards ─────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {ROLE_CARDS.map((card, i) => (
            <div
              key={card.title}
              className="glass-card neon-border rounded-xl p-6 group hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Tag */}
              <span
                className="inline-block font-mono text-xs px-2 py-0.5 rounded mb-4"
                style={{
                  color: card.color,
                  background: `${card.color}15`,
                  border: `1px solid ${card.color}30`,
                }}
              >
                {card.tag}
              </span>

              {/* Icon + title */}
              <div className="flex items-center gap-3 mb-3">
                {card.icon}
                <h3
                  className="font-display text-2xl tracking-wider"
                  style={{ color: card.color }}
                >
                  {card.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[#8888A8] font-body text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scrolling Tech Strip ───────────────────────────── */}
      <div className="overflow-hidden border-y border-[#1E1E2E] py-4 bg-[#111118]">
        <div className="marquee-track flex gap-8 whitespace-nowrap w-max">
          {doubled.map((tech, i) => (
            <span
              key={i}
              className="font-mono text-xs text-[#44445A] uppercase tracking-widest hover:text-[#00FFC2] transition-colors cursor-default"
            >
              {tech}
              <span className="mx-4 text-[#1E1E2E]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
