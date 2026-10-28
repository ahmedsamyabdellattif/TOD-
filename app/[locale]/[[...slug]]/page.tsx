import team from "@/content/team.json";
import { TeamPreview } from "@/components/team-preview/team-preview";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";
import {
  Home,
  About,
  Approach,
  Services,
  ExperiencePage,
  AssociatesPage,
  LibraryPage,
  ContactPage,
  PageHead,
  ImageSlot,
  Closing,
} from "@/components/pages";
import { ArticleShare, ArticleCard } from "@/components/ui";
import {
  pageNames,
  metadataCopy,
  site,
  articles,
  associates,
  categories,
  t,
  pathFor,
  type Locale,
} from "@/lib/content";
type Props = { params: Promise<{ locale: string; slug?: string[] }> };
export function generateStaticParams() {
  return ["en", "ar"].flatMap((locale) =>
    [
      ...Object.keys(pageNames),
      ...articles.map((a) => "library/" + a.slug),
      ...Array.from(new Set([...associates, ...team].map((a) => "associates/" + a.slug))),
    ].map((p) => ({ locale, slug: p ? p.split("/") : [] })),
  );
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  const l: Locale = locale === "ar" ? "ar" : "en";
  const path = slug.join("/");
  const article = articles.find((a) => path === "library/" + a.slug);
  const teamPerson = team.find((a) => path === "associates/" + a.slug);
  const person = associates.find((a) => path === "associates/" + a.slug);
  const title = article
    ? t(article.title, l) + " | TOD"
    : teamPerson
      ? t(teamPerson.name, l) + " | TOD"
      : person
      ? t(person.name, l) + " | TOD"
      : metadataCopy[path]
        ? t(metadataCopy[path].title, l)
        : pageNames[path]
          ? t(pageNames[path], l) + " | TOD"
          : "TOD";
  const description = article
    ? t(article.summary, l)
    : teamPerson
      ? t(teamPerson.statement, l)
      : person
      ? t(person.bio, l)
      : metadataCopy[path]
        ? t(metadataCopy[path].description, l)
        : title;
  return {
    metadataBase: new URL(process.env.SITE_URL || "https://todarabia.com"),
    title,
    description,
    alternates: {
      canonical: pathFor(l, path),
      languages: {
        en: pathFor("en", path),
        ar: pathFor("ar", path),
        "x-default": pathFor("en", path),
      },
    },
    robots: { index: process.env.SITE_INDEXABLE === "true", follow: true },
    openGraph: {
      title,
      description,
      url: pathFor(l, path),
      siteName: "TOD",
      type: article ? "article" : "website",
      locale: l === "ar" ? "ar_SA" : "en_US",
      images: [
        {
          url: "/social-preview.png",
          width: 1200,
          height: 630,
          alt: "TOD — Human Systems",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/social-preview.png"],
    },
  };
}
export default async function Page({ params }: Props) {
  const { locale, slug = [] } = await params;
  if (locale !== "en" && locale !== "ar") notFound();
  const l: Locale = locale;
  const p = slug.join("/");
  if (p === "our-thinking") redirect(pathFor(l, "library"));
  const old: Record<string, string> = {
    "services/organisation-transformation": "systems-transformation",
    "services/leadership-coaching-mentoring": "leadership-coaching-mentoring",
    "services/learning-capability": "capability-workshops",
  };
  if (old[p]) redirect(pathFor(l, "services") + "#" + old[p]);
  const teamPerson = team.find((a) => p === "associates/" + a.slug);
  if (p === "associates" || teamPerson) return <TeamPreview locale={l} person={teamPerson} preview={false} />;
  const pages: Record<string, React.ReactNode> = {
    "": <Home locale={l} />,
    about: <About locale={l} />,
    approach: <Approach locale={l} />,
    services: <Services locale={l} />,
    "who-we-work-with": <ExperiencePage locale={l} />,
    associates: <AssociatesPage locale={l} />,
    library: <LibraryPage locale={l} />,
    contact: <ContactPage locale={l} />,
  };
  if (pages[p]) return <main id="main">{pages[p]}</main>;
  if (p === "legal") return <main id="main"><PageHead locale={l} title={t(pageNames.legal,l)}/><section className="section"><nav className="container legal-links" aria-label={t(pageNames.legal,l)}>{["privacy","terms"].map(key=><Link className="text-link" key={key} href={pathFor(l,key)}>{t(pageNames[key],l)} ↗</Link>)}</nav><div className="container"><ImageSlot page="legal" locale={l}/></div></section></main>;
  if (p === "privacy" || p === "terms")
    return (
      <main id="main">
        <PageHead locale={l} title={t(pageNames[p], l)} />
        <section className="section">
          <div className="container prose legal">
            <Markdown>{t(site[p], l)}</Markdown>
            {p === "privacy" && (
              <>
                <h2>
                  {l === "ar" ? "إشعار ملفات تعريف الارتباط" : "Cookie notice"}
                </h2>
                <Markdown>{t(site.cookieNotice, l)}</Markdown>
              </>
            )}
          </div>
        </section>
      </main>
    );
  const article = articles.find((a) => p === "library/" + a.slug);
  if (article) {
    const author = associates.find((a) => a.slug === article.author);
    const related = articles
      .filter(
        (a) =>
          a.slug !== article.slug &&
          ((article.related || []).includes(a.slug) ||
            a.category === article.category),
      )
      .slice(0, 3);
    const minutes = Math.max(
      1,
      Math.ceil(t(article.body, l).split(/\s+/).length / 200),
    );
    return (
      <main id="main">
        <PageHead
          locale={l}
          title={t(article.title, l)}
          eyebrow={t(categories[article.category] || categories[0], l)}
          description={t(article.summary, l)}
        />
        <article className="section">
          <div className="container article-body">
            <div className="article-meta">
              <time dateTime={article.date}>
                {new Intl.DateTimeFormat(l === "ar" ? "ar-SA" : "en-US", {
                  dateStyle: "long",
                  calendar: "gregory",
                }).format(new Date(article.date))}
              </time>
              <span>
                {minutes} {l === "ar" ? "دقائق قراءة" : "min read"}
              </span>
              {author && (
                <Link href={pathFor(l, "associates/" + author.slug)}>
                  {t(author.name, l)}
                </Link>
              )}
            </div>
            {article.image && (
              <img
                className="article-image"
                src={article.image}
                alt={t(article.imageAlt, l)}
                width="1600"
                height="1000"
              />
            )}
            <div className="prose">
              <Markdown>{t(article.body, l)}</Markdown>
            </div>
            <ArticleShare locale={l} />
          </div>
        </article>
        {related.length > 0 && (
          <section className="section beige">
            <div className="container">
              <h2>{l === "ar" ? "مقالات ذات صلة" : "Related articles"}</h2>
              <div className="article-grid">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} locale={l} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    );
  }
  const person = associates.find((a) => p === "associates/" + a.slug);
  if (person)
    return (
      <main id="main">
        <PageHead
          locale={l}
          title={t(person.name, l)}
          description={t(person.title, l)}
        />
        <section className="section">
          <div className="container profile-layout">
            {person.photo && (
              <img
                src={person.photo}
                alt={t(person.name, l)}
                width="600"
                height="750"
              />
            )}
            <div>
              <div className="prose">
                <Markdown>{t(person.bio, l)}</Markdown>
              </div>
              {(
                ["expertise", "sectors", "qualifications", "languages"] as const
              ).map((key, i) => (
                <div key={key}>
                  <h2>
                    {
                      (l === "ar"
                        ? [
                            "مجالات الخبرة",
                            "القطاعات والخبرات",
                            "المؤهلات والاعتمادات",
                            "اللغات",
                          ]
                        : [
                            "Areas of expertise",
                            "Sectors and experience",
                            "Qualifications and accreditations",
                            "Languages",
                          ])[i]
                    }
                  </h2>
                  <ul>
                    {person[key].map((x, j) => (
                      <li key={j}>{t(x, l)}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {person.linkedin && (
                <a
                  className="text-link"
                  href={person.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>
        </section>
        <Closing locale={l} />
      </main>
    );
  notFound();
}
