// Runnable self-check for the decoder engine (PLAN §3A: "ships one runnable
// self-check — assert seed decodes + malformed field flagged"). Runs the SAME
// DECODER_SCRIPT the browser runs (no parser duplication): sets a Node export
// hook, executes the script DOM-free via new Function, asserts on the captured
// pure functions. Run: node app/_decoder.selfcheck.mjs  (exit 1 on failure).
import { DECODER_SCRIPT, SEED_HEX, DEFECT_SEED_HEX } from "./_decoder.js";

let api = null;
globalThis.__DECODER_EXPORT__ = (x) => { api = x; };
new Function(DECODER_SCRIPT)(); // no `document` in Node → DOM wiring is skipped
if (!api) { console.error("SELF-CHECK FAILED: engine did not export"); process.exit(1); }

const { parseDump } = api;
const fails = [];
const ok = (cond, label) => { if (!cond) fails.push(label); };

const r = parseDump(SEED_HEX);
ok(r.format === "ISO-8583", "format ISO-8583");
ok(r.mti === "0100", "MTI 0100");
ok(r.mtiDecode && r.mtiDecode.label === "Authorization request", "MTI decoded");
const f = (de) => r.fields.find((x) => x.de === de);
ok(f(2) && f(2).value.startsWith("411111") && f(2).value.endsWith("1111") && f(2).value.includes("•"), "DE2 PAN masked");
ok(f(4) && parseInt(f(4).value, 10) === 5000 && f(4).decode === "50.00", "DE4 amount 50.00");
ok(f(49) && parseInt(f(49).value, 10) === 840 && f(49).decode === "USD", "DE49 currency USD");
ok(f(22) && /contactless/.test(f(22).decode), "DE22 contactless EMV");
ok(f(41) && f(41).value === "AFD00123", "DE41 terminal id");
ok(f(42) && f(42).value === "COSTCO00000AFD1", "DE42 acceptor id");
ok(r.emv && r.emv.tags.length >= 15, "EMV tags parsed");
const et = (tag) => r.emv.tags.find((x) => x.tag.toLowerCase() === tag);
ok(et("4f") && et("4f").value === "A0000000031010", "AID");
ok(et("50") && et("50").decode === "VISA CREDIT", "app label VISA CREDIT");
ok(et("82") && /DDA supported/.test(et("82").decode), "AIP bit-decoded");
ok(et("95") && typeof et("95").decode === "string", "TVR bit-decoded");
// default seed decodes clean now (item 10, 2026-07-19): DE4/9F02 and DE49/5F2A agree
ok(et("9f02") && parseInt(et("9f02").value, 10) === 5000 && et("9f02").decode === "50.00", "9F02 amount 50.00 (matches DE4)");
ok(et("5f2a") && parseInt(et("5f2a").value, 10) === 840, "5F2A currency 840 (matches DE49)");
ok(et("9f27") && /ARQC/.test(et("9f27").decode), "CID ARQC");
ok(et("9f26") && et("9f26").value === "1122334455667788", "ARQC cryptogram");
ok(r.flags.length === 0, "default seed has no FAILS CERT flags");

// the deliberate malformed-field demo now lives behind "Load defect example" —
// same bytes as the pre-2026-07-19 default seed, still exercised here.
const dr = parseDump(DEFECT_SEED_HEX);
const det = (tag) => dr.emv.tags.find((x) => x.tag.toLowerCase() === tag);
ok(det("9f02") && parseInt(det("9f02").value, 10) === 6000 && det("9f02").decode === "60.00", "DEFECT: 9F02 amount 60.00");
ok(det("5f2a") && parseInt(det("5f2a").value, 10) === 978, "DEFECT: 5F2A currency 978");
ok(dr.flags.some((x) => x.field === "DE4 vs 9F02"), "DEFECT: amount mismatch flagged");
ok(dr.flags.some((x) => x.field === "DE49 vs 5F2A"), "DEFECT: currency mismatch flagged");
// fail-soft: garbage / partial input must never throw
let threw = false;
try { parseDump("zzz not hex"); parseDump("0100"); parseDump(""); parseDump("9f0203000001"); } catch { threw = true; }
ok(!threw, "fail-soft: no throw on bad input");
// EMV-only stream auto-detects
ok(parseDump("9f02060000000060005f2a020978").format === "EMV TLV", "EMV-only auto-detect");

if (fails.length) { console.error("SELF-CHECK FAILED:\n  - " + fails.join("\n  - ")); process.exit(1); }
console.log("decoder self-check: " + (25) + "+ assertions green — seed decodes, both malformed fields flagged, fail-soft holds");
