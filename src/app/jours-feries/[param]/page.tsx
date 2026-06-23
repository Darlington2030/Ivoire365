import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HolidayBadge from "@/components/HolidayBadge";
import CountdownTimer from "@/components/CountdownTimer";
import AdSlot from "@/components/AdSlot";
import {
  getAvailableYears,
  getHolidayAcrossYears,
  getHolidayBySlug,
  getYearData,
} from "@/lib/holidays";
import {
  holidayEventJsonLd,
  breadcrumbJsonLd,
  jsonLdScriptProps,
} from "@/lib/seo";
import { formatLongDateFR, daysBetween, todayISO } from "@/lib/date-utils";

// ---------------------------------------------------------------------------
// This single dynamic segment serves two different page types:
//   /jours-feries/2026                 -> year table  (param is 4 digits)
//   /jours-feries/fete-du-travail       -> holiday detail (param is a slug)
//
// Next.js requires every dynamic segment at the same position in the route
// tree to share one param name, so /jours-feries/[year] and
// /jours-feries/[slug] cannot coexist as separate folders — hence the merge
// here, with the two render paths dispatched on the shape of the value.
// ---------------------------------------------------------------------------

const YEAR_PATTERN = /^\d{4}$/;

function isYearParam(param: string): boolean {
  return YEAR_PATTERN.test(param);
}

export function generateStaticParams() {
  const params: Array<{ param: string }> = [];

  // Year-table params
  for (const year of getAvailableYears()) {
    params.push({ param: String(year) });
  }

  // Holiday-slug params
  const seenSlugs = new Set<string>();
  for (const year of getAvailableYears()) {
    const yearData = getYearData(year);
    if (!yearData) continue;
    for (const h of yearData.holidays) {
      if (!seenSlugs.has(h.slug)) {
        seenSlugs.add(h.slug);
        params.push({ param: h.slug });
      }
    }
  }

  return params;
}

export function generateMetadata({
  params,
}: {
  params: { param: string };
}): Metadata {
  if (isYearParam(params.param)) {
    const year = Number(params.param);
    return {
      title: `Jours fériés ${year} en Côte d'Ivoire — liste complète`,
      description: `Tous les jours fériés de l'année ${year} en Côte d'Ivoire : dates, types de fêtes, et explications. Mis à jour avec les confirmations officielles COSIM/CODISS pour les dates musulmanes.`,
      alternates: { canonical: `/jours-feries/${year}` },
    };
  }

  const holiday = getHolidayBySlug(params.param);
  if (!holiday) return {};
  return {
    title: `${holiday.name} — date, histoire et compte à rebours`,
    description: `Quand a lieu ${holiday.name} en Côte d'Ivoire ? Date exacte, origine de la fête, et jours restants avant la prochaine célébration.`,
    alternates: { canonical: `/jours-feries/${params.param}` },
  };
}

export default function JoursFeriesDynamicPage({
  params,
}: {
  params: { param: string };
}) {
  if (isYearParam(params.param)) {
    return <YearTableView year={Number(params.param)} />;
  }
  return <HolidayDetailView slug={params.param} />;
}

// ---------------------------------------------------------------------------
// Year table view — formerly /jours-feries/[year]/page.tsx
// ---------------------------------------------------------------------------
function YearTableView({ year }: { year: number }) {
  const yearData = getYearData(year);
  if (!yearData) notFound();

  const today = todayISO();
  const availableYears = getAvailableYears();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Jours fériés", path: "/jours-feries" },
    { name: String(year), path: `/jours-feries/${year}` },
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
      <script {...jsonLdScriptProps(breadcrumb)} />

      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-display text-3xl font-bold text-ci-charcoal">
          Jours fériés {year} en Côte d'Ivoire
        </h1>
        <div className="flex gap-2">
          {availableYears
            .filter((y) => y !== year)
            .map((y) => (
              <Link
                key={y}
                href={`/jours-feries/${y}`}
                className="text-sm rounded-full border border-ci-border px-3 py-2 text-ci-charcoal hover:border-ci-orange hover:text-ci-orange min-h-[44px] flex items-center"
              >
                {y}
              </Link>
            ))}
        </div>
      </div>

      <p className="text-ci-gray mt-2 max-w-2xl">
        {yearData.holidays.length} jours fériés sont prévus en {year}. Les dates des fêtes
        musulmanes (marquées 🌙) dépendent de l'observation du croissant lunaire et peuvent
        varier de 1 à 2 jours.
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-ci-border shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-ci-ivory text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-ci-charcoal">Date</th>
              <th className="px-4 py-3 font-semibold text-ci-charcoal">Fête</th>
              <th className="px-4 py-3 font-semibold text-ci-charcoal hidden sm:table-cell">Type</th>
              <th className="px-4 py-3 font-semibold text-ci-charcoal text-right">Statut</th>
            </tr>
          </thead>
          <tbody>
            {yearData.holidays.map((h) => {
              const diff = daysBetween(today, h.date);
              const statusLabel =
                diff === 0 ? "Aujourd'hui" : diff > 0 ? `dans ${diff} j` : "Passé";
              return (
                <tr key={h.slug} className="border-t border-ci-border bg-white hover:bg-ci-ivory/40">
                  <td className="px-4 py-3 whitespace-nowrap text-ci-charcoal capitalize">
                    {formatLongDateFR(h.date)}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/jours-feries/${h.slug}`}
                      className="font-medium text-ci-charcoal hover:text-ci-orange"
                    >
                      {h.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <HolidayBadge type={h.type} movable={h.movable} />
                  </td>
                  <td className="px-4 py-3 text-right text-ci-gray whitespace-nowrap">
                    {statusLabel}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {yearData.continuousDays.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-ci-charcoal mb-3">
            Journées continues {year}
          </h2>
          <p className="text-sm text-ci-gray mb-3">
            Ces journées ne sont pas des jours fériés, mais des journées à horaires aménagés.
          </p>
          <ul className="space-y-2">
            {yearData.continuousDays.map((cd) => (
              <li
                key={cd.date}
                className="flex justify-between rounded-lg border border-ci-border bg-white px-4 py-3 text-sm"
              >
                <span className="text-ci-charcoal">{cd.label}</span>
                <span className="text-ci-gray">
                  {formatLongDateFR(cd.date)}
                  {cd.hours ? ` · ${cd.hours}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-8 no-print">
        <AdSlot variant="in-content" />
      </div>

      <p className="mt-6 text-xs text-ci-gray">
        Dernière vérification : {yearData.lastVerified}.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Holiday detail view — formerly /jours-feries/[slug]/page.tsx
// ---------------------------------------------------------------------------
function HolidayDetailView({ slug }: { slug: string }) {
  const today = todayISO();
  const occurrences = getHolidayAcrossYears(slug);
  if (occurrences.length === 0) notFound();

  const upcoming = occurrences.find((o) => o.holiday.date >= today);
  const current = upcoming ?? occurrences[occurrences.length - 1];
  const { holiday } = current;

  const next = occurrences.find((o) => o.year > current.year);
  const diff = daysBetween(today, holiday.date);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Jours fériés", path: "/jours-feries" },
    { name: holiday.name, path: `/jours-feries/${slug}` },
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
      <script {...jsonLdScriptProps(breadcrumb)} />
      <script {...jsonLdScriptProps(holidayEventJsonLd(holiday))} />

      <nav className="text-sm text-ci-gray mb-4">
        <Link href="/jours-feries" className="hover:text-ci-orange">
          ← Tous les jours fériés
        </Link>
      </nav>

      <HolidayBadge type={holiday.type} movable={holiday.movable} size="md" />
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-ci-charcoal mt-3">
        {holiday.name}
      </h1>
      <p className="text-lg text-ci-gray mt-2 capitalize">
        {formatLongDateFR(holiday.date)} ({current.year})
      </p>

      <div className="mt-6">
        <CountdownTimer
          targetDate={holiday.date}
          label={diff >= 0 ? "Temps restant" : undefined}
        />
      </div>

      {holiday.disclaimer && (
        <div
          className="mt-6 rounded-lg border border-[#FFD9AD] bg-[#FFF3E6] p-4 text-sm"
          style={{ color: "var(--ci-orange-text)" }}
        >
          ⚠️ {holiday.disclaimer}
          {holiday.source && <p className="mt-1 text-xs opacity-90">{holiday.source}</p>}
        </div>
      )}

      <section className="mt-8 prose-sm">
        <h2 className="font-display text-xl font-semibold text-ci-charcoal mb-2">
          À propos de cette fête
        </h2>
        <p className="text-ci-charcoal leading-relaxed">{holiday.description}</p>
      </section>

      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-ci-border bg-white p-5">
          <p className="text-sm text-ci-gray">Cette année ({current.year})</p>
          <p className="font-display text-xl font-semibold text-ci-charcoal mt-1 capitalize">
            {formatLongDateFR(holiday.date)}
          </p>
        </div>
        <div className="rounded-lg border border-ci-border bg-white p-5">
          <p className="text-sm text-ci-gray">Année suivante</p>
          {next ? (
            <p className="font-display text-xl font-semibold text-ci-charcoal mt-1 capitalize">
              {formatLongDateFR(next.holiday.date)}
            </p>
          ) : (
            <p className="text-ci-gray mt-1 text-sm">
              Donnée non encore disponible — revenez plus tard.
            </p>
          )}
        </div>
      </section>

      {holiday.dayObserved && (
        <p className="mt-6 text-sm text-ci-gray">
          <strong className="text-ci-charcoal">Note sur l'observation : </strong>
          {holiday.dayObserved.note}
        </p>
      )}

      <div className="mt-10 no-print">
        <AdSlot variant="in-content" />
      </div>
    </div>
  );
}
