// ============================================================
// components/ExperienceSection.tsx
// Vertical timeline of work experience with animated reveal.
// ============================================================

"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase } from "lucide-react";
import { experience } from "@/portfolio.config";

// ── Single timeline entry ─────────────────────────────────
function TimelineEntry({
  exp,
  index,
  visible,
}: {
  exp: typeof experience[number];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className={`relative pl-8 transition-all duration-700 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* ── Timeline dot ────────────────────────────────── */}
      <div className="absolute left-0 top-1.5 flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-[#00FFC2] border-2 border-[#0A0A0F] z-10 shadow-[0_0_10px_rgba(0,255,194,0.6)]" />
        {/* Vertical connector line (hidden for last item) */}
        {index < experience.length - 1 && (
          <div className="w-px flex-1 bg-[#1E1E2E] mt-2 min-h-[80px]" />
        )}
      </div>

      {/* ── Content card ────────────────────────────────── */}
      <div className="glass-card neon-border rounded-xl p-6 mb-8 group hover:-translate-y-0.5 transition-all duration-300">
        {/* Period badge */}
        <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#44445A] bg-[#1E1E2E] px-3 py-1 rounded-full mb-3">
          <Briefcase size={10} className="text-[#00FFC2]" />
          {exp.period}
        </div>

        {/* Company & Role */}
        <div className="mb-1">
          <h3 className="font-display text-2xl tracking-wider text-[#F0F0F5]">{exp.role}</h3>
          <span className="font-mono text-sm text-[#00FFC2]">@ {exp.company}</span>
        </div>

        {/* Description */}
        <p className="text-[#8888A8] font-body text-sm leading-relaxed mt-3 mb-4">
          {exp.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-2.5 py-1 rounded-md bg-[#1E1E2E] text-[#8888A8] border border-[#1E1E2E] group-hover:border-[#00FFC2]/20 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
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
    <section id="experience" className="py-24 relative">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-6 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* ── Section header ─────────────────────────────── */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[#00FFC2] text-sm">03.</span>
          <h2 className="font-display text-5xl tracking-widest text-[#F0F0F5]">EXPERIENCE</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#1E1E2E] to-transparent" />
        </div>
        <p className="font-mono text-[#44445A] text-xs tracking-widest mb-16">
          // WHERE I&apos;VE WORKED
        </p>

        {/* ── Timeline ───────────────────────────────────── */}
        <div className="relative">
          {experience.map((exp, i) => (
            <TimelineEntry key={i} exp={exp} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
