import { howIWork } from "../_data";

// Replaces the old fabricated testimonials slot — no client has signed yet,
// so no names, no stars, nothing invented (PLAN §7).
export default function HowIWork() {
  return (
    <section className="py-28 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none mb-16">How I actually work</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {howIWork.map((item) => (
            <div key={item.title} className="reveal tile tile--static flex flex-col gap-3 p-6 h-full">
              <h3 className="font-semibold text-white/90">{item.title}</h3>
              <p className="text-white/55 leading-relaxed text-sm">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
