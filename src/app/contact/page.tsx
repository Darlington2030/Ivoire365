import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe d'Ivoire365 pour une question ou une correction de date.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="font-display text-3xl font-bold text-ci-charcoal">Contact</h1>
      <p className="text-ci-charcoal mt-4 leading-relaxed">
        Vous avez repéré une date incorrecte, ou souhaitez signaler une information à
        mettre à jour ? Écrivez-nous : nous traitons les corrections de dates en priorité
        afin de garder le calendrier fiable pour tout le monde.
      </p>
      <a
        href="mailto:contact@ivoire365.ci"
        className="inline-flex items-center justify-center min-h-[44px] mt-6 rounded-lg bg-ci-orange px-5 text-sm font-semibold text-white hover:bg-ci-orange-dark transition-colors"
      >
        contact@ivoire365.ci
      </a>
    </div>
  );
}
