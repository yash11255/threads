import { NextResponse } from "next/server";
import { callAppsScript, type Submission } from "@/lib/appsScript";

// Auth is enforced by middleware.ts for /api/admin/*
export async function GET() {
  try {
    const r = await callAppsScript<{ rows: Submission[]; sheetUrl: string }>("list");
    return NextResponse.json({ ok: true, rows: r.rows, sheetUrl: r.sheetUrl });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 502 });
  }
}

export async function PATCH(req: Request) {
  const { id, status, notes } = await req.json();
  try { await callAppsScript("update", { id, status, notes }); return NextResponse.json({ ok: true }); }
  catch (e) { return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 502 }); }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  try { await callAppsScript("delete", { id }); return NextResponse.json({ ok: true }); }
  catch (e) { return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 502 }); }
}
