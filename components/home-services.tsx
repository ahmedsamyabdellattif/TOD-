"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowIcon } from "./arrow-icon";
import { site, streams, t, pathFor, type Locale } from "@/lib/content";
import s from "./home-services.module.css";

export function HomeServices({ locale }: { locale: Locale }) {
  const grid = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = grid.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !("IntersectionObserver" in window)) return;
    const cards = [...element.querySelectorAll<HTMLElement>("article")];
    element.dataset.motion = "true";
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach(card => observer.observe(card));
    const stop = () => { if (preference.matches) delete element.dataset.motion; };
    preference.addEventListener("change", stop);
    return () => { observer.disconnect(); preference.removeEventListener("change", stop); delete element.dataset.motion; };
  }, []);
  return <section className={s.section} aria-labelledby="home-services-heading">
    <div className="container">
      <div className={s.heading}>
        <span className="eyebrow">{locale === "ar" ? "خدماتنا" : "Our services"}</span>
        <h2 id="home-services-heading">{locale === "ar" ? "ثلاثة مسارات، تتكامل بحسب احتياجك" : "Three streams. Shaped around your context."}</h2>
        <span className="gold-rule" />
      </div>
      <div className={s.grid} ref={grid}>
        {streams.map((stream, index) => {
          const image = site.pageImages.find(item => item.page === `home-service-${index + 1}`);
          return <article key={stream.id} className={s.card} style={{ "--delay": `${index * 130}ms` } as CSSProperties}>
            <div className={s.image}>{image?.src && <img src={image.src} alt="" width="1200" height="442" loading="lazy" />}</div>
            <div className={s.body}>
              <span className={s.number}>0{index + 1}</span>
              <h3>{t(stream.name, locale)}</h3>
              <p>{t(stream.intro, locale)}</p>
              <Link className={s.link} href={`${pathFor(locale, "services")}#${stream.id}`} onAnimationEnd={event => {
                if (event.target === event.currentTarget) {
                  const card = event.currentTarget.closest("article");
                  if (card) card.dataset.settled = "true";
                }
              }}>
                <span>{locale === "ar" ? "استكشف المسار" : "Explore this stream"}</span>
                <ArrowIcon direction={locale === "ar" ? "up-left" : "up-right"} />
              </Link>
            </div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
