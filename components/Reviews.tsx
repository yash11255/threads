"use client";
import { useState } from "react";
import { REVIEWS } from "@/lib/site";

function Review({ r }: { r: (typeof REVIEWS)[number] }) {
  const [full, setFull] = useState(false);
  return (
    <div className="review">
      <div className="who"><img src="/wp/2024/05/dummy-profile-pic-male.webp" alt="" /><strong>{r.name}</strong></div>
      <p className={full ? "" : "clamp"}>{r.text}</p>
      {r.text.length > 400 && <button className="more" onClick={() => setFull(!full)}>{full ? "Read less" : "Read more"}</button>}
      <div className="stars">★★★★★</div>
    </div>
  );
}

export default function Reviews() {
  const [i, setI] = useState(0);
  const per = 2, pages = Math.ceil(REVIEWS.length / per);
  return (
    <section className="section reviews">
      <div className="container rev-grid">
        <div>
          <span className="eyebrow">Patient Feedback</span>
          <h2>Our Patient Reviews</h2>
          <p>Read what our patients have to say about us and how we helped them make a strong comeback after injuries. Their satisfaction is what makes us one of the most trusted physiotherapy clinics in Gurgaon.</p>
          <a className="btn btn-yellow" href="/testimonials/">Our Patient Stories</a>
        </div>
        <div className="rev-slider">
          <button className="arr l" aria-label="Previous" onClick={() => setI((i - 1 + pages) % pages)}>‹</button>
          <div className="review-track">
            {REVIEWS.slice(i * per, i * per + per).map((r) => <Review key={r.name} r={r} />)}
          </div>
          <button className="arr r" aria-label="Next" onClick={() => setI((i + 1) % pages)}>›</button>
          <div className="dots">{Array.from({ length: pages }, (_, k) => <button key={k} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`Page ${k + 1}`} />)}</div>
        </div>
      </div>
    </section>
  );
}
