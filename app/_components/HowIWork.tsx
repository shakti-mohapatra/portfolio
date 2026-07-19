import { steps, howIWork } from "../_data";
import { ServiceIcon } from "./icons";

// Tile redesign (2026-07, Reference_Images/How_i_actually_work_reference_I_Love.png):
// eyebrow + numeral/icon header, single-paragraph body, step rail footer.
// Copy is a recombination of the existing steps/howIWork strings, no new
// claims — same standard as the original merge (item 4).
export default function HowIWork() {
  return (
    <section className="py-28 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span className="font-mono text-[var(--text-label)] uppercase tracking-[0.2em] text-[var(--accent)]">Process</span>
        </div>
        <h2 className="reveal-left text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none mb-4">
          How <span className="text-[var(--accent)]">I</span> actually work
        </h2>
        <p className="reveal text-white/55 max-w-md mb-16">
          Three steps, start to finish, no scope creep and no vanishing after payment.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {steps.map((step, i) => {
            const promise = howIWork[i];
            return (
              <div key={step.n} className="reveal tile tile--static flex flex-col gap-5 p-7 sm:p-8 h-full">
                <div className="tile-pull flex items-center justify-between">
                  <span className="font-mono text-3xl font-bold text-white/15">{step.n}</span>
                  <span className="w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-[var(--accent)] shrink-0">
                    <ServiceIcon n={step.n} />
                  </span>
                </div>
                <div className="tile-pull flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <span className="font-mono text-[var(--text-micro)] uppercase tracking-widest text-[var(--accent)]">{promise.eyebrow}</span>
                  </div>
                  <h3 className="font-semibold text-white/90 text-xl leading-snug">{promise.title}</h3>
                  <div className="w-8 h-px bg-[var(--accent)]" />
                  <p className="text-white/55 leading-relaxed text-sm">{promise.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reveal relative flex items-center justify-between max-w-2xl mx-auto px-4">
          <div className="absolute inset-x-4 top-1 h-px bg-white/[0.08]" aria-hidden="true" />
          {steps.map((step) => (
            <div key={step.n} className="relative flex flex-col items-center gap-2.5 z-[1]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Step {step.n}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
