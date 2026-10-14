# Changelog

Every release that reaches production gets an entry here and a matching git tag (`vX.Y.Z`). Newest first.

Versioning: **major** for a redesign or structural change, **minor** for new content or features, **patch** for fixes only. Test evidence for a release lives in `docs/test-results/`.

## v1.1.0, 14 October 2026

**Content**
- Experience now lists employers newest first. Added **Stixis Technologies Pvt Ltd**, Senior Software QA Engineer, October 2026 to Present, with the **DRB** client engagement (a Vontier company). DRB's scope is a placeholder until knowledge transfer starts.
- Girmiti Softwares end date set to **August 2026** (was "Present").
- Recruiter contact copy no longer reads as job hunting. Role is now "Senior Software QA Engineer", the subheading talks about payments QA, test automation and evaluating AI systems, and "Open to new opportunities right now" became "Usually replies within a day".
- Résumé PDF replaced with the updated Global CV, which includes Stixis. It now runs to 3 pages.

**Fixes**
- Menu anchor links on the desktop path (Lenis) landed 72 px too low because the header offset was applied twice. `SmoothScroll.tsx` now uses `anchors: true` and takes the offset from the CSS `scroll-padding-top` alone.

**Code**
- `experience` in `app/_data.ts` is now `experience.companies[]`. `Experience.tsx` renders the existing company header and timeline once per company. There's no visual redesign.

**Testing**
- Added `tests/ipad_smoke.py`, a Playwright iPad smoke test covering route switch stress, menu anchors, overflow, the tablet gate and content checks.
- Pre-release run: 9 of 9 iPad profiles pass. Report: [`docs/test-results/2026-10-14-ipad/`](docs/test-results/2026-10-14-ipad/README.md).

## v1.0.0, baseline

Tag placed on `47292e4`, the production build live before v1.1.0. It covers everything up to that point: the July 2026 redesign (client and recruiter routes, WebGL hero, case studies), the mobile and tablet route-switch freeze fix (`e97842f`), the contact layout and WebGL retry fixes, and the 2-page résumé PDF. Full history is in `git log` and `docs/PROGRESS.md`.
