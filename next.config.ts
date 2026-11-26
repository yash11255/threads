import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,

  async headers() {
    return [
      // Prevent Google from indexing staging (*.vercel.app) or localhost deployments
      {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "localhost(:\\d+)?" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      // Never index admin or API endpoints on any domain
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  async rewrites() {
    return [
      // Preserve all existing WordPress /wp-content/uploads/... media URLs cleanly from /public/wp/...
      {
        source: "/wp-content/uploads/:path*",
        destination: "/wp/:path*",
      },
      // Yoast-compatible XML sitemap URLs without trailing-slash redirects
      {
        source: "/sitemap_index.xml",
        destination: "/api/sitemap/index/",
      },
      {
        source: "/page-sitemap.xml",
        destination: "/api/sitemap/pages/",
      },
      {
        source: "/post-sitemap.xml",
        destination: "/api/sitemap/posts/",
      },
    ];
  },

  async redirects() {
    return [
      // Legacy WordPress sitemap URL -> Yoast sitemap_index.xml
      {
        source: "/wp-sitemap.xml",
        destination: "/sitemap_index.xml",
        permanent: true,
      },
      // WordPress author archive, blog pagination, taxonomy archives, RSS feeds, and junk error post
      {
        source: "/author/:slug*/",
        destination: "/about-us/meet-our-specialist/",
        permanent: true,
      },
      {
        source: "/blogs/page/:page*/",
        destination: "/blogs/",
        permanent: true,
      },
      {
        source: "/category/:slug*/",
        destination: "/blogs/",
        permanent: true,
      },
      {
        source: "/tag/:slug*/",
        destination: "/blogs/",
        permanent: true,
      },
      {
        source: "/feed/",
        destination: "/blogs/",
        permanent: true,
      },
      {
        source: "/comments/feed/",
        destination: "/blogs/",
        permanent: true,
      },
      {
        source: "/cache-error-please-try-again/",
        destination: "/blogs/",
        permanent: true,
      },
      // Legacy Paid Memberships Pro / Login / ACL Video Course URLs from Live page-sitemap.xml
      {
        source: "/login/",
        destination: "/contact-us/",
        permanent: true,
      },
      {
        source: "/sign-up/",
        destination: "/contact-us/",
        permanent: true,
      },
      {
        source: "/membership-account/",
        destination: "/contact-us/",
        permanent: true,
      },
      {
        source: "/membership-account/:path*/",
        destination: "/contact-us/",
        permanent: true,
      },
      {
        source: "/membership-levels/",
        destination: "/programmes/",
        permanent: true,
      },
      {
        source: "/membership-checkout/",
        destination: "/programmes/",
        permanent: true,
      },
      {
        source: "/membership-checkout/:path*/",
        destination: "/programmes/",
        permanent: true,
      },
      {
        source: "/acl-part-1-full-video-training/",
        destination: "/programmes/return-to-sports-after-acl-surgery/",
        permanent: true,
      },
      {
        source: "/acl-part-1-full-video-training-2/",
        destination: "/programmes/return-to-sports-after-acl-surgery/",
        permanent: true,
      },
      {
        source: "/acl-part-1-full-video-training-3/",
        destination: "/programmes/return-to-sports-after-acl-surgery/",
        permanent: true,
      },
      {
        source: "/acl-part-1-confirmation/",
        destination: "/programmes/return-to-sports-after-acl-surgery/",
        permanent: true,
      },
      {
        source: "/acl-part-1-confirmation-2/",
        destination: "/programmes/return-to-sports-after-acl-surgery/",
        permanent: true,
      },
      {
        source: "/acl-part-3-confirmation/",
        destination: "/programmes/return-to-sports-after-acl-surgery/",
        permanent: true,
      },
      {
        source: "/heal-your-acl-bundle-confirmation/",
        destination: "/programmes/return-to-sports-after-acl-surgery/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
