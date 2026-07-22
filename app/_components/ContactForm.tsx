"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeebgngl";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm({
  messagePlaceholder = "Tell me about your project…",
  projectTypes,
}: {
  messagePlaceholder?: string;
  projectTypes?: string[];
}) {
  const [name,        setName]        = useState("");
  const [email,        setEmail]        = useState("");
  const [projectType, setProjectType] = useState("");
  const [message,     setMessage]     = useState("");
  const [status,      setStatus]      = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, projectType: projectType || undefined, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setProjectType(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputCls = `w-full px-4 py-3 rounded-xl text-sm
    bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-white/50
    focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-[var(--accent)]/30
    transition-all`;

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 p-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] text-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-emerald-400" aria-hidden>
          <circle cx="12" cy="12" r="10" /><polyline points="20 6 9 17 4 12" />
        </svg>
        <p className="font-semibold text-emerald-300">Message sent!</p>
        <p className="text-sm text-emerald-400/70">I&apos;ll get back to you within 24 hours.</p>
        <button onClick={() => setStatus("idle")} className="mt-1 text-xs text-emerald-400/60 underline underline-offset-2 hover:no-underline">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block font-mono text-micro font-medium text-white/55 uppercase tracking-widest mb-2">Name</label>
          <input id="contact-name" type="text" required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="contact-email" className="block font-mono text-micro font-medium text-white/55 uppercase tracking-widest mb-2">Email</label>
          <input id="contact-email" type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
      </div>
      {projectTypes && projectTypes.length > 0 && (
        <div>
          <label htmlFor="contact-project-type" className="block font-mono text-micro font-medium text-white/55 uppercase tracking-widest mb-2">Project type (optional)</label>
          <select id="contact-project-type" value={projectType} onChange={(e) => setProjectType(e.target.value)} className={`${inputCls} appearance-none`}>
            <option value="">Select project type</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label htmlFor="contact-message" className="block font-mono text-micro font-medium text-white/55 uppercase tracking-widest mb-2">Message</label>
        <textarea id="contact-message" required rows={7} placeholder={messagePlaceholder} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputCls} resize-none`} />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong — please try again or email me directly.</p>
      )}
      <button type="submit" disabled={status === "submitting"}
        className="w-full py-3.5 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white font-semibold
                   hover:brightness-110 active:scale-95 transition-all
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
      <p className="flex items-center gap-1.5 text-[11px] text-white/35">
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 shrink-0" aria-hidden>
          <path d="M8 1 2.5 3v4c0 3.5 2.3 6.4 5.5 7.4 3.2-1 5.5-3.9 5.5-7.4V3L8 1Z" />
        </svg>
        Your information stays private, used only to reply to you.
      </p>
    </form>
  );
}
