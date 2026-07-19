import type { Metadata } from "next";
import Shell from "./_components/Shell";
import Work from "./_components/Work";
import Services from "./_components/Services";
import Guarantees from "./_components/Guarantees";
import OrderFlow from "./_components/OrderFlow";
import HowIWork from "./_components/HowIWork";

const title = "Shakti Mohapatra — Freelance Developer | Python Automation, AI Tools & Web Apps";
const description =
  "Python automation, AI tools, and web apps — built fast, explained in plain English. I bring the same standard I use testing payment systems, where a bug costs real money, to freelance work.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "freelance developer",
    "Python automation",
    "AI chatbot developer",
    "web scraping",
    "Discord bot developer",
    "Next.js developer",
    "bug fixing",
  ],
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: "Shakti Mohapatra", locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

// Client route. The recruiter audience lives at /recruiters.
export default function Home() {
  return (
    <Shell mode="side">
      <Work mode="side" />
      <Services />
      <Guarantees />
      <OrderFlow />
      <HowIWork />
    </Shell>
  );
}
