"use client";
import { useState, useId, type CSSProperties } from "react";
import { ValueIcon, SystemIcon } from "./icons";
import {
  values,
  systems,
  stages,
  approach,
  t,
  type Locale,
} from "@/lib/content";
export function Constellation({
  kind,
  locale,
}: {
  kind: "values" | "systems";
  locale: Locale;
}) {
  const data = kind === "values" ? values : systems;
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const id = useId();
  const active = pinned ?? hover ?? focus;
  const current = active === null ? null : data[active];
  const centerY=kind==='values'?47.5:48.5;
  const approvedValues=[[50,10],[81,24],[87,55],[68,82],[32,82],[13,55],[19,24]];
  const points=data.map((_,i)=>{if(kind==='values')return {x:approvedValues[i][0],y:approvedValues[i][1]};const angle=(-90+i*360/data.length)*Math.PI/180;return {x:50+35*Math.cos(angle),y:centerY+35*Math.sin(angle)}});
  const iconMap = [0, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11];
  return (
    <div
      className={`infographic ${kind}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setPinned(null);
          setHover(null);
          setFocus(null);
        }
      }}
    >
      <div className="infographic-help">
        <p>
          {locale === "ar"
            ? "مرّر أو اضغط على عنصر لاكتشاف معناه. استخدم Tab للتنقل وEscape لإلغاء الاختيار."
            : "Hover, tap or tab to discover each element. Press Escape to clear your selection."}
        </p>
        <button
          className="quiet-button"
          onClick={() => {
            setPinned(null);
            setHover(null);
            setFocus(null);
          }}
        >
          {locale === "ar" ? "إعادة العرض" : "Reset view"} ↺
        </button>
      </div>
      <div
        className="constellation"
        aria-label={
          kind === "values" ? "CIRCLES — TOD Values" : "Human Systems"
        }
        dir="ltr"
      >
        <svg className="connections" viewBox="0 0 1000 1000" aria-hidden="true">
          <circle cx="500" cy={centerY*10} r={kind==='values'?230:350} />
          {kind === "systems" &&
            points.map((_, i) => (
              <ellipse
                key={i}
                cx="500"
                cy={centerY*10}
                rx="265"
                ry="100"
                transform={`rotate(${(i * 360) / points.length} 500 ${centerY*10})`}
              />
            ))}
          {points.map((p, i) => (
            <g key={i} className={active === i ? "lit" : ""}>
              <path className="spoke" d={`M500 ${centerY*10}L${p.x * 10} ${p.y * 10}`} />
              <circle
                cx={500+(p.x*10-500)*(kind==='values'?230/Math.hypot(p.x*10-500,p.y*10-centerY*10):.61)}
                cy={centerY*10+(p.y*10-centerY*10)*(kind==='values'?230/Math.hypot(p.x*10-500,p.y*10-centerY*10):.61)}
                r="4"
              />
              {kind === "values" && active === i && <path className="reference-signal" d={`M${p.x*10} ${p.y*10}L500 ${centerY*10}`} />}
            </g>
          ))}
        </svg>
        <div
          className="diagram-core"
          dir={locale === "ar" ? "rtl" : "ltr"}
          id={`${id}-core`}
          aria-live="polite"
        >
          <div key={active ?? "overview"} className="core-content"><span className="eyebrow">
            {kind === "values"
              ? locale === "ar"
                ? "قيم TOD"
                : "TOD VALUES"
              : locale === "ar"
                ? "منظورنا"
                : "OUR PERSPECTIVE"}
          </span>
          <h3>
            {current
              ? t(current.name, locale)
              : kind === "values"
                ? "CIRCLES"
                : locale === "ar"
                  ? "الأنظمة الإنسانية"
                  : "Human Systems"}
          </h3>
          {current ? (
            <>
              <em>
                {"motto" in current
                  ? t(current.motto as { en: string; ar: string }, locale)
                  : ""}
              </em>
              <p>{t(current.description, locale)}</p>
            </>
          ) : (
            <p>
              {kind === "values"
                ? locale === "ar"
                  ? "سبع قيم تشكل كيف نفكر ونعمل ونصنع الأثر."
                  : "Seven values that shape how we think, work and create impact."
                : locale === "ar"
                  ? "كل عنصر جزء من منظومة مترابطة."
                  : "Every element is part of an interconnected whole."}
            </p>
          )}{kind === "values" && <span className="core-cue">{locale === "ar" ? "اكتشف الترابط" : "DISCOVER THE CONNECTION"}</span>}</div>
        </div>
        {data.map((v, i) => (
          <div
            key={v.name.en}
            className={`diagram-node ${active === i ? "selected" : ""}`}
            style={
              {
                "--x": `${points[i].x}%`,
                "--y": `${points[i].y}%`,
                "--delay": `${i*65}ms`,
              } as CSSProperties
            }
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <button
              aria-pressed={pinned === i}
              aria-controls={`${id}-description-${i}`}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setHover(i);
              }}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setFocus(i)}
              onBlur={() => setFocus(null)}
              onClick={() => setPinned(pinned === i ? null : i)}
            >
              <span className="medallion">
                {kind === "values" ? (
                  <ValueIcon index={i} />
                ) : iconMap[i] === 11 ? (
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    <circle cx="32" cy="32" r="23" />
                    <ellipse cx="32" cy="32" rx="11" ry="23" />
                    <path d="M9 32h46M13 20h38M13 44h38" />
                  </svg>
                ) : (
                  <SystemIcon index={iconMap[i]} />
                )}
                <span className="node-plus" aria-hidden="true">
                  {active === i ? "−" : "+"}
                </span>
              </span>
              <span className="node-name">{t(v.name, locale)}</span>
              {"motto" in v && (
                <em>{t(v.motto as { en: string; ar: string }, locale)}</em>
              )}
            </button>
            <p className="node-description" id={`${id}-description-${i}`}>
              {t(v.description, locale)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export function WayOfWorking({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  return (
    <ol className={`stages ${compact ? "compact" : ""}`}>
      {stages.map((s, i) => (
        <li key={s.name.en}>
          <span className="stage-number">0{i + 1}</span>
          <h3>{t(s.name, locale)}</h3>
          <p>{t(s.description, locale)}</p>
          {!compact && <small>{t(s.activities, locale)}</small>}
        </li>
      ))}
    </ol>
  );
}
export function Layers({locale}:{locale:Locale}){
 const [active,setActive]=useState(0);const item=approach.layers[active];const id=useId();
 return <div className="seeing-layers"><div className="seeing-steps" role="group" aria-label={locale==='ar'?'طبقات الرؤية الخمس':'Five layers of seeing'}>{approach.layers.map((layer,i)=><button key={layer.name.en} aria-pressed={active===i} aria-controls={id} onClick={()=>setActive(i)} className={i<=active?'reached':''}><span>{new Intl.NumberFormat(locale==='ar'?'ar-SA':'en-US',{minimumIntegerDigits:2}).format(i+1)}</span><strong>{t(layer.name,locale)}</strong></button>)}</div><div id={id} className="seeing-detail" aria-live="polite"><div className="seeing-orbit" aria-hidden="true">{[0,1,2,3,4].map(i=><span key={i} className={i<=active?'reached':''} style={{'--i':i} as CSSProperties}/>)}<b>{new Intl.NumberFormat(locale==='ar'?'ar-SA':'en-US',{minimumIntegerDigits:2}).format(active+1)}</b></div><article key={active}><span className="eyebrow">{locale==='ar'?'طبقات الرؤية':'Layers of seeing'}</span><h3>{t(item.name,locale)}</h3><em>{t(item.question,locale)}</em><p>{t(item.focus,locale)}</p><button className="text-link" onClick={()=>setActive(n=>(n+1)%5)}>{locale==='ar'?'الطبقة التالية':'Next layer'} <span aria-hidden="true">{locale==='ar'?'←':'→'}</span></button></article></div></div>
}
export function PracticeCycle({ locale }: { locale: Locale }) {
  const names =
    locale === "ar"
      ? ["الممارسة", "التعلم", "البحث", "المعرفة"]
      : ["Practice", "Learning", "Research", "Knowledge"];
  const desc =
    locale === "ar"
      ? [
          "عمل مؤسسي حقيقي",
          "التأمل وبناء القدرات",
          "استقصاء منضبط",
          "ممارسة أفضل",
        ]
      : [
          "Real organizational work",
          "Reflection and capability",
          "Disciplined inquiry",
          "Improved practice",
        ];
  return (
    <div className="practice-cycle">
      <ol>
        {names.map((n, i) => (
          <li key={n}>
            <span className="cycle-circle">0{i + 1}</span>
            <h3>{n}</h3>
            <p>{desc[i]}</p>
            <span className="cycle-arrow" aria-hidden="true">
              {locale === "ar" ? "←" : "→"}
            </span>
          </li>
        ))}
      </ol>
      <p className="cycle-return">
        ↶{" "}
        {locale === "ar"
          ? "تعود المعرفة لتثري الممارسة"
          : "Knowledge returns to strengthen practice"}
      </p>
    </div>
  );
}
