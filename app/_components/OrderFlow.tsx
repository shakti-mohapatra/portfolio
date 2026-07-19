import { steps } from "../_data";
import { ServiceIcon } from "./icons";

// Client-tab equivalent of the recruiter route's PaymentLifecycle — same
// rail/packet/node visual grammar (reuses .plc-packet/.plc-node, they're
// generic pulse/travel animations despite the fintech-era class prefix),
// but jargon-free: the 3-step order process instead of a card auth flow.
// One evergreen 9s loop, same timing constants as PaymentLifecycle.
const NODE_DELAY = [0, 2.025, 4.05];

export default function OrderFlow() {
  return (
    <section id="order-flow" className="py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <h2 className="reveal-left text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none">
            From message<br />to shipped code
          </h2>
          <p className="reveal-right hidden sm:block text-white/60 max-w-xs text-right">
            Three steps, no surprises in between.
          </p>
        </div>

        <div className="reveal tile tile--static p-6 sm:p-10">
          <div className="relative h-6 mb-8 text-center font-mono text-[var(--text-label)] tracking-widest uppercase">
            <span className="of-label-1 absolute inset-0 text-white/70">You describe what you need</span>
            <span className="of-label-2 absolute inset-0 text-[var(--accent)]">Building</span>
            <span className="of-label-3 absolute inset-0 text-emerald-300 font-semibold">Delivered, revisions open</span>
          </div>

          <div className="relative h-2 mb-10 mx-[8%]">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/[0.08]" aria-hidden="true" />
            <div className="plc-packet absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          </div>

          <div className="flex justify-between gap-1.5 sm:gap-4">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col items-center text-center gap-2.5 w-1/3">
                <div
                  className="plc-node w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-white/[0.08] bg-[var(--panel)] flex items-center justify-center text-white/70 shrink-0"
                  style={{ animationDelay: `${NODE_DELAY[Number(s.n) - 1]}s` }}
                >
                  <ServiceIcon n={s.n} />
                </div>
                <div>
                  <p className="font-mono text-[10px] sm:text-[var(--text-label)] uppercase tracking-wide text-white/80">{s.title}</p>
                </div>
                <p className="hidden lg:block text-[11px] text-white/45 leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
