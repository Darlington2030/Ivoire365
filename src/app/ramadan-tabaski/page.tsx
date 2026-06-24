import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, CircleDashed } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import AdSlot from "@/components/AdSlot";
import { getHolidayBySlug } from "@/lib/holidays";
import { jsonLdScriptProps, breadcrumbJsonLd } from "@/lib/seo";
import { formatLongDateFR } from "@/lib/date-utils";

export const metadata: Metadata = {
  title: "Ramadan, Korité et Tabaski 2026 en Côte d'Ivoire",
  description:
    "Dates du Ramadan, de la Nuit du Destin, de la Korité (Aïd el-Fitr), de la Tabaski (Aïd el-Adha) et du Maouloud en Côte d'Ivoire, avec le rappel sur l'observation du croissant lunaire.",
  alternates: { canonical: "/ramadan-tabaski" },
};

const RAMADAN_2026 = {
  start: "2026-02-18",
  end: "2026-03-19",
};

const RELATED_SLUGS = ["nuit-du-destin", "korite-aid-el-fitr", "tabaski-aid-el-kebir", "maouloud"];

export default function RamadanTabaskiPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Ramadan & Tabaski", path: "/ramadan-tabaski" },
  ]);

  const events = RELATED_SLUGS.map((slug) => getHolidayBySlug(slug)).filter(
    (h): h is NonNullable<typeof h> => h !== null
  );

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
      <script {...jsonLdScriptProps(breadcrumb)} />

      <h1 className="font-display text-3xl font-bold text-text-primary">
        Ramadan, Korité et Tabaski en Côte d'Ivoire
      </h1>
      <p className="text-text-secondary mt-2 max-w-xl">
        Les grandes dates du calendrier musulman en Côte d'Ivoire pour 2026, confirmées ou
        estimées selon l'observation du croissant lunaire par le COSIM et le CODISS.
      </p>

      <div className="mt-6 flex gap-3 rounded-lg border border-primary-200 bg-primary-50 p-4 text-sm text-primary-text">
        <AlertTriangle size={18} strokeWidth={1.5} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          Les dates des fêtes musulmanes dépendent de l'observation du croissant lunaire
          par le Conseil Supérieur des Imams, des Mosquées et des Affaires Islamiques
          (COSIM) et le Conseil Suprême des Imams, Organisations et Structures Sunnites
          (CODISS). Un écart d'un à deux jours par rapport aux dates indiquées ici reste
          possible jusqu'à la déclaration officielle.
        </p>
      </div>

      <section className="mt-8 rounded-xl border border-border bg-surface p-5">
        <h2 className="font-display text-lg font-semibold text-text-primary mb-1">
          Ramadan 2026
        </h2>
        <p className="text-text-primary capitalize">
          Du {formatLongDateFR(RAMADAN_2026.start)} au {formatLongDateFR(RAMADAN_2026.end)}
        </p>
        <p className="text-xs text-text-secondary mt-1">
          Confirmé par déclaration conjointe COSIM/CODISS (croissant observé à Korhogo et
          Bondoukou pour le début du jeûne).
        </p>
      </section>

      <section className="mt-6 space-y-4">
        {events.map((holiday) => {
          const confirmed = holiday.status === "confirmed";
          return (
            <div key={holiday.slug} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <Link
                  href={`/jours-feries/${holiday.slug}`}
                  className="font-display text-lg font-semibold text-text-primary transition-colors duration-base ease-default hover:text-primary-text"
                >
                  {holiday.name}
                </Link>
                <span className="text-sm text-text-secondary capitalize">
                  {formatLongDateFR(holiday.date)}
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-1 mt-2 text-xs rounded-full px-2 py-0.5 ${
                  confirmed
                    ? "bg-secondary-50 text-secondary-text"
                    : "bg-primary-50 text-primary-text"
                }`}
              >
                {confirmed ? (
                  <CheckCircle2 size={12} strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <CircleDashed size={12} strokeWidth={1.5} aria-hidden="true" />
                )}
                {confirmed ? "Confirmé" : "Estimé"}
              </span>
              <div className="mt-3">
                <CountdownTimer targetDate={holiday.date} variant="compact" />
              </div>
            </div>
          );
        })}
      </section>

      <div className="mt-8 no-print">
        <AdSlot variant="in-content" />
      </div>
    </div>
  );
}
