// ============================================================
// components/ContactSection.tsx
// Contact form — calls FastAPI backend to save message + send email
// ============================================================
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Send,
  MessageSquareQuote,
  Loader2,
} from "lucide-react";
import { personalInfo } from "@/portfolio.config";

// ── Inline API call — with better error handling ───────────────
async function submitContactForm(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";
  
  console.log("📤 Sending contact form to:", `${BASE_URL}/contact/`);
  console.log("📋 Payload:", data);

  try {
    const res = await fetch(`${BASE_URL}/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("📊 Response status:", res.status);

    if (!res.ok) {
      let err: any = {};
      try {
        err = await res.json();
      } catch (e) {
        console.error("Failed to parse error response:", e);
      }
      
      const errorMsg = err.detail || err.error || err.message || `Error ${res.status}`;
      console.error("❌ Backend error:", errorMsg);
      throw new Error(errorMsg);
    }

    const result = await res.json();
    console.log("✅ Success response:", result);
    return result;
  } catch (error) {
    console.error("🔥 Fetch error:", error);
    
    // Provide helpful error message based on the error type
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Cannot connect to backend. Make sure the backend server is running at " +
        `${BASE_URL}. Start it with: python -m uvicorn app.main:app --reload`
      );
    }
    
    throw error;
  }
}

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSend = async () => {
    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setStatusMessage("Please fill in Name, Email and Message.");
      return;
    }

    // Validate message length
    if (form.message.trim().length < 10) {
      setStatus("error");
      setStatusMessage("Message must be at least 10 characters long.");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const result = await submitContactForm({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject?.trim() || undefined,
        message: form.message.trim(),
      });

      setStatus("success");
      setStatusMessage(result.message || "Message sent! I'll get back to you soon. 🚀");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      const errorMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setStatusMessage(errorMsg);
      console.error("Contact form error:", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-6 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[#00FFC2] text-sm">05.</span>
          <h2 className="font-display text-5xl tracking-widest text-[#F0F0F5]">CONTACT</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#1E1E2E] to-transparent" />
        </div>
        <p className="font-mono text-[#44445A] text-xs tracking-widest mb-16">
          // LET&apos;S CONNECT
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: social links */}
          <div>
            <h3 className="font-display text-4xl tracking-wider text-[#F0F0F5] mb-4">GET IN TOUCH</h3>
            <p className="text-[#8888A8] font-body text-base leading-relaxed mb-8">
              Whether you have a project idea, a job opportunity, or just want to talk tech —
              my inbox is always open. I&apos;ll get back to you within 24 hours.
            </p>

            <div className="space-y-3">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card border border-[#1E1E2E] rounded-xl hover:border-[#9B5DE5] hover:shadow-[0_0_20px_rgba(155,93,229,0.1)] transition-all group">
                <Github size={20} className="text-[#9B5DE5]" />
                <div>
                  <div className="font-mono text-sm text-[#F0F0F5]">GitHub</div>
                  <div className="font-mono text-xs text-[#44445A] group-hover:text-[#9B5DE5] transition-colors">
                    {personalInfo.github.replace("https://", "")}
                  </div>
                </div>
                <span className="ml-auto text-[#44445A] group-hover:text-[#9B5DE5] text-xs font-mono">↗</span>
              </a>

              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card border border-[#1E1E2E] rounded-xl hover:border-[#4CC9F0] hover:shadow-[0_0_20px_rgba(76,201,240,0.1)] transition-all group">
                <Linkedin size={20} className="text-[#4CC9F0]" />
                <div>
                  <div className="font-mono text-sm text-[#F0F0F5]">LinkedIn</div>
                  <div className="font-mono text-xs text-[#44445A] group-hover:text-[#4CC9F0] transition-colors">
                    {personalInfo.linkedin.replace("https://", "")}
                  </div>
                </div>
                <span className="ml-auto text-[#44445A] group-hover:text-[#4CC9F0] text-xs font-mono">↗</span>
              </a>

              <a href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 glass-card border border-[#1E1E2E] rounded-xl hover:border-[#00FFC2] hover:shadow-[0_0_20px_rgba(0,255,194,0.1)] transition-all group">
                <Mail size={20} className="text-[#00FFC2]" />
                <div>
                  <div className="font-mono text-sm text-[#F0F0F5]">Email</div>
                  <div className="font-mono text-xs text-[#44445A] group-hover:text-[#00FFC2] transition-colors">
                    {personalInfo.email}
                  </div>
                </div>
                <span className="ml-auto text-[#44445A] group-hover:text-[#00FFC2] text-xs font-mono">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Message Card */}
      <div className="max-w-4xl mx-auto px-6 mt-24">
        <div className="relative glass-card border border-[#9B5DE5]/30 rounded-2xl p-8 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00FFC2] via-[#9B5DE5] to-[#FF6B35]" />
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#9B5DE5]/10 blur-3xl" />

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-[#9B5DE5]/20 border border-[#9B5DE5]/30 flex items-center justify-center">
              <MessageSquareQuote size={18} className="text-[#9B5DE5]" />
            </div>
            <div>
              <div className="font-display text-xl tracking-widest text-[#F0F0F5]">
                A NOTE FROM THE DEVELOPER
              </div>
              <div className="font-mono text-xs text-[#44445A]">// personal.message</div>
            </div>
          </div>

          <p className="font-body text-[#8888A8] leading-relaxed text-base whitespace-pre-line">
            {personalInfo.developerMessage}
          </p>

          <div className="mt-6 pt-6 border-t border-[#1E1E2E] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FFC2] to-[#9B5DE5] flex items-center justify-center font-display text-sm text-[#0A0A0F]">
              {personalInfo.name.charAt(0)}
            </div>
            <div>
              <div className="font-mono text-sm text-[#F0F0F5]">{personalInfo.name}</div>
              <div className="font-mono text-xs text-[#44445A]">{personalInfo.location}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}