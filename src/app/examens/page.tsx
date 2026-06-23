import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import { getAvailableExamYears, getExamYearData } from "@/lib/exams";
import { jsonLdScriptProps, breadcrumbJsonLd } from "@/lib/seo";
import { formatLongDateFR } from "@/lib/date-utils";

export const metadata: Metadata = {
  title: "Examens et concours en Côte d'Ivoire 2026",
  description:
    "Dates du CEPE, du BEPC, du BAC et des concours de la fonction publique en Côte d'Ivoire, selon le calendrier officiel de la DECO.",
  alternates: { canonical: "/examens" },
};

export default function ExamensPage() {
  const years = getAvailableExamYears();
  const year = years[years.length - 1];
  const data = getExamYearData(year);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Examens", path: "/examens" },
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
      <script {...jsonLdScriptProps(breadcrumb)} />

      <h1 className="font-display text-3xl font-bold text-ci-charcoal">
        Examens et concours {year}
      </h1>
      <p className="text-ci-gray mt-2 max-w-xl">
        Dates des examens à grand tirage (CEPE, BEPC, BAC) selon le calendrier de la
        Direction des Examens et Concours (DECO).
      </p>

      <div className="mt-6 space-y-4">
        {data?.exams.map((exam) => (
          <div key={exam.name} className="rounded-xl border border-ci-border bg-white p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-lg font-semibold text-ci-charcoal">
                {exam.name} — {exam.fullName}
              </h2>
              <span
                className="text-xs rounded-full px-2 py-0.5"
                style={{
                  color:
                    exam.status === "confirmed"
                      ? "var(--ci-green-text)"
                      : "var(--ci-orange-text)",
                  backgroundColor:
                    exam.status === "confirmed" ? "#F0F6F2" : "#FFF3E6",
                }}
              >
                {exam.status === "confirmed"
                  ? "Confirmé"
                  : exam.status === "estimated"
                    ? "Estimé"
                    : "Non annoncé"}
              </span>
            </div>
            {exam.startDate && (
              <p className="text-sm text-ci-charcoal mt-1 capitalize">
                {exam.startDate === exam.endDate
                  ? formatLongDateFR(exam.startDate)
                  : `Du ${formatLongDateFR(exam.startDate)} au ${formatLongDateFR(exam.endDate as string)}`}
              </p>
            )}
            <p className="text-sm text-ci-gray mt-2">{exam.description}</p>
            {exam.source && (
              <p className="text-xs text-ci-gray mt-2">Source : {exam.source}</p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-ci-gray">
        Dernière vérification : {data?.lastVerified}. Pour les concours dont les dates ne
        sont pas encore annoncées, consultez le site du Ministère de la Fonction Publique
        ou de la DECO (men-deco.org) avant de planifier.
      </p>

      <div className="mt-8 no-print">
        <AdSlot variant="in-content" />
      </div>
    </div>
  );
}
