"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const FIVERR_PROFILE = "https://www.fiverr.com/shaktibuilds";
const GITHUB = "https://github.com/shakti-mohapatra";

// ── Icons ────────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
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
              className="text-sm font-medium bg-indigo-600 text-white px-4 py-1.5 rounded-full
                         hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Hire me on Fiverr
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section
          id="hero"
          className="relative min-h-[calc(100vh-56px)] flex items-center overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-200"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="hero-blob absolute -top-40 -right-40 w-[650px] h-[650px] rounded-full bg-indigo-100 dark:bg-indigo-900/40 blur-3xl opacity-70 anim-float" />
            <div
              className="hero-blob absolute -bottom-40 -left-40 w-[550px] h-[550px] rounded-full bg-violet-100 dark:bg-violet-900/40 blur-3xl opacity-60"
              style={{ animation: "floatBob 10s ease-in-out infinite 2.5s" }}
            />
            <div
              className="hero-blob absolute top-1/2 left-1/3 w-[350px] h-[350px] rounded-full bg-sky-50 dark:bg-sky-900/30 blur-2xl opacity-50"
              style={{ animation: "floatBob 13s ease-in-out infinite 5s" }}
            />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
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
              className="text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed anim-fade-in-up"
              style={{ animationDelay: "540ms" }}
            >
              Automation tools, AI chatbots, and web apps — built fast,
              explained in plain English, revised until they work exactly as you need.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center anim-fade-in-up"
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

        {/* ── About ── */}
        <section id="about" className="py-24 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700/50 transition-colors duration-200">
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
        <section id="contact" className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700/50 transition-colors duration-200">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 reveal">Get in touch</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-10 leading-relaxed reveal" data-delay="120">
              Have a project in mind? Order directly on Fiverr for secure payments
              and delivery guarantees, or email me to talk it through first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center reveal" data-delay="240">
              <a
                href={FIVERR_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full
                           hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all
                           shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50"
              >
                Hire me on Fiverr
              </a>
              <a
                href="mailto:shaktidev.work@gmail.com"
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                           font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-700
                           hover:border-gray-400 dark:hover:border-gray-500
                           hover:scale-105 active:scale-95 transition-all"
              >
                shaktidev.work@gmail.com
              </a>
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
