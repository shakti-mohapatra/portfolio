import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

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
  title: "Shakti M. — Python, AI & Web Developer",
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
    title: "Shakti M. — Python, AI & Web Developer",
    description:
      "Python automation, AI chatbots, bug fixes, and Discord/Telegram bots. Built fast, explained in plain English, revised until they work.",
    url: SITE_URL,
    siteName: "Shakti M. Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shakti M. — Python, AI & Web Developer",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-200">
        {/* Runs before hydration — sets .dark on <html> to prevent flash */}
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()
        `}</Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
