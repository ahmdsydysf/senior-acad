import { notFound } from "next/navigation";
import { Course } from "@/lib/types";
import { getCertificate, getCourses, getGeneralData } from "@/lib/api";
import CertificateExplorer from "@/components/certificate-explorer";
import CourseCard from "@/components/course-card";

function RecommendedCourses({ courses }: { courses: Course[] }) {
  if (courses.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-2xl text-ink">
          Advance your career:{" "}
          <span className="text-maroon">Next Recommended</span> Courses
        </h2>
        {/* Hidden until there is an all-courses page to link to.
            Restoring this also needs `import Link from "next/link"` back.
        <Link
          href="/#courses"
          className="hidden rounded-full border border-maroon/40 bg-cream-card px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink transition hover:-translate-y-0.5 hover:border-maroon hover:bg-maroon hover:text-cream-card hover:shadow-md sm:inline"
        >
          View all courses
        </Link>
        */}
      </div>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
        Recommended for you
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </div>
    </section>
  );
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [result, courses, general] = await Promise.all([
    getCertificate(id),
    getCourses(),
    getGeneralData(),
  ]);

  // A bad or unreachable code still 404s on a direct hit, rather than
  // rendering an empty record panel.
  if (result.status === "not_found" || result.status === "error") {
    notFound();
  }

  return (
    <>
      {/*
        Same component the homepage uses, seeded with the server-rendered
        result. Deep links render the record without waiting for JS, and
        searching from here swaps the panel in place instead of navigating.
      */}
      <CertificateExplorer
        about={general?.about}
        initialId={result.status === "verified" ? result.record.id : result.code}
        initialResult={result}
      />

      <RecommendedCourses courses={courses} />
    </>
  );
}
