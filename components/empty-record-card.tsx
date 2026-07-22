export default function EmptyRecordCard({
  message = "Enter Certificate ID for results to load here…",
  tone = "idle",
}: {
  message?: string;
  tone?: "idle" | "loading" | "error";
}) {
  return (
    <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-3xl border border-maroon-card-line bg-maroon-card/40 px-6 py-20">
      {/* big academy-themed watermark icons */}
      {/* graduation cap */}
      <svg
        viewBox="0 0 64 64"
        className="anim-float absolute left-8 top-8 h-28 w-28 text-cream-card/10 -rotate-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 12 4 26l28 14 28-14L32 12Z" fill="currentColor" stroke="none" opacity=".7" />
        <path d="M16 32v12c0 4 7 8 16 8s16-4 16-8V32" />
        <path d="M56 28v14" />
        <circle cx="56" cy="45" r="2.5" fill="currentColor" stroke="none" />
      </svg>
      {/* diploma scroll with ribbon */}
      <svg
        viewBox="0 0 64 64"
        className="anim-float-slow absolute bottom-8 left-14 h-24 w-24 text-cream-card/10 rotate-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 14h36a5 5 0 0 1 0 10H14a5 5 0 0 1 0-10Z" />
        <path d="M14 24v22a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V24" />
        <path d="M24 34h16M24 40h10" />
        <circle cx="44" cy="44" r="5" fill="currentColor" stroke="none" />
        <path d="M41 47.5 39.5 56l4.5-3 4.5 3-1.5-8.5" fill="currentColor" stroke="none" />
      </svg>
      {/* award medal */}
      <svg
        viewBox="0 0 64 64"
        className="anim-float-slow absolute right-12 top-10 h-24 w-24 text-cream-card/10 rotate-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m22 6 6 14M42 6l-6 14M18 6h10M36 6h10" />
        <circle cx="32" cy="36" r="14" />
        <path
          d="m32 28 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L32 28Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
      {/* open book */}
      <svg
        viewBox="0 0 64 64"
        className="anim-float absolute bottom-8 right-8 h-28 w-28 text-cream-card/10 -rotate-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 16c-5-4-12-5-20-5v36c8 0 15 1 20 5 5-4 12-5 20-5V11c-8 0-15 1-20 5Z" />
        <path d="M32 16v36" />
        <path d="M18 20c3 0 6 .5 9 1.5M18 27c3 0 6 .5 9 1.5M18 34c3 0 6 .5 9 1.5M37 21.5c3-1 6-1.5 9-1.5M37 28.5c3-1 6-1.5 9-1.5M37 35.5c3-1 6-1.5 9-1.5" strokeWidth="1.8" />
      </svg>

      <div
        className={`anim-scale-in relative z-10 flex max-w-sm flex-col items-center rounded-2xl bg-cream-card px-10 py-8 text-center shadow-xl transition-shadow duration-300 hover:shadow-2xl ${
          tone === "loading" ? "animate-pulse" : ""
        }`}
      >
        <svg
          viewBox="0 0 48 40"
          className={`h-12 w-14 ${
            tone === "error" ? "text-maroon" : "text-ink-soft"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          {/* certificate card */}
          <rect x="6" y="5" width="36" height="24" rx="3" />
          {/* portrait */}
          <circle cx="16" cy="13" r="3" />
          <path d="M10.5 22c1-3.5 3-5 5.5-5s4.5 1.5 5.5 5" strokeLinecap="round" />
          {/* text lines */}
          <path d="M26 11h11M26 15h11M26 19h7" strokeLinecap="round" />
          {/* award ribbon seal */}
          <circle cx="33" cy="27" r="4.5" fill="currentColor" stroke="none" />
          <path
            d="M30.5 30.5 29 37l4-2.5L37 37l-1.5-6.5"
            fill="currentColor"
            stroke="none"
          />
        </svg>
        <p
          className={`mt-4 font-body text-sm ${
            tone === "error" ? "text-maroon" : "text-ink-soft"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
