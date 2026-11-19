import type { Block } from "@/lib/pages";

export type Section = { eyebrow?: string; heading?: string; paras: string[]; sub?: string; list: string[]; imgs: Block[]; cards: { t: string; p: string[] }[] };
export type Layout =
  | { kind: "intro"; s: Section }
  | { kind: "cards"; s: Section }
  | { kind: "why"; s: Section }
  | { kind: "mini"; items: { t: string; p: string }[] }
  | { kind: "text"; s: Section };

const empty = (): Section => ({ paras: [], list: [], imgs: [], cards: [] });

/** Splits flat scraped blocks into sections at each h1/h2 and picks a layout for each. */
export function buildLayout(blocks: Block[]): { title: string; layout: Layout[] } {
  let title = "";
  const secs: Section[] = [];
  let cur = empty();
  const push = () => { if (cur.heading || cur.paras.length || cur.list.length || cur.imgs.length || cur.cards.length) secs.push(cur); };
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.t === "h1" && !title) { title = b.x!; continue; }
    if (b.t === "h1" || b.t === "h2") {
      push(); cur = empty(); cur.heading = b.x;
      continue;
    }
    // short paragraph directly before an h2 = eyebrow of the next section
    if (b.t === "p" && blocks[i + 1]?.t === "h2" && b.x!.length < 60 && !/[.:]$/.test(b.x!)) {
      push(); cur = empty(); cur.eyebrow = b.x; cur.heading = blocks[++i].x; continue;
    }
    if (b.t === "h3" || b.t === "h4") { cur.cards.push({ t: b.x!, p: [] }); continue; }
    if (b.t === "img") { cur.imgs.push(b); continue; }
    if (b.t === "li") { cur.list.push(b.x!); continue; }
    if (cur.cards.length) cur.cards[cur.cards.length - 1].p.push(b.x!);
    else cur.paras.push(b.x!);
  }
  push();

  const layout: Layout[] = [];
  for (let i = 0; i < secs.length; i++) {
    const s = secs[i];
    // intro: untitled lead paragraphs merged with a following "includes:" list section
    if (i === 0 && !s.heading) {
      const nx = secs[i + 1];
      if (nx && nx.list.length && !nx.cards.length && !nx.paras.length) {
        s.sub = nx.heading; s.list = nx.list; s.imgs.push(...nx.imgs); i++;
      }
      layout.push({ kind: "intro", s }); continue;
    }
    // runs of short heading + one paragraph sections become mini cards
    if (s.heading && s.paras.length === 1 && !s.list.length && !s.cards.length && s.paras[0].length < 260 && secs[i + 1]?.paras.length === 1 && !secs[i + 1]?.list.length && !secs[i + 1]?.cards.length) {
      const items: { t: string; p: string }[] = [];
      while (i < secs.length && secs[i].heading && secs[i].paras.length === 1 && !secs[i].list.length && !secs[i].cards.length && secs[i].paras[0].length < 260) { items.push({ t: secs[i].heading!, p: secs[i].paras[0] }); i++; }
      i--; layout.push({ kind: "mini", items }); continue;
    }
    if (s.cards.length >= 2) { layout.push({ kind: "cards", s }); continue; }
    if (s.list.length && !s.cards.length && (s.eyebrow || /why/i.test(s.heading || ""))) { layout.push({ kind: "why", s }); continue; }
    layout.push({ kind: s.list.length && !s.cards.length && s.paras.length <= 4 ? "intro" : "text", s });
  }
  return { title, layout };
}
