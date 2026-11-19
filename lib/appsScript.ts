import "server-only";

export type Submission = {
  id: string; timestamp: string; form: string; name: string; email: string; phone: string;
  service: string; message: string; page: string; status: string; notes: string;
};

export async function callAppsScript<T = Record<string, unknown>>(action: string, payload: Record<string, unknown> = {}) {
  const url = process.env.APPS_SCRIPT_URL, secret = process.env.APPS_SCRIPT_SECRET;
  if (!url || !secret) throw new Error("APPS_SCRIPT_URL / APPS_SCRIPT_SECRET not configured");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, secret, ...payload }),
    redirect: "follow",
    cache: "no-store",
  });
  const text = await res.text();
  let json: { ok: boolean; error?: string } & T;
  try { json = JSON.parse(text); } catch { throw new Error("Apps Script returned non-JSON (check deployment access is 'Anyone')"); }
  if (!json.ok) throw new Error(json.error || "Apps Script error");
  return json;
}
