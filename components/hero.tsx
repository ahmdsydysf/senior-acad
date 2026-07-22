import { ReactNode } from "react";
import { Wordmark } from "@/components/logo";

export default function Hero({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-10 sm:pt-12">
        {/* Brand card hanging flush from the top edge, aligned to the content's left margin */}
        <aside className="anim-fade-down anim-delay-2 absolute left-6 top-0 hidden w-60 rounded-b-2xl border border-t-0 border-line bg-cream-card px-6 pb-8 pt-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg xl:block">
          <Wordmark size="sm" className="mx-auto" />
          <div className="mx-auto mt-5 h-px w-full bg-line" />
          <p className="mt-5 font-display text-base font-medium uppercase tracking-wide leading-relaxed text-[#987233]">
            Advancing
            <br />
            Tomorrow&apos;s
            <br />
            Tech Leaders.
          </p>
        </aside>

        <div className="w-full text-center">
          <div className="anim-scale-in">
            <Wordmark size="lg" className="mx-auto" />
          </div>

          <h1 className="anim-fade-up anim-delay-1 mx-auto mt-6 max-w-2xl font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
            Verify and Download Your{" "}
            <span className="text-[#987233]">Programming Certificate</span>
          </h1>
          <p className="anim-fade-up anim-delay-2 mx-auto mt-4 max-w-xl font-body text-base text-ink">
            Instantly access your verified credentials and full performance
            report.
          </p>

          <div className="anim-fade-up anim-delay-3 mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
