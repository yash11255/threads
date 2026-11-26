import type { Metadata } from "next";
import Link from "next/link";
import AppointmentForm from "@/components/AppointmentForm";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { buildPageMetadata, buildPageSchemas } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us - Threads Physio",
  path: "/contact-us/",
});

export default function ContactPage() {
  const schemas = buildPageSchemas({
    path: "/contact-us/",
    title: "Contact Us - Threads Physio",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Contact Us", path: "/contact-us/" },
    ],
  });

  return (
    <>
      <JsonLd data={schemas} />
      <section className="page-banner">
        <div className="container">
          <h1>Contact Us</h1>
          <div className="crumbs"><Link href="/">Home</Link> / <span className="accent">Contact Us</span></div>
        </div>
      </section>
      <section className="section">
        <div className="container two-col" style={{ alignItems: "start" }}>
          <div>
            <h2>Get in touch</h2>
            <ul className="contact-info" style={{ listStyle: "none", padding: 0 }}>
              <li><span className="ic">📍</span><a href={SITE.maps} target="_blank" rel="noreferrer">{SITE.address}</a></li>
              <li><span className="ic">📞</span><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a></li>
              <li><span className="ic">✉</span><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
            <p>For Medical Camps, Seminars and Webinars mail us your proposal at</p>
            <p><a className="accent" href={`mailto:${SITE.proposalEmail}`}><strong>{SITE.proposalEmail}</strong></a></p>
            <p>Follow us on:</p>
            <div style={{ display: "flex", gap: 10 }}>
              <a className="btn btn-outline" href={SITE.social.linkedin} target="_blank" rel="noreferrer">Linkedin</a>
              <a className="btn btn-outline" href={SITE.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
              <a className="btn btn-outline" href={SITE.social.youtube} target="_blank" rel="noreferrer">Youtube</a>
            </div>
          </div>
          <AppointmentForm formName="Contact Us" title="Send us a message" showService={false} />
        </div>
      </section>
      <section className="map-wrap"><iframe src={SITE.mapEmbed} loading="lazy" title="Map" style={{ borderRadius: 0, display: "block" }} /></section>
    </>
  );
}
