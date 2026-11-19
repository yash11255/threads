import Link from "next/link";
import { STEPS, SITE } from "@/lib/site";
export default function Steps() {
  return (
    <section className="section">
      <div className="container two-col">
        <img src="/wp/2024/05/steps-appointment.webp" alt="Book appointment steps" style={{ borderRadius: 16 }} />
        <div>
          <h2 className="accent">Follow These Simple Steps</h2>
          <p style={{ color: "#666" }}>Ready to get back into sports faster &amp; stronger?</p>
          <ol className="steps-list">{STEPS.map((s) => <li key={s}>{s}</li>)}</ol>
          <Link className="btn btn-sq" href="/contact-us/">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
