import { guarantees } from "../_data";

export default function Guarantees() {
  return (
    <section className="py-28 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none mb-16">What you can count on</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {guarantees.map((g) => (
            <div key={g.title} className="reveal tile tile--static flex flex-col gap-3 p-6 h-full">
              <span className="w-9 h-9 rounded-lg bg-emerald-400/10 text-emerald-300 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-5 h-5"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <h3 className="font-semibold">{g.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
