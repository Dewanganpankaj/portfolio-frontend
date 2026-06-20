// ============================================================
// components/Navbar.tsx
// Sticky top navigation bar with smooth scroll & mobile menu.
// ============================================================

"use client";

import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";
import { personalInfo } from "@/portfolio.config";
import ThemeToggle from "./ThemeToggle";

// Navigation links — each anchor maps to a section id on the page
const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  // Track scroll position to add blur/bg on scroll
  const [scrolled, setScrolled] = useState(false);
  // Mobile menu open state
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section and close mobile menu
  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0F]/90 backdrop-blur-md border-b border-[#1E1E2E]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ── Logo / Brand ─────────────────────────────── */}
        <button
          onClick={() => scrollTo("#hero")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-[#00FFC2] rounded-md flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,255,194,0.6)] transition-all">
            <Code2 size={16} className="text-[#0A0A0F]" />
          </div>
          <span className="font-display text-lg tracking-widest text-[#F0F0F5]">
            {personalInfo.name.split(" ")[0].toUpperCase()}
          </span>
        </button>

        {/* ── Desktop Links ─────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="font-mono text-sm text-[#8888A8] hover:text-[#00FFC2] transition-colors relative group"
              >
                <span className="text-[#00FFC2] mr-1 text-xs">#</span>
                {link.label}
                {/* Underline animation */}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00FFC2] group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* ── Desktop Actions ───────────────────────────── */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-[#00FFC2] text-[#00FFC2] font-mono text-sm rounded-md hover:bg-[#00FFC2] hover:text-[#0A0A0F] transition-all duration-200"
          >
            GitHub ↗
          </a>
        </div>

        {/* ── Mobile Menu Toggle ────────────────────────── */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-[#8888A8] hover:text-[#00FFC2]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown Menu ──────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden bg-[#111118]/95 backdrop-blur-md border-b border-[#1E1E2E] px-6 py-6">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="w-full text-left font-mono text-[#8888A8] hover:text-[#00FFC2] transition-colors"
                >
                  <span className="text-[#00FFC2] mr-2">//</span>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
