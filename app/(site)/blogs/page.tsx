import Link from "next/link";
import type { Metadata } from "next";
import { PAGES } from "@/lib/pages";
import { getAllBlogPosts } from "@/lib/sanity";
import { buildPageMetadata, buildPageSchemas } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const revalidate = 60;

const blogPage = PAGES["blogs"];

export const metadata: Metadata = buildPageMetadata({
  title: blogPage?.seoTitle || "Blogs - Threads Physio",
  description: blogPage?.description || undefined,
  path: "/blogs/",
  ogImage: "/wp/2026/09/blog.png",
});

const fmt = (d?: string) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";

export default async function BlogsPage() {
  const posts = await getAllBlogPosts();

  const schemas = buildPageSchemas({
    path: "/blogs/",
    title: blogPage?.seoTitle || "Blogs - Threads Physio",
    description: blogPage?.description || undefined,
    primaryImage: "/wp/2026/09/blog.png",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blogs", path: "/blogs/" },
    ],
    blogPosts: posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt,
      image: p.coverImage?.url,
    })),
  });

  return (
    <>
      <JsonLd data={schemas} />
      <section className="ip-banner">
        <div className="container">
          <h1>Blogs</h1>
        </div>
      </section>
      <section className="ip-sec">
        <div className="container blog-grid">
          {posts.map((p) => (
            <Link key={p.slug} href={`/${p.slug}/`} className="blog-card">
              {p.coverImage?.url && (
                <img src={p.coverImage.url} alt={p.coverImage.alt || p.title} loading="lazy" />
              )}
              <div>
                {p.publishedAt && <span className="post-meta">{fmt(p.publishedAt)}</span>}
                <h2>{p.title}</h2>
                {p.excerpt && (
                  <p>
                    {p.excerpt.slice(0, 140)}
                    {p.excerpt.length > 140 ? "…" : ""}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
