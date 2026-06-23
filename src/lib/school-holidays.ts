import type { SchoolYearData } from "@/types/calendar";
import schoolYear20252026 from "@/data/school-holidays/2025-2026";

// EXTENSION POINT: add src/data/school-holidays/{schoolYear}.ts and
// register it here, same pattern as holidays.ts.
const REGISTRY: Record<string, SchoolYearData> = {
  "2025-2026": schoolYear20252026,
};

export function getAvailableSchoolYears(): string[] {
  return Object.keys(REGISTRY).sort();
}

export function getSchoolYearData(schoolYear: string): SchoolYearData | null {
  return REGISTRY[schoolYear] ?? null;
}

export function getCurrentSchoolYear(): SchoolYearData {
  const years = getAvailableSchoolYears();
  return REGISTRY[years[years.length - 1]];
}
