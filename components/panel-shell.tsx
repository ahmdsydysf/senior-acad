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
      <div className="mx-auto max-w-6xl px-6 py-12">
        {eyebrow && (
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-cream-card/70">
            {eyebrow}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
