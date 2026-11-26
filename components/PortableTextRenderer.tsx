import Link from "next/link";
import type React from "react";
import type { PortableTextBlock, PortableTextSpan } from "@/lib/sanity";

export function extractYouTubeId(input?: string): string | null {
  if (!input) return null;
  const srcMatch = input.match(/src=["']([^"']+)["']/);
  const source = srcMatch ? srcMatch[1] : input;
  const idMatch = source.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  if (idMatch) return idMatch[1];
  const trimmed = input.trim();
  return /^[\w-]{11}$/.test(trimmed) ? trimmed : null;
}

export default function PortableTextRenderer({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;

  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < value.length) {
    const block = value[i];

    if (block._type === "block" && block.listItem) {
      const listType = block.listItem;
      const items: PortableTextBlock[] = [];
      while (value[i]?._type === "block" && value[i]?.listItem === listType) {
        items.push(value[i]);
        i += 1;
      }
      const ListTag = listType === "number" ? "ol" : "ul";
      nodes.push(
        <ListTag key={block._key}>
          {items.map((item) => (
            <li key={item._key}>{renderSpans(item)}</li>
          ))}
        </ListTag>
      );
      continue;
    }

    nodes.push(renderBlock(block));
    i += 1;
  }

  return <div className="post-html">{nodes}</div>;
}

function renderBlock(block: PortableTextBlock): React.ReactNode {
  if (block._type === "image") {
    if (!block.url) return null;
    return (
      <figure key={block._key}>
        <img src={block.url} alt={block.alt || ""} loading="lazy" />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }

  if (block._type === "horizontalRule") {
    return <hr key={block._key} style={{ border: 0, borderTop: "1px solid #e5e5e5", margin: "28px 0" }} />;
  }

  if (block._type === "table") {
    const rows = block.rows || [];
    if (!rows.length) return null;
    const [headerRow, ...bodyRows] = rows;
    return (
      <table key={block._key}>
        <thead>
          <tr>
            {headerRow.cells.map((cell, idx) => (
              <th key={idx}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rIdx) => (
            <tr key={row._key || rIdx}>
              {row.cells.map((cell, cIdx) => (
                <td key={cIdx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (block._type === "youtube") {
    const videoId = extractYouTubeId(block.url);
    if (!videoId) return null;
    return (
      <figure key={block._key}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={block.caption || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }

  switch (block.style) {
    case "h2":
      return <h2 key={block._key}>{renderSpans(block)}</h2>;
    case "h3":
      return <h3 key={block._key}>{renderSpans(block)}</h3>;
    case "h4":
      return <h4 key={block._key}>{renderSpans(block)}</h4>;
    case "blockquote":
      return <blockquote key={block._key}>{renderSpans(block)}</blockquote>;
    default:
      return <p key={block._key}>{renderSpans(block)}</p>;
  }
}

function renderSpans(block: PortableTextBlock) {
  return block.children?.map((child) => renderChild(child, block)) || null;
}

function renderChild(child: PortableTextSpan, block: PortableTextBlock): React.ReactNode {
  const rawText = child.text || "";
  let node: React.ReactNode = rawText.includes("\n")
    ? rawText.split("\n").map((part, idx) => (
        <span key={idx}>
          {idx > 0 && <br />}
          {part}
        </span>
      ))
    : rawText;

  const linkKey = child.marks?.find(
    (m) => block.markDefs?.find((d) => d._key === m)?._type === "link"
  );
  const linkDef = linkKey ? block.markDefs?.find((d) => d._key === linkKey) : undefined;

  child.marks?.forEach((mark) => {
    if (mark === linkKey) return;
    if (mark === "strong") node = <strong key={`${child._key}-${mark}`}>{node}</strong>;
    else if (mark === "em") node = <em key={`${child._key}-${mark}`}>{node}</em>;
    else if (mark === "underline")
      node = (
        <span key={`${child._key}-${mark}`} style={{ textDecoration: "underline" }}>
          {node}
        </span>
      );
    else if (mark === "code") node = <code key={`${child._key}-${mark}`}>{node}</code>;
  });

  if (linkDef?.href) {
    const href = linkDef.href;
    if (href.startsWith("/")) {
      node = (
        <Link key={`${child._key}-${linkKey}`} href={href}>
          {node}
        </Link>
      );
    } else {
      const isHttp = href.startsWith("http://") || href.startsWith("https://");
      node = (
        <a
          key={`${child._key}-${linkKey}`}
          href={href}
          target={isHttp ? "_blank" : undefined}
          rel={isHttp ? "noopener noreferrer" : undefined}
        >
          {node}
        </a>
      );
    }
  }

  return <span key={child._key}>{node}</span>;
}
