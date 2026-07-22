"use client";

export default function DownloadPdfButton({
  certificateId,
  pdfUrl,
}: {
  certificateId: string;
  pdfUrl?: string | null;
}) {
  function handleDownload() {
    // The backend stores an admin-provided shareable link (Google Drive) rather
    // than generating a PDF itself. Open it when present; otherwise fall back to
    // the browser's print-to-PDF on the current page.
    if (pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
      return;
    }
    window.print();
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#987233] px-5 py-3 font-body text-sm font-medium text-maroon-deep transition hover:bg-[#7f5d1d] hover:text-cream-card"
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
