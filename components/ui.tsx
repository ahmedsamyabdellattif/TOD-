"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  site,
  t,
  pathFor,
  cta,
  pageNames,
  streams,
  clients,
  categories,
  type Locale,
  type Article,
} from "@/lib/content";
function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: "inline-block", width: "1em", height: "1em", flexShrink: 0, verticalAlign: "-0.125em" }}
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export function UtilityIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "LinkedIn" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4" />
        </>
      ) : name === "Instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".5" />
        </>
      ) : name === "X" ? (
        <path d="m4 3 12 18h4L8 3H4Zm0 18L20 3" />
      ) : name === "phone" ? (
        <path d="m8 3 3 5-3 3c1 3 2 4 5 5l3-3 5 3c0 4-2 5-4 5C9 21 3 15 3 7c0-2 1-4 5-4Z" />
      ) : name === "mail" ? (
        <>
          <rect x="3" y="5" width="18" height="14" />
          <path d="m3 5 9 8 9-8" />
        </>
      ) : (
        <>
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18M5 7h14M5 17h14" />
        </>
      )}
    </svg>
  );
}
export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const details = useRef<HTMLDetailsElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
    if (details.current) details.current.open = false;
  }, [pathname]);
  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
        if (details.current) details.current.open = false;
      }
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  const other = locale === "en" ? "ar" : "en";
  const current = (p: string) =>
    pathname === pathFor(locale, p) ? "page" : undefined;
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          if (details.current) details.current.open = false;
          menuRef.current?.focus();
        }
      }}
    >
      <Link
        href={pathFor(locale)}
        aria-label={locale === "ar" ? "TOD — الرئيسية" : "TOD — Home"}
        className="logo"
      >
        <img
          src={site.brandAssets.darkLogo}
          alt="TOD — Total Organization Development"
          width="174"
          height="120"
        />
      </Link>
      <button
        ref={menuRef}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen(!open)}
      >
        {locale === "ar" ? "القائمة" : "Menu"}{" "}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div
        ref={navRef}
        className={`header-links ${open ? "is-open" : ""}`}
        id="site-navigation"
      >
        <nav
          aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}
        >
          {["", "about", "approach", "associates", "services", "who-we-work-with", "library", "contact", "legal"].map(p=><Link key={p} href={pathFor(locale,p)} aria-current={current(p)}>{t(pageNames[p],locale)}</Link>)}
        </nav>
        <Link className="button small" href={pathFor(locale, "contact")}>
          {t(cta, locale)} <span aria-hidden="true"><ArrowIcon /></span>
        </Link>
      </div>
      <Link
        className="language"
        href={pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`)}
        hrefLang={other}
        lang={other}
        aria-label={
          locale === "ar" ? "Switch to English" : "التبديل إلى العربية"
        }
      >
        <UtilityIcon name="language" />
        <span>{locale === "ar" ? "EN" : "العربية"}</span>
      </Link>
    </header>
  );
}
export function Social({ locale }: { locale: Locale }) {
  return (
    <div className="contact-icons">
      <a
        href={`tel:${site.phone}`}
        aria-label={`${locale === "ar" ? "اتصل" : "Call"} ${site.phone}`}
      >
        <UtilityIcon name="phone" />
        <bdi>{site.phoneDisplay}</bdi>
      </a>
      <a href={`mailto:${site.email}`}>
        <UtilityIcon name="mail" />
        {site.email}
      </a>
      <div className="social-icons">
        {site.social.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.name} — ${locale === "ar" ? "نافذة جديدة" : "new tab"}`}
          >
            <UtilityIcon name={s.name} />
            <span className="sr-only">{s.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
export function ImageGallery({locale}:{locale:Locale}) {
 const [selected,setSelected]=useState(0);const [hovering,setHovering]=useState(false);const [focused,setFocused]=useState(false);const [reduced,setReduced]=useState(false);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduced(mq.matches);sync();mq.addEventListener('change',sync);return()=>mq.removeEventListener('change',sync)},[]);
 useEffect(()=>{if(hovering||focused||reduced)return;const timer=setInterval(()=>{if(document.visibilityState==='visible')setSelected(n=>(n+1)%site.images.length)},7000);return()=>clearInterval(timer)},[hovering,focused,reduced]);
 return <section className="city-hero" onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setFocused(false)}}><div className="city-slides" aria-live="off">{site.images.map((slide,i)=><div key={slide.id} className={`city-image ${selected===i?'is-active':''}`} aria-hidden={selected!==i} role="img" aria-label={t(slide.alt,locale)} style={slide.src?{backgroundImage:`url("${slide.src}")`}:undefined}>{!slide.src&&<div className="city-placeholder"><span>{locale==='ar'?'مساحة للصورة':'Image space'} {i+1}</span><p>{t(slide.alt,locale)}</p></div>}</div>)}</div><div className="city-copy"><span className="eyebrow">TOD ARABIA · HUMAN SYSTEMS</span><h1>{locale==='en'?<>{site.hero.en.replace(/human systems[.]?$/i,'')}<span className="hero-accent">human systems</span></>:<>{site.hero.ar.split('أنظمة إنسانية')[0]}<span className="hero-accent">أنظمة إنسانية</span></>}</h1><span className="gold-rule"/><p>{t(site.statement,locale)}</p><div className="actions"><Link className="button" href={pathFor(locale,'contact')}>{t(cta,locale)} <span aria-hidden="true"><ArrowIcon /></span></Link><Link className="outline-link" href={pathFor(locale,'services')}>{locale==='ar'?'استكشف خدماتنا':'Explore Our Services'} <ArrowIcon /></Link></div></div><div className="city-gallery-controls" role="group" aria-label={locale==='ar'?'صور الرئيسية':'Home images'}>{site.images.map((x,i)=><button className="slide-dot" key={x.id} aria-pressed={selected===i} aria-label={`${locale==='ar'?'الصورة':'Image'} ${i+1}`} onClick={()=>setSelected(i)}><span aria-hidden="true"/></button>)}</div></section>
}
export function Experience({
  locale,
  home = false,
}: {
  locale: Locale;
  home?: boolean;
}) {
  const [paused, setPaused] = useState(false);
  const items = clients;
  const render = () =>
    items.map((c) => (
      <span key={c.order} className="client-name">
        <span className="client-logo-space">{c.logoApproved && c.logo ? <img src={c.logo} alt="" /> : <span className="client-logo-placeholder"><span aria-hidden="true">{String(c.order).padStart(2, "0")}</span><small>{locale === "ar" ? "مساحة شعار الشركة" : "Client logo placeholder"}</small></span>}</span><span className="client-caption">{c.name}</span>
      </span>
    ));
  return (
    <div className="experience-block">
      <div className="row-between">
        <div><span className="eyebrow">{locale === "ar" ? "الخبرات" : "EXPERIENCE"}</span><h2>{locale === "ar" ? "خبرات مختارة" : "Selected Experience"}</h2></div>
        <button
          className="quiet-button"
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused
            ? locale === "ar"
              ? "تشغيل الحركة"
              : "Resume motion"
            : locale === "ar"
              ? "إيقاف الحركة"
              : "Pause motion"}{" "}
          {paused ? "▷" : "Ⅱ"}
        </button>
      </div>
      <div
        className={`marquee ${paused ? "paused" : ""}`}
        tabIndex={0}
        role="region"
        aria-label={locale === "ar" ? "أسماء الجهات" : "Organization names"}
        dir="ltr"
      >
        <div className="marquee-track">
          <div className="client-set">{render()}</div>
          <div className="client-set duplicate" aria-hidden="true">
            {render()}
          </div>
        </div>
      </div>
    </div>
  );
}
export function ServiceFilter({ locale }: { locale: Locale }) {
  const [active, setActive] = useState("all");
  useEffect(() => {
    const sync = () => {
      const h = location.hash.slice(1);
      setActive(streams.some((s) => s.id === h) ? h : "all");
    };
    sync();
    addEventListener("hashchange", sync);
    addEventListener("popstate", sync);
    return () => {
      removeEventListener("hashchange", sync);
      removeEventListener("popstate", sync);
    };
  }, []);
  function choose(id: string) {
    setActive(id);
    history.pushState(null, "", id === "all" ? location.pathname : `#${id}`);
  }
  return (
    <>
      <div
        className="filter-bar"
        role="group"
        aria-label={locale === "ar" ? "تصفية الخدمات" : "Filter services"}
      >
        <button aria-pressed={active === "all"} onClick={() => choose("all")}>
          {locale === "ar" ? "جميع المسارات" : "All streams"} <span>24</span>
        </button>
        {streams.map((s, i) => (
          <button
            key={s.id}
            aria-pressed={active === s.id}
            onClick={() => choose(s.id)}
          >
            0{i + 1} {t(s.name, locale)}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {active === "all"
          ? 24
          : streams.find((s) => s.id === active)?.services.length}{" "}
        {locale === "ar" ? "خدمة معروضة" : "services shown"}
      </p>
      {streams
        .filter((s) => active === "all" || active === s.id)
        .map((s) => (
          <section className="service-stream" id={s.id} key={s.id}>
            <div className="stream-heading">
              <span className="eyebrow">
                0{streams.indexOf(s) + 1} / {s.services.length}{" "}
                {locale === "ar" ? "خدمات" : "SERVICES"}
              </span>
              <h2>{t(s.name, locale)}</h2>
              <p>{t(s.intro, locale)}</p>
            </div>
            <div className="service-grid">
              {s.services.map((item,index) => (
                <article key={item.id}><span className="service-index" aria-hidden="true">{String(index+1).padStart(2,"0")}</span>
                  <h3>{t(item.title, locale)}</h3>
                  <p>{t(item.description, locale)}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
    </>
  );
}
export function Library({
  locale,
  articles,
}: {
  locale: Locale;
  articles: Article[];
}) {
  const [category, setCategory] = useState(-1);
  const [page, setPage] = useState(1);
  const filtered = articles.filter(
    (a) => category === -1 || a.category === category,
  );
  const featured =
    category === -1 ? filtered.find((a) => a.featured) : undefined;
  const list = filtered.filter((a) => a !== featured);
  const pages = Math.max(1, Math.ceil(list.length / 6));
  return (
    <>
      <div
        className="filter-bar"
        role="group"
        aria-label={locale === "ar" ? "تصنيف المقالات" : "Article categories"}
      >
        <button
          aria-pressed={category === -1}
          onClick={() => {
            setCategory(-1);
            setPage(1);
          }}
        >
          {locale === "ar" ? "الكل" : "All"}
        </button>
        {categories.map((c, i) => (
          <button
            key={c.en}
            aria-pressed={category === i}
            onClick={() => {
              setCategory(i);
              setPage(1);
            }}
          >
            {t(c, locale)}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {filtered.length} {locale === "ar" ? "مقالة" : "articles"}
      </p>
      {featured && <ArticleCard article={featured} locale={locale} featured />}
      <div className="article-grid">
        {list.slice((page - 1) * 6, page * 6).map((a) => (
          <ArticleCard key={a.slug} article={a} locale={locale} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <h2>
            {locale === "ar"
              ? "مساحة للتعلّم ومشاركة الرؤى"
              : "A space for learning and perspective"}
          </h2>
          <p>
            {locale === "ar"
              ? "ستُنشر المقالات هنا فور اعتمادها."
              : "Articles will appear here once approved for publication."}
          </p>
        </div>
      )}
      {pages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            {locale === "ar" ? "السابق" : "Previous"}
          </button>
          <span>
            {page} / {pages}
          </span>
          <button
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
          >
            {locale === "ar" ? "التالي" : "Next"}
          </button>
        </div>
      )}
    </>
  );
}
export function ArticleCard({
  article: a,
  locale,
  featured = false,
}: {
  article: Article;
  locale: Locale;
  featured?: boolean;
}) {
  return (
    <Link
      className={`article-card ${featured ? "featured" : ""}`}
      href={pathFor(locale, "library/" + a.slug)}
    >
      {a.image && (
        <img
          src={a.image}
          alt={t(a.imageAlt, locale)}
          width="800"
          height="500"
          loading="lazy"
        />
      )}
      <div>
        <span className="eyebrow">
          {t(categories[a.category] || categories[0], locale)}
        </span>
        <h3>{t(a.title, locale)}</h3>
        <p>{t(a.summary, locale)}</p>
        <span className="text-link">
          {locale === "ar" ? "اقرأ المقال" : "Read article"} <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
export function ArticleShare({ locale }: { locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(location.href), []);
  return (
    <div className="share-links">
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn <ArrowIcon />
      </a>
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(location.href);
            setCopied(true);
          } catch {
            setCopied(false);
          }
        }}
      >
        {locale === "ar" ? "نسخ الرابط" : "Copy link"}
      </button>
      <span role="status">
        {copied && (locale === "ar" ? "تم نسخ الرابط" : "Link copied")}
      </span>
    </div>
  );
}
