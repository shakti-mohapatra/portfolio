import { SkillIcon } from "./icons";
import { skillCategories } from "../_data";

export default function Skills() {
  return (
    <section id="skills" className="py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <h2 className="reveal-left text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none">Skills &amp;<br />tooling</h2>
          <p className="reveal-right hidden sm:block text-white/60 max-w-xs text-right">Four years of payments QA depth, now pointed at AI.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="reveal tile tile--static group p-6 h-full"
              style={cat.icon === "spark" ? { borderColor: "rgba(var(--accent2-rgb),0.25)", background: "rgba(var(--accent2-rgb),0.04)" } : undefined}
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${cat.icon === "spark" ? "text-[var(--accent-2)] bg-[rgba(var(--accent2-rgb),0.1)]" : "text-[var(--accent)] bg-[rgba(var(--accent-rgb),0.1)]"}`}>
                    <SkillIcon kind={cat.icon} />
                  </span>
                  <h3 className="tile-pull font-semibold text-white/90 leading-snug">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="font-mono text-xs font-medium text-white/60 border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 rounded-full group-hover:border-[var(--accent)]/30 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
