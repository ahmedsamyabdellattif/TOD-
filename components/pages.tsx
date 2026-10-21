import Link from "next/link";
import {
  site,
  t,
  intro,
  cta,
  pathFor,
  streams,
  stages,
  audiences,
  about,
  approach,
  articles,
  associates,
  type Locale,
  type Text,
} from "@/lib/content";
import {
  ImageGallery,
  Experience,
  ServiceFilter,
  Library,
  ArticleCard,
  Social,
} from "./ui";
import { Constellation, Layers, WayOfWorking, PracticeCycle } from "./diagrams";
import { ContactForm } from "./contact";
const tx = (l: Locale, en: string, ar: string) => (l === "en" ? en : ar);
export function Action({ locale, label }: { locale: Locale; label?: Text }) {
  return (
    <Link className="button" href={pathFor(locale, "contact")}>
      {t(label || cta, locale)} <span aria-hidden="true">↗</span>
    </Link>
  );
}
export function PageHead({
  locale,
  title,
  eyebrow,
  description,
}: {
  locale: Locale;
  title: string;
  eyebrow?: string;
  description?: string;
}) {
  return (
    <section className="page-head">
      <div className="container">
        <span className="eyebrow">{eyebrow || "TOD / HUMAN SYSTEMS"}</span>
        <h1>{title}</h1>
        {description && <p className="lead">{description}</p>}
      </div>
    </section>
  );
}
export function ImageSlot({ page, locale }: { page: string; locale: Locale }) {
  const image = site.pageImages.find((p) => p.page === page);
  if (!image) return null;
  return (
    <div className="page-image-slot">
      {image.src ? (
        <img
          src={image.src}
          alt={t(image.alt, locale)}
          width="1240"
          height="600"
          loading="lazy"
        />
      ) : (
        <div>
          <span className="image-symbol" aria-hidden="true">
            ＋
          </span>
          <p>
            {tx(
              locale,
              "Space for an approved photograph",
              "مساحة لصورة معتمدة",
            )}
          </p>
        </div>
      )}
    </div>
  );
}
export function Closing({ locale }: { locale: Locale }) {
  return (
    <section className="closing">
      <div className="container">
        <span className="eyebrow">TOD / HUMAN SYSTEMS</span>
        <h2>{tx(locale, "Start a conversation", "ابدأ حوارًا")}</h2>
        <p>
          {tx(
            locale,
            "Every engagement begins with understanding. Tell us a little about your organization and what you are working with.",
            "يبدأ كل تعاون بالفهم. أخبرنا قليلًا عن مؤسستك وما تعمل عليه.",
          )}
        </p>
        <Action
          locale={locale}
          label={{ en: "Contact TOD", ar: "تواصل مع TOD" }}
        />
      </div>
    </section>
  );
}
export function LineIcon({kind=0}:{kind?:number}) {
 const paths=['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 22v-2a8 8 0 0 1 16 0v2','M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-1a2 2 0 1 0 0-4M2 21v-2a7 7 0 0 1 14 0v2m2-7a5 5 0 0 1 4 5v2','M2 9 12 2l10 7H2Zm2 3v8m5-8v8m6-8v8m5-8v8M2 22h20','M8 5a3 3 0 1 0 6 0 3 3 0 0 0-6 0ZM5 14v-2a6 6 0 0 1 12 0v2M2 15h20v7H2v-7m4 0v7m12-7v7','M3 7h18v14H3V7Zm5 0V3h8v4M3 13h18m-11-2v4h4v-4'];
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d={paths[kind%paths.length]} strokeLinecap="round" strokeLinejoin="round"/></svg>
}
export function Home({locale:l}:{locale:Locale}) {return <div className="option-two-home"><ImageGallery locale={l}/><section className="audience-band"><div className="center-heading"><span className="eyebrow">{tx(l,'WHO WE PARTNER WITH','شركاؤنا في العمل')}</span><span className="gold-rule"/></div><div className="audience-columns">{[audiences[1],audiences[2],audiences[3],audiences[0],audiences[5]].map((a,i)=><div key={a.title.en}><LineIcon kind={i}/><h2>{t(a.title,l)}</h2><p>{t(a.description,l)}</p></div>)}</div></section><section className="about-band"><div className="brand-panel">{site.pageImages.find(x=>x.page==='home-about')?.src?<ImageSlot page="home-about" locale={l}/>:<><img src={site.brandAssets.icon} alt="" width="260" height="260"/><span>HUMAN SYSTEMS</span></>}</div><div className="about-copy"><span className="eyebrow">{tx(l,'ABOUT TOD','عن TOD')}</span><h2>{t(intro.understand,l)}</h2><p>{t(intro.who,l)}</p><Link className="outline-link" href={pathFor(l,'about')}>{tx(l,'About TOD','عن TOD')} ↗</Link></div><div className="principle-stack">{stages.slice(0,3).map((step,i)=><div key={step.name.en}><LineIcon kind={i}/><div><h3>{t(step.name,l)}</h3><p>{t(step.description,l)}</p></div></div>)}<Link className="learn-more" href={pathFor(l,'approach')}>{tx(l,'Our Approach','منهجنا')} ↗</Link></div></section><section className="service-panels"><div className="center-heading"><span className="eyebrow">{tx(l,'OUR SERVICES','خدماتنا')}</span><span className="gold-rule"/></div><div className="service-panel-grid">{streams.map((s,i)=><Link className="service-panel" key={s.id} href={pathFor(l,'services')+'#'+s.id}><div className={'service-symbol symbol-'+i}><ImageSlot page={`home-service-${i+1}`} locale={l}/></div><div><h2>{t(s.name,l)}</h2><p>{t(s.intro,l)}</p><span className="learn-more">{tx(l,'Explore','استكشف')} ↗</span></div></Link>)}</div></section><section className="section experience-section"><div className="container"><Experience locale={l} home/></div></section><section className="section beige"><div className="container"><h2>{tx(l,'How we work','كيف نعمل')}</h2><WayOfWorking locale={l} compact/></div></section><section className="section white"><div className="container"><h2>{tx(l,'The Development Library','مكتبة التطوير')}</h2>{articles.length?<div className="article-grid">{articles.slice(0,3).map(a=><ArticleCard key={a.slug} article={a} locale={l}/>)}</div>:<div className="library-slots">{[1,2,3].map(i=><div key={i}><ImageSlot page={`home-library-${i}`} locale={l}/><span className="eyebrow">0{i}</span><p>{tx(l,'Article awaiting publication','مقالة بانتظار النشر')}</p></div>)}</div>}<Link className="text-link" href={pathFor(l,'library')}>{tx(l,'Visit the Library','تصفح المكتبة')} ↗</Link></div></section><Closing locale={l}/></div>}
export function AudienceGrid({ locale }: { locale: Locale }) {
  return (
    <div className="audience-grid">
      {audiences.map((a, i) => (
        <article key={a.title.en}>
          <span className="eyebrow">0{i + 1}</span>
          <h3>{t(a.title, locale)}</h3>
          <p>{t(a.description, locale)}</p>
        </article>
      ))}
    </div>
  );
}
function CopySection({
  section,
  locale,
}: {
  section: (typeof about)[number];
  locale: Locale;
}) {
  return (
    <section className="section">
      <div className="container two-col image-copy-row">
        <div className="copy-visual"><ImageSlot page={`about-detail-${about.indexOf(section)}`} locale={locale}/></div>
        <div className="prose"><h2>{t(section.title, locale)}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i}>{t(p, locale)}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
export function About({ locale: l }: { locale: Locale }) {
  return (
    <>
      <PageHead
        locale={l}
        title={tx(l, "Who we are", "من نحن")}
        eyebrow={tx(l, "ABOUT TOD", "عن TOD")}
        description={t(about[0].paragraphs[0], l)}
      />
      <section className="section">
        <div className="container two-col image-copy-row">
          <ImageSlot page="about" locale={l} />
          <div className="prose">
            {about[0].paragraphs.slice(1).map((p, i) => (
              <p key={i}>{t(p, l)}</p>
            ))}
          </div>
        </div>
      </section>
      <CopySection section={about[1]} locale={l} />
      <section className="section beige">
        <div className="container">
          <span className="eyebrow">{tx(l, "OUR PURPOSE", "غايتنا")}</span>
          <h2>{t(about[2].paragraphs[0], l)}</h2>
          <p className="measure">{t(about[2].paragraphs[1], l)}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="two-col">
            <article>
              <span className="eyebrow">{tx(l, "MISSION", "الرسالة")}</span>
              <h2>{tx(l, "Our mission", "رسالتنا")}</h2>
              <p>{t(intro.mission, l)}</p>
            </article>
            <article>
              <span className="eyebrow">{tx(l, "VISION", "الرؤية")}</span>
              <h2>{tx(l, "Our vision", "رؤيتنا")}</h2>
              <p>{t(intro.vision, l)}</p>
            </article>
          </div>
          <PracticeCycle locale={l} />
        </div>
      </section>
      <section className="section values-section">
        <div className="container">
          <div className="center-heading">
            <span className="eyebrow">CIRCLES / TOD VALUES</span>
            <h2>{tx(l, "Let curiosity lead", "دع الفضول يقودك")}</h2>
            <p>
              {tx(
                l,
                "CIRCLES is a set of seven values that shape how TOD thinks, works and creates impact. A circle represents connection, wholeness, continuity and interdependence, all central to a Human Systems perspective.",
                "CIRCLES هي مجموعة من سبع قيم تشكل كيف تفكر TOD وتعمل وتصنع الأثر. وتمثل الدائرة الاتصال والتكامل والاستمرارية والاعتماد المتبادل، وهي عناصر جوهرية في منظور الأنظمة الإنسانية.",
              )}
            </p>
          </div>
          <Constellation kind="values" locale={l} />
          <p className="measure">
            {tx(
              l,
              "CIRCLES gives TOD a behavioral language: not simply what we value, but how those values influence judgment and action.",
              "تمنح CIRCLES مؤسسة TOD لغة سلوكية: لا تقتصر على ما نقدّره، بل توضح كيف تؤثر القيم في حُسن التقدير والعمل.",
            )}
          </p>
        </div>
      </section>
      <CopySection section={about[3]} locale={l} />
      <CopySection section={about[4]} locale={l} />
      <Closing locale={l} />
    </>
  );
}
export function Approach({ locale: l }: { locale: Locale }) {
  return (
    <>
      <PageHead
        locale={l}
        title={t(intro.understand, l)}
        eyebrow={tx(l, "OUR APPROACH", "منهجنا")}
        description={tx(
          l,
          "Our work begins with understanding the system more completely before deciding how to intervene. These are the ideas and disciplines that shape how we see, think and work.",
          "يبدأ عملنا بفهم النظام بصورة أشمل قبل تحديد كيفية التدخل. هذه هي الأفكار والتخصصات التي تشكل كيف نرى ونفكر ونعمل.",
        )}
      />
      <section className="section">
        <div className="container">
          <div className="two-col">
            <h2>{tx(l, "Human Systems", "الأنظمة الإنسانية")}</h2>
            <div className="prose">
              {approach.human.map((p, i) => (
                <p key={i}>{t(p, l)}</p>
              ))}
            </div>
          </div>
          <Constellation kind="systems" locale={l} />
        </div>
      </section>
      <section className="section beige">
        <div className="container two-col">
          <h2>{tx(l, "How TOD thinks", "كيف تفكر TOD")}</h2>
          <div>
            <p>{t(approach.thinking[0], l)}</p>
            <ul className="ruled-list">
              {approach.thinking.slice(1, -1).map((p, i) => (
                <li key={i}>{t(p, l)}</li>
              ))}
            </ul>
            <p>{t(approach.thinking.at(-1)!, l)}</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <span className="eyebrow">
            {tx(l, "THE FIVE LAYERS OF SEEING", "طبقات الرؤية الخمس")}
          </span>
          <h2>
            {tx(l, "From observation to becoming", "من الملاحظة إلى التحوّل")}
          </h2>
          <p className="measure">
            {tx(
              l,
              "The Five Layers of Seeing move inquiry from what is immediately visible toward patterns, assumptions, emergence and the development required of those within the system.",
              "تنقل طبقات الرؤية الخمس الاستقصاء من الظاهر مباشرة إلى الأنماط والافتراضات وما يتشكل، ثم التطور المطلوب ممن هم داخل النظام.",
            )}
          </p>
          <Layers locale={l} />
        </div>
      </section>
      <section className="section dark">
        <div className="container two-col">
          <div>
            <span className="eyebrow">
              {tx(l, "OUR PHILOSOPHY OF INQUIRY", "فلسفتنا في الاستقصاء")}
            </span>
            <h2>{t(approach.inquiry[0], l)}</h2>
          </div>
          <div className="prose">
            {approach.inquiry.slice(1).map((p, i) => (
              <p key={i}>
                {t(p, l).replace(
                  "Callout, Intellectual discipline:",
                  "Intellectual discipline:",
                )}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2>{tx(l, "How TOD works", "كيف تعمل TOD")}</h2>
          <p className="measure">
            {tx(
              l,
              "We work with human systems through a considered and collaborative process. Each stage informs the next, allowing us to design interventions that are relevant, practical and enduring.",
              "نعمل مع الأنظمة الإنسانية عبر عملية مدروسة وتعاونية. تثري كل مرحلة ما يليها، بما يتيح تصميم تدخلات ملائمة وعملية ومستدامة.",
            )}
          </p>
          <WayOfWorking locale={l} />
          <p>
            {tx(
              l,
              "This is a way of working rather than a rigid methodology. The sequence may flex according to context, but the discipline remains: see clearly, understand deeply, engage those within the system, develop what is required, and build capability that can endure.",
              "هذه طريقة للعمل وليست منهجية جامدة. قد يتكيف التسلسل مع السياق، لكن يظل الانضباط ثابتًا: رؤية واضحة وفهم عميق وإشراك من هم داخل النظام وتطوير ما يلزم وبناء قدرة تدوم.",
            )}
          </p>
          <ImageSlot page="approach" locale={l} />
        </div>
      </section>
      <Closing locale={l} />
    </>
  );
}
export function Services({ locale: l }: { locale: Locale }) {
  return (
    <>
      <PageHead
        locale={l}
        title={tx(
          l,
          "Designed around each client's context.",
          "مصممة وفق سياق كل عميل.",
        )}
        eyebrow={tx(l, "SERVICES", "الخدمات")}
        description={t(intro.services, l)}
      />
      <div className="container section">
        <ServiceFilter locale={l} />
        <ImageSlot page="services" locale={l} />
      </div>
      <section className="section beige">
        <div className="container">
          <h2>
            {tx(l, "Not sure where to begin?", "لست متأكدًا من أين تبدأ؟")}
          </h2>
          <p className="measure">
            {tx(
              l,
              "Most engagements start with a conversation about what is happening in the system, before deciding which services fit.",
              "تبدأ معظم أشكال التعاون بحوار حول ما يحدث في النظام، قبل تحديد الخدمات المناسبة.",
            )}
          </p>
          <Action locale={l} />
        </div>
      </section>
    </>
  );
}
export function ExperiencePage({ locale: l }: { locale: Locale }) {
  return (
    <>
      <PageHead
        locale={l}
        title={tx(
          l,
          "Where the challenge is as human as it is technical.",
          "حيث يكون التحدي إنسانيًا بقدر ما هو تقني.",
        )}
        description={t(intro.audience, l)}
      />
      <section className="section">
        <div className="container">
          <AudienceGrid locale={l} />
          <p className="lead">
            {tx(
              l,
              "Our work spans government, education, aviation, healthcare, sports and the corporate sector.",
              "يمتد عملنا عبر القطاع الحكومي والتعليم والطيران والرعاية الصحية والرياضة وقطاع الشركات.",
            )}
          </p>
          <ImageSlot page="who-we-work-with" locale={l} />
          <h2>{tx(l, "Selected Experience", "خبرات مختارة")}</h2>
          <p>{t(intro.experience, l)}</p>
          <Experience locale={l} />
        </div>
      </section>
      <Closing locale={l} />
    </>
  );
}
export function AssociatesPage({ locale: l }: { locale: Locale }) {
  return (
    <>
      <PageHead
        locale={l}
        title={tx(l, "Associates", "خبراؤنا")}
        description={t(intro.associates, l)}
      />
      <section className="section">
        <div className="container">
          {associates.length ? (
            <div className="associate-grid">
              {associates.map((a) => (
                <Link
                  key={a.slug}
                  href={pathFor(l, "associates/" + a.slug)}
                  className="associate-card"
                >
                  {a.photo ? (
                    <img
                      src={a.photo}
                      alt={t(a.name, l)}
                      width="600"
                      height="750"
                    />
                  ) : (
                    <div className="portrait-placeholder" />
                  )}
                  <h2>{t(a.name, l)}</h2>
                  <p>{t(a.title, l)}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>{tx(l, "Our network of practitioners", "شبكة خبرائنا")}</h2>
              <p>
                {tx(
                  l,
                  "Associate profiles and photographs will be added once supplied and approved.",
                  "ستُضاف ملفات الخبراء وصورهم بعد استلامها واعتمادها.",
                )}
              </p>
            </div>
          )}
          <ImageSlot page="associates" locale={l} />
        </div>
      </section>
      <Closing locale={l} />
    </>
  );
}
export function LibraryPage({ locale: l }: { locale: Locale }) {
  return (
    <>
      <PageHead
        locale={l}
        title={tx(l, "The Development Library", "مكتبة التطوير")}
        description={t(intro.library, l)}
      />
      <section className="section">
        <div className="container">
          <Library locale={l} articles={articles} />
          <ImageSlot page="library" locale={l} />
        </div>
      </section>
      <Closing locale={l} />
    </>
  );
}
export function ContactPage({ locale: l }: { locale: Locale }) {
  const enabled =
    process.env.CONTACT_ENABLED === "true" &&
    site.privacyApproved &&
    !!process.env.RESEND_API_KEY &&
    !!process.env.CONTACT_FROM &&
    !!process.env.TURNSTILE_SECRET_KEY &&
    !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  return (
    <>
      <PageHead
        locale={l}
        title={tx(l, "Start a conversation", "ابدأ حوارًا")}
        description={t(intro.contact, l)}
      />
      <section className="section">
        <div className="container contact-layout">
          <aside>
            <h2>{tx(l, "Contact TOD", "تواصل مع TOD")}</h2>
            <Social locale={l} />
            <p>{t(site.address, l)}</p>
            <p className="muted">
              {tx(
                l,
                "Office address awaiting confirmation.",
                "عنوان المكتب بانتظار التأكيد.",
              )}
            </p>
            <iframe
  title={l === "ar" ? "خريطة الرياض" : "Map of Riyadh"}
  src="https://maps.google.com/maps?q=Riyadh%2C%20Saudi%20Arabia&z=10&output=embed"
  width="100%"
  height="320"
  style={{ border: 0 }}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
          </aside>
          <ContactForm
            locale={l}
            enabled={enabled}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
          />
        </div>
      </section>
    </>
  );
}
