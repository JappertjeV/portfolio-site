import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

const SITE_URL = "https://jasperveldhuizen.nl";
const locales = ["en", "nl"] as const;

function url(path: string, locale: string) {
  return locale === "en" ? `${SITE_URL}${path}` : `${SITE_URL}/nl${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs();

  const blogEntries: MetadataRoute.Sitemap = slugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: url(`/blog/${slug}`, locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [
    ...locales.map((locale) => ({
      url: url("/", locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    })),
    ...locales.map((locale) => ({
      url: url("/projects", locale),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...locales.map((locale) => ({
      url: url("/blog", locale),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...blogEntries,
  ];
}
