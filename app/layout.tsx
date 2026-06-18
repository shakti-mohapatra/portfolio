import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shakti M. — Python, AI & Web Developer",
  description:
    "Freelance developer specializing in Python automation, AI tools, bug fixes, and Discord/Telegram bots. Fast delivery, affordable rates.",
  openGraph: {
    title: "Shakti M. — Python, AI & Web Developer",
    description:
      "Python automation, AI chatbots, bug fixes, and Discord/Telegram bots. Hire me on Fiverr.",
    url: "https://shaktibuilds.vercel.app",
    siteName: "Shakti M. Portfolio",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
