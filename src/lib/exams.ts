import type { ExamYearData } from "@/types/calendar";
import exams2026 from "@/data/exams/2026";

// EXTENSION POINT: add src/data/exams/{year}.ts and register it here.
const REGISTRY: Record<number, ExamYearData> = {
  2026: exams2026,
};

export function getAvailableExamYears(): number[] {
  return Object.keys(REGISTRY)
    .map(Number)
    .sort((a, b) => a - b);
}

export function getExamYearData(year: number): ExamYearData | null {
  return REGISTRY[year] ?? null;
}
