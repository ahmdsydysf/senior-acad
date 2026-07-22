import Link from "next/link";
import { Course } from "@/lib/types";

const THUMB_GRADIENTS = [
  "from-[#2b2440] via-[#1a1730] to-[#0d0c1a]",
  "from-[#402430] via-[#241420] to-[#120a10]",
  "from-[#20303f] via-[#141f2a] to-[#0a1015]",
];

export default function CourseCard({
  course,
  index = 0,
}: {
  course: Course;
  index?: number;
}) {
  const gradient = THUMB_GRADIENTS[index % THUMB_GRADIENTS.length];
  const level = course.level ?? "Course";
  const href = course.syllabusUrl ?? "#";

  return (
    <div className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-line bg-cream-card">
      <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-maroon px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-cream-card transition-transform duration-300 group-hover:scale-105">
          {level}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold-deep">
            {level}
          </p>
          <h3 className="mt-1.5 font-display text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-maroon">
            {course.title}
          </h3>

          <div className="mt-3 flex items-center gap-4 font-mono text-xs text-ink-soft">
            <span className="inline-flex items-center gap-1">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="2.5" y="2.5" width="11" height="11" rx="1.2" />
                <path d="M5 6h6M5 8.5h6M5 11h4" strokeLinecap="round" />
              </svg>
              {course.lecturesCount} lectures
            </span>
            <span className="inline-flex items-center gap-1">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="6" cy="6" r="2.2" />
                <path d="M2 13c.5-2.5 2-3.5 4-3.5s3.5 1 4 3.5" strokeLinecap="round" />
                <circle cx="12" cy="6.5" r="1.8" />
                <path d="M11 9.7c1.7.3 2.6 1.3 3 3.3" strokeLinecap="round" />
              </svg>
              {course.studentsCount.toLocaleString()}
            </span>
          </div>
        </div>

        <Link
          href={href}
          className="btn-sheen mt-5 inline-flex items-center justify-center gap-1.5 rounded-full border border-maroon px-4 py-2 font-body text-sm text-maroon transition-all duration-300 hover:bg-maroon hover:text-cream-card hover:shadow-[0_6px_18px_-6px_rgba(171,13,16,0.5)] active:scale-95"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2.5" y="2" width="11" height="12" rx="1.2" />
            <path d="M5 5.5h6M5 8h6M5 10.5h4" strokeLinecap="round" />
          </svg>
          View Syllabus
        </Link>
      </div>
    </div>
  );
}
