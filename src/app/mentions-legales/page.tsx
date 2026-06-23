import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Ivoire365.ci.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12 prose-sm">
      <h1 className="font-display text-3xl font-bold text-ci-charcoal">Mentions légales</h1>

      <h2 className="font-display text-lg font-semibold text-ci-charcoal mt-6">Éditeur du site</h2>
      <p className="text-ci-charcoal mt-2 leading-relaxed">
        Ivoire365.ci — [Raison sociale à compléter], [adresse à compléter], Côte d'Ivoire.
        Contact : contact@ivoire365.ci.
      </p>

      <h2 className="font-display text-lg font-semibold text-ci-charcoal mt-6">Hébergement</h2>
      <p className="text-ci-charcoal mt-2 leading-relaxed">
        [Nom de l'hébergeur et adresse à compléter selon le déploiement final.]
      </p>

      <h2 className="font-display text-lg font-semibold text-ci-charcoal mt-6">
        Propriété intellectuelle
      </h2>
      <p className="text-ci-charcoal mt-2 leading-relaxed">
        L'ensemble du contenu présent sur Ivoire365.ci (textes, visuels, code) est la
        propriété de l'éditeur du site, sauf mention contraire, et ne peut être reproduit
        sans autorisation préalable.
      </p>

      <h2 className="font-display text-lg font-semibold text-ci-charcoal mt-6">
        Exactitude des informations
      </h2>
      <p className="text-ci-charcoal mt-2 leading-relaxed">
        Ivoire365.ci s'efforce de fournir des informations exactes et à jour, en
        particulier concernant les jours fériés et les vacances scolaires. Certaines dates
        (fêtes musulmanes mobiles, vacances scolaires provisoires, dates d'examens non
        encore annoncées) restent toutefois sujettes à confirmation officielle. L'éditeur
        ne saurait être tenu responsable des conséquences d'une erreur ou d'un changement
        de dernière minute publié par les autorités compétentes.
      </p>
    </div>
  );
}
