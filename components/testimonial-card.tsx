export default function TestimonialCard({
  name,
  role,
  quote,
}: {
  name: string;
  role: string;
  quote: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="rounded-2xl border border-maroon-card-line bg-[#e6d0bf] p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-maroon font-mono text-xs text-cream-card">
            {initials}
          </span>
          <p className="font-body text-sm font-medium text-ink">{name}</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#987233] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-cream-card">
          {role}
        </span>
      </div>
      <p className="mt-3 font-body text-sm italic leading-relaxed text-ink">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}
