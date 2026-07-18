import { FIVERR_PROFILE, GITHUB, LINKEDIN, SITE_URL, type Mode } from "../_data";

// Machine Experience (PLAN §1): how an AI screener parses who he is, not decoration.
export default function PersonJsonLd({ mode }: { mode: Mode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shakti Mohapatra",
    url: mode === "day" ? `${SITE_URL}/recruiters` : SITE_URL,
    jobTitle: mode === "day" ? "QA Engineer — Payments & FinTech" : "Freelance Developer",
    sameAs: [LINKEDIN, GITHUB, FIVERR_PROFILE],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
