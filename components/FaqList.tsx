import { FAQS } from "@/lib/faqs";
export default function FaqList() {
  return (
    <div className="faq">
      {FAQS.map((f, i) => (
        <details key={f.q} open={i === 0}>
          <summary>{f.q}</summary>
          <div className="ans">
            {f.intro && <p>{f.intro}</p>}
            {f.items && <ul>{f.items.map(([k, v]) => <li key={k}><strong>{k}</strong> {v}</li>)}</ul>}
            {f.outro && <p style={{ marginBottom: 0 }}>{f.outro}</p>}
          </div>
        </details>
      ))}
    </div>
  );
}
