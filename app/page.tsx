// ============================================================
// app/page.tsx
// Root page — assembles all portfolio sections in order.
// ============================================================

import Navbar           from "@/components/Navbar";
import HeroSection      from "@/components/HeroSection";
import AboutSection     from "@/components/AboutSection";
import SkillsSection    from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection  from "@/components/ProjectsSection";
import ContactSection   from "@/components/ContactSection";
import Footer           from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ── Sticky Navigation ─── */}
      <Navbar />

      {/* ── 01. Hero ─────────── */}
      <HeroSection />

      {/* ── Horizontal divider ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent" />
      </div>

      {/* ── 02. About ────────── */}
      <AboutSection />

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent" />
      </div>

      {/* ── 03. Skills ───────── */}
      <SkillsSection />

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent" />
      </div>

      {/* ── 04. Experience ───── */}
      <ExperienceSection />

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent" />
      </div>

      {/* ── 05. Projects ─────── */}
      <ProjectsSection />

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent" />
      </div>

      {/* ── 06. Contact + Dev Message ── */}
      <ContactSection />

      {/* ── Footer ───────────── */}
      <Footer />
    </main>
  );
}
