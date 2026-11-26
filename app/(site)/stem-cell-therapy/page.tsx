import type { Metadata } from "next";
import Link from "next/link";
import AppointmentForm from "@/components/AppointmentForm";
import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import { SITE } from "@/lib/site";
import { buildPageMetadata, buildPageSchemas } from "@/lib/seo";

const PAGE_TITLE = "Stem Cell Therapy - Threads Physio";
const PAGE_DESC =
  "Avoid knee replacement with a single bone marrow stem cell injection. Dr. Manu Bora offers BMAC & adipocyte stem cell therapy in Gurgaon & Mumbai. 10–15 years pain relief. Evidence-based.";
const HERO_IMG = "https://res.cloudinary.com/xjo36sha/image/upload/v1789039296/1.png";

const WA_MRI =
  "https://api.whatsapp.com/send?phone=919310138022&text=Hi%20Dr.%20Manu%20Bora%2C%20I%20would%20like%20to%20share%20my%20knee%20MRI%20for%20a%20Stem%20Cell%20Therapy%20assessment.";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESC,
  path: "/stem-cell-therapy/",
  ogImage: HERO_IMG,
});

const WHY_NOT_TKR = [
  {
    t: "Knee Replacement Is Permanent & Irreversible",
    p: "Once your natural knee is replaced, there is no going back. A prosthetic joint lasts 15–20 years — and revision surgery is far more complex.",
  },
  {
    t: "Long Recovery & Major Surgery Risk",
    p: "TKR requires general or spinal anaesthesia, 3–5 days in hospital, and 3–6 months of physiotherapy. Complications include clots, infection, and stiffness.",
  },
  {
    t: "Painkillers Only Mask the Problem",
    p: "NSAIDs, steroid injections, and hyaluronic acid provide temporary relief but do nothing to address the underlying bone and cartilage damage.",
  },
  {
    t: "Bone-on-Bone Doesn't Mean Surgery Is Inevitable",
    p: "Even advanced osteoarthritis with subchondral bone lesions can be treated with targeted stem cell therapy — regenerating the damaged tissue from within.",
  },
];

const ONE_DAY_STEPS = [
  {
    n: "01",
    t: "Bone Marrow & Adipose Harvest",
    p: "A small sample of bone marrow is withdrawn from your iliac crest (pelvis) under local anaesthesia. Takes 20–30 minutes. Minimal discomfort. Adipose tissue (fat) may also be harvested for additional stem cells.",
  },
  {
    n: "02",
    t: "Concentration & Activation",
    p: "Your bone marrow is spun in a centrifuge to concentrate mesenchymal stem cells and growth factors. Adipocyte-derived stem cells may also be harvested from fat tissue.",
  },
  {
    n: "03",
    t: "Targeted Intraosseous Injection",
    p: "Using fluoroscopy guidance, stem cells are injected into the subchondral bone beneath cartilage damage — not just into the joint fluid. This is the Hernigou technique.",
  },
  {
    n: "04",
    t: "Home the Same Day",
    p: "No overnight stay. Walk with assistance immediately. Begin gentle movement within days. Pain relief begins over 4–8 weeks as regeneration takes hold.",
  },
];

const SCIENCE_CARDS = [
  {
    t: "Bone Marrow MSC Injection vs Contralateral Arthroplasty — 15-Year Follow-Up",
    p: "Prospective randomised study. Patients who received BMAC into subchondral bone significantly outperformed those who received knee replacement in the contralateral knee at 15 years. Over 85% avoided TKR in the treated knee.",
  },
  {
    t: "Subchondral vs Intra-articular BMAC: Which Better Postpones Arthroplasty?",
    p: "Randomised study comparing intraosseous (subchondral) vs intra-articular injection. Subchondral injection was significantly superior at 15 years — confirming that targeting the bone beneath the cartilage is the critical difference.",
  },
  {
    t: "Subchondral Bone Regeneration",
    p: 'MRI-confirmed regeneration of subchondral bone marrow lesions — the root cause of "bone on bone" pain — not just symptom masking.',
  },
  {
    t: "Your Own Cells — Zero Rejection Risk",
    p: "Autologous stem cells (from your own body) carry no risk of immune rejection, disease transmission, or ethical concerns.",
  },
  {
    t: "Superior to PRP & Hyaluronic Acid",
    p: "BMAC demonstrated superior long-term outcomes versus both PRP and hyaluronic acid injections at 12-month and 15-year follow-ups.",
  },
  {
    t: "Patients Preferred Stem Cell Knee",
    p: "In the head-to-head study, the majority of patients who had one knee replaced and one treated with BMAC preferred the stem cell-treated knee at 15 years.",
  },
];

const IDEAL_CANDIDATES = [
  "Knee osteoarthritis Grade 2, 3, or early Grade 4",
  "Significant subchondral bone marrow lesions on MRI",
  '"Bone on bone" with visible edema / bone bruising',
  "Pain not adequately controlled by medications",
  "Wanting to avoid or delay knee replacement",
  "Age 45–80 with adequate general health",
  "Failed PRP or hyaluronic acid injections",
  "Active individuals who want to return to walking, travel, golf",
];

const NOT_SUITABLE = [
  "Severe Grade 4 OA with complete joint collapse",
  "Active infection in or around the knee",
  "Severe valgus or varus deformity (may need correction first)",
  "Active autoimmune conditions on immunosuppressants",
  "Haematological malignancy or blood disorders",
  "Morbid obesity (BMI >40) — increases procedure risk",
];

const PRICING_INCLUSIONS = [
  "Pre-procedure MRI review & consultation with Dr. Bora",
  "Bone marrow harvest from iliac crest under local anaesthesia",
  "BMAC concentration & preparation (adipocyte cells if applicable)",
  "Fluoroscopy-guided intraosseous subchondral injection",
  "Post-procedure recovery & rehabilitation guidance",
  "ThreadsPhysio rehabilitation protocol",
  "1-month follow-up consultation",
];

const STEM_CELL_FAQS = [
  {
    q: "Is bone marrow stem cell therapy safe?",
    a: "<p>Yes. We use autologous stem cells — harvested from your own bone marrow and fat tissue. There is zero risk of immune rejection or disease transmission. The procedure has been performed and studied since the 1990s by Dr. Hernigou and published in peer-reviewed journals. Serious complications are extremely rare.</p>",
  },
  {
    q: "How long does pain relief last after a single injection?",
    a: "<p>Published randomised controlled trial data from Dr. Hernigou shows that over 85% of patients avoided knee replacement for a mean of 15 years after a single injection. Individual results vary based on age, severity, and lifestyle. Most patients experience meaningful pain relief beginning at 4–8 weeks, with continued improvement over 6 months as regeneration progresses.</p>",
  },
  {
    q: "What is the difference between BMAC and adipocyte-derived stem cells?",
    a: "<p>BMAC (Bone Marrow Aspirate Concentrate) harvests mesenchymal stem cells from the pelvis (iliac crest) — these have the strongest published evidence for subchondral bone regeneration. Adipocyte-derived stem cells come from fat tissue (usually abdominal fat) and are rich in regenerative growth factors. Dr. Bora may use either or both based on your clinical picture and MRI findings.</p>",
  },
  {
    q: "Am I too advanced for stem cell therapy if my knee is Grade 3 or Grade 4?",
    a: "<p>Not necessarily. Even Grade 3–4 OA with subchondral bone lesions may qualify, especially if you have significant bone marrow edema on MRI. The best way to know is to share your MRI with Dr. Bora directly via WhatsApp. He will give you a frank assessment of whether stem cell therapy is appropriate for your case.</p>",
  },
  {
    q: "What is the recovery timeline after the procedure?",
    a: "<p>Most patients walk with assistance on the same day. Light activities resume within 1–2 weeks. A structured physiotherapy programme (via ThreadsPhysio) begins at 2 weeks. Full pain relief typically develops over 4–12 weeks as the regenerative process matures. Avoid high-impact activities for 6 weeks post-procedure.</p>",
  },
  {
    q: "Can I undergo stem cell therapy if I have diabetes or high blood pressure?",
    a: "<p>Controlled diabetes and hypertension are generally not contraindications. Dr. Bora will review your full medical history and medications before proceeding. Well-controlled systemic conditions do not typically affect the outcome of the procedure.</p>",
  },
  {
    q: "Can both knees be treated in the same session?",
    a: "<p>Yes. Bilateral knee injections can often be performed in the same session — one bone marrow harvest can provide enough concentrate for both knees. This reduces total cost and recovery time compared to two separate procedures. Discuss this with Dr. Bora at your consultation.</p>",
  },
];

export default function StemCellTherapyPage() {
  const schemas = buildPageSchemas({
    path: "/stem-cell-therapy/",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    primaryImage: HERO_IMG,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Stem Cell Therapy", path: "/stem-cell-therapy/" },
    ],
    faqs: STEM_CELL_FAQS,
    includePhysiotherapySchema: true,
  });

  return (
    <>
      <JsonLd data={schemas} />

      <section className="lp-hero">
        <div className="container two-col">
          <div>
            <span className="lp-badge">Gurgaon &amp; Mumbai · Hernigou Subchondral Protocol</span>
            <h1>Avoid Knee Replacement with a Single Stem Cell Injection</h1>
            <p className="lp-lead">
              Your own bone marrow stem cells, precisely injected into the damaged subchondral bone
              beneath your cartilage — giving you 10–15 years of pain relief without surgery.
            </p>
            <div className="lp-actions">
              <a href={WA_MRI} target="_blank" rel="noreferrer" className="btn">
                WhatsApp Your MRI (Free Review)
              </a>
              <a href="#book-consultation" className="btn btn-white">
                Book Consultation
              </a>
            </div>
            <div className="lp-trust">
              <span>✓ Same-Day Procedure</span>
              <span>✓ Local Anaesthesia Only</span>
              <span>✓ Your Own Autologous Cells</span>
              <span>✓ 24-Hr MRI Review by Dr. Bora</span>
            </div>
          </div>
          <div className="lp-hero-img">
            <img src={HERO_IMG} alt="Can Stem Cell Treatment Help Your Knee?" />
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container center" style={{ maxWidth: 960 }}>
          <h2 className="accent">What Stem Cell Treatment Actually Does</h2>
          <p className="lp-subtext">
            Unlike temporary symptom relief, stem cell therapy works at the cellular level.
          </p>
          <div className="lp-three">
            <div className="lp-pill-card">
              <span className="lp-check">✓</span>
              <h3>Reduce pain and improve function</h3>
            </div>
            <div className="lp-pill-card">
              <span className="lp-check">✓</span>
              <h3>Support joint health and structure</h3>
            </div>
            <div className="lp-pill-card">
              <span className="lp-check">✓</span>
              <h3>Aim to delay or avoid knee replacement</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center" style={{ maxWidth: 820, margin: "0 auto 40px" }}>
            <h2 className="accent">
              Why &ldquo;Just Get a Knee Replacement&rdquo; Is Not Your Only Option
            </h2>
            <p className="lp-subtext">
              Millions of knee OA patients are told to wait for the pain to become unbearable before
              undergoing a major surgery. There is a better path.
            </p>
          </div>
          <div className="lp-two-grid">
            {WHY_NOT_TKR.map((c) => (
              <div className="lp-card" key={c.t}>
                <h3>{c.t}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="center" style={{ maxWidth: 820, margin: "0 auto 44px" }}>
            <span className="eyebrow">Single-Session Outpatient Protocol</span>
            <h2 className="accent">How Stem Cell Injection Works in One Day</h2>
            <p className="lp-subtext">
              No general anaesthesia. No hospitalisation. Your own cells harvested, concentrated,
              and precisely injected — all in a single session.
            </p>
          </div>
          <div className="lp-steps-grid">
            {ONE_DAY_STEPS.map((s) => (
              <div className="lp-step-card" key={s.n}>
                <span className="lp-step-num">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <h2 className="accent">Where Are Your Stem Cells Sourced?</h2>
            <p>Stem cell treatments typically draw cells from two sources:</p>
            <ul className="check-list">
              <li>
                <strong>Adipose Tissue (Fat):</strong> Harvested from abdominal fat, rich in growth
                factors
              </li>
              <li>
                <strong>Bone Marrow:</strong> Harvested from the iliac crest (pelvis), strongest
                evidence for bone regeneration
              </li>
            </ul>
            <p>
              Some treatment protocols combine both sources. The prepared cell-based product is then
              delivered into the affected knee.
            </p>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/xjo36sha/image/upload/v1789039296/2.png"
              alt="Stem cell sources: Adipose tissue and bone marrow"
              className="lp-media-img"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="lp-quote-band">
        <div className="container center" style={{ maxWidth: 860 }}>
          <h2>10 Years of Knee Pain. Gone with One Injection.</h2>
          <p>
            Watch this patient describe how a single bone marrow stem cell injection — the same
            procedure Dr. Bora performs — ended over a decade of chronic knee pain. No surgery. No
            hospitalisation. Just her own cells doing the work.
          </p>
          <blockquote>
            &ldquo;I had been living with this pain for 10 years. After one injection, I could
            finally walk without pain.&rdquo;
          </blockquote>
          <Link href="/testimonials/" className="btn btn-white">
            View Patient Recovery Stories
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center" style={{ maxWidth: 840, margin: "0 auto 42px" }}>
            <span className="eyebrow">Peer-Reviewed Clinical Evidence</span>
            <h2 className="accent">Backed by Published Science</h2>
            <p className="lp-subtext">
              This is not experimental. Dr. Hernigou&apos;s randomised controlled trials — published
              in International Orthopaedics — show consistent 15-year results across hundreds of
              patients.
            </p>
          </div>
          <div className="lp-three">
            {SCIENCE_CARDS.map((c) => (
              <div className="lp-card" key={c.t}>
                <h3>{c.t}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container two-col">
          <div>
            <h2 className="accent">Bone vs Joint Injection — Which Is Better?</h2>
            <p>
              Studies comparing subchondral bone and intra-articular injection approaches show
              better long-term outcomes with bone-targeted treatment.
            </p>
            <div className="lp-note">
              <strong>Important:</strong> 80% vs 30% should not be treated as a universal success
              rate — outcomes still depend heavily on patient selection, disease severity, cell
              source, and treatment technique.
            </div>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/xjo36sha/image/upload/v1789049379/Gemini_Generated_Image_gcpybpgcpybpgcpy.png"
              alt="Bone vs Joint Injection: 80% vs 30% success rates"
              className="lp-media-img"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="center accent" style={{ marginBottom: 30 }}>
            Stem Cell Injection vs All Other Options
          </h2>
          <div className="lp-table-wrap">
            <table className="lp-table">
              <thead>
                <tr>
                  <th>Comparison Factor</th>
                  <th className="hl">Subchondral Stem Cell (BMAC)</th>
                  <th>Total Knee Replacement</th>
                  <th>PRP / Hyaluronic Acid</th>
                  <th>Painkillers / Steroids</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Targets Root Cause</td>
                  <td className="hl">Targets subchondral bone lesions</td>
                  <td>Replaces natural joint permanently</td>
                  <td>Joint fluid only</td>
                  <td>Masks pain only</td>
                </tr>
                <tr>
                  <td>Hospitalisation</td>
                  <td className="hl">Same-day discharge (no stay)</td>
                  <td>3–5 days in hospital</td>
                  <td>Outpatient</td>
                  <td>None</td>
                </tr>
                <tr>
                  <td>Anaesthesia</td>
                  <td className="hl">Local anaesthesia</td>
                  <td>General or spinal anaesthesia</td>
                  <td>Local / none</td>
                  <td>None</td>
                </tr>
                <tr>
                  <td>Recovery Time</td>
                  <td className="hl">Walk same day; rehab at 2 weeks</td>
                  <td>3–6 months physiotherapy</td>
                  <td>1–2 days</td>
                  <td>Immediate (temporary)</td>
                </tr>
                <tr>
                  <td>Expected Durability</td>
                  <td className="hl">10–15 years in RCT data</td>
                  <td>15–20 years (complex revision)</td>
                  <td>Months (repeated injections)</td>
                  <td>Hours to weeks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="two-col" style={{ marginBottom: 60 }}>
            <div>
              <h2 className="accent">Why Targeting the Bone Matters</h2>
              <p>Knee OA isn&apos;t just cartilage damage. The problem lives beneath the surface.</p>
              <ul className="check-list">
                <li>
                  <strong>Bone Marrow Lesions:</strong> Edema and dead bone areas trigger pain
                </li>
                <li>
                  <strong>Microfractures:</strong> Tiny breaks in bone architecture destabilize the
                  joint
                </li>
                <li>
                  <strong>Inflammation:</strong> Chronic signals worsen cartilage degeneration
                </li>
              </ul>
              <p>
                This is why joint-only injections fail: they don&apos;t address the bone beneath.
                Subchondral targeting regenerates the foundation.
              </p>
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/xjo36sha/image/upload/v1789049379/Gemini_Generated_Image_tonheetonheetonh.png"
                alt="Subchondral bone damage: bone marrow lesions, microfractures, inflammation"
                className="lp-media-img"
                loading="lazy"
              />
              <p className="lp-caption">
                The red areas show bone damage that causes &ldquo;bone-on-bone&rdquo; pain
              </p>
            </div>
          </div>

          <div className="two-col">
            <div>
              <img
                src="https://res.cloudinary.com/xjo36sha/image/upload/v1789049379/Gemini_Generated_Image_ml4ijeml4ijeml4i.png"
                alt="How stem cells work in the joint: inflammation modulation, cartilage support"
                className="lp-media-img"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="accent">How Injected Cells Work Inside</h2>
              <h3 style={{ marginBottom: 14 }}>What Your Stem Cells Do:</h3>
              <ul className="check-list">
                <li>
                  <strong>Modulate Inflammation</strong> — Reduce joint swelling &amp; pain signals
                </li>
                <li>
                  <strong>Support Joint Environment</strong> — Create conditions for healing
                </li>
                <li>
                  <strong>Pain &amp; Function Improvement</strong> — Relief in 4–8 weeks
                </li>
                <li>
                  <strong>Cartilage Health Support</strong> — Growth factors aid tissue
                </li>
              </ul>
              <div className="lp-note">
                <strong>Important:</strong> This is NOT guaranteed new cartilage. Results depend on
                patient selection and disease severity.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center" style={{ maxWidth: 780, margin: "0 auto 40px" }}>
            <h2 className="accent">Are You a Good Candidate?</h2>
            <p className="lp-subtext">
              Not every knee OA patient qualifies. Send Dr. Bora your MRI report for a personalised
              assessment within 24 hours.
            </p>
          </div>
          <div className="lp-two-grid">
            <div className="lp-cand lp-cand-yes">
              <h3>✓ Ideal Candidates</h3>
              <ul className="check-list">
                {IDEAL_CANDIDATES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="lp-cand lp-cand-no">
              <h3>✗ May Not Be Suitable</h3>
              <ul className="lp-x-list">
                {NOT_SUITABLE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="center" style={{ marginTop: 28, fontWeight: 600 }}>
            Not sure? Send your MRI. Dr. Bora will assess and be honest about whether you qualify.
          </p>
        </div>
      </section>

      <section className="section section-light">
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
            <span className="eyebrow">Your Orthopaedic Specialist</span>
            <h2 className="accent">Dr. Manu Bora MS Orthopaedics</h2>
            <p>
              I offer bone marrow and adipocyte-derived stem cell injections for knee osteoarthritis
              based on the most rigorous published evidence in regenerative orthopaedics. If you
              have received advice to undergo knee replacement surgery, I encourage you to first
              explore whether your knee can be preserved. WhatsApp me your MRI — I will personally
              review it and give you an honest opinion within 24 hours.
            </p>
            <div className="lp-actions" style={{ marginTop: 24 }}>
              <a href={WA_MRI} target="_blank" rel="noreferrer" className="btn">
                WhatsApp MRI to Dr. Bora
              </a>
              <a href={`tel:${SITE.phoneRaw}`} className="btn btn-outline">
                Call {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container center" style={{ maxWidth: 780, marginBottom: 30 }}>
          <h2 className="accent">Real Patients. Real Results.</h2>
          <p className="lp-subtext">
            These are not cherry-picked outcomes. Watch patients describe what changed after a
            single stem cell injection — in their own words.
          </p>
        </div>
      </section>
      <Reviews />

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="lp-pricing-card">
            <span className="eyebrow">All-Inclusive Outpatient Package</span>
            <h2 className="accent">Transparent Pricing</h2>
            <p className="lp-subtext">
              One procedure. One price. No hidden costs. Compared to knee replacement — which costs
              ₹3–7 lakh plus months of rehab — this is exceptional value.
            </p>
            <ul className="check-list" style={{ textAlign: "left", margin: "24px auto", maxWidth: 620 }}>
              {PRICING_INCLUSIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>
              Cost valid for Gurgaon &amp; Mumbai clinics. Prices subject to review based on
              clinical complexity. EMI options may be available — enquire via WhatsApp.
            </p>
            <a href={WA_MRI} target="_blank" rel="noreferrer" className="btn">
              Enquire Cost &amp; EMI on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section faq-sec">
        <div className="container">
          <h2 className="center accent">Frequently Asked Questions</h2>
          <div className="faq">
            {STEM_CELL_FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <div className="ans" dangerouslySetInnerHTML={{ __html: f.a }} />
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="book-consultation">
        <div className="container two-col" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Free 24-Hour MRI Assessment</span>
            <h2 className="accent">
              Don&apos;t Agree to Knee Replacement Before Getting a Second Opinion
            </h2>
            <p>
              WhatsApp your MRI report to Dr. Manu Bora. You&apos;ll receive a personal reply within
              24 hours — completely free.
            </p>
            <p>Share your MRI + contact number. Dr. Bora&apos;s team will call you back.</p>
            <div className="lp-actions" style={{ marginTop: 20 }}>
              <a href={WA_MRI} target="_blank" rel="noreferrer" className="btn">
                WhatsApp MRI Now
              </a>
              <a href={`tel:${SITE.phoneRaw}`} className="btn btn-outline">
                {SITE.phone}
              </a>
            </div>
          </div>
          <AppointmentForm
            formName="Stem Cell Therapy - MRI Review"
            title="Request Your Free MRI Callback"
            showService={false}
          />
        </div>
      </section>
    </>
  );
}
