# Release v1.2.0 checks, 14 October 2026

Two checks ran before shipping v1.2.0: the iPad smoke test on a production build, and an ATS text extraction check on the updated résumé PDF.

## 1. iPad smoke test

Same method as the [v1.1.0 run](../2026-10-14-ipad/README.md): a production build served on port 3002, `tests/ipad_smoke.py` with `--gpu`, Playwright Chromium with the iPad device profiles.

This release adds three checks to every profile:
- **Facts:** `/recruiters` says "Senior QA Engineer", never "Senior Software QA", lists Discover, and never mentions Diners Club.
- **Pill hidden on recruiter route:** the header (including the menu sheet) has no "Available" text on `/recruiters`.
- **Pill shown on client route:** it is still there on `/`.

| Profile | Viewport | Hero path | Route switches | Lag after (ms) | Anchors | Facts | Pill rule | Errors | Result |
|---|---|---|---|---|---|---|---|---|---|
| iPad Mini | 768x1024 | static | 8/8 | 3 | 8/8 | yes | yes | 0 | PASS |
| iPad Mini landscape | 1024x768 | static | 8/8 | 2 | 8/8 | yes | yes | 0 | PASS |
| iPad (gen 11) | 656x944 | static | 8/8 | 2 | 8/8 | yes | yes | 0 | PASS |
| iPad (gen 11) landscape | 944x656 | static | 8/8 | 2 | 8/8 | yes | yes | 0 | PASS |
| iPad Pro 11 | 834x1194 | static | 8/8 | 3 | 8/8 | yes | yes | 0 | PASS |
| iPad Pro 11 landscape | 1194x834 | static | 8/8 | 2 | 8/8 | yes | yes | 0 | PASS |
| iPad Pro 12.9 | 1024x1366 | static | 8/8 | 2 | 8/8 | yes | yes | 0 | PASS |
| iPad Pro 12.9 landscape | 1366x1024 | static | 8/8 | 3 | 8/8 | yes | yes | 0 | PASS |
| iPad Air + trackpad (desktop path) | 1180x820 | desktop | 8/8 | 4 | 8/8 | yes | yes | 0 | PASS |

**9 of 9 profiles pass.** Raw output is in [`results.json`](results.json), with screenshots in this folder.

Shakti also checked the live v1.1.0 site on his own iPad and reported it fine. That run against the live URL (9 of 9 pass) is archived in [`../2026-10-14-ipad-live-v1.1.0/`](../2026-10-14-ipad-live-v1.1.0/results.json).

## 2. Résumé ATS extraction

**Reported problem:** text extracted from the PDF came out as `P R O F E S S I O N A L S U M M A R Y` and `EXPERIEN CE`.

**Reproduced:** PyMuPDF read the old PDF's heading as `PROFESS IONAL S UMMARY`.

**Root cause:** the section headings, and the name line, used expanded character spacing (`w:spacing` of 1.5 pt and 1 pt) together with Word's small caps formatting. Extractors read the widened gaps between letters as word breaks.

**Fix, in the source .docx:**
- Removed the character spacing from every run that had it.
- Typed the headings in real capitals instead of relying on caps formatting.
- Merged 38 pairs of adjacent runs that had identical formatting. Several words were split across two runs (for example `live m` and `arket`), which gives extractors another place to break a word.

**Result:** the PDF was re-exported from Word and read back with three extractors. Each check compares every extracted word against the words in the source document.

| Extractor | All 6 headings intact | Words that aren't in the source |
|---|---|---|
| PyMuPDF 1.28.0 | yes | none |
| pdfminer.six 20260107 | yes | none |
| pypdf 6.14.2 | yes | `JSO N`, `inclu ding`, `passe d`, `e ntry`, `a nd` |

The heading problem is gone in all three. pypdf still splits five body words. Those words sit in single runs with no special spacing. A PDF/A export from Word gave the same result, so this comes from pypdf's own spacing heuristic on Word 2010's glyph positioning, not from the document. The other two extractors read the same file cleanly.

## Content changes covered by this release

- The site and CV both use the official Stixis designation, **Senior QA Engineer**. Girmiti's role on the site now matches the CV: **Software Engineer-Quality Assurance**.
- Selenium appears only as browser UI automation, separate from the Python REST API testing, on both the site and the CV. BrowserStack was added to skills.
- Diners Club changed to Discover on the site.
- The "Available" pill shows on the client route only.
