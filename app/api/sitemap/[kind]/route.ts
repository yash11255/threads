import { NextResponse } from "next/server";
import { PAGES } from "@/lib/pages";
import { getSitemapBlogPosts } from "@/lib/sanity";
import { canonicalUrl, SITE_URL } from "@/lib/seo";

export const revalidate = 60;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function xmlResponse(xml: string) {
  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600",
    },
  });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ kind: string }> }
) {
  const { kind } = await params;

  if (kind === "index") {
    const posts = await getSitemapBlogPosts();
    const childSitemaps = [`${SITE_URL}/page-sitemap.xml`];
    if (posts.length > 0) {
      childSitemaps.unshift(`${SITE_URL}/post-sitemap.xml`);
    }
    const items = childSitemaps
      .map((loc) => `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n  </sitemap>`)
      .join("\n");
    return xmlResponse(
      `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`
    );
  }

  if (kind === "pages") {
    const urls = [canonicalUrl("/"), ...Object.keys(PAGES).map((k) => canonicalUrl(`/${k}/`))];
    const unique = Array.from(new Set(urls));
    const items = unique
      .map((loc) => `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`)
      .join("\n");
    return xmlResponse(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`
    );
  }

  if (kind === "posts") {
    const posts = await getSitemapBlogPosts();
    const items = posts
      .map((p) => {
        const loc = canonicalUrl(`/${p.slug}/`);
        return `  <url>\n    <loc>${escapeXml(loc)}</loc>${
          p.updatedAt ? `\n    <lastmod>${escapeXml(p.updatedAt)}</lastmod>` : ""
        }\n  </url>`;
      })
      .join("\n");
    return xmlResponse(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`
    );
  }

  return new NextResponse("Not Found", { status: 404 });
}
