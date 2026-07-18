"use client";

import { useState } from "react";

// Gates the decoder behind an explicit trigger instead of dumping the full
// tool on the page by default (Shakti's call, 2026-07-18). Reuses the
// mobile-menu's proven grid-rows collapse mechanism (.collapse-wrap in
// globals.css) — same pattern, different trigger. The engine script
// (DECODER_SCRIPT, rendered by the server-side children) binds to the input
// regardless of open state since the panel stays mounted, just visually
// collapsed — so it's already live the instant this opens.
export default function DecoderReveal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="reveal group w-full text-left rounded-2xl border border-white/[0.08] bg-[var(--panel)] p-8 sm:p-10 hover:border-[var(--accent)]/30 transition-colors"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-mono text-[var(--text-label)] uppercase tracking-widest text-white/55">
            <span className="relative flex h-2 w-2 shrink-0">
              {open && <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${open ? "bg-emerald-400" : "bg-white/25"}`} />
            </span>
            Decoder · {open ? "Live" : "Standby"}
          </div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wide text-[var(--accent)] group-hover:text-white transition-colors inline-flex items-center gap-2 shrink-0">
            {open ? "Power off" : "Initialize decoder"}
            <span className={`inline-block transition-transform duration-300 ${open ? "rotate-90" : ""}`}>▶</span>
          </span>
        </div>
        <p className="mt-4 text-white/55 leading-relaxed max-w-2xl">
          A live ISO-8583 / EMV TLV parser, client-side — paste a payment message, read it back in the
          mono layer I read these in on the job. Seeded with a synthetic transaction hiding a
          deliberate defect.
        </p>
      </button>

      <div className="collapse-wrap mt-4" data-open={open || undefined}>
        <div className="collapse-inner" inert={!open} aria-hidden={!open}>
          <div className={`decoder-boot relative rounded-2xl ${open ? "decoder-boot-on" : ""}`}>
            <div className="pt-2">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
