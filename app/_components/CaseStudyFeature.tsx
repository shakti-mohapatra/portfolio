import Link from "next/link";
import { caseStudies } from "../_data";

// Case studies section (PLAN §4, extended). Recruiter-only — §1's dialect split:
// the client route stays jargon-free, this proves judgement to a recruiter.
// Placed after the decoder (PLAN §11 reorder) so Experience/Skills lead, Work
// shows the portfolio, the decoder is the interactive finale, and these defect
// reports close the read before Contact. Server component — no interactivity.
export default function CaseStudyFeature() {
  if (caseStudies.length === 0) return null;
  return (
    <section id="case-studies" className="py-28 border-b border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <h2 className="reveal text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none">Case<br />studies</h2>
          <p className="reveal hidden sm:block text-white/60 max-w-xs text-right">Defect reports, not highlight reels — what broke, why, and what I did about it.</p>
        </div>
        <div className="space-y-6">
          {caseStudies.map((cs) => (
            <div key={cs.slug} className="reveal tile tile--interactive p-8 sm:p-12">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wide text-white/55">
                <span>Case study / {cs.index} · {cs.project}</span>
                <span>{cs.date}</span>
              </div>
              <h3 className="mt-6 text-[clamp(1.6rem,4vw,2.75rem)] font-bold tracking-tight leading-[0.98]">
                {cs.title1} {cs.title2}
              </h3>
              <p className="mt-6 max-w-2xl text-white/60 leading-relaxed">{cs.standfirst}</p>
              <Link
                href={`/work/${cs.slug}`}
                className="group mt-8 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-[var(--accent)] hover:text-white transition-colors"
              >
                Read the report
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
