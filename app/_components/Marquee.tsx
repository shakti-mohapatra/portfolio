import { modeContent, type Mode } from "../_data";

export default function Marquee({ mode }: { mode: Mode }) {
  return (
    <section className="marquee border-y border-white/[0.08] py-6 bg-surface" aria-hidden>
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center">
            {modeContent[mode].marquee.map((w) => (
              <span key={dup + w} className="flex items-center text-2xl sm:text-3xl font-semibold text-white/25 mx-8">
                {w}<span className="mx-8 text-[var(--accent)]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
