import Link from "next/link";

const NAV_LINKS = [
  { href: "/calendrier-2026", label: "Calendrier" },
  { href: "/jours-feries", label: "Jours fériés" },
  { href: "/vacances-scolaires", label: "Vacances scolaires" },
  { href: "/ramadan-tabaski", label: "Ramadan & Tabaski" },
  { href: "/numero-semaine", label: "N° de semaine" },
  { href: "/calculateur-de-dates", label: "Dates" },
  { href: "/examens", label: "Examens" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-ci-border bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-ci-charcoal">
            <span
              aria-hidden="true"
              className="inline-block h-5 w-5 rounded-sm"
              style={{
                background:
                  "linear-gradient(90deg, var(--ci-orange) 0 33%, var(--ci-white) 33% 67%, var(--ci-green) 67% 100%)",
                border: "1px solid var(--ci-border)",
              }}
            />
            Ivoire365
          </Link>
          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-ci-charcoal hover:bg-ci-ivory hover:text-ci-orange transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {/* Mobile nav: horizontal scroll row, no JS menu needed for v1 */}
      <nav
        aria-label="Navigation mobile"
        className="lg:hidden flex gap-1 overflow-x-auto px-4 pb-3 -mt-1"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap rounded-full border border-ci-border px-3 py-2 text-sm font-medium text-ci-charcoal min-h-[44px] flex items-center"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
