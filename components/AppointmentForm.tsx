"use client";
import { useState } from "react";

type Props = { formName?: string; title?: string; showService?: boolean; compact?: boolean };
const SERVICES = ["ACL Surgery & Rehabilitation", "Sports Physiotherapy", "Back / Neck Pain", "Shoulder Pain", "Knee Pain", "Arthritis", "Post-Surgical Rehabilitation", "Online Physiotherapy", "Other"];

export default function AppointmentForm({ formName = "Contact", title = "Book an Appointment", showService = true, compact }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    try {
      const res = await fetch("/api/submit/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, form: formName, page: location.pathname }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Submission failed");
      setState("ok");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("err");
    }
  }

  return (
    <div className="form-card">
      {title && <h2>{title}</h2>}
      <form onSubmit={onSubmit} className={`form-grid ${compact ? "" : "cols"}`}>
        <input type="text" name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden />
        <div className="field"><input name="name" placeholder="Your Name" required maxLength={100} /></div>
        <div className="field"><input name="email" type="email" placeholder="Your Email" required maxLength={150} /></div>
        <div className="field"><input name="phone" type="tel" placeholder="Your Contact Number" required pattern="[0-9+\-\s]{7,16}" /></div>
        {showService && (
          <div className="field">
            <select name="service" defaultValue="">
              <option value="" disabled>Select Service</option>
              {SERVICES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        )}
        <div className="field full"><textarea name="message" placeholder="Your message (optional)" maxLength={2000} /></div>
        <div className="full">
          <button className="btn" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Submit"}</button>
        </div>
        {state === "ok" && <div className="form-msg ok full">Thank you for your message. It has been sent. Our team will contact you shortly.</div>}
        {state === "err" && <div className="form-msg err full">{error}. Please try again or call us.</div>}
      </form>
    </div>
  );
}
