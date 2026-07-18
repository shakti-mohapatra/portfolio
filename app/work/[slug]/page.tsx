import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../_components/Footer";
import { ArrowUpRight } from "../../_components/icons";
import { caseStudies, findCaseStudy } from "../../_data";

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

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = findCaseStudy(slug);
  if (!cs) notFound();

  return (
    <div className="site relative min-h-screen">
      {/* Minimal chrome — the site header's in-page anchors don't exist here, so a
          bespoke bar (wordmark home + back) is correct, not the shared SiteHeader. */}
      <header className="border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-[15px]">
            shakti<span className="text-violet-400">builds</span>
          </Link>
          <Link href="/recruiters" className="font-mono text-xs uppercase tracking-wide text-white/50 hover:text-white transition-colors">
            ← Back to work
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20 sm:py-28">
        <article>
          {/* Eyebrow — same mono metadata language as every section on the site */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wide text-white/40">
            <span>Case study / {cs.index} · {cs.project}</span>
            <span>{cs.date}</span>
          </div>

          {/* Headline — same clamp() scale as the hero */}
          <h1 className="mt-6 text-[clamp(2.5rem,8vw,5.5rem)] font-bold tracking-tight leading-[0.95]">
            {cs.title1}<br />{cs.title2}
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-white/65 leading-relaxed">{cs.standfirst}</p>

          {/* The readout — a <dl>, mono labels left, values right, hairline between
              rows. This is the one new component PLAN §4 allows; everything else reuses
              the existing system. Degrades to a plain definition list on its own. */}
          <dl className="mt-14 border-t border-white/[0.08] font-mono text-sm">
            {cs.readout.map((r) => (
              <div key={r.label} className="grid grid-cols-[8rem_1fr] sm:grid-cols-[11rem_1fr] gap-4 sm:gap-8 py-3.5 border-b border-white/[0.08]">
                <dt className="uppercase tracking-wide text-white/40">{r.label}</dt>
                <dd className="text-white/85">{r.value}</dd>
              </div>
            ))}
          </dl>

          {/* Prose — ordinary editorial type, normal reading width */}
          <div className="mt-16 max-w-2xl space-y-12">
            {cs.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300/70 mb-4">{s.heading}</h2>
                <div className="space-y-4 text-white/60 leading-relaxed">
                  {s.body.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </section>
            ))}
          </div>

          {/* Footer of the article — verifiable artifact + return */}
          <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-wrap items-center gap-x-8 gap-y-3">
            {cs.repo && (
              <a href={cs.repo.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-violet-300 transition-colors">
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
