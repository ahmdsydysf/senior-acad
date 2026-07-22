"use client";

import { memo, ReactNode } from "react";
import { Wordmark } from "@/components/logo";
import type { GeneralData } from "@/lib/types";

// Fallbacks used when the backend is unreachable, so the header never renders
// blank. These mirror the copy the API currently serves.
const FALLBACK_SUB_LOGO = "Advancing Tomorrow's Tech Leaders.";
const FALLBACK_HEADING =
  '<h3>Verify and Download Your</h3><h3 style="color:#987233">Programming Certificate</h3>';
const FALLBACK_BODY =
  "Instantly access your verified credentials and full performance report.";

/**
 * `html` is admin-authored markup from our own backend (two <h3>s, the second
 * carrying the accent colour inline). Rendered as markup so the CMS keeps
 * control of the wording and emphasis; role/aria-level preserve the h1
 * semantics that nesting real heading tags inside an <h1> would make invalid.
 *
 * Memoised because React re-applies dangerouslySetInnerHTML on every render,
 * tearing down and rebuilding these nodes. Without this, each search rebuilds
 * the page heading even though the text never changed.
 */
const HeroHeading = memo(function HeroHeading({ html }: { html: string }) {
  return (
    <div
      role="heading"
      aria-level={1}
      className="anim-fade-up anim-delay-1 mx-auto mt-6 max-w-2xl text-ink [&_h3]:font-display [&_h3]:text-4xl [&_h3]:leading-[1.1] sm:[&_h3]:text-5xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

export default function Hero({
  children,
  about,
}: {
  children: ReactNode;
  about?: GeneralData["about"] | null;
}) {
  const subLogo = about?.subLogo || FALLBACK_SUB_LOGO;
  const heading = about?.heading || FALLBACK_HEADING;
  const body = about?.body || FALLBACK_BODY;

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-10 sm:pt-12">
        {/* Brand card hanging flush from the top edge, aligned to the content's left margin */}
        <aside className="anim-fade-down anim-delay-2 absolute left-6 top-0 hidden w-60 rounded-b-2xl border border-t-0 border-line bg-cream-card px-6 pb-8 pt-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg xl:block">
          <Wordmark size="sm" className="mx-auto" />
          <div className="mx-auto mt-5 h-px w-full bg-line" />
          <p className="mt-5 font-display text-base font-medium uppercase tracking-wide leading-relaxed text-[#987233]">
            {subLogo}
          </p>
        </aside>

        <div className="w-full text-center">
          <div className="anim-scale-in">
            <Wordmark size="lg" className="mx-auto" />
          </div>

          <HeroHeading html={heading} />
          <p className="anim-fade-up anim-delay-2 mx-auto mt-4 max-w-xl font-body text-base text-ink">
            {body}
          </p>

          <div className="anim-fade-up anim-delay-3 mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
