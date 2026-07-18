"use client";
import { useEffect } from "react";
import { DECODER_SCRIPT } from "../_decoder";

// Runs the shared decoder engine string once after mount. useEffect guarantees
// #decoder-input/#decoder-output exist (they're server-rendered, kept mounted even
// while DecoderReveal is visually collapsed). Replaces the unreliable next/script
// afterInteractive injection. The engine self-wires input/reset listeners and does
// the first render itself.
export default function DecoderEngine() {
  useEffect(() => {
    new Function(DECODER_SCRIPT)();
  }, []);
  return null;
}
