import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../_components/Footer";
import CaseStudySpy from "../../_components/CaseStudySpy";
import { ArrowUpRight } from "../../_components/icons";
import { caseStudies, findCaseStudy } from "../../_data";

// Same one-liner as CaseStudySpy's own copy. Not shared: RSC forbids calling
// a function exported from a "use client" module directly in server code
// (only rendering it as a component/prop is allowed), so this trivial
// function gets duplicated rather than pulled into a third shared file.
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Only the two authored slugs exist; anything else 404s at the routing layer.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = findCaseStudy(slug);
  if (!cs) return {};
  const title = `${cs.title1} ${cs.title2} — Case study | Shakti Mohapatra`;
  const description = cs.standfirst;
  // Own canonical so this route doesn't inherit the site root's (PLAN §10 #13).
  return {
    title,
    description,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: { title, description, url: `/work/${cs.slug}`, siteName: "Shakti Mohapatra", type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

// Item 2 (2026-07): SEVERITY is the one readout row worth color-coding — it's
// the field a recruiter's eye should land on first.
function severityTone(value: string) {
  if (/CRITICAL/i.test(value)) return { text: "text-red-400", dot: "bg-red-400" };
  if (/HIGH/i.test(value)) return { text: "text-amber-300", dot: "bg-amber-300" };
  return { text: "text-[var(--accent)]", dot: "bg-[var(--accent)]" };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = findCaseStudy(slug);
  if (!cs) notFound();

  const headings = cs.sections.map((s) => s.heading);

  return (
    // data-mode="day": these reports are reached from /recruiters, so the
    // accent should match that context (blue/cyan), not the client violet.
    <div className="site relative min-h-screen overflow-x-clip" data-mode="day">
      <div className="read-progress" aria-hidden />
      <div className="grain" aria-hidden />
      {/* Living background — same ambient-orb pattern as Shell.tsx (§9.5), so this
          page doesn't read as a flat, disconnected sheet of black. */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute rounded-full" style={{ top: "10%", left: "-15%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(var(--accent-rgb),0.10) 0%, transparent 70%)", filter: "blur(120px)" }} />
        <div className="absolute rounded-full" style={{ top: "55%", right: "-15%", width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(var(--accent2-rgb),0.08) 0%, transparent 70%)", filter: "blur(120px)" }} />
      </div>

      {/* Minimal chrome — the site header's in-page anchors don't exist here, so a
          bespoke bar (wordmark home + back) is correct, not the shared SiteHeader. */}
      <header className="relative z-[1] border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-[15px]">
            shakti<span className="text-[var(--accent)]">builds</span>
          </Link>
          <Link href="/recruiters" className="font-mono text-xs uppercase tracking-wide text-white/50 hover:text-white transition-colors">
            ← Back to work
          </Link>
        </div>
      </header>

      <main className="relative z-[1] max-w-6xl mx-auto px-6 py-20 sm:py-28">
        <article>
          {/* Eyebrow — same mono metadata language as every section on the site */}
          <div className="reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wide text-white/40">
            <span>Case study / {cs.index} · {cs.project}</span>
            <span>{cs.date}</span>
          </div>

          {/* Headline — same clamp() scale as the hero */}
          <h1 className="reveal-scale mt-6 text-[clamp(2.5rem,8vw,5.5rem)] font-bold tracking-tight leading-[0.95]">
            {cs.title1}<br />{cs.title2}
          </h1>

          <p className="reveal mt-8 max-w-2xl text-lg text-white/65 leading-relaxed">{cs.standfirst}</p>

          {/* The readout — a tile-wrapped <dl>, mono labels left, values right.
              SEVERITY is color-coded with a lead dot; every row brightens and
              nudges right on hover (item 2's "make it interactive" ask). */}
          <dl className="reveal tile tile--static mt-14 p-6 sm:p-8 font-mono text-sm">
            {cs.readout.map((r, i) => {
              const isSeverity = r.label === "SEVERITY";
              const tone = isSeverity ? severityTone(r.value) : null;
              return (
                <div
                  key={r.label}
                  className={`group grid grid-cols-[8rem_1fr] sm:grid-cols-[11rem_1fr] gap-4 sm:gap-8 py-3.5 transition-transform duration-200 hover:translate-x-1 ${i > 0 ? "border-t border-white/[0.08]" : ""}`}
                >
                  <dt className="uppercase tracking-wide text-white/40 group-hover:text-white/65 transition-colors">{r.label}</dt>
                  <dd className={`flex items-center gap-2 text-white/90 group-hover:text-white transition-colors ${tone ? tone.text : ""}`}>
                    {tone && <span className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${tone.dot}`} aria-hidden />}
                    {r.value}
                  </dd>
                </div>
              );
            })}
          </dl>

          {/* Prose — sticky scrollspy rail (lg+) beside ordinary editorial type */}
          <div className="mt-16 grid lg:grid-cols-[180px_1fr] gap-x-12 gap-y-4">
            <CaseStudySpy headings={headings} />
            <div className="max-w-2xl space-y-14">
              {cs.sections.map((s) => (
                <section key={s.heading} id={slugify(s.heading)} className="reveal-left scroll-mt-24 border-l border-white/[0.08] pl-6">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]/80 mb-4">{s.heading}</h2>
                  <div className="space-y-4 text-white/60 leading-relaxed">
                    {s.body.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Footer of the article — verifiable artifact + return */}
          <div className="reveal mt-16 pt-8 border-t border-white/[0.08] flex flex-wrap items-center gap-x-8 gap-y-3">
            {cs.repo && (
              <a href={cs.repo.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[var(--accent)] transition-colors">
                {cs.repo.label}
                <span className="group-hover:translate-x-1 transition-transform"><ArrowUpRight /></span>
              </a>
            )}
            <Link href="/recruiters" className="font-mono text-xs uppercase tracking-wide text-white/50 hover:text-white transition-colors">
              ← Back to work
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
