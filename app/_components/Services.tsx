import { ArrowUpRight, ServiceIcon } from "./icons";
import { EMAIL, SERVICE_FROM_ACCENT, SERVICE_ICON_ACCENT, services, type ServiceData } from "../_data";

function BentoServiceCard({ s, featured = false }: { s: ServiceData; featured?: boolean }) {
  const iconAccent = SERVICE_ICON_ACCENT[s.n] ?? "text-violet-300 bg-violet-400/10";
  const fromAccent = SERVICE_FROM_ACCENT[s.n]  ?? "text-violet-300";
  return (
    <a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`tile tile--interactive group p-6 sm:p-7 h-full ${featured ? "min-h-[200px]" : "min-h-[170px]"}`}
    >
      <div>
        <div className="flex items-start justify-between mb-5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconAccent}`}>
            <ServiceIcon n={s.n} />
          </div>
          <span className="font-mono text-xs text-white/45">{s.n}</span>
        </div>
        <h3 className={`font-bold tracking-tight text-white/90 group-hover:text-white transition-colors mb-2 ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {s.title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.08]">
        <span className={`text-sm font-semibold ${fromAccent}`}>{s.from}</span>
        <span className={`${fromAccent} group-hover:rotate-45 transition-transform duration-300`}>
          <ArrowUpRight className="w-5 h-5" />
        </span>
      </div>
    </a>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <h2 className="reveal-left text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none mb-5">What I can build</h2>
          <p className="reveal-right text-white/55 text-lg">Starting prices — message me for an exact quote. Click any card to open it on Fiverr.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="reveal sm:col-span-2 lg:col-span-2">
            <BentoServiceCard s={services[0]} featured />
          </div>
          {services.slice(1).map((s) => (
            <div key={s.n} className="reveal">
              <BentoServiceCard s={s} />
            </div>
          ))}
        </div>
        <div className="reveal mt-10">
          <p className="text-white/50">Something else in mind? <a href={`mailto:${EMAIL}`} className="text-[var(--accent)] hover:text-white underline underline-offset-4">Email me</a> — if you can describe it in plain English, I can probably build it.</p>
        </div>
      </div>
    </section>
  );
}
