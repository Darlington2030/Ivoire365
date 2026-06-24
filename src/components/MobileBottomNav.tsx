"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  CalendarDays,
  PartyPopper,
  Wrench,
  MoreHorizontal,
  X,
  GraduationCap,
  Moon,
  FileSpreadsheet,
} from "lucide-react";

const PRIMARY_ITEMS = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/calendrier-2026", label: "Calendrier", icon: CalendarDays },
  { href: "/jours-feries", label: "Fériés", icon: PartyPopper },
];

const MORE_ITEMS = [
  { href: "/vacances-scolaires", label: "Vacances scolaires", icon: GraduationCap },
  { href: "/ramadan-tabaski", label: "Ramadan & Tabaski", icon: Moon },
  { href: "/numero-semaine", label: "Numéro de semaine", icon: CalendarDays },
  { href: "/calculateur-de-dates", label: "Calculateur de dates", icon: Wrench },
  { href: "/examens", label: "Examens", icon: FileSpreadsheet },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreIsActive = MORE_ITEMS.some((item) => isActive(pathname, item.href));

  return (
    <>
      <nav
        aria-label="Navigation principale"
        className="no-print lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-surface border-t border-border pb-safe"
      >
        <div className="grid grid-cols-4">
          {PRIMARY_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="flex flex-col items-center justify-center gap-1 min-h-[56px] py-2 transition-colors duration-base ease-default"
              >
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  className={active ? "text-primary-500" : "text-text-muted"}
                  aria-hidden="true"
                />
                <span
                  className={`text-[11px] font-medium ${
                    active ? "text-primary-text" : "text-text-secondary"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
          <button
            type="button"
            aria-label="Plus d'options"
            aria-haspopup="dialog"
            aria-expanded={moreOpen}
            onClick={() => setMoreOpen(true)}
            className="flex flex-col items-center justify-center gap-1 min-h-[56px] py-2 transition-colors duration-base ease-default"
          >
            <MoreHorizontal
              size={20}
              strokeWidth={1.5}
              className={moreIsActive ? "text-primary-500" : "text-text-muted"}
              aria-hidden="true"
            />
            <span
              className={`text-[11px] font-medium ${
                moreIsActive ? "text-primary-text" : "text-text-secondary"
              }`}
            >
              Plus
            </span>
          </button>
        </div>
      </nav>

      {moreOpen && <MoreSheet pathname={pathname} onClose={() => setMoreOpen(false)} />}
    </>
  );
}

function MoreSheet({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  return (
    <div
      className="lg:hidden fixed inset-0 z-[200]"
      role="dialog"
      aria-modal="true"
      aria-label="Plus de pages"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className="absolute inset-0 bg-neutral-900/40 animate-fade-up"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 right-0 rounded-t-xl bg-surface border-t border-border shadow-xl animate-modal-in p-4 pb-safe-sheet">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-text-primary">Plus de pages</p>
          <button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="flex items-center justify-center h-9 w-9 rounded-full text-text-secondary transition-colors duration-base ease-default hover:bg-surface-raised"
          >
            <X size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {MORE_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-2.5 rounded-md border px-3 py-3 min-h-[44px] text-sm font-medium transition-colors duration-base ease-default ${
                    active
                      ? "border-primary-500 bg-primary-50 text-primary-text"
                      : "border-border text-text-primary hover:bg-surface-raised"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
