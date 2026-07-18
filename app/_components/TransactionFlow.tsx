import { paymentFlowStations } from "../_data";
import { SkillIcon } from "./icons";

const ICONS = [
  <svg key="card" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
    <rect x="2" y="6" width="20" height="13" rx="2" />
    <path d="M2 10h20" />
    <rect x="5" y="13" width="4" height="3" rx="0.5" />
  </svg>,
  <SkillIcon key="reader" kind="terminal" />,
  <svg key="network" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
    <circle cx="12" cy="5" r="2.2" />
    <circle cx="5" cy="18" r="2.2" />
    <circle cx="19" cy="18" r="2.2" />
    <path d="M10.5 6.8L6.5 16.2M13.5 6.8l4 9.4M7.2 18h9.6" />
  </svg>,
  <svg key="bank" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
    <path d="M3 10l9-6 9 6" />
    <path d="M4 10v9M9 10v9M15 10v9M20 10v9" />
    <path d="M2 21h20" />
  </svg>,
];

// Client route only (§3B). Pure CSS — no JS, no client island. The pulse and
// status readout are time-based @keyframes, same evergreen pattern as the
// hero intro and marquee, so this needs no Firefox @supports fallback branch.
export default function TransactionFlow() {
  return (
    <section className="py-28 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6">
        <span className="reveal block font-mono text-[var(--text-label)] tracking-widest text-[var(--accent)] uppercase mb-3">
          Live readout
        </span>
        <h2 className="reveal-left text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none mb-6">
          What happens when you tap your card
        </h2>
        <p className="reveal-right text-white/55 leading-relaxed max-w-2xl mb-16">
          Four systems talk to each other every time you pay, all in about a second. I test systems like this one for a living — here&apos;s what&apos;s actually happening.
        </p>

        <div className="reveal">
          <div className="relative h-2 mb-8 mx-[12.5%]">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/[0.08]" aria-hidden="true" />
            <div className="flow-pulse absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          </div>

          <div className="flex justify-between gap-2 sm:gap-6">
            {paymentFlowStations.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-3 w-1/4">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl border border-white/[0.08] bg-[var(--panel)] flex items-center justify-center text-white/70 shrink-0">
                  {ICONS[i]}
                </div>
                <span className="font-mono text-[var(--text-label)] uppercase tracking-wide text-white/80">{s.label}</span>
                <p className="hidden sm:block text-sm text-white/50 leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative h-6 mt-10 text-center font-mono text-[var(--text-label)] tracking-widest uppercase" aria-live="off">
            <span className="flow-status-a absolute inset-0 text-white/50">Sending request…</span>
            <span className="flow-status-b absolute inset-0 text-[var(--accent)]">Approved</span>
          </div>
        </div>
      </div>
    </section>
  );
}
