import Link from "next/link";
import type { Holiday } from "@/types/calendar";
import {
  daysInMonth,
  isoWeekNumber,
  mondayIndexedDay,
  monthLabel,
  monthSlug,
  toISO,
  formatLongDateFR,
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
// Sunday is index 6 in our Monday-first layout — used to mute weekend text
const WEEKEND_INDICES = new Set([5, 6]);

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

  const headingClasses =
    size === "compact" ? "text-sm font-semibold" : "text-xl font-display font-semibold";

  const MonthHeading = (
    <h3 className={`${headingClasses} text-text-primary mb-2 capitalize`}>
      {monthLabel(monthIndex)}
    </h3>
  );

  const circleSize = size === "compact" ? "h-7 w-7 text-xs" : "h-10 w-10 text-sm";

  return (
    <div className="select-none">
      {linkToMonth ? (
        <Link
          href={`/calendrier-${year}/${monthSlug(monthIndex)}`}
          className="inline-block hover:text-primary-text transition-colors duration-base ease-default"
        >
          {MonthHeading}
        </Link>
      ) : (
        MonthHeading
      )}

      <table
        className="w-full border-collapse"
        aria-label={`Calendrier ${monthLabel(monthIndex)} ${year}`}
      >
        <thead>
          <tr>
            <th scope="col" className="w-6 text-[10px] text-text-muted font-normal pb-1">
              Sem.
            </th>
            {WEEKDAY_HEADERS.map((w, i) => (
              <th
                key={i}
                scope="col"
                className={`text-[10px] sm:text-xs font-normal pb-1 text-center uppercase tracking-wide ${
                  WEEKEND_INDICES.has(i) ? "text-text-muted" : "text-text-secondary"
                }`}
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
                <td className="text-[10px] text-text-muted text-center align-middle">
                  {firstRealCell ? firstRealCell.weekNum : ""}
                </td>
                {week.map((cell, ci) => {
                  if (!cell) {
                    return <td key={ci} className="p-0.5 sm:p-1" />;
                  }
                  const holiday = holidayByDate.get(cell.date);
                  const isToday = today === cell.date;
                  const cellLabel = `${formatLongDateFR(cell.date)}${
                    holiday ? `, ${holiday.name}` : ", aucun jour férié"
                  }${isToday ? ", aujourd'hui" : ""}`;

                  return (
                    <td
                      key={ci}
                      className="p-0.5 sm:p-1 text-center"
                      aria-label={cellLabel}
                      title={holiday ? holiday.name : undefined}
                    >
                      <span
                        aria-hidden="true"
                        className={[
                          "inline-flex items-center justify-center rounded-full transition-colors duration-base ease-default",
                          circleSize,
                          isToday
                            ? "bg-primary-500 text-white font-semibold"
                            : holiday
                              ? "bg-primary-50 text-primary-text font-medium"
                              : "text-text-secondary",
                        ].join(" ")}
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
