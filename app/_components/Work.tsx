import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "./icons";
import { projects, type Mode, type Project } from "../_data";

function ProjectRow({ p, i, mode }: { p: Project; i: number; mode: Mode }) {
  const flip = i % 2 === 1;
  const index = String(i + 1).padStart(2, "0");
  const desc = mode === "side" && p.descPlain ? p.descPlain : p.desc;
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className={`reveal flex flex-col gap-6 ${flip ? "lg:order-2" : ""}`}>
        <div className="flex items-center gap-4">
          <span className="font-mono text-7xl font-bold text-white/[0.08] leading-none select-none">{index}</span>
          <span className={`font-mono text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full border ${p.badgeClass}`}>{p.badge}</span>
        </div>
        <div>
          <h3 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">{p.title}</h3>
          <p className="text-violet-300 font-medium mb-4">{p.tagline}</p>
          <p className="text-white/55 leading-relaxed">{desc}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="font-mono text-xs font-medium text-white/60 border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 rounded-full">{t}</span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={p.link} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-violet-300 transition-colors">
            {p.linkLabel}
            <span className="group-hover:translate-x-1 transition-transform"><ArrowUpRight /></span>
          </a>
          {p.caseStudySlug && mode === "day" && (
            <Link href={`/work/${p.caseStudySlug}`} className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-violet-300 hover:text-violet-200 transition-colors">
              Read the report
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          )}
        </div>
      </div>

      <div className={flip ? "lg:order-1" : ""}>
        <div data-magnetic className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.08] bg-[var(--panel)]">
          {p.image ? (
            <Image src={p.image} alt={p.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover object-top" priority={i === 0} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-wide text-white/25">Screenshot pending</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Work({ mode }: { mode: Mode }) {
  const ordered = [...projects].sort((a, b) => a.order[mode] - b.order[mode]);
  return (
    <section id="work" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-20">
          <h2 className="reveal text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none">Selected<br />work</h2>
          <p className="reveal hidden sm:block text-white/45 max-w-xs text-right">Real projects built for real use — not demos, not mockups.</p>
        </div>
        <div className="space-y-28">
          {ordered.map((p, i) => <ProjectRow key={p.title} p={p} i={i} mode={mode} />)}
        </div>
      </div>
    </section>
  );
}
