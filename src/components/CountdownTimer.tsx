"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  /** ISO date string YYYY-MM-DD, or full ISO datetime */
  targetDate: string;
  label?: string;
  /** Compact renders inline numbers only; full renders the 4-box grid */
  variant?: "full" | "compact";
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeRemaining(targetDate: string): Remaining {
  const target = new Date(
    targetDate.length === 10 ? `${targetDate}T00:00:00` : targetDate
  ).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
}

export default function CountdownTimer({
  targetDate,
  label,
  variant = "full",
}: CountdownTimerProps) {
  // Start with a deterministic null so SSR and first client render match;
  // the real countdown fills in after mount.
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(computeRemaining(targetDate));
    const interval = setInterval(() => {
      setRemaining(computeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!remaining) {
    return (
      <div
        aria-hidden="true"
        className={variant === "full" ? "h-[88px]" : "h-[24px]"}
      />
    );
  }

  if (remaining.isPast) {
    return (
      <p className="text-ci-gray text-sm" role="status">
        {label ? `${label} : ` : ""}cette date est passée.
      </p>
    );
  }

  if (variant === "compact") {
    return (
      <p
        className="text-sm font-medium"
        style={{ color: "var(--ci-orange-text)" }}
        role="timer"
      >
        {label ? `${label} : ` : ""}
        {remaining.days} j {remaining.hours} h {remaining.minutes} min
      </p>
    );
  }

  const units: Array<{ value: number; unitLabel: string }> = [
    { value: remaining.days, unitLabel: "jours" },
    { value: remaining.hours, unitLabel: "heures" },
    { value: remaining.minutes, unitLabel: "min" },
    { value: remaining.seconds, unitLabel: "sec" },
  ];

  return (
    <div role="timer" aria-live="off">
      {label && <p className="text-sm text-ci-gray mb-2">{label}</p>}
      <div className="grid grid-cols-4 gap-2 max-w-sm">
        {units.map((u) => (
          <div
            key={u.unitLabel}
            className="flex flex-col items-center justify-center rounded-lg border border-ci-border bg-white py-3 shadow-card"
          >
            <span className="font-display text-2xl font-semibold tabular-nums text-ci-charcoal">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="text-[11px] uppercase tracking-wide text-ci-gray mt-0.5">
              {u.unitLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
