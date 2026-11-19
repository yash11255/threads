import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PAGES } from "@/lib/pages";
import { buildLayout, type Layout, type Section } from "@/lib/sections";
import Counters from "@/components/Counters";
import Reviews from "@/components/Reviews";
import Steps from "@/components/Steps";

type Params = { params: Promise<{ slug: string[] }> };
const LEGAL = ["privacy-policy", "refund-policy", "terms-conditions", "blogs"];
const FALLBACK_IMG = "/wp/2024/06/home-image-three.webp";

export function generateStaticParams() {
  return Object.keys(PAGES).filter((k) => k !== "contact-us").map((k) => ({ slug: k.split("/") }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = PAGES[(await params).slug.join("/")];
  return p ? { title: p.seoTitle, description: p.description } : {};
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
  const page = PAGES[key];
  if (!page) notFound();
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
