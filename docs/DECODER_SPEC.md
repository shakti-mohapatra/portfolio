# ISO-8583 / EMV TLV decoder — field-list spec (PLAN §3A, step 11)

**This is the "spec the field list first" pass PLAN §11 requires before the build
session. It is not the decoder. It defines exactly what the decoder parses, what
the seeded example is, and the short list of things only Shakti can confirm —
because inventing a "transaction I certified" or "a field I personally test"
would violate the never-invent-content rule as badly as a fake testimonial.**

Placement: `/recruiters` only. §1's dialect split — the decoder *proves* to a
recruiter; the transaction-flow visualizer (§3B, already shipped) *teaches* the
client. Zero jargon on `/`; full domain language here.

---

## 1. What it does

Paste a hex dump → it parses live and renders the breakdown in the mono layer.
Two input shapes, auto-detected:

- **ISO-8583 message** — MTI + bitmap(s) + data elements.
- **EMV TLV** — a tag-length-value stream (as found in ISO-8583 DE55/ICC data,
  or a raw terminal/kernel trace). Detected when the stream parses cleanly as
  BER-TLV and/or starts with a known EMV template tag.

Client-side, zero dependencies, seeded with a real-shaped example on load.

## 2. Architecture — and the island-count question (must resolve before build)

The interactive "paste your own" parse needs client-side JS. PLAN §2 + §10 #3
lock the site at **exactly 4 client islands**. Two ways to honour that:

- **Recommended — no new island.** Server-render the shell + the seeded example
  (parsed at build time), and drive live re-parsing with an **inline `<script>`**
  in the same pattern §6's animation fallback already uses (a plain `<script>`,
  not a `"use client"` component). Pure hex-string → parsed-struct → DOM; React
  buys nothing here. `grep -rln '"use client"' app/` stays at 4, §10 #3 holds.
- **Alternative — a 5th island.** A `"use client"` `Decoder.tsx`. Cleaner React,
  but it **revises a documented invariant**: PLAN §2's island list and §10 #3's
  "exactly 4" both move to 5. That is Shakti's call, not a silent change.

Default to the inline-script route unless Shakti wants the React version.

Parser must **fail soft**: malformed input annotates the offending field and
keeps parsing what it can — never a blank box, never a thrown error to the user.
(Same fail-closed spirit as §3C.) One runnable self-check ships with the parser:
feed the seed dump, assert every field below decodes to its expected value, and
assert the deliberately-malformed field (see §6) is flagged.

## 3. ISO-8583 field list (parse targets)

**MTI (4 digits)** — decode all four positions, not just echo them:
version · message class · message function · originator. Label the common ones
(`0100` auth request, `0110` auth response, `0200` financial request, `0210`
response, `0400`/`0420` reversal).

**Bitmap** — primary (DE 1–64) always; secondary (DE 65–128) when bit 1 is set.
Render as the list of *present* DE numbers, and show the raw hex + the decoded
bit positions so the mechanism is visible (structure you can see = the concept).

**Data elements** — the card-present authorization set (matches Shakti's AFD/POS
certification work). Each row: number · name · format · decoded value.

| DE | Name | Format |
|----|------|--------|
| 2  | Primary Account Number (PAN) | LLVAR n..19 |
| 3  | Processing code | n6 |
| 4  | Amount, transaction | n12 |
| 7  | Transmission date & time | n10 (MMDDhhmmss) |
| 11 | System trace audit number (STAN) | n6 |
| 12 | Time, local transaction | n6 |
| 13 | Date, local transaction | n4 |
| 14 | Expiration date | n4 |
| 18 | Merchant category code (MCC) | n4 |
| 22 | POS entry mode | n3 |
| 23 | Card sequence number | n3 |
| 25 | POS condition code | n2 |
| 35 | Track 2 data | LLVAR z..37 |
| 37 | Retrieval reference number | an12 |
| 38 | Authorization ID response | an6 |
| 39 | Response code | an2 |
| 41 | Card acceptor terminal ID | ans8 |
| 42 | Card acceptor ID code | ans15 |
| 43 | Card acceptor name / location | ans40 |
| 48 | Additional data (private) | LLLVAR ans.. |
| 49 | Currency code, transaction | n3 |
| 52 | PIN data | b64 |
| 55 | ICC / EMV data | LLLVAR b.. → parsed as EMV TLV (§4) |
| 64/128 | Message authentication code (MAC) | b64 |

Notes: mask the PAN (first 6 / last 4) on render — never display a full PAN even
for a synthetic one; it models the PCI habit and it's the right default. Decode
DE22 POS entry mode and DE25 condition code to their meanings (e.g. contactless
vs contact vs mag-stripe), since those are exactly the fields that decide the
flow he certifies.

## 4. EMV TLV tag list (parse targets)

BER-TLV: 1–2 byte tag, length, value; recurse into constructed (template) tags.
Decode at minimum:

| Tag | Name |
|-----|------|
| 4F | Application Identifier (AID) |
| 50 | Application Label |
| 82 | Application Interchange Profile (AIP) |
| 84 | Dedicated File (DF) Name |
| 95 | Terminal Verification Results (TVR) |
| 9A | Transaction Date |
| 9C | Transaction Type |
| 5F2A | Transaction Currency Code |
| 5F34 | PAN Sequence Number |
| 9F02 | Amount, Authorised |
| 9F03 | Amount, Other |
| 9F10 | Issuer Application Data (IAD) |
| 9F1A | Terminal Country Code |
| 9F26 | Application Cryptogram (ARQC/TC/AAC) |
| 9F27 | Cryptogram Information Data (CID) |
| 9F33 | Terminal Capabilities |
| 9F34 | CVM Results |
| 9F36 | Application Transaction Counter (ATC) |
| 9F37 | Unpredictable Number |

Bit-decode the two that carry the verdict: **95 (TVR)** and **82 (AIP)** — expand
the set bits to their meanings. **9F27 (CID)** → ARQC/TC/AAC. These are where a
cert engineer reads pass/decline, so they get the full decode, not just hex.

## 5. Seed example (proposed — needs Shakti's confirmation on the flow)

**Proposed default:** a **Visa contactless purchase authorization at an AFD /
fuel terminal** — squarely inside his verified experience (SmartCRIND / Costco
AFD, L3 Visa). A `0100` request carrying DE55 with a real-shaped EMV tag set
(AID `A0000000031010`, AIP, TVR, ARQC, ATC, unpredictable number, 9F02 amount,
5F2A/`0840` currency), plus a paired `0110` response so the response-code and
online-auth path show too.

**All values synthetic and clearly labelled as such** — test PAN `4111 11xx
xxxx 1111`, fabricated STAN/RRN, no real card data, no real merchant. This is
the "un-fakeable skill demo" *format*, not a real captured transaction.

**Confirm before building (Shakti):**
1. Is Visa contactless AFD the flow to model, or a better-representative one
   (Mastercard contact EMV? a settlement/reversal `0400`? a NEXO-shaped case)?
2. That the synthetic-values approach is right (it is, for a public site) vs any
   preference.

## 6. The "malformed field" flag (proposed — needs confirmation)

PLAN §3A: "flag a deliberately malformed field the way his job actually does."
This is the piece that turns a parser into a demonstration of judgement, and it
must reflect a check **he actually runs** — I won't invent which one.

**Proposed default (a classic cert/recon cross-check):** seed a mismatch between
the ISO-8583 amount/currency (DE4 / DE49) and the EMV amount/currency
(9F02 / 5F2A) — e.g. DE4 says one value, 9F02 another. The decoder flags it in
red mono with a one-line explanation of why that mismatch would fail
certification. Alternatives worth his pick: a TVR (tag 95) bit set that should
have forced a decline but the response code says approved; a CID/ARQC
inconsistency; a bad DE2 Luhn; a length byte that overruns the buffer.

**Confirm (Shakti):** which single malformed check is the most authentic to what
he flags on the job. Pick one — the annotation copy is written from his answer.

## 7. "Fields I personally test" annotations — needs Shakti's input

PLAN §3A: "annotate the fields he personally tests." A small mono aside on
~3–5 fields, in his voice, saying what he checks and why. I will **not** author
these as guesses. Candidate fields from his verified work (TVR, CID/cryptogram,
POS entry mode, currency/amount consistency, response code) — he picks which,
and gives one real line each, or approves drafts I write *from* his lines.

---

## Open decisions blocking the build session — RESOLVED 2026-07-18

1. **Island count** (§2) — ✅ **inline script.** Implemented via `next/script`
   (inline, `id`, `afterInteractive`) rather than a raw `<script>` — React 19
   will not execute a raw `<script>` rendered inside a nested component (verified:
   the seed did not decode until switched to `next/script`). `next/script` lives
   in `node_modules`, so `grep -rln '"use client"' app/` stays at exactly 4.
2. **Seed flow** (§5) — ✅ **Visa contactless AFD/fuel** `0100` auth, EMV in DE55.
   All-synthetic values (test PAN `4111…`, no real card/merchant).
3. **Malformed check** (§6) — ✅ **amount + currency mismatch**: DE4 (50.00) vs
   9F02 (60.00), and DE49 (840 USD) vs 5F2A (978 EUR). Both flagged as FAILS CERT.
4. **Field annotations** (§7) — ✅ **written and wired** (TVR 95, CID 9F26/9F27,
   POS entry DE22, amount/currency DE4·DE49 · 9F02·5F2A) in `app/_decoder.js`
   `ANNOTATIONS`, drafted from Shakti's verified background at his request,
   for his review/edit — not a guess presented as his own words without a
   review step.

The field *list* (§3, §4) is settled and standard — no confirmation needed there.

**Build artifacts:** `app/_decoder.js` (engine, single source), `app/_components/
Decoder.tsx` (server shell + `next/script`), `app/_decoder.selfcheck.mjs`
(runnable: `node app/_decoder.selfcheck.mjs`), decoder CSS in `app/globals.css`,
placed on `/recruiters` only.
