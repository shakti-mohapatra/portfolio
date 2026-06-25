import type { Metadata } from "next";
import "./v2.css";

export const metadata: Metadata = {
  title: "Shakti M. — Developer & Designer (preview)",
  description:
    "Python automation, AI tools, web apps, and bots — designed and built end to end. Creative-studio redesign preview.",
  robots: { index: false, follow: false },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Force dark for the whole /v2 subtree before paint — no flash. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.add('dark')`,
        }}
      />
      {children}
    </>
  );
}
