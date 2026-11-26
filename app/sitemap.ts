import type { MetadataRoute } from "next";
import { PAGES } from "@/lib/pages";
import { getSitemapBlogPosts } from "@/lib/sanity";
import { canonicalUrl } from "@/lib/seo";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSitemapBlogPosts();
  const entries: MetadataRoute.Sitemap = [
    { url: canonicalUrl("/"), changeFrequency: "weekly", priority: 1.0 },
    ...Object.keys(PAGES).map((k) => ({
      url: canonicalUrl(`/${k}/`),
      changeFrequency: "monthly" as const,
      priority: k.startsWith("our-services") || k.endsWith("-gurgaon") ? 0.9 : 0.8,
    })),
    ...posts.map((p) => ({
      url: canonicalUrl(`/${p.slug}/`),
      ...(p.updatedAt ? { lastModified: p.updatedAt } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}
