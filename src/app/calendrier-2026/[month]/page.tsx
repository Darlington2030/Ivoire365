import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CalendarGrid from "@/components/CalendarGrid";
import HolidayBadge from "@/components/HolidayBadge";
import AdSlot from "@/components/AdSlot";
import PrintButton from "@/components/PrintButton";
import { getYearData } from "@/lib/holidays";
import { jsonLdScriptProps, breadcrumbJsonLd } from "@/lib/seo";
import {
  allMonthSlugs,
  formatLongDateFR,
  monthIndexFromSlug,
  monthLabel,
  todayISO,
} from "@/lib/date-utils";

const YEAR = 2026;

export function generateStaticParams() {
  return allMonthSlugs().map((month) => ({ month }));
}

export function generateMetadata({
  params,
}: {
  params: { month: string };
}): Metadata {
  const monthIndex = monthIndexFromSlug(params.month);
  if (monthIndex === -1) return {};
  const label = monthLabel(monthIndex);
  return {
    title: `Calendrier ${label} ${YEAR} — Côte d'Ivoire`,
    description: `Calendrier du mois de ${label.toLowerCase()} ${YEAR} pour la Côte d'Ivoire, avec les jours fériés et numéros de semaine.`,
    alternates: { canonical: `/calendrier-${YEAR}/${params.month}` },
  };
}

export default function MonthPage({ params }: { params: { month: string } }) {
  const monthIndex = monthIndexFromSlug(params.month);
  if (monthIndex === -1) notFound();

  const yearData = getYearData(YEAR);
  if (!yearData) notFound();

  const today = todayISO();
  const monthHolidays = yearData.holidays.filter((h) => {
    const m = Number(h.date.slice(5, 7)) - 1;
    return m === monthIndex;
  });

  const label = monthLabel(monthIndex);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: `Calendrier ${YEAR}`, path: `/calendrier-${YEAR}` },
    { name: label, path: `/calendrier-${YEAR}/${params.month}` },
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
      <script {...jsonLdScriptProps(breadcrumb)} />

      <nav className="text-sm text-ci-gray mb-4 no-print">
        <Link href={`/calendrier-${YEAR}`} className="hover:text-ci-orange">
          ← Retour au calendrier {YEAR}
        </Link>
      </nav>

      <div className="flex flex-wrap items-end justify-between gap-4 no-print">
        <h1 className="font-display text-3xl font-bold text-ci-charcoal capitalize">
          {label} {YEAR}
        </h1>
        <PrintButton />
      </div>

      <div className="print-calendar mt-6 rounded-xl border border-ci-border bg-white p-6 sm:p-8 shadow-card max-w-md">
        <CalendarGrid
          year={YEAR}
          monthIndex={monthIndex}
          holidays={monthHolidays}
          todayISO={today}
          size="full"
        />
      </div>

      <section className="mt-8 no-print">
        <h2 className="font-display text-lg font-semibold text-ci-charcoal mb-3">
          Jours fériés en {label.toLowerCase()}
        </h2>
        {monthHolidays.length === 0 ? (
          <p className="text-ci-gray text-sm">Aucun jour férié ce mois-ci.</p>
        ) : (
          <ul className="space-y-3">
            {monthHolidays.map((h) => (
              <li key={h.slug}>
                <Link
                  href={`/jours-feries/${h.slug}`}
                  className="flex items-center justify-between rounded-lg border border-ci-border bg-white p-4 hover:border-ci-orange transition-colors"
                >
                  <div>
                    <p className="font-medium text-ci-charcoal">{h.name}</p>
                    <p className="text-sm text-ci-gray capitalize">
                      {formatLongDateFR(h.date)}
                    </p>
                  </div>
                  <HolidayBadge type={h.type} movable={h.movable} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-8 no-print">
        <AdSlot variant="in-content" />
      </div>
    </div>
  );
}
