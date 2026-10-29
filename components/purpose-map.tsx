"use client";
import { useEffect, useRef } from "react";
import copy from "@/content/purpose.json";
import type { Locale } from "@/lib/content";
import s from "./purpose-map.module.css";

export function PurposeMap({ locale }: { locale: Locale }) {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = section.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || reduced.matches || !("IntersectionObserver" in window)) return;
    element.classList.add(s.motion);
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add(s.visible); observer.unobserve(entry.target); }
    }), { threshold: .15 });
    element.querySelectorAll("article").forEach(article => observer.observe(article));
    const sync = () => { if (reduced.matches) element.classList.remove(s.motion); };
    reduced.addEventListener("change", sync);
    return () => { observer.disconnect(); reduced.removeEventListener("change", sync); element.classList.remove(s.motion); };
  }, []);
  return <section ref={section} className={s.purpose} aria-label={locale === "ar" ? "رسالتنا ورؤيتنا" : "Our mission and vision"}>
    {copy[locale].map(item => <article key={item.title}>
      <div className={s["purpose-title"]}><h2>{item.title}</h2><span className={s.connector} aria-hidden="true"><i /></span></div>
      <h3 className={s["purpose-lead"]}>{item.lead}</h3><p>{item.body}</p>
    </article>)}
  </section>;
}
