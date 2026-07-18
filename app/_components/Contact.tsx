import Image from "next/image";
import ContactForm from "./ContactForm";
import { ArrowUpRight, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "./icons";
import { EMAIL, GITHUB, LINKEDIN, PHONE_DISPLAY, PHONE_TEL, RESUME_EMAIL, modeContent, type Mode } from "../_data";

export default function Contact({ mode }: { mode: Mode }) {
  const content = modeContent[mode];
  return (
    <section id="contact" className="py-32 border-t border-white/[0.08] relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden style={{ background: "radial-gradient(60% 80% at 50% 120%, rgba(139,92,246,0.3), transparent 70%)" }} />
      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-300 font-mono text-xs font-medium tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {content.contactBadge}
            </span>
          </div>
          <h2 className="reveal text-[clamp(2.5rem,8vw,6rem)] font-bold tracking-tight leading-[1.02]">
            {content.contactHeading1} <span className="text-[var(--accent)] underline decoration-1 underline-offset-8">{content.contactHeading2}</span>
          </h2>
          <p className="reveal text-white/50 text-lg max-w-md mx-auto mt-4">
            {content.contactSub}
          </p>
        </div>

        {/* Two-column: form card + info card */}
        <div className="grid lg:grid-cols-[1fr_268px] gap-5 max-w-4xl mx-auto">

          {/* Form card */}
          <div className="reveal p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
            <ContactForm messagePlaceholder={content.contactMessagePlaceholder} />
          </div>

          {/* Info card */}
          <div className="reveal p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] flex flex-col gap-5 h-full">

            {/* Avatar + name */}
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 flex-shrink-0 rounded-full overflow-hidden border border-violet-400/30 ring-2 ring-violet-400/10">
                <Image src="/profile-photo.jpg" alt="Shakti M." fill className="object-cover object-top" sizes="44px" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm leading-tight">Shakti M.</p>
                <p className="font-mono text-white/40 text-xs mt-0.5">{content.contactRole}</p>
              </div>
            </div>

            {mode === "day" ? (
              <>
                {/* Direct contact channels — LinkedIn / Email / Phone */}
                <div className="flex flex-col gap-2">
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-3 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors">
                    <span className="w-7 h-7 rounded-lg bg-sky-500/15 text-sky-300 flex items-center justify-center flex-shrink-0">
                      <LinkedInIcon className="w-3.5 h-3.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <p className="text-white/80 text-xs font-medium">LinkedIn</p>
                      <p className="text-white/35 text-label mt-0.5 truncate">Message me directly</p>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-sky-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </a>
                  <a href={`mailto:${RESUME_EMAIL}`}
                    className="group flex items-center gap-3 px-3 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors">
                    <span className="w-7 h-7 rounded-lg bg-violet-500/15 text-violet-300 flex items-center justify-center flex-shrink-0">
                      <MailIcon className="w-3.5 h-3.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <p className="text-white/80 text-xs font-medium">Email</p>
                      <p className="text-white/35 text-label mt-0.5 truncate">{RESUME_EMAIL}</p>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-violet-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </a>
                  <a href={`tel:${PHONE_TEL}`}
                    className="group flex items-center gap-3 px-3 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors">
                    <span className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="w-3.5 h-3.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <p className="text-white/80 text-xs font-medium">Phone</p>
                      <p className="text-white/35 text-label mt-0.5 truncate">{PHONE_DISPLAY}</p>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </a>
                </div>

                <div className="flex-1" />

                {content.resumeCta && (
                  <a href={content.resumeCta.href} download
                    className="flex items-center justify-center w-full px-4 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors">
                    {content.resumeCta.label}
                  </a>
                )}
              </>
            ) : (
              <>
                {/* Promise tiles */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04]">
                    <div className="w-7 h-7 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-violet-400" aria-hidden>
                        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM7.5 4.5a.5.5 0 0 1 1 0v3.793l2.146 2.147a.5.5 0 0 1-.707.707l-2.293-2.293A.5.5 0 0 1 7.5 8.5V4.5Z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/80 text-xs font-medium">Replies within 24 hrs</p>
                      <p className="text-white/35 text-label mt-0.5">Usually same day</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04]">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-emerald-400" aria-hidden>
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022Z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/80 text-xs font-medium">{content.contactTile2.title}</p>
                      <p className="text-white/35 text-label mt-0.5">{content.contactTile2.sub}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1" />

                {/* CTAs */}
                <div className="flex flex-col gap-2">
                  <a href={content.contactPrimaryCta.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors">
                    {content.contactPrimaryCta.label}
                  </a>
                  <a href={`mailto:${EMAIL}`}
                    className="flex items-center justify-center w-full px-4 py-2.5 rounded-full border border-white/15 text-white/60 text-xs font-medium hover:bg-white/5 hover:text-white/90 transition-colors truncate">
                    {EMAIL}
                  </a>
                </div>
              </>
            )}

            {/* Socials */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/[0.08]">
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white transition-colors">
                <LinkedInIcon /> LinkedIn
              </a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white transition-colors">
                <GitHubIcon /> GitHub
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
