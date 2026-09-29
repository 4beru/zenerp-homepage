import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/** Sitemap del sitio (homepage única, por ahora). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
