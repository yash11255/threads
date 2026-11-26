import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PAGES } from "@/lib/pages";
import { POSTS, POST_LIST, type Post } from "@/lib/posts";
import { SITE, SITE_URL } from "@/lib/site";
import { buildLayout, type Layout, type Section } from "@/lib/sections";
import Counters from "@/components/Counters";
import Reviews from "@/components/Reviews";
import Steps from "@/components/Steps";

type Params = { params: Promise<{ slug: string[] }> };
const LEGAL = ["privacy-policy", "refund-policy", "terms-conditions", "blogs"];
const FALLBACK_IMG = "/wp/2024/06/home-image-three.webp";

export function generateStaticParams() {
  return [...Object.keys(PAGES).filter((k) => k !== "contact-us"), ...Object.keys(POSTS)].map((k) => ({ slug: k.split("/") }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const key = (await params).slug.join("/");
  const canonical = `/${key}/`;
  const post = POSTS[key];
  if (post) return {
    title: post.seoTitle, description: post.description, alternates: { canonical },
    openGraph: { type: "article", title: post.seoTitle, description: post.description, url: canonical, siteName: SITE.name, publishedTime: post.date, modifiedTime: post.modified, images: post.image ? [post.image] : undefined },
  };
  const p = PAGES[key];
  return p ? { title: p.seoTitle, description: p.description, alternates: { canonical }, openGraph: { title: p.seoTitle, description: p.description, url: canonical, siteName: SITE.name } } : {};
}

function Paras({ s }: { s: Section }) { return <>{s.paras.map((p, i) => <p key={i}>{p}</p>)}</>; }
function Lines({ items }: { items: string[] }) { return <ul className="line-list">{items.map((l) => <li key={l}>{l}</li>)}</ul>; }

function Render({ l, idx }: { l: Layout; idx: number }) {
  switch (l.kind) {
    case "intro": {
      const { s } = l; const img = s.imgs[0]?.src;
      return (
        <section className="ip-sec">
          <div className={`container ${img ? "two-col" : ""}`}>
            <div className="ip-text">
              {s.heading && <h2 className="accent">{s.heading}</h2>}
              <Paras s={s} />
              {s.sub && <h4 className="ip-sub">{s.sub}</h4>}
              {s.list.length > 0 && <Lines items={s.list} />}
            </div>
            {img && <div className="ip-img"><img src={img} alt="" /></div>}
          </div>
          {s.imgs.length > 1 && <div className="container img-row">{s.imgs.slice(1).map((m) => <img key={String(m.src)} src={m.src} alt="" />)}</div>}
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
      return (
        <section className="ip-sec">
          <div className="container two-col">
            <img src={s.imgs[0]?.src || FALLBACK_IMG} alt="" className="why-img" />
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
            {s.imgs.length > 0 && <div className="img-row">{s.imgs.map((m) => <img key={String(m.src) + idx} src={m.src} alt="" />)}</div>}
          </div>
        </section>
      );
    }
  }
}

export default async function InnerPage({ params }: Params) {
  const { slug } = await params;
  const key = slug.join("/");
  if (POSTS[key]) return <PostView slug={key} post={POSTS[key]} />;
  const page = PAGES[key];
  if (!page) notFound();
  if (key === "blogs") return <BlogIndex />;
  const { title, layout } = buildLayout(page.blocks);
  const isLegal = LEGAL.includes(key);

  return (
    <>
      <section className="ip-banner"><div className="container"><h1>{title || page.title}</h1></div></section>
      {layout.map((l, i) => <Render key={i} l={l} idx={i} />)}
      {!isLegal && (<><Counters /><Reviews /><Steps /></>)}
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

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

function PostView({ slug, post }: { slug: string; post: Post }) {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: post.title, description: post.description, datePublished: post.date, dateModified: post.modified,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    mainEntityOfPage: `${SITE_URL}/${slug}/`,
    author: { "@type": "Organization", name: SITE.name, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE_URL}/wp/2024/06/favicon.png` } },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="ip-banner"><div className="container"><h1>{post.title}</h1><p className="post-meta">{fmt(post.date)}{post.categories.length ? ` · ${post.categories.join(", ")}` : ""}</p></div></section>
      <article className="ip-sec"><div className="container content-blocks post-body">
        {post.image && !post.blocks.some((b) => b.src === post.image) && <img src={post.image} alt={post.imageAlt || post.title} />}
        <PostBlocks blocks={post.blocks} />
      </div></article>
    </>
  );
}

function PostBlocks({ blocks }: { blocks: Post["blocks"] }) {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.t === "li") {
      const items: string[] = [];
      while (i < blocks.length && blocks[i].t === "li") items.push(blocks[i++].x || "");
      i--; out.push(<ul key={i}>{items.map((x, j) => <li key={j}>{x}</li>)}</ul>);
    } else if (b.t === "img") out.push(<img key={i} src={b.src} alt={b.alt || ""} loading="lazy" />);
    else if (b.t === "h1") out.push(<h2 key={i}>{b.x}</h2>);
    else { const T = b.t; out.push(<T key={i}>{b.x}</T>); }
  }
  return <>{out}</>;
}

function BlogIndex() {
  return (
    <>
      <section className="ip-banner"><div className="container"><h1>Blogs</h1></div></section>
      <section className="ip-sec"><div className="container blog-grid">
        {POST_LIST.map((p) => (
          <a key={p.slug} href={`/${p.slug}/`} className="blog-card">
            {p.image && <img src={p.image} alt={p.imageAlt || p.title} loading="lazy" />}
            <div><span className="post-meta">{fmt(p.date)}</span><h3>{p.title}</h3><p>{p.excerpt.slice(0, 140)}{p.excerpt.length > 140 ? "…" : ""}</p></div>
          </a>
        ))}
      </div></section>
    </>
  );
}
