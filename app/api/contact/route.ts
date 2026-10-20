import { NextResponse } from "next/server";
import { site, streams } from "@/lib/content";
const attempts = new Map<string, { count: number; expires: number }>();
export const runtime = "nodejs";
export async function POST(request: Request) {
  const respond = (code: string, status: number) =>
    NextResponse.json({ code }, { status });
  if (
    process.env.CONTACT_ENABLED !== "true" ||
    !site.privacyApproved ||
    !process.env.RESEND_API_KEY ||
    !process.env.CONTACT_FROM ||
    !process.env.TURNSTILE_SECRET_KEY
  )
    return respond("not_configured", 503);
  const origin = request.headers.get("origin");
  const allowed = new URL(process.env.SITE_URL || request.url).origin;
  if (origin !== allowed) return respond("origin", 403);
  if (Number(request.headers.get("content-length") || 0) > 20000)
    return respond("too_large", 413);
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return respond("invalid", 400);
  }
  if (raw.length > 20000) return respond("too_large", 413);
  let d: Record<string, unknown>;
  try {
    d = JSON.parse(raw);
  } catch {
    return respond("invalid", 400);
  }
  if (!d || typeof d !== "object" || Array.isArray(d))
    return respond("invalid", 400);
  const str = (key: string, max: number) =>
    typeof d[key] === "string" ? (d[key] as string).trim().slice(0, max) : "";
  const name = str("name", 200),
    organization = str("organization", 200),
    email = str("email", 254),
    message = str("message", 5000),
    interest = str("interest", 100),
    token = str("token", 2048),
    id = str("requestId", 64);
  if (str("website", 200)) return respond("invalid", 400);
  if (
    !name ||
    !organization ||
    !message ||
    message.length < 10 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    /[\r\n]/.test(email) ||
    d.consent !== "on" ||
    !token ||
    !/^[-0-9a-f]{36}$/.test(id) ||
    !["unsure", ...streams.map((s) => s.id)].includes(interest)
  )
    return respond("invalid", 400);
  const now = Date.now();
  for (const [key, v] of attempts) if (v.expires < now) attempts.delete(key);
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const record = attempts.get(ip) || { count: 0, expires: now + 600000 };
  if (record.count >= 5) return respond("rate_limit", 429);
  record.count++;
  attempts.set(ip, record);
  try {
    const verification = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
        signal: AbortSignal.timeout(10000),
      },
    );
    const result = await verification.json();
    if (!result.success || result.hostname !== new URL(allowed).hostname)
      return respond("verification", 400);
    const resultEmail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `tod-contact/${id}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [site.email],
        reply_to: email,
        subject: "TOD website enquiry",
        text: `Name: ${name}\nOrganization: ${organization}\nRole: ${str("role", 200)}\nEmail: ${email}\nPhone: ${str("phone", 100)}\nInterest: ${interest}\n\n${message}\n\nPrivacy consent: accepted\nConsent time: ${new Date().toISOString()}\nPolicy URL: ${allowed}/${d.locale === "ar" ? "ar" : "en"}/privacy`,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!resultEmail.ok) return respond("delivery_failed", 502);
    return NextResponse.json({ ok: true });
  } catch {
    return respond("delivery_failed", 502);
  }
}
