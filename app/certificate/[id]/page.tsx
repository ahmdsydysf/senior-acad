import Link from "next/link";
import { notFound } from "next/navigation";
import { CertificateRecord, Course, GeneralData } from "@/lib/types";
import { getCertificate, getCourses, getGeneralData } from "@/lib/api";
import Hero from "@/components/hero";
import QuickSearch from "@/components/quick-search";
import PanelShell from "@/components/panel-shell";
import EmptyRecordCard from "@/components/empty-record-card";
import CertificateRecordBody from "@/components/certificate-record-body";
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
        <Link
          href="/#courses"
          className="hidden rounded-full border border-maroon/40 bg-cream-card px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink transition hover:-translate-y-0.5 hover:border-maroon hover:bg-maroon hover:text-cream-card hover:shadow-md sm:inline"
        >
          View all courses
        </Link>
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

function CertificatePageContent({
  record,
  courses,
  about,
}: {
  record: CertificateRecord;
  courses: Course[];
  about?: GeneralData["about"] | null;
}) {
  return (
    <>
      <Hero about={about}>
        <QuickSearch initialId={record.id} mission={about?.mission} />
      </Hero>

      <PanelShell eyebrow={`Certificate Record — ${record.id}`}>
        <CertificateRecordBody record={record} />
      </PanelShell>

      <RecommendedCourses courses={courses} />
    </>
  );
}

function PendingNotice({
  id,
  message,
  about,
}: {
  id: string;
  message: string;
  about?: GeneralData["about"] | null;
}) {
  return (
    <>
      <Hero about={about}>
        <QuickSearch initialId={id} mission={about?.mission} />
      </Hero>
      <PanelShell eyebrow={`Certificate Record — ${id}`}>
        <EmptyRecordCard message={message} tone="idle" />
      </PanelShell>
    </>
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

  if (result.status === "verified") {
    return (
      <CertificatePageContent
        record={result.record}
        courses={courses}
        about={general?.about}
      />
    );
  }

  if (result.status === "pending") {
    return (
      <PendingNotice
        id={result.code}
        message={result.message}
        about={general?.about}
      />
    );
  }

  // not_found or error -> render the framework 404.
  notFound();
}
