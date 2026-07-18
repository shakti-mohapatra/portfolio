import SiteHeader from "./SiteHeader";
import Footer from "./Footer";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Stats from "./Stats";
import About from "./About";
import Contact from "./Contact";
import PersonJsonLd from "./PersonJsonLd";
import SmoothScroll from "./SmoothScroll";
import type { Mode } from "../_data";

// Chrome shared by both routes. `children` are the mode-specific sections, which sit
// between the stats band and About.
export default function Shell({ mode, children }: { mode: Mode; children: React.ReactNode }) {
  return (
    <div className="site relative min-h-screen overflow-x-clip">
      <SmoothScroll />
      <div className="grain" aria-hidden />
      <PersonJsonLd mode={mode} />
      <SiteHeader mode={mode} />

      <main className="relative z-[1]">
        {/* Scrolling ambient orbs — position: absolute inside relative main,
            so they travel with page content (no viewport-scroll disconnect) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute rounded-full" style={{ top: "22%", left: "-18%", width: "55vw", height: "55vw", background: "radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 70%)", filter: "blur(120px)" }} />
          <div className="absolute rounded-full" style={{ top: "54%", right: "-18%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(232,121,249,0.08) 0%, transparent 70%)", filter: "blur(120px)" }} />
          <div className="absolute rounded-full" style={{ top: "80%", left: "12%", width: "48vw", height: "48vw", background: "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)", filter: "blur(120px)" }} />
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
  );
}
