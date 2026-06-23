// Core data model for Ivoire365.ci
// Designed so 2027+ data can be added by dropping in a new JSON file —
// no code changes required.

export type HolidayType = "civil" | "christian" | "muslim";

/**
 * Confirmation status for a given date.
 * - "confirmed": fixed civil/Christian date, or an Islamic date confirmed
 *   by official COSIM/CODISS moon-sighting statement + government decree.
 * - "estimated": Islamic date projected from astronomical calculation,
 *   pending official moon-sighting confirmation. Can shift by 1-2 days.
 * - "provisional": civil/admin date announced but not yet decreed (e.g.
 *   school holidays, exam dates before official confirmation).
 */
export type DateStatus = "confirmed" | "estimated" | "provisional";

export interface ContinuousDay {
  /** ISO date string YYYY-MM-DD */
  date: string;
  label: string;
  /** e.g. "07:30–12:00" */
  hours?: string;
}

export interface Holiday {
  /** ISO date string YYYY-MM-DD */
  date: string;
  /** French display name */
  name: string;
  type: HolidayType;
  /** True for Islamic holidays whose date depends on moon sighting */
  movable: boolean;
  status: DateStatus;
  /** URL-safe slug for /jours-feries/[slug] */
  slug: string;
  /** Short description / historical context, 2-4 sentences, original text */
  description: string;
  /**
   * If the holiday falls on a Sunday and is (or might be) observed the
   * following Monday by decree, this records that — left optional and
   * per-entry since the rule is not blanket/automatic year to year.
   */
  dayObserved?: {
    date: string;
    note: string;
  };
  /** Disclaimer shown for movable Islamic dates */
  disclaimer?: string;
  /** Source citation for transparency (decree, ministry, press) */
  source?: string;
}

export interface YearHolidayData {
  year: number;
  /** Last time this file's data was checked/updated against official sources */
  lastVerified: string;
  holidays: Holiday[];
  continuousDays: ContinuousDay[];
}

export interface SchoolTerm {
  label: string;
  startDate: string;
  endDate: string;
}

export interface SchoolBreak {
  label: string;
  /** Evening classes end this date, break starts the next day */
  startDate: string;
  endDate: string;
  status: DateStatus;
}

export interface SchoolYearData {
  /** e.g. "2025-2026" */
  schoolYear: string;
  /** Cycle: "primaire-secondaire" | "preprimaire" etc — kept generic */
  cycle: string;
  startDate: string;
  endDate: string;
  terms: SchoolTerm[];
  breaks: SchoolBreak[];
  source?: string;
  lastVerified: string;
}

export interface ExamEntry {
  name: string;
  fullName: string;
  /** ISO date or null if not yet announced */
  startDate: string | null;
  endDate: string | null;
  status: DateStatus | "non-annonce";
  description: string;
  source?: string;
}

export interface ExamYearData {
  year: number;
  exams: ExamEntry[];
  lastVerified: string;
}
