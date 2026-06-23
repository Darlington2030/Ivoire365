"use client";

import { useState } from "react";
import { isoWeekNumber, isoWeekYear, parseISO, todayISO } from "@/lib/date-utils";

export default function WeekNumberTool() {
  const [dateInput, setDateInput] = useState(todayISO());

  const date = parseISO(dateInput);
  const weekNum = isoWeekNumber(date);
  const weekYear = isoWeekYear(date);

  return (
    <div className="rounded-xl border border-ci-border bg-white p-5 sm:p-6 shadow-card">
      <label htmlFor="week-date-input" className="block text-sm font-medium text-ci-charcoal mb-2">
        Choisissez une date
      </label>
      <input
        id="week-date-input"
        type="date"
        value={dateInput}
        onChange={(e) => setDateInput(e.target.value)}
        className="w-full sm:w-auto rounded-lg border border-ci-border px-4 py-3 text-base min-h-[44px] focus:border-ci-orange outline-none"
      />

      <div className="mt-5 rounded-lg bg-ci-ivory p-4 sm:p-5">
        <p className="text-sm text-ci-gray mb-1">Numéro de semaine ISO 8601</p>
        <p className="font-display text-3xl font-semibold text-ci-charcoal">
          Semaine {weekNum}
          <span className="text-base font-normal text-ci-gray ml-2">({weekYear})</span>
        </p>
      </div>
    </div>
  );
}
