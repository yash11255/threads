import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Page Not Found - Threads Physio",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="ip-banner">
          <div className="container">
            <h1>Page Not Found</h1>
          </div>
        </section>
        <section className="section center">
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 className="accent">404</h2>
            <p>The page you are looking for might have been moved or is temporarily unavailable.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
              <Link href="/" className="btn">Back to Homepage</Link>
              <Link href="/contact-us/" className="btn btn-outline">Contact Us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
