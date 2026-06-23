import Link from "next/link";
import type { Holiday } from "@/types/calendar";
import {
  daysInMonth,
  isoWeekNumber,
  mondayIndexedDay,
  monthLabel,
  monthSlug,
  toISO,
} from "@/lib/date-utils";

interface CalendarGridProps {
  year: number;
  monthIndex: number; // 0-11
  holidays: Holiday[];
  todayISO?: string;
  /** When true, month label links to its dedicated /calendrier-[year]/[month] page */
  linkToMonth?: boolean;
  /** Compact is used in the annual 12-grid view; full is used on the dedicated month page */
  size?: "compact" | "full";
}

const WEEKDAY_HEADERS = ["L", "M", "M", "J", "V", "S", "D"];

export default function CalendarGrid({
  year,
  monthIndex,
  holidays,
  todayISO: today,
  linkToMonth = false,
  size = "compact",
}: CalendarGridProps) {
  const numDays = daysInMonth(year, monthIndex);
  const firstOfMonth = new Date(Date.UTC(year, monthIndex, 1));
  const leadingBlanks = mondayIndexedDay(firstOfMonth);

  const holidayByDate = new Map(holidays.map((h) => [h.date, h]));

  const cells: Array<{ date: string; day: number; weekNum: number } | null> = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push(null);
  for (let d = 1; d <= numDays; d++) {
    const date = new Date(Date.UTC(year, monthIndex, d));
    cells.push({ date: toISO(date), day: d, weekNum: isoWeekNumber(date) });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (typeof cells)[] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const headingClasses = size === "compact" ? "text-sm font-semibold" : "text-xl font-display font-semibold";

  const MonthHeading = (
    <h3 className={`${headingClasses} text-ci-charcoal mb-2 capitalize`}>
      {monthLabel(monthIndex)}
    </h3>
  );

  return (
    <div className="select-none">
      {linkToMonth ? (
        <Link
          href={`/calendrier-${year}/${monthSlug(monthIndex)}`}
          className="inline-block hover:text-ci-orange transition-colors"
        >
          {MonthHeading}
        </Link>
      ) : (
        MonthHeading
      )}

      <table className="w-full border-collapse" aria-label={`Calendrier ${monthLabel(monthIndex)} ${year}`}>
        <thead>
          <tr>
            <th scope="col" className="w-6 text-[10px] text-ci-gray font-normal pb-1">
              Sem.
            </th>
            {WEEKDAY_HEADERS.map((w, i) => (
              <th
                key={i}
                scope="col"
                className="text-[10px] sm:text-xs text-ci-gray font-normal pb-1 text-center"
              >
                {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => {
            const firstRealCell = week.find((c) => c !== null);
            return (
              <tr key={wi}>
                <td className="text-[10px] text-ci-gray text-center align-middle">
                  {firstRealCell ? firstRealCell.weekNum : ""}
                </td>
                {week.map((cell, ci) => {
                  if (!cell) {
                    return <td key={ci} className="p-0.5 sm:p-1" />;
                  }
                  const holiday = holidayByDate.get(cell.date);
                  const isToday = today === cell.date;
                  return (
                    <td key={ci} className="p-0.5 sm:p-1 text-center">
                      <span
                        className={[
                          "inline-flex items-center justify-center rounded-md",
                          size === "compact" ? "h-7 w-7 text-xs" : "h-10 w-10 text-sm",
                          isToday
                            ? "bg-ci-orange text-white font-semibold"
                            : holiday
                              ? "bg-ci-green/10 font-medium"
                              : "text-ci-charcoal",
                        ].join(" ")}
                        style={
                          !isToday && holiday ? { color: "var(--ci-green-text)" } : undefined
                        }
                        title={holiday ? holiday.name : undefined}
                      >
                        {cell.day}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
