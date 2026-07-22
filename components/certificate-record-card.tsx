import { CertificateRecord } from "@/lib/types";
import DownloadPdfButton from "@/components/download-pdf-button";

function StatRow({
  label,
  value,
  percent,
}: {
  label: string;
  value: string;
  percent?: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-cream-card/60">
          {label}
        </p>
        {typeof percent === "number" && (
          <div className="mt-1.5 h-1 w-full max-w-[9rem] rounded-full bg-cream-card/15">
            <div
              className="h-1 rounded-full bg-[#987233]"
              style={{ width: `${percent}%` }}
            />
          </div>
        )}
      </div>
      <p className="shrink-0 font-body text-sm text-cream-card">{value}</p>
    </div>
  );
}

export default function CertificateRecordCard({
  record,
}: {
  record: CertificateRecord;
}) {
  const issueDate = record.issueDate
    ? new Date(record.issueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="seal-stamp rounded-3xl border border-[#e6d0bf] bg-maroon-card p-7 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream-card">
        Certificate — {record.academyName}
      </p>
      <h3 className="mt-2 font-display text-2xl leading-snug text-cream-card">
        {record.courseName}
      </h3>
      <p className="font-body text-sm text-cream-card/70">{record.academyName}</p>

      <div className="mt-5 divide-y divide-[#e6d0bf] border-y border-[#e6d0bf]">
        <StatRow label="Student name" value={record.studentName} />
        <StatRow
          label="Course completion"
          value={`${record.completionPercent}%`}
          percent={record.completionPercent}
        />
        <StatRow label="Issued" value={issueDate} />
        <StatRow label="Duration" value={`${record.durationWeeks} weeks`} />
        <div className="flex items-center justify-between py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-cream-card/60">
            Status
          </p>
          <span className="inline-flex items-center gap-1.5 font-body text-sm text-gold">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-1 10-3-3 1.06-1.06L7 8.88l3.94-3.94L12 6l-5 5Z" />
            </svg>
            Verified
          </span>
        </div>
      </div>

      <div className="mt-6">
        <DownloadPdfButton certificateId={record.id} pdfUrl={record.pdfUrl} />
      </div>

      <div className="mt-6 flex justify-center gap-1.5">
        <span className="h-1.5 w-4 rounded-full bg-gold" />
        <span className="h-1.5 w-1.5 rounded-full bg-cream-card/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-cream-card/25" />
      </div>
    </div>
  );
}
