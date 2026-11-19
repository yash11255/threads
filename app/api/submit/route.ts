import { NextResponse } from "next/server";
import { callAppsScript } from "@/lib/appsScript";

const hits = new Map<string, number[]>(); // simple per-instance rate limit

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  if (recent.length >= 5) return NextResponse.json({ ok: false, error: "Too many submissions, wait a minute" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let b: Record<string, string>;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 }); }
  if (b.website) return NextResponse.json({ ok: true }); // honeypot: silently drop bots

  const name = String(b.name || "").trim(), email = String(b.email || "").trim(), phone = String(b.phone || "").trim();
  if (!name || name.length > 100) return NextResponse.json({ ok: false, error: "Please enter your name" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email" }, { status: 400 });
  if (!/^[0-9+\-\s]{7,16}$/.test(phone)) return NextResponse.json({ ok: false, error: "Please enter a valid phone number" }, { status: 400 });

  try {
    await callAppsScript("submit", { data: {
      name, email, phone,
      service: String(b.service || ""), message: String(b.message || "").slice(0, 2000),
      form: String(b.form || "Contact"), page: String(b.page || ""),
    }});
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("submit failed", e);
    return NextResponse.json({ ok: false, error: "Could not submit right now" }, { status: 502 });
  }
}
