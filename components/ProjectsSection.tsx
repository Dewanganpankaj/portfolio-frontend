// ============================================================
// components/ProjectsSection.tsx
// Projects grid with:
//   • GitHub button → auto-redirects to repo
//   • Live URL button for deployed projects
//   • "Add Project" modal to let you paste a deployed link
//   • Category filter tabs
// ============================================================

"use client";

import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, Plus, X, Sparkles } from "lucide-react";
import { projects, Project } from "@/portfolio.config";

// ── Category filter options ────────────────────────────────
const FILTERS = [
  { key: "all",       label: "All Projects" },
  { key: "genai",     label: "GenAI" },
  { key: "java",      label: "Java" },
  { key: "fullstack", label: "Full Stack" },
];

// ── Category color map ─────────────────────────────────────
const CAT_COLOR: Record<string, string> = {
  genai:     "#00FFC2",
  java:      "#FF6B35",
  fullstack: "#9B5DE5",
  other:     "#4CC9F0",
};

// ── Add-project modal component ────────────────────────────
// Allows users to paste a deployed URL or GitHub link for a project.
function AddProjectModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (proj: Project) => void;
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
    category: "other" as Project["category"],
  });

  const handleSubmit = () => {
    if (!form.title || !form.description) return;
    onAdd({
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      liveUrl: form.liveUrl || undefined,
      githubUrl: form.githubUrl || undefined,
      category: form.category,
      featured: false,
    });
    onClose();
  };

  return (
    // Modal backdrop
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="glass-card border border-[#1E1E2E] rounded-2xl p-8 w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-3xl tracking-wider text-[#F0F0F5]">ADD PROJECT</h3>
          <button onClick={onClose} className="text-[#44445A] hover:text-[#F0F0F5]">
            <X size={20} />
          </button>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          <input
            className="w-full bg-[#1E1E2E] border border-[#1E1E2E] focus:border-[#00FFC2] rounded-lg px-4 py-3 font-mono text-sm text-[#F0F0F5] outline-none transition-colors"
            placeholder="Project Title *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className="w-full bg-[#1E1E2E] border border-[#1E1E2E] focus:border-[#00FFC2] rounded-lg px-4 py-3 font-mono text-sm text-[#F0F0F5] outline-none transition-colors resize-none h-24"
            placeholder="Description *"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            className="w-full bg-[#1E1E2E] border border-[#1E1E2E] focus:border-[#00FFC2] rounded-lg px-4 py-3 font-mono text-sm text-[#F0F0F5] outline-none transition-colors"
            placeholder="Tech Stack (comma-separated: React, Java, ...)"
            value={form.techStack}
            onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          />
          <input
            className="w-full bg-[#1E1E2E] border border-[#1E1E2E] focus:border-[#00FFC2] rounded-lg px-4 py-3 font-mono text-sm text-[#F0F0F5] outline-none transition-colors"
            placeholder="🔗 Deployed URL (https://...)"
            value={form.liveUrl}
            onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
          />
          <input
            className="w-full bg-[#1E1E2E] border border-[#1E1E2E] focus:border-[#9B5DE5] rounded-lg px-4 py-3 font-mono text-sm text-[#F0F0F5] outline-none transition-colors"
            placeholder="GitHub Repo URL (https://github.com/...)"
            value={form.githubUrl}
            onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
          />
          {/* Category select */}
          <select
            className="w-full bg-[#1E1E2E] border border-[#1E1E2E] rounded-lg px-4 py-3 font-mono text-sm text-[#8888A8] outline-none"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as Project["category"] })}
          >
            <option value="genai">GenAI</option>
            <option value="java">Java</option>
            <option value="fullstack">Full Stack</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-[#00FFC2] text-[#0A0A0F] font-mono font-bold text-sm rounded-lg hover:shadow-[0_0_30px_rgba(0,255,194,0.4)] transition-all"
          >
            Add Project
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-[#1E1E2E] text-[#8888A8] font-mono text-sm rounded-lg hover:border-[#44445A] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Project card component ─────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const color = CAT_COLOR[project.category] || "#4CC9F0";

  // Clicking GitHub button auto-redirects to the repo
  const openGitHub = () => {
    if (project.githubUrl) window.open(project.githubUrl, "_blank", "noopener noreferrer");
  };

  const openLive = () => {
    if (project.liveUrl) window.open(project.liveUrl, "_blank", "noopener noreferrer");
  };

  return (
    <div className="glass-card neon-border rounded-xl p-6 flex flex-col h-full group hover:-translate-y-1 transition-all duration-300">
      {/* Category + featured badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="font-mono text-xs px-2 py-0.5 rounded"
          style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}
        >
          {project.category.toUpperCase()}
        </span>
        {project.featured && (
          <span className="flex items-center gap-1 font-mono text-xs text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/20 px-2 py-0.5 rounded">
            <Sparkles size={10} />
            Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl tracking-wider text-[#F0F0F5] mb-2 group-hover:text-glow transition-all">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-[#8888A8] font-body text-sm leading-relaxed flex-1 mb-4">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.techStack.map((t) => (
          <span key={t} className="font-mono text-xs px-2 py-0.5 bg-[#1E1E2E] text-[#44445A] rounded">
            {t}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {/* GitHub button — auto-redirects to repo */}
        {project.githubUrl && (
          <button
            onClick={openGitHub}
            className="flex items-center gap-2 flex-1 justify-center py-2.5 border border-[#1E1E2E] text-[#8888A8] font-mono text-xs rounded-lg hover:border-[#9B5DE5] hover:text-[#9B5DE5] transition-all"
          >
            <Github size={14} />
            GitHub Repo
          </button>
        )}
        {/* Live URL button */}
        {project.liveUrl && (
          <button
            onClick={openLive}
            className="flex items-center gap-2 flex-1 justify-center py-2.5 border font-mono text-xs rounded-lg transition-all"
            style={{
              borderColor: `${color}50`,
              color: color,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${color}30`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            <ExternalLink size={14} />
            Live Demo
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main Projects Section ──────────────────────────────────
export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  // Extra projects added dynamically via the modal
  const [extraProjects, setExtraProjects] = useState<Project[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Combine static + user-added projects
  const allProjects = [...projects, ...extraProjects];

  // Filter by active category tab
  const filtered =
    activeFilter === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 relative">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* ── Section header ─────────────────────────────── */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[#00FFC2] text-sm">04.</span>
          <h2 className="font-display text-5xl tracking-widest text-[#F0F0F5]">PROJECTS</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#1E1E2E] to-transparent" />
        </div>
        <p className="font-mono text-[#44445A] text-xs tracking-widest mb-10">
          // THINGS I&apos;VE BUILT
        </p>

        {/* ── Filter tabs + Add button ────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`font-mono text-xs px-4 py-2 rounded-lg border transition-all duration-200 ${
                  activeFilter === f.key
                    ? "bg-[#00FFC2] text-[#0A0A0F] border-[#00FFC2] font-bold"
                    : "border-[#1E1E2E] text-[#8888A8] hover:border-[#00FFC2]/50 hover:text-[#00FFC2]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Add project button */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-[#9B5DE5]/50 text-[#9B5DE5] font-mono text-xs rounded-lg hover:border-[#9B5DE5] hover:shadow-[0_0_20px_rgba(155,93,229,0.2)] transition-all"
          >
            <Plus size={14} />
            Add Project
          </button>
        </div>

        {/* ── Project cards grid ─────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-[#44445A]">No projects in this category yet.</p>
          </div>
        )}
      </div>

      {/* ── Add Project Modal ────────────────────────────── */}
      {modalOpen && (
        <AddProjectModal
          onClose={() => setModalOpen(false)}
          onAdd={(p) => setExtraProjects((prev) => [p, ...prev])}
        />
      )}
    </section>
  );
}
