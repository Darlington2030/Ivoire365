"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center justify-center min-h-[44px] rounded-lg border border-ci-border bg-white px-5 text-sm font-semibold text-ci-charcoal hover:border-ci-orange hover:text-ci-orange transition-colors"
    >
      Imprimer / Télécharger en PDF
    </button>
  );
}
