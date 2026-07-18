// ISO-8583 / EMV TLV decoder engine (PLAN §3A, DECODER_SPEC.md). ONE source of
// truth: the parser + renderer live here as a string (DECODER_SCRIPT) so the
// exact same code runs in the browser (inline <script> in Decoder.tsx) and in
// Node (_decoder.selfcheck.mjs, via new Function). No parser duplication on a
// money path. SEED_HEX is interpolated in, so there's a single seed literal.
//
// ponytail: engine authored as a string, not an ESM module, on purpose — it has
// two runtimes (browser DOM + node self-check) and stringify-once is the lazy
// way to keep them identical. If a third consumer appears, extract to a real
// module then.

// Synthetic Visa contactless AFD/fuel 0100 authorization (decision: seed flow).
// All values fabricated test data — test PAN 4111…, no real card/merchant.
// Deliberate malformed field baked in: DE4 amount (50.00) disagrees with EMV
// 9F02 (60.00) and DE49 currency (840 USD) disagrees with 5F2A (978 EUR).
export const SEED_HEX =
  "0100723c448000c0820016411111111111111100300000000000500007181230450001231230450718281255420071004146443030313233434f5354434f303030303041464431084001204f07a0000000031010500b564953412043524544495482023900950500000080009a032507189c01009f02060000000060005f2a0209789f1a0208409f3303e0f8c89f34031e03009f3602001e9f3704a1b2c3d49f10120110a00003220000000000000000000000ff9f260811223344556677889f270180";

// "Fields I personally test" annotations (decision: TVR 95, CID 9F26/9F27,
// POS entry DE22, amount/currency DE4·DE49 · 9F02·5F2A). TEXT IS SHAKTI'S —
// left empty until he gives one real line per field; a blank string renders
// nothing (never faked). Keyed by the row id the renderer uses.
export const ANNOTATIONS = {
  "de22": "This tells me how the card was actually presented, contactless, chip, or stripe. I check it against what the terminal is capable of, because a mismatch here is one of the fastest ways to fail a certification run.",
  "de4de49": "I cross check the ISO amount and currency against what the chip actually signed. They have to match exactly. If they do not, the issuer approved one number and the acquirer settles a different one, and that gap is real money.",
  "95": "This is where I check if the terminal actually caught what it was supposed to catch. If a bit is set that should force a decline but the response code still says approved, that mismatch is the first thing I flag.",
  "9f27": "I match the cryptogram type against the outcome. An ARQC that never goes online, or a TC on something that should have gone online, means the kernel decision logic is broken somewhere.",
};

export const DECODER_SCRIPT = `(function () {
  var SEED = ${JSON.stringify(SEED_HEX)};
  var ANN = ${JSON.stringify(ANNOTATIONS)};

  var hx = function (s) { return (s || "").replace(/[^0-9a-fA-F]/g, "").toLowerCase(); };
  var asciiFromHex = function (h) { var s = ""; for (var i = 0; i < h.length; i += 2) s += String.fromCharCode(parseInt(h.slice(i, i + 2), 16)); return s; };
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };

  var DE = {
    2:  { name: "Primary Account Number (PAN)", t: "llvar-n" },
    3:  { name: "Processing code", t: "n", len: 6 },
    4:  { name: "Amount, transaction", t: "n", len: 12 },
    7:  { name: "Transmission date & time", t: "n", len: 10 },
    11: { name: "System trace audit number (STAN)", t: "n", len: 6 },
    12: { name: "Time, local transaction", t: "n", len: 6 },
    13: { name: "Date, local transaction", t: "n", len: 4 },
    14: { name: "Expiration date", t: "n", len: 4 },
    18: { name: "Merchant category code (MCC)", t: "n", len: 4 },
    22: { name: "POS entry mode", t: "n", len: 3 },
    25: { name: "POS condition code", t: "n", len: 2 },
    41: { name: "Card acceptor terminal ID", t: "ans", len: 8 },
    42: { name: "Card acceptor ID code", t: "ans", len: 15 },
    49: { name: "Currency code, transaction", t: "n", len: 3 },
    55: { name: "ICC / EMV data", t: "lllvar-b" }
  };
  var EMV = {
    "4f": "Application Identifier (AID)", "50": "Application Label", "82": "Application Interchange Profile (AIP)",
    "84": "Dedicated File (DF) Name", "95": "Terminal Verification Results (TVR)", "9a": "Transaction Date",
    "9c": "Transaction Type", "5f2a": "Transaction Currency Code", "5f34": "PAN Sequence Number",
    "9f02": "Amount, Authorised", "9f03": "Amount, Other", "9f10": "Issuer Application Data (IAD)",
    "9f1a": "Terminal Country Code", "9f26": "Application Cryptogram", "9f27": "Cryptogram Information Data (CID)",
    "9f33": "Terminal Capabilities", "9f34": "CVM Results", "9f36": "Application Transaction Counter (ATC)",
    "9f37": "Unpredictable Number"
  };
  var CCY = { "840": "USD", "978": "EUR", "356": "INR", "826": "GBP", "036": "AUD" };

  var maskPan = function (p) { return p.length > 10 ? p.slice(0, 6) + Array(p.length - 9).join("\\u2022") + p.slice(-4) : p; };
  var fmtAmt = function (bcd) { var n = parseInt(bcd, 10); return isNaN(n) ? bcd : (n / 100).toFixed(2); };

  var decodeMti = function (mti) {
    var known = { "0100": "Authorization request", "0110": "Authorization response", "0200": "Financial request", "0210": "Financial response", "0400": "Reversal request", "0420": "Reversal advice" };
    var cls = { "1": "Authorization", "2": "Financial", "4": "Reversal" }[mti[1]] || "class " + mti[1];
    return { label: known[mti] || cls + " message" };
  };
  var decodePosEntry = function (v) {
    var m = { "05": "chip / contact EMV", "07": "contactless EMV", "01": "manual keyed", "02": "magnetic stripe", "90": "full magnetic-stripe read" };
    return m[v.slice(-3, -1)] || "entry mode " + v;
  };
  var bitmapPresent = function (h16, off) {
    var out = [];
    for (var i = 0; i < 8; i++) { var byte = parseInt(h16.slice(i * 2, i * 2 + 2), 16); for (var j = 0; j < 8; j++) if (byte & (0x80 >> j)) out.push(off + i * 8 + j + 1); }
    return out;
  };

  var TVR_LABELS = [
    ["Offline data auth not performed", "SDA failed", "ICC data missing", "Card on exception file", "DDA failed", "CDA failed", "", ""],
    ["ICC/terminal app version different", "Expired application", "Application not yet effective", "Requested service not allowed", "New card", "", "", ""],
    ["Cardholder verification failed", "Unrecognised CVM", "PIN try limit exceeded", "PIN required, no pinpad", "PIN required, not entered", "Online PIN entered", "", ""],
    ["Transaction exceeds floor limit", "Lower offline limit exceeded", "Upper offline limit exceeded", "Randomly selected online", "Merchant forced online", "", "", ""],
    ["Default TDOL used", "Issuer authentication failed", "Script failed before final GEN AC", "Script failed after final GEN AC", "", "", "", ""]
  ];
  var decodeTvr = function (h) {
    var b = h.match(/.{2}/g) || []; var set = [];
    b.forEach(function (x, i) { var byte = parseInt(x, 16); for (var j = 0; j < 8; j++) if ((byte & (0x80 >> j)) && TVR_LABELS[i] && TVR_LABELS[i][j]) set.push(TVR_LABELS[i][j]); });
    return set.length ? set.join("; ") : "all checks clear";
  };
  var AIP_LABELS = ["", "SDA supported", "DDA supported", "Cardholder verification supported", "Terminal risk management", "Issuer authentication supported", "", "CDA supported"];
  var decodeAip = function (h) {
    var byte = parseInt(h.slice(0, 2), 16); var set = [];
    for (var j = 0; j < 8; j++) if ((byte & (0x80 >> j)) && AIP_LABELS[j]) set.push(AIP_LABELS[j]);
    return set.join("; ") || "none";
  };
  var decodeCid = function (h) {
    var b = parseInt(h, 16) & 0xc0;
    return b === 0x40 ? "TC — offline approved" : b === 0x80 ? "ARQC — online authorization requested" : b === 0x00 ? "AAC — declined" : "RFU";
  };

  var parseEmv = function (h) {
    var tags = [], flags = [], p = 0, guard = 0;
    while (p < h.length && guard++ < 200) {
      var tag = h.slice(p, p + 2); p += 2;
      if (tag && (parseInt(tag, 16) & 0x1f) === 0x1f) { tag += h.slice(p, p + 2); p += 2; }
      if (p >= h.length) { flags.push({ field: tag.toUpperCase(), msg: "tag has no length byte — stream ends mid-tag" }); break; }
      var len = parseInt(h.slice(p, p + 2), 16); p += 2;
      if (len & 0x80) { var n = len & 0x7f; len = parseInt(h.slice(p, p + n * 2), 16); p += n * 2; }
      var val = h.slice(p, p + len * 2); p += len * 2;
      if (val.length < len * 2) flags.push({ field: tag.toUpperCase(), msg: "value truncated — length claims " + len + " bytes, buffer is shorter" });
      var lt = tag.toLowerCase();
      var row = { tag: tag.toUpperCase(), name: EMV[lt] || "(unknown tag)", value: val.toUpperCase() };
      if (lt === "50") row.decode = asciiFromHex(val);
      else if (lt === "95") row.decode = decodeTvr(val);
      else if (lt === "82") row.decode = decodeAip(val);
      else if (lt === "9f27") row.decode = decodeCid(val);
      else if (lt === "9f02" || lt === "9f03") row.decode = fmtAmt(val);
      else if (lt === "5f2a" || lt === "9f1a") { var c = String(parseInt(val, 10)); row.decode = CCY[c] ? c + " (" + CCY[c] + ")" : c; }
      row.ann = ANN[lt] || "";
      tags.push(row);
    }
    return { tags: tags, flags: flags };
  };

  var parseIso = function (h) {
    var out = { format: "ISO-8583", mti: null, mtiDecode: null, present: [], fields: [], emv: null, flags: [] };
    var p = 0, take = function (n) { var s = h.slice(p, p + n); p += n; return s; };
    if (h.length < 20) { out.flags.push({ field: "message", msg: "too short to hold MTI + bitmap" }); return out; }
    out.mti = take(4); out.mtiDecode = decodeMti(out.mti);
    var b1 = take(16); out.primaryBitmap = b1;
    var present = bitmapPresent(b1, 0);
    if (present.indexOf(1) !== -1) { var b2 = take(16); out.secondaryBitmap = b2; present = present.filter(function (x) { return x !== 1; }).concat(bitmapPresent(b2, 64)); }
    present.sort(function (a, b) { return a - b; });
    out.present = present;
    var de4 = null, de49 = null;
    for (var i = 0; i < present.length; i++) {
      var num = present[i], spec = DE[num];
      if (!spec) { out.fields.push({ de: num, name: "(unsupported DE)", value: "\\u2014" }); continue; }
      var value, raw;
      if (spec.t === "n") { raw = take(spec.len % 2 ? spec.len + 1 : spec.len); value = raw; }
      else if (spec.t === "llvar-n") { var l = parseInt(take(2), 10); if (isNaN(l)) { out.flags.push({ field: "DE" + num, msg: "unreadable length prefix" }); break; } raw = take(l % 2 ? l + 1 : l); value = raw.slice(0, l); }
      else if (spec.t === "ans") { raw = take(spec.len * 2); value = asciiFromHex(raw).replace(/\\s+$/, ""); }
      else if (spec.t === "lllvar-b") { var lb = parseInt(take(4), 10); if (isNaN(lb)) { out.flags.push({ field: "DE" + num, msg: "unreadable length prefix" }); break; } raw = take(lb * 2); value = raw; if (raw.length < lb * 2) out.flags.push({ field: "DE" + num, msg: "ICC data truncated — length claims " + lb + " bytes" }); }
      else { raw = ""; value = ""; }
      var row = { de: num, name: spec.name, value: value };
      if (num === 2) row.value = maskPan(value);
      else if (num === 4) { row.decode = fmtAmt(value); de4 = value; }
      else if (num === 49) { var cc = String(parseInt(value, 10)); row.decode = CCY[cc] ? CCY[cc] : "code " + cc; de49 = value; }
      else if (num === 22) { row.decode = decodePosEntry(value); row.ann = ANN["de22"]; }
      out.fields.push(row);
      if (num === 55) out.emv = parseEmv(raw);
    }
    if (out.emv) {
      var t = function (tag) { for (var k = 0; k < out.emv.tags.length; k++) if (out.emv.tags[k].tag.toLowerCase() === tag) return out.emv.tags[k].value; return null; };
      var a02 = t("9f02"), c2a = t("5f2a");
      if (de4 != null && a02 != null && parseInt(de4, 10) !== parseInt(a02, 10))
        out.flags.push({ field: "DE4 vs 9F02", ann: "de4de49", msg: "ISO amount " + fmtAmt(de4) + " \\u2260 EMV amount " + fmtAmt(a02) + ". The application cryptogram (9F26) signs 9F02, so the issuer approved a figure the acquirer will not settle. This fails certification." });
      if (de49 != null && c2a != null && parseInt(de49, 10) !== parseInt(c2a, 10))
        out.flags.push({ field: "DE49 vs 5F2A", ann: "de4de49", msg: "ISO currency " + parseInt(de49, 10) + " \\u2260 EMV currency " + parseInt(c2a, 10) + ". Same transaction, two currencies \\u2014 undefined settlement. Fails certification." });
    }
    return out;
  };

  var parseDump = function (input) {
    var h = hx(input);
    if (!h) return { format: "empty", fields: [], flags: [] };
    var looksEmv = /^(6f|70|77|80|9f|5f|4f|50|57|5a|82|84|95)/.test(h) && !/^0[12468]00/.test(h);
    if (looksEmv) { var e = parseEmv(h); return { format: "EMV TLV", emv: e, fields: [], flags: e.flags }; }
    return parseIso(h);
  };

  // ── struct → HTML (mono readout). Same classes styled in globals.css. ──
  var annHtml = function (text) { return text ? '<div class="dec-ann"><span class="dec-ann-tag">field I test</span>' + esc(text) + '</div>' : ''; };
  var rowHtml = function (k, v, decode, ann) {
    var s = '<div class="dec-row"><span class="dec-k">' + esc(k) + '</span><span class="dec-v">' + esc(v);
    if (decode) s += '<span class="dec-decode">' + esc(decode) + '</span>';
    s += '</span></div>';
    return s + annHtml(ann);
  };
  var renderToHtml = function (r) {
    if (r.format === "empty") return '<div class="dec-empty">Paste an ISO-8583 message or EMV TLV stream above.</div>';
    var s = '';
    s += '<div class="dec-badge">' + esc(r.format) + '</div>';
    if (r.mti) s += rowHtml("MTI", r.mti, r.mtiDecode ? r.mtiDecode.label : "", "");
    if (r.primaryBitmap) s += rowHtml("Bitmap", r.primaryBitmap + (r.secondaryBitmap ? " " + r.secondaryBitmap : ""), "DE " + (r.present || []).join(", "), "");
    if (r.fields && r.fields.length) {
      s += '<div class="dec-sub">Data elements</div>';
      for (var i = 0; i < r.fields.length; i++) { var f = r.fields[i]; s += rowHtml("DE" + f.de + " · " + f.name, f.value, f.decode, f.ann); }
    }
    if (r.emv && r.emv.tags.length) {
      s += '<div class="dec-sub">EMV — ICC data (DE55)</div>';
      for (var j = 0; j < r.emv.tags.length; j++) { var tg = r.emv.tags[j]; s += rowHtml(tg.tag + " · " + tg.name, tg.value, tg.decode, tg.ann); }
    }
    if (r.flags && r.flags.length) {
      s += '<div class="dec-flags">';
      for (var k = 0; k < r.flags.length; k++) { var fl = r.flags[k]; s += '<div class="dec-flag"><span class="dec-flag-h">FAILS CERT · ' + esc(fl.field) + '</span>' + esc(fl.msg) + '</div>'; }
      s += '</div>';
    }
    return s;
  };

  // Browser wiring (guarded so Node self-check can run the same code DOM-free).
  if (typeof document !== "undefined") {
    var render = function () {
      var input = document.getElementById("decoder-input");
      var output = document.getElementById("decoder-output");
      if (!input || !output) return;
      output.innerHTML = renderToHtml(parseDump(input.value));
    };
    var start = function () {
      var input = document.getElementById("decoder-input");
      if (!input) return;
      if (!input.value) input.value = SEED;
      input.addEventListener("input", render);
      var reset = document.getElementById("decoder-reset");
      if (reset) reset.addEventListener("click", function () { input.value = SEED; render(); });
      render();
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
    else start();
  }

  // Node test hook (self-check captures the pure functions; never runs in browser).
  if (typeof globalThis !== "undefined" && typeof globalThis.__DECODER_EXPORT__ === "function") {
    globalThis.__DECODER_EXPORT__({ parseDump: parseDump, renderToHtml: renderToHtml, SEED: SEED });
  }
})();`;
