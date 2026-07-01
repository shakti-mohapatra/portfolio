import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./v2/v2.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO: update SITE_URL to your custom domain once it's set up on Vercel
const SITE_URL = "https://portfolio-xi-lilac-71.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Shakti M. — Developer & Designer",
  description:
    "Freelance developer specializing in Python automation, AI tools, bug fixes, and Discord/Telegram bots. Fast delivery, plain-English explanations, revisions until it works.",
  keywords: [
    "freelance developer",
    "Python automation",
    "AI chatbot developer",
    "web scraping",
    "Discord bot developer",
    "Next.js developer",
    "bug fixing",
    "Shakti Mohapatra",
  ],
  authors: [{ name: "Shakti M." }],
  creator: "Shakti M.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Shakti M. — Developer & Designer",
    description:
      "Python automation, AI chatbots, bug fixes, and Discord/Telegram bots. Built fast, explained in plain English, revised until they work.",
    url: SITE_URL,
    siteName: "Shakti M. Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shakti M. — Developer & Designer",
    description:
      "Python automation, AI chatbots, bug fixes, and Discord/Telegram bots. Hire me on Fiverr.",
  },
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
      className={`dark ${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
