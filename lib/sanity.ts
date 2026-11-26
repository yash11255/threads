import {createClient} from "@sanity/client";

export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jh6479ac";
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const THREADS_SITE_ID = "threads-physio";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2026-01-01",
  useCdn: true,
  perspective: "published",
});

export type PortableTextSpan = {
  _key: string;
  _type: "span";
  text?: string;
  marks?: string[];
};

export type PortableTextMarkDef = {
  _key: string;
  _type: string;
  href?: string;
};

export type PortableTextBlock = {
  _key: string;
  _type: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
  url?: string;
  alt?: string;
  caption?: string;
  uploadDate?: string;
  duration?: string;
  rows?: { _key: string; _type?: string; cells: string[] }[];
};

export type SanityBlogPost = {
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: { url?: string; alt?: string };
  author?: string;
  category?: string;
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    noIndex?: boolean;
  };
  body?: PortableTextBlock[];
  faqs?: { question: string; answer: string }[];
  references?: { title: string; publisher?: string; url: string }[];
};

const LIST_PROJECTION = `{
  "slug": slug.current,
  title,
  excerpt,
  "coverImage": coverImage { "url": asset->url, "alt": coalesce(alt, "") },
  "author": author->name,
  "category": category->title,
  publishedAt,
  "updatedAt": coalesce(updatedAt, _updatedAt),
  readingTime
}`;

const DETAIL_PROJECTION = `{
  "slug": slug.current,
  title,
  excerpt,
  "coverImage": coverImage { "url": asset->url, "alt": coalesce(alt, "") },
  "author": author->name,
  "category": category->title,
  publishedAt,
  "updatedAt": coalesce(updatedAt, _updatedAt),
  readingTime,
  seo { metaTitle, metaDescription, "ogImage": ogImage.asset->url, noIndex },
  body[] { ..., "url": coalesce(url, asset->url) },
  faqs[] { question, answer },
  references[] { title, publisher, url }
}`;

export async function getAllBlogPosts(): Promise<SanityBlogPost[]> {
  try {
    return await sanityClient.fetch<SanityBlogPost[]>(
      `*[_type == "article" && siteId == $siteId && status == "published" && defined(slug.current)] | order(publishedAt desc)${LIST_PROJECTION}`,
      { siteId: THREADS_SITE_ID },
      { next: { revalidate: 60 } }
    );
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  try {
    return await sanityClient.fetch<SanityBlogPost | null>(
      `*[_type == "article" && siteId == $siteId && slug.current == $slug && status == "published"][0]${DETAIL_PROJECTION}`,
      { siteId: THREADS_SITE_ID, slug },
      { next: { revalidate: 60 } }
    );
  } catch {
    return null;
  }
}

export async function getSitemapBlogPosts(): Promise<
  { slug: string; updatedAt?: string }[]
> {
  try {
    return await sanityClient.fetch<{ slug: string; updatedAt?: string }[]>(
      `*[_type == "article" && siteId == $siteId && status == "published" && seo.noIndex != true && defined(slug.current)] | order(publishedAt desc){
        "slug": slug.current,
        "updatedAt": coalesce(updatedAt, publishedAt, _updatedAt)
      }`,
      { siteId: THREADS_SITE_ID },
      { next: { revalidate: 60 } }
    );
  } catch {
    return [];
  }
}
