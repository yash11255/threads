import raw from "@/data/pages.json";
export type Block = { t: "h1" | "h2" | "h3" | "h4" | "p" | "li" | "img"; x?: string; src?: string; alt?: string };
export type Page = { title: string; seoTitle: string; description: string; blocks: Block[]; faqTitle: string; faqs: { q: string; a: string }[] };
export const PAGES = raw as Record<string, Page>;
