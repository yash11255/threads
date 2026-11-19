import type { Block } from "@/lib/pages";
import type { ReactNode } from "react";

// Groups consecutive <li> into lists and consecutive images into rows.
export default function ContentBlocks({ blocks }: { blocks: Block[] }) {
  const out: ReactNode[] = [];
  for (let i = 0; i < blocks.length; ) {
    const b = blocks[i];
    if (b.t === "li" || b.t === "img") {
      const run: Block[] = [];
      while (i < blocks.length && blocks[i].t === b.t) run.push(blocks[i++]);
      out.push(b.t === "li"
        ? <ul className="check-list" key={i}>{run.map((r, j) => <li key={j}>{r.x}</li>)}</ul>
        : run.length > 1
          ? <div className="img-row" key={i}>{run.map((r, j) => <img key={j} src={r.src} alt={r.alt || ""} loading="lazy" />)}</div>
          : <img key={i} src={b.src} alt={b.alt || ""} loading="lazy" />);
      continue;
    }
    const Tag = (b.t === "h1" ? "h2" : b.t) as "h2" | "h3" | "h4" | "p";
    out.push(<Tag key={i}>{b.x}</Tag>);
    i++;
  }
  return <div className="content-blocks">{out}</div>;
}
