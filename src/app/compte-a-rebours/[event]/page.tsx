import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CountdownTimer from "@/components/CountdownTimer";
import AdSlot from "@/components/AdSlot";
import { getAvailableYears, getHolidayBySlug, getYearData } from "@/lib/holidays";
import { jsonLdScriptProps, breadcrumbJsonLd } from "@/lib/seo";
import { formatLongDateFR } from "@/lib/date-utils";

export function generateStaticParams() {
  const slugs = new Set<string>();
  const all: string[] = [];
  for (const year of getAvailableYears()) {
    const data = getYearData(year);
    if (!data) continue;
    for (const h of data.holidays) {
      if (!slugs.has(h.slug)) {
        slugs.add(h.slug);
        all.push(h.slug);
      }
    }
  }
  return all.map((event) => ({ event }));
}

export function generateMetadata({
  params,
}: {
  params: { event: string };
}): Metadata {
  const holiday = getHolidayBySlug(params.event);
  if (!holiday) return {};
  return {
    title: `Compte à rebours · ${holiday.name}`,
    description: `Combien de jours avant ${holiday.name} en Côte d'Ivoire ? Compte à rebours en direct.`,
    alternates: { canonical: `/compte-a-rebours/${params.event}` },
  };
}

export default function CountdownEventPage({
  params,
}: {
  params: { event: string };
}) {
  const holiday = getHolidayBySlug(params.event);
  if (!holiday) notFound();

  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Compte à rebours", path: "/compte-a-rebours" },
    { name: holiday.name, path: `/compte-a-rebours/${params.event}` },
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-16 text-center">
      <script {...jsonLdScriptProps(breadcrumb)} />

      <p className="text-sm font-medium text-primary-text">Compte à rebours</p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mt-1">
        {holiday.name}
      </h1>
      <p className="text-text-secondary mt-2 capitalize">{formatLongDateFR(holiday.date)}</p>

      <div className="mt-8 flex justify-center">
        <CountdownTimer targetDate={holiday.date} />
      </div>

      <div className="mt-10 no-print">
        <AdSlot variant="in-content" />
      </div>
    </div>
  );
}
