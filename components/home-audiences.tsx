"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { audiences, t, type Locale } from "@/lib/content";
import s from "./home-audiences.module.css";

const paths = [
  'M8 5a3 3 0 1 0 6 0 3 3 0 0 0-6 0ZM5 21v-3a6 6 0 0 1 12 0v3',
  'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-1a2 2 0 0 0 0-4M2 21v-2a7 7 0 0 1 14 0v2m2-7a5 5 0 0 1 4 5v2',
  'M2 9 12 2l10 7H2Zm2 3v8m5-8v8m6-8v8m5-8v8M2 22h20',
  'M8 5a3 3 0 1 0 6 0 3 3 0 0 0-6 0ZM5 14v-2a6 6 0 0 1 12 0v2M2 15h20v7H2v-7m4 0v7m12-7v7',
  'M3 7h18v14H3V7Zm5 0V3h8v4M3 13h18m-11-2v4h4v-4',
];
export function HomeAudiences({ locale }: { locale: Locale }) {
  const grid = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = grid.current;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !("IntersectionObserver" in window)) return;
    element.dataset.motion = "true";
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.visible = "true"; observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    element.querySelectorAll("article").forEach(card => observer.observe(card));
    const stop = () => { if (preference.matches) delete element.dataset.motion; };
    preference.addEventListener("change", stop);
    return () => { observer.disconnect(); preference.removeEventListener("change", stop); delete element.dataset.motion; };
  }, []);
  return <section className={s.section} aria-labelledby="audience-heading"><div className="container">
    <div className={s.heading}><h2 id="audience-heading" className="eyebrow">{locale === "ar" ? "شركاؤنا في العمل" : "Who we partner with"}</h2><span className="gold-rule" /></div>
    <div className={s.grid} ref={grid}>{[audiences[1], audiences[2], audiences[3], audiences[0], audiences[5]].map((item, index) => <article key={item.title.en} className={s.card} style={{ "--delay": `${index * 140}ms` } as CSSProperties}>
      <div className={s.surface}>
        <div className={s.top}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[index]} /></svg><span className={s.number} aria-hidden="true">0{index + 1}</span></div>
        <h3>{t(item.title, locale)}</h3><p>{t(item.description, locale)}</p>
      </div>
    </article>)}</div>
  </div></section>;
}
