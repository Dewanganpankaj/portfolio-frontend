// ============================================================
// app/layout.tsx
// Root layout — sets metadata, loads fonts, wraps all pages.
// ============================================================

import type { Metadata } from "next";
// @ts-ignore
import "./globals.css";
import { personalInfo } from "@/portfolio.config";
import { ThemeProvider } from "@/lib/ThemeProvider";

// ── SEO Metadata ──────────────────────────────────────────
export const metadata: Metadata = {
  title: `${personalInfo.name} | Software Engineer & GenAI Developer`,
  description: `Portfolio of ${personalInfo.name} — Software Engineer, GenAI Developer, and Java Developer based in ${personalInfo.location}.`,
  keywords: [
    "Software Engineer",
    "GenAI Developer",
    "Java Developer",
    "LangChain",
    "OpenAI",
    "Spring Boot",
    "Next.js",
    "Full Stack",
    personalInfo.name,
  ],
  authors: [{ name: personalInfo.name }],
  openGraph: {
    title: `${personalInfo.name} — Portfolio`,
    description: `Building intelligent systems with Java, GenAI, and modern web tech.`,
    type: "website",
  },
};

// ── RootLayout Component ──────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
