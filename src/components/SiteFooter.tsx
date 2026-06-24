import Link from "next/link";
import FlagStripe from "@/components/FlagStripe";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-surface-raised pb-safe-footer lg:pb-0">
      <FlagStripe />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="font-display font-bold text-text-primary mb-2">
              ivoire<span className="text-primary-text">365</span>
            </p>
            <p className="text-sm text-text-secondary">
              Le calendrier ivoirien : jours fériés, vacances scolaires, semaines et dates
              utiles, à jour pour la Côte d'Ivoire.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary mb-2">Outils</p>
            <ul className="space-y-1.5 text-sm text-text-secondary">
              <li><Link href="/calendrier-2026" className="transition-colors duration-base ease-default hover:text-primary-text">Calendrier 2026</Link></li>
              <li><Link href="/jours-feries" className="transition-colors duration-base ease-default hover:text-primary-text">Jours fériés</Link></li>
              <li><Link href="/numero-semaine" className="transition-colors duration-base ease-default hover:text-primary-text">Numéro de semaine</Link></li>
              <li><Link href="/calculateur-de-dates" className="transition-colors duration-base ease-default hover:text-primary-text">Calculateur de dates</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary mb-2">Informations</p>
            <ul className="space-y-1.5 text-sm text-text-secondary">
              <li><Link href="/a-propos" className="transition-colors duration-base ease-default hover:text-primary-text">À propos</Link></li>
              <li><Link href="/contact" className="transition-colors duration-base ease-default hover:text-primary-text">Contact</Link></li>
              <li><Link href="/mentions-legales" className="transition-colors duration-base ease-default hover:text-primary-text">Mentions légales</Link></li>
              <li><Link href="/politique-de-confidentialite" className="transition-colors duration-base ease-default hover:text-primary-text">Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Ivoire365 · Fait avec fierté en Côte d'Ivoire · Les
            dates des fêtes mobiles (Ramadan, Tabaski, Maouloud) sont sujettes à confirmation
            officielle.
          </p>
          <div className="flex items-center gap-1.5 flex-shrink-0" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-primary-500" />
            <span className="h-2 w-2 rounded-full bg-surface border border-border-strong" />
            <span className="h-2 w-2 rounded-full bg-secondary-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
