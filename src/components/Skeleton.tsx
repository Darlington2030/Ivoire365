interface SkeletonProps {
  className?: string;
  /** ARIA: hidden by default since skeletons are purely decorative loading state */
  label?: string;
}

export default function Skeleton({ className = "", label }: SkeletonProps) {
  return (
    <span
      className={`skeleton inline-block rounded-md ${className}`}
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
    />
  );
}
