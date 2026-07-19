"use client";

import { useEffect, useState } from "react";

// item 2 (2026-07): the one client island this page needs — sticky rail with
// scroll-spy highlighting, per REDESIGN-PLAN-2026-07 §9.3. Everything else on
// this page is pure CSS/server.
export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function CaseStudySpy({ headings }: { headings: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ids = headings.map(slugify);
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = ids.indexOf(entry.target.id);
          if (idx !== -1) setActive(idx);
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  return (
    <nav aria-label="Sections in this report" className="hidden lg:block sticky top-24 self-start">
      <ul className="space-y-1 border-l border-white/[0.08]">
        {headings.map((h, i) => (
          <li key={h}>
            <a
              href={`#${slugify(h)}`}
              aria-current={active === i ? "location" : undefined}
              className={`block pl-4 py-1.5 -ml-px border-l font-mono text-[var(--text-micro)] uppercase tracking-wide leading-snug transition-colors duration-300 ${
                active === i
                  ? "border-[var(--accent)] text-white"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {h}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
