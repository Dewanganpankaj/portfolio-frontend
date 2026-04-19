// // ============================================================
// // lib/api.ts  (add this file to your Next.js portfolio project)
// //
// // Centralised API client for all backend calls.
// // All fetch calls go through here — easy to swap base URL.
// // ============================================================

// // ── Base URL ──────────────────────────────────────────────────
// // In dev this hits localhost:8000.
// // In production set NEXT_PUBLIC_API_URL in your Vercel env vars.
// const BASE_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// // ── Generic fetch wrapper ─────────────────────────────────────
// async function apiFetch<T>(
//   path: string,
//   options: RequestInit = {}
// ): Promise<T> {
//   const url = `${BASE_URL}${path}`;

//   const res = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//     ...options,
//   });

//   if (!res.ok) {
//     // Try to parse structured error from FastAPI
//     let errorMessage = `API error ${res.status}`;
//     try {
//       const body = await res.json();
//       errorMessage = body.detail || body.error || errorMessage;
//     } catch {
//       // ignore parse errors
//     }
//     throw new Error(errorMessage);
//   }

//   return res.json() as Promise<T>;
// }

// // ────────────────────────────────────────────────────────────
// // Contact
// // ────────────────────────────────────────────────────────────

// export interface ContactPayload {
//   name: string;
//   email: string;
//   subject?: string;
//   message: string;
// }

// export interface SuccessResponse {
//   success: boolean;
//   message: string;
// }

// /**
//  * Submit the contact form to the backend.
//  * The backend will:
//  *   1. Save the message to the database
//  *   2. Email the portfolio owner (you)
//  *   3. Send a confirmation email to the visitor
//  */
// export async function submitContact(
//   payload: ContactPayload
// ): Promise<SuccessResponse> {
//   return apiFetch<SuccessResponse>("/contact/", {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });
// }

// // ────────────────────────────────────────────────────────────
// // Projects
// // ────────────────────────────────────────────────────────────

// export interface Project {
//   id: number;
//   title: string;
//   description: string;
//   tech_stack: string[];
//   live_url?: string;
//   github_url?: string;
//   category: "genai" | "java" | "fullstack" | "other";
//   is_featured: boolean;
//   is_active: boolean;
//   created_at: string;
// }

// export interface ProjectListResponse {
//   total: number;
//   items: Project[];
// }

// export interface ProjectCreatePayload {
//   title: string;
//   description: string;
//   tech_stack: string[];
//   live_url?: string;
//   github_url?: string;
//   category: string;
//   is_featured?: boolean;
// }

// /** Fetch all active projects, optionally filtered by category. */
// export async function fetchProjects(
//   category?: string,
//   featuredOnly = false
// ): Promise<ProjectListResponse> {
//   const params = new URLSearchParams();
//   if (category) params.set("category", category);
//   if (featuredOnly) params.set("featured_only", "true");
//   const qs = params.toString() ? `?${params}` : "";
//   return apiFetch<ProjectListResponse>(`/projects/${qs}`);
// }

// /** Create a new project (used in the "Add Project" modal). */
// export async function createProject(
//   payload: ProjectCreatePayload
// ): Promise<Project> {
//   return apiFetch<Project>("/projects/", {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });
// }

// // ────────────────────────────────────────────────────────────
// // GitHub
// // ────────────────────────────────────────────────────────────

// export interface GitHubRepo {
//   name: string;
//   full_name: string;
//   description?: string;
//   html_url: string;
//   stargazers_count: number;
//   forks_count: number;
//   language?: string;
//   topics: string[];
//   updated_at: string;
// }

// /** Fetch public GitHub repos via the backend proxy. */
// export async function fetchGitHubRepos(limit = 10): Promise<GitHubRepo[]> {
//   return apiFetch<GitHubRepo[]>(`/github/repos?limit=${limit}`);
// }

// /** Fetch GitHub profile info. */
// export async function fetchGitHubProfile(): Promise<Record<string, unknown>> {
//   return apiFetch<Record<string, unknown>>("/github/profile");
// }

// // ────────────────────────────────────────────────────────────
// // Analytics
// // ────────────────────────────────────────────────────────────

// /**
//  * Track a page visit.
//  * Call this once on page load from a useEffect.
//  */
// export async function trackVisit(path: string, referrer?: string): Promise<void> {
//   try {
//     await apiFetch<SuccessResponse>("/analytics/track", {
//       method: "POST",
//       body: JSON.stringify({ path, referrer: referrer || document.referrer || null }),
//     });
//   } catch {
//     // Analytics failure should never break the UI — silently ignore
//     console.debug("Analytics track failed (non-critical)");
//   }
// }
// ============================================================
// lib/api.ts  (add this file to your Next.js portfolio project)
//
// Centralised API client for all backend calls.
// All fetch calls go through here — easy to swap base URL.
// ============================================================

// ── Base URL ──────────────────────────────────────────────────
// In dev this hits localhost:8000.
// In production set NEXT_PUBLIC_API_URL in your Vercel env vars.
declare const process: {
  env: {
    NEXT_PUBLIC_API_URL?: string;
  };
};

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// ── Generic fetch wrapper ─────────────────────────────────────
async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    // Try to parse structured error from FastAPI
    let errorMessage = `API error ${res.status}`;
    try {
      const body = await res.json();
      errorMessage = body.detail || body.error || errorMessage;
    } catch {
      // ignore parse errors
    }
    throw new Error(errorMessage);
  }

  return res.json() as Promise<T>;
}

// ────────────────────────────────────────────────────────────
// Contact
// ────────────────────────────────────────────────────────────

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface SuccessResponse {
  success: boolean;
  message: string;
}

/**
 * Submit the contact form to the backend.
 * The backend will:
 *   1. Save the message to the database
 *   2. Email the portfolio owner (you)
 *   3. Send a confirmation email to the visitor
 */
export async function submitContact(
  payload: ContactPayload
): Promise<SuccessResponse> {
  return apiFetch<SuccessResponse>("/contact/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ────────────────────────────────────────────────────────────
// Projects
// ────────────────────────────────────────────────────────────

export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  live_url?: string;
  github_url?: string;
  category: "genai" | "java" | "fullstack" | "other";
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export interface ProjectListResponse {
  total: number;
  items: Project[];
}

export interface ProjectCreatePayload {
  title: string;
  description: string;
  tech_stack: string[];
  live_url?: string;
  github_url?: string;
  category: string;
  is_featured?: boolean;
}

/** Fetch all active projects, optionally filtered by category. */
export async function fetchProjects(
  category?: string,
  featuredOnly = false
): Promise<ProjectListResponse> {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (featuredOnly) params.set("featured_only", "true");
  const qs = params.toString() ? `?${params}` : "";
  return apiFetch<ProjectListResponse>(`/projects/${qs}`);
}

/** Create a new project (used in the "Add Project" modal). */
export async function createProject(
  payload: ProjectCreatePayload
): Promise<Project> {
  return apiFetch<Project>("/projects/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ────────────────────────────────────────────────────────────
// GitHub
// ────────────────────────────────────────────────────────────

export interface GitHubRepo {
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
  topics: string[];
  updated_at: string;
}

/** Fetch public GitHub repos via the backend proxy. */
export async function fetchGitHubRepos(limit = 10): Promise<GitHubRepo[]> {
  return apiFetch<GitHubRepo[]>(`/github/repos?limit=${limit}`);
}

/** Fetch GitHub profile info. */
export async function fetchGitHubProfile(): Promise<Record<string, unknown>> {
  return apiFetch<Record<string, unknown>>("/github/profile");
}

// ────────────────────────────────────────────────────────────
// Analytics
// ────────────────────────────────────────────────────────────

/**
 * Track a page visit.
 * Call this once on page load from a useEffect.
 */
export async function trackVisit(path: string, referrer?: string): Promise<void> {
  try {
    await apiFetch<SuccessResponse>("/analytics/track", {
      method: "POST",
      body: JSON.stringify({ path, referrer: referrer || document.referrer || null }),
    });
  } catch {
    // Analytics failure should never break the UI — silently ignore
    console.debug("Analytics track failed (non-critical)");
  }
}
