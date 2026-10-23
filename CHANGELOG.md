# Changelog

Every release that reaches production gets an entry here and a matching git tag (`vX.Y.Z`). Newest first.

Versioning: **major** for a redesign or structural change, **minor** for new content or features, **patch** for fixes only. Test evidence for a release lives in `docs/test-results/`.

## v1.3.0, unreleased (on branch `feat/orchestrator-flagship`, awaiting Shakti's review)

Merging this branch to `main` deploys it. Tag `v1.3.0` on the merge commit.

**Content**
- New flagship project, **Local AI Orchestrator**, first on both routes. It is a coding pipeline that runs a 35B model on one 6 GB GPU and verifies every step the model writes. The client route gets a plain-English description (`descPlain`), and the recruiter route gets the technical one. Every figure comes from the orchestrator repo's own records.
- New case study **01, "Every check passed. Search never worked."**, in the existing defect-report format. It covers the first real job the orchestrator built, which reported green while the program never terminated, and the unsatisfiable spec that broke search in 4 of 4 builds. The existing case studies move to 02 to 05, with their order and text unchanged.
- The flagship's "Read the report" link also shows on the client route. Other cards keep it on the recruiter route only (new optional `reportOn` field on `Project`).
- Other cards moved down one place on each route. Their relative order is unchanged.
- Client stat "Real projects shipped" went from 5 to 6. The recruiter bio names the orchestrator, and the "Now Learning" skills gain "Local LLMs (llama.cpp)".
- New thumbnail `public/projects/orchestrator-1.webp` (1920x1440, WebP q84). It shows the pipeline next to real output: the frozen-suite verify, a 121-test pytest run and the recorded mutation report. None of it is mocked.

**Testing**
- `tests/ipad_smoke.py` now checks that the orchestrator leads Work on both routes and that its report is linked from both, that `/work/orchestrator` returns 200, and that the thumbnail returns 200. It also saves a Work screenshot per profile.
- Pre-release checks: tsc clean, eslint clean on changed files, production build green, canonical tags checked in the built HTML.
- iPad smoke test in a cloud container without a GPU: 8 of 9 profiles pass, and the flagship checks pass on all 9. The desktop-path profile fails on software-rendered WebGL. Shipped v1.2.0 fails it the same way in the same container (817 ms lag against 853 ms), so it is the environment, not this release. A `--gpu` run on the PC is still owed. Report and desktop/phone screenshots: [`docs/test-results/2026-10-23-ipad-v1.3.0/`](docs/test-results/2026-10-23-ipad-v1.3.0/README.md).

## v1.2.0, 14 October 2026

**Content**
- Designation now matches the Stixis appointment letter, **Senior QA Engineer**, on the Experience entry, the DRB text and the contact card. It was "Senior Software QA Engineer". Girmiti's role now matches the CV and the official title: **Software Engineer-Quality Assurance, Payments & FinTech**.
- L3 scheme list corrected from Diners Club to **Discover**, in About and in the certification entry, matching the CV.
- Selenium is now described only as browser UI automation, separate from the Python REST API testing, in the Sensei Sigma entry and the recruiter skills. **BrowserStack** was added to skills.
- The "Available" pill in the header and menu now shows on the client route only.
- Résumé PDF updated. It uses the same designation and the Selenium/BrowserStack wording. The ATS problem is fixed: section headings used expanded letter spacing, so they extracted as "PROFESS IONAL S UMMARY".

**Testing**
- `tests/ipad_smoke.py` now also checks the designation, Discover vs Diners, and the pill rule per route.
- Pre-release: 9 of 9 iPad profiles pass. The résumé headings extract cleanly in PyMuPDF, pdfminer and pypdf. Report: [`docs/test-results/2026-10-14-ipad-v1.2.0/`](docs/test-results/2026-10-14-ipad-v1.2.0/README.md).
- The live check of v1.1.0 (9 of 9 pass) is archived in `docs/test-results/2026-10-14-ipad-live-v1.1.0/`.

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
