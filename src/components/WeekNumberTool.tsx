"use client";

import { useState } from "react";
import { isoWeekNumber, isoWeekYear, parseISO, todayISO } from "@/lib/date-utils";

export default function WeekNumberTool() {
  const [dateInput, setDateInput] = useState(todayISO());

  const date = parseISO(dateInput);
  const weekNum = isoWeekNumber(date);
  const weekYear = isoWeekYear(date);

  return (
    <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 shadow-sm">
      <label htmlFor="week-date-input" className="block text-sm font-medium text-text-primary mb-1.5">
        Choisissez une date
      </label>
      <input
        id="week-date-input"
        type="date"
        value={dateInput}
        onChange={(e) => setDateInput(e.target.value)}
        className="w-full sm:w-auto rounded-md border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-text-primary min-h-[44px] outline-none transition-colors duration-fast ease-default focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(247,127,0,0.12)]"
      />

      <div className="mt-5 rounded-lg bg-surface-raised p-4 sm:p-5">
        <p className="text-sm text-text-secondary mb-1">Numéro de semaine ISO 8601</p>
        <p className="font-display text-3xl font-semibold text-text-primary">
          Semaine {weekNum}
          <span className="text-base font-normal text-text-secondary ml-2">({weekYear})</span>
        </p>
      </div>
    </div>
  );
}
