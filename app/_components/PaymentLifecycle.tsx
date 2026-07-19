import { SkillIcon } from "./icons";

// Item 7 (2026-07): ground-up rebuild of the old client-side "tap your card"
// dot-on-a-line. Moved to the recruiter route, next to the decoder, and made
// technically exact — the real card-present authorization path, researched
// against how POS/acquiring actually works (ISO-8583 request/response,
// EMV cryptogram, gateway/acquirer/scheme/issuer hops), not a stand-in.
// Pure CSS, one evergreen @keyframes loop per moving part — same pattern as
// the hero intro / marquee / decoder boot flourish elsewhere in this file,
// so it needs no scroll-driven @supports branch.
const STAGES = [
  { key: "card", label: "Card", sub: "EMV chip", tag: "Taps · signs ARQC (9F26)" },
  { key: "pos", label: "Terminal", sub: "POS kernel", tag: "Builds ISO-8583 0100 · DE55 = EMV data" },
  { key: "gateway", label: "Gateway", sub: "Payment gateway", tag: "Captures & encrypts, forwards the request" },
  { key: "acquirer", label: "Acquirer", sub: "Merchant's bank", tag: "Reads the BIN, routes to the right scheme" },
  { key: "scheme", label: "Scheme", sub: "Visa / Mastercard", tag: "Switches the request to the issuer" },
  { key: "issuer", label: "Issuer", sub: "Cardholder's bank", tag: "Checks ARQC + funds, returns 0110 + ARPC" },
] as const;

// Forward-pass delay (s) so each node's glow lands as the packet reaches it —
// stages evenly spaced across the request leg (0%-45% of the 9s loop).
const NODE_DELAY = [0, 0.81, 1.62, 2.43, 3.24, 4.05];

function StageIcon({ k }: { k: (typeof STAGES)[number]["key"] }) {
  const cls = "w-5 h-5";
  if (k === "card") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls} aria-hidden="true">
      <rect x="2" y="6" width="20" height="13" rx="2" /><path d="M2 10h20" /><rect x="5" y="13" width="4" height="3" rx="0.5" />
    </svg>
  );
  if (k === "pos") return <SkillIcon kind="terminal" />;
  if (k === "gateway") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls} aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
  if (k === "acquirer") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls} aria-hidden="true">
      <path d="M3 10l9-6 9 6" /><path d="M4 10v9M9 10v9M15 10v9M20 10v9" /><path d="M2 21h20" />
    </svg>
  );
  if (k === "scheme") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls} aria-hidden="true">
      <circle cx="12" cy="5" r="2.2" /><circle cx="5" cy="18" r="2.2" /><circle cx="19" cy="18" r="2.2" />
      <path d="M10.5 6.8L6.5 16.2M13.5 6.8l4 9.4M7.2 18h9.6" />
    </svg>
  );
  return <SkillIcon kind="database" />;
}

export default function PaymentLifecycle() {
  return (
    <section id="payment-lifecycle" className="py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <h2 className="reveal-left text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none">
            The round trip<br />of a single tap
          </h2>
          <p className="reveal-right hidden sm:block text-white/60 max-w-xs text-right">
            Card-present authorization, end to end — six hops out, six back, in about a second.
          </p>
        </div>

        <div className="reveal tile tile--static p-6 sm:p-10">
          {/* Data label — what's actually moving, cross-fading through the real
              message states instead of a vague "sending..." */}
          <div className="relative h-6 mb-8 text-center font-mono text-[var(--text-label)] tracking-widest uppercase">
            <span className="plc-label-1 absolute inset-0 text-white/70">Tap · ARQC 9F26 generated</span>
            <span className="plc-label-2 absolute inset-0 text-[var(--accent)]">ISO-8583 0100 → gateway → acquirer → scheme</span>
            <span className="plc-label-3 absolute inset-0 text-white/70">Issuer checks ARQC + funds</span>
            <span className="plc-label-4 absolute inset-0 text-[var(--accent)]">0110 response · ARPC attached</span>
            <span className="plc-label-5 absolute inset-0 text-emerald-300 font-semibold">Approved ✓</span>
          </div>

          {/* Rail + traveling packet */}
          <div className="relative h-2 mb-10 mx-[8%]">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/[0.08]" aria-hidden="true" />
            <div className="plc-packet absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          </div>

          {/* Stage nodes */}
          <div className="flex justify-between gap-1.5 sm:gap-4">
            {STAGES.map((s, i) => (
              <div key={s.key} className="flex flex-col items-center text-center gap-2.5 w-1/6">
                <div
                  className="plc-node w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-white/[0.08] bg-[var(--panel)] flex items-center justify-center text-white/70 shrink-0"
                  style={{ animationDelay: `${NODE_DELAY[i]}s` }}
                >
                  <StageIcon k={s.key} />
                </div>
                <div>
                  <p className="font-mono text-[10px] sm:text-[var(--text-label)] uppercase tracking-wide text-white/80">{s.label}</p>
                  <p className="hidden md:block text-[10px] text-white/40 mt-0.5">{s.sub}</p>
                </div>
                <p className="hidden lg:block text-[11px] text-white/45 leading-snug">{s.tag}</p>
              </div>
            ))}
          </div>

          {/* Settlement — real distinction: authorization is real-time, money
              actually moves later in a batch. Independent, slower loop. */}
          <div className="flex items-center gap-3 mt-10 pt-6 border-t border-white/[0.08]">
            <span className="plc-settle relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/40" />
            </span>
            <p className="font-mono text-[var(--text-micro)] uppercase tracking-widest text-white/40">
              Settlement &amp; clearing runs separately — batched, T+1
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
