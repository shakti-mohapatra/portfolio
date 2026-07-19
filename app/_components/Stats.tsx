import CountUp from "./CountUp";
import { modeContent, type Mode } from "../_data";

export default function Stats({ mode }: { mode: Mode }) {
  return (
    <section className="border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-10 md:gap-x-14">
        {modeContent[mode].stats.map((s) => (
          <div key={s.label} className="reveal text-center md:text-left">
            <div className="text-4xl sm:text-5xl font-bold tracking-tight">
              {"to" in s ? <CountUp to={s.to} suffix={s.suffix} /> : s.display}
            </div>
            <div className="font-mono text-xs uppercase tracking-wide text-white/55 mt-2 -ml-[1px]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
