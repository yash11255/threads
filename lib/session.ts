// HMAC-signed session cookie using Web Crypto (works in middleware + route handlers).
export const COOKIE = "tp_admin";
const MAX_AGE = 60 * 60 * 12; // 12h

const enc = new TextEncoder();
async function key() {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET not configured");
  return crypto.subtle.importKey("raw", enc.encode(s), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
const b64 = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

export async function createSession() {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const sig = b64(await crypto.subtle.sign("HMAC", await key(), enc.encode(String(exp))));
  return { value: `${exp}.${sig}`, maxAge: MAX_AGE };
}

export async function verifySession(token?: string) {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  const expected = b64(await crypto.subtle.sign("HMAC", await key(), enc.encode(exp)));
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}
