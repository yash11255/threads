import Link from "next/link";
import BodyMap from "@/components/BodyMap";
import Counters from "@/components/Counters";
import Reviews from "@/components/Reviews";
import Steps from "@/components/Steps";
import FaqList from "@/components/FaqList";
import AppointmentForm from "@/components/AppointmentForm";
import { SITE } from "@/lib/site";

const TREATMENTS: { t: string; d: string; href?: string }[] = [
  { t: "ACL Surgery & Rehabilitation", d: "Recover stronger with expert-led ACL surgery and rehabilitation, ensuring faster healing and a safe return to an active lifestyle.", href: "/our-services/acl-surgery/" },
  { t: "Sports Physiotherapy", d: "It involves treatment plans specially designed to treat injuries and conditions that occur while playing sports like acl injuries, shoulder injuries and recurring ankle injuries.", href: "/our-services/sports-physiotherapy/" },
  { t: "Pain Treatment", d: "We offer advanced pain treatment for joint, muscle, and nerve-related issues using physiotherapy techniques that provide lasting relief and improve mobility." },
  { t: "Posture Correction Therapy", d: "Tailored exercises and ergonomic guidance to fix poor posture and related pain." },
  { t: "Injury Prevention", d: "A pre injury rehab programme designed to your needs to prevent injuries when you might encounter when you play.", href: "/our-services/injury-prevention/" },
  { t: "Online Physiotherapy", d: "Anyone from anywhere in the world can get physiotherapy sessions for faster recovery form our expert’s panel online.", href: "/our-services/online-physiotherapy/" },
  { t: "Dry Needling", d: "A modern technique used at Threads Physio to release deep muscle knots and trigger points for lasting comfort." },
  { t: "Cupping Therapy", d: "Offered to ease tight muscles, improve circulation, and support your body’s natural healing." },
  { t: "K Taping (Kinesio Taping)", d: "We use K-Taping to stabilize injured areas and reduce swelling without restricting movement." },
  { t: "Post-Surgical Rehabilitation", d: "Whether it’s ACL surgery, joint replacement, or spine surgery, we guide you through every step of your recovery." },
  { t: "Back & Neck Pain Therapy", d: "For professionals, parents, and seniors dealing with posture issues, slip disc, or cervical spondylosis." },
  { t: "Neurological Physiotherapy", d: "Helping patients with stroke, Parkinson’s, or nerve injuries regain strength and mobility." },
  { t: "Manual Therapy", d: "Hands-on care to ease joint stiffness, improve alignment, and support natural movement." },
  { t: "Electrotherapy & Ultrasound Therapy", d: "Used for pain relief, inflammation control, and tissue healing." },
  { t: "Arthritis Treatment", d: "We help manage joint stiffness, swelling, and pain caused by arthritis through gentle exercises, mobility work, and hands-on therapy tailored to each patient.", href: "/arthritis-treatment-in-gurgaon/" },
];

const ICONS = ["🏃","🩺","🩹","🧍","🛡️","💻","📍","🥤","🎗️","♿","🦴","🧠","👐","⚡","🦵"];

const WHY: [string, string][] = [
  ["Expert-Led Team –", "Treatments are designed and supervised by specialists with experience in sports injuries, post-surgical rehab, and chronic pain."],
  ["1-on-1 Attention –", "No rushed sessions. We take time to understand your pain, assess the root cause, and tailor a program that works for you."],
  ["Advanced Facilities –", "From dry needling to strength training and manual therapy, we use modern tools that accelerate your healing process."],
  ["Patient-Centered Approach –", "We listen. Your goals, your comfort, and your progress drive everything we do."],
  ["Trusted by Athletes & Families Alike –", "Whether you're a professional athlete or someone who just wants to walk without pain, we’ve helped people from all walks of life."],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div>
            <div className="hero-box"><h1>Best Physiotherapy Clinic in Gurgaon</h1>
            <a className="call" href={`tel:${SITE.phoneRaw}`}>Call Now @ 9310138022</a></div>
          </div>
          <BodyMap />
        </div>
      </section>

      <section className="section intro">
        <div className="container">
          <p className="intro-text">Threads Physio by Dr. Manu Bora is a top-rated physiotherapy clinic in Gurgaon, trusted by people dealing with back pain, neck stiffness, knee injuries, frozen shoulder, post-surgery weakness, and sports injuries. Whether you’re struggling with everyday aches or recovering from an ACL surgery, we offer personalized treatment plans to help you move pain-free. Our expert physiotherapists use a combination of manual therapy, targeted exercises, and modern rehab techniques to deliver long-lasting relief and faster healing.</p>
          <div className="feature-cards">
            <div className="feature-card"><img src="/wp/2024/05/JOINT-2x.png" alt="" /><h3>2000+ Patients Treated</h3><Link href="/testimonials/">Read More</Link></div>
            <div className="feature-card"><img src="/wp/2024/05/MUSCLE-2x.png" alt="" /><h3>3000 Sq Ft Dedicated Sports Rehabilitation Area</h3><Link href="/about-us/">Read More</Link></div>
            <div className="feature-card"><img src="/wp/2024/05/BACKBONE-2x.png" alt="" /><h3>Internationally Trained Physiotherapist</h3><Link href="/about-us/meet-our-specialist/">Read More</Link></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <span className="eyebrow">Helping You Move Without Pain</span>
            <h2 className="accent">Best Physiotherapist in Gurgaon</h2>
            <p>Daily discomfort like back pain while sitting, neck stiffness from long screen time, or knee pain while climbing stairs shouldn’t be a part of life. At Threads Physio, we understand how these common problems affect your routine, sleep, and even mood. That’s why our physiotherapy isn’t one-size-fits-all—it’s tailored to your specific pain, lifestyle, and goals.</p>
            <p><strong>Whether it’s:</strong></p>
            <ul className="check-list">
              <li>Shoulder pain from desk work</li><li>Knee pain from running or gym workouts</li><li>Posture issues from sedentary habits</li><li>Muscle tightness and joint stiffness</li><li>Or recovery after an injury or surgery</li>
            </ul>
            <p><strong>Our goal is simple:</strong> to help you move better, feel stronger, and live pain-free.</p>
            <p>From working professionals and athletes to elderly patients, we treat a wide range of conditions using clinically proven techniques and a caring, results-driven approach.</p>
            <p>If you’re tired of temporary fixes and want real, lasting relief—book an appointment with the best physiotherapist in Gurgaon today.</p>
            <div className="pills"><span>Expert Rehab specialist</span><span>Personalized care</span><span>Faster Recovery</span><span>Advanced Rehabilitation Equipment</span><span>Tailored rehabilitation programmes</span></div>
          </div>
          <div className="img-stack">
            <img className="c" src="/wp/2024/05/yellow-Ellipse.png" alt="" />
            <img className="a" src="/wp/2024/06/home-image-one.webp" alt="Physiotherapy session" />
            <img className="b" src="/wp/2024/06/home-image-two.webp" alt="Rehabilitation" />
          </div>
        </div>
      </section>

      <section className="section treatments">
        <div className="container center">
          <h2>Our Specialized Treatments</h2>
          <div className="treat-grid" style={{ textAlign: "left" }}>
            {TREATMENTS.map((t) => (
              <div className="treat-card" key={t.t}>
                <span className="t-ic">{ICONS[TREATMENTS.indexOf(t)]}</span>
                <h3>{t.t}</h3><p>{t.d}</p>
                {t.href && <Link href={t.href}>Read More →</Link>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section doctor">
        <div className="container center">
          <h2>Meet Dr. Manu Bora</h2>
          <Link href="/about-us/meet-our-specialist/" className="doc-card">
            <img src="/wp/2024/06/dr-manu2.webp" alt="Dr. Manu Bora" />
            <h3>Dr. Manu Bora</h3>
            <p><strong>Associate Consultant – Arthroscopy &amp; Sports Medicine</strong></p>
            <p>MBBS, M.S (Orthopaedics)</p>
            <p>FNB(Sports Medicine and Arthroscopy)</p>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <img src="/wp/2024/06/home-image-three.webp" alt="Threads Physio clinic" style={{ borderRadius: 16 }} />
          <div>
            <h2 className="accent">Why Choose Threads Physio?</h2>
            <p>Choosing the right physiotherapy clinic can make all the difference in your recovery. At Threads Physio, we’re more than just a clinic — we’re your partners in healing. Led by renowned orthopedic surgeon Dr. Manu Bora, Threads Physio is one of the best physiotherapist in Gurgaon and our team brings together clinical expertise, modern rehab techniques, and personalized care that puts your recovery first.</p>
            <ul className="why-list">{WHY.map(([k, v]) => <li key={k}><strong>{k}</strong> {v}</li>)}</ul>
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
            <div className="map-wrap"><iframe src={SITE.mapEmbed} loading="lazy" title="Threads Physio location" /></div>
            <AppointmentForm formName="Home - Appointment" compact />
          </div>
        </div>
      </section>

      <section className="section faq-sec">
        <div className="container">
          <h2 className="center accent">FAQs About Choosing the Right Physiotherapist in Gurgaon</h2>
          <FaqList />
        </div>
      </section>
    </>
  );
}
