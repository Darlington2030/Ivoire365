"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 justify-center min-h-[44px] rounded-md border border-border-strong bg-surface px-5 text-sm font-semibold text-text-primary transition-colors duration-base ease-default hover:border-primary-500 hover:text-primary-text"
    >
      <Printer size={16} strokeWidth={1.5} aria-hidden="true" />
      Imprimer / Télécharger en PDF
    </button>
  );
}
