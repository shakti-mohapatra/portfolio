import { ImageResponse } from "next/og";

export const alt = "Shakti M. — Python, AI & Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #6d28d9 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            S
          </div>
          shaktibuilds
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 30, fontWeight: 500, opacity: 0.85 }}>Freelance Developer</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2 }}>
            <span>I make Python and AI</span>
            <span>do the work.</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 26 }}>
          {["Python Automation", "AI Chatbots", "Bug Fixing", "Discord / Telegram Bots"].map((t) => (
            <div
              key={t}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
