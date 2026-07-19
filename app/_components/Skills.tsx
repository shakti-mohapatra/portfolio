import { SkillIcon } from "./icons";
import { skillCategories } from "../_data";

// Card redesign (2026-07, Reference_Images/skill_$_tooling_section_reference.png):
// icon block + numeral header, divider, dot-bulleted tag pills. Same data,
// same accent-2 "Now Learning" highlight as before, just restyled.
export default function Skills() {
  return (
    <section id="skills" className="py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span className="font-mono text-[var(--text-label)] uppercase tracking-[0.2em] text-[var(--accent)]">Expertise</span>
        </div>
        <div className="flex items-end justify-between mb-16">
          <h2 className="reveal-left text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none">Skills &amp;<br />tooling</h2>
          <p className="reveal-right hidden sm:block text-white/60 max-w-xs text-right">Four years of payments QA depth, now pointed at AI.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              className="reveal tile tile--static group p-6 h-full"
              style={cat.icon === "spark" ? { borderColor: "rgba(var(--accent2-rgb),0.25)", background: "rgba(var(--accent2-rgb),0.04)" } : undefined}
            >
              <div className="tile-pull flex items-start justify-between mb-5">
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${cat.icon === "spark" ? "text-[var(--accent-2)] bg-[rgba(var(--accent2-rgb),0.1)]" : "text-[var(--accent)] bg-[rgba(var(--accent-rgb),0.1)]"}`}>
                  <SkillIcon kind={cat.icon} />
                </span>
                <span className="font-mono text-xs text-white/20">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="tile-pull font-semibold text-white/90 leading-snug mb-3">{cat.title}</h3>
              <div className={`w-8 h-px mb-5 ${cat.icon === "spark" ? "bg-[var(--accent-2)]" : "bg-[var(--accent)]"}`} />
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-white/60 border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 rounded-full group-hover:border-[var(--accent)]/30 transition-colors">
                    <span className={`w-1 h-1 rounded-full shrink-0 ${cat.icon === "spark" ? "bg-[var(--accent-2)]" : "bg-[var(--accent)]"}`} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
