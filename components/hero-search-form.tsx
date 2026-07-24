"use client";

import { FormEvent, useState } from "react";

const FALLBACK_MISSION = "Trusted & secured by Senior Academy technology";

/**
 * Owns the input's value itself rather than lifting it to the page.
 *
 * Keystrokes are the highest-frequency state change on the site; keeping them
 * local means typing re-renders only this form, not the hero, the logo or the
 * certificate panel above/below it. The parent hears about the value once, on
 * submit.
 */
export default function HeroSearchForm({
  defaultValue = "",
  onSearch,
  loading = false,
  mission,
}: {
  defaultValue?: string;
  onSearch: (id: string) => void;
  loading?: boolean;
  mission?: string | null;
}) {
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // Without this the browser performs a native form GET — a full page reload.
    e.preventDefault();
    const id = value.trim();
    if (id) onSearch(id);
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-2xl flex-col gap-2.5 rounded-[1.75rem] bg-cream-card p-2 shadow-[0_8px_30px_-12px_rgba(28,31,43,0.25)] ring-1 ring-line transition-all duration-300 focus-within:ring-2 focus-within:ring-maroon/50 focus-within:shadow-[0_10px_40px_-10px_rgba(171,13,16,0.35)] sm:flex-row sm:items-center sm:gap-3 sm:rounded-full"
      >
        <div className="flex min-h-[48px] flex-1 items-center gap-2 px-3 py-3 sm:px-4 sm:py-2">
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4 shrink-0 text-ink-soft"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="M17.5 17.5 13.5 13.5" strokeLinecap="round" />
          </svg>
          <label htmlFor="cert-id" className="sr-only">
            Certificate ID
          </label>
          <input
            id="cert-id"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter Certificate ID"
            autoComplete="off"
            className="w-full bg-transparent font-body text-base text-ink placeholder:text-ink-soft outline-none sm:text-sm"
          />
          <span className="hidden shrink-0 font-mono text-xs text-ink-soft/70 sm:inline">
            e.g., C037-10224
          </span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-sheen group inline-flex w-full items-center justify-center gap-2 rounded-[1.2rem] bg-maroon px-6 py-3.5 font-body text-sm font-medium text-cream-card transition-all duration-300 hover:bg-maroon-deep hover:shadow-[0_8px_24px_-8px_rgba(171,13,16,0.6)] active:scale-95 disabled:opacity-60 sm:w-auto sm:rounded-full"
        >
          {loading ? (
            <svg viewBox="0 0 20 20" className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 3a7 7 0 1 1-7 7" strokeLinecap="round" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="M17.5 17.5 13.5 13.5" strokeLinecap="round" />
            </svg>
          )}
          {loading ? "Searching…" : "Search & Verify"}
        </button>
      </form>

      <div className="mt-4 flex justify-center px-1">
        <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border border-line bg-cream-card px-4 py-2 text-center font-mono text-[11px] leading-relaxed text-ink transition-colors duration-300 hover:border-gold-deep/40 hover:text-ink sm:px-4 sm:py-1.5">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-gold-deep" fill="currentColor">
            <path d="M10 1.5 3 4.5v5c0 5 3 8.5 7 9.5 4-1 7-4.5 7-9.5v-5L10 1.5Z" />
          </svg>
          {mission || FALLBACK_MISSION}
        </span>
      </div>
    </div>
  );
}
