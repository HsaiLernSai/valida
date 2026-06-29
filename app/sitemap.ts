import type { MetadataRoute } from "next";
import { posts } from "@/lib/mock-data";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/profile`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/explore`, changeFrequency: "daily", priority: 0.9 },
    ...posts.map((post) => ({
      url: `${siteUrl}/research/${post.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
