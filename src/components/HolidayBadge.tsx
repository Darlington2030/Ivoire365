import type { HolidayType } from "@/types/calendar";

const TYPE_STYLES: Record<HolidayType, string> = {
  civil: "bg-ci-ivory text-ci-charcoal border-ci-border",
  christian: "bg-[#F0F6F2] text-ci-green-dark border-[#CFE7D8]",
  muslim: "bg-[#FFF3E6] border-[#FFD9AD]",
};

const TYPE_LABELS_FR: Record<HolidayType, string> = {
  civil: "Civil",
  christian: "Chrétien",
  muslim: "Musulman",
};

interface HolidayBadgeProps {
  type: HolidayType;
  movable?: boolean;
  size?: "sm" | "md";
}

export default function HolidayBadge({
  type,
  movable = false,
  size = "sm",
}: HolidayBadgeProps) {
  const sizeClasses =
    size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1";

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`inline-flex items-center rounded-full border font-medium ${sizeClasses} ${TYPE_STYLES[type]}`}
        style={type === "muslim" ? { color: "var(--ci-orange-text)" } : undefined}
      >
        {TYPE_LABELS_FR[type]}
      </span>
      {movable && (
        <span
          className={`inline-flex items-center rounded-full border border-ci-border bg-white font-medium text-ci-gray ${sizeClasses}`}
          title="Date mobile, dépendante du calendrier lunaire"
        >
          🌙 mobile
        </span>
      )}
    </span>
  );
}
