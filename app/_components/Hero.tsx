import HeroCanvas from "./HeroCanvas";
import { ArrowUpRight } from "./icons";
import { modeContent, type Mode } from "../_data";

export default function Hero({ mode }: { mode: Mode }) {
  const content = modeContent[mode];
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <HeroCanvas mode={mode} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/[0.08]" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-6 w-full pt-28 pb-20">
        <p
          className="hero-fade font-mono text-sm tracking-[0.3em] uppercase text-white/70 mb-8"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.7)", "--d": "0.5s" } as React.CSSProperties}
        >
          {content.eyebrow}
        </p>
        <h1 className="hero-kinetic text-[clamp(2.75rem,9vw,7rem)] font-bold leading-[0.95] tracking-tight">
          <span className="line-mask"><span className="hero-line block" style={{ "--d": "0.1s" } as React.CSSProperties}>{content.heroLine1}</span></span>
          <span className="line-mask"><span className="hero-line block" style={{ "--d": "0.22s" } as React.CSSProperties}>{content.heroLine2}</span></span>
          {content.heroLine3 && (
            <span className="line-mask"><span className="hero-line block accent-text" style={{ "--d": "0.34s" } as React.CSSProperties}>{content.heroLine3}</span></span>
          )}
        </h1>
        <p
          className="hero-fade max-w-xl text-lg sm:text-xl text-white/75 mt-8 leading-relaxed"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)", "--d": "0.62s" } as React.CSSProperties}
        >
          {content.heroSub}
        </p>
        <div className="hero-fade flex flex-col sm:flex-row gap-4 mt-12" style={{ "--d": "0.74s" } as React.CSSProperties}>
          <a href={content.primaryCta.href} className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors self-start">
            {content.primaryCta.label}
          </a>
          <a href={content.secondaryCta.href} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-full border border-white/25 text-white font-semibold hover:bg-white/5 transition-colors inline-flex items-center gap-2 self-start">
            {content.secondaryCta.label} <ArrowUpRight />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-fade absolute bottom-10 right-8 sm:right-12 hidden sm:block" style={{ "--d": "1.2s" } as React.CSSProperties}>
        <div className="flex flex-col items-center gap-3">
          <div className="scroll-line">
            <div className="scroll-line-fill" />
          </div>
          <span
            className="font-mono text-micro uppercase tracking-[0.3em] text-white/55"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.25em" }}
          >
            scroll
          </span>
        </div>
      </div>
    </section>
  );
}
