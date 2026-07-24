import CertificateExplorer from "@/components/certificate-explorer";
import CourseCard from "@/components/course-card";
import { getCourses, getGeneralData } from "@/lib/api";

export default async function Home() {
  const [courses, general] = await Promise.all([getCourses(), getGeneralData()]);

  return (
    <>
      <CertificateExplorer about={general?.about} />

      <section id="courses" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-2xl font-display text-xl leading-tight text-ink sm:text-2xl">
            Advance your career:{" "}
            <span className="text-maroon">Next Recommended</span> Courses
          </h2>
          {/* Hidden until there is an all-courses page to link to.
          <a
            href="#"
            className="hidden rounded-full border border-maroon/40 bg-cream-card px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-maroon hover:bg-maroon hover:text-cream-card hover:shadow-md sm:inline"
          >
            View all courses
          </a>
          */}
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
          Recommended for you
        </p>

        {courses.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        ) : (
          <p className="mt-8 font-body text-sm text-ink-soft">
            Courses are unavailable right now. Please try again later.
          </p>
        )}
      </section>
    </>
  );
}
