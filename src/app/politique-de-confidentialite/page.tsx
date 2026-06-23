import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du site Ivoire365.ci.",
  alternates: { canonical: "/politique-de-confidentialite" },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12 prose-sm">
      <h1 className="font-display text-3xl font-bold text-ci-charcoal">
        Politique de confidentialité
      </h1>

      <h2 className="font-display text-lg font-semibold text-ci-charcoal mt-6">
        Données collectées
      </h2>
      <p className="text-ci-charcoal mt-2 leading-relaxed">
        Ivoire365.ci ne demande aucune inscription pour accéder à ses outils (calendrier,
        jours fériés, calculateur de dates, etc.). Les seules données traitées sont des
        données techniques standards de navigation (type de navigateur, pages visitées) à
        des fins de mesure d'audience.
      </p>

      <h2 className="font-display text-lg font-semibold text-ci-charcoal mt-6">Cookies</h2>
      <p className="text-ci-charcoal mt-2 leading-relaxed">
        Le site peut utiliser des cookies techniques nécessaires à son fonctionnement, ainsi
        que des cookies de mesure d'audience et, le cas échéant, des cookies publicitaires
        une fois un partenaire publicitaire intégré. Vous pouvez configurer votre
        navigateur pour refuser les cookies non essentiels.
      </p>

      <h2 className="font-display text-lg font-semibold text-ci-charcoal mt-6">
        Publicité
      </h2>
      <p className="text-ci-charcoal mt-2 leading-relaxed">
        Ivoire365.ci se réserve le droit d'afficher des espaces publicitaires fournis par
        des réseaux tiers (par exemple Google AdSense). Ces réseaux peuvent utiliser des
        cookies pour personnaliser les annonces affichées, conformément à leurs propres
        politiques de confidentialité.
      </p>

      <h2 className="font-display text-lg font-semibold text-ci-charcoal mt-6">Contact</h2>
      <p className="text-ci-charcoal mt-2 leading-relaxed">
        Pour toute question relative à cette politique, contactez-nous à
        contact@ivoire365.ci.
      </p>
    </div>
  );
}
