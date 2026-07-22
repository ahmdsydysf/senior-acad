"use client";

import { useState } from "react";

function getEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      const videoId = parsedUrl.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }

    if (host === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }

    if (host === "vimeo.com" || host === "www.vimeo.com") {
      const videoId = parsedUrl.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    }

    return url;
  } catch {
    return url;
  }
}

export default function InterviewVideoCard({
  studentName,
  videoUrl,
}: {
  studentName: string;
  videoUrl?: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const playButtonClasses =
    "flex h-14 w-14 items-center justify-center rounded-full bg-cream-card/95 text-maroon transition hover:scale-105";
  const playIcon = (
    <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-maroon-card-line bg-[#e6d0bf]">
        <div className="flex items-center justify-between px-5 pt-5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
            Interview video
          </p>
        </div>

        <div className="relative mx-5 mt-3 mb-5 flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-[#3a2530] via-[#241318] to-[#120a0d]">
          <p className="absolute left-4 top-3 font-mono text-[11px] text-cream-card/50">
            {studentName}
          </p>
          {videoUrl ? (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label={`Play interview video for ${studentName}`}
              className={playButtonClasses}
            >
              {playIcon}
            </button>
          ) : (
            <button
              type="button"
              aria-label="Play interview video"
              className={`${playButtonClasses} cursor-not-allowed opacity-60`}
              disabled
            >
              {playIcon}
            </button>
          )}

          <div className="absolute inset-x-4 bottom-3 flex items-center gap-3 text-cream-card/70">
            <span className="font-mono text-[10px]">00:00</span>
            <span className="h-0.5 flex-1 rounded-full bg-cream-card/25" />
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M4 8v4h3l4 4V4L7 8H4Z" />
            </svg>
          </div>
        </div>
      </div>

      {isOpen && embedUrl ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-5xl rounded-3xl border border-maroon-card-line bg-[#f7e9dc] p-3 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Interview video"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                Interview video
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-maroon-card-line px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-maroon"
              >
                Close
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl bg-black">
              <div className="aspect-video">
                <iframe
                  src={embedUrl}
                  title={`Interview video for ${studentName}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
