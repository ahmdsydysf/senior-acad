import { CertificateRecord } from "@/lib/types";
import CertificateRecordCard from "@/components/certificate-record-card";
import InterviewVideoCard from "@/components/interview-video-card";
import TestimonialCard from "@/components/testimonial-card";

/**
 * The contents of the maroon "Certificate Record" panel for a verified
 * certificate. Shared by the dedicated /certificate/[id] page and the inline
 * search result on the homepage, so both stay identical.
 */
export default function CertificateRecordBody({
  record,
}: {
  record: CertificateRecord;
}) {
  const reviews = record.instructorReviews.slice(0, 2);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <CertificateRecordCard record={record} />

      <div className="flex flex-col gap-6">
        <InterviewVideoCard
          studentName={record.studentName}
          videoUrl={record.videoUrl}
        />
        {reviews.map((review) => (
          <TestimonialCard
            key={review.id}
            name={review.name}
            role={review.title}
            quote={review.quote}
          />
        ))}
      </div>
    </div>
  );
}
