import type { MetadataRoute } from "next"
import { site } from "@/data/site"

/**
 * Static sitemap for the three indexable routes. The blog lives on a separate
 * Astro site (blog.shenxianovo.com) with its own sitemap, so it is not listed
 * here. Projects have no per-slug detail pages yet, so only the index is added.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ]
}
