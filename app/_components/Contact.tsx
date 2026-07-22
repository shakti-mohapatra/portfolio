import Image from "next/image";
import ContactForm from "./ContactForm";
import { ArrowUpRight, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "./icons";
import { EMAIL, GITHUB, LINKEDIN, PHONE_DISPLAY, PHONE_TEL, RESUME_EMAIL, modeContent, services, type Mode } from "../_data";

// Redesign (2026-07, Reference_Images/Contact_me_reference_photo.png): the
// centered banner header moved inside the form card (left-aligned), and the
// info card gained a bigger centered avatar + tag row. Mode-specific content
// (side's direct channels vs day's promise rows) is unchanged, just reskinned
// into the same icon-square-plus-text row shape both already used.
export default function Contact({ mode }: { mode: Mode }) {
  const content = modeContent[mode];
  return (
    <section id="contact" className="py-32 border-t border-white/[0.08] relative overflow-clip">
      <div className="absolute inset-0" aria-hidden style={{ background: "radial-gradient(60% 80% at 50% 120%, rgba(var(--accent-rgb),0.3), transparent 70%)" }} />
      <div className="max-w-6xl mx-auto px-6 relative">

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 max-w-5xl mx-auto items-start">

          {/* Form card. Was forced to h-full/stretch to match the taller info
              card — rejected as a non-fix (a bigger empty box is still an
              empty box). Real fix: natural height (items-start above) plus
              an actual footer with real content, same "form + reassurance
              strip" pattern Stripe/Linear/Vercel contact forms use, so the
              card earns whatever height it ends up at. Socials moved out to
              a shared strip below both cards (further down) to shorten the
              info card from the other side instead of inflating this one. */}
          <div className="reveal-left tile tile--static p-8 sm:p-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span className="font-mono text-[var(--text-label)] uppercase tracking-[0.2em] text-[var(--accent)]">Get in touch</span>
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-[1.05] mb-4">
              {content.contactHeading1} <span className="text-[var(--accent)] underline decoration-1 underline-offset-8">{content.contactHeading2}</span>
            </h2>
            <p className="text-white/50 max-w-md mb-8">{content.contactSub}</p>
            <ContactForm
              messagePlaceholder={content.contactMessagePlaceholder}
              projectTypes={mode === "side" ? services.map((s) => s.title) : undefined}
            />
            <div className="flex items-center gap-2.5 mt-6 pt-5 border-t border-white/[0.08]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <p className="text-white/60 text-sm">
                {mode === "day" ? "Open to new opportunities right now." : "Open to new projects right now."}
              </p>
            </div>
          </div>

          {/* Info card — plain box, not .tile: it wraps tile--interactive
              channel rows below, and :hover bubbles to ancestors, so making
              this a tile too double-fired hover (parent scale + own glow) on
              top of the child's, growing the border past the tag row above. */}
          <div className="reveal-right relative rounded-2xl border border-white/[0.08] bg-[var(--panel)] overflow-hidden p-7 flex flex-col gap-6">

            {/* Avatar + name + tags */}
            <div className="flex flex-col items-center text-center gap-3">
              <div className="relative w-24 h-24">
                <div className="relative w-full h-full rounded-full overflow-hidden border border-violet-400/30 ring-2 ring-violet-400/10">
                  <Image src="/profile-photo.jpg" alt="Shakti M." fill className="object-cover object-top" sizes="96px" />
                </div>
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-[var(--panel)]" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-white text-base leading-tight">Shakti M.</p>
                <p className="font-mono text-[var(--accent)] text-xs mt-1">{content.contactRole}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {content.contactTags.map((tag) => (
                  <span key={tag} className="font-mono text-[10px] uppercase tracking-wide text-white/60 border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/[0.08]" />

            {mode === "day" ? (
              <>
                {/* Direct contact channels — LinkedIn / Email / Phone.
                    Icon-over-label, centered — was icon-left/text-left/arrow-right,
                    which left a wide dead gap between short text and the arrow.
                    Arrow moved to a corner badge instead of pushed right by flex-1.
                    Centering forced via inline `style`, not the `flex flex-col
                    items-center` utility classes: globals.css's `.tile` sets
                    `display:block` in unlayered CSS, which beats Tailwind's own
                    (layered) `.flex` utility regardless of source order — a
                    documented trap in this repo (see PROGRESS.md's "cascade
                    layers" note). Confirmed live via getComputedStyle before
                    fixing: className had `flex flex-col items-center`, computed
                    display was still `block`. Inline style is the only thing
                    short of `!important` that outranks it. */}
                <div className="flex flex-col gap-3">
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
                    className="tile tile--interactive group relative gap-2 px-4 py-5"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <span className="w-9 h-9 rounded-lg bg-sky-500/15 text-sky-300 flex items-center justify-center">
                      <LinkedInIcon className="w-4 h-4" />
                    </span>
                    <span className="tile-pull">
                      <p className="text-white/80 text-sm font-medium">LinkedIn</p>
                      <p className="text-white/55 text-label mt-1">Message me directly</p>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-sky-300 transition-colors absolute top-3 right-3" />
                  </a>
                  <a href={`mailto:${RESUME_EMAIL}`}
                    className="tile tile--interactive group relative gap-2 px-4 py-5"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <span className="w-9 h-9 rounded-lg bg-violet-500/15 text-violet-300 flex items-center justify-center">
                      <MailIcon className="w-4 h-4" />
                    </span>
                    <span className="tile-pull">
                      <p className="text-white/80 text-sm font-medium">Email</p>
                      <p className="text-white/55 text-label mt-1 truncate max-w-[220px]">{RESUME_EMAIL}</p>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-violet-300 transition-colors absolute top-3 right-3" />
                  </a>
                  <a href={`tel:${PHONE_TEL}`}
                    className="tile tile--interactive group relative gap-2 px-4 py-5"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <span className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center">
                      <PhoneIcon className="w-4 h-4" />
                    </span>
                    <span className="tile-pull">
                      <p className="text-white/80 text-sm font-medium">Phone</p>
                      <p className="text-white/55 text-label mt-1">{PHONE_DISPLAY}</p>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-emerald-300 transition-colors absolute top-3 right-3" />
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
                {/* Promise rows */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.04]">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-violet-400" aria-hidden>
                        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM7.5 4.5a.5.5 0 0 1 1 0v3.793l2.146 2.147a.5.5 0 0 1-.707.707l-2.293-2.293A.5.5 0 0 1 7.5 8.5V4.5Z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/80 text-xs font-medium">Replies within 24 hrs</p>
                      <p className="text-white/55 text-label mt-1">Usually same day</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.04]">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-emerald-400" aria-hidden>
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022Z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/80 text-xs font-medium">{content.contactTile2.title}</p>
                      <p className="text-white/55 text-label mt-1">{content.contactTile2.sub}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.04]">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-sky-400" aria-hidden>
                        <path d="M5 1.5a.5.5 0 0 0-1 0V2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-1v-.5a.5.5 0 0 0-1 0V2H5V1.5ZM3 6h10v7H3V6Z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/80 text-xs font-medium">{content.contactBadge}</p>
                      <p className="text-white/55 text-label mt-1">Ready when you are</p>
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

          </div>

        </div>

        {/* Socials — was inside the info card; moved to a shared strip below
            both cards so it stops padding out the info card's height against
            the form card next to it (see the grid/footer comment above). */}
        <div className="flex items-center justify-center gap-6 max-w-5xl mx-auto mt-8 pt-6 border-t border-white/[0.08]">
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/55 hover:text-white transition-colors">
            <LinkedInIcon /> LinkedIn
          </a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/55 hover:text-white transition-colors">
            <GitHubIcon /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
