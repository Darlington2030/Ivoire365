import type { ExamYearData } from "@/types/calendar";

// Sourced from the Direction des Examens et Concours (DECO), official
// "examens à grand tirage" calendar for session 2026, cross-checked
// against multiple independent news outlets in June 2026.
const exams2026: ExamYearData = {
  year: 2026,
  lastVerified: "2026-06-23",
  exams: [
    {
      name: "CEPE",
      fullName: "Certificat d'Études Primaires Élémentaires",
      startDate: "2026-05-18",
      endDate: "2026-05-18",
      status: "confirmed",
      description:
        "Premier examen national du parcours scolaire ivoirien, le CEPE clôture le cycle primaire (CM2). Épreuves écrites le lundi 18 mai 2026 ; résultats attendus le lundi 1er juin 2026.",
      source: "DECO — men-deco.org, calendrier officiel session 2026.",
    },
    {
      name: "BEPC",
      fullName: "Brevet d'Études du Premier Cycle",
      startDate: "2026-05-26",
      endDate: "2026-05-29",
      status: "confirmed",
      description:
        "Examen de fin de collège (classe de 3ème). Épreuves physiques et sportives du 13 au 24 avril 2026, épreuves orales du 20 au 23 mai 2026, épreuves écrites du 26 au 29 mai 2026. Résultats attendus le mardi 16 juin 2026.",
      source: "DECO — men-deco.org, calendrier officiel session 2026.",
    },
    {
      name: "BAC",
      fullName: "Baccalauréat",
      startDate: "2026-06-15",
      endDate: "2026-06-19",
      status: "confirmed",
      description:
        "Examen de fin de lycée. Épreuves physiques et sportives du 27 avril au 8 mai 2026. Les sources divergent légèrement sur la fenêtre exacte des oraux (début 2 ou 9 juin selon la source) ; les épreuves écrites sont en revanche confirmées de façon constante du 15 au 19 juin 2026. Résultats attendus le lundi 6 juillet 2026.",
      source:
        "DECO — men-deco.org ; dates des oraux à confirmer sur le portail officiel en cas de doute, les écrits sont bien établis du 15 au 19 juin.",
    },
    {
      name: "Concours fonction publique",
      fullName: "Concours administratifs de la fonction publique",
      startDate: null,
      endDate: null,
      status: "non-annonce",
      description:
        "Plusieurs concours de la fonction publique (Adjoint Administratif, Gendarmerie, Police, etc.) sont organisés tout au long de l'année, avec des calendriers propres à chaque corps. Consultez le site du Ministère de la Fonction Publique pour les sessions en cours.",
    },
  ],
};

export default exams2026;
