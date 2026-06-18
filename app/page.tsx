"use client";

import { useEffect } from "react";

const FIVERR_PROFILE = "https://www.fiverr.com/shaktibuilds";

const services = [
  {
    icon: "🐍",
    title: "Python Automation & AI Tools",
    desc: "Web scrapers, automation scripts, AI-powered tools using OpenAI/Claude, and data pipelines — ready to run.",
    price: "From $50",
    url: "https://www.fiverr.com/shaktibuilds/build-a-python-automation-script-web-scraper-or-ai-tool-for-business",
  },
  {
    icon: "🤖",
    title: "Custom AI Chatbot",
    desc: "AI chatbots for websites and businesses — powered by GPT-4, trained on your data, embedded anywhere.",
    price: "From $60",
    url: "https://www.fiverr.com/s/kLQWx2W",
  },
  {
    icon: "🐛",
    title: "Bug Fixes & Debugging",
    desc: "Python, JavaScript, React, and Next.js bugs fixed fast. 24-hour turnaround on simple fixes.",
    price: "From $30",
    url: "https://www.fiverr.com/s/99VW9BA",
  },
  {
    icon: "💬",
    title: "Discord & Telegram Bots",
    desc: "Custom bots with commands, moderation, role assignment, notifications, and API integrations.",
    price: "From $50",
    url: "https://www.fiverr.com/s/ljayrzb",
  },
];

const skills = [
  "Python",
  "JavaScript / TypeScript",
  "React & Next.js",
  "OpenAI / Claude API",
  "Discord.py / python-telegram-bot",
  "Web Scraping",
  "REST APIs",
  "Supabase / PostgreSQL",
];

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.delay ?? "0", 10);
            setTimeout(() => el.classList.add("visible"), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 anim-fade-in">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold text-gray-900 tracking-tight">
            shaktibuilds
          </span>
          <a
            href={FIVERR_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium bg-indigo-600 text-white px-4 py-1.5 rounded-full
                       hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Hire me on Fiverr
          </a>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section
          id="hero"
          className="relative min-h-[calc(100vh-56px)] flex items-center overflow-hidden bg-white"
        >
          {/* Animated aurora blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute -top-40 -right-40 w-[650px] h-[650px] rounded-full bg-indigo-100 blur-3xl opacity-70 anim-float"
            />
            <div
              className="absolute -bottom-40 -left-40 w-[550px] h-[550px] rounded-full bg-violet-100 blur-3xl opacity-60"
              style={{ animation: "floatBob 10s ease-in-out infinite 2.5s" }}
            />
            <div
              className="absolute top-1/2 left-1/3 w-[350px] h-[350px] rounded-full bg-sky-50 blur-2xl opacity-50"
              style={{ animation: "floatBob 13s ease-in-out infinite 5s" }}
            />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
            <p
              className="text-indigo-600 font-medium text-sm tracking-widest uppercase mb-5 anim-fade-in"
              style={{ animationDelay: "80ms" }}
            >
              Freelance Developer
            </p>

            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span
                className="block anim-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                Hi, I&apos;m Shakti.
              </span>
              <span
                className="block text-shimmer anim-fade-in-up"
                style={{ animationDelay: "380ms" }}
              >
                I build things that work.
              </span>
            </h1>

            <p
              className="text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed anim-fade-in-up"
              style={{ animationDelay: "540ms" }}
            >
              Python automation, AI tools, bug fixes, and custom bots —
              delivered fast, explained clearly, priced fairly.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center anim-fade-in-up"
              style={{ animationDelay: "700ms" }}
            >
              <a
                href="#services"
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full
                           hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all
                           shadow-lg shadow-indigo-200"
              >
                See my services
              </a>
              <a
                href={FIVERR_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-full
                           hover:bg-gray-50 hover:border-gray-400 hover:scale-105 active:scale-95 transition-all"
              >
                View Fiverr profile →
              </a>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-3 reveal">
              What I do
            </h2>
            <p
              className="text-gray-500 text-center mb-14 max-w-lg mx-auto reveal"
              data-delay="120"
            >
              Every gig is handled personally — you get the work, an
              explanation, and revisions until it&apos;s right.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <a
                  key={s.title}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-delay={String(i * 130)}
                  className="reveal group flex flex-col gap-3 p-6 border border-gray-200 rounded-2xl
                             hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1.5
                             transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">
                      {s.icon}
                    </span>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      {s.price}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{s.desc}</p>
                  <span className="text-sm font-medium text-indigo-600 group-hover:translate-x-1.5 transition-transform duration-200 inline-block">
                    Order on Fiverr →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section
          id="about"
          className="py-24 bg-gray-50 border-t border-gray-100"
        >
          <div className="max-w-5xl mx-auto px-6 grid sm:grid-cols-2 gap-16 items-start">
            <div className="reveal-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About me
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  I&apos;m a full-stack developer with a focus on Python and
                  JavaScript. I build automation tools, AI-powered apps, and
                  web applications — the kind of things that save time and
                  actually get used.
                </p>
                <p>
                  I work with small businesses, founders, and developers who
                  need something built quickly and correctly. Every project is
                  handled personally — no outsourcing, no copy-paste.
                </p>
                <p>
                  Fast turnarounds, clear communication, and working code —
                  that&apos;s the deal.
                </p>
              </div>
            </div>

            <div className="reveal-right" data-delay="150">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5">
                Skills & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag text-sm font-medium text-gray-700 bg-white border border-gray-200
                               px-3 py-1.5 rounded-full hover:border-indigo-300 hover:text-indigo-600
                               hover:scale-105 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section
          id="contact"
          className="py-24 bg-white border-t border-gray-100"
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 reveal">
              Get in touch
            </h2>
            <p
              className="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed reveal"
              data-delay="120"
            >
              Have a project in mind? Order directly on Fiverr for secure
              payments and delivery guarantees, or email me to discuss first.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center reveal"
              data-delay="240"
            >
              <a
                href={FIVERR_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full
                           hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all
                           shadow-lg shadow-indigo-200"
              >
                Hire me on Fiverr
              </a>
              <a
                href="mailto:shaktidev.work@gmail.com"
                className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-full
                           hover:bg-gray-50 hover:border-gray-400 hover:scale-105 active:scale-95 transition-all"
              >
                shaktidev.work@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>© 2026 Shakti M. All rights reserved.</span>
          <a
            href={FIVERR_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition-colors"
          >
            fiverr.com/shaktibuilds
          </a>
        </div>
      </footer>
    </>
  );
}
