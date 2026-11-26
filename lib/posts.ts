import raw from "@/data/posts.json";
import type { Block } from "@/lib/pages";
export type Post = { title: string; seoTitle: string; description: string; date: string; modified: string; excerpt: string; categories: string[]; image?: string | null; imageAlt: string; blocks: Block[] };
export const POSTS = raw as unknown as Record<string, Post>;
export const POST_LIST = Object.entries(POSTS).map(([slug, p]) => ({ slug, ...p })).sort((a, b) => b.date.localeCompare(a.date));
