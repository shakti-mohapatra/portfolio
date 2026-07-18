import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { EMAIL, FIVERR_PROFILE, GITHUB, LINKEDIN, navLinks, modeContent, type Mode } from "../_data";

// Modes are routes now, so the old toggle is two links.
function ModeLinks({ mode, className }: { mode: Mode; className: string }) {
  return (
    <div className={`items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-label font-mono uppercase tracking-wide ${className}`}>
      <Link
        href="/"
        aria-current={mode === "side" ? "page" : undefined}
        className={`px-3 py-3 rounded-full transition-colors ${mode === "side" ? "bg-white text-black" : "text-white/50 hover:text-white"}`}
      >
        For Clients
      </Link>
      <Link
        href="/recruiters"
        aria-current={mode === "day" ? "page" : undefined}
        className={`px-3 py-3 rounded-full transition-colors ${mode === "day" ? "bg-white text-black" : "text-white/50 hover:text-white"}`}
      >
        For Recruiters
      </Link>
    </div>
  );
}

export default function SiteHeader({ mode }: { mode: Mode }) {
  return (
    <header data-header className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-6xl mx-auto px-6 mt-4">
        <MobileMenu
          mode={mode}
          links={navLinks[mode]}
          tagline={modeContent[mode].navTagline}
          socials={[
            { label: "Fiverr",   href: FIVERR_PROFILE,    external: true  },
            { label: "LinkedIn", href: LINKEDIN,          external: true  },
            { label: "GitHub",   href: GITHUB,            external: true  },
            { label: "Email me", href: `mailto:${EMAIL}`, external: false },
          ]}
          left={
            <a href="#hero" className="font-semibold tracking-tight text-[15px]">
              shakti<span className="text-violet-400">builds</span>
            </a>
          }
          right={
            <>
              <ModeLinks mode={mode} className="hidden sm:inline-flex" />
              <span className="hidden lg:flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-white/55">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available
              </span>
            </>
          }
        />
      </div>
    </header>
  );
}
