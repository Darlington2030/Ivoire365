import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck } from "lucide-react";
import CalendarGrid from "@/components/CalendarGrid";
import AdSlot from "@/components/AdSlot";
import PrintButton from "@/components/PrintButton";
import { getYearData } from "@/lib/holidays";
import { jsonLdScriptProps, breadcrumbJsonLd } from "@/lib/seo";
import { todayISO, monthSlug } from "@/lib/date-utils";

export function generateStaticParams() {
  // Currently only 2026 is seeded; this pattern lets future years register
  // themselves automatically once added to the holidays registry, but the
  // route folder name itself is fixed to "calendrier-2026" per the brief's
  // v1 scope. See README for how to add a /calendrier-2027 route.
  return [];
}

export const metadata: Metadata = {
  title: "Calendrier 2026 Côte d'Ivoire · jours fériés et semaines",
  description:
    "Calendrier complet de l'année 2026 pour la Côte d'Ivoire : les 12 mois, les numéros de semaine ISO 8601 et tous les jours fériés mis en évidence. Version imprimable.",
  alternates: { canonical: "/calendrier-2026" },
};

export default function Calendar2026Page() {
  const year = 2026;
  const yearData = getYearData(year);
  if (!yearData) notFound();

  const today = todayISO();
  const todayMonthIndex = Number(today.slice(5, 7)) - 1;
  const isCurrentYear = today.slice(0, 4) === String(year);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: `Calendrier ${year}`, path: `/calendrier-${year}` },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <script {...jsonLdScriptProps(breadcrumb)} />

      <div className="flex flex-wrap items-end justify-between gap-4 no-print">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-primary">
            Calendrier {year} Côte d'Ivoire
          </h1>
          <p className="text-text-secondary mt-2 max-w-2xl">
            Les 12 mois de l'année avec les numéros de semaine et les jours fériés en
            surbrillance. Les fêtes mobiles (Ramadan, Tabaski, Maouloud) sont signalées,
            voir la page{" "}
            <Link href="/jours-feries" className="underline hover:text-primary-text">
              jours fériés
            </Link>{" "}
            pour le détail de chaque date.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isCurrentYear && (
            <Link
              href={`/calendrier-${year}/${monthSlug(todayMonthIndex)}`}
              className="inline-flex items-center gap-2 justify-center min-h-[44px] rounded-md border border-border-strong bg-surface px-4 text-sm font-medium text-text-primary transition-colors duration-base ease-default hover:border-primary-500 hover:text-primary-text"
            >
              <CalendarCheck size={16} strokeWidth={1.5} aria-hidden="true" />
              Aujourd'hui
            </Link>
          )}
          <PrintButton />
        </div>
      </div>

      <div className="print-calendar mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 rounded-xl border border-border bg-surface p-5 sm:p-8 shadow-sm">
        {Array.from({ length: 12 }, (_, monthIndex) => (
          <CalendarGrid
            key={monthIndex}
            year={year}
            monthIndex={monthIndex}
            holidays={yearData.holidays}
            todayISO={today}
            linkToMonth
            size="compact"
          />
        ))}
      </div>

      <div className="mt-8 no-print">
        <AdSlot variant="in-content" />
      </div>

      <p className="mt-6 text-xs text-text-muted no-print">
        Dernière vérification des données : {yearData.lastVerified}. Les dates des fêtes
        musulmanes mobiles peuvent varier de 1 à 2 jours selon l'observation officielle du
        croissant lunaire.
      </p>
    </div>
  );
}
