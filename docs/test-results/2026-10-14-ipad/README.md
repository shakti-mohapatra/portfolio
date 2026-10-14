# iPad smoke test, 14 October 2026 (release v1.1.0)

Pre-release check before shipping v1.1.0. iPads were where the previous version broke: switching between `/` and `/recruiters` froze the page on real tablets. This run checks that the fix still holds and that the new content renders.

## How it was run

- Build: `npm run build`, served with `npm run start -- -p 3002`. Production build, not `next dev`.
- Script: [`tests/ipad_smoke.py`](../../../tests/ipad_smoke.py), Playwright 1.62 driving Chromium with the built-in iPad device profiles (touch and mobile emulation on, iPad viewport and user agent).
- Command: `python tests/ipad_smoke.py http://localhost:3002 docs/test-results/2026-10-14-ipad --gpu`
- `--gpu` puts Chromium on the real GPU (RTX 2060 through ANGLE/D3D11). Without it, headless Chromium renders WebGL in software, and the desktop path showed a fake 342 ms main-thread lag and missed route switches. With the GPU, that same path measured 2 ms.
- Raw output: [`results.json`](results.json). One hero and one Experience screenshot per profile are in this folder.

## What each profile checks

1. **Tablet gate.** `(hover: none), (pointer: coarse), (max-width: 1024px)` must match on touch iPads, so WebGL, Lenis and the native ViewTransition are skipped. The canvas must stay uninitialised and Lenis must be absent.
2. **Route switch stress.** Eight alternating taps on the header's For Clients / For Recruiters toggle, 450 ms apart. Every switch must land on the right route. Then the worst main-thread delay over the next second must stay under 100 ms.
3. **Menu anchors.** On both routes, open the menu, tap every in-page link, and wait for scrolling to stop. The section must sit under the 72 px fixed header (within 40 px) and the menu must close.
4. **Layout.** No horizontal overflow on either route.
5. **Content and assets.** `/recruiters` lists Stixis Technologies and Girmiti as March 2022 to August 2026. The resume PDF and the `/work/aegisqa` case study return 200.
6. **Errors.** No page errors, console errors or 4xx/5xx responses. The one exception is `/_vercel/insights/script.js`, which only exists on Vercel and always 404s locally.

## Results

| Profile | Viewport | Touch | Hero path | Route switches | Lag after (ms) | Anchors | Overflow | Errors | Result |
|---|---|---|---|---|---|---|---|---|---|
| iPad Mini | 768x1024 | yes | static | 8/8 | 2 | 8/8 | none | 0 | PASS |
| iPad Mini landscape | 1024x768 | yes | static | 8/8 | 2 | 8/8 | none | 0 | PASS |
| iPad (gen 11) | 656x944 | yes | static | 8/8 | 3 | 8/8 | none | 0 | PASS |
| iPad (gen 11) landscape | 944x656 | yes | static | 8/8 | 2 | 8/8 | none | 0 | PASS |
| iPad Pro 11 | 834x1194 | yes | static | 8/8 | 2 | 8/8 | none | 0 | PASS |
| iPad Pro 11 landscape | 1194x834 | yes | static | 8/8 | 2 | 8/8 | none | 0 | PASS |
| iPad Pro 12.9 | 1024x1366 | yes | static | 8/8 | 3 | 8/8 | none | 0 | PASS |
| iPad Pro 12.9 landscape | 1366x1024 | yes | static | 8/8 | 2 | 8/8 | none | 0 | PASS |
| iPad Air + trackpad (desktop path) | 1180x820 | no | desktop | 8/8 | 2 | 8/8 | none | 0 | PASS |

**9 of 9 profiles pass.**

The last row covers an iPad with a trackpad attached. A trackpad can make a wide iPad report a fine pointer, which puts it on the full desktop path with the live WebGL hero, Lenis and the ViewTransition. It is the same path every desktop browser takes.

## Defect found and fixed during this run

**Menu anchors landed 72 px too low on the desktop path.** On the first run every anchor on the trackpad profile put the section top at 144 px instead of 72 px, leaving an empty band under the header.

Root cause: Lenis 1.3.25 already subtracts `<html>`'s `scroll-padding-top` (72 px, set in `globals.css`) from anchor targets. `SmoothScroll.tsx` also passed `anchors: { offset: -72 }`, so the header height was counted twice. This affected every desktop visitor, not just iPads.

Fix: `anchors: true`, so Lenis reads the offset from CSS alone. After the fix, all 8 anchors on that profile pass.

## Earlier runs in this session, and why they did not count

- **Browser pane in the Claude desktop app.** It was used first, but the pane went to the background mid-run. With `visibilityState` hidden and zero animation frames per second, every smooth scroll stalled, so the anchor results from that run are invalid. The pane also returns blank screenshots on the desktop path.
- **First Playwright run, software WebGL.** The 8 touch profiles passed every functional check and were only flagged for the local Vercel Analytics 404, which is now excluded. The desktop path showed the software rendering artefact described above.

## Limits of this test

This is Chromium emulating iPad, not Safari on iPadOS. It proves the layout, the tablet gate, the route switching logic and the anchor behaviour under touch emulation. It does not prove WebKit rendering or real iPad GPU behaviour. A WebKit run (`playwright install webkit`) or a check on a real iPad is still the stronger proof, and the real-device confirmation of the original freeze fix is still owed.
