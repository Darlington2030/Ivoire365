import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import { getAvailableSchoolYears, getSchoolYearData } from "@/lib/school-holidays";
import { jsonLdScriptProps, breadcrumbJsonLd } from "@/lib/seo";
import { formatLongDateFR } from "@/lib/date-utils";

export function generateStaticParams() {
  return getAvailableSchoolYears().map((year) => ({ year }));
}

export function generateMetadata({
  params,
}: {
  params: { year: string };
}): Metadata {
  return {
    title: `Vacances scolaires ${params.year} en Côte d'Ivoire`,
    description: `Calendrier officiel des congés et vacances scolaires pour l'année ${params.year} en Côte d'Ivoire, publié par le Ministère de l'Éducation Nationale et de l'Alphabétisation (MENA).`,
    alternates: { canonical: `/vacances-scolaires/${params.year}` },
  };
}

export default function VacancesScolairesYearPage({
  params,
}: {
  params: { year: string };
}) {
  const data = getSchoolYearData(params.year);
  if (!data) notFound();

  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Vacances scolaires", path: "/vacances-scolaires" },
    { name: data.schoolYear, path: `/vacances-scolaires/${data.schoolYear}` },
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
      <script {...jsonLdScriptProps(breadcrumb)} />

      <h1 className="font-display text-3xl font-bold text-ci-charcoal">
        Vacances scolaires {data.schoolYear}
      </h1>
      <p className="text-ci-gray mt-2 max-w-xl">
        Année scolaire du {formatLongDateFR(data.startDate)} au{" "}
        {formatLongDateFR(data.endDate)}.
      </p>
      {data.source && (
        <p className="text-xs text-ci-gray mt-1">Source : {data.source}</p>
      )}

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-ci-charcoal mb-3">
          Trimestres
        </h2>
        <ul className="space-y-2">
          {data.terms.map((term) => (
            <li
              key={term.label}
              className="flex justify-between rounded-lg border border-ci-border bg-white px-4 py-3 text-sm"
            >
              <span className="font-medium text-ci-charcoal">{term.label}</span>
              <span className="text-ci-gray capitalize">
                {formatLongDateFR(term.startDate)} → {formatLongDateFR(term.endDate)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-ci-charcoal mb-3">
          Congés et vacances
        </h2>
        <ul className="space-y-2">
          {data.breaks.map((b) => (
            <li
              key={b.label}
              className="rounded-lg border border-ci-border bg-white px-4 py-3 text-sm"
            >
              <div className="flex justify-between flex-wrap gap-2">
                <span className="font-medium text-ci-charcoal">{b.label}</span>
                <span className="text-ci-gray capitalize">
                  {formatLongDateFR(b.startDate)} → {formatLongDateFR(b.endDate)}
                </span>
              </div>
              {b.status === "provisional" && (
                <p className="text-xs mt-1" style={{ color: "var(--ci-orange-text)" }}>
                  Provisoire — à confirmer
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-6 text-xs text-ci-gray">
        Dernière vérification : {data.lastVerified}. Vérifiez auprès du Ministère de
        l'Éducation Nationale et de l'Alphabétisation pour toute mise à jour officielle.
      </p>

      <div className="mt-8 no-print">
        <AdSlot variant="in-content" />
      </div>
    </div>
  );
}
