import { ArrowIcon } from "@/components/arrow-icon";
import Link from "next/link";
import people from "@/content/team.json";
import { t, pathFor, type Locale } from "@/lib/content";
import { Closing } from "@/components/pages";
import s from "./team-preview.module.css";

type Person = (typeof people)[number];
const copy = (l: Locale, en: string, ar: string) => l === "ar" ? ar : en;
const base = (l: Locale, preview: boolean) => pathFor(l, preview ? "preview/team" : "associates");

function Portrait({ person, locale }: { person: Person; locale: Locale }) {
  return <div className={`${s.portrait} ${person.slug === "aref-al-mubarak" ? s.arefPortrait : person.slug === "mensur-burhan" ? s.mensurPortrait : ""}`}>
    {person.photo ? <img src={person.photo} alt={t(person.name, locale)} width="600" height="750" /> : <>
      <span className={s.monogram} aria-hidden="true">{person.name.en.replace('Dr. ', '').split(' ').map(v => v[0]).slice(0, 2).join('')}</span>
      <span className={s.portraitNote}>{copy(locale, "Portrait to follow", "الصورة الشخصية قريبًا")}</span>
    </>}
  </div>;
}
function Card({ person, locale: l, preview }: { person: Person; locale: Locale; preview: boolean }) {
  return <article className={s.card}>
    <Link href={`${base(l, preview)}/${person.slug}`} className={s.portraitLink} aria-label={copy(l, `View ${person.name.en}'s profile`, `عرض الملف الشخصي: ${person.name.ar}`)} tabIndex={-1} aria-hidden="true"><Portrait person={person} locale={l} /></Link>
    <div className={s.cardBody}>
      <h3>{t(person.name, l)}</h3>
      <p className={s.role}>{t(person.role, l)}</p>
      <ul className={s.tags}>{person.tags.map(tag => <li key={tag.en}>{t(tag, l)}</li>)}</ul>
      <p className={s.location}><Pin />{t(person.location, l)}</p>
      <Link className={s.profileLink} href={`${base(l, preview)}/${person.slug}`}>{copy(l, "View profile", "عرض الملف الشخصي")}<span aria-hidden="true"><ArrowIcon direction={l === "ar" ? "up-left" : "up-right"} /></span></Link>
    </div>
  </article>;
}
function Pin() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>; }

export function TeamPreview({ locale: l, person, preview = true }: { locale: Locale; person?: Person; preview?: boolean }) {
  const otherLocale = l === "ar" ? "en" : "ar";
  return <main id="main" className={`${s.preview} ${s.refinement}`}>
    {preview && <div className={s.reviewBar}><div className={s.wrap}><span>{copy(l, "Design preview · For review", "معاينة التصميم · للمراجعة")}</span><Link href={`${base(otherLocale, preview)}${person ? `/${person.slug}` : ''}`} lang={otherLocale}>{l === 'ar' ? 'English' : 'العربية'} <span aria-hidden="true"><ArrowIcon /></span></Link></div></div>}
    {person ? <>
      <section className={s.profileHero}><div className={s.wrap}>
        <Link className={s.back} href={base(l, preview)}><span aria-hidden="true"><ArrowIcon direction={l === "ar" ? "right" : "left"} /></span> {copy(l, "Meet our team", "تعرّف على فريقنا")}</Link>
        <span className="eyebrow">{person.group === 'leadership' ? copy(l, "Our leadership", "القيادة") : copy(l, "Our associates", "الخبراء المتعاونون")}</span>
        <h1>{t(person.name, l)}</h1><p className={s.profileRole}>{t(person.role, l)}</p>
      </div></section>
      <article className={`${s.wrap} ${s.profileGrid}`}>
        <aside className={s.profileAside}><Portrait person={person} locale={l}/><p className={s.location}><Pin/>{t(person.location, l)}</p><Link href={pathFor(l, 'contact')} className={s.contact}>{copy(l, "Start a Conversation", "ابدأ حوارًا")}<span aria-hidden="true"><ArrowIcon direction={l === "ar" ? "up-left" : "up-right"} /></span></Link><a className={s.linkedin} href={person.linkedin} target="_blank" rel="noopener noreferrer">{copy(l, 'Connect on LinkedIn', 'تواصل عبر لينكدإن')} <span aria-hidden="true"><ArrowIcon /></span></a></aside>
        <div className={s.profileContent}>
          <p className={s.statement}>{t(person.statement, l)}</p>
          <section><h2>{copy(l, "Professional background", "الخبرة المهنية")}</h2>{person.bio.map((p,i) => <p key={i}>{t(p,l)}</p>)}</section>
          <section><h2>{copy(l, "Areas of expertise", "مجالات الخبرة")}</h2><ul className={s.expertise}>{person.expertise.map(v => <li key={v.en}>{t(v,l)}</li>)}</ul></section>
          <section><h2>{copy(l, "Selected credentials", "مؤهلات واعتمادات مختارة")}</h2><ul className={s.credentials}>{person.credentials.map(v => <li key={v.en}>{t(v,l)}</li>)}</ul></section>
        </div>
      </article>
      <section className={s.more}><div className={s.wrap}><span className="eyebrow">{copy(l,'Our people','فريقنا')}</span><h2>{copy(l,'Meet the rest of our team','تعرّف على بقية الفريق')}</h2><div className={s.moreLinks}>{people.filter(p => p.slug !== person.slug).map(p => <Link key={p.slug} href={`${base(l, preview)}/${p.slug}`}><span>{t(p.name,l)}<small>{t(p.role,l)}</small></span><span aria-hidden="true"><ArrowIcon direction={l === "ar" ? "up-left" : "up-right"} /></span></Link>)}</div></div></section>
    </> : <>
      <section className={s.hero}><div className={s.heroImage} aria-hidden="true"/><div className={s.wrap}>
        <span className="eyebrow">{copy(l,"TOD / Our people","TOD / فريقنا")}</span>
        <h1>{copy(l,"Our leadership", "قيادتنا")}<br/><span>{copy(l,"and associates.","وخبراؤنا.")}</span></h1>
        <p>{copy(l,"Practitioners who bring leadership, organisational understanding and specialist expertise to each engagement.","ممارسون يجمعون بين الخبرة القيادية والفهم المؤسسي والمعرفة المتخصصة في كل تعاون.")}</p>
        <nav className={s.sectionNav} aria-label={copy(l,'Team sections','أقسام الفريق')}><a href="#leadership">{copy(l,'Our Leadership','القيادة')} <span aria-hidden="true"><ArrowIcon direction="down" /></span></a><a href="#associates">{copy(l,'Our Associates','الخبراء المتعاونون')} <span aria-hidden="true"><ArrowIcon direction="down" /></span></a></nav>
      </div></section>
      {['leadership', 'associates'].map((group, i) => <section key={group} id={group} className={`${s.teamSection} ${i ? s.associates : ''}`}><div className={s.wrap}>
        <div className={s.sectionHeading}><div><span className="eyebrow">0{i+1} / {copy(l,'Our team','فريقنا')}</span><h2>{i ? copy(l,'Our Associates','الخبراء المتعاونون') : copy(l,'Our Leadership','القيادة')}</h2></div><p>{i ? copy(l,'Our associate network brings specialist expertise to each engagement. We assemble the right combination of advisors, coaches, mentors and facilitators around the client’s context and objectives.','تضيف شبكة خبرائنا معرفة متخصصة إلى كل تعاون. ونجمع المزيج المناسب من المستشارين والكوتشز والمرشدين والميسّرين بحسب سياق العميل وأهدافه.') : copy(l,'TOD is led by practitioners with experience in leadership, organisational development, coaching, mentoring and capability building across Saudi Arabia and the wider region.','يقود TOD ممارسون ذوو خبرة في القيادة والتطوير المؤسسي والكوتشينج والإرشاد وبناء القدرات في المملكة العربية السعودية والمنطقة.')}</p></div>
        <div className={s.cards}>{people.filter(p => p.group === group).map(p => <Card key={p.slug} person={p} locale={l} preview={preview}/>)}</div>
      </div></section>)}
    </>}
    <Closing locale={l}/>
  </main>;
}
