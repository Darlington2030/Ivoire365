import Link from "next/link";
import type { Metadata } from "next";
import CountdownTimer from "@/components/CountdownTimer";
import HolidayBadge from "@/components/HolidayBadge";
import AdSlot from "@/components/AdSlot";
import { getNextUpcomingHolidays } from "@/lib/holidays";
import {
  formatLongDateFR,
  isoWeekNumber,
  parseISO,
  todayISO,
} from "@/lib/date-utils";

export const metadata: Metadata = {
  title: "Ivoire365 — Calendrier et jours fériés de Côte d'Ivoire",
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
        <p className="text-sm font-medium" style={{ color: "var(--ci-orange-text)" }}>
          Aujourd'hui
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ci-charcoal mt-1 capitalize">
          {formatLongDateFR(today)}
        </h1>
        <p className="text-ci-gray mt-2">Nous sommes en semaine n° {weekNum}.</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-ci-charcoal mb-4">
          Prochains jours fériés
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {upcoming.map((holiday) => (
            <Link
              key={holiday.slug + holiday.date}
              href={`/jours-feries/${holiday.slug}`}
              className="rounded-xl border border-ci-border bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <HolidayBadge type={holiday.type} movable={holiday.movable} />
              <p className="font-display font-semibold text-ci-charcoal mt-3">
                {holiday.name}
              </p>
              <p className="text-sm text-ci-gray mt-1 capitalize">
                {formatLongDateFR(holiday.date)}
              </p>
              <div className="mt-3">
                <CountdownTimer targetDate={holiday.date} variant="compact" />
              </div>
            </Link>
          ))}
        </div>
        {upcoming.length === 0 && (
          <p className="text-ci-gray">
            Aucune date à venir dans les données actuellement disponibles.
          </p>
        )}
      </section>

      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-xl border border-ci-border bg-white p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold text-ci-charcoal">
            Calendrier complet
          </h2>
          <p className="text-sm text-ci-gray mt-1 mb-4">
            Consultez et imprimez le calendrier annuel avec les numéros de semaine.
          </p>
          <Link
            href="/calendrier-2026"
            className="inline-flex items-center justify-center min-h-[44px] rounded-lg bg-ci-orange px-5 text-sm font-semibold text-white hover:bg-ci-orange-dark transition-colors"
          >
            Voir le calendrier 2026
          </Link>
        </div>
        <div className="rounded-xl border border-ci-border bg-white p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold text-ci-charcoal">
            Outils rapides
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/numero-semaine" className="text-ci-charcoal hover:text-ci-orange underline-offset-2 hover:underline">
                Trouver un numéro de semaine
              </Link>
            </li>
            <li>
              <Link href="/calculateur-de-dates" className="text-ci-charcoal hover:text-ci-orange underline-offset-2 hover:underline">
                Calculer une différence de dates / un âge
              </Link>
            </li>
            <li>
              <Link href="/ramadan-tabaski" className="text-ci-charcoal hover:text-ci-orange underline-offset-2 hover:underline">
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
