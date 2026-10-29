import team from "@/content/team.json";
import type { MetadataRoute } from "next";
import { pageNames, articles, associates, pathFor } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["en", "ar"].flatMap((l) =>
    [
      ...Object.keys(pageNames),
      ...articles.map((a) => "library/" + a.slug),
      ...Array.from(new Set([...associates, ...team].map((a) => "associates/" + a.slug))),
    ].map((p) => ({
      url: `${process.env.SITE_URL || "https://www.todarabia.com"}${pathFor(l as "en" | "ar", p)}`,
      alternates: {
        languages: {
          en: `${process.env.SITE_URL || "https://www.todarabia.com"}${pathFor("en", p)}`,
          ar: `${process.env.SITE_URL || "https://www.todarabia.com"}${pathFor("ar", p)}`,
        },
      },
    })),
  );
}
