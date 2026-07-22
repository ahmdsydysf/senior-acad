"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/hero";
import HeroSearchForm from "@/components/hero-search-form";
import PanelShell from "@/components/panel-shell";
import EmptyRecordCard from "@/components/empty-record-card";
import type { GeneralData } from "@/lib/types";

type Phase = "idle" | "loading" | "not_found" | "error";

export default function CertificateSearchPanel({
  about,
}: {
  about?: GeneralData["about"] | null;
}) {
  const router = useRouter();
  const [certId, setCertId] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = certId.trim();
    if (!id) return;

    setPhase("loading");
    try {
      // basePath is applied to <Link>/router/next-image automatically, but not
      // to hand-written fetch URLs — prefix it explicitly.
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/api/certificates/${encodeURIComponent(id)}`
      );
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
      <Hero about={about}>
        <HeroSearchForm
          value={certId}
          onChange={setCertId}
          onSubmit={handleSubmit}
          loading={phase === "loading"}
          mission={about?.mission}
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
    </>
  );
}
