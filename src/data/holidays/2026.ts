import type { YearHolidayData } from "@/types/calendar";

const LUNAR_DISCLAIMER =
  "Date sujette à confirmation par observation du croissant lunaire (COSIM/CODISS). Un écart d'un à deux jours est possible.";

const holidays2026: YearHolidayData = {
  year: 2026,
  // Cross-checked against multiple independent sources in June 2026,
  // including official COSIM/CODISS moon-sighting communiqués for the
  // Islamic dates already past. Where sources disagreed (Tabaski), the
  // date is marked "estimated" rather than silently picking one — verify
  // against the official Ministère de l'Emploi et de la Protection
  // Sociale decree before relying on it for planning.
  lastVerified: "2026-06-23",
  holidays: [
    {
      date: "2026-01-01",
      name: "Jour de l'An",
      type: "civil",
      movable: false,
      status: "confirmed",
      slug: "jour-de-lan",
      description:
        "Premier jour de l'année civile, célébré dans le monde entier. En Côte d'Ivoire, c'est l'occasion de retrouvailles familiales et de vœux pour la nouvelle année, après les festivités de la nuit du 31 décembre.",
    },
    {
      date: "2026-03-16",
      name: "Nuit du Destin (Laylat al-Qadr)",
      type: "muslim",
      movable: true,
      status: "confirmed",
      slug: "nuit-du-destin",
      description:
        "La Nuit du Destin commémore la nuit où, selon la tradition musulmane, le Coran aurait commencé à être révélé au Prophète Mahomet. Elle est célébrée durant les dix dernières nuits du Ramadan, vécue cette année dans la nuit du dimanche 15 au lundi 16 mars 2026, le lundi étant déclaré jour férié et chômé pour permettre aux fidèles de prolonger les veillées de prière.",
      disclaimer: LUNAR_DISCLAIMER,
      source: "Déclaration conjointe COSIM/CODISS, confirmée le 13 mars 2026.",
    },
    {
      date: "2026-03-20",
      name: "Korité — Aïd el-Fitr (fin du Ramadan)",
      type: "muslim",
      movable: true,
      status: "confirmed",
      slug: "korite-aid-el-fitr",
      description:
        "La Korité marque la fin du mois de jeûne du Ramadan. C'est l'une des fêtes les plus importantes du calendrier musulman en Côte d'Ivoire, célébrée par une prière collective le matin suivie de repas de fête en famille.",
      disclaimer: LUNAR_DISCLAIMER,
      source:
        "Déclaration conjointe COSIM/CODISS du 18 mars 2026 ; Ramadan 2026 commencé le 18 février, achevé le 19 mars (croissant non observé), Korité célébrée le 20 mars.",
    },
    {
      date: "2026-04-06",
      name: "Lundi de Pâques",
      type: "christian",
      movable: false,
      status: "confirmed",
      slug: "lundi-de-paques",
      description:
        "Le Lundi de Pâques prolonge la célébration chrétienne de la résurrection du Christ, fêtée le dimanche de Pâques (5 avril 2026). C'est un jour férié civil même pour une partie de la population non pratiquante.",
    },
    {
      date: "2026-05-01",
      name: "Fête du Travail",
      type: "civil",
      movable: false,
      status: "confirmed",
      slug: "fete-du-travail",
      description:
        "Journée internationale dédiée aux travailleurs, marquée en Côte d'Ivoire par des défilés syndicaux et des prises de parole officielles sur les droits des travailleurs et le dialogue social.",
    },
    {
      date: "2026-05-14",
      name: "Ascension",
      type: "christian",
      movable: false,
      status: "confirmed",
      slug: "ascension",
      description:
        "Fête chrétienne célébrée quarante jours après Pâques, commémorant l'ascension du Christ au ciel. Elle tombe toujours un jeudi.",
    },
    {
      date: "2026-05-25",
      name: "Lundi de Pentecôte",
      type: "christian",
      movable: false,
      status: "confirmed",
      slug: "lundi-de-pentecote",
      description:
        "Le Lundi de Pentecôte suit le dimanche de Pentecôte, qui commémore la descente du Saint-Esprit sur les apôtres, cinquante jours après Pâques.",
    },
    {
      date: "2026-05-27",
      name: "Tabaski — Aïd el-Kébir (Eid al-Adha)",
      type: "muslim",
      movable: true,
      status: "estimated",
      slug: "tabaski-aid-el-kebir",
      description:
        "La Tabaski, ou Aïd el-Kébir, commémore le sacrifice d'Abraham et est marquée par le sacrifice d'un mouton dans les familles qui en ont les moyens, suivi d'un grand repas partagé. C'est l'une des fêtes les plus festives de l'année en Côte d'Ivoire.",
      disclaimer: LUNAR_DISCLAIMER,
      source:
        "Sources consultées en juin 2026 indiquent des dates légèrement différentes (27 ou 28 mai) selon la date de publication. À confirmer par décret officiel.",
    },
    {
      date: "2026-08-07",
      name: "Fête de l'Indépendance",
      type: "civil",
      movable: false,
      status: "confirmed",
      slug: "fete-de-lindependance",
      description:
        "Commémore l'indépendance de la Côte d'Ivoire, proclamée le 7 août 1960. C'est la fête nationale, célébrée par des cérémonies officielles, notamment au Palais présidentiel et dans les chefs-lieux de région.",
    },
    {
      date: "2026-08-15",
      name: "Assomption",
      type: "christian",
      movable: false,
      status: "confirmed",
      slug: "assomption",
      description:
        "Fête chrétienne célébrant l'élévation au ciel de la Vierge Marie. Largement observée en Côte d'Ivoire, pays à forte composante catholique dans certaines régions.",
    },
    {
      date: "2026-08-25",
      name: "Maouloud (Naissance du Prophète)",
      type: "muslim",
      movable: true,
      status: "estimated",
      slug: "maouloud",
      description:
        "Le Maouloud célèbre la naissance du Prophète Mahomet. La date est calculée à partir du calendrier lunaire islamique et confirmée par les autorités religieuses à l'approche de l'événement.",
      disclaimer: LUNAR_DISCLAIMER,
    },
    {
      date: "2026-11-01",
      name: "Toussaint",
      type: "christian",
      movable: false,
      status: "confirmed",
      slug: "toussaint",
      description:
        "Fête chrétienne en l'honneur de tous les saints. En Côte d'Ivoire comme ailleurs, c'est aussi traditionnellement un jour de recueillement et de visite aux cimetières.",
      dayObserved: {
        date: "2026-11-01",
        note:
          "Tombe un dimanche en 2026 ; aucun report au lundi n'a été annoncé à ce jour. Vérifier la publication du décret annuel.",
      },
    },
    {
      date: "2026-11-15",
      name: "Journée Nationale de la Paix",
      type: "civil",
      movable: false,
      status: "confirmed",
      slug: "journee-nationale-de-la-paix",
      description:
        "Instituée pour commémorer le retour à la paix après la crise post-électorale, cette journée est dédiée à la réconciliation nationale et à la cohésion sociale.",
      dayObserved: {
        date: "2026-11-15",
        note:
          "Tombe un dimanche en 2026 ; aucun report au lundi n'a été annoncé à ce jour. Vérifier la publication du décret annuel.",
      },
    },
    {
      date: "2026-12-25",
      name: "Noël",
      type: "christian",
      movable: false,
      status: "confirmed",
      slug: "noel",
      description:
        "Fête chrétienne de la Nativité, célébrée en Côte d'Ivoire avec des messes de minuit, des repas en famille et des décorations dans les grandes villes, notamment à Abidjan.",
    },
  ],
  continuousDays: [
    {
      date: "2026-04-03",
      label: "Veille de Pâques (Vendredi saint)",
      hours: "07h30–12h00",
    },
    {
      date: "2026-05-26",
      label: "Veille de la Tabaski",
      hours: "07h45–12h15",
    },
    {
      date: "2026-12-24",
      label: "Veille de Noël",
      hours: "07h30–12h00",
    },
    {
      date: "2026-12-31",
      label: "Veille du Jour de l'An",
      hours: "07h30–12h00",
    },
  ],
};

export default holidays2026;
