import { notFound } from "next/navigation";
import { CertificateRecord } from "@/lib/types";
import { lookupCertificate } from "@/lib/mock-data";
import Hero from "@/components/hero";
import QuickSearch from "@/components/quick-search";
import PanelShell from "@/components/panel-shell";
import CertificateRecordCard from "@/components/certificate-record-card";
import InterviewVideoCard from "@/components/interview-video-card";
import TestimonialCard from "@/components/testimonial-card";
import CourseCard from "@/components/course-card";

function getBackendUrl() {
  const url = process.env.BACKEND_URL;
  return url?.replace(/\/$/, "");
}

function CertificatePageContent({ record }: { record: CertificateRecord }) {
  return (
    <>
      <Hero>
        <QuickSearch initialId={record.id} />
      </Hero>

      <PanelShell eyebrow={`Certificate Record — ${record.id}`}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <CertificateRecordCard record={record} />

          <div className="flex flex-col gap-6">
            <InterviewVideoCard studentName={record.studentName} />
            <TestimonialCard
              name={record.instructor.name}
              role={record.instructor.title}
              quote={record.instructor.quote}
            />
            <TestimonialCard
              name={record.instructor.name}
              role={record.instructor.title}
              quote="Consistently proactive in code review, and quick to turn feedback into cleaner, better-tested pull requests."
            />
          </div>
        </div>
      </PanelShell>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl text-ink">
            Advance your career:{" "}
            <span className="text-maroon">Next Recommended</span> Courses
          </h2>
          <a
            href="#"
            className="hidden rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink-soft transition hover:border-maroon hover:text-maroon sm:inline"
          >
            View all courses
          </a>
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
          Recommended for you
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {record.recommendedCourses.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mockRecord = lookupCertificate(id);
  if (mockRecord) {
    return <CertificatePageContent record={mockRecord} />;
  }

  const backendUrl = getBackendUrl();
  if (!backendUrl) {
    notFound();
  }

  const res = await fetch(
    `${backendUrl}/api/certificates/${encodeURIComponent(id)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const record = (await res.json()) as CertificateRecord;
  return <CertificatePageContent record={record} />;
}
