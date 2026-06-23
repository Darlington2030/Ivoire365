import type { Holiday, YearHolidayData } from "@/types/calendar";
import holidays2026 from "@/data/holidays/2026";

// ---------------------------------------------------------------------------
// EXTENSION POINT: to add a new year, create src/data/holidays/{year}.ts
// following the same shape as 2026.ts, import it below, and add it to the
// registry. Nothing else in the app needs to change — pages are generated
// from this registry via generateStaticParams.
// ---------------------------------------------------------------------------
const REGISTRY: Record<number, YearHolidayData> = {
  2026: holidays2026,
};

export function getAvailableYears(): number[] {
  return Object.keys(REGISTRY)
    .map(Number)
    .sort((a, b) => a - b);
}

export function getYearData(year: number): YearHolidayData | null {
  return REGISTRY[year] ?? null;
}

export function getHolidaysForYear(year: number): Holiday[] {
  return REGISTRY[year]?.holidays ?? [];
}

export function getHolidayBySlug(slug: string, year?: number): Holiday | null {
  const years = year ? [year] : getAvailableYears();
  for (const y of years) {
    const found = REGISTRY[y]?.holidays.find((h) => h.slug === slug);
    if (found) return found;
  }
  return null;
}

/** Finds the same holiday's date across all known years, sorted ascending —
 * powers the "this year / next year" comparison on detail pages. */
export function getHolidayAcrossYears(slug: string): Array<{ year: number; holiday: Holiday }> {
  const results: Array<{ year: number; holiday: Holiday }> = [];
  for (const y of getAvailableYears()) {
    const h = REGISTRY[y]?.holidays.find((h) => h.slug === slug);
    if (h) results.push({ year: y, holiday: h });
  }
  return results.sort((a, b) => a.year - b.year);
}

export function getNextUpcomingHolidays(
  fromISO: string,
  count: number = 3
): Holiday[] {
  const all: Holiday[] = [];
  for (const y of getAvailableYears()) {
    all.push(...(REGISTRY[y]?.holidays ?? []));
  }
  return all
    .filter((h) => h.date >= fromISO)
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .slice(0, count);
}

export function getHolidayByDate(dateISO: string): Holiday | null {
  const year = Number(dateISO.slice(0, 4));
  return REGISTRY[year]?.holidays.find((h) => h.date === dateISO) ?? null;
}
