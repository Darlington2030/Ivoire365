import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos d'Ivoire365",
  description:
    "Ivoire365 est un calendrier numérique gratuit dédié à la Côte d'Ivoire : jours fériés, vacances scolaires et outils de dates.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12 prose-sm">
      <h1 className="font-display text-3xl font-bold text-text-primary">À propos</h1>
      <p className="text-text-primary mt-4 leading-relaxed">
        Ivoire365 est un calendrier numérique gratuit conçu pour la Côte d'Ivoire. Notre
        objectif est de centraliser, dans un seul endroit simple et rapide, les
        informations qui comptent au quotidien : jours fériés, vacances scolaires, numéros
        de semaine, dates importantes du calendrier musulman, et outils pratiques de calcul
        de dates.
      </p>
      <p className="text-text-primary mt-4 leading-relaxed">
        Nous nous efforçons de vérifier chaque date auprès de sources officielles
        (Ministère de l'Emploi et de la Protection Sociale, Ministère de l'Éducation
        Nationale et de l'Alphabétisation, COSIM, CODISS, DECO). Lorsqu'une date dépend
        encore d'une confirmation officielle (en particulier les fêtes musulmanes mobiles),
        nous l'indiquons clairement plutôt que de présenter une estimation comme définitive.
      </p>
      <p className="text-text-primary mt-4 leading-relaxed">
        Ivoire365 n'est affilié à aucune administration ivoirienne. Pour toute démarche
        officielle, référez-vous toujours aux sources gouvernementales correspondantes.
      </p>
    </div>
  );
}
