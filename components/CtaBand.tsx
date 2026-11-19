import { SITE } from "@/lib/site";
export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container">
        <h2>Get relief from pain, body fatigue &amp; injury</h2>
        <a className="btn btn-white" href={`tel:${SITE.phoneRaw}`}>Call Now @ 9310138022</a>
      </div>
    </section>
  );
}
