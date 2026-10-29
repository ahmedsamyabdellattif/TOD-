"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { streams, t, pathFor, type Locale } from "@/lib/content";
import { ServiceIcon } from "./service-icon";
import { ArrowIcon } from "./arrow-icon";
import s from "./services-explorer.module.css";

export function ServicesExplorer({ locale, preview = true }: { locale: Locale; preview?: boolean }) {
  const [streamIndex, setStreamIndex] = useState(-1);
  useEffect(() => {
    const sync = () => {
      const index = streams.findIndex(item => item.id === window.location.hash.slice(1));
      setStreamIndex(index);
    };
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => { window.removeEventListener("hashchange", sync); window.removeEventListener("popstate", sync); };
  }, []);
  const ar = locale === "ar";
  return <main id="main" className={s.root}>
    {preview && <div className={s.review}><div className="container"><span>{ar ? "معاينة للمراجعة · صفحة الخدمات الحالية لم تتغيّر" : "Design preview · Current services page unchanged"}</span><Link href={pathFor(ar ? "en" : "ar", "preview/services")}>{ar ? "English" : "العربية"}</Link></div></div>}
    <section className={s.hero}><div className="container"><span className="eyebrow">{ar ? "الخدمات" : "Our services"}</span><h1>{ar ? "ابدأ بما يحتاجه نظامك." : "Start with what your system needs."}</h1><p>{ar ? "اختر المسار، ثم استكشف الخدمات المناسبة لسياقك." : "Choose a stream, then explore the services that fit your context."}</p></div></section>
    <section className={`container ${s.explorer}`}>
      <div className={s.allBar}><button className={s.allButton} aria-pressed={streamIndex === -1} onClick={() => { setStreamIndex(-1); window.history.pushState(null, "", window.location.pathname); }}>{ar ? "جميع المسارات" : "All streams"}<span>{streams.reduce((total, item) => total + item.services.length, 0)}</span></button></div>
      <div className={s.streams} role="group" aria-label={ar ? "اختر المسار" : "Choose a stream"}>{streams.map((item, index) => <button key={item.id} aria-pressed={streamIndex === index} onClick={() => { setStreamIndex(index); window.history.pushState(null, "", `#${item.id}`); }}><span className={s.streamIcon}><ServiceIcon id={item.services[0].id}/></span><strong><span className={s.streamNumber}>0{index + 1} / </span>{t(item.name, locale)}</strong><small>{item.services.length} {ar ? "خدمات" : "services"}</small></button>)}</div>
      {(streamIndex === -1 ? streams.map((_, index) => index) : [streamIndex]).map(index => <StreamExplorer key={streams[index].id} streamIndex={index} locale={locale} />)}
    </section>
  </main>;
}

function StreamExplorer({ streamIndex, locale }: { streamIndex: number; locale: Locale }) {
  const [serviceIndex, setServiceIndex] = useState<number | null>(0);
  const stream = streams[streamIndex];
  const service = serviceIndex === null ? null : stream.services[serviceIndex];
  const ar = locale === "ar";
  return <section className={s.streamSection} id={stream.id}>
      <div className={s.intro}><span className="eyebrow">0{streamIndex + 1}</span><h2>{t(stream.name, locale)}</h2><p>{t(stream.intro, locale)}</p></div>
      <div className={s.layout}>
        <div className={s.list} aria-label={ar ? "خدمات المسار" : "Stream services"}>{stream.services.map((item, index) => {
          const open = serviceIndex === index;
          const id = `service-${item.id}`;
          return <div key={item.id} className={s.row} data-open={open}>
            <h3><button aria-expanded={open} aria-controls={`${id}-mobile ${id}-desktop`} id={`${id}-trigger`} onClick={() => setServiceIndex(open ? null : index)}><span className={s.listIcon}><ServiceIcon id={item.id}/></span><span>{t(item.title, locale)}</span><span className={s.plus} aria-hidden="true">{open ? "−" : "+"}</span></button></h3>
            <div className={s.mobileDetail} id={`${id}-mobile`} hidden={!open}><div><span className={s.detailIcon}><ServiceIcon id={item.id}/></span><p>{t(item.description, locale)}</p><Link className={s.action} href={pathFor(locale, "contact")}>{ar ? "ناقش احتياجك معنا" : "Discuss your needs"}<ArrowIcon direction={ar ? "up-left" : "up-right"}/></Link></div></div>
          </div>;
        })}</div>
        <div className={s.detailPane}>
          {stream.services.map((item,index) => <section className={s.detail} key={item.id} id={`service-${item.id}-desktop`} aria-labelledby={`service-${item.id}-trigger`} hidden={serviceIndex !== index}>
            <span className={s.detailIcon}><ServiceIcon id={item.id}/></span>
            <span className={s.largeNumber} aria-hidden="true">{String(index+1).padStart(2,"0")}</span>
            <span className="eyebrow">{ar ? "الخدمة المختارة" : "Selected service"}</span><h3>{t(item.title,locale)}</h3><p>{t(item.description,locale)}</p>
            <Link className={s.action} href={pathFor(locale,"contact")}>{ar ? "ناقش احتياجك معنا" : "Discuss your needs"}<ArrowIcon direction={ar ? "up-left" : "up-right"}/></Link>
          </section>)}
          {!service && <div className={s.empty}>{ar ? "اختر خدمة لعرض تفاصيلها." : "Choose a service to explore the details."}</div>}
        </div>
      </div>
  </section>;
}
