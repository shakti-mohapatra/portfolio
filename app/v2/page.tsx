"use client";

import { useEffect, useRef, useState } from "react";
import type LenisType from "lenis";
import Image from "next/image";

const FIVERR_PROFILE = "https://www.fiverr.com/shaktibuilds";
const GITHUB = "https://github.com/shakti-mohapatra";
const EMAIL = "shaktidev.work@gmail.com";

// ── Icons ──────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden>
      <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
    </svg>
  );
}

// ── Custom cursor (dot + lerping ring) ───────────────────────────────────────

function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const root = document.querySelector(".v2-root");
    root?.classList.add("v2-cursor-active");

    let tx = 0, ty = 0, rx = 0, ry = 0, raf = 0;

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      }
    }
    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const hovering = target.closest("a, button, [data-cursor]");
      ring.current?.classList.toggle("is-hover", !!hovering);
    }
    function loop() {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      root?.classList.remove("v2-cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="v2-cursor-ring" aria-hidden />
      <div ref={dot} className="v2-cursor-dot" aria-hidden />
    </>
  );
}

// ── Magnetic wrapper ─────────────────────────────────────────────────────────

function Magnetic({
  children,
  strength = 0.4,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-flex ${className}`}
      style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}
    >
      {children}
    </div>
  );
}

// ── Count-up number ──────────────────────────────────────────────────────────

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            const t0 = performance.now();
            const dur = 1300;
            const tick = (now: number) => {
              const p = Math.min((now - t0) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(to * eased));
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const marqueeWords = [
  "Python automation",
  "AI tools",
  "Web apps",
  "Chatbots",
  "Discord & Telegram bots",
  "Bug fixing",
  "Web design",
];

type Stat = { label: string } & (
  | { to: number; suffix: string }
  | { display: string }
);

const stats: Stat[] = [
  { display: "24–48h", label: "Typical delivery" },
  { to: 100, suffix: "%", label: "Built personally" },
  { display: "∞", label: "Revisions until it works" },
  { to: 4, suffix: "+", label: "Real projects shipped" },
];

const services = [
  {
    title: "Python Automation & AI Tools",
    desc: "Web scrapers, automation scripts, AI-powered tools using OpenAI/Claude, and data pipelines — ready to run.",
    from: "Starts from $50",
    href: "https://www.fiverr.com/shaktibuilds/build-a-python-automation-script-web-scraper-or-ai-tool-for-business",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    title: "Custom AI Chatbot",
    desc: "AI chatbots for websites and businesses — powered by GPT-4, trained on your data, embedded anywhere.",
    from: "Starts from $60",
    href: "https://www.fiverr.com/s/kLQWx2W",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    title: "Website & Web App Design",
    desc: "For anyone, anything. Landing pages, portfolios, business sites, and full web apps — designed and built end to end with Next.js. Yours to keep.",
    from: "Starts from $120",
    href: FIVERR_PROFILE,
    featured: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="15" y2="21" />
        <line x1="12" y1="18" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Bug Fixes & Debugging",
    desc: "Python, JavaScript, React, and Next.js bugs fixed fast. 24-hour turnaround on simple fixes.",
    from: "Starts from $30",
    href: "https://www.fiverr.com/s/99VW9BA",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: "Discord & Telegram Bots",
    desc: "Custom bots with commands, moderation, role assignment, notifications, and API integrations.",
    from: "Starts from $50",
    href: "https://www.fiverr.com/s/ljayrzb",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
];

type Project = {
  index: string;
  badge: string;
  badgeClass: string;
  title: string;
  tagline: string;
  desc: string;
  tags: string[];
  image?: string;
  placeholder?: boolean;
  link: string;
  linkLabel: string;
};

const projects: Project[] = [
  {
    index: "01",
    badge: "Client project",
    badgeClass: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
    title: "SS BAZAR",
    tagline: "Reserve & Collect store for a local fashion & grocery shop",
    desc: "Customers browse the catalogue, bag items, choose store pickup or home delivery, and get an order code. The merchant checks them out at the counter using the Store Dashboard — stock updates automatically on collection. No online payment; the whole experience is built around in-person transactions.",
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "Vercel"],
    image: "/projects/cs-2.png",
    link: "https://clothing-store-steel-kappa.vercel.app",
    linkLabel: "View live",
  },
  {
    index: "02",
    badge: "Personal tool",
    badgeClass: "text-sky-300 border-sky-400/30 bg-sky-400/10",
    title: "Mission Control",
    tagline: "A local work tracker that replaced a mess of scattered files",
    desc: "Kanban board, sprint planning, bug tracker, and GitHub Issues sync — all running offline as a local web app. Built to manage multiple client projects in one place without the overhead of Jira or Notion. Includes a Ctrl+K command palette, dark mode, and an insights dashboard with velocity charts.",
    tags: ["Next.js", "SQLite", "TypeScript", "Tailwind CSS"],
    image: "/projects/mc-1.png",
    link: "https://github.com/shakti-mohapatra/mission-control",
    linkLabel: "View on GitHub",
  },
  {
    index: "03",
    badge: "In progress",
    badgeClass: "text-amber-300 border-amber-400/30 bg-amber-400/10",
    title: "AI Knowledge Base",
    tagline: "A team's documents, turned into an AI assistant they can query",
    desc: "A full multi-tenant SaaS where organisations upload their documents and get an AI assistant trained on them. Orgs with roles and invitations, document ingestion and chunking, API keys and webhooks for integrations, and a complete audit log. Built with FastAPI, Postgres, and React — currently in active development.",
    tags: ["FastAPI", "PostgreSQL", "React", "TanStack Query", "Alembic"],
    placeholder: true,
    link: GITHUB,
    linkLabel: "Case study coming soon",
  },
];

const steps = [
  { n: "01", title: "Tell me what you need", desc: "Plain English works. Describe what you want the tool, bot, or app to do — I handle the technical side." },
  { n: "02", title: "I build it and explain it", desc: "Working code delivered with instructions that make sense — how to run it, what each part does, and how to change it later." },
  { n: "03", title: "Revisions until it's right", desc: "Included in every order. If the software doesn't do what you hired it for, I fix it — no re-billing, no arguing." },
];

const guarantees = [
  { title: "No outsourcing", desc: "Every line is written by me. The person you talk to is the person who builds it." },
  { title: "Price agreed upfront", desc: "We settle on the cost before I start. No surprise charges halfway through." },
  { title: "Revisions included", desc: "If it doesn't do what you hired it for, I fix it — no re-billing, no arguing." },
  { title: "Secure through Fiverr", desc: "Payment protection and delivery guarantees handled by the platform." },
];

const skills = [
  "Python", "TypeScript", "React & Next.js", "OpenAI / Claude API",
  "FastAPI", "Discord.py", "Web Scraping", "REST APIs",
  "Supabase / PostgreSQL", "Tailwind CSS",
];

// ── Page ────────────────────────────────────────────────────────────────────

export default function V2Home() {
  const lenisRef = useRef<LenisType | null>(null);

  // Smooth scroll (Lenis), loaded only on the client and skipped for reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let mounted = true;
    import("lenis").then(({ default: Lenis }) => {
      if (!mounted) return;
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenisRef.current = lenis;
      const loop = (t: number) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll reveals.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document
      .querySelectorAll(".v2-reveal, .v2-line")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goTo(e: React.MouseEvent, href: string) {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el as HTMLElement, { offset: -72 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="v2-root relative min-h-screen overflow-x-clip">
      <CustomCursor />
      <div className="v2-grain" aria-hidden />

      {/* ── Nav ── */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="max-w-6xl mx-auto px-6 mt-4">
          <div className="flex items-center justify-between h-14 px-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <a href="#hero" onClick={(e) => goTo(e, "#hero")} className="font-semibold tracking-tight text-[15px]">
              shakti<span className="text-violet-400">builds</span>
            </a>
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => goTo(e, l.href)}
                  className="px-3 py-1.5 text-sm text-white/60 hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center gap-2 text-xs text-white/55">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available
              </span>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/55 hover:text-white transition-colors">
                <GitHubIcon />
              </a>
              <Magnetic strength={0.5}>
                <a
                  href={FIVERR_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium px-4 py-2 rounded-full bg-violet-500 text-white hover:bg-violet-400 transition-colors"
                >
                  Hire me
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 -z-10" aria-hidden>
            <div className="v2-orb" style={{ top: "-10%", right: "-5%", width: 560, height: 560, background: "radial-gradient(circle, rgba(139,92,246,0.45), transparent 70%)" }} />
            <div className="v2-orb" style={{ bottom: "-15%", left: "-10%", width: 620, height: 620, background: "radial-gradient(circle, rgba(232,121,249,0.28), transparent 70%)" }} />
          </div>

          <div className="max-w-6xl mx-auto px-6 w-full pt-28 pb-20">
            <p className="v2-reveal text-sm tracking-[0.25em] uppercase text-white/45 mb-8">
              Freelance developer &amp; designer
            </p>

            <h1 className="text-[clamp(2.75rem,8vw,6.5rem)] font-bold leading-[0.98] tracking-tight">
              <span className="v2-line" style={{ "--v2-delay": "0ms" } as React.CSSProperties}>
                <span>I turn ideas into</span>
              </span>
              <span className="v2-line" style={{ "--v2-delay": "120ms" } as React.CSSProperties}>
                <span className="v2-accent-text">working software.</span>
              </span>
            </h1>

            <p className="v2-reveal max-w-xl text-lg sm:text-xl text-white/55 mt-8 leading-relaxed" style={{ "--v2-delay": "220ms" } as React.CSSProperties}>
              Python automation, AI tools, web apps, and bots — built fast,
              explained in plain English, and revised until they do exactly
              what you need.
            </p>

            <div className="v2-reveal flex flex-col sm:flex-row gap-4 mt-12" style={{ "--v2-delay": "320ms" } as React.CSSProperties}>
              <Magnetic strength={0.35}>
                <a href="#work" onClick={(e) => goTo(e, "#work")} className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors">
                  See my work
                </a>
              </Magnetic>
              <Magnetic strength={0.35}>
                <a href={FIVERR_PROFILE} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 hover:border-white/40 transition-colors inline-flex items-center gap-2">
                  Hire me on Fiverr <ArrowUpRight />
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-widest uppercase flex flex-col items-center gap-2">
            Scroll
            <span className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </section>

        {/* ── Marquee ── */}
        <section className="v2-marquee border-y border-white/10 py-6" aria-hidden>
          <div className="v2-marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center">
                {marqueeWords.map((w) => (
                  <span key={dup + w} className="flex items-center text-2xl sm:text-3xl font-semibold text-white/25 mx-8">
                    {w}
                    <span className="mx-8 text-violet-500">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
            {stats.map((s) => (
              <div key={s.label} className="v2-reveal text-center md:text-left">
                <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  {"to" in s ? <CountUp to={s.to} suffix={s.suffix} /> : s.display}
                </div>
                <div className="text-sm text-white/45 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Work ── */}
        <section id="work" className="py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-20">
              <h2 className="v2-reveal text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-none">
                Selected work
              </h2>
              <p className="v2-reveal hidden sm:block text-white/45 max-w-xs text-right">
                Real projects built for real use — not demos, not mockups.
              </p>
            </div>

            <div className="space-y-28">
              {projects.map((p, i) => (
                <div key={p.title} className="v2-reveal grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  {/* Text */}
                  <div className={`flex flex-col gap-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="flex items-center gap-4">
                      <span className="text-6xl font-bold text-white/10 leading-none select-none">{p.index}</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.badgeClass}`}>{p.badge}</span>
                    </div>
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{p.title}</h3>
                      <p className="text-violet-300 font-medium mb-4">{p.tagline}</p>
                      <p className="text-white/55 leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium text-white/60 border border-white/12 bg-white/[0.03] px-3 py-1.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-violet-300 transition-colors self-start group"
                    >
                      {p.linkLabel}
                      <span className="group-hover:translate-x-1 transition-transform"><ArrowUpRight /></span>
                    </a>
                  </div>

                  {/* Visual */}
                  <div className={`group ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    {p.placeholder ? (
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/12 bg-[var(--v2-surface)] p-5 font-mono text-[13px]">
                        <div className="flex items-center gap-2 mb-5">
                          <span className="w-3 h-3 rounded-full bg-red-400/70" />
                          <span className="w-3 h-3 rounded-full bg-amber-400/70" />
                          <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
                          <span className="ml-3 text-white/30">ai-kb · ingest</span>
                        </div>
                        <div className="space-y-2 text-white/60">
                          <p><span className="text-emerald-300">POST</span> /orgs/acme/documents</p>
                          <p className="text-white/35">→ uploaded handbook.pdf (2.4 MB)</p>
                          <p className="text-white/35">→ chunking… <span className="text-violet-300">1,248 chunks</span></p>
                          <p className="text-white/35">→ embedding… <span className="text-violet-300">done</span></p>
                          <p><span className="text-sky-300">audit_log</span> document.uploaded ✓</p>
                        </div>
                        <div className="absolute bottom-5 left-5 right-5">
                          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full w-[72%] bg-gradient-to-r from-violet-500 to-fuchsia-400" />
                          </div>
                          <p className="text-white/30 mt-2 text-xs">Sprint 31 of ~40 · in active development</p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/12 bg-[var(--v2-surface)]">
                        <Image
                          src={p.image as string}
                          alt={p.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          priority={i === 0}
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="py-28 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <h2 className="v2-reveal text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-none mb-5">
                What I can build for you
              </h2>
              <p className="v2-reveal text-white/55 text-lg">
                Every order is handled personally — you get the work, an
                explanation, and revisions until it&apos;s right. Prices below are
                starting points; message me for an exact quote.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s) => (
                <a
                  key={s.title}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`v2-reveal group flex flex-col gap-4 p-7 rounded-2xl border bg-[var(--v2-surface)] hover:-translate-y-1.5 transition-all duration-300 ${
                    s.featured
                      ? "border-violet-500/40 hover:border-violet-400/70"
                      : "border-white/10 hover:border-white/25"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-300 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                      {s.icon}
                    </span>
                    {s.featured && (
                      <span className="text-[11px] font-semibold tracking-wide uppercase text-violet-300 bg-violet-500/10 px-2.5 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-violet-200 transition-colors">{s.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed flex-1">{s.desc}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-white/40">{s.from}</span>
                    <span className="text-sm font-medium text-violet-300 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Get a quote <ArrowUpRight />
                    </span>
                  </div>
                </a>
              ))}

              {/* Closing CTA card */}
              <div className="flex flex-col justify-center gap-4 p-7 rounded-2xl border border-dashed border-white/15 bg-transparent">
                <h3 className="text-lg font-semibold">Something else?</h3>
                <p className="text-sm text-white/55 leading-relaxed flex-1">
                  If you can describe it in plain English, I can probably build
                  it. Tell me what you have in mind.
                </p>
                <a href={`mailto:${EMAIL}`} className="text-sm font-medium text-violet-300 inline-flex items-center gap-1 hover:gap-2 transition-all self-start">
                  Email me <ArrowUpRight />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="py-28 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="v2-reveal text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-none mb-16">
              How I work
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {steps.map((step) => (
                <div key={step.n} className="v2-reveal flex flex-col gap-5">
                  <span className="text-6xl font-bold v2-accent-text leading-none select-none">{step.n}</span>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-white/55 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Guarantees ── */}
        <section className="py-28 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="v2-reveal text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-none mb-16">
              What you can count on
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {guarantees.map((g) => (
                <div key={g.title} className="v2-reveal flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-[var(--v2-surface)]">
                  <span className="w-9 h-9 rounded-lg bg-emerald-400/10 text-emerald-300 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-5 h-5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <h3 className="font-semibold">{g.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="py-28 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
            <div className="v2-reveal">
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-none mb-8">About me</h2>
              <div className="space-y-5 text-white/60 leading-relaxed text-lg">
                <p>
                  I&apos;m a full-stack developer specialising in Python and
                  JavaScript. I&apos;ve spent the last few years building things
                  that actually get used — automation that runs every morning,
                  AI tools that answer the questions support teams got tired of
                  handling, and web apps that shops opened to real customers.
                </p>
                <p>
                  I work with founders and small businesses who need something
                  built without hiring a full team. Every project is handled
                  personally — no outsourcing, no templates, no copy-paste.
                </p>
                <p className="text-white">If you can describe what you want in plain English, I can build it.</p>
              </div>
            </div>

            <div className="v2-reveal" style={{ "--v2-delay": "150ms" } as React.CSSProperties}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-6">Skills &amp; tools</h3>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm font-medium text-white/70 border border-white/12 bg-white/[0.03] px-4 py-2 rounded-full hover:border-violet-400/50 hover:text-violet-200 transition-colors"
                    data-cursor
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="py-32 border-t border-white/10 relative overflow-hidden">
          <div className="v2-orb" style={{ bottom: "-40%", left: "50%", transform: "translateX(-50%)", width: 700, height: 700, background: "radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%)" }} aria-hidden />
          <div className="max-w-6xl mx-auto px-6 text-center relative">
            <h2 className="v2-reveal text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-tight leading-[1.02]">
              Let&apos;s build <span className="v2-accent-text">something.</span>
            </h2>
            <p className="v2-reveal text-white/55 text-lg max-w-md mx-auto mt-6">
              Order on Fiverr for secure payments and delivery guarantees, or
              email me to talk it through first.
            </p>
            <div className="v2-reveal flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Magnetic strength={0.35}>
                <a href={FIVERR_PROFILE} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors">
                  Hire me on Fiverr
                </a>
              </Magnetic>
              <Magnetic strength={0.35}>
                <a href={`mailto:${EMAIL}`} className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 hover:border-white/40 transition-colors">
                  {EMAIL}
                </a>
              </Magnetic>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <span>© 2026 Shakti M. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <GitHubIcon /> GitHub
            </a>
            <a href={FIVERR_PROFILE} target="_blank" rel="noopener noreferrer" className="hover:text-violet-300 transition-colors">
              fiverr.com/shaktibuilds
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
