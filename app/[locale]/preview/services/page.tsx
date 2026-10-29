import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicesExplorer } from "@/components/services-explorer";
export const metadata: Metadata = { title: "TOD | Services explorer preview", robots: { index: false, follow: false } };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "ar" && locale !== "en") notFound();
  return <ServicesExplorer locale={locale}/>;
}
