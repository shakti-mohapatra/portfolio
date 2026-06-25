import type { MetadataRoute } from "next";

const SITE_URL = "https://portfolio-xi-lilac-71.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
