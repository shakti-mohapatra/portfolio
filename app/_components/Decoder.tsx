import Script from "next/script";
import { DECODER_SCRIPT, SEED_HEX, ANNOTATIONS } from "../_decoder";
import DecoderReveal from "./DecoderReveal";

// ISO-8583 / EMV TLV decoder (PLAN §3A). Recruiter route only — §1's dialect
// split: the decoder *proves* to a recruiter, the transaction-flow visualizer
// (§3B) *teaches* the client. Full domain language here.
//
// Gated behind DecoderReveal (2026-07-18) instead of shown in full by default —
// the tool stayed mounted either way, so the engine script binds and is live
// from the first render regardless of open state.
//
// No client island for the parsing itself: live re-parsing is driven by an
// inline <script> (DECODER_SCRIPT) — the same pattern §6's animation fallback
// uses. DecoderReveal is a separate, minimal client component that owns only
// the open/closed boolean.
//
// The "fields I personally test" annotations render only when non-empty — the
// text is Shakti's, left blank in _decoder.js until he provides it, never faked.
const annotated = Object.entries(ANNOTATIONS).filter(([, v]) => v);

export default function Decoder() {
  return (
    <section id="decoder" className="py-28 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="reveal text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none">Decoder</h2>
          <p className="reveal hidden sm:block text-white/45 max-w-xs text-right">ISO-8583 / EMV TLV — live, client-side, in the mono layer I read these in on the job.</p>
        </div>

        <DecoderReveal>
          <p className="text-white/55 leading-relaxed max-w-2xl mb-4">
            The hex below is a synthetic Visa contactless authorization at a fuel
            dispenser — an <span className="font-mono text-white/75">0100</span> request
            carrying its EMV chip data in DE55. Edit it, or paste your own.
          </p>
          <p className="text-white/40 text-sm leading-relaxed max-w-2xl mb-8">
            Every value is fabricated test data — test PAN, no real card, no real
            merchant. This one hides a deliberate defect: the amount and currency in
            the ISO fields disagree with the amount and currency the chip actually
            signed. The decoder flags it the way a certification run does.
          </p>

          <div className="grid lg:grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08] rounded-2xl overflow-hidden">
            <div className="bg-[var(--surface)] p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="decoder-input" className="font-mono text-[var(--text-label)] uppercase tracking-widest text-white/50">
                  Input · hex
                </label>
                <button
                  type="button"
                  id="decoder-reset"
                  className="font-mono text-[var(--text-micro)] uppercase tracking-widest text-white/40 hover:text-[var(--accent)] transition-colors"
                >
                  Reset seed
                </button>
              </div>
              <textarea
                id="decoder-input"
                spellCheck={false}
                autoComplete="off"
                defaultValue={SEED_HEX}
                aria-label="ISO-8583 or EMV TLV hex input"
                className="flex-1 min-h-[220px] w-full resize-y bg-transparent font-mono text-xs leading-relaxed text-white/80 outline-none break-all placeholder:text-white/30"
              />
            </div>
            <div className="bg-[var(--surface)] p-5">
              <div className="font-mono text-[var(--text-label)] uppercase tracking-widest text-white/50 mb-3">
                Decoded
              </div>
              <div id="decoder-output" className="dec-output font-mono text-xs">
                <div className="dec-empty">Enable JavaScript to decode. The message above is the seed.</div>
              </div>
            </div>
          </div>

          {annotated.length > 0 && (
            <div className="mt-8 rounded-2xl border border-white/[0.08] overflow-hidden">
              <div className="font-mono text-[var(--text-label)] uppercase tracking-widest text-white/50 px-5 pt-5">
                Fields I personally test
              </div>
              <dl className="p-5 pt-3 space-y-3">
                {annotated.map(([key, text]) => (
                  <div key={key} className="flex flex-col sm:flex-row gap-1 sm:gap-4 border-t border-white/[0.08] pt-3 first:border-t-0 first:pt-0">
                    <dt className="font-mono text-[var(--text-label)] uppercase tracking-wide text-[var(--accent)] sm:w-40 shrink-0">
                      {key}
                    </dt>
                    <dd className="text-sm text-white/60 leading-relaxed">{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </DecoderReveal>
      </div>

      {/* Inline engine via next/script — required because React 19 will not
          execute a raw <script> rendered inside a nested component. Not a client
          island: next/script lives in node_modules. afterInteractive runs it once
          post-hydration, when #decoder-input exists; it parses the seed and
          re-parses on edit — the panel being visually collapsed doesn't stop it
          from being mounted, so it's ready the instant DecoderReveal opens. */}
      <Script id="decoder-engine" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: DECODER_SCRIPT }} />
    </section>
  );
}
