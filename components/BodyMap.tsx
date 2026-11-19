"use client";
import { useState } from "react";
const SPOTS = [
  { key: "shoulder", title: "SHOULDER", icon: "/wp/2024/06/b.png", pos: { top: "19%", left: "32%" }, side: "left", items: ["Rotator Cuff", "Shoulder Dislocation", "Shoulder Replacement Surgery"] },
  { key: "hip", title: "HIP", icon: "/wp/2024/06/a.png", pos: { top: "47%", left: "58%" }, side: "right", items: ["Hip Impingement", "Hip Replacement"] },
  { key: "knee", title: "KNEE", icon: "/wp/2024/06/c.png", pos: { top: "68%", left: "40%" }, side: "left", items: ["ACL Injury Children", "ACL Tear", "PCL Injury", "Knee LCL", "Knee MCL", "MPFL Repair", "Other Knee Injuries", "Internal Brace", "Knee Meniscuss", "Knee Replacement", "Knee Osteochondritis"] },
  { key: "ankle", title: "ANKLE", icon: "/wp/2024/06/d.png", pos: { top: "90%", left: "56%" }, side: "right", items: ["Ankle Ligament Tear"] },
] as const;

export default function BodyMap() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="bodymap">
      <img src="/wp/2024/06/body-img.png" alt="Human body injury map" />
      {SPOTS.map((s) => (
        <div key={s.key} className={`hotspot ${s.side} ${open === s.key ? "open" : ""}`} style={s.pos}>
          <button aria-label={s.title} onClick={() => setOpen(open === s.key ? null : s.key)} />
          <div className="tip">
            <h4><img src={s.icon} alt="" />{s.title}</h4>
            <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        </div>
      ))}
    </div>
  );
}
