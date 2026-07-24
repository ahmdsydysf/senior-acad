import { ReactNode } from "react";

export default function PanelShell({
  eyebrow,
  children,
}: {
  eyebrow?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="panel-texture bg-maroon-panel">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        {eyebrow && (
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-cream-card/70 sm:mb-6 sm:text-xs">
            {eyebrow}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
