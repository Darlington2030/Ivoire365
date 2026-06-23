import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-ci-border bg-ci-ivory">
      {/* Subtle tasteful flag-stripe divider, as specified in the brief */}
      <div
        aria-hidden="true"
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--ci-orange) 0 33%, var(--ci-white) 33% 67%, var(--ci-green) 67% 100%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="font-display font-bold text-ci-charcoal mb-2">Ivoire365</p>
            <p className="text-sm text-ci-gray">
              Le calendrier ivoirien : jours fériés, vacances scolaires, semaines et dates
              utiles, à jour pour la Côte d'Ivoire.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ci-charcoal mb-2">Outils</p>
            <ul className="space-y-1.5 text-sm text-ci-gray">
              <li><Link href="/calendrier-2026" className="hover:text-ci-orange">Calendrier 2026</Link></li>
              <li><Link href="/jours-feries" className="hover:text-ci-orange">Jours fériés</Link></li>
              <li><Link href="/numero-semaine" className="hover:text-ci-orange">Numéro de semaine</Link></li>
              <li><Link href="/calculateur-de-dates" className="hover:text-ci-orange">Calculateur de dates</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-ci-charcoal mb-2">Informations</p>
            <ul className="space-y-1.5 text-sm text-ci-gray">
              <li><Link href="/a-propos" className="hover:text-ci-orange">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-ci-orange">Contact</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-ci-orange">Mentions légales</Link></li>
              <li><Link href="/politique-de-confidentialite" className="hover:text-ci-orange">Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-xs text-ci-gray">
          © {new Date().getFullYear()} Ivoire365.ci — Tous droits réservés. Les dates des fêtes
          mobiles (Ramadan, Tabaski, Maouloud) sont sujettes à confirmation officielle.
        </p>
      </div>
    </footer>
  );
}
