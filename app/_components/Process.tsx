import { steps } from "../_data";

export default function Process() {
  return (
    <section className="py-28 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none mb-16">How I work</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.n} className="reveal flex flex-col gap-5">
              <span className="font-mono text-6xl font-bold text-[var(--accent)] leading-none select-none">{step.n}</span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-white/55 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
