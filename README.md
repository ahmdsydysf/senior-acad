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

Try certificate ID **CERT-12294** on the homepage to see a verified result.

## Where the data comes from right now

`lib/mock-data.ts` holds a single mock certificate, and
`app/api/certificates/[id]/route.ts` serves it as
`GET /api/certificates/:id`. The frontend (`components/verify-form.tsx`
and `app/certificate/[id]/page.tsx`) only depends on the JSON shape in
`lib/types.ts` (`CertificateRecord`).

## Wiring up your real API

When your outside API is ready, you have two options:

1. **Keep this route as a proxy** — inside
   `app/api/certificates/[id]/route.ts`, replace the call to
   `lookupCertificate` with a `fetch()` to your real service (good if you
   want to hide the upstream URL/keys from the browser, or reshape the
   response).
2. **Call the outside API directly from the client** — update the
   `fetch("/api/certificates/...")` call in `components/verify-form.tsx`
   to point at your API's URL instead, and delete the route file.

Either way, keep the response matching `CertificateRecord` in
`lib/types.ts` (or update that type and the two consumers together).

## Note on fonts

`app/layout.tsx` uses `next/font/google` (Fraunces, Inter, IBM Plex Mono),
which fetches font files at build time. That needs normal internet
access — it will fail in network-restricted sandboxes but works fine on
a regular dev machine or CI with internet access.
