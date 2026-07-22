// Typed client for the Senior Academy Laravel backend (public /api/v1 API).
//
// Every call here runs server-side (route handlers + server components), so the
// browser never talks to Laravel directly and no CORS config is required.
// Point it at the backend with the BACKEND_URL env var (see .env.example).

import { CertificateRecord, Course, InstructorReview } from "./types";

const BACKEND_URL = (
  process.env.BACKEND_URL ?? "http://127.0.0.1:8000"
).replace(/\/$/, "");

function apiUrl(path: string): string {
  return `${BACKEND_URL}/api/v1/${path.replace(/^\//, "")}`;
}

const JSON_HEADERS = { Accept: "application/json" } as const;

// ---- Raw payload shapes (exactly what the Laravel API Resources emit) ----

interface RawCourse {
  id: number;
  title: string;
  level: string | null;
  lectures_count: number;
  students_count: number;
  syllabus_url: string | null;
  cover_image_url: string | null;
}

interface RawInstructorReview {
  id: number;
  instructor_name: string;
  instructor_title: string;
  review_text: string;
  photo_url: string | null;
}

interface RawCertificate {
  id: number;
  certificate_code: string;
  student_name: string;
  course_title: string;
  academy_name: string;
  completion_percentage: number;
  completion_date: string | null;
  duration_weeks: number;
  status: string;
  is_verified: boolean;
  video_url: string | null;
  pdf_url: string | null;
  instructor_reviews?: RawInstructorReview[];
}

// ---- Mappers: raw snake_case -> camelCase view models ----

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapCourse(c: RawCourse): Course {
  return {
    id: c.id,
    slug: slugify(c.title) || String(c.id),
    title: c.title,
    level: c.level,
    lecturesCount: c.lectures_count,
    studentsCount: c.students_count,
    syllabusUrl: c.syllabus_url,
    coverImageUrl: c.cover_image_url,
  };
}

function mapReview(r: RawInstructorReview): InstructorReview {
  return {
    id: r.id,
    name: r.instructor_name,
    title: r.instructor_title,
    quote: r.review_text,
    photoUrl: r.photo_url,
  };
}

function mapCertificate(c: RawCertificate): CertificateRecord {
  return {
    id: c.certificate_code,
    status: c.is_verified ? "verified" : "pending",
    studentName: c.student_name,
    courseName: c.course_title,
    academyName: c.academy_name,
    completionPercent: c.completion_percentage,
    issueDate: c.completion_date ?? "",
    durationWeeks: c.duration_weeks,
    videoUrl: c.video_url,
    pdfUrl: c.pdf_url,
    instructorReviews: (c.instructor_reviews ?? []).map(mapReview),
  };
}

// ---- Public API ----

export type CertificateResult =
  | { status: "verified"; record: CertificateRecord }
  | { status: "pending"; code: string; message: string }
  | { status: "not_found" }
  | { status: "error"; message: string };

/**
 * Fetch a full certificate by its code. Mirrors the three backend outcomes:
 * verified (full record), pending (lightweight message), or missing (404).
 */
export async function getCertificate(code: string): Promise<CertificateResult> {
  let res: Response;
  try {
    res = await fetch(apiUrl(`certificates/${encodeURIComponent(code)}`), {
      cache: "no-store",
      headers: JSON_HEADERS,
    });
  } catch {
    return { status: "error", message: "Could not reach the certificate service." };
  }

  if (res.status === 404) return { status: "not_found" };
  if (!res.ok) return { status: "error", message: `Backend returned ${res.status}.` };

  const body = await res.json().catch(() => null);
  if (!body) return { status: "error", message: "Malformed response from backend." };

  // Verified certificates come back wrapped in a `data` envelope.
  if (body.data) {
    return { status: "verified", record: mapCertificate(body.data as RawCertificate) };
  }

  // Pending certificates come back flat, with a status + message, no `data`.
  if (body.status && body.status !== "verified") {
    return {
      status: "pending",
      code: body.certificate_code ?? code,
      message: body.message ?? "This certificate is pending verification.",
    };
  }

  return { status: "not_found" };
}

/**
 * Lightweight existence/status check used before navigating to the full page.
 * Backed by GET /api/v1/certificates/verify.
 */
export async function verifyCertificate(
  code: string
): Promise<{ exists: boolean; status: string | null }> {
  let res: Response;
  try {
    res = await fetch(
      apiUrl(`certificates/verify?code=${encodeURIComponent(code)}`),
      { cache: "no-store", headers: JSON_HEADERS }
    );
  } catch {
    return { exists: false, status: null };
  }

  if (!res.ok) return { exists: false, status: null };

  const body = await res.json().catch(() => null);
  return {
    exists: Boolean(body?.exists),
    status: body?.status ?? null,
  };
}

/**
 * Recommended courses for the landing + certificate pages, from the bundled
 * GET /api/v1/home payload. Returns an empty list if the backend is unreachable
 * so the pages degrade gracefully instead of throwing.
 */
export async function getCourses(): Promise<Course[]> {
  let res: Response;
  try {
    res = await fetch(apiUrl("home"), {
      next: { revalidate: 300 },
      headers: JSON_HEADERS,
    });
  } catch {
    return [];
  }

  if (!res.ok) return [];

  const body = await res.json().catch(() => null);
  const courses = body?.data?.courses;
  return Array.isArray(courses) ? (courses as RawCourse[]).map(mapCourse) : [];
}
