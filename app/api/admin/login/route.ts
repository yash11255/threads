import { NextResponse } from "next/server";
import { COOKIE, createSession } from "@/lib/session";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return NextResponse.json({ ok: false, error: "ADMIN_PASSWORD not configured" }, { status: 500 });
  await new Promise((r) => setTimeout(r, 400)); // slow down brute force
  if (password !== expected) return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 });
  const s = await createSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, s.value, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: s.maxAge });
  return res;
}
