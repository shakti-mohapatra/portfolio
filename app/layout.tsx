import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "./_data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Route-level metadata (title, description, keywords, openGraph, twitter,
// alternates.canonical) is set per-route in page.tsx / recruiters/page.tsx —
// PLAN §7. Everything here is the shared fallback + fields that don't vary.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Shakti Mohapatra — Freelance Developer | Python Automation, AI Tools & Web Apps",
  description:
    "Freelance developer specializing in Python automation, AI tools, bug fixes, and Discord/Telegram bots. Fast delivery, plain-English explanations, revisions until it works.",
  authors: [{ name: "Shakti Mohapatra" }],
  creator: "Shakti Mohapatra",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`dark ${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body>
        {children}
        <Analytics />
        {/* Progressive-enhancement fallback for browsers without
            animation-timeline (today: Firefox). Inline in the server layout —
            not a client island: no client directive, no React, no hydration.
            Returns immediately where native scroll-driven animation already
            works. See PLAN.md §6. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  if (window.CSS && CSS.supports && CSS.supports("animation-timeline", "view()")) return;
  document.documentElement.classList.add("js-reveal");

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
  document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-left-scale, .reveal-right-scale").forEach(function (el) { io.observe(el); });
})();

// Header hide-on-scroll — direction-based, runs in every browser (not just the
// animation-timeline fallback above). A pure scroll(root)-position timeline
// can only hide the header once and never bring it back until scroll returns
// near the very top, which stranded users with no way to reach the nav after
// scrolling past ~260px. This always reflects actual scroll direction instead.
(function(){
  // Re-query the header on every scroll tick rather than once at setup — mode
  // switching (/ <-> /recruiters) remounts <SiteHeader> inside its
  // ViewTransition boundary, so a header reference captured once goes stale
  // (detached DOM node, toggleAttribute becomes a silent no-op) after the
  // first client-side navigation.
  var lastY = window.scrollY;
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var header = document.querySelector("[data-header]");
      var y = window.scrollY;
      if (header) header.toggleAttribute("data-hidden", y > lastY && y > 140);
      lastY = y;
      ticking = false;
    });
  }, { passive: true });
})();

// Shared tile pointer script (redesign 2026-07 §2.2) — desktop/mouse only.
// Sets --mx/--my on every .tile for the cursor spotlight, and applies a small
// magnetic lift to .tile--interactive only. Progressive enhancement, not a
// client island. Skipped on touch and under reduced-motion.
(function(){
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var LIFT = 10;
  document.querySelectorAll(".tile").forEach(function (el) {
    var interactive = el.classList.contains("tile--interactive");
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left) + "px");
      el.style.setProperty("--my", (e.clientY - r.top) + "px");
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      // Fractional cursor position (-0.5..0.5), read by .tile-pull children in
      // globals.css so the text/icon inside a tile drifts + scales toward the
      // cursor, distinct from (smaller than) the whole-tile magnetic lift below.
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
      if (interactive) {
        el.style.transform = "translate(" + (x*LIFT).toFixed(1) + "px," + (y*LIFT - 3).toFixed(1) + "px)";
      }
    });
    el.addEventListener("mouseleave", function () {
      if (interactive) el.style.transform = "";
    });
  });
})();`,
          }}
        />
      </body>
    </html>
  );
}
