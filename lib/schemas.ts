import { FAQS } from "@/lib/faqs";
import { NAV, REVIEWS, SITE, SITE_URL } from "@/lib/site";

export { SITE_URL };
export const SITE_NAME = "Threads Physio";
export const DEFAULT_OG_IMAGE = "/wp/2024/06/body-img.png";
export const LOGO_PATH = "/wp/2024/05/logo-web.png";

export function normalizeIsoDate(d?: string): string | undefined {
  if (!d) return undefined;
  const s = d.trim();
  if (!s) return undefined;
  // Append IST offset if WordPress exported a bare local ISO timestamp without timezone
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(s)) return `${s}+05:30`;
  return s;
}

export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const clean = path.replace(/^\/+|\/+$/g, "");
  return `/${clean}/`;
}

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${normalizePath(path)}`;
}

export function absoluteAssetUrl(src?: string): string {
  if (!src) return `${SITE_URL}${DEFAULT_OG_IMAGE}`;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}

const CLINIC_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "F, 10/4, Golf Course Rd, DLF Phase 1, Sector 27",
  addressLocality: "Gurugram",
  addressRegion: "Haryana",
  postalCode: "122001",
  addressCountry: "IN",
};

const CLINIC_GEO = {
  "@type": "GeoCoordinates",
  latitude: 28.464666259981655,
  longitude: 77.09435878650744,
};

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "18:00",
  },
];

const AREA_SERVED = [
  { "@type": "City", name: "Gurugram" },
  { "@type": "City", name: "Gurgaon" },
  { "@type": "AdministrativeArea", name: "Delhi NCR" },
  { "@type": "Country", name: "India" },
];

export const DR_MANU_BORA_ID = `${SITE_URL}/about-us/meet-our-specialist/#dr-manu-bora`;
export const DR_AKHIL_ID = `${SITE_URL}/about-us/meet-our-specialist/#dr-akhil-agnihotri`;
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function buildDrManuBoraNode(): Record<string, unknown> {
  return {
    "@type": "Physician",
    "@id": DR_MANU_BORA_ID,
    name: "Dr. Manu Bora",
    url: `${SITE_URL}/about-us/meet-our-specialist/`,
    image: `${SITE_URL}/wp/2024/06/dr-manu2.webp`,
    jobTitle: "Associate Consultant – Arthroscopy & Sports Medicine",
    description:
      "Orthopedic & Sports Medicine Surgeon specializing in Arthroscopic ACL Reconstruction, Sports Injuries, and Post-Surgery Rehabilitation.",
    telephone: SITE.phone,
    address: CLINIC_ADDRESS,
    medicalSpecialty: ["https://schema.org/Musculoskeletal", "https://schema.org/Surgical"],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MBBS" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "M.S (Orthopaedics)" },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "fellowship",
        name: "FNB (Sports Medicine and Arthroscopy)",
      },
    ],
    knowsAbout: [
      "ACL Reconstruction Surgery",
      "Arthroscopy",
      "Sports Medicine",
      "Sports Injury Rehabilitation",
      "Knee & Shoulder Injuries",
    ],
    worksFor: { "@id": ORG_ID },
  };
}

export function buildDrAkhilNode(): Record<string, unknown> {
  return {
    "@type": "Physician",
    "@id": DR_AKHIL_ID,
    name: "Dr. Akhil Agnihotri",
    url: `${SITE_URL}/about-us/meet-our-specialist/`,
    image: `${SITE_URL}/wp/2024/06/dr-akhil-1.webp`,
    jobTitle: "Associate Consultant – Arthroscopy & Sports Medicine",
    description:
      "Orthopedic & Sports Medicine Specialist in Arthroscopy, Ligament Reconstruction, and Sports Rehabilitation.",
    telephone: SITE.phone,
    address: CLINIC_ADDRESS,
    medicalSpecialty: ["https://schema.org/Musculoskeletal", "https://schema.org/Surgical"],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MBBS" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "M.S (Orthopaedics)" },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "fellowship",
        name: "FNB (Sports Medicine and Arthroscopy)",
      },
    ],
    worksFor: { "@id": ORG_ID },
  };
}

export const THERAPIST_TEAM = [
  {
    id: "dr-astha-singh",
    name: "Dr. Astha Singh",
    jobTitle: "Senior Physiotherapist",
    image: "/wp/2025/11/WhatsApp-Image-2025-11-13-at-11.28.57-scaled.jpeg",
    description:
      "Musculoskeletal & Sports Physiotherapist, ACL Rehabilitation Expert, LSCCP (London Shoulder Clinic Certified Practitioner), Advanced Orthopedic Rehabilitation Specialist.",
  },
  {
    id: "dr-saif",
    name: "Dr. Saif (PT)",
    jobTitle: "Sports Physiotherapist",
    image: "/wp/2025/11/WhatsApp-Image-2025-11-13-at-11.28.48.jpeg",
    description: "MPT Sports and Rehabilitation Specialist.",
  },
  {
    id: "dr-riya-jain",
    name: "Dr. Riya Jain (PT)",
    jobTitle: "Physiotherapist",
    image: "/wp/2025/11/WhatsApp-Image-2025-11-13-at-11.33.43.jpeg",
    description: "BPT, ACL Rehab Expert and Sports Injury Specialist, Certified in Dry Needling.",
  },
  {
    id: "dr-haider-ali",
    name: "Dr. Haider Ali",
    jobTitle: "Physiotherapist",
    image: "/wp/2025/11/WhatsApp-Image-2025-11-13-at-11.24.38-scaled.jpeg",
    description:
      "Musculoskeletal and Sports Physiotherapist, Expert in ACL Rehabilitation and Knee, Shoulder & Spine Pain Management.",
  },
  {
    id: "dr-siddhi-kumari",
    name: "Dr. Siddhi Kumari (PT)",
    jobTitle: "Physiotherapist",
    image: "/wp/2025/11/WhatsApp-Image-2025-11-13-at-11.20.40.jpeg",
    description:
      "BPT Physiotherapist, ACL Rehab Expert and Sports Injury Specialist, Certified Manual Therapist & PNF Practitioner.",
  },
  {
    id: "dr-jaideep-sangwan",
    name: "Dr. Jaideep Sangwan (PT)",
    jobTitle: "Physiotherapist",
    image: "/wp/2026/01/WhatsApp-Image-2026-01-16-at-12.49.59-scaled.jpeg",
    description: "BPT, ACL Rehab Expert specializing in Dry Needling, Cupping, IASTM, and PNF.",
  },
];

export const TESTIMONIAL_VIDEOS = [
  {
    id: "gbSHuZ3iYOQ",
    name: "बिना सर्जरी के ठीक हुआ घुटने का दर्द PRP इंजेक्शन से | Knee Pain Relief Without Surgery",
    description:
      "Patient recovery story at Threads Physio: non-surgical knee pain relief with PRP injection and guided physiotherapy under Dr. Manu Bora.",
    uploadDate: "2024-06-01T04:27:48-07:00",
    duration: "PT1M14S",
  },
  {
    id: "xKPQBlDicm4",
    name: "Weight Lifter की Meniscus Surgery के 7 दिन बाद Recovery | Threads Physio",
    description:
      "Weightlifter recovery milestone 7 days after meniscus surgery with structured sports rehabilitation at Threads Physio.",
    uploadDate: "2024-04-29T03:29:17-07:00",
    duration: "PT1M14S",
  },
  {
    id: "qkylk1VIpCo",
    name: "उत्तर प्रदेश के कबड्डी प्लेयर AMAN की ACL Surgery के बाद Fast Recovery",
    description:
      "Kabaddi athlete Aman shares his fast ACL surgery recovery and sports physiotherapy rehabilitation experience at Threads Physio.",
    uploadDate: "2024-04-16T02:44:10-07:00",
    duration: "PT1M14S",
  },
  {
    id: "bUWTwMQ1m5o",
    name: "Threads Physio ने बिना ACL Surgery के एक नेशनल प्लेयर की गेम में करायी वापसी",
    description:
      "National athlete returns to competitive sport through non-operative ACL rehabilitation at Threads Physio.",
    uploadDate: "2024-04-09T23:14:57-07:00",
    duration: "PT2M30S",
  },
  {
    id: "TOx2waX2sJU",
    name: "दिल्ली के विदित नेशनल फुटबॉलर ACL, Meniscus Internal Brace Surgery के बाद फ़ास्ट Recovery",
    description:
      "National footballer Vidit from Delhi recovers rapidly after ACL and meniscus InternalBrace surgery and sports rehab at Threads Physio.",
    uploadDate: "2024-04-01T04:15:34-07:00",
    duration: "PT2M34S",
  },
];

export function buildOrganizationNode(includeReviews = false): Record<string, unknown> {
  const serviceNav = NAV.find((n) => n.label === "Our Services")?.children || [];
  return {
    "@type": ["MedicalClinic", "Physiotherapy"],
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: "Threads Physio by Dr. Manu Bora",
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      inLanguage: "en-US",
      "@id": `${SITE_URL}/#/schema/logo/image/`,
      url: `${SITE_URL}${LOGO_PATH}`,
      contentUrl: `${SITE_URL}${LOGO_PATH}`,
      caption: SITE_NAME,
    },
    image: [
      `${SITE_URL}/wp/2024/06/home-image-three.webp`,
      `${SITE_URL}${LOGO_PATH}`,
    ],
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "₹₹",
    address: CLINIC_ADDRESS,
    geo: CLINIC_GEO,
    hasMap: SITE.maps,
    openingHoursSpecification: OPENING_HOURS,
    areaServed: AREA_SERVED,
    medicalSpecialty: [
      "https://schema.org/Physiotherapy",
      "https://schema.org/Musculoskeletal",
    ],
    founder: { "@id": DR_MANU_BORA_ID },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        email: SITE.email,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        email: SITE.proposalEmail,
        contactType: "public relations",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Physiotherapy & Sports Rehabilitation Services",
      itemListElement: serviceNav.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalTherapy",
          name: s.label,
          url: canonicalUrl(s.href),
        },
      })),
    },
    sameAs: [
      SITE.social.linkedin,
      SITE.social.instagram,
      SITE.social.youtube,
    ],
    ...(includeReviews
      ? {
          review: REVIEWS.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            reviewBody: r.text,
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
              worstRating: "1",
            },
          })),
        }
      : {}),
  };
}

export function buildHomeFaqSchema(): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQS.map((f) => {
      const parts: string[] = [];
      if (f.intro) parts.push(`<p>${f.intro}</p>`);
      if (f.items?.length) {
        parts.push(
          `<ul>${f.items
            .map(([k, v]) => `<li><strong>${k}</strong> ${v}</li>`)
            .join("")}</ul>`
        );
      }
      if (f.outro) parts.push(`<p>${f.outro}</p>`);
      return {
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: parts.join(""),
        },
      };
    }),
  };
}

export function buildFaqNode(url: string, faqs: { q: string; a: string }[]): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

const CONDITION_ANATOMY: Record<string, { conditionName: string; anatomy: string }> = {
  "conditions/acl-rehabilitation": {
    conditionName: "Anterior Cruciate Ligament (ACL) Injury",
    anatomy: "Knee Joint / Anterior Cruciate Ligament",
  },
  "conditions/sports-injury-rehabilitation": {
    conditionName: "Sports & Musculoskeletal Injuries",
    anatomy: "Musculoskeletal System",
  },
  "conditions/chronic-pain-in-elderly": {
    conditionName: "Age-Related Chronic Joint & Muscle Pain",
    anatomy: "Joints, Spine & Musculoskeletal System",
  },
  "conditions/post-operative-rehabilitation": {
    conditionName: "Post-Surgical Orthopedic Recovery",
    anatomy: "Musculoskeletal System",
  },
  "arthritis-treatment-in-gurgaon": {
    conditionName: "Arthritis (Osteoarthritis & Rheumatoid Joint Stiffness)",
    anatomy: "Knee, Hip & Hand Joints",
  },
  "back-pain-treatment-gurgaon": {
    conditionName: "Lower & Upper Back Pain, Sciatica & Slip Disc",
    anatomy: "Lumbar & Cervical Spine",
  },
  "foot-and-ankle-pain-treatment-in-gurgaon": {
    conditionName: "Foot & Ankle Pain, Plantar Fasciitis & Ligament Sprains",
    anatomy: "Foot and Ankle",
  },
  "shoulder-pain-treatment-in-gurgaon": {
    conditionName: "Frozen Shoulder, Rotator Cuff Injury & Shoulder Impingement",
    anatomy: "Shoulder Joint",
  },
  "stem-cell-therapy": {
    conditionName: "Knee Osteoarthritis & Joint Cartilage Degeneration",
    anatomy: "Knee Joint",
  },
  "heal-your-acl-landing-page": {
    conditionName: "Anterior Cruciate Ligament (ACL) Tear",
    anatomy: "Knee Joint / Anterior Cruciate Ligament",
  },
};

export type BlogPostSummary = {
  slug: string;
  title: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
};

export function buildExtraRouteGraphNodes(
  path: string,
  title: string,
  description?: string,
  faqs?: { q: string; a: string }[],
  blogPosts?: BlogPostSummary[]
): { webPageTypes: string[]; extraNodes: Record<string, unknown>[] } {
  const normPath = normalizePath(path);
  const url = `${SITE_URL}${normPath}`;
  const key = normPath.replace(/^\/+|\/+$/g, "");
  const extraNodes: Record<string, unknown>[] = [];
  let webPageTypes: string[] = ["WebPage"];

  if (normPath === "/") {
    webPageTypes = ["WebPage", "MedicalWebPage"];
    extraNodes.push(buildDrManuBoraNode());
    extraNodes.push(buildHomeFaqSchema());
    return { webPageTypes, extraNodes };
  }

  if (key === "about-us") {
    webPageTypes = ["AboutPage", "MedicalWebPage"];
  } else if (key === "contact-us") {
    webPageTypes = ["ContactPage"];
  } else if (key === "about-us/meet-our-specialist") {
    webPageTypes = ["CollectionPage", "MedicalWebPage"];
    const manu = buildDrManuBoraNode();
    const akhil = buildDrAkhilNode();
    const therapistNodes = THERAPIST_TEAM.map((t) => ({
      "@type": "Person",
      "@id": `${url}#${t.id}`,
      name: t.name,
      jobTitle: t.jobTitle,
      description: t.description,
      image: absoluteAssetUrl(t.image),
      worksFor: { "@id": ORG_ID },
    }));
    extraNodes.push(manu, akhil, ...therapistNodes);
    extraNodes.push({
      "@type": "ItemList",
      "@id": `${url}#specialists`,
      name: "Orthopedic Surgeons & Specialist Physiotherapists at Threads Physio",
      itemListElement: [
        { "@type": "ListItem", position: 1, item: { "@id": DR_MANU_BORA_ID } },
        { "@type": "ListItem", position: 2, item: { "@id": DR_AKHIL_ID } },
        ...THERAPIST_TEAM.map((t, idx) => ({
          "@type": "ListItem",
          position: idx + 3,
          item: { "@id": `${url}#${t.id}` },
        })),
      ],
    });
  } else if (key === "about-us/sports-physiotherapist-internship-program") {
    webPageTypes = ["WebPage"];
    extraNodes.push({
      "@type": "EducationalOccupationalProgram",
      "@id": `${url}#internship`,
      name: "Sports Physiotherapist Internship Program",
      description:
        "Hands-on sports physiotherapy internship program at Threads Physio Gurugram covering ACL injuries, shoulder rehab, return-to-sports, and post-operative rehabilitation.",
      provider: { "@id": ORG_ID },
      timeToComplete: "P1M",
      occupationalCategory: "Sports Physiotherapist",
      programPrerequisites: "Final year students pursuing BPT (Bachelor of Physiotherapy)",
      educationalCredentialAwarded: "Certificate upon completion",
    });
    extraNodes.push({
      "@type": "Course",
      "@id": `${url}#course`,
      name: "Sports Physiotherapist Internship Program",
      description:
        "Clinical sports injury rehabilitation training for BPT physiotherapy interns covering knee, shoulder, and ankle athlete recovery.",
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        sameAs: `${SITE_URL}/`,
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "onsite",
        courseWorkload: "P1M",
        location: {
          "@type": "Place",
          name: SITE_NAME,
          address: CLINIC_ADDRESS,
        },
      },
    });
  } else if (key === "testimonials") {
    webPageTypes = ["CollectionPage"];
    TESTIMONIAL_VIDEOS.forEach((v) => {
      extraNodes.push({
        "@type": "VideoObject",
        "@id": `${url}#video-${v.id}`,
        name: v.name,
        description: v.description,
        thumbnailUrl: [`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`],
        uploadDate: v.uploadDate,
        duration: v.duration,
        contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
        embedUrl: `https://www.youtube.com/embed/${v.id}`,
        publisher: { "@id": ORG_ID },
      });
    });
    REVIEWS.forEach((r, idx) => {
      extraNodes.push({
        "@type": "Review",
        "@id": `${url}#review-${idx + 1}`,
        itemReviewed: { "@id": ORG_ID },
        author: { "@type": "Person", name: r.name },
        reviewBody: r.text,
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
      });
    });
  } else if (key === "our-services" || key === "programmes" || key === "conditions") {
    webPageTypes = ["CollectionPage", "MedicalWebPage"];
    const labelMap: Record<string, string> = {
      "our-services": "Our Services",
      programmes: "Programmes",
      conditions: "Conditions",
    };
    const kids = NAV.find((n) => n.label === labelMap[key])?.children || [];
    extraNodes.push({
      "@type": "ItemList",
      "@id": `${url}#list`,
      name: title,
      itemListElement: kids.map((c, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: c.label,
        url: canonicalUrl(c.href),
      })),
    });
  } else if (key === "our-services/acl-surgery") {
    webPageTypes = ["WebPage", "MedicalWebPage"];
    extraNodes.push(buildDrManuBoraNode(), buildDrAkhilNode());
    extraNodes.push({
      "@type": "MedicalProcedure",
      "@id": `${url}#procedure`,
      name: "Arthroscopic ACL Reconstruction Surgery",
      procedureType: "https://schema.org/SurgicalProcedure",
      bodyLocation: "Knee (Anterior Cruciate Ligament)",
      description:
        description ||
        "Minimally invasive arthroscopic ACL reconstruction surgery and comprehensive post-surgical sports rehabilitation in Gurgaon.",
      howPerformed:
        "Minimally invasive arthroscopic ligament reconstruction using a miniature camera and precision instruments through tiny incisions.",
      followup: "Personalized post-operative ACL physiotherapy and return-to-sports rehabilitation at Threads Physio.",
    });
    extraNodes.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: "ACL Surgery & Rehabilitation in Gurgaon",
      serviceType: "Orthopedic Surgery & Post-Surgical Physiotherapy",
      provider: { "@id": ORG_ID },
      areaServed: AREA_SERVED,
      ...(description ? { description } : {}),
    });
  } else if (key.startsWith("our-services/")) {
    webPageTypes = ["WebPage", "MedicalWebPage"];
    const isOnline = key === "our-services/online-physiotherapy";
    extraNodes.push({
      "@type": ["PhysicalTherapy", "MedicalTherapy"],
      "@id": `${url}#therapy`,
      name: title.replace(/\s*[-|]\s*Threads Physio.*$/i, ""),
      ...(description ? { description } : {}),
      medicineSystem: "https://schema.org/WesternConventional",
      recognizingAuthority: { "@id": ORG_ID },
    });
    extraNodes.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: title.replace(/\s*[-|]\s*Threads Physio.*$/i, ""),
      serviceType: isOnline ? "Online Tele-Physiotherapy Consultation" : "Physiotherapy & Sports Rehabilitation",
      provider: { "@id": ORG_ID },
      areaServed: isOnline ? { "@type": "Country", name: "India" } : AREA_SERVED,
      ...(description ? { description } : {}),
    });
  } else if (key.startsWith("programmes/")) {
    webPageTypes = ["WebPage", "MedicalWebPage"];
    const isCorporate = key.includes("corporate");
    extraNodes.push({
      "@type": ["PhysicalTherapy", "MedicalTherapy"],
      "@id": `${url}#programme-therapy`,
      name: title.replace(/\s*[-|]\s*Threads Physio.*$/i, ""),
    });
    extraNodes.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: title.replace(/\s*[-|]\s*Threads Physio.*$/i, ""),
      serviceType: isCorporate ? "Corporate Ergonomics & Workplace Wellness Programme" : "Sports Rehabilitation & Return-to-Play Programme",
      provider: { "@id": ORG_ID },
      areaServed: AREA_SERVED,
      audience: {
        "@type": isCorporate ? "BusinessAudience" : "PeopleAudience",
        audienceType: isCorporate ? "Corporate Teams & Employees" : "Athletes & Post-Surgery Patients",
      },
    });
  } else if (CONDITION_ANATOMY[key] || key === "acupuncture-treatment-in-gurgaon") {
    webPageTypes = ["WebPage", "MedicalWebPage"];
    const cond = CONDITION_ANATOMY[key];
    const cleanName = title.replace(/\s*[-|]\s*(?:Threads Physio|Best Clinic|Expert).*$/i, "").trim();

    extraNodes.push({
      "@type": ["PhysicalTherapy", "MedicalTherapy"],
      "@id": `${url}#therapy`,
      name: cleanName,
      ...(description ? { description } : {}),
    });

    if (cond) {
      extraNodes.push({
        "@type": "MedicalCondition",
        "@id": `${url}#condition`,
        name: cond.conditionName,
        associatedAnatomy: {
          "@type": "AnatomicalStructure",
          name: cond.anatomy,
        },
        possibleTreatment: { "@id": `${url}#therapy` },
      });
    }

    extraNodes.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: cleanName,
      serviceType: key.includes("acupuncture")
        ? "Acupuncture & Holistic Pain Relief Therapy"
        : key === "stem-cell-therapy"
          ? "Regenerative Orthopaedics — BMAC & Adipocyte Stem Cell Therapy"
          : "Physiotherapy & Pain Rehabilitation",
      provider: { "@id": ORG_ID },
      areaServed: AREA_SERVED,
      ...(description ? { description } : {}),
    });

    if (key === "heal-your-acl-landing-page") {
      extraNodes.push({
        "@type": "Course",
        "@id": `${url}#course`,
        name: "Heal Your ACL — Home Rehab & Recovery Program",
        description:
          description ||
          "Surgeon-designed 5-step ACL rehabilitation and supplement video protocol by Dr. Manu Bora for pre-surgery and post-surgery knee recovery.",
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          sameAs: `${SITE_URL}/`,
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          instructor: { "@id": DR_MANU_BORA_ID },
        },
        offers: {
          "@type": "Offer",
          price: "4999",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url,
        },
      });
    }
  } else if (key === "physiotherapist-in-gurgaon") {
    webPageTypes = ["WebPage", "MedicalWebPage"];
    extraNodes.push(buildHomeFaqSchema());
  } else if (key === "blogs") {
    webPageTypes = ["CollectionPage"];
    extraNodes.push({
      "@type": "Blog",
      "@id": `${url}#blog`,
      name: "Threads Physio Health & Rehabilitation Blog",
      url,
      publisher: { "@id": ORG_ID },
      inLanguage: "en-US",
      ...(blogPosts?.length
        ? {
            blogPost: blogPosts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: canonicalUrl(`/${p.slug}/`),
              ...(p.datePublished ? { datePublished: normalizeIsoDate(p.datePublished) } : {}),
              ...(p.dateModified ? { dateModified: normalizeIsoDate(p.dateModified) } : {}),
              ...(p.image ? { image: absoluteAssetUrl(p.image) } : {}),
              author: { "@id": ORG_ID },
              publisher: { "@id": ORG_ID },
            })),
          }
        : {}),
    });
  }

  if (faqs && faqs.length > 0) {
    extraNodes.push(buildFaqNode(url, faqs));
  }

  return { webPageTypes, extraNodes };
}
