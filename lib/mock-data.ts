import { CertificateRecord, RecommendedCourse } from "./types";

/**
 * Demo data store for local UI previews.
 *
 * Replace `lookupCertificate` with a call to your real backend / outside
 * API once it exists. Keep the return shape (CertificateRecord | null)
 * the same and every page that consumes it keeps working unchanged.
 */

export const RECOMMENDED_COURSES: RecommendedCourse[] = [
  {
    slug: "advanced-microservices-architecture",
    title: "Advanced Microservices Architecture",
    track: "Backend Engineering",
    hours: 34,
    studentsEnrolled: 2340,
    syllabusUrl: "/courses/advanced-microservices-architecture",
  },
  {
    slug: "system-design-at-scale",
    title: "Mastering System Design & Architecture at Scale",
    track: "Software Architecture",
    hours: 42,
    studentsEnrolled: 1980,
    syllabusUrl: "/courses/system-design-at-scale",
  },
  {
    slug: "devops-cloud-native-production",
    title: "DevOps: Cloud-Native Production Systems",
    track: "Platform & Cloud",
    hours: 38,
    studentsEnrolled: 1710,
    syllabusUrl: "/courses/devops-cloud-native-production",
  },
  {
    slug: "ai-product-engineering",
    title: "AI Product Engineering for Modern Teams",
    track: "Product & AI",
    hours: 24,
    studentsEnrolled: 1160,
    syllabusUrl: "/courses/ai-product-engineering",
  },
  {
    slug: "secure-software-delivery",
    title: "Secure Software Delivery in Practice",
    track: "Security Engineering",
    hours: 19,
    studentsEnrolled: 980,
    syllabusUrl: "/courses/secure-software-delivery",
  },
];

export const SAMPLE_CERTIFICATE_IDS = ["CERT-12294", "CERT-23871", "CERT-40512"];

const CERTIFICATES: Record<string, CertificateRecord> = {
  "CERT-12294": {
    id: "CERT-12294",
    status: "verified",
    studentName: "Alex Jehaven",
    courseName: "Full-Stack Engineering — Senior Track",
    track: "Software & Systems",
    completionPercent: 100,
    moduleScore: 94,
    issueDate: "2022-06-12",
    durationWeeks: 14,
    instructor: {
      name: "Dr. Katrin Meneour",
      title: "IT Instructor, Senior Academy",
      quote:
        "Alex demonstrated strong, consistent problem-solving throughout the cohort, with clean architecture decisions and reliable delivery on every project milestone.",
    },
    recommendedCourses: RECOMMENDED_COURSES,
  },
  "CERT-23871": {
    id: "CERT-23871",
    status: "verified",
    studentName: "Maya Chen",
    courseName: "Data Engineering — Advanced Track",
    track: "Data & Analytics",
    completionPercent: 88,
    moduleScore: 91,
    issueDate: "2023-08-18",
    durationWeeks: 12,
    instructor: {
      name: "Prof. Nia Solberg",
      title: "Lead Data Instructor, Senior Academy",
      quote:
        "Maya built reliable, production-ready data pipelines and communicated tradeoffs clearly in every sprint review.",
    },
    recommendedCourses: RECOMMENDED_COURSES.slice(0, 4),
  },
  "CERT-40512": {
    id: "CERT-40512",
    status: "verified",
    studentName: "Jordan Alvarez",
    courseName: "Product Design Systems — Leadership",
    track: "Design & Product",
    completionPercent: 96,
    moduleScore: 97,
    issueDate: "2024-01-24",
    durationWeeks: 10,
    instructor: {
      name: "Samira Brooks",
      title: "Design Systems Mentor, Senior Academy",
      quote:
        "Jordan combined thoughtful design strategy with practical execution, leading the team through a polished launch experience.",
    },
    recommendedCourses: RECOMMENDED_COURSES.slice(1),
  },
};

export function lookupCertificate(id: string): CertificateRecord | null {
  const normalized = id.trim().toUpperCase();
  return CERTIFICATES[normalized] ?? null;
}
