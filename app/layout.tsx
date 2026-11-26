import type { Metadata } from "next";
import { Raleway, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Best Physiotherapy Clinic in Gurgaon | Threads Physio",
  metadataBase: new URL(SITE_URL),
  description: "Threads Physio by Dr. Manu Bora is a top-rated physiotherapy clinic in Gurgaon for back pain, knee injuries, ACL rehab, sports injuries and post-surgery rehabilitation.",
  icons: { icon: "/wp/2024/06/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${raleway.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
