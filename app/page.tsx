"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/hero";
import HeroSearchForm from "@/components/hero-search-form";
import PanelShell from "@/components/panel-shell";
import EmptyRecordCard from "@/components/empty-record-card";
import CourseCard from "@/components/course-card";
import { RECOMMENDED_COURSES } from "@/lib/mock-data";

type Phase = "idle" | "loading" | "not_found" | "error";

export default function Home() {
  const router = useRouter();
  const [certId, setCertId] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = certId.trim();
    if (!id) return;

    setPhase("loading");
    try {
      const res = await fetch(`/api/certificates/${encodeURIComponent(id)}`);
      if (res.status === 404) {
        setPhase("not_found");
        return;
      }
      if (!res.ok) {
        setPhase("error");
        return;
      }
      router.push(`/certificate/${encodeURIComponent(id)}`);
    } catch {
      setPhase("error");
    }
  }

  const panelMessage =
    phase === "loading"
      ? "Checking that certificate ID…"
      : phase === "not_found"
      ? `No certificate found for "${certId.trim()}". Check the ID and try again.`
      : phase === "error"
      ? "Something went wrong looking that up. Please try again."
      : "Enter Certificate ID for results to load here…";

  return (
    <>
      <Hero>
        <HeroSearchForm
          value={certId}
          onChange={setCertId}
          onSubmit={handleSubmit}
          loading={phase === "loading"}
        />
      </Hero>

      <PanelShell eyebrow="Certificate Record">
        <EmptyRecordCard
          message={panelMessage}
          tone={
            phase === "not_found" || phase === "error"
              ? "error"
              : phase === "loading"
              ? "loading"
              : "idle"
          }
        />
      </PanelShell>

      <section id="courses" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl text-ink">
            Advance your career:{" "}
            <span className="text-maroon">Next Recommended</span> Courses
          </h2>
          <a
            href="#"
            className="hidden rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-maroon hover:text-maroon hover:shadow-md sm:inline"
          >
            View all courses
          </a>
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
          Recommended for you
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RECOMMENDED_COURSES.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
