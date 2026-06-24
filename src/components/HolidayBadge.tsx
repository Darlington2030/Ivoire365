import { Moon, Flag } from "lucide-react";
import type { HolidayType } from "@/types/calendar";

// Presentation-only distinction (not part of the data schema): these civil
// holidays are explicitly national/patriotic observances per the original
// holiday table ("Civil/National"), so they get the Flag icon treatment.
// Kept here rather than in the data layer since it's a UI choice, not a
// change to the underlying holiday data shape.
const NATIONAL_SLUGS = new Set([
  "fete-de-lindependance",
  "journee-nationale-de-la-paix",
]);

export function isNationalHoliday(slug: string): boolean {
  return NATIONAL_SLUGS.has(slug);
}

const TYPE_STYLES: Record<HolidayType, { bg: string; text: string; border: string }> = {
  civil: {
    bg: "bg-neutral-100",
    text: "text-text-primary",
    border: "border-border-strong",
  },
  christian: {
    bg: "bg-[var(--color-holiday-christian-bg)]",
    text: "text-[var(--color-holiday-christian-text)]",
    border: "border-[#D9CCEE]",
  },
  muslim: {
    bg: "bg-[var(--color-holiday-muslim-bg)]",
    text: "text-[var(--color-holiday-muslim-text)]",
    border: "border-primary-200",
  },
};

const TYPE_LABELS_FR: Record<HolidayType, string> = {
  civil: "Civil",
  christian: "Chrétien",
  muslim: "Musulman",
};

interface HolidayBadgeProps {
  type: HolidayType;
  movable?: boolean;
  /** National civil holidays (Indépendance, Journée de la Paix) get a Flag icon */
  national?: boolean;
  size?: "sm" | "md";
}

export default function HolidayBadge({
  type,
  movable = false,
  national = false,
  size = "sm",
}: HolidayBadgeProps) {
  const styles = TYPE_STYLES[type];
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5 gap-1" : "text-sm px-2.5 py-1 gap-1.5";
  const iconSize = size === "sm" ? 12 : 14;

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`inline-flex items-center rounded-full border font-medium ${sizeClasses} ${styles.bg} ${styles.text} ${styles.border}`}
      >
        {national && <Flag size={iconSize} strokeWidth={1.5} aria-hidden="true" />}
        {TYPE_LABELS_FR[type]}
      </span>
      {movable && (
        <span
          className={`inline-flex items-center rounded-full border border-border-strong bg-surface font-medium text-text-secondary ${sizeClasses}`}
          title="Date mobile, dépendante du calendrier lunaire"
        >
          <Moon size={iconSize} strokeWidth={1.5} aria-hidden="true" />
          mobile
        </span>
      )}
    </span>
  );
}
