import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, verifySession } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/api/admin/login")) return NextResponse.next();
  const ok = await verifySession(req.cookies.get(COOKIE)?.value).catch(() => false);
  if (ok) return NextResponse.next();
  if (pathname.startsWith("/api/")) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  return NextResponse.redirect(new URL("/admin/login/", req.url));
}
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
