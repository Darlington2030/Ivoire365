import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAvailableSchoolYears } from "@/lib/school-holidays";

export const metadata: Metadata = {
  title: "Vacances scolaires en Côte d'Ivoire",
  description:
    "Calendrier des vacances et congés scolaires en Côte d'Ivoire, année par année.",
  alternates: { canonical: "/vacances-scolaires" },
};

export default function VacancesScolairesIndexPage() {
  const years = getAvailableSchoolYears();
  const latest = years[years.length - 1];
  redirect(`/vacances-scolaires/${latest}`);
}
