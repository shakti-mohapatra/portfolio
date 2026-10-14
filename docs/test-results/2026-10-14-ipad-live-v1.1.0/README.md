# Live production check, v1.1.0, 14 October 2026

Run right after Vercel reported the v1.1.0 deploy successful (commit `7df8aa8`).

`python tests/ipad_smoke.py https://portfolio-xi-lilac-71.vercel.app <out> --gpu`

**9 of 9 iPad profiles passed against the live site.** Raw output is in [`results.json`](results.json). Screenshots were not kept for this run, since they match the [pre-release run](../2026-10-14-ipad/README.md).

Shakti also opened the live site on his own iPad and reported it fine.
