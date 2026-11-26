import type { MetadataRoute } from "next";
import { PAGES } from "@/lib/pages";
import { POST_LIST } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    ...Object.keys(PAGES).map((k) => ({ url: `${SITE_URL}/${k}/`, priority: 0.8 })),
    ...POST_LIST.map((p) => ({ url: `${SITE_URL}/${p.slug}/`, lastModified: p.modified, priority: 0.6 })),
  ];
}
