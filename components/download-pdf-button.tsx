"use client";

export default function DownloadPdfButton({
  certificateId,
}: {
  certificateId: string;
}) {
  function handleDownload() {
    // Placeholder: wire this up to your real PDF-generation endpoint,
    // e.g. `/api/certificates/${certificateId}/pdf`, once it exists.
    window.print();
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 font-body text-sm font-medium text-maroon-deep transition hover:bg-gold-deep hover:text-cream-card"
      aria-label={`Download certificate ${certificateId} as PDF`}
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 1.5v9M4.5 7 8 10.5 11.5 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.5 12.5v1a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-1" strokeLinecap="round" />
      </svg>
      Download as PDF
    </button>
  );
}
