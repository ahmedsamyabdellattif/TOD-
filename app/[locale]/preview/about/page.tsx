import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { About } from "@/components/pages";
export const metadata: Metadata = { title: "TOD | About layout preview", robots: { index: false, follow: false } };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "ar" && locale !== "en") notFound();
  return <main id="main"><About locale={locale} purposeFirst /></main>;
}
