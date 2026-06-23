// Date utilities — no external dependency, pure functions, safe for
// both server (RSC) and client components.

const MONTH_NAMES_FR = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
] as const;

const DAY_NAMES_FR = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
] as const;

const DAY_NAMES_SHORT_FR = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"] as const;

export function monthSlug(monthIndex: number): string {
  return MONTH_NAMES_FR[monthIndex];
}

export function monthIndexFromSlug(slug: string): number {
  const idx = MONTH_NAMES_FR.findIndex((m) => m === slug.toLowerCase());
  return idx;
}

export function monthLabel(monthIndex: number): string {
  const name = MONTH_NAMES_FR[monthIndex];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function dayLabel(dayOfWeek: number): string {
  return DAY_NAMES_FR[dayOfWeek];
}

export function dayLabelShort(mondayIndexedDay: number): string {
  return DAY_NAMES_SHORT_FR[mondayIndexedDay];
}

export function allMonthSlugs(): string[] {
  return [...MONTH_NAMES_FR];
}

/** Parses an ISO date string (YYYY-MM-DD) into a UTC-anchored Date to avoid
 * timezone drift shifting the calendar day. */
export function parseISO(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function toISO(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatLongDateFR(dateStr: string): string {
  const date = parseISO(dateStr);
  const day = date.getUTCDay();
  const dom = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  return `${dayLabel(day)} ${dom} ${monthLabel(month).toLowerCase()} ${year}`;
}

export function formatShortDateFR(dateStr: string): string {
  const date = parseISO(dateStr);
  const dom = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  return `${dom} ${monthLabel(month).toLowerCase()} ${year}`;
}

/** ISO 8601 week number (1-53). Week 1 is the week containing the first
 * Thursday of the year; weeks start on Monday. */
export function isoWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  // ISO: Monday = 1 ... Sunday = 7
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return weekNo;
}

export function isoWeekYear(date: Date): number {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  return d.getUTCFullYear();
}

/** Returns the 0-6 Monday-indexed weekday (0 = Monday ... 6 = Sunday) */
export function mondayIndexedDay(date: Date): number {
  const jsDay = date.getUTCDay(); // 0 = Sunday
  return (jsDay + 6) % 7;
}

export function daysInMonth(year: number, monthIndex: number): number {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

export function addDays(dateStr: string, days: number): string {
  const d = parseISO(dateStr);
  d.setUTCDate(d.getUTCDate() + days);
  return toISO(d);
}

export function daysBetween(startISO: string, endISO: string): number {
  const a = parseISO(startISO);
  const b = parseISO(endISO);
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export function todayISO(): string {
  // Uses the server's local date; for a CI-focused site this runs close
  // enough to Africa/Abidjan (UTC, no DST) that no extra offset is needed.
  return toISO(new Date());
}

export function isSameDate(aISO: string, bISO: string): boolean {
  return aISO === bISO;
}
