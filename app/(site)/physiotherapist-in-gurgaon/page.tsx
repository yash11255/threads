import type { Metadata } from "next";
import Link from "next/link";
import BodyMap from "@/components/BodyMap";
import Counters from "@/components/Counters";
import Reviews from "@/components/Reviews";
import Steps from "@/components/Steps";
import FaqList from "@/components/FaqList";
import AppointmentForm from "@/components/AppointmentForm";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { buildPageMetadata, buildPageSchemas, DEFAULT_OG_IMAGE } from "@/lib/seo";

const PAGE_TITLE = "Best Physiotherapist in Gurgaon | Threads Physio by Dr. Manu Bora";
const PAGE_DESC =
  "Looking for the best physiotherapy clinic in Gurgaon? Threads Physio offers expert care for pain, injuries, and recovery. Visit us now!";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESC,
  path: "/physiotherapist-in-gurgaon/",
  canonicalPath: "/",
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
});

const CORE_SERVICES = [
  {
    t: "Bio Mechanical Assessment",
    d: "A detailed assessment of your movement patterns to analyse risk of injuries patterns.",
    img: "/wp/2024/05/BACKBONE-2x.png",
    href: "/our-services/bio-mechanical-assessment/",
  },
  {
    t: "Sports Physiotherapy",
    d: "It involves treatment plans specially designed to treat injuries and conditions that occur while playing sports like acl injuries, shoulder injuries and recurring ankle injuries.",
    img: "/wp/2024/05/MUSCLE-2x.png",
    href: "/our-services/sports-physiotherapy/",
  },
  {
    t: "Sports Specific Training",
    d: "A highly specific rehabilitation programme for athletes and sports persons to meet their sporting demands.",
    img: "/wp/2024/05/MASSAGER-2x.png",
    href: "/our-services/sports-specific-training/",
  },
  {
    t: "High Performance Training",
    d: "It helps in identifying strength, weakness and areas to maximise the athlete’s performance in sports and high-level activities.",
    img: "/wp/2024/05/LEG-SLING-2x.png",
    href: "/our-services/high-performance-training/",
  },
  {
    t: "Injury Prevention",
    d: "A pre injury rehab programme designed to your needs to prevent injuries when you might encounter when you play.",
    img: "/wp/2024/05/ACUPUNTURE-2x.png",
    href: "/our-services/injury-prevention/",
  },
  {
    t: "Online Physiotherapy",
    d: "Anyone from anywhere in the world can get physiotherapy sessions for faster recovery from our expert’s panel online.",
    img: "/wp/2024/05/JOINT-2x.png",
    href: "/our-services/online-physiotherapy/",
  },
];

const WHY_POINTS = [
  "State of Art Facilities",
  "Comprehensive Treatment for All Sports Related Injuries",
  "Team of Renowned Orthopaedic Surgeons and Sports Medicine",
  "Integrated and Patient Centric",
  "Effortless and Expedited Appointments",
];

export default function PhysiotherapistInGurgaonPage() {
  const schemas = buildPageSchemas({
    path: "/physiotherapist-in-gurgaon/",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    primaryImage: DEFAULT_OG_IMAGE,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Best Physiotherapist in Gurgaon", path: "/physiotherapist-in-gurgaon/" },
    ],
    includePhysiotherapySchema: true,
  });

  return (
    <>
      <JsonLd data={schemas} />

      <section className="hero">
        <div className="container">
          <div>
            <div className="hero-box">
              <h1>Best Physiotherapist in Gurgaon</h1>
              <p style={{ color: "rgba(255,255,255,.92)", marginBottom: 20 }}>
                The only ACL, Sports Injury and post operative rehabilitation center in India.
              </p>
              <a className="call" href={`tel:${SITE.phoneRaw}`}>
                Call Now @ 9310138022
              </a>
            </div>
          </div>
          <BodyMap />
        </div>
      </section>

      <section className="section intro">
        <div className="container">
          <div className="feature-cards">
            <div className="feature-card">
              <img src="/wp/2024/05/JOINT-2x.png" alt="Patients treated" />
              <h3>1000+ Patients Treated</h3>
            </div>
            <div className="feature-card">
              <img src="/wp/2024/05/MUSCLE-2x.png" alt="Sports rehabilitation area" />
              <h3>3000 Sq Ft Dedicated Sports Rehabilitation Area</h3>
            </div>
            <div className="feature-card">
              <img src="/wp/2024/05/BACKBONE-2x.png" alt="Internationally trained physiotherapist" />
              <h3>Internationally Trained Physiotherapist</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <span className="eyebrow">About Threads Physio</span>
            <h2 className="accent">Deleting pain and Installing Strength and Mobility</h2>
            <p>
              Looking for the best physiotherapy clinic in Gurgaon? Threads Physio is your premier
              destination for Orthopaedic, physiotherapy and sports rehabilitation. Experience
              cutting-edge treatments and personalized care from our expert team, specializing in
              advanced techniques to restore strength, getting back to sports and injury prevention
              programs. Whether recovering from injury or enhancing performance, trust Threads
              Physio for comprehensive, tailored solutions to optimize your sports performance and
              getting back to sports injury free.
            </p>
            <div className="pills">
              <span>Expert Rehab specialist</span>
              <span>Personalised care</span>
              <span>Faster Recovery</span>
              <span>Advanced Rehabilitation Equipment</span>
              <span>Tailored rehabilitation programmes</span>
            </div>
          </div>
          <div className="img-stack">
            <img className="c" src="/wp/2024/05/yellow-Ellipse.png" alt="" />
            <img className="a" src="/wp/2024/06/home-image-one.webp" alt="ACL treatment" />
            <img className="b" src="/wp/2024/06/home-image-two.webp" alt="Sports physiotherapy rehab" />
          </div>
        </div>
      </section>

      <section className="section treatments">
        <div className="container center">
          <h2>Our Services</h2>
          <div className="treat-grid" style={{ textAlign: "left" }}>
            {CORE_SERVICES.map((s) => (
              <div className="treat-card" key={s.t}>
                <img
                  src={s.img}
                  alt={s.t}
                  style={{ width: 46, height: 46, objectFit: "contain", marginBottom: 14, filter: "brightness(0) invert(1)" }}
                />
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <Link href={s.href}>Read More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <h2 className="accent">Best Physiotherapy Clinic in Gurgaon</h2>
            <p>
              At Threads Physio, our mission is simple yet powerful: to empower individuals in
              Gurgaon to live pain-free, active, and fulfilling lives. We are committed to providing
              top-quality physiotherapy care that is personalized, effective, and results-driven. We
              believe in addressing the root cause of your condition, not just the symptoms. Our
              approach combines advanced physiotherapy techniques, state-of-the-art equipment, and
              compassionate care to ensure a complete recovery.
            </p>
            <p>
              Your recovery is our priority. We create customized treatment plans tailored to your
              unique needs, lifestyle, and goals, ensuring you receive the best possible care. We
              aim to break common myths about physiotherapy and help people understand its vital
              role in health and wellness. Whether it&apos;s post-surgery rehab, sports injury
              treatment, or chronic pain management, we aim for nothing less than excellence in
              every session.
            </p>
          </div>
          <div>
            <img
              src="/wp/2024/06/about-image-one.webp"
              alt="Physiotherapy at Threads Physio"
              style={{ borderRadius: 16 }}
            />
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container two-col">
          <img
            src="/wp/2024/06/home-image-three.webp"
            alt="Threads Physio clinic in Gurgaon"
            style={{ borderRadius: 16 }}
          />
          <div>
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="accent">We Weave Injury Free Champions</h2>
            <p>
              The only physiotherapy center in Gurgaon which delivers the best treatment for
              injuries which helps in faster recovery and achieving peak performance by athletes.
            </p>
            <ul className="check-list">
              {WHY_POINTS.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Counters />
      <Reviews />
      <Steps />

      <section className="section">
        <div className="container">
          <h2 className="accent">Get Directions to Threads Physio Clinic</h2>
          <div className="two-col" style={{ marginTop: 30, alignItems: "stretch" }}>
            <div className="map-wrap">
              <iframe src={SITE.mapEmbed} loading="lazy" title="Threads Physio location" />
            </div>
            <AppointmentForm formName="Physiotherapist in Gurgaon" compact />
          </div>
        </div>
      </section>

      <section className="section faq-sec">
        <div className="container">
          <h2 className="center accent">FAQs About Choosing the Right Physiotherapy Clinic</h2>
          <FaqList />
        </div>
      </section>
    </>
  );
}
