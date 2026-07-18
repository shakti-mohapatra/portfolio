import Image from "next/image";
import { modeContent, type Mode } from "../_data";

export default function About({ mode }: { mode: Mode }) {
  const content = modeContent[mode];
  return (
    <section id="about" className="py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          {/* Photo */}
          <div className="reveal">
            <div className="relative aspect-[3/4] max-w-xs rounded-2xl overflow-hidden border border-white/[0.08]">
              <Image
                src="/profile-photo.jpg"
                alt="Shakti M."
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
          {/* Bio + Skills */}
          <div>
            <div className="reveal">
              <h2 className="text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight leading-none mb-8">About me</h2>
              <div className="space-y-5 text-white/60 leading-relaxed text-lg">
                {content.aboutBio.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
                <p className="text-white">{content.aboutClosing}</p>
              </div>
            </div>
            {mode === "side" && (
              <div className="reveal mt-10">
                <h3 className="font-mono text-sm font-semibold uppercase tracking-widest text-white/55 mb-6">Skills &amp; tools</h3>
                <div className="flex flex-wrap gap-2.5">
                  {content.skills.map((skill) => (
                    <span key={skill} className="font-mono text-sm font-medium text-white/70 border border-white/[0.08] bg-white/[0.03] px-4 py-2 rounded-full hover:border-[var(--accent)]/50 hover:text-white transition-colors">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
