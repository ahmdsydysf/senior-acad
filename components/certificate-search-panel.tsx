"use client";

import { useRef, useState, FormEvent } from "react";
import Hero from "@/components/hero";
import HeroSearchForm from "@/components/hero-search-form";
import PanelShell from "@/components/panel-shell";
import EmptyRecordCard from "@/components/empty-record-card";
import CertificateRecordBody from "@/components/certificate-record-body";
import type { CertificateResult } from "@/lib/api";
import type { GeneralData } from "@/lib/types";

type State =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "result"; id: string; result: CertificateResult };

export default function CertificateSearchPanel({
  about,
}: {
  about?: GeneralData["about"] | null;
}) {
  const [certId, setCertId] = useState("");
  const [state, setState] = useState<State>({ phase: "idle" });

  // Guards against out-of-order responses: a slow first lookup must not
  // overwrite the result of a faster second one.
  const latestRequest = useRef(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = certId.trim();
    if (!id) return;

    const requestId = ++latestRequest.current;
    setState({ phase: "loading" });

    try {
      // basePath is applied to <Link>/router/next-image automatically, but not
      // to hand-written fetch URLs — prefix it explicitly.
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/api/certificates/${encodeURIComponent(id)}`
      );
      const result = (await res.json().catch(() => null)) as
        | CertificateResult
        | null;

      if (requestId !== latestRequest.current) return;

      setState({
        phase: "result",
        id,
        result: result ?? {
          status: "error",
          message: "Something went wrong looking that up. Please try again.",
        },
      });
    } catch {
      if (requestId !== latestRequest.current) return;
      setState({
        phase: "result",
        id,
        result: {
          status: "error",
          message: "Something went wrong looking that up. Please try again.",
        },
      });
    }
  }

  const eyebrow =
    state.phase === "result" && state.result.status === "verified"
      ? `Certificate Record — ${state.result.record.id}`
      : state.phase === "result"
      ? `Certificate Record — ${state.id}`
      : "Certificate Record";

  return (
    <>
      <Hero about={about}>
        <HeroSearchForm
          value={certId}
          onChange={setCertId}
          onSubmit={handleSubmit}
          loading={state.phase === "loading"}
          mission={about?.mission}
        />
      </Hero>

      <PanelShell eyebrow={eyebrow}>
        {/* Announced to screen readers when the result swaps in, since no
            navigation happens to move focus. */}
        <div aria-live="polite" aria-busy={state.phase === "loading"}>
          <PanelBody state={state} />
        </div>
      </PanelShell>
    </>
  );
}

function PanelBody({ state }: { state: State }) {
  if (state.phase === "idle") {
    return (
      <EmptyRecordCard
        message="Enter Certificate ID for results to load here…"
        tone="idle"
      />
    );
  }

  if (state.phase === "loading") {
    return <EmptyRecordCard message="Checking that certificate ID…" tone="loading" />;
  }

  const { result, id } = state;

  switch (result.status) {
    case "verified":
      return <CertificateRecordBody record={result.record} />;
    case "pending":
      return <EmptyRecordCard message={result.message} tone="idle" />;
    case "not_found":
      return (
        <EmptyRecordCard
          message={`No certificate found for "${id}". Check the ID and try again.`}
          tone="error"
        />
      );
    default:
      return <EmptyRecordCard message={result.message} tone="error" />;
  }
}
