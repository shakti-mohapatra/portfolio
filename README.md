# Portfolio

Source for [my portfolio site](https://portfolio-xi-lilac-71.vercel.app) — Next.js 16 + React 19, two modes (client-facing `/` and recruiter-facing `/recruiters`), WebGL hero, the usual.

## Status

This repo tracks the **last shipped production build**. Active development has moved to a private repo — this one gets updated when something ships, not while it's being worked on.

In review: **v1.3.0** on branch `feat/orchestrator-flagship`. The Local AI Orchestrator becomes the flagship project on both routes, with a new lead case study. See the [CHANGELOG](CHANGELOG.md).

Current release: **v1.2.0** (14 October 2026). The designation is aligned with the appointment letter (Senior QA Engineer), the L3 scheme list and the Selenium wording are corrected, the "Available" pill is on the client route only, and the résumé PDF is ATS-safe. Before release it passed a 9-profile iPad smoke test. See [CHANGELOG.md](CHANGELOG.md) for every release.

Previous: fixed a P0 bug where switching between `/` and `/recruiters` froze the page for 4-6 seconds on real mobile/tablet devices (native View Transition snapshotting a live WebGL canvas + heavy blur while the canvas and scroll library both re-initialized mid-navigation).

## Versions and test evidence

- Each production release gets a `CHANGELOG.md` entry and a git tag (`v1.0.0`, `v1.1.0`, ...).
- Test results for each release are kept in `docs/test-results/`, with the raw output and screenshots.
- iPad smoke test (needs Python with `playwright`; run it against a production build):

```bash
npm run build && npm run start -- -p 3002
python tests/ipad_smoke.py http://localhost:3002 docs/test-results/<date>-ipad --gpu
```

## Stack

Next.js (App Router, Turbopack) · React 19 · Tailwind v4 · raw WebGL shader hero · Lenis smooth scroll

## Want to see the current work-in-progress build, or talk about a project?

The private repo has the in-progress redesign and everything that hasn't shipped yet. I'll happily add you as a collaborator if you're interested — just reach out:

- Email: [shaktidev.work@gmail.com](mailto:shaktidev.work@gmail.com)
- LinkedIn: [shakti-prasad-mohapatra](https://www.linkedin.com/in/shakti-prasad-mohapatra/)
- Fiverr: [shaktibuilds](https://www.fiverr.com/shaktibuilds)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.
