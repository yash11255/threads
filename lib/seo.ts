import type { Metadata } from "next";
import {
  absoluteAssetUrl,
  buildDrManuBoraNode,
  buildExtraRouteGraphNodes,
  buildFaqNode,
  buildOrganizationNode,
  canonicalUrl,
  DEFAULT_OG_IMAGE,
  DR_MANU_BORA_ID,
  LOGO_PATH,
  normalizeIsoDate,
  normalizePath,
  ORG_ID,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  type BlogPostSummary,
} from "@/lib/schemas";

export {
  absoluteAssetUrl,
  canonicalUrl,
  DEFAULT_OG_IMAGE,
  LOGO_PATH,
  normalizeIsoDate,
  normalizePath,
  SITE_NAME,
  SITE_URL,
};

export const GA_MEASUREMENT_ID = "G-XNR8C1X4R6";
export const GSC_VERIFICATION = "iLbFtjSl0Ac0d8qOuDJM4Smr9BnZ8HA6viKxbrt5KcQ";

/** Pages on Live that emit the standalone Physiotherapy LocalBusiness JSON-LD block. */
export const PHYSIOTHERAPY_SCHEMA_PATHS = new Set([
  "/",
  "/physiotherapist-in-gurgaon/",
  "/acupuncture-treatment-in-gurgaon/",
  "/arthritis-treatment-in-gurgaon/",
  "/back-pain-treatment-gurgaon/",
  "/foot-and-ankle-pain-treatment-in-gurgaon/",
  "/shoulder-pain-treatment-in-gurgaon/",
  "/stem-cell-therapy/",
]);

/** Pages on Live that include the clinic map + appointment form section before FAQs. */
export const DIRECTIONS_SECTION_KEYS = new Set([
  "acupuncture-treatment-in-gurgaon",
  "arthritis-treatment-in-gurgaon",
  "back-pain-treatment-gurgaon",
  "foot-and-ankle-pain-treatment-in-gurgaon",
  "shoulder-pain-treatment-in-gurgaon",
  "conditions/post-operative-rehabilitation",
]);

type MetaInput = {
  title: string;
  description?: string;
  path: string;
  canonicalPath?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  canonicalPath,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "article",
  publishedTime,
  modifiedTime,
}: MetaInput): Metadata {
  const url = canonicalUrl(canonicalPath || path);
  const desc = description?.trim() ? description.trim() : undefined;
  const socialTitle = ogTitle || title;
  const socialDesc = ogDescription?.trim() || desc;
  const imgUrl = absoluteAssetUrl(ogImage || DEFAULT_OG_IMAGE);
  const isDefaultImg = !ogImage || ogImage === DEFAULT_OG_IMAGE;
  const isoPub = normalizeIsoDate(publishedTime);
  const isoMod = normalizeIsoDate(modifiedTime);

  return {
    title,
    ...(desc ? { description: desc } : {}),
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      locale: "en_US",
      type: ogType,
      title: socialTitle,
      ...(socialDesc ? { description: socialDesc } : {}),
      url,
      siteName: SITE_NAME,
      images: [
        isDefaultImg
          ? { url: imgUrl, width: 600, height: 600, type: "image/png" }
          : { url: imgUrl },
      ],
      ...(ogType === "article" && isoPub ? { publishedTime: isoPub } : {}),
      ...(ogType === "article" && isoMod ? { modifiedTime: isoMod } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      ...(socialDesc ? { description: socialDesc } : {}),
      images: [imgUrl],
    },
  };
}

export type BreadcrumbItem = { name: string; path: string };

type SchemaInput = {
  path: string;
  title: string;
  description?: string;
  primaryImage?: string;
  breadcrumbs: BreadcrumbItem[];
  faqs?: { q: string; a: string }[];
  blogPosts?: BlogPostSummary[];
  includePhysiotherapySchema?: boolean;
  article?: {
    headline: string;
    datePublished?: string;
    dateModified?: string;
    authorName?: string;
    categories?: string[];
  };
};

export function buildPageSchemas({
  path,
  title,
  description,
  primaryImage,
  breadcrumbs,
  faqs,
  blogPosts,
  includePhysiotherapySchema,
  article,
}: SchemaInput): Record<string, unknown>[] {
  const normPath = normalizePath(path);
  const url = `${SITE_URL}${normPath}`;
  const imgUrl = primaryImage ? absoluteAssetUrl(primaryImage) : undefined;
  const isoPub = normalizeIsoDate(article?.datePublished);
  const isoMod = normalizeIsoDate(article?.dateModified);

  const graph: Record<string, unknown>[] = [];
  const { webPageTypes, extraNodes } = article
    ? {
        webPageTypes: ["WebPage", "MedicalWebPage"],
        extraNodes: [
          buildDrManuBoraNode(),
          ...(faqs?.length ? [buildFaqNode(url, faqs)] : []),
        ],
      }
    : buildExtraRouteGraphNodes(normPath, title, description, faqs, blogPosts);

  if (article) {
    graph.push({
      "@type": ["BlogPosting", "Article"],
      "@id": `${url}#article`,
      isPartOf: { "@id": url },
      author: {
        "@type": "Organization",
        name: article.authorName || SITE_NAME,
        "@id": ORG_ID,
      },
      reviewedBy: { "@id": DR_MANU_BORA_ID },
      headline: article.headline,
      ...(description?.trim() ? { description: description.trim() } : {}),
      ...(article.categories?.length ? { articleSection: article.categories } : {}),
      ...(isoPub ? { datePublished: isoPub } : {}),
      ...(isoMod ? { dateModified: isoMod } : {}),
      mainEntityOfPage: { "@id": url },
      publisher: { "@id": ORG_ID },
      ...(imgUrl ? { image: { "@id": `${url}#primaryimage` }, thumbnailUrl: imgUrl } : {}),
      inLanguage: "en-US",
    });
  }

  const webPageNode: Record<string, unknown> = {
    "@type": webPageTypes.length === 1 ? webPageTypes[0] : webPageTypes,
    "@id": url,
    url,
    name: title,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    ...(normPath === "/about-us/" || normPath === "/contact-us/"
      ? { mainEntity: { "@id": ORG_ID } }
      : {}),
    ...(webPageTypes.includes("MedicalWebPage")
      ? {
          specialty: "https://schema.org/Physiotherapy",
          lastReviewed: "2026-01-16",
          reviewedBy: { "@id": DR_MANU_BORA_ID },
        }
      : {}),
    ...(imgUrl
      ? {
          primaryImageOfPage: { "@id": `${url}#primaryimage` },
          image: { "@id": `${url}#primaryimage` },
          thumbnailUrl: imgUrl,
        }
      : {}),
    ...(isoPub ? { datePublished: isoPub } : {}),
    ...(isoMod ? { dateModified: isoMod } : {}),
    ...(description?.trim() ? { description: description.trim() } : {}),
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en-US",
    potentialAction: [{ "@type": "ReadAction", target: [url] }],
  };
  graph.push(webPageNode);

  if (imgUrl) {
    graph.push({
      "@type": "ImageObject",
      inLanguage: "en-US",
      "@id": `${url}#primaryimage`,
      url: imgUrl,
      contentUrl: imgUrl,
    });
  }

  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: breadcrumbs.map((b, idx) => {
      const isLast = idx === breadcrumbs.length - 1;
      return isLast
        ? { "@type": "ListItem", position: idx + 1, name: b.name }
        : { "@type": "ListItem", position: idx + 1, name: b.name, item: canonicalUrl(b.path) };
    }),
  });

  graph.push({
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: "Best Physiotherapist in Gurgaon | Threads Physio by Dr. Manu Bora",
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  });

  graph.push(buildOrganizationNode(normPath === "/"));
  graph.push(buildDrManuBoraNode());

  const seenIds = new Set<string>(
    graph.map((n) => (typeof n["@id"] === "string" ? (n["@id"] as string) : "")).filter(Boolean)
  );
  for (const node of extraNodes) {
    const id = typeof node["@id"] === "string" ? (node["@id"] as string) : "";
    if (id && seenIds.has(id)) continue;
    if (id) seenIds.add(id);
    graph.push(node);
  }

  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@graph": graph,
    },
  ];

  if (includePhysiotherapySchema ?? PHYSIOTHERAPY_SCHEMA_PATHS.has(normPath)) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Physiotherapy",
      name: SITE_NAME,
      image: `${SITE_URL}${LOGO_PATH}`,
      "@id": `${SITE_URL}/#physiotherapy`,
      url: `${SITE_URL}/`,
      telephone: "+91-9310138022",
      email: "threadsphysio@gmail.com",
      priceRange: "₹₹",
      hasMap: "https://www.google.com/maps/place/Threads+Physio/@28.4644116,77.0943266,17z",
      address: {
        "@type": "PostalAddress",
        streetAddress: "F- 10/4, Golf Course Rd, DLF Phase 1, Sector 27",
        addressLocality: "Gurugram",
        addressRegion: "Haryana",
        postalCode: "122001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 28.464666259981655,
        longitude: 77.09435878650744,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "10:00",
          closes: "18:00",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/threads-physio/",
        "https://www.instagram.com/threadsphysio",
        "https://www.youtube.com/@ThreadsPhysio",
      ],
    });
  }

  return schemas;
}
