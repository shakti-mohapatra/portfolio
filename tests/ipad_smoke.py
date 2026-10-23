"""iPad smoke test for the portfolio.

Drives a running build through Playwright's iPad device profiles (touch and
mobile emulation on, so `(pointer: coarse)` matches like a real iPad) and
checks the things that broke on tablets before: route switching between `/`
and `/recruiters`, the menu's in-page anchors, horizontal overflow, and the
tablet gate that skips WebGL, Lenis and the native ViewTransition. Also checks
release facts: designation, card schemes, the pill rule, and (v1.3.0) that the
orchestrator leads Work on both routes with its report linked.

Writes results.json and hero, Experience and Work screenshots per profile.

Usage (against a production build, not `next dev`):
    npm run build && npm run start -- -p 3002
    python tests/ipad_smoke.py http://localhost:3002 docs/test-results/<date>-ipad [--gpu] [--only NAME]

Exits non-zero if any profile fails.

Limitation: this is Chromium emulating iPad, not Safari on iPadOS. Real-device
or WebKit runs are still the stronger proof.
"""
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

GATE = "(hover: none), (pointer: coarse), (max-width: 1024px)"
LAG_PROBE = """() => new Promise(r => { let n = 0, max = 0, t = performance.now();
  const f = () => { const d = performance.now() - t - 16; max = Math.max(max, d); t = performance.now();
    if (++n < 60) setTimeout(f, 16); else r(Math.round(max)); }; setTimeout(f, 16); })"""
SETTLE = """async () => { let last = -1, stable = 0;
  for (let i = 0; i < 60 && stable < 4; i++) { await new Promise(r => setTimeout(r, 250));
    const y = Math.round(scrollY); stable = y === last ? stable + 1 : 0; last = y; } return last; }"""
ANCHOR_IDS = """() => [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href').slice(1))
  .filter((id, i, arr) => id && id !== 'hero' && arr.indexOf(id) === i && document.getElementById(id))"""


def profiles(devices):
    out = {name: devices[name] for name in (
        "iPad Mini", "iPad Mini landscape",
        "iPad (gen 11)", "iPad (gen 11) landscape",
        "iPad Pro 11", "iPad Pro 11 landscape",
    )}
    pro = devices["iPad Pro 11"]
    out["iPad Pro 12.9"] = {**pro, "viewport": {"width": 1024, "height": 1366}}
    out["iPad Pro 12.9 landscape"] = {**pro, "viewport": {"width": 1366, "height": 1024}}
    # iPad with a trackpad can report a fine pointer, which puts a wide iPad on
    # the desktop path (WebGL, Lenis, ViewTransition). Cover that path too.
    out["iPad Air + trackpad (desktop path)"] = {
        **devices["iPad (gen 11) landscape"], "has_touch": False, "is_mobile": False,
        "viewport": {"width": 1180, "height": 820},
    }
    return out


def run_profile(browser, base, name, desc, outdir):
    ctx = browser.new_context(**desc)
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" and "Failed to load resource" not in m.text else None)
    page.on("response", lambda res: errors.append(f"HTTP {res.status} {res.url}") if res.status >= 400 and "/_vercel/" not in res.url else None)  # Vercel Analytics only exists on Vercel
    touch = desc.get("has_touch", False)
    press = (lambda loc: loc.tap()) if touch else (lambda loc: loc.click())

    page.goto(base + "/", wait_until="networkidle")
    page.wait_for_timeout(2000)
    r = {
        "viewport": f'{desc["viewport"]["width"]}x{desc["viewport"]["height"]}',
        "touch": touch,
        "gate": page.evaluate(f"() => matchMedia('{GATE}').matches"),
        "lenis": page.evaluate("() => document.documentElement.className.includes('lenis')"),
        "webgl_running": page.evaluate("() => (document.querySelector('canvas')?.width ?? 300) !== 300"),
    }

    # Route switch stress: 8 alternating switches, 450 ms apart.
    seq = []
    for _ in range(8):
        target = "/recruiters" if page.evaluate("location.pathname") == "/" else "/"
        press(page.locator(f'header a[href="{target}"]:visible').first)
        page.wait_for_timeout(450)
        seq.append(page.evaluate("location.pathname"))
    page.wait_for_timeout(1500)
    r["switches_ok"] = seq == ["/recruiters", "/"] * 4
    r["lag_after_switches_ms"] = page.evaluate(LAG_PROBE)

    # Menu anchors on both routes.
    anchors, overflow = {}, {}
    for route in ("/recruiters", "/"):
        page.goto(base + route, wait_until="networkidle")
        page.wait_for_timeout(1000)
        overflow[route] = page.evaluate("document.documentElement.scrollWidth > innerWidth")
        for aid in page.evaluate(ANCHOR_IDS):
            page.evaluate(f"history.replaceState(null, '', '{route}'); scrollTo({{top: 0, behavior: 'instant'}})")
            page.wait_for_timeout(300)
            btn = page.locator('[aria-label="Toggle menu"]')
            press(btn)
            page.wait_for_timeout(500)
            link = page.locator(f'a[href="#{aid}"]:visible').first
            if link.count() == 0:
                press(btn)
                continue
            press(link)
            page.evaluate(SETTLE)
            top = page.evaluate(f"Math.round(document.getElementById('{aid}').getBoundingClientRect().top)")
            at_bottom = page.evaluate("scrollY + innerHeight >= document.documentElement.scrollHeight - 2")
            closed = btn.get_attribute("aria-expanded") == "false"
            anchors[f"{route}#{aid}"] = "ok" if (abs(top - 72) <= 40 or at_bottom) and closed else f"FAIL top={top} closed={closed}"
    r["overflow_x"] = overflow
    r["anchors"] = anchors

    # Content and assets.
    page.goto(base + "/recruiters", wait_until="networkidle")
    page.wait_for_timeout(1500)
    body = page.inner_text("body")
    r["stixis_listed"] = "Stixis Technologies" in body and "March 2022 – August 2026" in body
    # v1.2.0 facts: official designation, Discover (not Diners Club), Available pill on client route only.
    r["facts_ok"] = "Senior QA Engineer" in body and "Senior Software QA" not in body and "Diners" not in body and "Discover" in body
    header_has_pill = "() => document.querySelector('header').textContent.includes('Available')"
    r["pill_hidden_recruiter"] = not page.evaluate(header_has_pill)
    r["resume_pdf"] = page.request.head(base + "/resume-shakti-mohapatra.pdf").status
    r["case_study"] = page.request.get(base + "/work/aegisqa").status
    # v1.3.0: the orchestrator leads Work on both routes, and its report is linked on both.
    first_project = "() => document.querySelector('#work h3')?.textContent.trim()"
    report_link = "() => document.querySelectorAll('#work a[href=\"/work/orchestrator\"]').length"
    flagship = {"/recruiters": [page.evaluate(first_project), page.evaluate(report_link)]}
    r["flagship_report"] = page.request.get(base + "/work/orchestrator").status
    r["flagship_thumb"] = page.request.head(base + "/projects/orchestrator-1.webp").status
    page.goto(base + "/", wait_until="networkidle")
    r["pill_shown_client"] = page.evaluate(header_has_pill)
    flagship["/"] = [page.evaluate(first_project), page.evaluate(report_link)]
    r["flagship"] = flagship
    r["flagship_ok"] = all(t == "Local AI Orchestrator" and n == 1 for t, n in flagship.values())
    page.goto(base + "/recruiters", wait_until="networkidle")
    page.wait_for_timeout(1500)

    slug = name.lower().replace(" ", "-").replace("(", "").replace(")", "").replace("+", "plus").replace(".", "")
    page.screenshot(path=str(outdir / f"{slug}-hero.jpg"), type="jpeg", quality=55)
    page.evaluate("document.getElementById('experience').scrollIntoView({behavior: 'instant'})")
    page.wait_for_timeout(1200)
    page.screenshot(path=str(outdir / f"{slug}-experience.jpg"), type="jpeg", quality=55)
    page.evaluate("document.getElementById('work').scrollIntoView({behavior: 'instant'})")
    page.wait_for_timeout(1200)
    page.screenshot(path=str(outdir / f"{slug}-work.jpg"), type="jpeg", quality=55)

    r["errors"] = errors
    expect_gate = touch or desc["viewport"]["width"] <= 1024
    r["pass"] = (
        r["gate"] == expect_gate
        and (not r["gate"] or (not r["lenis"] and not r["webgl_running"]))
        and r["switches_ok"]
        and r["lag_after_switches_ms"] < 100
        and not any(overflow.values())
        and all(v == "ok" for v in anchors.values())
        and r["stixis_listed"] and r["resume_pdf"] == 200 and r["case_study"] == 200
        and r["facts_ok"] and r["pill_hidden_recruiter"] and r["pill_shown_client"]
        and r["flagship_ok"] and r["flagship_report"] == 200 and r["flagship_thumb"] == 200
        and not errors
    )
    ctx.close()
    return r


def main():
    base = sys.argv[1].rstrip("/")
    outdir = Path(sys.argv[2])
    outdir.mkdir(parents=True, exist_ok=True)
    results = {}
    with sync_playwright() as p:
        # Headless Chromium renders WebGL in software (SwiftShader) by default, which
        # makes the desktop path (live shader hero) look far slower than it is.
        # --gpu switches it to the real GPU through ANGLE/D3D11 (Windows).
        gpu = ["--enable-gpu", "--use-angle=d3d11", "--ignore-gpu-blocklist"] if "--gpu" in sys.argv else []
        browser = p.chromium.launch(args=gpu)
        only = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else None
        for name, desc in profiles(p.devices).items():
            if only and only != name:
                continue
            results[name] = run_profile(browser, base, name, desc, outdir)
            print(f'{"PASS" if results[name]["pass"] else "FAIL"}  {name}', flush=True)
        browser.close()
    (outdir / "results.json").write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")
    sys.exit(0 if all(r["pass"] for r in results.values()) else 1)


if __name__ == "__main__":
    main()
