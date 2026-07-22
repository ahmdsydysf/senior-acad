export type CertificateStatus = "verified" | "not_found" | "revoked";

export interface RecommendedCourse {
  slug: string;
  title: string;
  track: string;
  hours: number;
  studentsEnrolled: number;
  syllabusUrl: string;
}

export interface CertificateRecord {
  id: string; // e.g. "CERT-12294"
  status: CertificateStatus;
  studentName: string;
  courseName: string;
  track: string;
  completionPercent: number;
  moduleScore: number; // out of 100
  issueDate: string; // ISO date
  durationWeeks: number;
  instructor: {
    name: string;
    title: string;
    quote: string;
  };
  recommendedCourses: RecommendedCourse[];
}
