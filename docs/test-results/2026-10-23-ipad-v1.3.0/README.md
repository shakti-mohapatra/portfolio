# Release v1.3.0 checks, 23 October 2026

These checks ran before v1.3.0 (the Local AI Orchestrator as the flagship project) went up for review. They ran in a cloud container, not on the PC: there is no GPU and no Windows. That matters for one profile, explained below.

## 1. iPad smoke test

Same method as the [v1.2.0 run](../2026-10-14-ipad-v1.2.0/README.md), with one difference. A production build was served on port 3002, and `tests/ipad_smoke.py` ran on Playwright Chromium with the iPad device profiles, but **without `--gpu`**, because the container has no GPU. WebGL therefore renders in software (SwiftShader).

This release adds these checks to every profile:
- **Flagship leads Work:** the first project title in `#work` is "Local AI Orchestrator" on both `/` and `/recruiters`.
- **Report linked on both routes:** exactly one `#work` link to `/work/orchestrator` on each route.
- **Report and thumbnail served:** `/work/orchestrator` returns 200 and `/projects/orchestrator-1.webp` returns 200.
- A Work-section screenshot is saved for each profile (`*-work.jpg`).

| Profile | Viewport | Hero path | Route switches | Lag after (ms) | Anchors | Facts | Pill rule | Flagship | Errors | Result |
|---|---|---|---|---|---|---|---|---|---|---|
| iPad Mini | 768x1024 | static | 8/8 | 2 | 8/8 | yes | yes | yes | 0 | PASS |
| iPad Mini landscape | 1024x768 | static | 8/8 | 2 | 8/8 | yes | yes | yes | 0 | PASS |
| iPad (gen 11) | 656x944 | static | 8/8 | 2 | 8/8 | yes | yes | yes | 0 | PASS |
| iPad (gen 11) landscape | 944x656 | static | 8/8 | 6 | 8/8 | yes | yes | yes | 0 | PASS |
| iPad Pro 11 | 834x1194 | static | 8/8 | 1 | 8/8 | yes | yes | yes | 0 | PASS |
| iPad Pro 11 landscape | 1194x834 | static | 8/8 | 2 | 8/8 | yes | yes | yes | 0 | PASS |
| iPad Pro 12.9 | 1024x1366 | static | 8/8 | 3 | 8/8 | yes | yes | yes | 0 | PASS |
| iPad Pro 12.9 landscape | 1366x1024 | static | 8/8 | 4 | 8/8 | yes | yes | yes | 0 | PASS |
| iPad Air + trackpad (desktop path) | 1180x820 | desktop | no | 853 | 8/8 | yes | yes | yes | 0 | FAIL |

**8 of 9 profiles pass. The flagship checks pass on all 9.** Raw output is in [`results.json`](results.json), and the screenshots are in this folder.

### The one failure is the container, not this release

The desktop-path profile is the only one that runs the live WebGL hero. Without a GPU the shader renders in software, so the route-switch timing and the lag probe fail. To attribute it, the shipped **v1.2.0** build (tag `v1.2.0`) was built in the same container and run through v1.2.0's own smoke test with `--only "iPad Air + trackpad (desktop path)"`. It failed the same way: route switches not ok, 817 ms lag against 853 ms here. The same profile passed on 14 October with `--gpu` on real hardware (v1.2.0 report above). This release changes no WebGL, Lenis or transition code.

**Still owed before merging:** a `--gpu` run on the PC (`python tests/ipad_smoke.py http://localhost:3002 docs/test-results/<date>-ipad --gpu`), or a check on a real iPad, to confirm the desktop path on real hardware.

## 2. Desktop and phone

[`pages/`](pages/) holds screenshots at 1440x900 (desktop) and 390x844 (phone, 2x):
- `*-client-work.jpg`, `*-recruiters-work.jpg`: the Work section on each route, flagship first.
- `*-case-study-section-{1,4,6}.jpg`: `/work/orchestrator` scrolled to its first, fourth and last sections. The page reveals sections on scroll, so a single full-page capture shows them blank. The existing case studies behave the same way.

Horizontal overflow was checked on `/`, `/recruiters` and `/work/orchestrator` at both sizes: none. No page errors.

## 3. Build checks

- `npx tsc --noEmit`: clean.
- `npx eslint app/_data.ts app/_components/Work.tsx`: clean. A whole-app `eslint app` still reports two `react-hooks/set-state-in-effect` errors in `CountUp.tsx` and `HeroCanvas.tsx`. They fail on `main` too and are not part of this release.
- `npm run build`: green. `/work/orchestrator` is prerendered by `generateStaticParams`, and the sitemap includes it.
- Canonicals checked in the built HTML: `/` → site root, `/recruiters` → `/recruiters`, `/work/orchestrator` → `/work/orchestrator`. Each has its own title.
- The client route links the flagship report once, from its card. The recruiter route links it twice: from the card and from the Case studies section.

## Content covered by this release

- Local AI Orchestrator becomes project 01 on both routes, with a plain-English description on `/` and a technical one on `/recruiters`.
- Case study 01, "Every check passed. Search never worked." The existing case studies are renumbered 02 to 05.
- A thumbnail built from real output: frozen-suite verify, a 121-test pytest run and the recorded mutation report.
- Stat 5 → 6 projects shipped, plus the recruiter bio and skills line.
