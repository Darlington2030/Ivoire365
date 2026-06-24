interface AdSlotProps {
  variant: "header-banner" | "in-content" | "sidebar";
}

// Empty, clearly-marked placeholder. Reserves a fixed footprint so that
// dropping in AdSense (or any other network) later does not shift layout
// (CLS). Intentionally renders nothing visually distracting for v1.
const DIMENSIONS: Record<AdSlotProps["variant"], string> = {
  "header-banner": "h-[90px] w-full max-w-[728px]",
  "in-content": "h-[250px] w-full max-w-[336px]",
  sidebar: "h-[600px] w-full max-w-[300px]",
};

export default function AdSlot({ variant }: AdSlotProps) {
  return (
    <div
      className={`ad-slot mx-auto flex items-center justify-center rounded-lg border border-dashed border-border bg-surface-raised/60 text-xs text-text-secondary ${DIMENSIONS[variant]}`}
      data-ad-slot={variant}
      aria-hidden="true"
    >
      Espace publicitaire
    </div>
  );
}
