import { OptionTwoHome } from '@/components/option-two';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Carousel, ContactForm } from '@/components/interactive';
import { nav, hero, intro, about, context, human, preview, closing, audiences, principles, themes, sectors, services, connected, routes, type Locale } from '@/lib/content';
type Props={params:Promise<{locale:string;slug?:string[]}>};
export const dynamicParams=false;
export function generateStaticParams(){return ['en','ar'].flatMap(locale=>routes.map(route=>({locale,slug:route?route.split('/'):[]})));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {locale,slug=[]}=await params;const path=slug.join('/');const service=services.find(s=>path==='services/'+s.slug);const name=service?.title||nav.find(n=>n[0]===path)?.[1]||'TOD Arabia';const base=process.env.SITE_URL||'https://todarabia.com';return {metadataBase:new URL(base),title:`${name} | TOD Arabia — Human Systems`,description:service?.audience||intro,alternates:{canonical:`/${locale}${path?'/'+path:''}`,languages:{en:`/en/${path}`,ar:`/ar/${path}`}},robots:{index:process.env.SITE_INDEXABLE==='true'&&locale==='en',follow:true},openGraph:{title:`${name} | TOD Arabia`,description:service?.audience||intro,type:'website',locale:locale==='ar'?'ar_SA':'en_GB',images:[{url:'/brand/logo-dark.png'}]}}}
function CTA({locale,secondary=false}:{locale:Locale;secondary?:boolean}){return <Link className={secondary?'text-link':'button'} href={`/${locale}/contact`}>{locale==='ar'?'ابدأ حوارًا':'Start a Conversation'} <span aria-hidden="true">↗</span></Link>}
function Art(){return <div className="system-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="art-core"><img src="/brand/icon-gold.png" alt="" width="250" height="250"/></div><span className="art-label label-one">PEOPLE</span><span className="art-label label-two">PURPOSE</span><span className="art-label label-three">POSSIBILITY</span><span className="art-point point-one"/><span className="art-point point-two"/><span className="art-caption">THE WHOLE IS CONNECTED.</span></div>}
function ServiceList({locale}:{locale:Locale}){return <div className="service-list" lang="en" dir="ltr">{services.map((s,i)=><Link className="service-row" key={s.slug} href={`/${locale}/services/${s.slug}`}><span className="number">0{i+1}</span><h3>{s.title}</h3><p>{s.audience}</p><span className="row-arrow" aria-hidden="true">↗</span></Link>)}</div>}
function Close({locale}:{locale:Locale}){return <section className="closing"><span className="eyebrow">HUMAN SYSTEMS</span><h2 lang="en" dir="ltr">{closing}</h2><CTA locale={locale}/></section>}
function PageHead({label,title,description}:{label:string;title:string;description?:string}){return <section className="page-head" lang="en" dir="ltr"><span className="eyebrow">{label}</span><h1>{title}</h1>{description&&<p className="lead">{description}</p>}</section>}
export default async function Page({params}:Props){const {locale:loc,slug=[]}=await params;if(loc!=='en'&&loc!=='ar')notFound();const locale=loc as Locale;const path=slug.join('/');if(!routes.includes(path))notFound();const service=services.find(s=>path==='services/'+s.slug);

// غيّرها إلى false لإظهار محتوى الصفحات مجددًا
const hideInnerContent = true;

if (hideInnerContent && path !== '') {
  return (
    <main id="main">
      <section
        style={{
          minHeight: '60vh',
          display: 'grid',
          placeContent: 'center',
          textAlign: 'center',
          padding: '80px 24px',
        }}
      >
        <h1>
          {locale === 'ar' ? 'قيد التجهيز' : 'Work in Progress'}
        </h1>

        <p>
          {locale === 'ar'
            ? 'نعمل على تجهيز هذه الصفحة. نعود إليكم قريبًا.'
            : 'We’re preparing this page. Please check back soon.'}
        </p>
      </section>
    </main>
  );
}

return <main id="main">
{path===''&&<OptionTwoHome locale={locale}/>}
{path==='services'&&<><PageHead label="WHAT WE DO" title="Services" description={connected}/><section className="services-section"><ServiceList locale={locale}/></section><Close locale={locale}/></>}
{service&&<><PageHead label={`SERVICES / 0${services.indexOf(service)+1}`} title={service.title} description={service.audience}/><section className="detail-layout" lang="en" dir="ltr"><aside><span className="eyebrow">CLIENT OUTCOME</span><h2>{service.outcome}</h2><CTA locale={locale}/></aside><div>{service.paragraphs.map(p=><p className="body-large" key={p}>{p}</p>)}<h2>Our offer</h2><ul className="lined-list">{service.offerings.map(o=><li key={o}>{o}</li>)}</ul>{service.situations&&<><h2>Typical client situations</h2><ul className="lined-list">{service.situations.map(s=><li key={s}>{s}</li>)}</ul><h2>How we engage</h2><p>{service.engagement}</p></>}{service.formats&&<><h2>Typical formats</h2><dl className="formats">{service.formats.map(([a,b])=><div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl></>}<Link className="text-link" href={`/${locale}/services`}>All services <span aria-hidden="true">↗</span></Link></div></section><Close locale={locale}/></>}
{path==='our-thinking'&&<><PageHead label="PERSPECTIVES" title="Our Thinking"/><section className="editorial" lang="en" dir="ltr"><div><span className="eyebrow">HUMAN SYSTEMS</span><h2>Human Systems</h2><p className="body-large">{human}</p></div><div><h2>Thinking themes</h2><ol className="theme-list">{themes.map(t=><li key={t}>{t}</li>)}</ol><p className="empty-note">Articles and reflections will appear here once approved for publication.</p></div></section><Close locale={locale}/></>}
{path==='who-we-work-with'&&<><PageHead label="CONTEXT & EXPERIENCE" title="Who We Work With" description="TOD works with organisations whose performance depends on people, leadership and the quality of the systems around them. The experience of TOD and its leadership spans government, aviation and defence, education, sport, real estate and major corporate environments in Saudi Arabia."/><section className="sectors" lang="en" dir="ltr">{sectors.map((s,i)=><div key={s}><span className="number">0{i+1}</span><h2>{s}</h2></div>)}</section><Carousel locale={locale}/><section className="editorial" lang="en" dir="ltr"><h2>Case studies</h2><p className="empty-note">Approved case studies will appear here. Client names, attribution and outcomes are awaiting confirmation.</p></section><Close locale={locale}/></>}
{path==='about'&&<><PageHead label="TOTAL ORGANIZATION DEVELOPMENT" title="About TOD" description={about}/><section className="about-system" lang="en" dir="ltr"><Art/><div><span className="eyebrow">OUR PERSPECTIVE</span><h2>Human Systems</h2><p>{human}</p><p>{context}</p></div></section><section className="principles" lang="en" dir="ltr"><span className="eyebrow">HOW WE WORK</span><div className="principles-grid">{principles.map(([t,p],i)=><div key={t}><span className="number">0{i+1}</span><h3>{t}</h3><p>{p}</p></div>)}</div></section><Close locale={locale}/></>}
{path==='contact'&&<><PageHead label="CONTACT" title="Start a Conversation"/><section className="contact-layout"><aside lang="en" dir="ltr"><h2>Lead what matters.</h2><p>{intro}</p><div className="contact-location"><span className="eyebrow">TOD ARABIA</span><p>Saudi Arabia</p><p className="note">Contact email, telephone and business address are awaiting confirmation.</p></div></aside><ContactForm locale={locale}/></section></>}
</main>}
