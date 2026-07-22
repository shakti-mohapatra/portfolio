"use client";

import { ViewTransition } from "react";
import { useSyncExternalStore } from "react";

// Route-wide native View Transition (Shell.tsx) snapshots the whole outgoing/
// incoming page -- including the live WebGL hero and blurred ambient orbs --
// which is expensive enough to freeze real mobile/tablet GPUs for 4-6s on
// every / <-> /recruiters switch (2026-07-22 P0). Skip it there; desktop keeps
// the crossfade unchanged. This stays a separate client component (rather than
// putting "use client" on Shell.tsx itself) because Shell directly renders
// Server Components (Hero, Marquee, Stats, About, Contact, SiteHeader, Footer,
// PersonJsonLd) -- a Client Component can't import and instantiate those
// directly, only receive their already-rendered output as children.
function subscribe(callback: () => void) {
  const mq = window.matchMedia("(hover: none), (pointer: coarse), (max-width: 1024px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(hover: none), (pointer: coarse), (max-width: 1024px)").matches;
}

function getServerSnapshot() {
  return false;
}

export default function RouteTransitionWrapper({ children }: { children: React.ReactNode }) {
  const mobileLike = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (mobileLike) return <>{children}</>;

  return (
    <ViewTransition name="page-content" share="auto" enter="auto" default="none">
      {children}
    </ViewTransition>
  );
}
