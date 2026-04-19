# 🚀 Developer Portfolio — Next.js + TypeScript + Tailwind CSS

A fully dynamic, dark-themed portfolio site for Software Engineers, GenAI Developers, and Java Developers.

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css        # Global styles, fonts, keyframes
│   ├── layout.tsx         # Root layout + SEO metadata
│   └── page.tsx           # Main page (assembles all sections)
├── components/
│   ├── Navbar.tsx         # Sticky responsive nav
│   ├── HeroSection.tsx    # Animated typewriter hero
│   ├── AboutSection.tsx   # Role cards + scrolling tech strip
│   ├── SkillsSection.tsx  # Animated skill bars by category
│   ├── ExperienceSection.tsx  # Vertical timeline
│   ├── ProjectsSection.tsx    # Cards + GitHub redirect + Add Project modal
│   ├── ContactSection.tsx     # Contact form + Developer message
│   └── Footer.tsx         # Footer with socials
├── portfolio.config.ts    # ✏️  EDIT THIS — all your personal data lives here
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

---

## ✏️ How to Customise

**All your personal data is in `portfolio.config.ts`.**

Edit:
- `personalInfo` — your name, email, GitHub URL, LinkedIn, location, developer message
- `roles[]` — the animated typewriter roles in the hero
- `skills[]` — your skill list with levels (0–100)
- `experience[]` — your work history
- `projects[]` — your projects with optional `liveUrl` and `githubUrl`
- `stats[]` — the stat counters shown in the hero

---

## 🛠 Setup & Run

### Prerequisites
- Node.js 18 or later
- npm (comes with Node)

### Step 1 — Install dependencies
```bash
cd portfolio
npm install
```

### Step 2 — Run in development mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 3 — Build for production
```bash
npm run build
npm start
```

---

## 🌐 Deploy to Vercel (recommended — free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from the project folder
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments.

---

## ✨ Features

| Feature | Description |
|---|---|
| Typewriter animation | Cycles through your roles in the hero |
| Animated skill bars | Fill on scroll-reveal |
| Experience timeline | Vertical animated timeline |
| Project cards | Filter by category (GenAI / Java / Full Stack) |
| GitHub auto-redirect | Clicking GitHub button opens the repo directly |
| Add Project modal | Paste a deployed URL or GitHub link dynamically |
| Developer message | Personal note displayed at the bottom of the page |
| Contact form | Opens native email client with pre-filled message |
| Fully responsive | Works on all screen sizes |
| Dark cyberpunk aesthetic | Neon accents, glass cards, floating orbs |

---

## 📦 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (icons)
- **Google Fonts** — Bebas Neue (display), DM Sans (body), JetBrains Mono (code)

---

## 🔄 Upcoming (backend phase)

- API routes for contact form (no more mailto)
- CMS integration for projects
- Authentication for private project management
- Analytics dashboard
