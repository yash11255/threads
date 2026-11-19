"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const router = useRouter();
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr("");
    const password = new FormData(e.currentTarget).get("password");
    const r = await fetch("/api/admin/login/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const j = await r.json();
    setBusy(false);
    if (j.ok) router.replace("/admin/"); else setErr(j.error || "Login failed");
  }
  return (
    <div className="login-box">
      <img src="/wp/2024/05/logo-web.png" alt="Threads Physio" />
      <h2 style={{ fontSize: 22, textAlign: "center" }}>Admin Login</h2>
      <form onSubmit={submit} className="form-grid">
        <div className="field"><input type="password" name="password" placeholder="Password" required autoFocus /></div>
        <button className="btn" disabled={busy} style={{ justifyContent: "center" }}>{busy ? "Signing in…" : "Sign in"}</button>
        {err && <div className="form-msg err">{err}</div>}
      </form>
    </div>
  );
}
