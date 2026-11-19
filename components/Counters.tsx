"use client";
import { useEffect, useRef, useState } from "react";
import { COUNTERS } from "@/lib/site";

function Num({ to }: { to: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now(), dur = 2500;
      const tick = (t: number) => { const p = Math.min(1, (t - start) / dur); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <div className="n" ref={ref}>{n.toLocaleString("en-IN")} +</div>;
}

export default function Counters() {
  return (
    <section className="section counters">
      <div className="container center">
        <h2>Experience the journey from pain to regaining strength</h2>
        <div className="counter-grid">
          {COUNTERS.map((c) => (
            <div className="counter" key={c.label}><div className="c-ic">{["🏃","💪","🦶","🦵"][COUNTERS.indexOf(c)]}</div><Num to={c.value} /><p>{c.label}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}
