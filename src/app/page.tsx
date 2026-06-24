import Link from "next/link";
import type { Metadata } from "next";
import { CalendarDays, Search, Calculator, Moon } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import HolidayBadge, { isNationalHoliday } from "@/components/HolidayBadge";
import AdSlot from "@/components/AdSlot";
import { getNextUpcomingHolidays } from "@/lib/holidays";
import { formatLongDateFR, isoWeekNumber, parseISO, todayISO } from "@/lib/date-utils";

export const metadata: Metadata = {
  title: "Ivoire365 · Calendrier et jours fériés de Côte d'Ivoire",
  description:
    "La date d'aujourd'hui, le numéro de semaine en cours et les prochains jours fériés en Côte d'Ivoire, avec compte à rebours.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const today = todayISO();
  const weekNum = isoWeekNumber(parseISO(today));
  const upcoming = getNextUpcomingHolidays(today, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <section className="text-center sm:text-left">
        <p className="text-sm font-medium text-primary-text">Aujourd'hui</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mt-1 capitalize">
          {formatLongDateFR(today)}
        </h1>
        <p className="text-text-secondary mt-2">Nous sommes en semaine n° {weekNum}.</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-text-primary mb-4">
          Prochains jours fériés
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {upcoming.map((holiday) => (
            <Link
              key={holiday.slug + holiday.date}
              href={`/jours-feries/${holiday.slug}`}
              className="rounded-xl border border-border bg-surface p-5 shadow-sm transition-shadow duration-base ease-default hover:shadow-md"
            >
              <HolidayBadge
                type={holiday.type}
                movable={holiday.movable}
                national={isNationalHoliday(holiday.slug)}
              />
              <p className="font-display font-semibold text-text-primary mt-3">{holiday.name}</p>
              <p className="text-sm text-text-secondary mt-1 capitalize">
                {formatLongDateFR(holiday.date)}
              </p>
              <div className="mt-3">
                <CountdownTimer targetDate={holiday.date} variant="compact" />
              </div>
            </Link>
          ))}
        </div>
        {upcoming.length === 0 && (
          <p className="text-text-secondary">
            Aucune date à venir dans les données actuellement disponibles.
          </p>
        )}
      </section>

      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Calendrier complet
          </h2>
          <p className="text-sm text-text-secondary mt-1 mb-4">
            Consultez et imprimez le calendrier annuel avec les numéros de semaine.
          </p>
          <Link
            href="/calendrier-2026"
            className="inline-flex items-center gap-2 justify-center min-h-[44px] rounded-md bg-primary-600 px-5 text-sm font-semibold text-white shadow-primary transition-all duration-base ease-default hover:bg-primary-700 hover:shadow-md hover:-translate-y-px"
          >
            <CalendarDays size={16} strokeWidth={1.5} aria-hidden="true" />
            Voir le calendrier 2026
          </Link>
        </div>
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-text-primary">Outils rapides</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/numero-semaine"
                className="flex items-center gap-2 text-text-primary transition-colors duration-base ease-default hover:text-primary-text"
              >
                <Search size={16} strokeWidth={1.5} className="text-text-muted" aria-hidden="true" />
                Trouver un numéro de semaine
              </Link>
            </li>
            <li>
              <Link
                href="/calculateur-de-dates"
                className="flex items-center gap-2 text-text-primary transition-colors duration-base ease-default hover:text-primary-text"
              >
                <Calculator size={16} strokeWidth={1.5} className="text-text-muted" aria-hidden="true" />
                Calculer une différence de dates ou un âge
              </Link>
            </li>
            <li>
              <Link
                href="/ramadan-tabaski"
                className="flex items-center gap-2 text-text-primary transition-colors duration-base ease-default hover:text-primary-text"
              >
                <Moon size={16} strokeWidth={1.5} className="text-text-muted" aria-hidden="true" />
                Dates du Ramadan et de la Tabaski
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <div className="mt-10 no-print">
        <AdSlot variant="in-content" />
      </div>
    </div>
  );
}
