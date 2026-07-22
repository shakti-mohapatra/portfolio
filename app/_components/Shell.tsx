import SiteHeader from "./SiteHeader";
import Footer from "./Footer";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Stats from "./Stats";
import About from "./About";
import Contact from "./Contact";
import PersonJsonLd from "./PersonJsonLd";
import SmoothScroll from "./SmoothScroll";
import RouteTransitionWrapper from "./RouteTransitionWrapper";
import type { Mode } from "../_data";

// Chrome shared by both routes. `children` are the mode-specific sections, which sit
// between the stats band and About.
export default function Shell({ mode, children }: { mode: Mode; children: React.ReactNode }) {
  return (
    // Item 5 (2026-07): named ViewTransition around the whole route content so
    // switching / <-> /recruiters crossfades instead of hard-cutting -- React
    // finds the old and new ".site" by this shared name and blends between them
    // (needs experimental.viewTransition in next.config.ts). SiteHeader keeps
    // its own name so it never takes part in the fade (see globals.css).
    // RouteTransitionWrapper (client) decides whether to apply it at all --
    // skipped on mobile/tablet, see that file for why (2026-07-22 P0).
    <RouteTransitionWrapper>
    <div className="site relative min-h-screen overflow-x-clip" data-mode={mode}>
      <SmoothScroll />
      <div className="grain" aria-hidden />
      <PersonJsonLd mode={mode} />
      <SiteHeader mode={mode} />

      <main className="relative z-[1]">
        {/* Scrolling ambient orbs -- position: absolute inside relative main,
            so they travel with page content (no viewport-scroll disconnect).
            Classes (not inline styles) so the mobile/tablet media query in
            globals.css can cut their blur radius -- part of the same P0 fix. */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="ambient-orb ambient-orb-a absolute rounded-full" />
          <div className="ambient-orb ambient-orb-b absolute rounded-full" />
          <div className="ambient-orb ambient-orb-c absolute rounded-full" />
        </div>
        <Hero mode={mode} />
        <Marquee mode={mode} />
        <Stats mode={mode} />
        {children}
        <About mode={mode} />
        <Contact mode={mode} />
      </main>

      <Footer />
    </div>
    </RouteTransitionWrapper>
  );
}
