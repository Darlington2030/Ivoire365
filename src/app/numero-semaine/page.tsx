import type { Metadata } from "next";
import WeekNumberTool from "@/components/WeekNumberTool";
import AdSlot from "@/components/AdSlot";
import { jsonLdScriptProps, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Numéro de semaine · quelle semaine sommes-nous ?",
  description:
    "Trouvez le numéro de semaine ISO 8601 pour aujourd'hui ou pour n'importe quelle date en Côte d'Ivoire.",
  alternates: { canonical: "/numero-semaine" },
};

export default function WeekNumberPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Numéro de semaine", path: "/numero-semaine" },
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
      <script {...jsonLdScriptProps(breadcrumb)} />
      <h1 className="font-display text-3xl font-bold text-text-primary">
        Numéro de semaine
      </h1>
      <p className="text-text-secondary mt-2 max-w-xl">
        Trouvez le numéro de semaine ISO 8601 d'aujourd'hui ou de n'importe quelle date.
        Les semaines commencent le lundi ; la semaine 1 est celle qui contient le premier
        jeudi de l'année.
      </p>

      <div className="mt-6">
        <WeekNumberTool />
      </div>

      <div className="mt-8 no-print">
        <AdSlot variant="in-content" />
      </div>
    </div>
  );
}
