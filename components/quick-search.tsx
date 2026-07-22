"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import HeroSearchForm from "@/components/hero-search-form";

export default function QuickSearch({ initialId = "" }: { initialId?: string }) {
  const router = useRouter();
  const [certId, setCertId] = useState(initialId);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = certId.trim();
    if (!id) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/certificates/${encodeURIComponent(id)}`);
      if (res.ok) {
        router.push(`/certificate/${encodeURIComponent(id)}`);
        return;
      }
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <HeroSearchForm
      value={certId}
      onChange={setCertId}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
}
