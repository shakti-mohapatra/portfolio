# Portfolio

Source for [my portfolio site](https://portfolio-xi-lilac-71.vercel.app) — Next.js 16 + React 19, two modes (client-facing `/` and recruiter-facing `/recruiters`), WebGL hero, the usual.

## Status

This repo tracks the **last shipped production build**. Active development has moved to a private repo — this one gets updated when something ships, not while it's being worked on.

Latest: fixed a P0 bug where switching between `/` and `/recruiters` froze the page for 4-6 seconds on real mobile/tablet devices (native View Transition snapshotting a live WebGL canvas + heavy blur while the canvas and scroll library both re-initialized mid-navigation).

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
