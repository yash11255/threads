import type { Metadata } from "next";
import Script from "next/script";
import { Raleway, Inter } from "next/font/google";
import { GA_MEASUREMENT_ID, GSC_VERIFICATION, SITE_URL } from "@/lib/seo";
import "./globals.css";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Threads Physio",
  verification: {
    google: GSC_VERIFICATION,
  },
  icons: {
    icon: [
      { url: "/wp/2024/06/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/wp/2024/06/favicon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/wp/2024/06/favicon.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${raleway.variable} ${inter.variable}`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            if (window.location.hostname === 'www.threadsphysio.com' || window.location.hostname === 'threadsphysio.com') {
              gtag('config', '${GA_MEASUREMENT_ID}');
            }
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
