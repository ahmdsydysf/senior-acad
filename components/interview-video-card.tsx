export default function InterviewVideoCard({
  studentName,
}: {
  studentName: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-maroon-card-line bg-maroon-card">
      <div className="flex items-center justify-between px-5 pt-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream-card/70">
          Interview video
        </p>
      </div>

      <div className="relative mx-5 mt-3 mb-5 flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-[#3a2530] via-[#241318] to-[#120a0d]">
        <p className="absolute left-4 top-3 font-mono text-[11px] text-cream-card/50">
          {studentName}
        </p>
        <button
          type="button"
          aria-label="Play interview video"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-cream-card/95 text-maroon transition hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        <div className="absolute inset-x-4 bottom-3 flex items-center gap-3 text-cream-card/70">
          <span className="font-mono text-[10px]">00:00</span>
          <span className="h-0.5 flex-1 rounded-full bg-cream-card/25" />
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M4 8v4h3l4 4V4L7 8H4Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
