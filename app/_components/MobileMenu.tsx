"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "./icons";

// Owns the nav pill's open/closed state. `left`/`right` are server-rendered nodes passed
// straight through, and the sheet stays a sibling of the pill in normal flow — the pill's
// backdrop-filter would otherwise become the containing block and shift the sheet.
// Data arrives as props rather than an import: _data.ts must never reach the client bundle.
type SheetLink = { href: string; label: string; external?: boolean };

export default function MobileMenu({
  links,
  socials,
  tagline,
  mode,
  left,
  right,
}: {
  links: SheetLink[];
  socials: SheetLink[];
  tagline: string;
  mode: "side" | "day";
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Click-outside backdrop */}
      {open && <div className="fixed inset-0 z-[39]" onClick={() => setOpen(false)} aria-hidden />}

      {/* Nav pill — relative z-40: backdrop-blur alone promotes this into its own
          stacking context, which the CSS painting-order spec then paints ABOVE
          plain static siblings regardless of DOM order. Without an explicit
          z-index here, the z-[39] click-outside backdrop below silently won
          that fight and intercepted every tap on the pill and the sheet. */}
      <div className="relative z-40 flex items-center justify-between h-14 px-5 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl">
        {left}
        <div className="flex items-center gap-4">
          {right}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2.5 py-3 text-sm font-medium text-white hover:text-white transition-colors"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="flex flex-col gap-1">
              <span className={`block h-px w-5 bg-white transition-transform origin-center ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-white transition-transform origin-center ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </span>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Drop-sheet menu — stays mounted; grid-rows transition drives open/close so
          it works without JS measuring height (see .collapse-wrap in globals.css) */}
      <div className="relative z-40 collapse-wrap mt-2" data-open={open || undefined}>
        <div
          className="collapse-inner rounded-2xl border border-white/10 overflow-hidden"
          inert={!open}
          aria-hidden={!open}
          style={{ background: "rgba(6, 6, 8, 0.92)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)" }}
        >
          {/* Top accent line — draws in from center on open (redesign 2026-07 §4.2) */}
          <div
            className="h-0.5 mx-auto transition-[width] duration-500 ease-out"
            style={{ width: open ? "100%" : "0%", background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
            aria-hidden
          />

          <div className="grid grid-cols-1 sm:grid-cols-[1.3fr_1fr]">
            {/* Left: large numbered nav links */}
            <nav className="p-7">
              {links.map((l, idx) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-4 py-3.5 px-3 -mx-3 rounded-lg border-b border-white/[0.08] last:border-0 hover:bg-[rgba(var(--accent-rgb),0.06)] transition-colors"
                >
                  <span className="text-micro font-mono text-[var(--accent)]/50 w-5 shrink-0 select-none">0{idx + 1}</span>
                  <span className="text-3xl sm:text-[2.6rem] font-bold tracking-tight text-white/60 group-hover:text-white transition-colors duration-200">
                    <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-300">{l.label}</span>
                  </span>
                  <span className="ml-auto text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </a>
              ))}
            </nav>

            {/* Right: availability + socials */}
            <div className="border-t sm:border-t-0 sm:border-l border-white/[0.08] p-7 flex flex-col justify-between gap-8">
              <div className="space-y-4">
                <div className="items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-0.5 font-mono text-label font-medium flex sm:hidden">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    aria-current={mode === "side" ? "page" : undefined}
                    className={`px-3 py-3 rounded-full transition-colors ${mode === "side" ? "bg-white text-black" : "text-white/70 hover:text-white"}`}
                  >
                    For Clients
                  </Link>
                  <Link
                    href="/recruiters"
                    onClick={() => setOpen(false)}
                    aria-current={mode === "day" ? "page" : undefined}
                    className={`px-3 py-3 rounded-full transition-colors ${mode === "day" ? "bg-white text-black" : "text-white/70 hover:text-white"}`}
                  >
                    For Recruiters
                  </Link>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.28em] text-emerald-400/80">Available</span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{tagline}</p>
              </div>

              <div>
                <p className="font-mono text-micro uppercase tracking-[0.28em] text-white/45 mb-3">Links</p>
                {socials.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between py-2.5 border-b border-white/[0.08] last:border-0 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
