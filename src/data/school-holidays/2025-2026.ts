import type { SchoolYearData } from "@/types/calendar";

// Sourced from the Ministère de l'Éducation Nationale et de l'Alphabétisation
// (MENA) official announcement, 1 September 2025, and the detailed congés
// calendar published 29 October 2025. Cross-checked against multiple news
// outlets (Abidjan.net, APAnews, LeInfoDrome) in June 2026.
const schoolYear20252026: SchoolYearData = {
  schoolYear: "2025-2026",
  cycle: "preprimaire-primaire-secondaire",
  startDate: "2025-09-08",
  endDate: "2026-07-15",
  lastVerified: "2026-06-23",
  source:
    "MENA — Grande réunion de rentrée, 1er septembre 2025 ; calendrier détaillé publié le 29 octobre 2025.",
  terms: [
    {
      label: "1er trimestre",
      startDate: "2025-09-08",
      endDate: "2025-11-28",
    },
    {
      label: "2e trimestre",
      startDate: "2025-12-01",
      endDate: "2026-02-27",
    },
    {
      label: "3e trimestre",
      startDate: "2026-03-02",
      endDate: "2026-05-08",
    },
  ],
  breaks: [
    {
      label: "Congé de la Toussaint",
      startDate: "2025-10-28",
      endDate: "2025-11-02",
      status: "confirmed",
    },
    {
      label: "Congés de Noël et du Nouvel An",
      startDate: "2025-12-19",
      endDate: "2026-01-04",
      status: "confirmed",
    },
    {
      label: "Congé de février",
      startDate: "2026-02-17",
      endDate: "2026-02-22",
      status: "confirmed",
    },
    {
      label: "Congés de Pâques",
      startDate: "2026-03-31",
      endDate: "2026-04-12",
      status: "confirmed",
    },
    {
      label: "Grandes vacances",
      startDate: "2026-07-15",
      endDate: "2026-09-06",
      status: "confirmed",
    },
  ],
};

export default schoolYear20252026;
