import Link from "next/link";
import { CalendarDays, PartyPopper, GraduationCap, Moon, CalendarRange, Wrench, FileSpreadsheet } from "lucide-react";

const NAV_LINKS = [
  { href: "/calendrier-2026", label: "Calendrier", icon: CalendarDays },
  { href: "/jours-feries", label: "Jours fériés", icon: PartyPopper },
  { href: "/vacances-scolaires", label: "Vacances scolaires", icon: GraduationCap },
  { href: "/ramadan-tabaski", label: "Ramadan & Tabaski", icon: Moon },
  { href: "/numero-semaine", label: "N° de semaine", icon: CalendarRange },
  { href: "/calculateur-de-dates", label: "Dates", icon: Wrench },
  { href: "/examens", label: "Examens", icon: FileSpreadsheet },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-[100] border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Ivoire365 · accueil"
          >
            <LogoMark />
            <span className="font-display text-xl font-bold text-text-primary">
              ivoire<span className="text-primary-text">365</span>
            </span>
          </Link>
          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors duration-base ease-default hover:bg-neutral-100 hover:text-text-primary min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

/** 32×32 logo mark: a stylized calendar glyph with a 3px flag-stripe accent
 * beneath it, per the brief — subtle, not a full-color block. */
function LogoMark() {
  return (
    <span className="relative inline-flex h-8 w-8 flex-col items-center justify-center rounded-md border border-border bg-surface-raised">
      <CalendarDays
        size={18}
        strokeWidth={1.5}
        className="text-text-primary group-hover:text-primary-text transition-colors duration-base ease-default"
        aria-hidden="true"
      />
      <span className="absolute bottom-0 left-0 right-0 h-[3px] flex overflow-hidden rounded-b-md">
        <span className="flex-1 bg-primary-500" />
        <span className="flex-1 bg-surface" />
        <span className="flex-1 bg-secondary-500" />
      </span>
    </span>
  );
}
