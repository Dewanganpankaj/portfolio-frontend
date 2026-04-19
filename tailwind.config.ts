import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom color palette — dark cyberpunk-meets-editorial aesthetic
      colors: {
        ink: "#0A0A0F",
        surface: "#111118",
        card: "#16161F",
        border: "#1E1E2E",
        accent: "#00FFC2",       // neon mint
        accentPurple: "#9B5DE5", // electric purple
        accentOrange: "#FF6B35", // energetic orange
        textPrimary: "#F0F0F5",
        textSecondary: "#8888A8",
        textMuted: "#44445A",
      },
      fontFamily: {
        // Editorial display font
        display: ["'Bebas Neue'", "cursive"],
        // Clean mono for code-related labels
        mono: ["'JetBrains Mono'", "monospace"],
        // Body
        body: ["'DM Sans'", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "scan": "scan 3s ease-in-out infinite",
        "marquee": "marquee 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,255,194,0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(0,255,194,0.8)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(0,255,194,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,194,0.03) 1px, transparent 1px)",
        "radial-glow": "radial-gradient(ellipse at center, rgba(0,255,194,0.1) 0%, transparent 70%)",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
    },
  },
  plugins: [],
};

export default config;
