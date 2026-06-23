import type { Metadata } from "next";
import DateCalculator from "@/components/DateCalculator";
import AdSlot from "@/components/AdSlot";
import { jsonLdScriptProps, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Calculateur de dates — différence, ajout et âge",
  description:
    "Calculez le nombre de jours entre deux dates, ajoutez ou soustrayez des jours à une date, ou calculez un âge précis.",
  alternates: { canonical: "/calculateur-de-dates" },
};

export default function DateCalculatorPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Calculateur de dates", path: "/calculateur-de-dates" },
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
      <script {...jsonLdScriptProps(breadcrumb)} />
      <h1 className="font-display text-3xl font-bold text-ci-charcoal">
        Calculateur de dates
      </h1>
      <p className="text-ci-gray mt-2 max-w-xl">
        Calculez une différence entre deux dates, ajoutez ou soustrayez des jours, ou
        trouvez un âge exact en années, mois et jours.
      </p>

      <div className="mt-6">
        <DateCalculator />
      </div>

      <div className="mt-8 no-print">
        <AdSlot variant="in-content" />
      </div>
    </div>
  );
}
