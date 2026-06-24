/**
 * The single most impactful identity element on the site: a 3px, three-band
 * stripe (orange | white | green) in equal thirds. Used once beneath the
 * sticky header, full viewport width, no text, no hover — purely structural.
 */
export default function FlagStripe() {
  return (
    <div
      aria-hidden="true"
      className="flag-stripe h-[3px] w-full flex"
    >
      <span className="flex-1 bg-primary-500" />
      <span className="flex-1 bg-surface border-y border-border" />
      <span className="flex-1 bg-secondary-500" />
    </div>
  );
}
