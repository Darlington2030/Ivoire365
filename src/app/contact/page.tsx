import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe d'Ivoire365 pour une question ou une correction de date.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="font-display text-3xl font-bold text-text-primary">Contact</h1>
      <p className="text-text-primary mt-4 leading-relaxed">
        Vous avez repéré une date incorrecte, ou souhaitez signaler une information à
        mettre à jour ? Écrivez-nous : nous traitons les corrections de dates en priorité
        afin de garder le calendrier fiable pour tout le monde.
      </p>
      <a
        href="mailto:contact@ivoire365.ci"
        className="inline-flex items-center gap-2 justify-center min-h-[44px] mt-6 rounded-md bg-primary-600 px-5 text-sm font-semibold text-white shadow-primary transition-all duration-base ease-default hover:bg-primary-700 hover:shadow-md hover:-translate-y-px"
      >
        <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
        contact@ivoire365.ci
      </a>
    </div>
  );
}
