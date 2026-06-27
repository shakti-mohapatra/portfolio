"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const FIVERR_PROFILE = "https://www.fiverr.com/shaktibuilds";
const GITHUB = "https://github.com/shakti-mohapatra";
const LINKEDIN = "https://www.linkedin.com/in/shakti-mohapatra/";
const EMAIL = "shaktidev.work@gmail.com";
// TODO: replace with your Formspree form ID — sign up at formspree.io, create a form for shaktidev.work@gmail.com
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeebgngl";

// ── Icons ────────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden>
      <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
    </svg>
  );
}

// ── Hamburger icon ────────────────────────────────────────────────────────────

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col gap-[5px] w-5" aria-hidden>
      <span className={`block h-px w-full bg-current transition-transform origin-center duration-200 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
      <span className={`block h-px w-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
      <span className={`block h-px w-full bg-current transition-transform origin-center duration-200 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
    </span>
  );
}

// ── Theme toggle ──────────────────────────────────────────────────────────────

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-8 h-8 flex items-center justify-center rounded-lg
                 text-gray-400 hover:text-gray-700 hover:bg-gray-100
                 dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800
                 transition-colors"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

// ── Avatar (real photo with monogram fallback) ───────────────────────────────

function Avatar() {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className="w-36 h-36 rounded-2xl shrink-0 shadow-lg flex items-center justify-center
                   bg-gradient-to-br from-indigo-500 to-violet-600 select-none"
        aria-label="Shakti M."
      >
        <span className="text-4xl font-bold text-white tracking-tight">SM</span>
      </div>
    );
  }

  return (
    <Image
      src="/shakti.png"
      alt="Shakti M."
      width={144}
      height={144}
      onError={() => setErrored(true)}
      className="w-36 h-36 rounded-2xl object-cover shrink-0 shadow-lg"
    />
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

type Service = { icon: React.ReactNode; title: string; desc: string; price: string; url: string };

const navLinks = [
  { href: "#projects", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const stats = [
  { value: "24–48h", label: "Typical delivery" },
  { value: "100%", label: "Built personally" },
  { value: "∞", label: "Revisions until it works" },
  { value: "4+", label: "Real projects shipped" },
];

const guarantees = [
  {
    title: "No outsourcing",
    desc: "Every line is written by me. The person you talk to is the person who builds it.",
  },
  {
    title: "Fixed price, agreed upfront",
    desc: "You know the cost before I start. No surprise charges halfway through.",
  },
  {
    title: "Revisions included",
    desc: "If it doesn't do what you hired it for, I fix it — no re-billing, no arguing.",
  },
  {
    title: "Secure through Fiverr",
    desc: "Payment protection and delivery guarantees handled by the platform.",
  },
];

const services: Service[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
    title: "Python Automation & AI Tools",
    desc: "Web scrapers, automation scripts, AI-powered tools using OpenAI/Claude, and data pipelines — ready to run.",
    price: "From $50",
    url: "https://www.fiverr.com/shaktibuilds/build-a-python-automation-script-web-scraper-or-ai-tool-for-business",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "Custom AI Chatbot",
    desc: "AI chatbots for websites and businesses — powered by GPT-4, trained on your data, embedded anywhere.",
    price: "From $60",
    url: "https://www.fiverr.com/s/kLQWx2W",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Bug Fixes & Debugging",
    desc: "Python, JavaScript, React, and Next.js bugs fixed fast. 24-hour turnaround on simple fixes.",
    price: "From $30",
    url: "https://www.fiverr.com/s/99VW9BA",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    title: "Discord & Telegram Bots",
    desc: "Custom bots with commands, moderation, role assignment, notifications, and API integrations.",
    price: "From $50",
    url: "https://www.fiverr.com/s/ljayrzb",
  },
];

const projects = [
  {
    badge: "Client project",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50",
    title: "SS BAZAR — Reserve & Collect Store",
    tagline: "Full storefront + admin system for a local fashion & grocery shop",
    desc: "Customers browse the catalogue, bag items, choose store pickup or home delivery, and get an order code. The merchant checks them out at the counter using the Store Dashboard — stock updates automatically on collection. No online payment; the whole experience is built around in-person transactions.",
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "Vercel"],
    mainImage: "/projects/cs-2.png",
    thumbs: ["/projects/cs-preview.png", "/projects/cs-3.png"],
    link: "https://clothing-store-steel-kappa.vercel.app",
    linkLabel: "View live",
  },
  {
    badge: "Personal tool",
    badgeStyle: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800/50",
    title: "Mission Control — Project Tracker",
    tagline: "Local work tracker that replaced a mess of scattered markdown files",
    desc: "Kanban board, sprint planning, bug tracker, and GitHub Issues sync — all running offline as a local web app. Built to manage multiple client projects in one place without the overhead of Jira or Notion. Includes a Ctrl+K command palette, dark mode, and an insights dashboard with velocity charts.",
    tags: ["Next.js", "SQLite", "TypeScript", "Tailwind CSS"],
    mainImage: "/projects/mc-1.png",
    thumbs: ["/projects/mc-2.png", "/projects/mc-3.png"],
    link: "https://github.com/shakti-mohapatra/mission-control",
    linkLabel: "View on GitHub",
  },
];

const steps = [
  {
    n: "01",
    title: "Tell me what you need",
    desc: "Plain English works. Describe what you want the tool, bot, or app to do — I handle the technical side.",
  },
  {
    n: "02",
    title: "I build it and explain it",
    desc: "Working code delivered with instructions that make sense — how to run it, what each part does, and how to change it later.",
  },
  {
    n: "03",
    title: "Revisions until it's right",
    desc: "Included in every order. If the software doesn't do what you hired it for, I fix it — no re-billing, no arguing.",
  },
];

const skills = [
  "Python",
  "JavaScript / TypeScript",
  "React & Next.js",
  "OpenAI / Claude API",
  "Discord.py / python-telegram-bot",
  "Web Scraping",
  "REST APIs",
  "Supabase / PostgreSQL",
];

// ── Contact form (Formspree) ──────────────────────────────────────────────────

type FormStatus = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputCls = `w-full px-4 py-2.5 rounded-xl text-sm
    bg-white dark:bg-gray-900
    border border-gray-200 dark:border-gray-700
    text-gray-900 dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500
    focus:border-transparent transition-all`;

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl
                      bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50
                      text-center h-full">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-emerald-500">
          <circle cx="12" cy="12" r="10" />
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <p className="font-semibold text-emerald-700 dark:text-emerald-400">Message sent!</p>
        <p className="text-sm text-emerald-600 dark:text-emerald-500">I&apos;ll get back to you within 24 hours.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs text-emerald-600 dark:text-emerald-500 underline underline-offset-2 hover:no-underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Name</label>
          <input
            id="cf-name"
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Email</label>
          <input
            id="cf-email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Message</label>
        <textarea
          id="cf-message"
          required
          rows={5}
          placeholder="Tell me about your project…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputCls} resize-none`}
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-500 dark:text-red-400">
          Something went wrong — please try again or email me directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-full
                   hover:bg-indigo-700 active:scale-95 transition-all
                   shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50
                   disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.delay ?? "0", 10);
            setTimeout(() => el.classList.add("visible"), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-100 dark:border-gray-700/50 anim-fade-in transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold text-gray-900 dark:text-white tracking-tight">
            shaktibuilds
          </span>
          <nav className="flex items-center gap-2 sm:gap-3">
            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1 mr-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-gray-500 dark:text-gray-400
                             hover:text-gray-900 dark:hover:text-white px-3 py-1.5 rounded-lg
                             hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200 transition-colors"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200 transition-colors"
              aria-label="GitHub profile"
            >
              <GitHubIcon />
            </a>
            <ThemeToggle />
            <a
              href={FIVERR_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex text-sm font-medium bg-indigo-600 text-white px-4 py-1.5 rounded-full
                         hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Hire me on Fiverr
            </a>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg
                         text-gray-500 dark:text-gray-400
                         hover:text-gray-900 dark:hover:text-white
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <HamburgerIcon open={mobileMenuOpen} />
            </button>
          </nav>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-900 px-4 py-3 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-gray-600 dark:text-gray-300
                           hover:text-indigo-600 dark:hover:text-indigo-400
                           px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-2 pb-1">
              <a
                href={FIVERR_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center text-sm font-semibold bg-indigo-600 text-white px-4 py-2.5 rounded-full
                           hover:bg-indigo-700 transition-colors"
              >
                Hire me on Fiverr
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ── Hero ── */}
        <section
          id="hero"
          className="relative min-h-[calc(100vh-56px)] flex items-center overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-200"
        >
          {/* B2: static radial gradient wash + SVG fractal noise — no GPU blur */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="hero-gradient absolute inset-0" />
            <div className="hero-noise absolute inset-0" />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 py-20 w-full">
            {/* A1: left text / right avatar split */}
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Left: text block — left-aligned */}
              <div>
                <p
                  className="text-indigo-600 dark:text-indigo-400 font-medium text-sm tracking-widest uppercase mb-5 anim-fade-in"
                  style={{ animationDelay: "80ms" }}
                >
                  Freelance Developer
                </p>
                <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                  <span className="block anim-fade-in-up" style={{ animationDelay: "200ms" }}>
                    Hi, I&apos;m Shakti.
                  </span>
                  <span className="block text-shimmer anim-fade-in-up" style={{ animationDelay: "380ms" }}>
                    I make Python and AI do the work.
                  </span>
                </h1>
                <p
                  className="text-xl text-gray-500 dark:text-gray-400 max-w-lg mb-10 leading-relaxed anim-fade-in-up"
                  style={{ animationDelay: "540ms" }}
                >
                  Automation tools, AI chatbots, and web apps — built fast,
                  explained in plain English, revised until they work exactly as you need.
                </p>
                <div
                  className="flex flex-col sm:flex-row gap-4 anim-fade-in-up"
                  style={{ animationDelay: "700ms" }}
                >
                  <a
                    href="#projects"
                    className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full
                               hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all
                               shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50"
                  >
                    See my work
                  </a>
                  <a
                    href={FIVERR_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                               font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800
                               hover:border-gray-400 dark:hover:border-gray-500
                               hover:scale-105 active:scale-95 transition-all"
                  >
                    View Fiverr profile →
                  </a>
                </div>
              </div>

              {/* Right: photo with indigo glow ring */}
              <div
                className="flex justify-center md:justify-end anim-fade-in"
                style={{ animationDelay: "400ms" }}
              >
                <div className="relative">
                  <div className="absolute -inset-6 rounded-[2.5rem] bg-indigo-400/15 dark:bg-indigo-500/20 blur-3xl" />
                  <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-indigo-200 dark:ring-indigo-700/50 shadow-2xl shadow-indigo-200/40 dark:shadow-indigo-900/50">
                    <Image
                      src="/shakti.png"
                      alt="Shakti Mohapatra"
                      width={300}
                      height={300}
                      priority
                      className="block object-cover object-top w-44 h-44 sm:w-64 sm:h-64 md:w-[300px] md:h-[300px]"
                      sizes="(max-width: 640px) 176px, (max-width: 768px) 256px, 300px"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section className="bg-indigo-600 dark:bg-indigo-700 transition-colors duration-200">
          <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-indigo-100 mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700/50 transition-colors duration-200">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-3 reveal">
              Work I&apos;ve shipped
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-20 max-w-lg mx-auto reveal" data-delay="120">
              Real projects built for real use — not demos, not mockups.
            </p>

            <div className="space-y-24">
              {projects.map((p, i) => (
                <div
                  key={p.title}
                  className="reveal grid sm:grid-cols-2 gap-12 items-center"
                  data-delay={String(i * 80)}
                >
                  {/* Text */}
                  <div className={`flex flex-col gap-5 ${i % 2 === 1 ? "sm:order-2" : ""}`}>
                    <span className={`inline-block self-start text-xs font-semibold px-3 py-1 rounded-full border ${p.badgeStyle}`}>
                      {p.badge}
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-4">{p.tagline}</p>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{p.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900
                                     border border-gray-200 dark:border-gray-700 px-2.5 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600
                                 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300
                                 transition-colors self-start"
                    >
                      {p.linkLabel}
                      <ArrowUpRightIcon />
                    </a>
                  </div>

                  {/* Screenshots */}
                  <div className={`flex flex-col gap-3 ${i % 2 === 1 ? "sm:order-1" : ""}`}>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-200/60 dark:shadow-black/30">
                      <Image
                        src={p.mainImage}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover object-top"
                        priority={i === 0}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {p.thumbs.map((thumb, j) => (
                        <div
                          key={j}
                          className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm"
                        >
                          <Image
                            src={thumb}
                            alt={`${p.title} screenshot ${j + 2}`}
                            fill
                            sizes="(max-width: 640px) 50vw, 25vw"
                            className="object-cover object-top"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700/50 transition-colors duration-200">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-3 reveal">
              What I can build for you
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-14 max-w-lg mx-auto reveal" data-delay="120">
              Every order is handled personally — you get the work, an explanation,
              and revisions until it&apos;s right.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <a
                  key={s.title}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-delay={String(i * 130)}
                  className="reveal group flex flex-col gap-3 p-6 bg-white dark:bg-gray-800
                             border border-gray-200 dark:border-gray-700 rounded-2xl
                             hover:border-indigo-300 dark:hover:border-indigo-600
                             hover:shadow-xl dark:hover:shadow-black/30 hover:-translate-y-1.5
                             transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center
                                     text-indigo-600 dark:text-indigo-400
                                     group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 transition-colors">
                      {s.icon}
                    </span>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-3 py-1 rounded-full">
                      {s.price}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">{s.desc}</p>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1.5 transition-transform duration-200 inline-block">
                    Order on Fiverr →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── How I work ── */}
        <section id="process" className="py-24 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700/50 transition-colors duration-200">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-3 reveal">
              How I work
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-16 max-w-lg mx-auto reveal" data-delay="100">
              Simple process, no surprises.
            </p>

            <div className="grid sm:grid-cols-3 gap-10">
              {steps.map((step, i) => (
                <div
                  key={step.n}
                  className="reveal flex flex-col gap-4"
                  data-delay={String(i * 150)}
                >
                  <span className="text-5xl font-bold text-indigo-100 dark:text-indigo-900/80 leading-none select-none">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Guarantees ── */}
        <section className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700/50 transition-colors duration-200">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-3 reveal">
              What you can count on
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-14 max-w-lg mx-auto reveal" data-delay="100">
              The things that matter most when you&apos;re hiring someone you haven&apos;t met.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {guarantees.map((g, i) => (
                <div
                  key={g.title}
                  className="reveal flex flex-col gap-3 p-6 bg-gray-50 dark:bg-gray-800
                             border border-gray-200 dark:border-gray-700 rounded-2xl"
                  data-delay={String(i * 110)}
                >
                  <span className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">{g.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-24 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700/50 transition-colors duration-200">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-3 reveal">
              What clients say
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-14 max-w-lg mx-auto reveal" data-delay="100">
              Real feedback from people I&apos;ve built for.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  quote: "Delivered exactly what I asked for, faster than expected. The code was clean and came with a clear explanation of how to update it myself.",
                  name: "Arjun P.",
                  role: "Founder, logistics startup",
                  delay: 0,
                },
                {
                  quote: "I needed a Telegram bot that synced with our internal spreadsheet. Shakti built it in two days, explained every part, and fixed a small edge case I found for free.",
                  name: "Meera S.",
                  role: "Operations manager",
                  delay: 130,
                },
                {
                  quote: "No back-and-forth, no surprise charges. I described what I wanted, he built it, I tested it, done. Will hire again.",
                  name: "James W.",
                  role: "Small business owner",
                  delay: 260,
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="reveal flex flex-col gap-4 p-6 bg-white dark:bg-gray-900
                             border border-gray-200 dark:border-gray-700 rounded-2xl"
                  data-delay={String(t.delay)}
                >
                  {/* 5 stars */}
                  <div className="flex gap-0.5" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700/50 transition-colors duration-200">

          <div className="max-w-5xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 gap-16 items-start">

              {/* Left: photo + bio */}
              <div className="reveal-left flex flex-col gap-6">
                <Avatar />

                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About me</h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p>
                      I&apos;m a full-stack developer specialising in Python and
                      JavaScript. I&apos;ve spent the last few years building things
                      that actually get used — automation scripts that run every
                      morning, AI tools that answer the questions support teams got
                      tired of handling, and web apps that shops opened to real
                      customers.
                    </p>
                    <p>
                      I work with founders and small businesses who need something
                      built without hiring a full team. Every project is handled
                      personally — no outsourcing, no templates, no copy-paste.
                    </p>
                    <p>
                      If you can describe what you want in plain English, I can
                      build it.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: skills */}
              <div className="reveal-right" data-delay="150">
                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">
                  Skills & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag text-sm font-medium text-gray-700 dark:text-gray-300
                                 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                                 px-3 py-1.5 rounded-full
                                 hover:border-indigo-300 dark:hover:border-indigo-600
                                 hover:text-indigo-600 dark:hover:text-indigo-400
                                 hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700/50 transition-colors duration-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: heading + form */}
              <div className="reveal-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Get in touch</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                  Describe your project in plain English — I&apos;ll reply within 24 hours with a clear quote.
                </p>
                <ContactForm />
              </div>

              {/* Right: other ways to reach me */}
              <div className="reveal-right flex flex-col gap-6" data-delay="150">
                <div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Or reach me directly
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href={FIVERR_PROFILE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl
                                 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all
                                 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden>
                        <path d="M16.25 0A7.75 7.75 0 0024 7.75v2.563a.687.687 0 01-.688.687h-2.374a.687.687 0 01-.688-.687V7.75a3.5 3.5 0 00-3.5-3.5V7.5a.75.75 0 01-.75.75h-2.625A.375.375 0 0113 7.875V4.25A4.25 4.25 0 0116.25 0zM0 7.563C0 5.38 1.63 3.563 3.75 3.563c1.657 0 3.095.993 3.707 2.425L9 10.5H6.75a.75.75 0 000 1.5H9v8.25a.75.75 0 001.5 0V12H13a.75.75 0 000-1.5h-2.5L8.837 5.313A5.25 5.25 0 000 7.563z" />
                      </svg>
                      Hire me on Fiverr
                    </a>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="flex items-center gap-3 px-5 py-3.5 border border-gray-300 dark:border-gray-600
                                 text-gray-700 dark:text-gray-300 font-semibold rounded-xl
                                 hover:bg-white dark:hover:bg-gray-800
                                 hover:border-gray-400 dark:hover:border-gray-500
                                 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 shrink-0" aria-hidden>
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      {EMAIL}
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Find me on
                  </p>
                  <div className="flex gap-4">
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <LinkedInIcon /> LinkedIn
                    </a>
                    <a href={GITHUB} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <GitHubIcon /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 dark:border-gray-700/50 py-8 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400 dark:text-gray-500">
          <span>© 2026 Shakti M. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              href={FIVERR_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              fiverr.com/shaktibuilds
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
