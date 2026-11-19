import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h5>Quick Links</h5>
          <ul>
            <li><Link href="/our-services/">Our Services</Link></li>
            <li><Link href="/programmes/">Programmes</Link></li>
            <li><Link href="/conditions/">Conditions</Link></li>
            <li><Link href="/about-us/meet-our-specialist/">Meet Our Specialist</Link></li>
            <li><Link href="/contact-us/">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h5>Legal Information</h5>
          <ul>
            <li><Link href="/refund-policy/">Refund Policy</Link></li>
            <li><Link href="/privacy-policy/">Privacy Policy</Link></li>
            <li><Link href="/terms-conditions/">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h5>Contact Info</h5>
          <ul>
            <li><a href={SITE.maps} target="_blank" rel="noreferrer">{SITE.address}</a></li>
            <li><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          </ul>
          <div className="social">
            <a href={SITE.social.linkedin} target="_blank" rel="noreferrer" aria-label="Linkedin">in</a>
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
            <a href={SITE.social.youtube} target="_blank" rel="noreferrer" aria-label="Youtube">▶</a>
          </div>
        </div>
        <div>
          <h5>Make an Appointment</h5>
          <p>Get relief from pain , body fatigue &amp; injury visit us today or book an appointment.</p>
          <a href={`tel:${SITE.phoneRaw}`} className="btn">{SITE.phone}</a>
          <img className="footer-logo" src="/wp/2024/05/footer-logo.png" alt="Threads Physio" />
        </div>
      </div>
      <div className="copyright">Copyright © {new Date().getFullYear()} <span className="accent">Threads Physio</span>. All Right Reserved.</div>
    </footer>
  );
}
