"use client";
import { useState, useRef, useEffect, type FormEvent } from "react";
import Link from "next/link";
import Script from "next/script";
import { streams, site, t, pathFor, type Locale } from "@/lib/content";
declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}
export function ContactForm({
  locale,
  enabled,
  siteKey,
}: {
  locale: Locale;
  enabled: boolean;
  siteKey: string;
}) {
  const ar = locale === "ar";
  const [token, setToken] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const email = site.email;
  useEffect(() => {
    if (!enabled || !scriptReady || !widget.current || !window.turnstile)
      return;
    widgetId.current = window.turnstile.render(widget.current, {
      sitekey: siteKey,
      language: ar ? "ar" : "en",
      callback: (value: string) => setToken(value),
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
    });
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
    };
  }, [enabled, scriptReady, siteKey, ar]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    setBusy(true);
    setStatus("");
    try {
      const data = Object.fromEntries(new FormData(form));
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          locale,
          token,
          requestId: crypto.randomUUID(),
        }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.code || "failed");
      setStatus(
        ar
          ? "شكرًا لك. تم استلام رسالتك وسنتواصل معك."
          : "Thank you. We have received your message and will be in touch.",
      );
      form.reset();
    } catch {
      setStatus(
        ar
          ? "لم يتم إرسال الرسالة. حاول مجددًا أو تواصل معنا عبر البريد الإلكتروني."
          : "Your message was not sent. Please retry or contact us by email.",
      );
    } finally {
      setBusy(false);
      setToken("");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      {!enabled && (
        <p className="notice">
          {ar
            ? "نموذج الإرسال بانتظار تفعيل خدمة البريد واعتماد سياسة الخصوصية. يمكنك التواصل الآن عبر"
            : "The form is awaiting email-service setup and an approved privacy policy. You can contact us now at"}{" "}
          <a href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
      <div className="form-grid">
        {[
          ["name", ar ? "الاسم الكامل" : "Full name", "text", "name", true],
          [
            "organization",
            ar ? "المؤسسة" : "Organization",
            "text",
            "organization",
            true,
          ],
          [
            "role",
            ar
              ? "الدور أو المسمى الوظيفي (اختياري)"
              : "Role or title (optional)",
            "text",
            "organization-title",
            false,
          ],
          ["email", ar ? "البريد الإلكتروني" : "Email", "email", "email", true],
          [
            "phone",
            ar
              ? "الهاتف مع رمز الدولة (اختياري)"
              : "Phone with country code (optional)",
            "tel",
            "tel",
            false,
          ],
        ].map(([name, label, type, auto, required]) => (
          <label key={String(name)}>
            {label}
            {required && <span aria-hidden="true"> *</span>}
            <input
              name={String(name)}
              type={String(type)}
              autoComplete={String(auto)}
              required={Boolean(required)}
              maxLength={200}
            />
          </label>
        ))}
        <label>
          {ar ? "مجال الاهتمام" : "Area of interest"}
          <select name="interest" defaultValue="unsure">
            <option value="unsure">
              {ar ? "لست متأكدًا بعد" : "Not sure yet"}
            </option>
            {streams.map((s) => (
              <option key={s.id} value={s.id}>
                {t(s.name, locale)}
              </option>
            ))}
          </select>
        </label>
        <label className="full">
          {ar ? "الرسالة" : "Message"} <span aria-hidden="true">*</span>
          <textarea
            name="message"
            rows={6}
            required
            minLength={10}
            maxLength={5000}
          />
        </label>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent">
        <input name="consent" type="checkbox" required />
        {ar
          ? "أوافق على معالجة بياناتي وفق"
          : "I consent to the processing of my information under the"}{" "}
        <Link href={pathFor(locale, "privacy")}>
          {ar ? "سياسة الخصوصية" : "Privacy Policy"}
        </Link>
        .
      </label>
      {enabled && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            onReady={() => setScriptReady(true)}
          />
          <div ref={widget} />
        </>
      )}
      <button
        className="button"
        disabled={!enabled || busy || !token}
        type="submit"
      >
        {busy
          ? ar
            ? "جارٍ الإرسال…"
            : "Sending…"
          : ar
            ? "إرسال الرسالة"
            : "Send message"}{" "}
        ↗
      </button>
      <p role="status" className="form-status">
        {status}
      </p>
    </form>
  );
}
