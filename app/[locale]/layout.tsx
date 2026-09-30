import { SocialLinks } from '@/components/option-two';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/inter';
import '@fontsource-variable/noto-naskh-arabic';
import '../globals.css';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/interactive';
import { nav } from '@/lib/content';
export default async function Layout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {
 const {locale}=await params; if(locale!=='en'&&locale!=='ar')notFound();
 return <html lang={locale} dir={locale==='ar'?'rtl':'ltr'}><body className="design-two"><a className="skip" href="#main">{locale==='ar'?'انتقل إلى المحتوى':'Skip to content'}</a><Header locale={locale}/>{locale==='ar'&&<div className="translation-note">النسخة العربية قيد الإعداد. يُعرض نص البريف الإنجليزي إلى حين اعتماد الترجمة.</div>}{children}<footer><div className="footer-main"><Link href={`/${locale}`}><img src="/brand/logo-light.png" alt="TOD — Human Systems" width="132" height="114"/></Link><p>Leadership.<br/>Organizations.<br/><span>Human Systems.</span></p><nav aria-label="Footer">{nav.map(([path,en,ar])=><Link key={path} href={`/${locale}/${path}`}>{locale==='ar'?ar:en}</Link>)}</nav></div><SocialLinks locale={locale}/><div className="footer-bottom"><span>© {new Date().getFullYear()} TOD Arabia</span><span>Total Organization Development</span><span>Saudi Arabia</span></div></footer></body></html>
}
