import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: process.env.SITE_INDEXABLE === "true" ? "/" : "",
      disallow:
        process.env.SITE_INDEXABLE === "true" ? ["/admin/", "/api/"] : "/",
    },
    sitemap: `${process.env.SITE_URL || "https://todarabia.com"}/sitemap.xml`,
  };
}
