import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, CalendarCheck } from "lucide-react";
import CalendarGrid from "@/components/CalendarGrid";
import HolidayBadge, { isNationalHoliday } from "@/components/HolidayBadge";
import AdSlot from "@/components/AdSlot";
import PrintButton from "@/components/PrintButton";
import { getYearData } from "@/lib/holidays";
import { jsonLdScriptProps, breadcrumbJsonLd } from "@/lib/seo";
import {
  allMonthSlugs,
  formatLongDateFR,
  monthIndexFromSlug,
  monthLabel,
  monthSlug,
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
    title: `Calendrier ${label} ${YEAR} · Côte d'Ivoire`,
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

  // Prev/next stay within the seeded year's 12 months — there is no
  // /calendrier-2027 route yet, so December has no "next" and January has
  // no "previous" (see README for adding a new year of calendar pages).
  const hasPrev = monthIndex > 0;
  const hasNext = monthIndex < 11;
  const todayMonthIndex = Number(today.slice(5, 7)) - 1;
  const isCurrentMonth = today.slice(0, 4) === String(YEAR) && todayMonthIndex === monthIndex;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
      <script {...jsonLdScriptProps(breadcrumb)} />

      <nav className="text-sm text-text-secondary mb-4 no-print">
        <Link
          href={`/calendrier-${YEAR}`}
          className="inline-flex items-center gap-1.5 hover:text-primary-text transition-colors duration-base ease-default"
        >
          <ChevronLeft size={16} strokeWidth={1.5} aria-hidden="true" />
          Calendrier {YEAR}
        </Link>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4 no-print">
        <h1 className="font-display text-3xl font-bold text-text-primary capitalize">
          {label} {YEAR}
        </h1>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border border-border-strong overflow-hidden">
            {hasPrev ? (
              <Link
                href={`/calendrier-${YEAR}/${monthSlug(monthIndex - 1)}`}
                aria-label="Mois précédent"
                className="flex items-center justify-center h-11 w-11 text-text-secondary transition-colors duration-base ease-default hover:bg-surface-raised hover:text-text-primary"
              >
                <ChevronLeft size={18} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            ) : (
              <span
                aria-hidden="true"
                className="flex items-center justify-center h-11 w-11 text-text-muted/50"
              >
                <ChevronLeft size={18} strokeWidth={1.5} />
              </span>
            )}
            <span className="w-px h-6 bg-border" aria-hidden="true" />
            {hasNext ? (
              <Link
                href={`/calendrier-${YEAR}/${monthSlug(monthIndex + 1)}`}
                aria-label="Mois suivant"
                className="flex items-center justify-center h-11 w-11 text-text-secondary transition-colors duration-base ease-default hover:bg-surface-raised hover:text-text-primary"
              >
                <ChevronRight size={18} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            ) : (
              <span
                aria-hidden="true"
                className="flex items-center justify-center h-11 w-11 text-text-muted/50"
              >
                <ChevronRight size={18} strokeWidth={1.5} />
              </span>
            )}
          </div>

          {!isCurrentMonth && today.slice(0, 4) === String(YEAR) && (
            <Link
              href={`/calendrier-${YEAR}/${monthSlug(todayMonthIndex)}`}
              className="inline-flex items-center gap-2 justify-center h-11 rounded-md border border-border-strong bg-surface px-4 text-sm font-medium text-text-primary transition-colors duration-base ease-default hover:border-primary-500 hover:text-primary-text"
            >
              <CalendarCheck size={16} strokeWidth={1.5} aria-hidden="true" />
              Aujourd'hui
            </Link>
          )}

          <PrintButton />
        </div>
      </div>

      <div className="print-calendar mt-6 rounded-xl border border-border bg-surface p-6 sm:p-8 shadow-sm max-w-md">
        <CalendarGrid
          year={YEAR}
          monthIndex={monthIndex}
          holidays={monthHolidays}
          todayISO={today}
          size="full"
        />
      </div>

      <section className="mt-8 no-print">
        <h2 className="font-display text-lg font-semibold text-text-primary mb-3">
          Jours fériés en {label.toLowerCase()}
        </h2>
        {monthHolidays.length === 0 ? (
          <p className="text-text-secondary text-sm">Aucun jour férié ce mois-ci.</p>
        ) : (
          <ul className="space-y-3">
            {monthHolidays.map((h) => (
              <li key={h.slug}>
                <Link
                  href={`/jours-feries/${h.slug}`}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface p-4 transition-colors duration-base ease-default hover:border-primary-500"
                >
                  <div>
                    <p className="font-medium text-text-primary">{h.name}</p>
                    <p className="text-sm text-text-secondary capitalize">
                      {formatLongDateFR(h.date)}
                    </p>
                  </div>
                  <HolidayBadge type={h.type} movable={h.movable} national={isNationalHoliday(h.slug)} />
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
