// ============================================================
// components/Footer.tsx
// Minimal footer with nav links and GitHub link.
// ============================================================

import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import { personalInfo } from "@/portfolio.config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1E1E2E] py-10 mt-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#00FFC2] rounded flex items-center justify-center">
              <Code2 size={14} className="text-[#0A0A0F]" />
            </div>
            <span className="font-display text-base tracking-widest text-[#F0F0F5]">
              {personalInfo.name.toUpperCase()}
            </span>
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs text-[#44445A]">
            © {year} {personalInfo.name} · Built with Next.js + TypeScript
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
              className="text-[#44445A] hover:text-[#9B5DE5] transition-colors">
              <Github size={18} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
              className="text-[#44445A] hover:text-[#4CC9F0] transition-colors">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${personalInfo.email}`}
              className="text-[#44445A] hover:text-[#00FFC2] transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
