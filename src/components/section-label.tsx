import type { ReactNode } from "react";
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="section-top flex items-center justify-between">
      <p className="eyebrow">{children}</p>
      <span className="section-marker shrink-0" aria-hidden="true">
        ↗
      </span>
    </div>
  );
}
