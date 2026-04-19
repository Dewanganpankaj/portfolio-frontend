// ============================================================
// components/SkillsSection.tsx
// Skills section with animated progress bars, grouped by category.
// ============================================================

"use client";

import { useEffect, useRef, useState } from "react";
import { skills, Skill } from "@/portfolio.config";

// ── Category display config ───────────────────────────────
const CATEGORIES: { key: Skill["category"]; label: string; color: string }[] = [
  { key: "language",  label: "Languages",  color: "#00FFC2" },
  { key: "framework", label: "Frameworks", color: "#9B5DE5" },
  { key: "ai",        label: "AI / GenAI", color: "#FF6B35" },
  { key: "tool",      label: "DevOps & Tools", color: "#4CC9F0" },
];

// ── Single skill bar component ────────────────────────────
function SkillBar({
  skill,
  visible,
  color,
  delay,
}: {
  skill: Skill;
  visible: boolean;
  color: string;
  delay: number;
}) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-sm text-[#8888A8] group-hover:text-[#F0F0F5] transition-colors">
          {skill.name}
        </span>
        <span className="font-mono text-xs" style={{ color }}>
          {skill.level}%
        </span>
      </div>

      {/* Track */}
      <div className="h-1.5 bg-[#1E1E2E] rounded-full overflow-hidden">
        {/* Fill — animated when section becomes visible */}
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${skill.level}%` : "0%",
            transitionDelay: `${delay}ms`,
            background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
            boxShadow: visible ? `0 0 8px ${color}60` : "none",
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  // Reveal on scroll
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="py-24 relative">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* ── Section header ─────────────────────────────── */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[#00FFC2] text-sm">02.</span>
          <h2 className="font-display text-5xl tracking-widest text-[#F0F0F5]">SKILLS</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#1E1E2E] to-transparent" />
        </div>
        <p className="font-mono text-[#44445A] text-xs tracking-widest mb-16">
          // WHAT I WORK WITH
        </p>

        {/* ── Skills Grid ────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-10">
          {CATEGORIES.map((cat) => {
            // Filter skills by this category
            const categorySkills = skills.filter((s) => s.category === cat.key);

            return (
              <div key={cat.key} className="glass-card rounded-xl p-6 border border-[#1E1E2E]">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-2 h-6 rounded-sm"
                    style={{ background: cat.color }}
                  />
                  <h3
                    className="font-display text-2xl tracking-wider"
                    style={{ color: cat.color }}
                  >
                    {cat.label.toUpperCase()}
                  </h3>
                  <span className="ml-auto font-mono text-xs text-[#44445A]">
                    {categorySkills.length} skills
                  </span>
                </div>

                {/* Skill bars */}
                <div className="space-y-4">
                  {categorySkills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      visible={visible}
                      color={cat.color}
                      delay={i * 80}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom decorative stat ─────────────────────── */}
        <div className="mt-16 text-center">
          <p className="font-mono text-[#44445A] text-sm">
            // Always learning · Currently exploring{" "}
            <span className="text-[#00FFC2]">Agentic AI</span> &{" "}
            <span className="text-[#9B5DE5]">Multi-modal LLMs</span>
          </p>
        </div>
      </div>
    </section>
  );
}
