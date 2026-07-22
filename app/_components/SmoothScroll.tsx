"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Fluid momentum scroll (Shakti's call, 2026-07-18 — reverses PLAN §6's
// "delete lenis" decision, on purpose). Lenis wraps *real* browser scroll
// (window.scrollTo under the hood) rather than a transform-based virtual
// scroll, so it stays compatible with the native animation-timeline:
// scroll()/view() reveals and header-hide already driving this site —
// both keep firing off the same real scrollY it updates every frame.
//
// lenis.css supplies `.lenis.lenis-smooth { scroll-behavior: auto !important }`,
// which is what stops the static `scroll-smooth` class on <html> (kept as the
// no-JS/reduced-motion fallback) from fighting Lenis's own per-frame scrollTo.
//
// A 6th minimal client island — DecoderReveal is the other new one today.
// PLAN §2's "exactly 4 islands" invariant was a means to an end (hydration
// cost), not a rule for its own sake; both new islands are single-purpose
// and tiny, no route-level content is at stake.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Skip on mobile/tablet too -- Lenis re-inits on every Shell mount, adding
    // another rAF loop and setup cost right at route-switch time (2026-07-22 P0).
    if (window.matchMedia("(hover: none), (pointer: coarse), (max-width: 1024px)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -72 }, // matches globals.css's scroll-padding-top (fixed header height)
      autoRaf: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
