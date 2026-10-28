import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamPreview } from "@/components/team-preview/team-preview";
import people from "@/content/team.json";

export const metadata: Metadata = {
  title: "TOD | Team design preview",
  robots: { index: false, follow: false },
};

export default async function Page({ params }: {
  params: Promise<{ locale: string; profile?: string[] }>;
}) {
  const { locale, profile = [] } = await params;
  if (locale !== "ar" && locale !== "en") notFound();
  if (profile.length > 1) notFound();
  const person = profile.length ? people.find(p => p.slug === profile[0]) : undefined;
  if (profile.length && !person) notFound();
  return <TeamPreview locale={locale} person={person} />;
}
