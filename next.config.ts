import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Modes used to be React state behind ?view=; they are routes now, so old shared
      // links have to survive. `?view=side|freelance` needs no rule: it already lands on
      // this route, and a "/" -> "/" redirect would loop (Next passes the query through).
      {
        source: "/",
        has: [{ type: "query", key: "view", value: "day|recruiter" }],
        destination: "/recruiters",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
