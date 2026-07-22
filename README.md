# Senior Academy — Certificate Verification (Next.js)

Two pages, built with Next.js App Router + TypeScript + Tailwind v4:

- `/` — search & verify a certificate by ID, with recommended courses below.
- `/certificate/[id]` — full certificate record: student, scores, instructor
  endorsement, download-as-PDF, and recommended courses.

## Run it

```bash
npm install
npm run dev
```

The pages read from the Laravel backend, so start that too (see below).
Without it the homepage renders with an empty course list and every
certificate lookup returns 404.

## Where the data comes from

`lib/api.ts` is the only place that talks to the Laravel backend's public
`/api/v1` API. It maps the raw snake_case payloads onto the camelCase view
models in `lib/types.ts` (`CertificateRecord`, `Course`, `GeneralData`).

Point it at the backend with `BACKEND_URL`; it defaults to
`http://127.0.0.1:8000`:

```bash
BACKEND_URL=https://api.example.com npm run dev
```

Every call runs server-side (server components + route handlers), so the
browser never talks to Laravel directly and no CORS config is needed.
`app/api/certificates/[id]/route.ts` is a same-origin proxy for the
lightweight existence check the search boxes hit before navigating.

## Troubleshooting

**`next dev` hangs forever on `○ Compiling / ...`** — Turbopack's
filesystem cache (on by default for dev since Next 16.1) is corrupted.
Delete the build directory and restart:

```bash
rm -rf .next
```

If it keeps recurring, turn the cache off in `next.config.ts` with
`experimental.turbopackFileSystemCacheForDev: false` (slower cold starts,
but no cache to corrupt).

## Note on fonts

`app/layout.tsx` uses `next/font/google` (Fraunces, Inter, IBM Plex Mono),
which fetches font files at build time. That needs normal internet
access — it will fail in network-restricted sandboxes but works fine on
a regular dev machine or CI with internet access.
