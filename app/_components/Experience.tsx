import { ArrowUpRight } from "./icons";
import { experience, RESUME_PDF } from "../_data";

export default function Experience() {
  return (
    <section id="experience" className="py-28 border-b border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <h2 className="reveal text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none">Experience</h2>
          <div className="reveal sm:text-right">
            <p className="text-white/45 max-w-xs sm:ml-auto">4+ years testing production payment systems for tier-1 fintech clients.</p>
            <a
              href={RESUME_PDF}
              download
              className="group inline-flex items-center gap-2 mt-3 text-sm font-semibold text-violet-300 hover:text-violet-200 transition-colors"
            >
              Download résumé (PDF)
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Company header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-6 rounded-2xl border border-white/[0.08] bg-[var(--panel)] mb-10">
          <div>
            <h3 className="text-xl font-bold">{experience.company}</h3>
            <p className="text-white/50 text-sm mt-1">{experience.role}</p>
          </div>
          <div className="font-mono text-sm text-white/40 sm:text-right shrink-0">
            <p>{experience.dates}</p>
            <p>{experience.location}</p>
          </div>
        </div>

        {/* Client engagement timeline */}
        <div>
          {experience.engagements.map((e) => (
            <div key={e.org} className="reveal grid sm:grid-cols-[220px_1fr] gap-3 sm:gap-8 py-8 border-b border-white/[0.08] last:border-0">
              <div>
                <h4 className="font-semibold text-white/90">{e.org}</h4>
                <p className="text-violet-300 text-xs mt-1 leading-snug">{e.scope}</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-white/55 leading-relaxed">{e.prose}</p>
                <p className="font-mono text-xs uppercase tracking-wide text-white/40">{e.metric}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Currently learning + education */}
        <div className="grid sm:grid-cols-2 gap-5 mt-4">
          <div className="reveal p-6 rounded-2xl border border-violet-400/20 bg-violet-400/[0.05]">
            <p className="font-mono text-micro uppercase tracking-[0.28em] text-violet-300/70 mb-2">Currently</p>
            <h4 className="font-semibold mb-2">GenAI &amp; Agentic AI Master&apos;s Program</h4>
            <p className="text-sm text-white/55 leading-relaxed">
              LearnBay, 2026–2027 — applying the same QA discipline to LLM evaluation, RAG, and agentic systems. Building BFSI-focused projects: fraud detection, compliance review, payment-domain AI tools.
            </p>
          </div>
          <div className="reveal p-6 rounded-2xl border border-white/[0.08] bg-[var(--panel)]">
            <p className="font-mono text-micro uppercase tracking-[0.28em] text-white/30 mb-2">Education</p>
            <h4 className="font-semibold mb-1">{experience.education.degree}</h4>
            <p className="text-sm text-white/50">{experience.education.school} · {experience.education.year}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
