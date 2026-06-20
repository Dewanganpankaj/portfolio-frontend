// ============================================================
// components/ThemeToggle.tsx
// Theme toggle button with smooth animations
// ============================================================

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg bg-[#16161F] hover:bg-[#1E1E2E] transition-all duration-300 border border-[#1E1E2E] hover:border-[#00FFC2] hover:shadow-[0_0_15px_rgba(0,255,194,0.2)]"
      aria-label="Toggle theme"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-[#00FFC2]" />
      ) : (
        <Moon size={18} className="text-[#9B5DE5]" />
      )}
    </button>
  );
}
