const SOCIAL_ICONS: { label: string; path: string }[] = [
  { label: "X", path: "M3 3l14 14M17 3 3 17" },
  {
    label: "LinkedIn",
    path: "M4 8h2v9H4V8Zm1-4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9 8h2v1.3c.5-.8 1.4-1.3 2.5-1.3 2 0 3.5 1.3 3.5 4v6h-2v-5.5c0-1.3-.7-2-1.8-2s-1.7.7-1.7 2V17H9V8Z",
  },
  {
    label: "Facebook",
    path: "M13 4h2V1h-2c-2.2 0-4 1.8-4 4v2H7v3h2v9h3v-9h2.2l.8-3H12V5c0-.6.4-1 1-1Z",
  },
  {
    label: "Instagram",
    path: "M4 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm6 2.2A3.3 3.3 0 1 0 10 14.8 3.3 3.3 0 0 0 10 8.2Zm4.4-2.7a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z",
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body">
          © {year} Senior Academy. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href="#" className="transition hover:text-ink">
            Privacy Policy
          </a>
          <a href="#" className="transition hover:text-ink">
            Terms of Service
          </a>
          <a href="#" className="transition hover:text-ink">
            Cookie Policy
          </a>
          <a href="#" className="transition hover:text-ink">
            Contact Us
          </a>
        </div>

        <div className="flex items-center gap-3">
          {SOCIAL_ICONS.map((icon) => (
            <a
              key={icon.label}
              href="#"
              aria-label={icon.label}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-maroon hover:text-maroon"
            >
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                <path d={icon.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
