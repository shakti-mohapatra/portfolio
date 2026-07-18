import { GitHubIcon, LinkedInIcon } from "./icons";
import { FIVERR_PROFILE, GITHUB, LINKEDIN } from "../_data";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] py-10 relative z-[1]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/55">
        <span>© 2026 Shakti M. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors"><LinkedInIcon /> LinkedIn</a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors"><GitHubIcon /> GitHub</a>
          <a href={FIVERR_PROFILE} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">fiverr.com/shaktibuilds</a>
        </div>
      </div>
    </footer>
  );
}
