import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PAGES } from "@/lib/pages";
import { getBlogPostBySlug, getSitemapBlogPosts, type SanityBlogPost } from "@/lib/sanity";
import { SITE } from "@/lib/site";
import { buildLayout, type Layout, type Section } from "@/lib/sections";
import {
  buildPageMetadata,
  buildPageSchemas,
  DIRECTIONS_SECTION_KEYS,
  type BreadcrumbItem,
} from "@/lib/seo";
import Counters from "@/components/Counters";
import Reviews from "@/components/Reviews";
import Steps from "@/components/Steps";
import AppointmentForm from "@/components/AppointmentForm";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import JsonLd from "@/components/JsonLd";

export const revalidate = 60;
export const dynamicParams = true;

type Params = { params: Promise<{ slug: string[] }> };
const LEGAL = ["privacy-policy", "refund-policy", "terms-conditions"];
const DEDICATED_ROUTES = new Set([
  "contact-us",
  "blogs",
  "stem-cell-therapy",
  "heal-your-acl-landing-page",
  "physiotherapist-in-gurgaon",
]);
const FALLBACK_IMG = "/wp/2024/06/home-image-three.webp";

export async function generateStaticParams() {
  const pageParams = Object.keys(PAGES)
    .filter((k) => !DEDICATED_ROUTES.has(k))
    .map((k) => ({ slug: k.split("/") }));
  const sanityPosts = await getSitemapBlogPosts();
  const postParams = sanityPosts
    .map((p) => p.slug)
    .filter((slug) => !PAGES[slug] && !DEDICATED_ROUTES.has(slug))
    .map((slug) => ({ slug: slug.split("/") }));
  return [...pageParams, ...postParams];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const key = (await params).slug.join("/");
  const page = PAGES[key];
  if (page) {
    const firstImg = page.blocks.find((b) => b.t === "img")?.src;
    return buildPageMetadata({
      title: page.seoTitle,
      description: page.description,
      path: `/${key}/`,
      ogImage: firstImg,
    });
  }

  const post = await getBlogPostBySlug(key);
  if (post) {
    const meta = buildPageMetadata({
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      path: `/${key}/`,
      ogImage: post.seo?.ogImage || post.coverImage?.url,
      ogType: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    });
    if (post.seo?.noIndex) {
      meta.robots = { index: false, follow: false };
    }
    return meta;
  }

  return {};
}

function Paras({ s }: { s: Section }) { return <>{s.paras.map((p, i) => <p key={i}>{p}</p>)}</>; }
function Lines({ items }: { items: string[] }) { return <ul className="line-list">{items.map((l) => <li key={l}>{l}</li>)}</ul>; }

function Render({ l, idx }: { l: Layout; idx: number }) {
  switch (l.kind) {
    case "intro": {
      const { s } = l; const img = s.imgs[0];
      return (
        <section className="ip-sec">
          <div className={`container ${img?.src ? "two-col" : ""}`}>
            <div className="ip-text">
              {s.heading && <h2 className="accent">{s.heading}</h2>}
              <Paras s={s} />
              {s.sub && <h2 className="ip-sub">{s.sub}</h2>}
              {s.list.length > 0 && <Lines items={s.list} />}
            </div>
            {img?.src && <div className="ip-img"><img src={img.src} alt={img.alt || ""} /></div>}
          </div>
          {s.imgs.length > 1 && <div className="container img-row">{s.imgs.slice(1).map((m) => <img key={String(m.src)} src={m.src} alt={m.alt || ""} />)}</div>}
        </section>
      );
    }
    case "cards": {
      const { s } = l;
      return (
        <section className="ip-sec">
          <div className="container">
            {s.heading && <h2 className="accent ip-h">{s.heading}</h2>}
            <div className="ip-lead"><Paras s={s} /></div>
            {s.list.length > 0 && <Lines items={s.list} />}
            <div className="box-grid">
              {s.cards.map((c) => <div className="box" key={c.t}><h3>{c.t}</h3>{c.p.map((p, i) => <p key={i}>{p}</p>)}</div>)}
            </div>
          </div>
        </section>
      );
    }
    case "why": {
      const { s } = l;
      const firstImg = s.imgs[0];
      return (
        <section className="ip-sec">
          <div className="container two-col">
            <img src={firstImg?.src || FALLBACK_IMG} alt={firstImg?.alt || ""} className="why-img" />
            <div>
              {s.eyebrow && <span className="eyebrow-y">{s.eyebrow}</span>}
              <h2 className="accent">{s.heading}</h2>
              <div className="ip-small"><Paras s={s} /></div>
              <Lines items={s.list} />
            </div>
          </div>
        </section>
      );
    }
    case "mini":
      return (
        <section className="ip-sec">
          <div className="container box-grid">
            {l.items.map((c) => <div className="box" key={c.t}><h3>{c.t}</h3><p>{c.p}</p></div>)}
          </div>
        </section>
      );
    default: {
      const { s } = l;
      return (
        <section className="ip-sec">
          <div className="container content-blocks">
            {s.eyebrow && <span className="eyebrow-y">{s.eyebrow}</span>}
            {s.heading && <h2 className="accent">{s.heading}</h2>}
            <Paras s={s} />
            {s.list.length > 0 && <Lines items={s.list} />}
            {s.cards.map((c) => <div key={c.t}><h3>{c.t}</h3>{c.p.map((p, i) => <p key={i}>{p}</p>)}</div>)}
            {s.imgs.length > 0 && <div className="img-row">{s.imgs.map((m) => <img key={String(m.src) + idx} src={m.src} alt={m.alt || ""} />)}</div>}
          </div>
        </section>
      );
    }
  }
}

function buildBreadcrumbsForKey(key: string, label: string): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ name: "Home", path: "/" }];
  const parts = key.split("/");
  if (parts.length > 1) {
    const parentKey = parts.slice(0, -1).join("/");
    const parentPage = PAGES[parentKey];
    if (parentPage) {
      crumbs.push({ name: parentPage.title, path: `/${parentKey}/` });
    }
  }
  crumbs.push({ name: label, path: `/${key}/` });
  return crumbs;
}

const fmt = (d?: string) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";

function PostView({ slug, post }: { slug: string; post: SanityBlogPost }) {
  const mappedFaqs = post.faqs?.map((f) => ({ q: f.question, a: `<p>${f.answer}</p>` }));
  const postSchemas = buildPageSchemas({
    path: `/${slug}/`,
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    primaryImage: post.seo?.ogImage || post.coverImage?.url,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blogs", path: "/blogs/" },
      { name: post.title, path: `/${slug}/` },
    ],
    faqs: mappedFaqs,
    article: {
      headline: post.title,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      authorName: post.author || SITE.name,
      categories: post.category ? [post.category] : undefined,
    },
  });

  const metaParts = [
    fmt(post.publishedAt),
    post.category,
    post.readingTime ? `${post.readingTime} min read` : "",
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={postSchemas} />
      <section className="ip-banner">
        <div className="container">
          <h1>{post.title}</h1>
          {metaParts.length > 0 && <p className="post-meta">{metaParts.join(" · ")}</p>}
          <div className="crumbs" style={{ marginTop: 8 }}>
            <Link href="/">Home</Link> / <Link href="/blogs/">Blogs</Link> /{" "}
            <span className="accent">{post.title}</span>
          </div>
        </div>
      </section>
      <article className="ip-sec post-article">
        <div className="container content-blocks post-body">
          {post.coverImage?.url &&
            !post.body?.some((b) => b._type === "image" && b.url === post.coverImage?.url) && (
              <img
                src={post.coverImage.url}
                alt={post.coverImage.alt || post.title}
                className="post-hero-img"
              />
            )}
          {post.body?.length ? <PortableTextRenderer value={post.body} /> : null}

          {post.references && post.references.length > 0 && (
            <div className="post-refs" style={{ marginTop: 36, paddingTop: 20, borderTop: "1px solid #eaeaea" }}>
              <h3>Clinical References</h3>
              <ol>
                {post.references.map((ref, i) => (
                  <li key={i}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                      {ref.title}
                    </a>
                    {ref.publisher ? ` — ${ref.publisher}` : ""}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </article>
      {post.faqs && post.faqs.length > 0 && (
        <section className="section faq-sec">
          <div className="container">
            <h2 className="center accent">Frequently Asked Questions</h2>
            <div className="faq">
              {post.faqs.map((f) => (
                <details key={f.question}>
                  <summary>{f.question}</summary>
                  <div className="ans">
                    <p>{f.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
      <Steps />
    </>
  );
}

export default async function InnerPage({ params }: Params) {
  const { slug } = await params;
  const key = slug.join("/");

  const page = PAGES[key];
  if (page) {
    const { title, layout } = buildLayout(page.blocks);
    const isLegal = LEGAL.includes(key);
    const hasDirections = DIRECTIONS_SECTION_KEYS.has(key);
    const firstImg = page.blocks.find((b) => b.t === "img")?.src;
    const schemas = buildPageSchemas({
      path: `/${key}/`,
      title: page.seoTitle,
      description: page.description,
      primaryImage: firstImg,
      breadcrumbs: buildBreadcrumbsForKey(key, page.title),
      faqs: page.faqs,
    });

    return (
      <>
        <JsonLd data={schemas} />
        <section className="ip-banner"><div className="container"><h1>{title || page.title}</h1></div></section>
        {layout.map((l, i) => <Render key={i} l={l} idx={i} />)}
        {!isLegal && (<><Counters /><Reviews /><Steps /></>)}
        {hasDirections && (
          <section className="section">
            <div className="container">
              <h2 className="accent">Get Directions to Threads Physio Clinic</h2>
              <div className="two-col" style={{ marginTop: 30, alignItems: "stretch" }}>
                <div className="map-wrap"><iframe src={SITE.mapEmbed} loading="lazy" title="Threads Physio location" /></div>
                <AppointmentForm formName={`${page.title} - Appointment`} compact />
              </div>
            </div>
          </section>
        )}
        {page.faqs?.length > 0 && (
          <section className="section faq-sec">
            <div className="container">
              <h2 className="center accent">{page.faqTitle}</h2>
              <div className="faq">
                {page.faqs.map((f) => (
                  <details key={f.q}><summary>{f.q}</summary><div className="ans" dangerouslySetInnerHTML={{ __html: f.a }} /></details>
                ))}
              </div>
            </div>
          </section>
        )}
      </>
    );
  }

  const post = await getBlogPostBySlug(key);
  if (post) return <PostView slug={key} post={post} />;

  notFound();
}
