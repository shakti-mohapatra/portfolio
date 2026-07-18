# Portfolio Transformation — approved plan & execution tracker

**Approved by Shakti 2026-07-17.** Planned with Opus. Steps 1, 3-9 are **Sonnet-high**; steps 2, 10, 11 are **Opus** (marked).

This file is the source of truth for a fresh session. Read it top to bottom, then start at the first unchecked step in §11. Do not re-plan; the decisions below are settled.

---

## Kickoff prompt for a new session

> Read `E:\portfolio\docs\PLAN.md` and `E:\portfolio\docs\PROGRESS.md` for current state. Execute the next unchecked step in §11, in order. Verify per §10 before marking it done, and append a PROGRESS.md entry. Do not skip ahead, do not deploy.

### Non-negotiables

- **This is NOT the Next.js you know** — see `AGENTS.md`. Read the relevant guide in `node_modules/next/dist/docs/` before using an unfamiliar API. Next 16.2.9, React 19.2.4, Tailwind v4 (CSS-configured; there is no `tailwind.config.js` and adding one is wrong).
- **Never deploy.** Push to `main` auto-deploys to production. Committing and pushing are Shakti's explicit, separate calls. "Build is green" ≠ "ship it."
- **Never submit the contact form for real** — it emails Shakti. UI-state checks only.
- **Never invent content.** No fake testimonials, no invented metrics, no fabricated client names. Removing the existing fake ones is half the point of this work.
- **Ask before spending API quota** and before starting another project's dev server.
- **Verify, don't assume.** Step 2 compiles green while silently failing — §10 #3 exists for exactly that reason.

---

## Context

`E:\portfolio` is the live site (`portfolio-xi-lilac-71.vercel.app`). Almost everything is one 1632-line `"use client"` component, `app/page.tsx`, serving two audiences via a mode toggle: **For Clients** (Fiverr) and **For Recruiters** (the AI/Automation job search).

It works. It doesn't stand out, it carries two credibility problems, and recruiter mode has no evidence in it.

**Rating today: 5.5/10. Target: 10.** This plan lands ~9; §9 names what's left.

**Decisions taken:** work in `E:\portfolio` · delete Antigravity leftovers · testimonials are not real → honest replacement · 5 projects, visible to both audiences · real screenshots for 4 of 5 · **neubrutalism dropped entirely** · Instrument concept approved · architecture split and the decoder are **isolated Opus tasks** · custom domain deferred until the build is final.

**Two findings drove this plan:**
- **Recruiter mode shows zero projects** (`#work` gated to `mode === "side"`, page.tsx:1295). The AI-transition thesis rests on *"trust me, I'm enrolled in a course"* while five shipped AI codebases sit invisible. Biggest career bug on the site.
- **Fabricated testimonials** (page.tsx:1373-1391). Highest-severity trust item.

---

## 1. The concept: **Instrument**

Neubrutalism is dropped. Research puts 2026 at: **typography as architecture**, monospace metadata, near-black OLED-first, zero blur/glass, 0px geometry, hairline structure, one acid accent, and **Machine Experience** — semantic HTML because AI agents read sites on behalf of humans. That last one is not decoration here: recruiters screen with AI.

> **Instrument** — the site reads like diagnostic equipment. A payment terminal's readout. Precision, not decoration.

Every rule is niche-derived, not borrowed:

- **Surface** `#000000`. OLED-cheap, maximum contrast for the accent.
- **Structure** 1px hairlines at `rgba(255,255,255,0.08)`, deliberately visible. Structure you can *see* reads as engineering. Depth comes from elements overlapping the rules and z-index — never blur.
- **Type as architecture** — headlines `clamp()` to ~11vw, tight tracking, edge-to-edge. Geist Sans is already variable, already installed. Zero new dependencies.
- **The mono layer** — Geist Mono (already installed) carries *every* piece of metadata: project indices, dates, stats, tags, section numbers, field labels. Highest-leverage move on the page. Shakti works in terminals, hex dumps, ISO-8583 fields, EMV TLV tags. Monospace is his domain in its native typeface.
- **One acid accent.** Violet stays (brand continuity; the shader already speaks it) but stops being a gradient wash — it becomes a hairline, a 1px underline, a single glyph. It does structural work.
- ~~**Deleted:** film grain, all `backdrop-blur`, all `rounded-full`/`rounded-2xl`, ambient orbs, the About-photo glow, every gradient fill. Accent gradient text survives on the hero only.~~
  **AMENDED 2026-07-18 — REVERSED.** Shakti reviewed the built result in real Chrome (not the sandboxed preview) and rejected the flat/square/no-blur treatment outright — it read as a regression from the deployed glass-pill nav, not an upgrade. Film grain, ambient orbs, `backdrop-blur`, and `rounded-full`/`rounded-2xl`/`rounded-xl` are **back** on the nav pill, mode-toggle, mobile drop-sheet, every card component (bento/guarantees/how-I-work/services/skills/work/contact/experience/case-study/transaction-flow/decoder outer panels), CTA buttons, and tag/badge pills. **Do not re-delete these in a future step or re-read this bullet as settled** — the rest of §1 (surface `#000000`, hairlines, mono layer, one acid accent, zero new deps) still holds; only the flat-geometry/no-blur clause is reversed. See `docs/PROGRESS.md`'s 2026-07-18 "floating surfaces" entry for the exact file-by-file diff.
- **Hero shader: keep.** The one non-generic thing on the site; has a fallback and an IntersectionObserver; free off-screen. Flatten its bottom fade into a hard 1px rule so it terminates against the grid instead of dissolving.

### Two dialects, one language

The risk of Instrument isn't the aesthetic — it's jargon. Precision reads as *trustworthy* to a buyer. Being made to feel stupid is what loses them.

| | `/` — client | `/recruiters` |
|---|---|---|
| Grid, black, mono, hairlines | Identical | Identical |
| Density | Airier. Bigger type, more whitespace, fewer numbers per screen | Dense. Data-rich |
| Vocabulary | **Zero jargon.** No EMV, no ISO-8583, no L3 | Full domain language |
| The moat | *"I test payment systems where a bug costs real money"* | *"L3 certification across five card schemes"* |
| Signature piece | **Transaction-flow visualizer** (§3B) — teaches | **Decoder** (§3A) — proves |

Testable: §10 verification #11.

---

## 2. Architecture — kill `"use client"` · **OPUS, ISOLATED TASK**

Root cause: `mode` is React state, so the toggle forces the entire 1632-line page — every section, both modes' copy, the WebGL shader — to ship as client JS.

**Fix: modes become routes, not state.**

```
app/page.tsx             → server component. Client mode.
app/recruiters/page.tsx  → server component. Recruiter mode.
app/work/[slug]/page.tsx → server component. Case studies (§4).
app/_components/*        → shared sections, server by default
app/_data.ts             → all data + copy. Never shipped.
```

Client islands only, and only these four: `HeroCanvas` (WebGL), `ContactForm` (state), `MobileMenu` (open/closed), `CountUp` (rAF, keep as-is).

§6's progressive-enhancement script is **not** a fifth island and must never become one — it is an inline `<script>` in the server `layout.tsx`, so it adds no `"use client"`, no React, and no hydration.

What falls out of one change:
1. **Server-rendered** → LCP and SEO fixed.
2. **Two indexable URLs.** Someone googling *"Shakti Mohapatra QA payments"* lands on `/recruiters`, not the Fiverr pitch. Today Google sees one page whose default state is the wrong half.
3. **The default-mode bug dies.** `useState<Mode>("side")` currently sends every LinkedIn visitor to the freelance pitch.
4. **localStorage `v2-mode` deleted** — the mechanism causing #3.
5. No DOM doubling, no `:has()` hack, no referrer sniffing.

`?view=day|recruiter|side|freelance` → permanent redirects, so shared links survive.

**Cost:** the shader's violet↔blue mode-morph lerp is gone; each route initializes its own value. Fair trade; a route change reads as a transition anyway.

---

## 3. Signature interactions

Test each must pass: **niche-true, unfakeable, small.**

### A. ISO-8583 / EMV TLV decoder — `/recruiters` · **OPUS, SEPARATE SESSION**

Paste a hex dump, it parses live: MTI, bitmap, DE fields, or EMV TLV tags — rendered in the mono layer, client-side, zero deps, seeded with a real example.

Every portfolio *claims* skills. Almost none let you use one. Un-templatable, and it *is* the design concept literally.

**Customization (required):** not a generic parser. Seed it with a dump representing a real transaction type Shakti has certified, annotate the fields he personally tests, and have it flag a deliberately malformed field the way his job actually does. Demonstration of judgement, not a toy. **Opus specs the exact field list before that session starts.**

### B. Transaction-flow visualizer — `/` (client) · Sonnet-high

An ISO-8583 authorization animated through terminal → acquirer → scheme → issuer → back. Pure CSS/SVG, no JS, no deps.

- Explains the job to someone who doesn't know what EMV is. A shop owner watches a card payment happen and finally understands it.
- Makes the client route *warmer*, not colder. Teaching is hospitality.
- Mirror of the decoder: decoder *proves* to a recruiter, visualizer *teaches* a client.

### C. Live CI badges from real repos · Sonnet-high

"32/32 tests green" is currently a claim. Instead, a server component fetches GitHub Actions status at build/ISR and renders the real number.

- Unfakeable, self-updating, ~15 lines, zero client JS.
- Turns stats from *assertion* into *instrument reading* — the concept applied to Shakti's own credibility.
- **Public repos only** (`fintech-ai-guard`, `upstox-paper-trading-bot`). Private ones can't be verified by a visitor, so a badge there would be theatre. Show it where it's real, omit it where it isn't — that asymmetry is the honest signal.
- **Fail closed:** fetch errors → badge omitted, never faked (§10 #10).

### D. AegisQA healing replay — DEFERRED

A real captured artifact (broken selector in, root cause + patch diff out, confidence 0.9) replayed as a scrubber on the AegisQA card. Best of the unbuilt interactions. Needs a captured artifact and careful framing. Own session, after the decoder.

*(Rejected: Luhn validator — trivial. Ctrl+K palette — cliché in 2026, Mission Control already has one. Uptime widget — nobody cares.)*

---

## 4. Case studies — as **defect reports** · **OPUS (writing)**

Not "Challenge / Solution / Result" like every agency site. The structure Shakti actually writes professionally:

```
SEVERITY   · CRITICAL
COMPONENT  · walk-forward backtest harness
EXPECTED   · ORB strategy evaluated against 3.5y of 1-min data
ACTUAL     · verdict produced by a measurement broken in 4 ways
ROOT CAUSE · the code had no concept of a trading day
RESOLUTION · voided my own conclusion before acting on it
```

Route: `app/work/[slug]/page.tsx`, server-rendered → indexable.

**The UI, concretely.** It's the **spec-sheet pattern** — Apple tech specs, datasheets, lab reports. Proven, and it happens to be exactly what a defect report looks like:

```
┌─ hairline ────────────────────────────────────┐
│ CASE STUDY / 01                    2026-07-16 │  ← mono eyebrow, same as every section
│                                               │
│ The backtest that                             │  ← headline, same clamp() scale as hero
│ lied to me.                                   │
├─ hairline ────────────────────────────────────┤
│ SEVERITY    │ CRITICAL                        │  ← the readout: mono labels left,
│ COMPONENT   │ walk-forward backtest harness   │     values right, 1px rules between rows
│ EXPECTED    │ ORB evaluated over 3.5y of data │     THIS is the only new component.
│ ACTUAL      │ verdict from a broken measure   │     It's a <dl>. Semantic, ~20 lines.
│ ROOT CAUSE  │ no concept of a trading day     │
│ RESOLUTION  │ voided my own conclusion        │
├─ hairline ────────────────────────────────────┤
│ [prose sections — normal reading width]       │  ← ordinary editorial type
└───────────────────────────────────────────────┘
```

- **One new component**, a `<dl>` readout. Everything else reuses §1 verbatim. If it looks foreign, the system is wrong, not the page.
- **Readout is the hook, prose is the substance.** Scanners read six lines. Readers scroll. Both served.
- **Entry point:** project card gains one mono link — `READ THE REPORT →`. No new nav.
- **Fallback:** degrades to a plain definition list; the page is still a well-typeset article. No version of this breaks the site.

**Lead with the trading bot.** Built a walk-forward harness, got a negative result, then found the measurement itself was broken four ways and voided the conclusion. Better engineering advertisement than all five cards combined — it demonstrates the thing every hiring manager screens for and can never test in an interview: *will this person tell me when they're wrong?* Source material: `E:\Trading-bot\SONNET_BUILD_PLAN.md` §5 and the `project_trading_bot` memory (session 10).

**Ship 2** (trading bot, AegisQA). Rest follow later.

---

## 5. Public demo repos — SEPARATE WORKSTREAM, BLOCKS NOTHING

Hiring teams weigh *"a small public repo, a sanitized case study, and a reproducible demonstration"* over vague claims.

1. **Don't fork-and-strip.** Rewriting history to scrub a fork leaks through reflogs and drifts out of sync forever. Build a *fresh, small core repo* with synthetic data.
2. **One command to run.** `docker compose up` or `npx`.
3. **Real tests + a real CI badge** (ties to §3C — the demo proves itself).
4. **The README *is* the case study** (§4 format).

**Cheap win:** AegisQA already ships `demo_app/index.html`, `selectors/demo.json`, and a real healing report *inside the private repo*. ~90% built.

**Priority:** AegisQA → Mission Control → AI-KB (last; a meaningful RAG demo is a real project).

**This does not block the rebuild.** Portfolio ships with GitHub-profile CTAs on private cards; demo links swap in as each lands. Remind Shakti after the portfolio is done.

---

## 6. Animations → CSS-first, with a real fallback where unsupported · Sonnet-high

Remove **`motion`** and **`lenis`** from `package.json`. Both go completely.

**Also delete the 4 dead `.lenis` rules still in `globals.css` (`html.lenis`, `.lenis.lenis-smooth`, `[data-lenis-prevent]`, `.lenis.lenis-stopped`).** They survived steps 1 and 2 — §10 #2's grep is *not* currently zero, despite the step-2 PROGRESS entry claiming it is. Harmless (nothing adds a `.lenis` class anymore) but it must go with the dep.

`animation-timeline: view()` ships in Safari 26 and Chrome 115+. **Firefox stable still has it behind `layout.css.scroll-driven-animations.enabled` as of Firefox 152 (June 2026)** — verified, not assumed.

> **Decision revised 2026-07-17 (Shakti). Supersedes the earlier "no Firefox effort beyond *it must work*".**
> The UI ships its full functionality in **every** browser. Firefox gets the actual animations, not a static page. Where a platform feature is missing, handle that scenario with a fallback that delivers the same behaviour — do not degrade everyone, and do not leave one browser with a lesser site.
>
> **Scope cap (Shakti, same day):** this buys Firefox *parity*, not Firefox *budget*. ~15 lines is the whole intended spend. Firefox is a thin slice of traffic — **phones and tablets are the real audience** — so surplus effort goes to step 8 (Mobile), never to gold-plating Firefox. The objection was to shipping Firefox a degraded UI. It was never a request to invest heavily in it. If the fallback starts growing, that is the signal to stop and ask.

### Three layers

1. **Baseline CSS — content visible, no animation.** Runs everywhere: before JS, if JS fails, under reduced-motion. Nothing on this site is ever blank waiting for a script.
2. **Native scroll-driven animation** behind `@supports (animation-timeline: view())`. Chrome 115+ / Safari 26 — the large majority of traffic — animate with **zero JS**.
3. **Fallback for browsers without `animation-timeline`** (today: Firefox). A ~15-line progressive-enhancement script feature-detects with `CSS.supports()`, returns immediately where layer 2 already works, and otherwise drives the *same CSS animations* via `IntersectionObserver` + a passive scroll listener. **Only the trigger differs — never the design.**

**The fallback is NOT a 5th client island.** It is an inline `<script>` in the server `layout.tsx`, so `grep -rln '"use client"' app/` still returns exactly 4 and §10 #3 still holds. No React, no hydration, no bundle cost, and Chrome/Safari pay ~1 line of feature detection. `IntersectionObserver` is already the pattern in `CountUp` and `HeroCanvas` — reuse it, don't invent a new one.

```css
/* Layer 1 — baseline. Visible. This is what runs if the script never does. */
.reveal { }

/* Layer 2 — native, no JS. Chrome 115+, Safari 26. */
@supports (animation-timeline: view()) {
  .reveal {
    animation: reveal-in linear both;
    animation-timeline: view();
    animation-range: entry 10% cover 32%;
  }
}

/* Layer 3 — JS-triggered, same keyframes. Only reached in browsers without
   animation-timeline, and ONLY once the script has added .js-reveal to <html>.
   Scoping the opacity:0 under .js-reveal is what guarantees layer 1 stays
   visible when the script is absent, blocked, or errors. Do not unscope it. */
@supports not (animation-timeline: view()) {
  .js-reveal .reveal { opacity: 0; transform: translateY(16px); }
  .js-reveal .reveal.in-view { animation: reveal-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
}

/* The user's explicit OS-level request. Honoured in all three layers. */
@media (prefers-reduced-motion: reduce) {
  .reveal,
  .js-reveal .reveal,
  .js-reveal .reveal.in-view { animation: none; opacity: 1; transform: none; }
}
```

**`prefers-reduced-motion` stays, and it is a different thing from the Firefox question.** It is the visitor explicitly asking their OS for less motion; honouring it is an accessibility requirement, it only ever affects people who asked for it, and it never reaches anyone else. It is not a browser concession and it is not up for removal.

| Now | Becomes | Fallback (no `animation-timeline`) |
|---|---|---|
| `lenis` (~40 lines + dep) | `scroll-behavior: smooth` — **already on `<html>`** (layout.tsx:71). `goTo()` → `scrollIntoView()`. Pure deletion. **Add `scroll-padding-top` to `<html>`** (~72px: the fixed header's `h-14` + `mt-4`) — HEAD compensated with lenis `scrollTo(el, {offset:-40})` and step 2 dropped it, so anchor targets currently land under the header | n/a — universally supported |
| `Reveal` (`whileInView`) ×30 | `animation-timeline: view()`. Stagger via `--i` on `animation-delay` | `IntersectionObserver` → `.in-view`. Same keyframes, same stagger |
| `ProjectRow` parallax | **Delete.** Two `motion.div`s + a scroll subscription per card for a 12% drift nobody sees | n/a — deleted |
| Header hide-on-scroll | `animation-timeline: scroll()` | Passive `scroll` listener → `[data-hidden]` on the header. Same CSS transform |
| `AnimatePresence` menu | Stays mounted, `[data-open]`, CSS transitions | n/a — plain CSS transitions, works everywhere |
| Hero line-mask + fades | `@keyframes` + `animation-delay`. Already CSS-shaped | n/a — time-based, not scroll-driven. Works everywhere |
| `whileHover={{y:-4}}` | CSS `:hover` | n/a |
| `Magnetic` | **Delete.** Mouse-only, invisible on mobile | n/a — deleted |
| `CountUp` | Keep | n/a — already JS + `IntersectionObserver` |

Most rows need no fallback at all: only the two genuinely scroll-*driven* effects (reveals, header hide) depend on `animation-timeline`. Everything else is time-based CSS or `:hover`, which Firefox has always supported. The fallback script is therefore small by construction.

**Kinetic typography, ~6 lines:** `font-variation-settings` `wght` driven by `animation-timeline: view()` on the hero headline. Same `@supports` guard.

- **Fallback:** snap `wght` to its end value on entry instead of interpolating per-scroll. **Approved by Shakti 2026-07-17 — settled, don't re-raise it at step 3.** The only bar: it must not *look* weird — no visible jump or flash, so land the weight during the reveal rather than after it. Do not reach for a rAF loop; per-frame interpolation for one headline's weight is real cost and the answer is already no. Mark it `ponytail: snapped in the no-animation-timeline path, deliberate — see PLAN §6`.

---

## 7. Copy — **USE THESE STRINGS VERBATIM. DO NOT REWRITE.**

Shakti's colleagues flagged the text as the site's weak point. These were written by Opus deliberately. **Place them; do not author replacements.** If something is missing, ask — don't improvise.

**The mechanical tell to avoid:** the old copy has exactly one em-dash mid-sentence in nearly every description. That metronome is 80% of why it reads machine-written. Vary the rhythm. Short sentence. Then a longer one that breathes.

### Hero — `/recruiters`
- **Eyebrow** (mono): `SENIOR QA ENGINEER · PAYMENTS & FINTECH`
- **H1:** `I break payment systems` / `for a living.`
- **Line 3, accent:** `Now I'm doing it to AI.`
- **Sub:** "Four years testing the rails money actually moves on. EMV, ISO-8583, L3 certification across five card schemes, for Verifone, Geidea, and Costco's North American fuel network. Now I'm pointing the same paranoia at language models."

### Hero — `/` (client)
- **Eyebrow** (mono): `FREELANCE DEVELOPER · PYTHON, AI, WEB APPS`
- **H1:** `Software that works` / `on the first try.`
- **Sub:** "My day job is testing payment systems where a bug costs real money. I bring that standard to freelance work: Python automation, AI tools, web apps, and bots. Built by me, explained in plain English, fixed if it breaks."

### "How I actually work" — replaces the fake testimonials
Same three-card slot. No names, no stars, nothing invented.

1. **You'll hear back within a day** — "Usually the same day. If I can't take the work, I'll tell you immediately instead of leaving you waiting on a maybe."
2. **You get the code and the reasoning** — "Not just a zip file. I'll show you how to run it, what each piece does, and where it'll need changing later."
3. **If it breaks, I fix it** — "Two rounds of revisions come with every project. If it doesn't do what you hired it for, that's on me, not a change request."

### Other copy fixes
- **`∞ Revisions until it works` → `2 rounds included`.**
- **`4+ Real projects shipped` → `5`** (match the real card count).
- **Experience bullets → prose + one mono metric line.** Kill the `·` markers (page.tsx:1230).
- **Taglines state the bridge, not the tech.** fintech-ai-guard: *"The QA discipline from payments, pointed at language models."* AegisQA: *"When a test breaks, it works out why and proposes the fix."*

### Metadata (layout.tsx) — per route
- `/` → title `"Shakti Mohapatra — Freelance Developer | Python Automation, AI Tools & Web Apps"`; description leads with plain-English outcomes and the payments-grade standard; keywords: freelance developer, Python automation, AI chatbot developer, web scraping, Discord bot developer, Next.js developer, bug fixing.
- `/recruiters` → title `"Shakti Mohapatra — QA Engineer, Payments & FinTech | Building AI"`; description leads with EMV/ISO-8583/L3 and the AI transition; keywords: QA engineer, payments testing, EMV, ISO-8583, L3 certification, test automation, LLM evaluation, GenAI, Bangalore.
- Per-route `openGraph` + `twitter`. Both get `alternates.canonical`.
- **JSON-LD `Person` schema** on both (~10 lines) — Machine Experience; how an AI screener parses who he is.
- `SITE_URL` TODO (layout.tsx:19) stays until the domain lands.

---

## 8. Projects, thumbnails, mobile, cleanup

### Projects: 3 → 5, visible to everyone
`#work` moves **out of** the `mode === "side"` gate.

| Card | Verified status | Link |
|---|---|---|
| **Fintech-AI-Guard** (`E:\fintech-ai-guard`) | **NEW.** Public. Sprints 0-14 pushed, S9 WIP → "In progress" | public repo + live CI badge (§3C) |
| **AegisQA** (`E:\AegisQA`) | **NEW.** Private. Sprints 1-3 shipped, 32 tests green, CI green on a real push → "Shipped" | GitHub profile → demo repo later (§5) |
| **AI Knowledge Base** (`E:\ai-kb-saas`) | Private, `origin/main@3848146`. Genuinely in progress — keep the badge | GitHub profile |
| **SS BAZAR** (`E:\clothing_store`) | Live. Add outcome framing | live URL |
| **Mission Control** (`E:\mission-control`) | Private → GitHub-profile CTA | GitHub profile |

- `/recruiters`: fintech-ai-guard → AegisQA → AI-KB → SS BAZAR → Mission Control
- `/`: SS BAZAR → AI-KB → Mission Control → AegisQA → fintech-ai-guard

Private-repo cards keep the GitHub-profile CTA — the 404 pattern already bit this site once.

### Thumbnails — real screenshots

| Project | Capture |
|---|---|
| SS BAZAR | Live Vercel URL via `preview_start` + screenshot |
| Mission Control | Local dev server at `E:\mission-control\web` — **ask before starting** |
| AegisQA | Real terminal + real healing report. A real diff with a real confidence score beats any mockup |
| Fintech-AI-Guard | Real promptfoo eval report / CLI output |
| AI Knowledge Base | **No frontend** (`.gitkeep` placeholders) → Nano Banana, below |

Processing: 1920px wide, WebP q84, via the repo's own `sharp` (`require("E:/portfolio/node_modules/sharp")`, run from **outside** the repo — scratchpad scripts can't resolve repo node_modules by default), into `public/projects/`.

**Ask first** before anything that spends API quota; use existing artifacts where they exist.

**Nano Banana — AI-KB only:**
> A laptop on a dark desk in a modern office, screen showing a dark-mode SaaS dashboard: a left sidebar of document names, a central chat panel with an AI response, small source-citation chips beneath it, an org switcher top-right. A coffee cup and a stack of printed documents sit blurred beside the laptop. Photorealistic product photography, 50mm lens at f/2.8, soft window light from the left, shallow depth of field, dark desk surface, subtle screen glow, UI text crisp and legible, 16:9, muted colour grade with a single violet accent.

Rules: no invented metrics, no Visa/Mastercard/Costco/Verifone logos, no fake company names on screen.

### Mobile
- **Fluid type**: `clamp()` scale in `@theme`. Headings already use it; body and labels don't. `text-[10px]`/`text-[11px]` contact-card labels are below legible minimum on a phone.
- **Tap targets** ≥44×44: mode toggle (currently `py-1.5` ≈ 30px), menu links, tag chips, contact rows.
- **Overflow**: `.v2-marquee`, hero `clamp(2.75rem,9vw,7rem)` at 320px, `grid lg:grid-cols-[1fr_268px]` (fixed 268px column).
- **Stacking**: `ProjectRow` `lg:order-1/2`, menu `sm:grid-cols-[1.3fr_1fr]`, experience `sm:grid-cols-[220px_1fr]`.
- Hairlines need device-pixel handling on retina to stay crisp.

### Cleanup — all verified 0 refs in `app/`
- `globals.css` → strip ~145 dead lines (`.reveal`, `.hero-gradient`, `.anim-*`, `.text-shimmer`, `.skill-tag`). **Keep** `@custom-variant dark` + `:root`/`.dark` vars — `not-found.tsx` genuinely uses `dark:`.
- Fold `app/v2/v2.css` in, delete it. There is no v1; `v2-` is noise. Rename `v2-*` → semantic.
- `public/projects/`: `mc-1/2/3/5.png`, `mc-4.png` (only `.webp` used), `cs-3/4/5/preview.png`.
- `public/profile-photo.png` (only `.jpg` used), `public/shakti.png`.
- `app/v2/page.tsx` — **KEEP**. Live `/v2 → /` redirect, 5 lines, protects shared links.
- **`E:\portfolio-v2`** — not deployed, not referenced, **not a git repo** → deletion is irreversible, no recovery. Its `docs/ARCHITECTURE.md` is real spec work. **Confirm with Shakti once before removing**, offering to keep `docs/` first.

---

## 9. The path to 10 (after this plan lands ~9)

1. **Custom domain** — deferred by Shakti until the build is final. `SITE_URL` (layout.tsx:19) is TODO'd waiting for it.
2. **The remaining 3 case studies** (§4) — 2 ship here.
3. **AegisQA healing replay** (§3D).
4. **Demo repos** (§5).
5. **A real Fiverr review.** No design fixes an empty proof column.

**Fixed by this plan:** recruiter mode's zero projects · fabricated testimonials · AI-art thumbnails · the stat contradiction · buried moat · Fiverr-only metadata · `∞ revisions` · 2021 template signals (glass, grain, magnetic, orbs) · 1632-line client component + WebGL LCP cost · 145 dead CSS lines · `·` bullets and the em-dash metronome · the default-mode bug sending LinkedIn traffic to the Fiverr pitch.

---

## 10. Verification — run before marking any step done

1. `npx tsc --noEmit` + `npm run build` clean from fresh.
2. `grep -r "motion/react\|lenis" app/` → zero. Both absent from `package.json`.
3. **Assert the architecture landed**: `"use client"` in the 4 island files and nowhere else. Confirm via view-source that hero copy is in the server HTML. **This is the one claim that's easy to believe without checking** — step 2 compiles green while silently failing. (§6's fallback script is an inline `<script>` in the server layout, not an island: it does not count against this four, and converting it into a `"use client"` component to "do it properly" is the failure mode to avoid.)
4. Dev server via `preview_start`; console + network clean.
5. **Both routes** at 320/375/768/1280: no horizontal scroll (assert `document.documentElement.scrollWidth <= clientWidth`), 5 cards on both, tap targets ≥44px.
6. Reduced-motion on: reveals resolve visible, marquee static.
7. **Firefox: full parity, not merely "not blank."** Reveals actually fire, the header actually hides on scroll, the menu transitions. Confirm the fallback ran (`<html>` carries `js-reveal`), then **confirm the safety net too: with JS disabled, content is still visible, never blank** — that is layer 1, and it is the check that catches an unscoped `opacity: 0`.
8. Every external link resolves.
9. Contact form: **UI state only, never a real Formspree submit.**
10. Live CI badges (§3C) show real numbers and **fail closed** — fetch error → badge omitted, never faked.
11. **The client test:** read `/` start to finish. Zero jargon, every sentence understandable to a shop owner. Any sentence needing domain knowledge is a bug.
12. Screenshots of both routes, desktop + mobile, before reporting done.
13. **Canonicals + per-route metadata — assert against the built HTML, never the source.** `grep -o '<link rel="canonical"[^>]*>' .next/server/app/index.html` → `SITE_URL`; the same on `recruiters.html` → `SITE_URL/recruiters`. Titles and descriptions must differ per route. **Why this check exists:** the root layout's `alternates.canonical` is *inherited* by any route that doesn't set its own, so `/recruiters` silently canonicalises to `/` and Google drops it as a duplicate — which is exactly the state step 2 left the repo in (verified in the build, 2026-07-17). It compiles green, looks perfect in a browser, and the only symptom shows up in Search Console months later. Step 6 (§7) is where this gets fixed; this check is what proves it did.

**Not deployed.** Shakti's explicit call, separate from "the build is green."

---

## 11. Execution tracker

Work in order. Verify per §10 between each. Append to `PROGRESS.md` after each.

- [x] **1 · Cleanup + Instrument tokens + fluid type** (§1, §8) — Sonnet-high. Mechanical.
- [x] **2 · Architecture split** (§2) — **OPUS, ISOLATED TASK.** 1632-line teardown. Verify §10 #3 before anything else touches it.
- [x] **3 · Animation refactor** (§6) — Sonnet-high. Three layers + the fallback script are written out. Also: drop the 4 dead `.lenis` rules from `globals.css` and both deps from `package.json`.
- [x] **4 · Instrument applied** (§1) — Sonnet-high. Visual only.
- [x] **5 · Copy + data + 2 new cards** (§7, §8) — Sonnet-high. **Strings are in §7 — place, don't author.**
- [x] **6 · Metadata + JSON-LD** (§7) — Sonnet-high.
- [x] **7 · Screenshots** (§8) — Sonnet-high. Needs Shakti's go-ahead on running things.
- [x] **8 · Mobile + full verification** (§10) — Sonnet-high.
- [x] **9 · Transaction-flow visualizer** (§3B) — Sonnet-high. Additive; any time after 8.
- [x] **10 · 2 case studies** (§4) — **OPUS.** Writing, not coding.
- [x] **11 · ISO-8583 decoder** (§3A) — **OPUS, SEPARATE SESSION.** Spec the field list first.

Steps 1-8 are strictly ordered. 9-11 are additive after 8.

---

## Sources

- [Fireart — Web Design Trends 2026: Tactile Brutalism](https://fireart.studio/blog/the-best-web-design-trends/) · [Figma — Top Web Design Trends 2026](https://www.figma.com/resource-library/web-design-trends/) · [Design Monks — Typography Trends 2026](https://www.designmonks.co/blog/typography-trends-2026)
- [Awwwards — Portfolio winners](https://www.awwwards.com/websites/winner_category_portfolio/) · [Muzli — 100 Best Designer Portfolios](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/)
- [WebKit — Scroll-driven animations with just CSS](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/) · [Safari 26.0 features](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/) · [MDN — CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [Harlow — Showing work locked by NDAs](https://meetharlow.com/blog/how-to-build-a-portfolio-when-your-best-wins-are-locked-by-ndas/) · [Randstad — Interactive engineering portfolios](https://www.randstad.com.au/career-advice/career-tips/online-portfolio-engineering-jobs/)
