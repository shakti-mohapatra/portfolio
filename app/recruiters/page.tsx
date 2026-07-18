import type { Metadata } from "next";
import Shell from "../_components/Shell";
import Work from "../_components/Work";
import CaseStudyFeature from "../_components/CaseStudyFeature";
import Experience from "../_components/Experience";
import Skills from "../_components/Skills";
import Decoder from "../_components/Decoder";

const title = "Shakti Mohapatra — QA Engineer, Payments & FinTech | Building AI";
const description =
  "Senior QA Engineer with 4+ years testing production payment systems — EMV, ISO-8583, L3 certification across five card schemes, for Verifone, Geidea, and Costco's North American fuel network. Now transitioning into GenAI & Agentic AI.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "QA engineer",
    "payments testing",
    "EMV",
    "ISO-8583",
    "L3 certification",
    "test automation",
    "LLM evaluation",
    "GenAI",
    "Bangalore",
  ],
  alternates: { canonical: "/recruiters" },
  openGraph: { title, description, url: "/recruiters", siteName: "Shakti Mohapatra", locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

// Recruiter route. The client/freelance audience lives at /. Recruiter mode
// used to show zero projects (PLAN's biggest career bug) — Work is now
// shared across both routes, reordered per audience via Project.order.
// Order (2026-07-18, Shakti): Experience + Skills lead the read, then the
// project grid, then the decoder as the interactive finale, then the case
// studies close it out before Contact.
export default function Recruiters() {
  return (
    <Shell mode="day">
      <Experience />
      <Skills />
      <Work mode="day" />
      <Decoder />
      <CaseStudyFeature />
    </Shell>
  );
}
