"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type Variants,
} from "motion/react";
import type LenisType from "lenis";
import Image from "next/image";

const FIVERR_PROFILE = "https://www.fiverr.com/shaktibuilds";
const GITHUB = "https://github.com/shakti-mohapatra";
const EMAIL = "shaktidev.work@gmail.com";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ── Icons ──────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
function ArrowUpRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
    </svg>
  );
}
function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5" aria-hidden>
      <line x1="12" y1="4" x2="12" y2="20" />
      <polyline points="6 14 12 20 18 14" />
    </svg>
  );
}

// ── WebGL hero shader ────────────────────────────────────────────────────────

const VERT = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos,0.0,1.0); }`;

const FRAG = `precision highp float;
uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse;
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m; m=m*m; vec3 x=2.0*fract(p*C.www)-1.0; vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5); vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}
float fbm(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<5;i++){ s+=a*snoise(p); p*=2.0; a*=0.5; } return s; }
void main(){
  vec2 uv=gl_FragCoord.xy/u_res; vec2 p=uv-0.5; p.x*=u_res.x/u_res.y;
  vec2 mo=u_mouse/u_res-0.5; mo.x*=u_res.x/u_res.y;
  float t=u_time*0.05;
  vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(p+1.6*q+vec2(1.7,9.2)+0.25*mo),fbm(p+1.6*q+vec2(8.3,2.8)-0.25*mo));
  float f=fbm(p+1.9*r+t); f=0.5+0.5*f;
  vec3 c1=vec3(0.024,0.024,0.031);
  vec3 c2=vec3(0.16,0.10,0.42);
  vec3 c3=vec3(0.55,0.36,0.96);
  vec3 c4=vec3(0.91,0.47,0.98);
  vec3 col=mix(c1,c2,smoothstep(0.0,0.55,f));
  col=mix(col,c3,smoothstep(0.45,0.85,f));
  col=mix(col,c4,smoothstep(0.78,1.05,f)*(0.5+0.5*length(r)));
  col*=1.0-0.55*dot(p,p);
  gl_FragColor=vec4(col,1.0);
}`;

function initHeroGL(canvas: HTMLCanvasElement): (() => void) | null {
  const gl =
    (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
    (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
  if (!gl) return null;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      gl.deleteShader(s);
      return null;
    }
    return s;
  };

  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, "u_time");
  const uRes = gl.getUniformLocation(prog, "u_res");
  const uMouse = gl.getUniformLocation(prog, "u_mouse");

  const mouse = { x: 0.5, y: 0.5 };
  const target = { x: 0.5, y: 0.5 };
  let raf = 0;
  let visible = true;
  const start = performance.now();

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(canvas.clientWidth * dpr);
    canvas.height = Math.floor(canvas.clientHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  const onMove = (e: MouseEvent) => {
    target.x = e.clientX / window.innerWidth;
    target.y = 1 - e.clientY / window.innerHeight;
  };
  const loop = () => {
    if (!visible) {
      raf = 0;
      return;
    }
    mouse.x += (target.x - mouse.x) * 0.05;
    mouse.y += (target.y - mouse.y) * 0.05;
    const t = (performance.now() - start) / 1000;
    gl.uniform1f(uTime, t);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform2f(uMouse, mouse.x * canvas.width, mouse.y * canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(loop);
  };
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      if (visible && !raf) loop();
    },
    { threshold: 0 }
  );
  io.observe(canvas);

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", onMove);
  loop();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    window.removeEventListener("mousemove", onMove);
    io.disconnect();
  };
}

function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const cleanup = initHeroGL(ref.current);
    if (!cleanup) {
      setFailed(true);
      return;
    }
    return cleanup;
  }, []);
  return (
    <>
      {failed && <div className="v2-hero-fallback" />}
      <canvas
        ref={ref}
        className="v2-hero-canvas"
        style={{ display: failed ? "none" : "block" }}
        aria-hidden
      />
    </>
  );
}

// ── Intro loader ─────────────────────────────────────────────────────────────

function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [slide, setSlide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = Date.now();
    const dur = 1500;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setCount(100);
      setSlide(true);
      onDone();
      window.setTimeout(() => {
        setGone(true);
        document.body.style.overflow = "";
      }, 900);
    };
    // Wall-clock driven so it never stalls (rAF pauses in background tabs).
    const id = window.setInterval(() => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setCount(Math.floor(p * 100));
      if (p >= 1) {
        window.clearInterval(id);
        finish();
      }
    }, 30);
    const safety = window.setTimeout(() => {
      window.clearInterval(id);
      finish();
    }, dur + 400);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(safety);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  if (gone) return null;
  return (
    <div className={`v2-loader ${slide ? "done" : ""}`}>
      <span className="v2-loader-count v2-accent-text">{String(count).padStart(3, "0")}</span>
      <span className="text-xs uppercase tracking-[0.35em] text-white/40 mb-3">
        shaktibuilds — building experience
      </span>
    </div>
  );
}

// ── Rotating circular badge ────────────────────────────────────────────────

function CircularBadge() {
  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 100 100" className="v2-badge-spin w-full h-full">
        <defs>
          <path id="badgepath" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" fill="none" />
        </defs>
        <text fill="rgba(255,255,255,0.5)" style={{ fontSize: "8.5px", letterSpacing: "2.5px" }}>
          <textPath href="#badgepath">
            AVAILABLE FOR WORK • OPEN TO PROJECTS •
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-violet-300">
        <ArrowDown />
      </span>
    </div>
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
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * strength}px, ${
      (e.clientY - (r.top + r.height / 2)) * strength
    }px)`;
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
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

// ── Count-up ─────────────────────────────────────────────────────────────────

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      setVal(to);
      return;
    }
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / 1300, 1);
            setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          io.disconnect();
        }
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

// ── Reveal ─────────────────────────────────────────────────────────────────

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 36,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const marqueeWords = ["Python automation", "AI tools", "Web apps", "Chatbots", "Discord & Telegram bots", "Bug fixing", "Web design"];

type Stat = { label: string } & ({ to: number; suffix: string } | { display: string });
const stats: Stat[] = [
  { display: "24–48h", label: "Typical delivery" },
  { to: 100, suffix: "%", label: "Built personally" },
  { display: "∞", label: "Revisions until it works" },
  { to: 4, suffix: "+", label: "Real projects shipped" },
];

const services = [
  { n: "01", title: "Python Automation & AI Tools", desc: "Web scrapers, automation scripts, AI tools (OpenAI/Claude), and data pipelines — ready to run.", from: "from $50", href: "https://www.fiverr.com/shaktibuilds/build-a-python-automation-script-web-scraper-or-ai-tool-for-business" },
  { n: "02", title: "Website & Web App Design", desc: "For anyone, anything. Landing pages, portfolios, business sites, and full web apps — designed and built end to end.", from: "from $120", href: FIVERR_PROFILE },
  { n: "03", title: "Custom AI Chatbot", desc: "GPT-powered chatbots trained on your data and embedded anywhere on your site.", from: "from $60", href: "https://www.fiverr.com/s/kLQWx2W" },
  { n: "04", title: "Discord & Telegram Bots", desc: "Commands, moderation, role assignment, notifications, and API integrations.", from: "from $50", href: "https://www.fiverr.com/s/ljayrzb" },
  { n: "05", title: "Bug Fixes & Debugging", desc: "Python, JavaScript, React, and Next.js bugs fixed fast — 24h turnaround on simple ones.", from: "from $30", href: "https://www.fiverr.com/s/99VW9BA" },
];

type Project = {
  index: string; badge: string; badgeClass: string; title: string; tagline: string;
  desc: string; tags: string[]; image?: string; placeholder?: boolean; link: string; linkLabel: string;
};
const projects: Project[] = [
  {
    index: "01", badge: "Client project", badgeClass: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
    title: "SS BAZAR", tagline: "Reserve & Collect store for a local fashion & grocery shop",
    desc: "Customers browse the catalogue, bag items, choose store pickup or home delivery, and get an order code. The merchant checks them out at the counter — stock updates automatically on collection. No online payment; the whole experience is built around in-person transactions.",
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind", "Vercel"],
    image: "/projects/cs-2.png", link: "https://clothing-store-steel-kappa.vercel.app", linkLabel: "View live",
  },
  {
    index: "02", badge: "Personal tool", badgeClass: "text-sky-300 border-sky-400/30 bg-sky-400/10",
    title: "Mission Control", tagline: "A local work tracker that replaced a mess of scattered files",
    desc: "Kanban board, sprint planning, bug tracker, and GitHub Issues sync — running offline as a local web app. A Ctrl+K command palette, dark mode, and an insights dashboard with velocity charts.",
    tags: ["Next.js", "SQLite", "TypeScript", "Tailwind"],
    image: "/projects/mc-1.png", link: "https://github.com/shakti-mohapatra/mission-control", linkLabel: "View on GitHub",
  },
  {
    index: "03", badge: "In progress", badgeClass: "text-amber-300 border-amber-400/30 bg-amber-400/10",
    title: "AI Knowledge Base", tagline: "A team's documents, turned into an AI assistant they can query",
    desc: "A multi-tenant SaaS where organisations upload documents and get an AI assistant trained on them. Roles and invitations, document ingestion and chunking, API keys and webhooks, and a complete audit log. Built with FastAPI, Postgres, and React.",
    tags: ["FastAPI", "PostgreSQL", "React", "TanStack Query", "Alembic"],
    placeholder: true, link: GITHUB, linkLabel: "Case study coming soon",
  },
];

const steps = [
  { n: "01", title: "Tell me what you need", desc: "Plain English works. Describe what you want the tool, bot, or app to do — I handle the technical side." },
  { n: "02", title: "I build it and explain it", desc: "Working code delivered with instructions that make sense — how to run it, what each part does, how to change it later." },
  { n: "03", title: "Revisions until it's right", desc: "Included in every order. If the software doesn't do what you hired it for, I fix it — no re-billing, no arguing." },
];
const guarantees = [
  { title: "No outsourcing", desc: "Every line is written by me. The person you talk to is the person who builds it." },
  { title: "Price agreed upfront", desc: "We settle on the cost before I start. No surprise charges halfway through." },
  { title: "Revisions included", desc: "If it doesn't do what you hired it for, I fix it — no re-billing." },
  { title: "Secure through Fiverr", desc: "Payment protection and delivery guarantees handled by the platform." },
];
const skills = ["Python", "TypeScript", "React & Next.js", "OpenAI / Claude API", "FastAPI", "Discord.py", "Web Scraping", "REST APIs", "Supabase / PostgreSQL", "Tailwind CSS"];

const lineV: Variants = {
  hide: { y: "115%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.12 } }),
};
const fadeV: Variants = {
  hide: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 + i * 0.12 } }),
};

// ── Project row (scroll parallax) ──────────────────────────────────────────────

function ProjectRow({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.12]);
  const flip = i % 2 === 1;

  return (
    <div ref={ref} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <Reveal className={`flex flex-col gap-6 ${flip ? "lg:order-2" : ""}`}>
        <div className="flex items-center gap-4">
          <span className="text-7xl font-bold text-white/[0.08] leading-none select-none">{p.index}</span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.badgeClass}`}>{p.badge}</span>
        </div>
        <div>
          <h3 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">{p.title}</h3>
          <p className="text-violet-300 font-medium mb-4">{p.tagline}</p>
          <p className="text-white/55 leading-relaxed">{p.desc}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="text-xs font-medium text-white/60 border border-white/12 bg-white/[0.03] px-3 py-1.5 rounded-full">{t}</span>
          ))}
        </div>
        <a href={p.link} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-violet-300 transition-colors self-start">
          {p.linkLabel}
          <span className="group-hover:translate-x-1 transition-transform"><ArrowUpRight /></span>
        </a>
      </Reveal>

      <div className={flip ? "lg:order-1" : ""}>
        <motion.div style={{ y }} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/12 bg-[var(--v2-surface)]">
          {p.placeholder ? (
            <div className="absolute inset-0 p-6 font-mono text-[13px]">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-3 h-3 rounded-full bg-red-400/70" />
                <span className="w-3 h-3 rounded-full bg-amber-400/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-white/30">ai-kb · ingest</span>
              </div>
              <div className="space-y-2 text-white/55">
                <p><span className="text-emerald-300">POST</span> /orgs/acme/documents</p>
                <p className="text-white/35">→ uploaded handbook.pdf (2.4 MB)</p>
                <p className="text-white/35">→ chunking… <span className="text-violet-300">1,248 chunks</span></p>
                <p className="text-white/35">→ embedding… <span className="text-violet-300">done</span></p>
                <p><span className="text-sky-300">audit_log</span> document.uploaded ✓</p>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[72%] bg-gradient-to-r from-violet-500 to-fuchsia-400" />
                </div>
                <p className="text-white/30 mt-2 text-xs">Sprint 31 of ~40 · in active development</p>
              </div>
            </div>
          ) : (
            <motion.div style={{ scale }} className="absolute inset-0">
              <Image src={p.image as string} alt={p.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover object-top" priority={i === 0} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function V2Home() {
  const lenisRef = useRef<LenisType | null>(null);
  const [ready, setReady] = useState(prefersReduced());
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 140 && !menuOpen);
  });

  useEffect(() => {
    if (prefersReduced()) return;
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

  function goTo(e: React.MouseEvent, href: string) {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el as HTMLElement, { offset: -40 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="v2-root relative min-h-screen overflow-x-clip">
      {!ready && <Loader onDone={() => setReady(true)} />}
      <div className="v2-grain" aria-hidden />

      {/* ── Nav ── */}
      <motion.header
        className="fixed top-0 inset-x-0 z-50"
        animate={{ y: hidden ? "-130%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto px-6 mt-4">
          <div className="flex items-center justify-between h-14 px-5 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl">
            <a href="#hero" onClick={(e) => goTo(e, "#hero")} className="font-semibold tracking-tight text-[15px]">
              shakti<span className="text-violet-400">builds</span>
            </a>
            <div className="flex items-center gap-4">
              <span className="hidden sm:flex items-center gap-2 text-xs text-white/55">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available
              </span>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                <span className="flex flex-col gap-1">
                  <span className={`block h-px w-5 bg-current transition-transform ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
                  <span className={`block h-px w-5 bg-current transition-transform ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
                </span>
                {menuOpen ? "Close" : "Menu"}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Fullscreen overlay menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-xl flex flex-col justify-center"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="max-w-6xl mx-auto px-6 w-full">
              <nav className="flex flex-col gap-2">
                {navLinks.map((l, idx) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => goTo(e, l.href)}
                    className="group flex items-center gap-6 text-5xl sm:text-7xl font-bold tracking-tight text-white/70 hover:text-white transition-colors"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="text-base font-mono text-violet-400/60">0{idx + 1}</span>
                    {l.label}
                    <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-violet-300"><ArrowUpRight className="w-8 h-8" /></span>
                  </motion.a>
                ))}
              </nav>
              <div className="flex flex-wrap gap-x-10 gap-y-3 mt-16 text-sm text-white/50">
                <a href={FIVERR_PROFILE} target="_blank" rel="noopener noreferrer" className="hover:text-violet-300 transition-colors">Fiverr ↗</a>
                <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub ↗</a>
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">{EMAIL}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ── Hero ── */}
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
          <HeroCanvas />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060608]/30 via-transparent to-[#060608]" aria-hidden />

          <div className="relative max-w-6xl mx-auto px-6 w-full pt-28 pb-20">
            <motion.p variants={fadeV} initial="hide" animate={ready ? "show" : "hide"} custom={0} className="text-sm tracking-[0.3em] uppercase text-white/50 mb-8">
              Freelance developer &amp; designer
            </motion.p>
            <h1 className="text-[clamp(2.75rem,9vw,7rem)] font-bold leading-[0.95] tracking-tight">
              <span className="v2-line"><motion.span className="block" variants={lineV} initial="hide" animate={ready ? "show" : "hide"} custom={0}>I turn ideas into</motion.span></span>
              <span className="v2-line"><motion.span className="block v2-accent-text" variants={lineV} initial="hide" animate={ready ? "show" : "hide"} custom={1}>working software.</motion.span></span>
            </h1>
            <motion.p variants={fadeV} initial="hide" animate={ready ? "show" : "hide"} custom={1} className="max-w-xl text-lg sm:text-xl text-white/60 mt-8 leading-relaxed">
              Python automation, AI tools, web apps, and bots — built fast, explained in plain English, and revised until they do exactly what you need.
            </motion.p>
            <motion.div variants={fadeV} initial="hide" animate={ready ? "show" : "hide"} custom={2} className="flex flex-col sm:flex-row gap-4 mt-12">
              <Magnetic strength={0.35}>
                <a href="#work" onClick={(e) => goTo(e, "#work")} className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors">See my work</a>
              </Magnetic>
              <Magnetic strength={0.35}>
                <a href={FIVERR_PROFILE} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-full border border-white/25 text-white font-semibold hover:bg-white/5 transition-colors inline-flex items-center gap-2">Hire me on Fiverr <ArrowUpRight /></a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 1 }} className="absolute bottom-10 right-6 sm:right-10 hidden sm:block">
            <CircularBadge />
          </motion.div>
        </section>

        {/* ── Marquee ── */}
        <section className="v2-marquee border-y border-white/10 py-6 bg-[#060608]" aria-hidden>
          <div className="v2-marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center">
                {marqueeWords.map((w) => (
                  <span key={dup + w} className="flex items-center text-2xl sm:text-3xl font-semibold text-white/25 mx-8">
                    {w}<span className="mx-8 text-violet-500">✦</span>
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
              <Reveal key={s.label} className="text-center md:text-left">
                <div className="text-4xl sm:text-5xl font-bold tracking-tight">
                  {"to" in s ? <CountUp to={s.to} suffix={s.suffix} /> : s.display}
                </div>
                <div className="text-sm text-white/45 mt-2">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Work ── */}
        <section id="work" className="py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-20">
              <Reveal><h2 className="text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none">Selected<br />work</h2></Reveal>
              <Reveal className="hidden sm:block" delay={0.1}><p className="text-white/45 max-w-xs text-right">Real projects built for real use — not demos, not mockups.</p></Reveal>
            </div>
            <div className="space-y-28">
              {projects.map((p, i) => <ProjectRow key={p.title} p={p} i={i} />)}
            </div>
          </div>
        </section>

        {/* ── Services (interactive list) ── */}
        <section id="services" className="py-28 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <Reveal><h2 className="text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none mb-5">What I can build</h2></Reveal>
              <Reveal delay={0.1}><p className="text-white/55 text-lg">Prices are starting points — message me for an exact quote. Hover a service to explore; click to open it on Fiverr.</p></Reveal>
            </div>
            <div>
              {services.map((s) => (
                <a key={s.n} href={s.href} target="_blank" rel="noopener noreferrer" className="v2-srow group block">
                  <span className="v2-srow-fill" />
                  <div className="relative flex items-center justify-between gap-6 py-8 px-2 sm:px-6">
                    <div className="flex items-baseline gap-5 sm:gap-8 min-w-0">
                      <span className="text-sm font-mono text-violet-400/60 shrink-0">{s.n}</span>
                      <div className="min-w-0">
                        <h3 className="v2-srow-title text-2xl sm:text-4xl font-bold tracking-tight group-hover:text-white text-white/85">{s.title}</h3>
                        <p className="text-sm text-white/45 mt-2 max-w-xl">{s.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                      <span className="hidden sm:inline text-sm text-white/40">{s.from}</span>
                      <span className="text-violet-300 group-hover:rotate-45 transition-transform duration-300"><ArrowUpRight className="w-6 h-6" /></span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <Reveal className="mt-12">
              <p className="text-white/50">Something else in mind? <a href={`mailto:${EMAIL}`} className="text-violet-300 hover:text-violet-200 underline underline-offset-4">Email me</a> — if you can describe it in plain English, I can probably build it.</p>
            </Reveal>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="py-28 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal><h2 className="text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none mb-16">How I work</h2></Reveal>
            <div className="grid md:grid-cols-3 gap-12">
              {steps.map((step, i) => (
                <Reveal key={step.n} delay={i * 0.1} className="flex flex-col gap-5">
                  <span className="text-6xl font-bold v2-accent-text leading-none select-none">{step.n}</span>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-white/55 leading-relaxed">{step.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Guarantees ── */}
        <section className="py-28 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal><h2 className="text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none mb-16">What you can count on</h2></Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {guarantees.map((g, i) => (
                <Reveal key={g.title} delay={i * 0.08} className="flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-[var(--v2-surface)] h-full">
                  <span className="w-9 h-9 rounded-lg bg-emerald-400/10 text-emerald-300 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-5 h-5"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <h3 className="font-semibold">{g.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{g.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="py-28 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <h2 className="text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none mb-8">About me</h2>
              <div className="space-y-5 text-white/60 leading-relaxed text-lg">
                <p>I&apos;m a full-stack developer specialising in Python and JavaScript. I&apos;ve spent the last few years building things that actually get used — automation that runs every morning, AI tools that answer the questions support teams got tired of handling, and web apps that shops opened to real customers.</p>
                <p>I work with founders and small businesses who need something built without hiring a full team. Every project is handled personally — no outsourcing, no templates, no copy-paste.</p>
                <p className="text-white">If you can describe what you want in plain English, I can build it.</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-6">Skills &amp; tools</h3>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <span key={skill} className="text-sm font-medium text-white/70 border border-white/12 bg-white/[0.03] px-4 py-2 rounded-full hover:border-violet-400/50 hover:text-violet-200 transition-colors">{skill}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="py-32 border-t border-white/10 relative overflow-hidden">
          <div className="absolute inset-0" aria-hidden style={{ background: "radial-gradient(60% 80% at 50% 120%, rgba(139,92,246,0.3), transparent 70%)" }} />
          <div className="max-w-6xl mx-auto px-6 text-center relative">
            <Reveal><h2 className="text-[clamp(2.5rem,8vw,6rem)] font-bold tracking-tight leading-[1.02]">Let&apos;s build <span className="v2-accent-text">something.</span></h2></Reveal>
            <Reveal delay={0.1}><p className="text-white/55 text-lg max-w-md mx-auto mt-6">Order on Fiverr for secure payments and delivery guarantees, or email me to talk it through first.</p></Reveal>
            <Reveal delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Magnetic strength={0.35}><a href={FIVERR_PROFILE} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors">Hire me on Fiverr</a></Magnetic>
              <Magnetic strength={0.35}><a href={`mailto:${EMAIL}`} className="px-8 py-3.5 rounded-full border border-white/25 text-white font-semibold hover:bg-white/5 transition-colors">{EMAIL}</a></Magnetic>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <span>© 2026 Shakti M. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors"><GitHubIcon /> GitHub</a>
            <a href={FIVERR_PROFILE} target="_blank" rel="noopener noreferrer" className="hover:text-violet-300 transition-colors">fiverr.com/shaktibuilds</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
