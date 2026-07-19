import { steps, howIWork } from "../_data";

// Merges the old "How I work" (process steps) and "How I actually work"
// (delivery promises) sections into one — they were two shallow passes at the
// same 3 beats (intake, build, fix), not two different ideas (item 4, 2026-07).
// All copy is unchanged, just recomposed: each tile pairs one step with its
// matching promise instead of two separate rows of 3 thin cards.
export default function HowIWork() {
  return (
    <section className="py-28 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal-left text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none mb-16">How I actually work</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const promise = howIWork[i];
            return (
              <div key={step.n} className="reveal tile tile--static flex flex-col gap-5 p-7 sm:p-8 h-full">
                <div className="tile-pull flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-bold text-[var(--accent)]">{step.n}</span>
                  <span className="font-mono text-[var(--text-micro)] uppercase tracking-widest text-white/40">{step.title}</span>
                </div>
                <div className="tile-pull flex flex-col gap-3">
                  <h3 className="font-semibold text-white/90 text-xl">{promise.title}</h3>
                  <p className="text-white/55 leading-relaxed text-sm">{promise.body}</p>
                  <p className="text-white/40 leading-relaxed text-sm">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
