# Portfolio Redesign Plan — 2026-07 (FINAL, build from this verbatim)

> **Who this is for:** an AI coding agent (Sonnet-5, Antigravity, or Kimi) building the changes.
> This is the single source of truth. Do **exactly** what is written. Where a value is given, use
> that value. Where a file is named, edit that file. Do **not** invent scope, do **not** rewrite copy,
> do **not** "improve" things that aren't listed. When unsure, STOP and ask — do not guess.

---

## 0. HARD RULES — read before touching anything

1. **This is Next.js 16.2.9 / React 19 / Tailwind v4 (CSS-config, NO `tailwind.config.js`).** APIs differ
   from older Next. Before using any unfamiliar Next/React API, read the matching guide under
   `node_modules/next/dist/docs/`. Do not assume App-Router behavior from memory.
2. **DO NOT DEPLOY. DO NOT PUSH TO `main`.** Pushing `main` auto-deploys to production on Vercel.
   Work on a branch only (see §1). Never run `vercel`, never `git push origin main`.
3. **DO NOT submit the contact form** during testing — it emails the owner.
4. **DO NOT rewrite prose/copy.** Task 2 (de-AI-ing the writing) is **reserved for Claude/Opus only and
   is deferred** — it is NOT in this build. Leave every sentence in `app/_data.ts` and every visible
   copy string exactly as-is, EXCEPT the specific string changes explicitly listed in this doc
   (section headings in T5, and new labels for the two new animations in T12/T14). If you think copy
   reads like AI, leave it — that is someone else's job.
5. **Keep the "Instrument" design system.** Pure-black surface (`#000000`), 1px hairlines
   (`border-white/[0.08]`), `rounded-2xl` corners, `backdrop-blur` on floating glass surfaces,
   film grain, ambient orbs, mono font for metadata. **DO NOT** strip `rounded-*`, `backdrop-blur`,
   grain, or orbs — a past session did that and it was a rejected regression.
6. **`"use client"` stays minimal but MAY grow** for the specific new islands this doc names
   (`DecoderEngine`, and optionally a case-study scroll-spy). Do not convert existing server components
   to client components unless this doc says to. After all work, run
   `grep -rln '"use client"' app/` and confirm the only client files are:
   `HeroCanvas, ContactForm, MobileMenu, CountUp, DecoderReveal, SmoothScroll` + the new
   `DecoderEngine` (and the optional case-study spy if you build it). Nothing else.
7. **Reduced motion is sacred.** Every new animation MUST be disabled under
   `@media (prefers-reduced-motion: reduce)`. Add the new classes to the existing reduced-motion block
   at the bottom of `app/globals.css`.
8. **Accessibility:** keep all `aria-*`, `inert`, focus states. New interactive elements need visible
   focus. Decorative elements get `aria-hidden`.

### Verification protocol (MANDATORY after every phase)
- `npx tsc --noEmit` → must be clean.
- `npm run build` → must succeed.
- `npm run lint` → allowed to have **exactly 1 pre-existing error** (`react-hooks/set-state-in-effect`
  in `CountUp`). Any NEW lint error must be fixed. Do not "fix" the CountUp one.
- **Real visual check (not optional):** run the dev server (`npm run dev`, it uses port 3001) and look at
  the page in a real browser. DOM/computed-style assertions are NOT sufficient for visual work — a past
  redesign shipped "verified" by DOM checks and was visually broken for 4 sessions. Capture a real
  screenshot of each changed section on BOTH routes (`/` and `/recruiters`) and confirm it looks right
  before marking a task done. The sandboxed preview pane hangs on this site's WebGL hero — use a real
  browser / real-Chrome tooling for screenshots.
- Test at desktop (1280px) AND mobile (390px) widths.

### Git
- Branch: `git checkout -b redesign-2026-07` (from current `main`, off whatever is checked out — confirm
  clean tree first with `git status`; if there are uncommitted changes, STOP and ask).
- Commit after each phase with a clear message. **Never push.**

---

## 1. Per-tab theme model (foundational — do FIRST, Phase 0)

Two routes, one identity, different accent:
- **Client route `/` (mode `side`): violet/fuchsia** accent (unchanged from today).
- **Recruiter route `/recruiters` (mode `day`): blue/cyan** accent (matches its WebGL hero already).

### 1.1 Add per-mode accent tokens
**File `app/_components/Shell.tsx`** — add `data-mode` to the root `.site` div:
```tsx
<div className="site relative min-h-screen overflow-x-clip" data-mode={mode}>
```
(`mode` is `"side" | "day"`, already a prop.)

**File `app/globals.css`** — replace the single `--accent`/`--accent-2` usage model by scoping accent
tokens to `.site`, and add RGB triplets (needed for `rgba()` glows). Add near the top of the `.site`
rules:
```css
.site {
  --accent: #8b5cf6;          /* violet  */
  --accent-2: #e879f9;        /* fuchsia */
  --accent-rgb: 139, 92, 246;
  --accent2-rgb: 232, 121, 249;
}
.site[data-mode="day"] {
  --accent: #38bdf8;          /* sky-400 */
  --accent-2: #2dd4bf;        /* teal-400 */
  --accent-rgb: 56, 189, 248;
  --accent2-rgb: 45, 212, 191;
}
```
> Note: the existing `:root` block also defines `--accent`. Keep it (it's the fallback), but the
> `.site`-scoped values win inside the app. Do not delete the `@theme inline` mapping.

### 1.2 Convert hardcoded accent colors to the tokens
Anything that is an **accent** (the violet/fuchsia brand color) must become token-driven so it flips to
blue/cyan on the recruiter route. Anything that is **semantic** (emerald "available" status, per-service
icon colors, project-badge colors, red "FAILS CERT") stays as-is.

**Convert these (search the whole `app/` tree):**
- `rgba(139, 92, 246, …)` → `rgba(var(--accent-rgb), …)`
- `rgba(232, 121, 249, …)` → `rgba(var(--accent2-rgb), …)`
- Brand text/border/bg utilities on **shared** components (`Work.tsx`, `Contact.tsx` header underline &
  radial, `Marquee.tsx` ✦, `Hero.tsx` `.accent-text`, `MobileMenu.tsx` gradient line + numbers +
  hovers, `SiteHeader.tsx`): replace `violet-300/400` accent usages with `text-[var(--accent)]`,
  `border-[color:var(--accent)]`, or `bg-[rgba(var(--accent-rgb),0.1)]` as appropriate.
- `.accent-text` in globals.css → change the gradient to `linear-gradient(102deg, var(--accent) 0%,
  var(--accent-2) 55%, var(--accent) 100%)`.
- `.bento-card:hover` box-shadow `rgba(139,92,246,0.12)` → `rgba(var(--accent-rgb),0.12)`; hover
  border `var(--accent)` (already a token — good).
- `Shell.tsx` ambient orbs: the three inline `rgba(139,92,246,…)` / `rgba(232,121,249,…)` → the token
  rgb form. (This makes recruiter orbs blue/teal automatically.)

**Do NOT convert (leave exactly as written):**
- Emerald "Available"/status dots and the contact "available" badge (stay emerald on both tabs).
- `SERVICE_ICON_ACCENT` / `SERVICE_FROM_ACCENT` multi-color set in `_data.ts` (client-only, intentional
  variety) — leave.
- Project `badgeClass` colors in `_data.ts` — leave.
- Decoder `.dec-flag*` red — leave.
- The recruiter-only components already using `var(--accent)` (Decoder CSS) — they auto-theme, leave.

**Acceptance:** on `/` all brand accents are violet/fuchsia; on `/recruiters` all brand accents are
blue/cyan (hero, orbs, tile hovers, links, marquee ✦, section eyebrows, decoder). Emerald status stays
emerald on both. Take one screenshot per route proving the accent color differs.

---

## 2. GLOBAL TILE SYSTEM (Tasks 6 + 8) — Phase 0/2

Goal: every card ("tile") on the site shares ONE coherent hover/pointer behavior, with two variants:
- **Interactive tiles** (links, buttons — the user can click them): stronger effect.
- **Static tiles** (info cards — nothing to click): the same family, subtler.
Accent color already differs per tab via §1. This replaces the current inconsistent mix
(`.bento-card` on Skills+Services, `[data-magnetic]` on some, nothing on the rest).

### 2.1 The effect (2026 "spotlight border" card)
A radial spotlight that follows the cursor inside the tile, an accent border-glow on hover, and (interactive
only) a small magnetic lift toward the cursor. Pure CSS for the glow; one shared JS listener sets the
cursor position as CSS custom properties.

**Add to `app/globals.css`:**
```css
/* ── Tile system (Tasks 6 & 8) ── */
.tile {
  position: relative;
  border-radius: 1rem;                       /* rounded-2xl, keep */
  border: 1px solid var(--hairline);
  background: var(--panel);
  overflow: hidden;                          /* clip the spotlight */
  transition: border-color .3s ease, box-shadow .3s ease, background .3s ease, transform .25s cubic-bezier(.22,1,.36,1);
}
/* Cursor spotlight — --mx/--my are px within the tile, set by JS (default centered). */
.tile::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity .35s ease;
  background: radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%),
              rgba(var(--accent-rgb), .14), transparent 60%);
}
.tile:hover::before { opacity: 1; }
.tile:hover { border-color: rgba(var(--accent-rgb), .45); background: var(--panel-hover); }

/* Interactive: stronger glow + lift + accepts magnetic transform (set inline by JS). */
.tile--interactive:hover {
  border-color: rgba(var(--accent-rgb), .6);
  box-shadow: 0 0 44px rgba(var(--accent-rgb), .16), inset 0 1px 0 rgba(255,255,255,.04);
}
/* Static: gentler — smaller/softer spotlight, no lift, no magnet. */
.tile--static::before {
  background: radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%),
              rgba(var(--accent-rgb), .08), transparent 55%);
}
.tile--static:hover { box-shadow: 0 0 30px rgba(var(--accent-rgb), .08); }
```

### 2.2 The shared pointer script
Replace the existing magnetic block in **`app/layout.tsx`** (the second IIFE, the one commented
"Magnetic tile hover") with one that (a) sets `--mx/--my` on every `.tile` for the spotlight, and
(b) applies the magnetic translate to `.tile--interactive` only. Keep the same guards
(`(hover:hover) and (pointer:fine)` + not reduced-motion). Exact replacement:
```js
(function(){
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var LIFT = 10;
  document.querySelectorAll(".tile").forEach(function (el) {
    var interactive = el.classList.contains("tile--interactive");
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left) + "px");
      el.style.setProperty("--my", (e.clientY - r.top) + "px");
      if (interactive) {
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "translate(" + (x*LIFT).toFixed(1) + "px," + (y*LIFT - 3).toFixed(1) + "px)";
      }
    });
    el.addEventListener("mouseleave", function () {
      if (interactive) el.style.transform = "";
    });
  });
})();
```
> The tiles are server-rendered, present at first paint, so `querySelectorAll` at script run finds them.
> This inline script runs once; it does not re-scan. That's fine — no tiles are added dynamically.

### 2.3 Apply the classes (replace `.bento-card` / `[data-magnetic]` everywhere)
For each card, add `tile` + one variant. Remove the old `bento-card` class and `data-magnetic`
attributes (the CSS `.bento-card` rule can be deleted after). Keep existing layout/padding utilities.

| Component | Element | New classes | Variant reason |
|---|---|---|---|
| `Services.tsx` | `<a>` service card | `tile tile--interactive` (was `bento-card`) | it's a link |
| `Skills.tsx` | category card `<div>` | `tile tile--static` (was `bento-card`) | not clickable |
| `Work.tsx` | project image panel `<div>` | `tile tile--interactive` (was `data-magnetic`) | wraps live link |
| `Guarantees.tsx` | each guarantee `<div>` | `tile tile--static` | info only |
| `HowIWork.tsx` | each item `<div>` | `tile tile--static` | info only |
| `Experience.tsx` | company header, "Currently", "Education" cards | `tile tile--static` | info only |
| `CaseStudyFeature.tsx` | each case-study card `<div>` | `tile tile--interactive` (was `data-magnetic`; note it contains a "Read the report" link) | leads to a page |
| `DecoderReveal.tsx` | the trigger `<button>` | `tile tile--interactive` (add to existing classes) | it's a button |
| `Contact.tsx` | the LinkedIn/Email/Phone channel `<a>`s (day mode) | `tile tile--interactive` | links |
| `Contact.tsx` | form card + info card wrappers | `tile tile--static` | containers |
| `Stats.tsx` | (do NOT tile the stat cells — leave them borderless) | — | keep clean band |

> Keep the existing `hover:-translate-y-1` ONLY if it doesn't fight the magnetic transform. Since the
> magnetic script now sets `transform` inline on interactive tiles, REMOVE `hover:-translate-y-1` and
> `hover:scale-*` transform utilities from tiles that get `tile--interactive` (the magnet handles lift).
> Static tiles keep no transform.

**Acceptance:** hover any card on either route → a soft accent spotlight follows the cursor and the
border glows; interactive cards additionally lift/pull toward the cursor, static cards do not. Effect
color is violet on `/`, cyan on `/recruiters`. Consistent on every card. Reduced-motion: no transform,
spotlight still allowed (it's opacity only) but you MAY disable it too — add `.tile::before{opacity:0!important}`
under reduced motion if you prefer; either is acceptable. Screenshot proof both routes.

---

## 3. SCROLL EXPERIENCE (Tasks 9, 10, 13) — Phase 3

Today only a single `.reveal` (fade+16px rise) exists and it's weak. Make scrolling feel alive on both
tabs, universally, with variety per section. Keep the existing 3-layer model (baseline visible → native
`animation-timeline` → JS IntersectionObserver fallback for Firefox). Extend it; don't replace it.

### 3.1 Reveal variants
**Add to `app/globals.css`** (mirror the existing `.reveal` @supports structure for each):
```css
/* Directional / scale reveal variants. Native scroll-driven first, JS fallback second. */
@supports (animation-timeline: view()) {
  .reveal-left  { animation: rv-left  linear both; animation-timeline: view(); animation-range: entry 8% cover 34%; }
  .reveal-right { animation: rv-right linear both; animation-timeline: view(); animation-range: entry 8% cover 34%; }
  .reveal-scale { animation: rv-scale linear both; animation-timeline: view(); animation-range: entry 6% cover 30%; }
}
@supports not (animation-timeline: view()) {
  .js-reveal .reveal-left,  .js-reveal .reveal-right { opacity: 0; }
  .js-reveal .reveal-left  { transform: translateX(-40px); }
  .js-reveal .reveal-right { transform: translateX(40px); }
  .js-reveal .reveal-scale { opacity: 0; transform: scale(.94); }
  .js-reveal .reveal-left.in-view,
  .js-reveal .reveal-right.in-view,
  .js-reveal .reveal-scale.in-view { animation: rv-in .7s cubic-bezier(.22,1,.36,1) both; }
}
@keyframes rv-left  { from { opacity:0; transform: translateX(-40px);} to { opacity:1; transform:none;} }
@keyframes rv-right { from { opacity:0; transform: translateX(40px);}  to { opacity:1; transform:none;} }
@keyframes rv-scale { from { opacity:0; transform: scale(.94);}         to { opacity:1; transform:none;} }
@keyframes rv-in    { from { opacity:0;} to { opacity:1;} }  /* generic fade for JS fallback end-state */
```
Also strengthen the base `.reveal`: change its keyframe rise from `16px` to `28px` and add a hair of blur:
```css
@keyframes reveal-in { from { opacity:0; transform: translateY(28px); filter: blur(4px);} to { opacity:1; transform:none; filter:none;} }
```

### 3.2 Generalize the JS fallback observer
**File `app/layout.tsx`** — the fallback IIFE currently observes only `.reveal`. Change the selector to
observe every reveal variant:
```js
document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach(function (el) { io.observe(el); });
```
(Native browsers still return early before this runs — unchanged.)

### 3.3 Parallax utility (depth on scroll)
```css
@supports (animation-timeline: view()) {
  .parallax-slow { animation: parallax-y linear both; animation-timeline: view(); animation-range: cover 0% cover 100%; }
}
@keyframes parallax-y { from { transform: translateY(40px);} to { transform: translateY(-40px);} }
```
Apply `parallax-slow` to: the giant watermark index numbers in `Work.tsx` (`text-white/[0.08]` `{index}`),
and the `Process.tsx` big step numbers. (Purely decorative; no JS fallback needed — they just sit still
in Firefox.)

### 3.4 Section-header treatment
For every section's `<h2>` heading and its right-side descriptor `<p>`, apply opposing directional reveals:
heading → `reveal-left`, descriptor → `reveal-right`. This gives a consistent "elements converge" feel as
each section enters. Apply in: `Work`, `Skills`, `Services`, `Experience`, `CaseStudyFeature`,
`Guarantees`, `HowIWork`, `Process`, `TransactionFlow`, `Decoder`. (Replace their current `reveal` on the
heading/descriptor with the directional variant; keep `reveal` on body content.)

### 3.5 Project rows (Task 13 — the "boring tiles on black" fix)
In `Work.tsx` `ProjectRow`:
- The text column: `reveal-left` when not flipped, `reveal-right` when flipped (so it enters from its own
  side). The image panel: the opposite direction. (Use the existing `flip` boolean.)
- Add `reveal-scale` to the image `tile` so it scales up slightly as it enters.
- The watermark index number: add `parallax-slow` (from §3.3) so it drifts as you scroll — adds depth.
- Increase vertical rhythm: the `space-y-28` between rows is fine; keep.

**Acceptance:** scrolling either route, sections and cards animate in with directional + fade + subtle
blur/scale; project rows converge from left/right with the big index numbers drifting; nothing pops in
abruptly; nothing animates under reduced-motion. Record a short screen capture or several scroll
screenshots per route.

### 3.6 Reduced motion
Add ALL new animated classes (`.reveal-left/right/scale`, `.parallax-slow`) to the reduced-motion block:
`animation: none !important; opacity: 1; transform: none; filter: none;`.

---

## 4. FLOATING MENU REDESIGN (Task 11) + TEXT CONTRAST (Task 15) — Phase 1

The current nav pill + drop-sheet reads as low-contrast and off-theme (see the owner's screenshot: dull
grey nav labels, generic sheet). Redesign both, on both routes. **Keep** the pill floating, rounded,
`backdrop-blur` (do not flatten). Files: `app/_components/MobileMenu.tsx`, `SiteHeader.tsx`.

### 4.1 Nav pill (top bar)
- Wordmark contrast: `text-[15px] font-semibold` stays; ensure it's `text-white` (not dimmed). The
  `builds` accent span → `text-[var(--accent)]`.
- The `Menu`/`Close` button label: raise from `text-white/80` to `text-white` and the hamburger lines to
  `bg-white`.
- Keep `ModeLinks` but raise the inactive tab text from `text-white/50` → `text-white/70`.
- Give the pill a faint accent top hairline on hover of the whole header (optional; skip if it fights the
  hide-on-scroll).

### 4.2 Drop-sheet — new layout
Replace the sheet's inner markup (the `.collapse-inner` block) with a cleaner, higher-contrast panel:
- **Background:** keep dark glass (`rgba(6,6,8,0.92)` + `backdrop-blur(28px)`). Add a top accent line that
  **draws in** on open: a 2px bar `background: linear-gradient(90deg, transparent, var(--accent), transparent)`
  with a width transition from 0→100% (use a CSS transition keyed off `data-open`, or an
  `animation` on open).
- **Left column — nav links:** keep the numbered list but raise contrast and add the tile spotlight
  language: each link row is `text-white/60 hover:text-white`, index `text-[var(--accent)]/50`, on hover
  a faint accent band slides in behind the row (`::before` accent bg at low alpha, or a
  `bg-[rgba(var(--accent-rgb),0.06)]` on hover). Bump link size down slightly if it overflows on mobile.
- **Right column — availability + links:** raise `text-white/35`→`text-white/60` for the tagline;
  the "Links" heading `text-white/20`→`text-white/45`; each social row `text-white/40`→`text-white/70`.
  Keep the emerald Available dot.
- Ensure the whole sheet meets WCAG AA-ish contrast (no body text below ~`white/55`).

### 4.3 Global contrast pass (Task 15)
Across ALL components, raise the dullest text tiers (these are too dim). Apply this mapping to **text**
utilities on readable copy (NOT to decorative watermark numbers, grain, orbs, or hairline borders):
- `text-white/25` → `text-white/45`
- `text-white/30` → `text-white/50`
- `text-white/35` → `text-white/55`
- `text-white/40` → `text-white/55` (labels/meta)
- `text-white/45` → `text-white/60` (section descriptors)

**Exceptions (leave unchanged):** giant watermark index numbers (`text-white/[0.08]`), the `dec-*`
decoder readout muted tones (those are intentional data hierarchy), film grain opacity, orb alphas,
`border-white/[0.08]` hairlines. When in doubt about whether something is "readable copy" vs "decorative,"
leave it and note it.

**Acceptance:** menu is legible and on-theme with accent detailing; no body/label text on the site is
dimmer than ~`white/55`. Screenshot the open menu on both routes + 2-3 representative sections.

---

## 5. STATS BAND ALIGNMENT (Task 1) — Phase 1

**File `app/_components/Stats.tsx`.** Symptom (confirmed by owner): the big number and its mono label
below it don't share the same left edge — the mono label looks slightly indented relative to the number.
Cause: Geist Mono's per-glyph left side-bearing differs from Geist Sans (the number), so at the same box
origin the first glyphs don't optically line up. This is a roughly-constant offset (~1–2px) because all
labels use the same mono font.

**Fix (deterministic, with measurement):**
1. Run the dev server, open `/recruiters` at 1280px. In devtools measure
   `getBoundingClientRect().left` of a stat's number span vs its label div for 2–3 stats on each route.
   Compute the average pixel delta.
2. Apply a compensating negative left margin to the **label** (the mono one) equal to that delta, as a
   Tailwind arbitrary value, e.g. `-ml-[1px]` or `-ml-[2px]` — pick whichever makes the left edges align
   to within 1px across all 8 stat strings on both routes.
   - Target line: `<div className="font-mono text-xs uppercase tracking-wide text-white/55 mt-2 -ml-[Npx]">`
     (also note the `/45→/55` contrast bump from §4.3 applied here).
3. Re-measure to confirm ≤1px delta on both routes; screenshot both bands with a vertical guide showing
   number and label sharing the left edge.

> Do NOT change the font of the number or label. Do NOT center them. The band stays `md:text-left`.
> If a single constant can't satisfy all strings within 1px, prefer the value that aligns the majority and
> note the residual — do not add per-stat overrides.

---

## 6. REMOVE PROJECTS FROM RECRUITER TAB (Task 3) — Phase 1

Remove **SS BAZAR** and **Mission Control** from the recruiter route only. They stay on the client route.

**File `app/_data.ts`, `projects` array.** These cards have `order: { side, day }`. The recruiter route
renders projects sorted by `order.day`. To hide a card on recruiter only, the cleanest change:

1. In `app/_components/Work.tsx`, the `Work` component filters+sorts. Add a per-mode hidden flag rather
   than deleting data. Add an optional field to the `Project` type in `_data.ts`:
   ```ts
   /** Routes this card is hidden on (day = recruiter). Client keeps all. */
   hideOn?: Mode[];
   ```
2. On the SS BAZAR entry and the Mission Control entry, add: `hideOn: ["day"],`.
3. In `Work.tsx`:
   ```ts
   const ordered = [...projects]
     .filter((p) => !p.hideOn?.includes(mode))
     .sort((a, b) => a.order[mode] - b.order[mode]);
   ```
4. The recruiter `order.day` values currently are: Fintech-AI-Guard 1, AegisQA 2, AI-KB 3, SS BAZAR 4,
   Mission Control 5. After filtering, remaining recruiter cards are Fintech(1), AegisQA(2), AI-KB(3) —
   they'll render in that order and re-number 01/02/03 automatically (the index is positional). No further
   change needed. Client route unaffected (still shows all 5).

**Acceptance:** `/recruiters` Work section shows exactly 3 projects (Fintech-AI-Guard, AegisQA,
AI Knowledge Base), numbered 01–03. `/` still shows all 5. `tsc` clean.

---

## 7. SECTION RENAME (Task 5) — Phase 1

Make the Work section heading audience-specific.

**File `app/_components/Work.tsx`.** The heading is hardcoded `Selected<br />work`. Make it mode-aware:
- Recruiter (`mode === "day"`): **"Projects<br />I've shipped"**
- Client (`mode === "side"`): **"Things<br />I've built"**

```tsx
<h2 className="reveal-left text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none">
  {mode === "day" ? <>Projects<br />I&apos;ve shipped</> : <>Things<br />I&apos;ve built</>}
</h2>
```
Leave the right-side descriptor `<p>` copy as-is (Task 2 owns copy). (`reveal-left` per §3.4.)

**Acceptance:** headings read as above per route.

---

## 8. DECODER — MAKE IT WORK (Task 4) — Phase 1

**Decision (owner):** keep the "Initialize decoder / Standby" gate, but the decoder MUST actually decode
the seed, and there must be a real fallback for JS-off visitors.

Current bug: the engine is injected via `next/script strategy="afterInteractive"` (an inline
`dangerouslySetInnerHTML` string) and the decoded output panel keeps showing the placeholder
"Enable JavaScript to decode" even with JS enabled — i.e. the engine isn't binding/running.

### 8.1 Diagnose first
Run dev, open `/recruiters`, open the decoder (click "Initialize decoder"), open the browser console:
- Is a `<script id="decoder-engine">` present in the DOM? Did it execute? Any error?
- Does `document.getElementById("decoder-input")` exist when it runs?
Note the finding in the commit message. (Likely: the `afterInteractive` inline script isn't executing
reliably under this Next/React version — the same class of issue the repo already hit with raw `<script>`.)

### 8.2 Fix — run the engine from a tiny client island (reliable post-mount)
The pure parser already lives as one shared string `DECODER_SCRIPT` in `app/_decoder.js` (also used by the
node self-check — do NOT break that). Instead of `next/script`, execute that exact string from a minimal
client component in a `useEffect` (guaranteed to run after the DOM — including the textarea — exists).

1. **New file `app/_components/DecoderEngine.tsx`:**
   ```tsx
   "use client";
   import { useEffect } from "react";
   import { DECODER_SCRIPT } from "../_decoder";

   // Runs the shared decoder engine string once after mount. useEffect guarantees
   // #decoder-input/#decoder-output exist (they're server-rendered, kept mounted even
   // while DecoderReveal is visually collapsed). Replaces the unreliable next/script
   // afterInteractive injection. The engine self-wires input/reset listeners and does
   // the first render itself.
   export default function DecoderEngine() {
     useEffect(() => {
       // eslint-disable-next-line @typescript-eslint/no-implied-eval
       new Function(DECODER_SCRIPT)();
     }, []);
     return null;
   }
   ```
2. **File `app/_components/Decoder.tsx`:** remove the `import Script from "next/script"` and the
   `<Script id="decoder-engine" … />` element. Import and render `<DecoderEngine />` instead (place it at
   the end of the section, same spot).
   - Keep `SEED_HEX`, `ANNOTATIONS`, `DecoderReveal`, all markup.
3. **JS-off fallback:** in `Decoder.tsx`, change the initial output panel so the "enable JS" message lives
   in a real `<noscript>`, and the live `#decoder-output` starts effectively empty (the engine fills it on
   mount). Replace:
   ```tsx
   <div id="decoder-output" className="dec-output font-mono text-xs">
     <div className="dec-empty">Enable JavaScript to decode. The message above is the seed.</div>
   </div>
   ```
   with:
   ```tsx
   <div id="decoder-output" className="dec-output font-mono text-xs">
     <noscript><div className="dec-empty">Enable JavaScript to decode this message. The hex above is the seed.</div></noscript>
   </div>
   ```
   (The engine's `render()` overwrites `#decoder-output.innerHTML` on mount, so the noscript content is
   replaced when JS runs, and only shows when JS is off. Confirm the engine sets innerHTML
   unconditionally — it does: `output.innerHTML = renderToHtml(parseDump(input.value))`.)

> `new Function(DECODER_SCRIPT)()` runs the SAME code as before, just at a guaranteed-good time. The
> string still ends with the node-export hook guarded by `typeof globalThis.__DECODER_EXPORT__` — that's a
> no-op in the browser, safe. Do not edit `_decoder.js` logic. Do not touch `_decoder.selfcheck.mjs`;
> run `node app/_decoder.selfcheck.mjs` afterward to confirm it's still green (21+ asserts).

### 8.3 Verify
Open decoder → it immediately shows the decoded seed (MTI 0100, DE fields, EMV tags, and the two
"FAILS CERT" flags for the amount/currency mismatch). Edit the hex → output updates live. "Reset seed"
restores it. Screenshot the decoded output with the FAILS CERT flags visible.

**Acceptance:** decoder decodes on open with no user action beyond the existing Initialize click; JS-off
shows the noscript line; self-check still green; the client-island count rule in §0.6 holds (DecoderEngine
is an allowed new island).

---

## 9. CASE STUDY PAGE — MAKE IT WOW (Task 7) — Phase 4

**File `app/work/[slug]/page.tsx`** (+ globals.css, + optional 1 client island). Today: flat black,
static `<dl>` + prose. Add interactivity and a richer layout. Keep all copy (`caseStudies` in `_data.ts`)
verbatim.

Build these, in order:

### 9.1 Reading-progress bar (scroll-linked, pure CSS)
A 2px accent bar pinned to the top that fills as you scroll the article. Native scroll-driven:
```css
/* globals.css */
.read-progress { position: fixed; top: 0; left: 0; height: 2px; width: 100%; transform-origin: 0 50%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2)); z-index: 60; transform: scaleX(0); }
@supports (animation-timeline: scroll(root)) {
  .read-progress { animation: read-fill linear both; animation-timeline: scroll(root); }
}
@keyframes read-fill { from { transform: scaleX(0);} to { transform: scaleX(1);} }
```
Add `<div className="read-progress" aria-hidden />` at the top of the page's root `.site` div. (Firefox
without scroll-timeline just shows an empty bar — acceptable; or omit there. Reduced motion: leave it
static at scaleX(0) — add to reduced-motion block.)

### 9.2 Severity-coded readout (interactive readout card)
The `<dl>` readout currently is flat. Upgrade:
- Wrap it as a `tile tile--static` card (accent spotlight on hover, per §2).
- Color-code the SEVERITY row by its value: if the value contains "CRITICAL" → red
  (`text-red-400 border-red-400/40`), "HIGH" → amber (`text-amber-300`), else accent. Add a small
  colored dot before the SEVERITY value.
- Each readout row: on hover, the label slides right 2px and brightens (simple `transition`).
- Keep the label/value grid; raise value contrast to `text-white/90`.

### 9.3 Sticky section navigation + scrollspy (1 optional client island)
On wide screens, show a sticky left rail listing the section headings (`sections[].heading`), with the
active one highlighted as you scroll. This is the one place a small client island is justified.
- **New file `app/_components/CaseStudySpy.tsx` (`"use client"`)**: takes `headings: string[]`, renders a
  `position: sticky` list, uses one `IntersectionObserver` to set the active index, smooth-scrolls to the
  section on click (respect the fixed nothing — there's no fixed header on this route). Anchor targets:
  give each `<section>` in the prose an `id` = slugified heading; the spy links to `#id`.
- Layout: switch the prose block to a 2-col grid on `lg` (`lg:grid-cols-[200px_1fr]`), rail in col 1
  (sticky `top-24`), prose in col 2. On mobile, hide the rail (`hidden lg:block`).
- If you prefer zero new islands, a pure-CSS fallback is acceptable: a static (non-highlighting) sticky
  list of `<a href="#id">` links. Highlighting is the nice-to-have; the sticky nav is the requirement.

### 9.4 Section reveals + accent margin
- Give each prose `<section>` a left accent rule that draws down on enter: `border-l border-white/[0.08]
  pl-6` with the heading marker. Apply `reveal-left` to each section.
- The big headline (`h1`): apply the `hero-kinetic` weight animation (reuse the existing class) OR
  `reveal-scale`. The standfirst: `reveal`.

### 9.5 Living background (not flat black)
Add a faint animated layer behind the article so it's not dead black:
- Reuse the site's ambient orbs pattern (copy the orb `<div>`s from `Shell.tsx` into this page's root,
  `aria-hidden`, accent-tokened) + the `.grain` overlay (`<div className="grain" aria-hidden />`).
- Optionally a subtle fixed dotted/grid gradient at very low opacity. Keep it subtle — the article must
  stay readable.

### 9.6 Verify
Load `/work/trading-bot` and `/work/aegisqa`: progress bar fills on scroll; severity row is color-coded;
sticky section nav follows scroll; sections reveal; background has depth. Both must build + `tsc` clean.
Screenshot 2 case studies. Note: `/work/*` accent = recruiter blue/cyan? These pages don't set
`data-mode`. **Set `data-mode="day"`** on the case-study page root `.site` div so accents match the
recruiter context these link from.

---

## 10. PAYMENTS-LIFECYCLE ANIMATION — RECRUITER (Task 12) — Phase 5

New **dedicated, infinitely-looping** section on the recruiter route (`/recruiters`) that visualizes the
full card-payment lifecycle, pure CSS (evergreen `@keyframes`, no scroll dependency — same pattern as the
hero intro / marquee / existing flow-pulse). Recruiter dialect = full domain jargon is OK here.

### 10.1 Placement
In `app/recruiters/page.tsx`, add a new `<PaymentLifecycle />` section. Order: after `Skills`, before
`Work` (so: Experience → Skills → **PaymentLifecycle** → Work → Decoder → CaseStudyFeature). Confirm the
nav still reads well; do not add it to the nav links.

### 10.2 What it shows (the real lifecycle)
A horizontal track of stages with a "packet" traveling through, and the data transforming at each hop.
Stages (left→right), with a return leg:
1. **Cardholder / Card** — taps. Data: `PAN 4111…1111`, EMV chip generates **ARQC (9F26)**.
2. **Terminal (POS)** — builds the **ISO-8583 0100** auth request, DE55 carries EMV data.
3. **Acquirer** — routes to the scheme.
4. **Network (Visa/MC)** — switches to the issuer.
5. **Issuer** — validates ARQC, checks funds, returns **0110** with **approval code / ARPC**.
6. Response travels **back** the same path → Terminal prints **APPROVED**.
7. A separate, slower **Settlement / clearing** indicator (T+1) pulses at the bottom.

### 10.3 Build spec
- **New file `app/_components/PaymentLifecycle.tsx`** (server component, pure CSS animation, no client).
- Data: a local `const STAGES = [{ key, label, sub, tag }]` array (labels/tags are NEW strings you author
  here — that's allowed; keep them accurate and terse, e.g. label "Issuer", tag "9F26 → ARPC"). This is
  not the deferred copy — it's new technical labels for a new component.
- Markup: a `max-w-6xl` section with a heading (author a short accurate heading, e.g. "The round trip of
  a single tap") and a horizontal rail of 5 stage nodes (icons reuse `TransactionFlow`/`SkillIcon` set),
  a connecting line, and an animated packet.
- **Animation (CSS in globals.css):** a `.plc-packet` traveling `left: 0→100%` on the forward leg then a
  visual "response" packet returning `100→0`, looped seamlessly (design the keyframe so the end state
  equals the start state — no jump). Stage nodes light up in sequence (accent border/glow) timed to the
  packet passing (staggered `@keyframes` with `animation-delay` per node, all same duration, infinite).
  A data label above the packet cross-fades through the transforming values (PAN → ARQC → 0100 → 0110 →
  APPROVED) using opacity keyframes. Settlement bar at the bottom pulses on a slower independent loop.
- Total loop duration ~6–8s, `cubic-bezier` easing, `infinite`. Must loop with NO visible seam (first and
  last frame identical). This is the #1 acceptance criterion.
- All accent colors via tokens (will render blue/cyan on recruiter).
- Reduced-motion: freeze the packet hidden and show all stages in their resting state with the final
  "APPROVED" label visible (add to reduced-motion block).

### 10.4 Verify
On `/recruiters`, the section loops smoothly and seamlessly; stages light in sequence; data label
transforms; no jump at loop boundary; nothing moves under reduced-motion. Screenshot + confirm the loop
seam by watching 2 full cycles.

---

## 11. CLIENT "TAP YOUR CARD" REDESIGN (Task 14) — Phase 5

**File `app/_components/TransactionFlow.tsx`** (client route only). Current: a single dot slides across a
line — owner calls it "horrible." Replace with a proper, seamless, infinite-loop animation, plain-language
(NO jargon — this is the client dialect; keep the existing plain labels Card/Reader/Network/Bank from
`paymentFlowStations` in `_data.ts`, do not add EMV/ISO terms).

### 11.1 New animation design
A multi-stage looping sequence, pure CSS:
1. A **card** graphic taps a **reader** (a small tap/ripple pulse at the reader on contact).
2. A **request packet** travels Card → Reader → Network → Bank, lighting each station as it passes.
3. The **Bank** node pulses "checking," then a **response packet** travels back Bank → … → Reader.
4. The reader shows a green **✓ Approved**; brief hold; then everything resets and loops seamlessly.
- Keep the 4 stations and their icons/labels/descs exactly (from `paymentFlowStations`).
- Replace the single `.flow-pulse` dot with the staged packet(s) + station highlight sequence.
- Keep the status line, but drive it through the stages: "You tap" → "Sending…" → "Bank checks" →
  "Approved ✓", looping. (These 3–4 short status strings are new micro-labels for the animation states —
  allowed; keep them plain and short.)

### 11.2 Build
- CSS in globals.css: replace/extend the existing `.flow-pulse` + `.flow-status-*` keyframes with the new
  staged sequence. Design keyframes so the loop is seamless (start == end). ~5–6s loop, infinite.
- Station highlight: each station node gets an accent border/glow that turns on as the packet passes
  (staggered `animation-delay`, same duration, infinite) — reuse the tokened accent (violet on client).
- The reader "tap ripple" and the "✓ Approved" are opacity/scale keyframes timed into the sequence.
- Reduced motion: show the resting state with "Approved ✓" visible, no motion (update reduced-motion block;
  the existing `.flow-*` reduced-motion rules must be updated to match the new class names).

### 11.3 Verify
On `/`, the section plays a believable tap→request→approve→reset loop with no seam; stations light in
order; reduced-motion static. Screenshot + watch 2 cycles for the seam.

---

## 12. PHASE / AGENT ASSIGNMENT

Build in this ORDER (later phases depend on earlier tokens/CSS). Do NOT run phases in parallel — many
phases edit `globals.css` and shared components; parallel edits will conflict. One phase, verify, commit,
next phase.

- **Phase 0 — Foundation** (§1 theme tokens, §2 tile CSS + pointer script, §3.1–3.3 reveal/parallax CSS,
  §4.3 contrast tokens groundwork). Files: `globals.css`, `layout.tsx`, `Shell.tsx`.
- **Phase 1 — Structural/logic** (§4 menu+contrast, §5 stats, §6 remove cards, §7 rename, §8 decoder).
- **Phase 2 — Apply tile system** (§2.3 across all components).
- **Phase 3 — Scroll experience** (§3.4–3.6 apply reveal variants + project rows).
- **Phase 4 — Case study page** (§9).
- **Phase 5 — Payment animations** (§10 recruiter + §11 client).

Each phase: `tsc` + `build` + `lint` clean, real screenshots on both routes, commit on
`redesign-2026-07`, no push.

## 13. DEFERRED — Claude/Opus ONLY, DO NOT TOUCH
- **Task 2** (rewrite AI-sounding copy / remove em-dashes): reserved for Claude. No other agent edits
  prose in `_data.ts` or visible copy strings. The only text changes any agent makes are the exact
  ones named in this doc (§7 headings, and new labels for §10/§11 animations).

## 14. OUT OF SCOPE / LEAVE ALONE
- `app/v2/page.tsx` (leftover route) — do not touch.
- Orphaned images in `public/projects/` — leave.
- `CountUp`'s 1 pre-existing lint error — leave.
- Metadata/SEO/canonicals, sitemap, robots — leave.
- Thumbnails/`_data.ts` project data other than the `hideOn` field (§6) and `Project` type addition.
