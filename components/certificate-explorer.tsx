"use client";

import { useRef, useState, FormEvent } from "react";
import Hero from "@/components/hero";
import HeroSearchForm from "@/components/hero-search-form";
import PanelShell from "@/components/panel-shell";
import EmptyRecordCard from "@/components/empty-record-card";
import CertificateRecordBody from "@/components/certificate-record-body";
import type { CertificateResult } from "@/lib/api";
import type { GeneralData } from "@/lib/types";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type State =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "result"; id: string; result: CertificateResult };

/**
 * Hero + search box + the "Certificate Record" panel.
 *
 * Used by both the homepage and /certificate/[id]: searching never navigates,
 * it swaps only the panel body. The certificate page seeds it with a
 * server-rendered result so deep links still work without JavaScript running
 * first, and so search engines see the record.
 */
export default function CertificateExplorer({
  about,
  initialId = "",
  initialResult = null,
}: {
  about?: GeneralData["about"] | null;
  initialId?: string;
  initialResult?: CertificateResult | null;
}) {
  const [certId, setCertId] = useState(initialId);
  const [state, setState] = useState<State>(() =>
    initialResult && initialId
      ? { phase: "result", id: initialId, result: initialResult }
      : { phase: "idle" }
  );

  // Guards against out-of-order responses: a slow first lookup must not
  // overwrite the result of a faster second one.
  const latestRequest = useRef(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // Without this the browser performs a native form GET, which is a full
    // page reload.
    e.preventDefault();

    const id = certId.trim();
    if (!id) return;

    const requestId = ++latestRequest.current;
    setState({ phase: "loading" });

    let result: CertificateResult;
    try {
      // basePath is applied to <Link>/router/next-image automatically, but not
      // to hand-written fetch URLs — prefix it explicitly.
      const res = await fetch(
        `${BASE_PATH}/api/certificates/${encodeURIComponent(id)}`
      );
      result = ((await res.json().catch(() => null)) as CertificateResult) ?? {
        status: "error",
        message: "Something went wrong looking that up. Please try again.",
      };
    } catch {
      result = {
        status: "error",
        message: "Something went wrong looking that up. Please try again.",
      };
    }

    if (requestId !== latestRequest.current) return;

    setState({ phase: "result", id, result });

    // Keep the address bar honest without navigating, so the result stays
    // shareable and a refresh renders the same certificate server-side.
    if (result.status === "verified" || result.status === "pending") {
      window.history.replaceState(
        null,
        "",
        `${BASE_PATH}/certificate/${encodeURIComponent(id)}`
      );
    }
  }

  const eyebrow =
    state.phase === "result"
      ? `Certificate Record — ${
          state.result.status === "verified" ? state.result.record.id : state.id
        }`
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
    return (
      <EmptyRecordCard message="Checking that certificate ID…" tone="loading" />
    );
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
