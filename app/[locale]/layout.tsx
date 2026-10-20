import "@fontsource-variable/source-serif-4";
import "@fontsource-variable/inter";
import "../globals.css";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header, Social } from "@/components/ui";
import { site, t, pageNames, pathFor } from "@/lib/content";
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") notFound();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="design-two">
        <a className="skip" href="#main">
          {locale === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}
        </a>
        <Header locale={locale} />
        {children}
        <footer className="site-footer">
          <div className="footer-top">
            <div className="footer-brand"><Link className="footer-logo" href={pathFor(locale)}>
              <img
                src={site.brandAssets.lightLogo}
                alt="TOD — Total Organization Development"
                width="174"
                height="120"
              />
            </Link>
            <p>
              {locale === "ar"
                ? "القيادة. المؤسسات."
                : "Leadership. Organizations."}
              <br />
              <span>Human Systems</span>
            </p>
            </div><nav
              aria-label={
                locale === "ar" ? "روابط التذييل" : "Footer navigation"
              }
            >
              {[
                "", "about", "approach",
                "associates", "services", "who-we-work-with",
                "library", "contact", "legal",
              ].map((p) => (
                <Link key={p} href={pathFor(locale, p)}>
                  {t(pageNames[p], locale)}
                </Link>
              ))}
            </nav>
          </div>
          <Social locale={locale} />
          <div className="footer-bottom">
            <span>
              © 2026 Total Organization Development.{" "}
              {locale === "ar"
                ? "الرياض، المملكة العربية السعودية"
                : "Riyadh, Kingdom of Saudi Arabia"}
            </span>
            <div>
              <Link href={pathFor(locale, "privacy")}>
                {t(pageNames.privacy, locale)}
              </Link>
              <Link href={pathFor(locale, "terms")}>
                {t(pageNames.terms, locale)}
              </Link>
              <Link href={pathFor(locale === "en" ? "ar" : "en")}>
                {locale === "en" ? "العربية" : "English"}
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
