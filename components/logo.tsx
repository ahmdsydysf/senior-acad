import Image from "next/image";
// Statically imported so the emitted asset URL carries `basePath`. A plain
// string src like "/logo.png" is not basePath-aware: the optimizer would look
// for /logo.png while the file is served from <basePath>/logo.png, and every
// image 400s.
import logoSrc from "@/public/logo.png";

export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-hidden="true">
      <path
        d="M32 10c-8 0-13 5-13 11 0 12 18 8 18 17 0 5-4 8-10 8-6 0-10-3-11-8"
        fill="none"
        stroke="var(--maroon)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="33.5" cy="9.5" r="2.6" fill="var(--gold)" />
      <circle cx="14.5" cy="38.5" r="2.6" fill="var(--gold)" />
    </svg>
  );
}

export function Wordmark({
  size = "sm",
  className = "",
}: {
  size?: "sm" | "lg";
  className?: string;
}) {
  const isLg = size === "lg";
  return (
    <div className={`flex flex-col ${isLg ? "items-center" : ""} ${className}`}>
      <Image
        src={logoSrc}
        alt="Senior Academy Logo"
        width={isLg ? 300 : 200}
        height={isLg ? 150 : 100}
        priority
      />
    </div>
  );
}
