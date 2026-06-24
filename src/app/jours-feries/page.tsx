import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAvailableYears } from "@/lib/holidays";
import { jsonLdScriptProps, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Jours fériés en Côte d'Ivoire",
  description:
    "Liste des jours fériés en Côte d'Ivoire, année par année : fêtes civiles, chrétiennes et musulmanes, avec dates et explications.",
  alternates: { canonical: "/jours-feries" },
};

export default function JoursFeriesIndexPage() {
  const years = getAvailableYears();
  const currentYear = new Date().getFullYear();

  // If the current year has data, send visitors straight to it — the
  // index otherwise just lists available years.
  if (years.includes(currentYear)) {
    redirect(`/jours-feries/${currentYear}`);
  }

  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Jours fériés", path: "/jours-feries" },
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
      <script {...jsonLdScriptProps(breadcrumb)} />
      <h1 className="font-display text-3xl font-bold text-text-primary">
        Jours fériés en Côte d'Ivoire
      </h1>
      <p className="text-text-secondary mt-2 max-w-2xl">
        La Côte d'Ivoire observe 14 jours fériés par an, mêlant fêtes civiles,
        chrétiennes et musulmanes. Choisissez une année ci-dessous pour voir le détail.
      </p>
      <ul className="mt-6 flex flex-wrap gap-3">
        {years.map((y) => (
          <li key={y}>
            <Link
              href={`/jours-feries/${y}`}
              className="inline-flex items-center justify-center min-h-[44px] rounded-md border border-border-strong bg-surface px-5 font-medium text-text-primary transition-colors duration-base ease-default hover:border-primary-500 hover:text-primary-text"
            >
              {y}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
