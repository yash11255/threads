import type { Metadata } from "next";
import AppointmentForm from "@/components/AppointmentForm";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { buildPageMetadata, buildPageSchemas } from "@/lib/seo";

const PAGE_TITLE = "Heal Your ACL - Landing Page - Threads Physio";
const PAGE_DESC =
  "Understand exactly why your ACL recovery stalls — then follow Dr. Manu Bora's 5-step ACL rehabilitation and supplement protocol at home and after surgery.";
const HERO_IMG =
  "https://res.cloudinary.com/yodgtgty/image/upload/v1790964286/photo_6294131090771787043_y_efpacc.jpg";

const WA_ENROLL =
  "https://api.whatsapp.com/send?phone=919310138022&text=Hi%2C%20I%20want%20to%20enroll%20in%20Dr.%20Manu%20Bora's%20Heal%20Your%20ACL%20Program%20(%E2%82%B94%2C999).";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESC,
  path: "/heal-your-acl-landing-page/",
  ogImage: HERO_IMG,
});

const PAIN_POINTS = [
  {
    t: 'You were told to "just rest it"',
    p: "So you rested for weeks — but the knee still feels unstable, swollen, and weak. No one told you that passive rest without the right protocol actually delays tissue healing and causes muscle wasting that sets you back further.",
  },
  {
    t: "You started physiotherapy, but progress is painfully slow",
    p: "You're doing the exercises, attending sessions — but three months in you still can't run, pivot, or trust your knee. Nobody explained what phase you're in or why what you're doing may not match where your graft healing actually is.",
  },
  {
    t: "You had surgery but nobody explained what happens next",
    p: "The surgery went well, the surgeon is happy — but you were sent home with a vague exercise sheet and a follow-up six weeks later. The gap between the OR and full recovery feels like a black hole.",
  },
  {
    t: "You've watched YouTube videos but they all say different things",
    p: "One says start squats at week 4. Another says no squats until week 16. You're getting conflicting information and you genuinely don't know what's right, what's safe, or what applies to you.",
  },
];

const PHASES = [
  {
    n: "01",
    t: "Understand What's Actually Happening",
    p: "Learn exactly what occurs inside your knee after an ACL tear or surgery — how the graft heals, what the biology of ligamentization means, and why rushing phases is the #1 mistake people make.",
  },
  {
    n: "02",
    t: "Know What's Stalling Your Recovery",
    p: "Understand the real blockers — muscle inhibition, swelling cycles, poor nutrition, wrong exercise timing, and missing supplement support — and why willpower alone cannot overcome them.",
  },
  {
    n: "03",
    t: "Execute a Proven 5-Step Protocol",
    p: "Follow Dr. Bora's structured rehabilitation and supplement roadmap — from acute phase through return-to-sport — in practical, video-guided steps you can implement at home today.",
  },
];

const VALUE_STACK = [
  {
    name: '"Understanding Your ACL Injury" Deep-Dive Video Training',
    sub: "Anatomy, injury mechanism, what happens surgically & non-surgically",
    val: "₹1,997",
  },
  {
    name: '"5-Step ACL Rehabilitation Protocol" Video Series',
    sub: "Phase-by-phase exercise guidance from day 1 to return-to-sport",
    val: "₹1,997",
  },
  {
    name: '"Recovery Supplements Explained" Training',
    sub: "What to take, when, and why — collagen, creatine, omega-3, Vitamin D & more",
    val: "₹997",
  },
  { name: "Q&A Session Recordings with Dr. Manu Bora", sub: "Real patient recovery scenarios answered", val: "₹1,499" },
  { name: "Bonus #1 — Weekly Rehab Tracker & Exercise Log", sub: "Track ROM, pain scores & milestones", val: "₹297" },
  { name: "Bonus #2 — Nutrition & Anti-Inflammatory Meal Guide", sub: "Practical Indian diet format", val: "₹297" },
  { name: "Bonus #3 — Return-to-Sport Readiness Checklist", sub: "Clinical clearance benchmarks", val: "₹197" },
  { name: "Bonus #4 — Mental Resilience Audio Guide for Athletes", sub: "Overcome fear of re-injury", val: "₹497" },
  { name: "Bonus #5 — Private Community Access (Athletes & Patients)", sub: "Peer accountability & progress support", val: "₹997" },
];

const CURRICULUM = [
  {
    mod: "Module 1",
    t: "Understanding Your ACL Injury",
    items: [
      "How the ACL tears — the mechanism, grades, and what imaging really tells you",
      "To operate or not? How Dr. Bora decides — and what factors determine your outcome",
      "The QuadPro reconstruction technique, Internal Brace & LET — explained in plain language",
      "What happens to the graft during ligamentization and why the 3–6 month window is the most vulnerable",
      "How inflammation, muscle inhibition, and proprioception loss silently sabotage your recovery",
      "The role of biological repair and when it applies to partial tears",
    ],
  },
  {
    mod: "Module 2",
    t: "The 5-Step Rehabilitation Protocol",
    items: [
      "Phase 1 (Days 1–14): Swelling control, quad activation, and protecting the repair",
      "Phase 2 (Weeks 2–6): Weight-bearing progression, range-of-motion restoration, and gait retraining",
      "Phase 3 (Weeks 6–16): Strength rebuilding — squats, leg press, and neuromuscular training done right",
      "Phase 4 (Months 4–7): Power, agility, and sport-specific movement patterns",
      "Phase 5 (Month 8+): Return-to-sport testing, psychological readiness, and re-injury prevention",
      "What to do if you hit a plateau, experience setbacks, or develop secondary pain",
    ],
  },
  {
    mod: "Module 3",
    t: "Supplements for ACL Recovery",
    items: [
      "Why collagen peptides + Vitamin C matter in the first 12 weeks — timing and dose",
      "Creatine monohydrate for preserving muscle mass during immobilization — the evidence",
      "Omega-3 fatty acids: reducing neuroinflammation and supporting tendon health",
      "Vitamin D3 & K2 for bone-tunnel integration and immune regulation",
      "NMN and resveratrol — cellular energy for tissue repair in patients over 30",
      "What NOT to take (NSAIDs, high-dose antioxidants) and when they actively slow healing",
    ],
  },
];

const BONUSES = [
  {
    t: "Weekly Rehab Tracker",
    p: "A structured log to track your exercises, pain scores, range of motion, and milestones — week by week through your recovery.",
  },
  {
    t: "Anti-Inflammatory Meal Guide",
    p: "Foods that accelerate tissue repair, reduce swelling, and optimize protein synthesis — laid out in a practical Indian diet format.",
  },
  {
    t: "Return-to-Sport Checklist",
    p: "Dr. Bora's clinical criteria for safely returning to running, sport, and athletic activity — so you know you're ready, not just hoping.",
  },
  {
    t: "Athlete Mindset Audio Guide",
    p: "The psychological side of ACL recovery is real. This audio guide helps you manage fear of re-injury, setback frustration, and motivation loss.",
  },
  {
    t: "Private Recovery Community",
    p: "Connect with other patients and athletes going through ACL recovery. Share progress, ask questions, and stay accountable.",
  },
];

const OUTCOMES = [
  {
    t: "Understand your injury and your surgery",
    p: "No more guessing what the MRI says or what your surgeon did. You'll have real clarity.",
  },
  {
    t: "Execute each rehab phase correctly",
    p: "Move through recovery with a structured, phase-matched protocol — not a generic exercise sheet.",
  },
  {
    t: "Use supplements to accelerate healing",
    p: "Know exactly what to take, when, and why — backed by clinical evidence.",
  },
  {
    t: "Prevent re-injury with confidence",
    p: "Understand what went wrong the first time and build the movement patterns to protect your knee for life.",
  },
  {
    t: "Return to sport — fully, safely",
    p: "Pass the return-to-sport criteria and step back on the field, court, or track knowing your body is ready.",
  },
];

const ACL_PROGRAM_FAQS = [
  {
    q: "Is this for pre-surgery or post-surgery patients?",
    a: "<p>Both. The program covers conservative (non-surgical) rehabilitation for suitable candidates as well as the complete post-surgical recovery protocol. Dr. Bora explains clearly which sections apply to your situation.</p>",
  },
  {
    q: "I had my surgery months ago and I'm still struggling. Is it too late?",
    a: "<p>Absolutely not. Many patients join having stalled at 3–6 months post-op. The program includes a section specifically on late-stage recovery plateau and how to break through it.</p>",
  },
  {
    q: "Can I do this without a gym or physiotherapy equipment?",
    a: "<p>Yes. The early phases require only your body weight and a resistance band. The program scales with whatever equipment you have access to, including full gym setups for later phases.</p>",
  },
  {
    q: "How long do I have access to the materials?",
    a: "<p>Lifetime access. ACL recovery takes months — you'll want to revisit sections as you progress through different phases, and it's all there for you whenever you need it.</p>",
  },
  {
    q: "Will this work on my phone?",
    a: "<p>Yes, fully. All videos and materials are mobile-optimized so you can follow along during your rehab sessions.</p>",
  },
  {
    q: "What if my rehab situation is different from what's in the course?",
    a: "<p>The Q&amp;A recordings with Dr. Bora cover a wide range of patient scenarios. The private community also gives you a space to discuss your specific situation with others who have been through it.</p>",
  },
];

export default function HealYourAclLandingPage() {
  const schemas = buildPageSchemas({
    path: "/heal-your-acl-landing-page/",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    primaryImage: HERO_IMG,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Heal Your ACL", path: "/heal-your-acl-landing-page/" },
    ],
    faqs: ACL_PROGRAM_FAQS,
  });

  return (
    <>
      <JsonLd data={schemas} />

      <section className="lp-hero">
        <div className="container two-col">
          <div>
            <span className="lp-badge">Complete Program · Video Training, Rehab Protocols &amp; Bonuses</span>
            <h1>Heal Your ACL Tear : At Home &amp; After Surgery</h1>
            <p className="lp-lead">
              Understand exactly why your ACL recovery stalls — then follow the 5-step
              rehabilitation and supplement protocol that gets you back to full strength.
            </p>
            <div className="lp-actions">
              <a href="#enroll" className="btn">
                Enroll Now — ₹4,999
              </a>
              <a href="#curriculum" className="btn btn-white">
                View Full Curriculum
              </a>
            </div>
            <div className="lp-trust">
              <span>✓ Lifetime Access</span>
              <span>✓ Mobile Friendly</span>
              <span>✓ Surgeon-Designed Protocol</span>
              <span>✓ 5 Bonus Resources Included</span>
            </div>
          </div>
          <div className="lp-hero-img">
            <img src={HERO_IMG} alt="Dr. Manu Bora - Heal Your ACL Program" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center" style={{ maxWidth: 820, margin: "0 auto 40px" }}>
            <span className="eyebrow">Sound Familiar?</span>
            <h2 className="accent">
              You know your ACL is torn. But nothing is working the way you expected.
            </h2>
          </div>
          <div className="lp-two-grid">
            {PAIN_POINTS.map((c) => (
              <div className="lp-card" key={c.t}>
                <h3>{c.t}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
          <p className="center" style={{ maxWidth: 780, margin: "32px auto 0", fontWeight: 600 }}>
            You want to recover fully — get back to sport, to running, to life — without re-injuring
            yourself or losing another year to a poorly guided rehab.
          </p>
        </div>
      </section>

      <section className="lp-quote-band">
        <div className="container center" style={{ maxWidth: 860 }}>
          <span className="lp-badge">The Turning Point</span>
          <h2>
            What if you finally had a surgeon&apos;s-eye view of your own ACL recovery — and a
            step-by-step protocol you could follow with confidence?
          </h2>
          <p style={{ marginBottom: 0 }}>Here&apos;s exactly how this program delivers that.</p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="center" style={{ maxWidth: 780, margin: "0 auto 42px" }}>
            <span className="eyebrow">The Framework</span>
            <h2 className="accent">Breaking ACL Recovery Down Into 3 Clear Phases</h2>
          </div>
          <div className="lp-three">
            {PHASES.map((ph) => (
              <div className="lp-step-card" key={ph.n}>
                <span className="lp-step-num">{ph.n}</span>
                <h3>{ph.t}</h3>
                <p>{ph.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="lp-pricing-card">
            <span className="eyebrow">Introducing</span>
            <h2 className="accent">Heal Your ACL</h2>
            <p className="lp-subtext">
              The complete home rehab &amp; recovery program — by an orthopedic surgeon who operates
              on ACL injuries every week
            </p>
            <div className="lp-stack-list">
              {VALUE_STACK.map((item) => (
                <div className="lp-stack-row" key={item.name}>
                  <div>
                    <strong>✓ {item.name}</strong>
                    <span>{item.sub}</span>
                  </div>
                  <span className="lp-stack-val">{item.val}</span>
                </div>
              ))}
            </div>
            <div className="lp-price-banner">
              <div className="lp-price-now">₹4,999</div>
              <p>Lifetime access · Mobile friendly · Watch at your own pace</p>
              <a href={WA_ENROLL} target="_blank" rel="noreferrer" className="btn">
                Get Instant Access via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light" id="curriculum">
        <div className="container">
          <div className="center" style={{ maxWidth: 780, margin: "0 auto 42px" }}>
            <span className="eyebrow">Full Curriculum</span>
            <h2 className="accent">Exactly What&apos;s Covered Inside the Program</h2>
          </div>
          <div className="lp-three">
            {CURRICULUM.map((m) => (
              <div className="lp-card" key={m.t}>
                <span className="eyebrow" style={{ marginBottom: 6 }}>
                  {m.mod}
                </span>
                <h3 style={{ marginBottom: 14 }}>{m.t}</h3>
                <ul className="check-list">
                  {m.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center" style={{ maxWidth: 780, margin: "0 auto 40px" }}>
            <span className="eyebrow">Included Bonuses</span>
            <h2 className="accent">Everything Else You Need To Recover With Confidence</h2>
          </div>
          <div className="lp-three">
            {BONUSES.map((b, idx) => (
              <div className="lp-card" key={b.t}>
                <span className="eyebrow" style={{ marginBottom: 6 }}>
                  Bonus #{idx + 1}
                </span>
                <h3>{b.t}</h3>
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="center" style={{ maxWidth: 800, margin: "0 auto 40px" }}>
            <span className="eyebrow">What You&apos;ll Walk Away With</span>
            <h2 className="accent">When You Finish This Program, You&apos;ll Know Exactly How To…</h2>
          </div>
          <div className="lp-three">
            {OUTCOMES.map((o) => (
              <div className="lp-card" key={o.t}>
                <h3>{o.t}</h3>
                <p>{o.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <img
              src="https://res.cloudinary.com/yodgtgty/image/upload/v1790963654/Gemini_Generated_Image_3847u23847u23847_cstob0.png"
              alt="Dr. Manu Bora"
              className="lp-media-img"
              loading="lazy"
            />
          </div>
          <div>
            <span className="eyebrow">Your Instructor</span>
            <h2 className="accent">Dr. Manu Bora</h2>
            <p>
              Dr. Manu Bora is an orthopedic and sports medicine surgeon with specialist expertise
              in ACL reconstruction, knee arthroscopy, and sports injury rehabilitation. He performs
              ACL surgeries weekly using advanced techniques including QuadPro reconstruction,
              Internal Brace augmentation, and Lateral Extra-articular Tenodesis (LET).
            </p>
            <p>
              Beyond the operating theatre, Dr. Bora recognized a massive gap: patients receive
              excellent surgical care but are then left to navigate recovery largely on their own.
              Most physiotherapy protocols are generic. Most online information is contradictory.
              The result is slow, incomplete recoveries — and preventable re-tears.
            </p>
            <p>
              This program is Dr. Bora&apos;s answer to that gap — a surgeon-designed,
              evidence-based recovery course that gives you the same depth of guidance his own
              patients receive, available anywhere in the world.
            </p>
          </div>
        </div>
      </section>

      <section className="section faq-sec">
        <div className="container">
          <div className="center">
            <span className="eyebrow">FAQ</span>
            <h2 className="accent">Still Have Questions?</h2>
          </div>
          <div className="faq">
            {ACL_PROGRAM_FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <div className="ans" dangerouslySetInnerHTML={{ __html: f.a }} />
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="enroll">
        <div className="container two-col" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">In a Nutshell</span>
            <h2 className="accent">
              Freedom to run again. Freedom to trust your knee. Freedom to return to the sport you
              love.
            </h2>
            <p>
              Get the surgeon&apos;s blueprint — clear, practical, and designed for real recovery.
            </p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "var(--primary)" }}>
              ₹4,999 · Lifetime access · Start immediately
            </p>
            <div className="lp-actions" style={{ marginTop: 20 }}>
              <a href={WA_ENROLL} target="_blank" rel="noreferrer" className="btn">
                Enroll via WhatsApp
              </a>
              <a href={`tel:${SITE.phoneRaw}`} className="btn btn-outline">
                Call {SITE.phone}
              </a>
            </div>
          </div>
          <AppointmentForm
            formName="Heal Your ACL - Enrollment"
            title="Request Instant Program Access"
            showService={false}
          />
        </div>
      </section>
    </>
  );
}
