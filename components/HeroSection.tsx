// ============================================================
// components/HeroSection.tsx
// Resume button — Next.js API route use karta hai force download ke liye
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { MapPin, Download, ArrowDown } from "lucide-react";
import { personalInfo, stats } from "@/portfolio.config";

// ── Typewriter hook ───────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

// ── Particles ─────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: (i * 37 + 13) % 100,
  y: (i * 53 + 7) % 100,
  size: (i % 3) + 1,
  delay: (i * 0.3) % 3,
}));

export default function HeroSection() {
  const role = useTypewriter(personalInfo.roles);
  const [downloading, setDownloading] = useState(false);

  const scrollDown = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  // ── Resume Download ─────────────────────────────────────────
  // Next.js API route /api/download-resume use karta hai.
  // Yeh route Content-Disposition: attachment header set karta hai
  // jisse browser force download karta hai — open nahi karta.
  const handleResumeDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch("/api/download-resume");
      if (!response.ok) throw new Error("Resume not found");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Pankaj_Dewang_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback — direct open
      window.open(personalInfo.resumeUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-1 absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#00FFC2]/5 blur-[120px]" />
        <div className="orb-2 absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#9B5DE5]/8 blur-[100px]" />
        <div className="orb-1 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#FF6B35]/4 blur-[80px]" />
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#00FFC2] opacity-20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1E1E2E] bg-[#16161F]/80 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#00FFC2] animate-pulse" />
          <span className="font-mono text-xs text-[#8888A8]">Available for opportunities</span>
        </div>

        {/* Name */}
        <h1 className="font-display text-[clamp(4rem,12vw,9rem)] leading-none tracking-widest text-[#F0F0F5] mb-4">
          {personalInfo.name.toUpperCase()}
        </h1>

        {/* Typewriter role */}
        <div className="flex items-center gap-3 mb-6 h-14">
          <span className="text-[#8888A8] font-mono text-xl">I am a</span>
          <span className="font-display text-[clamp(1.5rem,4vw,2.5rem)] tracking-wider text-[#00FFC2] text-glow min-w-[280px]">
            {role}
            <span className="cursor-blink text-[#00FFC2]">|</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="text-[#8888A8] font-body text-lg max-w-xl mb-3">
          {personalInfo.tagline}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-[#44445A] font-mono text-sm mb-10">
          <MapPin size={14} className="text-[#00FFC2]" />
          {personalInfo.location}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-16">

          {/* View Projects */}
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 bg-[#00FFC2] text-[#0A0A0F] font-mono font-bold text-sm rounded-md hover:shadow-[0_0_40px_rgba(0,255,194,0.4)] hover:-translate-y-0.5 transition-all duration-200"
          >
            View Projects →
          </button>

          {/* Resume Download — uses /api/download-resume route */}
          <button
            onClick={handleResumeDownload}
            disabled={downloading}
            className={`flex items-center gap-2 px-8 py-3.5 border border-[#1E1E2E] font-mono text-sm rounded-md transition-all duration-200 ${
              downloading
                ? "text-[#44445A] cursor-not-allowed"
                : "text-[#F0F0F5] hover:border-[#00FFC2] hover:text-[#00FFC2]"
            }`}
          >
            <Download size={14} className={downloading ? "animate-bounce" : ""} />
            {downloading ? "Downloading..." : "Resume"}
          </button>

          {/* Hire Me */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="px-8 py-3.5 border border-[#9B5DE5]/50 text-[#9B5DE5] font-mono text-sm rounded-md hover:border-[#9B5DE5] hover:shadow-[0_0_20px_rgba(155,93,229,0.2)] transition-all duration-200"
          >
            Hire Me
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-5 rounded-xl neon-border text-center group">
              <div className="font-display text-4xl text-[#00FFC2] text-glow group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-[#44445A] mt-1 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#44445A] hover:text-[#00FFC2] transition-colors group"
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <ArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
}