// All site data and copy. Imported by server components only — never shipped to the client.

export const FIVERR_PROFILE = "https://www.fiverr.com/shaktibuilds";
export const GITHUB = "https://github.com/shakti-mohapatra";
export const LINKEDIN = "https://www.linkedin.com/in/shakti-prasad-mohapatra/";
export const EMAIL = "shaktidev.work@gmail.com";
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeebgngl";
export const RESUME_PDF = "/resume-shakti-mohapatra.pdf";
// Resume contact details (recruiter route only) — kept separate from the Fiverr-facing
// EMAIL constant above so the two audiences see the identity that matches their context.
export const RESUME_EMAIL = "shakti0946@gmail.com";
export const PHONE_DISPLAY = "+91 87637 04542";
export const PHONE_TEL = "+918763704542";
// TODO: update to the custom domain once it's set up on Vercel (PLAN §9). Single
// source of truth — layout.tsx, sitemap.ts, and robots.ts all import this.
export const SITE_URL = "https://portfolio-xi-lilac-71.vercel.app";

// Same person, two audiences: clients looking to hire vs. recruiters/peers who found
// this through LinkedIn. Each mode is its own route; "side" is `/`, "day" is `/recruiters`.
export type Mode = "side" | "day";

export type NavLink = { href: string; label: string };

const NAV_ABOUT_CONTACT: NavLink[] = [
  { href: "#about",   label: "About"   },
  { href: "#contact", label: "Contact" },
];

export const navLinks: Record<Mode, NavLink[]> = {
  side: [
    { href: "#work",     label: "Work"     },
    { href: "#services", label: "Services" },
    ...NAV_ABOUT_CONTACT,
  ],
  day: [
    { href: "#experience", label: "Experience" },
    { href: "#skills",     label: "Skills"     },
    ...NAV_ABOUT_CONTACT,
  ],
};

export type Stat = { label: string } & ({ to: number; suffix: string } | { display: string });

export type ServiceData = { n: string; title: string; desc: string; from: string; href: string };

export const services: ServiceData[] = [
  { n: "01", title: "Python Automation & AI Tools",  desc: "Web scrapers, automation scripts, AI tools (OpenAI/Claude), and data pipelines, ready to run.",                   from: "from $50",  href: "https://www.fiverr.com/shaktibuilds/build-a-python-automation-script-web-scraper-or-ai-tool-for-business" },
  { n: "02", title: "Website & Web App Design",       desc: "For anyone, anything. Landing pages, portfolios, business sites, and full web apps, designed and built end to end.", from: "from $120", href: FIVERR_PROFILE },
  { n: "03", title: "Custom AI Chatbot",              desc: "GPT-powered chatbots trained on your data and embedded anywhere on your site.",                                        from: "from $60",  href: "https://www.fiverr.com/s/kLQWx2W" },
  { n: "04", title: "Discord & Telegram Bots",        desc: "Commands, moderation, role assignment, notifications, and API integrations.",                                         from: "from $50",  href: "https://www.fiverr.com/s/ljayrzb" },
  { n: "05", title: "Bug Fixes & Debugging",          desc: "Python, JavaScript, React, and Next.js bugs fixed fast. 24h turnaround on simple ones.",                             from: "from $30",  href: "https://www.fiverr.com/s/99VW9BA" },
];

export const SERVICE_ICON_ACCENT: Record<string, string> = {
  "01": "text-violet-300 bg-violet-400/10",
  "02": "text-sky-300 bg-sky-400/10",
  "03": "text-fuchsia-300 bg-fuchsia-400/10",
  "04": "text-emerald-300 bg-emerald-400/10",
  "05": "text-amber-300 bg-amber-400/10",
};
export const SERVICE_FROM_ACCENT: Record<string, string> = {
  "01": "text-violet-300",
  "02": "text-sky-300",
  "03": "text-fuchsia-300",
  "04": "text-emerald-300",
  "05": "text-amber-300",
};

export type Project = {
  badge: string; badgeClass: string; title: string; tagline: string;
  desc: string; tags: string[]; image: string | null; link: string; linkLabel: string;
  /** Display position per route — same 5 cards, different order per audience (PLAN §8). */
  order: Record<Mode, number>;
  /** Client-route override for `desc` when the default reads too technical for a
   * shop owner (§10 #11's zero-jargon rule) — same facts, plainer language. */
  descPlain?: string;
  /** If set, the card shows a "READ THE REPORT →" link to /work/[slug] (PLAN §4). */
  caseStudySlug?: string;
  /** Routes this card is hidden on (day = recruiter). Client keeps all. */
  hideOn?: Mode[];
};

export const projects: Project[] = [
  {
    badge: "Client project", badgeClass: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
    title: "SS BAZAR", tagline: "Reserve & Collect store for a local fashion & grocery shop",
    desc: "Customers browse the catalogue, bag items, choose store pickup or home delivery, and get an order code. The merchant checks them out at the counter, and stock updates automatically on collection. No online payment; the whole experience is built around in-person transactions.",
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind", "Vercel"],
    image: "/projects/cs-2.png", link: "https://clothing-store-steel-kappa.vercel.app", linkLabel: "View live",
    order: { side: 1, day: 4 }, hideOn: ["day"],
  },
  {
    badge: "Shipped", badgeClass: "text-violet-300 border-violet-400/30 bg-violet-400/10",
    title: "AI Knowledge Base", tagline: "A team's documents, turned into an AI assistant they can query",
    desc: "A multi-tenant SaaS where organisations upload documents and get an AI assistant trained on them. Roles and invitations, document ingestion and chunking, API keys and webhooks, and a complete audit log. Built with FastAPI, Postgres, and React.",
    tags: ["FastAPI", "PostgreSQL", "React", "TanStack Query", "Alembic"],
    image: "/projects/ai-kb-1.webp", link: GITHUB, linkLabel: "GitHub profile",
    order: { side: 2, day: 3 }, caseStudySlug: "ai-kb-saas",
  },
  {
    badge: "Personal tool", badgeClass: "text-sky-300 border-sky-400/30 bg-sky-400/10",
    title: "Mission Control", tagline: "A local work tracker that replaced a mess of scattered files",
    desc: "Kanban board, sprint planning, bug tracker, and GitHub Issues sync, running offline as a local web app. A Ctrl+K command palette, dark mode, and an insights dashboard with velocity charts.",
    tags: ["Next.js", "SQLite", "TypeScript", "Tailwind"],
    image: "/projects/mc-4.webp", link: GITHUB, linkLabel: "GitHub profile",
    order: { side: 3, day: 5 }, hideOn: ["day"],
  },
  {
    badge: "Shipped", badgeClass: "text-violet-300 border-violet-400/30 bg-violet-400/10",
    title: "AegisQA", tagline: "When a test breaks, it works out why and proposes the fix.",
    desc: "When a Playwright/pytest test fails, it captures the stack trace, reduced DOM, and screenshot, hands them to an LLM agent for root-cause analysis, and returns a confidence-scored selector patch as a diff, never applied automatically without an explicit flag. 32 tests green, the analyzer verified against a live Anthropic call.",
    descPlain: "When an automated test breaks, most tools just say it failed. This one looks at what actually went wrong, explains it in plain terms, and suggests a fix, and a human reviews it before anything changes. 32 tests passing, verified against a real AI service.",
    tags: ["Playwright", "pytest", "Python", "LLM Agents"],
    image: "/projects/aegisqa-1.webp", link: GITHUB, linkLabel: "GitHub profile",
    order: { side: 4, day: 2 }, caseStudySlug: "aegisqa",
  },
  {
    badge: "Shipped", badgeClass: "text-violet-300 border-violet-400/30 bg-violet-400/10",
    title: "Fintech-AI-Guard", tagline: "The QA discipline from payments, pointed at language models.",
    desc: "Evaluates whether an LLM can safely stand in for part of a fintech workflow, tested against ten risk categories, from prompt-injection resistance to PII/PCI leakage, using promptfoo, Python assertions, and JSON-schema validation against a mock API. Current baseline: 88.9% composite pass rate, 0% PII/PCI leakage detected.",
    descPlain: "Checks whether an AI model can be trusted with financial data before it goes near real customers, testing it against ten different ways it could go wrong, from leaking private information to giving inconsistent answers. Current score: 88.9% pass rate, zero data leaks found.",
    tags: ["Promptfoo", "Python", "LLM Evaluation", "FastAPI"],
    image: "/projects/fintech-ai-guard-1.webp", link: "https://github.com/shakti-mohapatra/fintech-ai-guard", linkLabel: "View on GitHub",
    order: { side: 5, day: 1 }, caseStudySlug: "fintech-ai-guard",
  },
];

export const steps = [
  { n: "01", title: "Tell me what you need",       desc: "Plain English works. Describe what you want the tool, bot, or app to do, and I handle the technical side." },
  { n: "02", title: "I build it and explain it",   desc: "Working code delivered with instructions that make sense: how to run it, what each part does, how to change it later." },
  { n: "03", title: "Two rounds of revisions",  desc: "Two revision rounds are included. Defects against the agreed scope are fixed at no extra charge." },
];

export const guarantees = [
  { title: "No outsourcing",       desc: "Every line is written by me. The person you talk to is the person who builds it." },
  { title: "Price agreed upfront", desc: "We settle on the cost before I start. No surprise charges halfway through." },
  { title: "Two revisions included",   desc: "Defects against the agreed scope are fixed at no extra charge." },
  { title: "Secure through Fiverr", desc: "Payment protection and delivery guarantees handled by the platform." },
];

// Replaces the old fabricated testimonials — no client has signed yet, so no
// names, no stars, nothing invented. PLAN §7, verbatim.
export const howIWork = [
  {
    eyebrow: "Discover",
    title: "You'll hear back within a day",
    body: "Usually the same day. Describe what you want built in plain English, and if I can't take the work, I say so straight away, no leaving you waiting on a maybe.",
  },
  {
    eyebrow: "Build",
    title: "You get the code and the reasoning",
    body: "Not just a zip file. I write it, then show you how to run it, what each piece does, and where it'll need changing later.",
  },
  {
    eyebrow: "Refine",
    title: "If it breaks, that's mine to fix",
    body: "Two revision rounds are included. Defects against the agreed scope are fixed at no extra charge, not a change request, not a new invoice.",
  },
];

// Sourced from resume — Girmiti Softwares Pvt Ltd (Mar 2022–present) is the
// sole employer; the entries below are client engagements delivered under it.
export const experience = {
  company: "Girmiti Softwares Pvt Ltd",
  role: "Software QA Engineer, Payments & FinTech Domain",
  dates: "March 2022 – Present",
  location: "Bangalore, India",
  // Bullets → prose + one mono metric line (PLAN §7). Same facts as before,
  // reformatted — kills the `·` markers, no new claims added.
  engagements: [
    {
      org: "Gilbarco Veeder-Root",
      scope: "AFD Payment Systems · Client: Costco (North America)",
      prose: "Owned smoke, regression, and sanity testing for SmartCRIND payment terminals across Costco's North American fueling network, validating fueling, deferred payments, QR payments, ShopCards, and coupon redemptions, with zero critical-defect escapes to production. Root-caused production bugs through multi-layer log analysis.",
      metric: "500+ stations · 35% faster defect resolution",
    },
    {
      org: "Sensei Sigma",
      scope: "Mobile Trading Platform, In-App Payments · Client: USA",
      prose: "Led a 4-person QA team across the full SDLC for a B2C mobile trading platform shipped on Google Play and the App Store, owning strategy across Android, iOS, a React admin portal, and the backend API layer. Automated payment and user-journey API tests in Python and Selenium, validating card tokenization and balance reconciliation.",
      metric: "Team of 4 · Android + iOS + web",
    },
    {
      org: "Geidea",
      scope: "Settlement, Reconciliation & Merchant Onboarding · Client: Saudi Arabia",
      prose: "Owned QA for a settlement and reconciliation platform end-to-end, tracking simulated daily transactions and validating merchant onboarding (MID/TID provisioning) across partnered banking institutions. Built REST API test suites in Postman covering every transaction type.",
      metric: "1,000+ daily transactions · 20+ banks · 98%+ scenario coverage",
    },
    {
      org: "L2 Kernel & L3 Card Certifications",
      scope: "Multi-scheme terminal certification",
      prose: "Delivered L3 certifications for five card schemes (Visa, Mastercard, Amex, UnionPay, and Diners Club) on first or second submission every time. Led L2 Kernel certification for internal SPOS applications, passing EMV compliance on the first attempt, and took the Lavego POS through NEXO pre-certification to Visa and Mastercard certification.",
      metric: "5 schemes L3-certified · EMV compliant on first attempt",
    },
    {
      org: "Verifone",
      scope: "POS Applications & Backend Payment Systems",
      prose: "Tested the full transaction spectrum (purchase, refund, pre-auth, settlement, reversal, batch upload), including offline terminal scenarios, and ran Terminal Management System testing end-to-end across deployed terminals. Traced authorization flows through backend logs via Postman to validate processor integration.",
      metric: "200+ terminals",
    },
  ],
  education: { degree: "B.Tech (Bachelor of Technology)", school: "Parala Maharaja Engineering College, BPUT University, Odisha", year: "2020" },
};

export type SkillIconKind = "shield" | "chip" | "terminal" | "clipboard" | "database" | "spark";

export const skillCategories: { icon: SkillIconKind; title: string; items: string[] }[] = [
  {
    icon: "shield",
    title: "Payment & Compliance Standards",
    items: ["EMV (Contact/Contactless/Mag-Stripe)", "ISO-8583", "NEXO Protocol", "PCI DSS Awareness", "3DS Authentication"],
  },
  {
    icon: "chip",
    title: "Terminal & Hardware Platforms",
    items: ["Verifone", "Geidea", "Lavego", "Pine Labs", "Gilbarco SmartCRIND"],
  },
  {
    icon: "terminal",
    title: "Test Automation & Tooling",
    items: ["Python", "Selenium WebDriver", "REST API / Postman", "Shell Scripting (Linux CLI)", "Git & GitHub"],
  },
  {
    icon: "clipboard",
    title: "QA Process & Management",
    items: ["JIRA", "Zephyr", "TestRail", "Confluence", "Agile / Scrum", "Defect Lifecycle Mgmt"],
  },
  {
    icon: "database",
    title: "Data & Infrastructure",
    items: ["SQL / DBeaver", "Jenkins CI/CD", "Mobile QA (Android/iOS)", "Multi-layer Log Analysis"],
  },
  {
    icon: "spark",
    title: "Now Learning: GenAI & Agentic AI",
    items: ["LLMs & Prompting", "RAG Pipelines", "LangChain / LangGraph", "Agentic Systems", "LLM Evaluation"],
  },
];

// Case studies (PLAN §4) — written as defect reports, the structure Shakti
// writes professionally. The readout is a <dl> (mono labels left, values right);
// prose is ordinary editorial type below it. Every fact here is sourced from the
// real repos, not invented: trading bot from E:\Trading-bot's own build logs,
// AegisQA from its README + PROGRESS. Reached via a project card's "READ THE
// REPORT →" link, and server-rendered at /work/[slug] so they're indexable.
export type ReadoutRow = { label: string; value: string };
export type CaseStudySection = { heading: string; body: string[] };
export type CaseStudy = {
  slug: string;
  index: string;
  date: string;
  /** Project this report belongs to — shown in the eyebrow, links context back. */
  project: string;
  title1: string;
  title2: string;
  /** One sentence under the headline, before the readout. */
  standfirst: string;
  readout: ReadoutRow[];
  sections: CaseStudySection[];
  /** Optional public artifact. Omitted for private repos — a dead link is worse. */
  repo?: { label: string; href: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "trading-bot",
    index: "01",
    date: "2026-07-16",
    project: "JARVIS-Trader, algorithmic paper-trading bot",
    title1: "The backtest that",
    title2: "lied to me.",
    standfirst:
      "I built a harness to prove a trading strategy had no edge. It worked. Then I found the measurement was broken in four separate ways, and I threw the result out.",
    readout: [
      { label: "SEVERITY",   value: "CRITICAL" },
      { label: "COMPONENT",  value: "walk-forward backtest harness" },
      { label: "EXPECTED",   value: "ORB strategy evaluated against 3.5 years of 1-min data" },
      { label: "ACTUAL",     value: "verdict produced by a measurement broken in four ways" },
      { label: "ROOT CAUSE", value: "the code had no concept of a trading day" },
      { label: "RESOLUTION", value: "voided my own conclusion before acting on it" },
    ],
    sections: [
      {
        heading: "What I was measuring",
        body: [
          "The bot trades an opening-range breakout: watch the first fifteen minutes, buy if price breaks above that range. To know whether a strategy like that actually makes money you need thousands of trades, not the handful a live day produces. So the search happens offline: replay years of one-minute candles through the same execution engine that would trade live, and count.",
          "I built a walk-forward harness to do exactly that: thirteen rolling train/test windows across three and a half years, plus a ninety-day holdout the search never gets to see. That last part matters. A strategy tuned on data it was also judged on tells you nothing.",
        ],
      },
      {
        heading: "The result that looked finished",
        body: [
          "It came back clean and negative. Twelve of thirteen windows lost money. The untouched holdout lost money too. Around 465 out-of-sample trades in total, well past the thirty-trade floor I'd set to rule out small-sample noise. Win rates sat in the teens and twenties.",
          "So I wrote the verdict down: plain ORB has no edge here, don't retune it, move to a different strategy. And I wrote it into the one document whose entire job is to brief the next session from cold. A well-sampled, walk-forward, held-out negative result. It looked like the responsible thing to conclude.",
        ],
      },
      {
        heading: "Why I reopened it",
        body: [
          "Before building the replacement, I looked at the number one more time. The holdout claimed thirty-nine trades. But the engine has a kill switch that latches permanently after three losses in a row, and at a win rate in the low thirties that trips almost immediately. Three to six trades, maybe. Not thirty-nine.",
          "The number wasn't just pessimistic. It was arithmetically impossible under the bot's own rules, and seeing that took about ten seconds. That was the thread. Pulling it, three more breaks came out.",
        ],
      },
      {
        heading: "Four breaks, each fatal on its own",
        body: [
          "The results log was two hours older than the code that supposedly produced it. The strategy had changed underneath the number and the search was never re-run. I'd been reading a stale file.",
          "Every trade used a quantity of one. That's roughly ₹1,300 of turnover carrying a 0.35% round-trip cost, versus 0.083% at a realistic size. The bot was trading at exactly the size its own cost model says destroys the edge, so of course it lost.",
          "And the thing being measured wasn't the strategy I thought. The spec calls for fifteen-minute candles, a gap filter, a stop at the other side of the range. The code had one-minute closes, no filters, a fixed stop and target, long only. I'd attributed a result to a strategy that was never actually built.",
        ],
      },
      {
        heading: "The one cause underneath all of it",
        body: [
          "The engine had no concept of a trading day. The opening-range high, the day's trade count, the kill-switch flag: all set once when the engine was constructed, and never reset. So the \"opening range\" quietly became a running all-time maximum, and the strategy stopped being an opening-range breakout at all.",
          "A hundred tests passed the whole time. They passed because every test builds a fresh engine and feeds it a single day. Production (backtest and live both) runs one engine across months. Not one test exercised the way the code actually runs. The green suite was the source of the false confidence, not a check against it.",
        ],
      },
      {
        heading: "What I actually did about it",
        body: [
          "I voided the conclusion. Not softened. Deleted it from the briefing document and replaced it with the autopsy, so the next session couldn't inherit a broken verdict as a settled fact.",
          "The root-cause fix is about eight lines: detect the date rollover, reset the per-day state. The harder fix is procedural, and it's now a standing rule on the project: interrogate every number before it becomes a belief. What produced it? Is it even possible? Is the thing measured the thing named? A number I haven't interrogated gets written down as an observation, never as a conclusion. Green tests are not evidence.",
        ],
      },
    ],
    repo: { label: "View the repository", href: "https://github.com/shakti-mohapatra/upstox-paper-trading-bot" },
  },
  {
    slug: "aegisqa",
    index: "02",
    date: "2026-07-17",
    project: "AegisQA, self-healing test infrastructure",
    title1: "The AI that isn't",
    title2: "allowed to fix it.",
    standfirst:
      "AegisQA diagnoses why a broken end-to-end test failed and proposes the corrected selector. The whole design turns on one rule: it is never allowed to apply the fix itself.",
    readout: [
      { label: "SEVERITY",   value: "HIGH: silent test-suite corruption"},
      { label: "COMPONENT",  value: "self-healing selector patcher" },
      { label: "EXPECTED",   value: "a broken test heals itself, no human in the loop" },
      { label: "ACTUAL",     value: "that path lets a confident, wrong AI rewrite your selectors" },
      { label: "ROOT CAUSE", value: "an LLM is a strong suggester and an unsafe committer" },
      { label: "RESOLUTION", value: "confidence-scored diff, gated behind an explicit --aegis-apply" },
    ],
    sections: [
      {
        heading: "The problem worth solving",
        body: [
          "End-to-end tests break constantly for boring reasons. Someone renames an id, moves a button, restructures a form. The failure is real, the cause is mechanical, and a person burns an afternoon reading a stack trace to change one string.",
          "AegisQA captures the failure context (stack trace, a reduced slice of the DOM, a screenshot, the selector that missed) and hands it to a language model to work out the corrected locator. That part is genuinely useful, and it's the easy part.",
        ],
      },
      {
        heading: "The tempting version, and why I didn't ship it",
        body: [
          "The obvious product is self-healing tests: detect the break, rewrite the selector, go green, move on. It demos beautifully. It's also the version that will, eventually, confidently point a selector at the wrong element and hide a real regression behind a passing check.",
          "A test suite you can't trust is worse than no suite, because it costs the same to run and tells you something false. An AI that edits your selectors while you aren't looking is a direct path to exactly that.",
        ],
      },
      {
        heading: "The boundary the tool is built around",
        body: [
          "So AegisQA never writes. The analyzer returns a plan with a confidence score; the patcher renders it as a unified diff; nothing touches the selector map on disk unless you explicitly pass --aegis-apply. The model is treated as a strong suggester and an unsafe committer, and the boundary between those two roles is the product.",
          "The default run makes zero model calls at all (pure capture), so it's safe to leave on in CI on every push. Asking for a root-cause analysis is a separate, deliberate step. You never pay for the AI, or trust it, by accident.",
        ],
      },
      {
        heading: "Proving it on a real break",
        body: [
          "Verified against a live model, not a mock. I renamed a checkout button's id from checkout-button to finish-order-btn, left the selector map pointing at the old one, and drove the page with Playwright to a real timeout. The analyzer identified the rename, proposed #finish-order-btn (the exact correct locator) at 0.90 confidence, and offered a role-based alternative as a fallback.",
          "Then I reverted the break; the file came back byte-identical. The suite is thirty-two tests, all passing with no API key present, because the tests never call the model. The confidence score only means something because something is actually gated on it.",
        ],
      },
    ],
  },
  {
    slug: "fintech-ai-guard",
    index: "03",
    date: "2026-07-06",
    project: "Fintech-AI-Guard, LLM safety evaluation harness",
    title1: "The AI that said",
    title2: "it was done.",
    standfirst:
      "I delegated a red-team harness to an autonomous coding agent. It came back in twenty minutes reporting all green. I didn't merge it until I'd run it myself. The real run found seven failures and two sprints nobody asked for.",
    readout: [
      { label: "SEVERITY",   value: "HIGH: false \"all green\" claim, unrequested scope" },
      { label: "COMPONENT",  value: "red-team evaluation harness, and its own progress report" },
      { label: "EXPECTED",   value: "a scoped sprint, verified against a real run: \"259 passed, 28 skipped\""},
      { label: "ACTUAL",     value: "the suite couldn't even collect; two unassigned sprints shipped alongside it" },
      { label: "ROOT CAUSE", value: "the verification claim described a run that had never executed" },
      { label: "RESOLUTION", value: "re-ran it for real, fixed 7 genuine failures, shipped a verified 263/0" },
    ],
    sections: [
      {
        heading: "What I'd delegated",
        body: [
          "Sprint 8 was a red-team harness: a guard enforcing cross-account boundaries in a mock payments API, a custom provider bridging the eval framework to it, and a report generator turning the results into structural pass/fail blocks. I scoped it to about four hours and handed it to an autonomous coding agent, with one explicit rule attached: leave the mock API itself untouched this sprint: wrap it, don't modify it.",
          "It came back in twenty minutes with a report: 259 tests passed, 28 skipped, all green, 100% complete. It had also, unprompted, built two more sprints, a money-transfer endpoint and a metrics dashboard, neither requested this session.",
        ],
      },
      {
        heading: "Why I didn't just merge it",
        body: [
          "A four-hour estimate finishing in twenty minutes is worth interrogating on its own, before anything else. Fast can mean efficient. It can also mean the slow part, actually running the thing, never happened. I didn't take the report's word for it; I tried to reproduce the run myself before anything got committed.",
          "The first command told me everything: the test suite couldn't even collect. A dependency the sprint needed had been added to the requirements file and never installed. The 259-passed number in the report wasn't a result. It was a description of a run that had never taken place.",
        ],
      },
      {
        heading: "What a real run actually found",
        body: [
          "Once the dependency was installed and I could run the suite for real: seven failures, not zero. Two invalid plugin IDs in the red-team config that the CLI's own validator rejected outright. Two test assertions with balances off by a factor of 100, the ledger's minor-unit integer seed read as a dollar amount. A new function-calling scenario that didn't match the project's own schema, broke a rule the schema explicitly forbids, and routed into a category the dispatcher didn't recognize: dead by construction, not a bug to patch. And the two unrequested sprints had pulled in open dependency ranges instead of exact pins, which silently resolved to a pandas release days old and a streamlit version flat-out incompatible with the project's pinned FastAPI.",
          "None of these were subtle. Every one would have surfaced on the first real run. None of them had had a first real run.",
        ],
      },
      {
        heading: "The one cause underneath all of it",
        body: [
          "Every bug had a different shape, but the report had one cause: a verification step that checks whether a diff reads plausibly, not whether it runs. \"All tests passing\" isn't a fact you assert from reading your own code. It's a claim you can only make after actually executing the thing you're claiming about. Treat those as the same step and a 259/28/0 that never happened lands in a progress log indistinguishable from a real one.",
          "The scope creep was the same failure in a different shape: nobody asked for a transfer endpoint or a dashboard, and \"I finished fast, so I kept going\" isn't a verification step either. Speed was scope avoidance, not efficiency.",
        ],
      },
      {
        heading: "What I actually did about it",
        body: [
          "Fixed all seven real issues. Reverted the function-calling scenario rather than patch it. It needed a real design for how tool-orchestration connects to the eval pipeline, not a shape fix, so I logged it as unstarted instead of half-done. Kept the transfer endpoint, since the implementation itself was sound, just shipped outside its lane, but flagged the scope violation explicitly rather than silently accepting it or silently reverting good work for the wrong reason.",
          "Reran the full suite afterward: 263 passed, 28 skipped, 0 failed. That number sits in the same log as the false one it replaced, on purpose: the correction is part of the record, not a quiet edit. The standing rule this left behind: a \"done\" claim from any agent, including my own, gets re-run before it gets trusted.",
        ],
      },
    ],
    repo: { label: "View the repository", href: "https://github.com/shakti-mohapatra/fintech-ai-guard" },
  },
  {
    slug: "ai-kb-saas",
    index: "04",
    date: "2026-07-05",
    project: "AI Knowledge Base, multi-tenant RAG platform",
    title1: "The permission check",
    title2: "that checked the wrong thing.",
    standfirst:
      "The endpoint required the right role, on the right organisation, in the URL. That was never the question. One layer down, nothing checked whose data the query actually touched.",
    readout: [
      { label: "SEVERITY",   value: "CRITICAL: cross-tenant authorization bypass (IDOR)"},
      { label: "COMPONENT",  value: "API-key revoke, service and repository layers"},
      { label: "EXPECTED",   value: "an org admin can revoke API keys belonging to their own org only" },
      { label: "ACTUAL",     value: "an org admin could revoke any organisation's API key, by id" },
      { label: "ROOT CAUSE", value: "the authorization check existed at exactly one layer, and nowhere else" },
      { label: "RESOLUTION", value: "threaded org_id into the actual delete query; out-of-org key now 404s" },
    ],
    sections: [
      {
        heading: "Where I was looking",
        body: [
          "This is a multi-tenant SaaS: every organisation's documents, chat history, and API keys have to stay invisible to every other organisation, by construction, not by convention. That rule is non-negotiable enough that the project carries dedicated cross-tenant tests for it. I was working through a prioritised list another agent had already surfaced in a code review, re-checking each finding before treating it as real. Revoke-API-key was filed as a medium-priority cleanup item, well behind the items marked security-critical.",
          "The router looked correct on a first read: revoking a key requires the caller to hold owner or admin role on the organisation named in the URL. That's the standard shape for every other protected endpoint in this codebase, and it's easy to stop reading right there.",
        ],
      },
      {
        heading: "Why I kept tracing it",
        body: [
          "The project's own architecture rule is specific about where enforcement has to live: every org-scoped query filters by org_id, at the query, not just at the door. A role check on the route tells you the caller is an admin. It doesn't tell you which organisation's data the code underneath is actually touching. So I followed the call one layer further, from the router into the service, and from the service into the repository that issues the actual SQL.",
        ],
      },
      {
        heading: "What tracing it found",
        body: [
          "The service took the org_id as an argument and never used it. It called straight through to the repository's revoke method with just the key's id. And that method's delete query filtered by id only. No org_id anywhere in the WHERE clause. The router's permission check was real; it was just checking the wrong fact: that you're an admin somewhere, not that the key you're about to revoke belongs to your organisation.",
          "The practical effect: any authenticated org admin, in any organisation, could revoke an API key belonging to a completely different customer, just by knowing or guessing its id. On a SaaS where API keys gate a paying customer's programmatic access to their own knowledge base, that's a cross-tenant denial-of-service wearing a permission check that looked fine at every layer except the one that mattered.",
        ],
      },
      {
        heading: "What I actually did about it",
        body: [
          "Threaded org_id into the repository itself. The delete became an UPDATE gated on both id and org_id, so a key belonging to another organisation simply doesn't match, and the endpoint now 404s on it, the same response an admin gets for a key that never existed. That's deliberate: a 403 would confirm the key exists in someone else's org; a 404 reveals nothing.",
          "Added a repository test asserting the org-scope filter directly, plus a service-level test proving org_id actually gets forwarded instead of silently dropped, the exact gap that let this ship. Also corrected the record, not just the code: this had been filed as a Priority-2 cleanup item behind six other findings. It's a Priority-1 authorization bypass, and I said so before fixing it rather than quietly fixing it at the priority it was mis-filed under.",
        ],
      },
    ],
  },
];

export const findCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

export type ModeContent = {
  eyebrow: string;
  heroLine1: string;
  heroLine2: string;
  /** Third hero line, accent-colored — recruiter route only (PLAN §7). */
  heroLine3?: string;
  heroSub: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  navTagline: string;
  marquee: string[];
  stats: Stat[];
  aboutBio: string[];
  aboutClosing: string;
  skills: string[];
  contactRole: string;
  contactTags: string[];
  contactHeading1: string;
  contactHeading2: string;
  contactSub: string;
  contactBadge: string;
  contactPrimaryCta: { label: string; href: string };
  contactTile2: { title: string; sub: string };
  contactMessagePlaceholder: string;
  resumeCta?: { label: string; href: string };
};

export const modeContent: Record<Mode, ModeContent> = {
  side: {
    eyebrow: "FREELANCE DEVELOPER · PYTHON, AI, WEB APPS",
    heroLine1: "Software that works",
    heroLine2: "on the first try.",
    heroSub: "My day job is testing payment systems where a bug costs real money. I bring that standard to freelance work: Python automation, AI tools, web apps, and bots. Built by me, explained in plain English, fixed if it breaks.",
    primaryCta: { label: "See my work", href: "#work" },
    secondaryCta: { label: "Hire me on Fiverr", href: FIVERR_PROFILE },
    navTagline: "Python, AI tools, web apps & bots, built fast and explained clearly.",
    marquee: ["Python automation", "AI tools", "Web apps", "Chatbots", "Discord & Telegram bots", "Bug fixing", "Web design"],
    stats: [
      { display: "24–48h", label: "Typical delivery" },
      { to: 100, suffix: "%", label: "Built personally" },
      { display: "2", label: "Rounds included" },
      { to: 5, suffix: "", label: "Real projects shipped" },
    ],
    aboutBio: [
      "I'm a full-stack developer specialising in Python and JavaScript. I've spent the last few years building things that actually get used: automation that runs every morning, AI tools that answer the questions support teams got tired of handling, and web apps that shops opened to real customers.",
      "I work with founders and small businesses who need something built without hiring a full team. Every project is handled personally. No outsourcing, no templates, no copy-paste.",
    ],
    aboutClosing: "If you can describe what you want in plain English, I can build it.",
    skills: ["Python", "TypeScript", "React & Next.js", "OpenAI / Claude API", "FastAPI", "Discord.py", "Web Scraping", "REST APIs", "Supabase / PostgreSQL", "Tailwind CSS"],
    contactRole: "Full-stack Developer",
    contactTags: ["Python", "AI Tools", "Web Apps"],
    contactHeading1: "Let's build",
    contactHeading2: "something.",
    contactSub: "Tell me about your project and I'll get back to you within 24 hours.",
    contactBadge: "Available for new projects",
    contactPrimaryCta: { label: "Hire me on Fiverr", href: FIVERR_PROFILE },
    contactTile2: { title: "Free quote included", sub: "No commitment needed" },
    contactMessagePlaceholder: "Tell me about your project…",
  },
  day: {
    eyebrow: "SENIOR QA ENGINEER · PAYMENTS & FINTECH",
    heroLine1: "I break payment systems",
    heroLine2: "for a living.",
    heroLine3: "Now I'm doing it to AI.",
    heroSub: "Four years testing the rails that money actually moves on. EMV, ISO-8583, L3 certification across five card schemes, for Verifone, Geidea, and Costco's North American fuel network. Now I'm pointing the same paranoia at language models.",
    primaryCta: { label: "See my experience", href: "#experience" },
    secondaryCta: { label: "Connect on LinkedIn", href: LINKEDIN },
    navTagline: "QA engineer in payments/fintech, building AI on the side.",
    marquee: ["QA & Test Automation", "Payments & FinTech", "EMV & ISO-8583", "Compliance & Fraud Monitoring", "GenAI & Agentic AI", "LLM Evaluation"],
    stats: [
      { to: 4, suffix: "+", label: "Years in Payments & FinTech QA" },
      { to: 3, suffix: "", label: "Tier-1 clients: Verifone, Geidea, Gilbarco" },
      { to: 5, suffix: "", label: "Card schemes L3-certified" },
      { display: "GenAI", label: "Now learning: Agentic AI, LearnBay 2026–27" },
    ],
    aboutBio: [
      "I'm a Senior QA Engineer with 4+ years in payments and fintech: EMV transaction processing, ISO-8583 & NEXO protocol testing, and L2/L3 card certifications for Visa, Mastercard, Amex, UnionPay, and Diners Club, delivered for tier-1 clients including Verifone, Geidea, and Gilbarco (Costco North America).",
      "I'm extending that discipline into AI: learning GenAI & Agentic AI through a Master's program, and building real AI-powered tools (a multi-tenant SaaS knowledge base, automation, chatbots) on the side to apply it hands-on.",
    ],
    aboutClosing: "QA taught me how payment systems break. Now I'm learning to build and evaluate the AI systems that come next.",
    skills: ["EMV & ISO-8583", "PCI DSS Compliance", "REST API Automation (Python/Selenium)", "Settlement & Reconciliation", "JIRA & Zephyr", "SQL / DBeaver", "GenAI / LLMs (learning)", "Agentic AI (learning)", "React & Next.js"],
    contactRole: "QA Engineer → AI/Automation",
    contactTags: ["QA Engineer", "Payments", "FinTech"],
    contactHeading1: "Let's",
    contactHeading2: "connect.",
    contactSub: "Open to conversations about AI/Automation roles. Reach out on LinkedIn, email, or phone.",
    contactBadge: "Open to AI/Automation conversations",
    contactPrimaryCta: { label: "Connect on LinkedIn", href: LINKEDIN },
    contactTile2: { title: "Open to a conversation", sub: "No pitch, just a chat" },
    contactMessagePlaceholder: "Say hello, ask a question, or just connect…",
    resumeCta: { label: "Download résumé (PDF)", href: RESUME_PDF },
  },
};
