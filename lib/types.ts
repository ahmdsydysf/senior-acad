// View-model types consumed by the UI. These are the camelCase shapes the
// components use; the raw snake_case payloads from the Laravel backend are
// mapped into these in `lib/api.ts`.

export type CertificateStatus = "verified" | "pending";

export interface InstructorReview {
  id: number;
  name: string;
  title: string;
  quote: string;
  photoUrl: string | null;
}

export interface CertificateRecord {
  id: string; // the alphanumeric certificate_code, e.g. "DERT-12294"
  status: CertificateStatus;
  studentName: string;
  courseName: string;
  academyName: string;
  completionPercent: number;
  issueDate: string; // ISO date (may be empty if the backend has none)
  durationWeeks: number;
  videoUrl: string | null;
  pdfUrl: string | null;
  instructorReviews: InstructorReview[];
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  level: string | null;
  lecturesCount: number;
  studentsCount: number;
  syllabusUrl: string | null;
  coverImageUrl: string | null;
}

export interface GeneralData {
  about: {
    heading: string | null;
    subLogo: string | null;
    body: string | null;
    mission: string | null;
  };
  contact: {
    subTitle: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    social: {
      facebook: string | null;
      twitter: string | null;
      linkedin: string | null;
    };
  };
}
