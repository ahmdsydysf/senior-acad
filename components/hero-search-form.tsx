"use client";

import { FormEvent } from "react";

export default function HeroSearchForm({
  value,
  onChange,
  onSubmit,
  loading = false,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
}) {
  return (
    <div className="w-full">
      <form
        onSubmit={onSubmit}
        className="mx-auto flex max-w-2xl flex-col gap-3 rounded-full bg-cream-card p-2 shadow-[0_8px_30px_-12px_rgba(28,31,43,0.25)] ring-1 ring-line transition-all duration-300 focus-within:ring-2 focus-within:ring-maroon/50 focus-within:shadow-[0_10px_40px_-10px_rgba(171,13,16,0.35)] sm:flex-row sm:items-center"
      >
        <div className="flex flex-1 items-center gap-2 px-4 py-2">
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
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter Certificate ID"
            autoComplete="off"
            className="w-full bg-transparent font-body text-sm text-ink placeholder:text-ink-soft outline-none"
          />
          <span className="hidden shrink-0 font-mono text-xs text-ink-soft/70 sm:inline">
            e.g., C037-10224
          </span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-sheen group inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-6 py-3 font-body text-sm font-medium text-cream-card transition-all duration-300 hover:bg-maroon-deep hover:shadow-[0_8px_24px_-8px_rgba(171,13,16,0.6)] active:scale-95 disabled:opacity-60"
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

      <div className="mt-4 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream-card px-4 py-1.5 font-mono text-[11px] text-ink-soft transition-colors duration-300 hover:border-gold-deep/40 hover:text-ink">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-gold-deep" fill="currentColor">
            <path d="M10 1.5 3 4.5v5c0 5 3 8.5 7 9.5 4-1 7-4.5 7-9.5v-5L10 1.5Z" />
          </svg>
          Trusted &amp; secured by Senior Academy technology
        </span>
      </div>
    </div>
  );
}
