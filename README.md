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

## Deploying to cPanel / Namecheap ("Setup Node.js App")

cPanel runs Passenger, which does **not** run `next start`. It boots the
**Application startup file** directly — that's `server.js`, which hands every
request to the Next.js request handler.

1. Upload the project **without** `node_modules` and **without** `.next`.
   Local `node_modules` contains Windows binaries that will not run on the
   host's Linux.
2. In *Setup Node.js App*, set:
   - **Application startup file**: `server.js`
   - **Application mode**: `Production`
   - **Node.js version**: 20.9 or newer (24.x is fine)
3. Add an environment variable **`BACKEND_URL`** pointing at the Laravel API
   (e.g. `https://api.yourdomain.com`). Without it the app falls back to
   `http://127.0.0.1:8000`, and the site loads but shows no courses and 404s
   every certificate.
4. Click **Run NPM Install**.
5. Build. `server.js` cannot boot without a production build in `.next/`.

   Shared plans cap address space at 4 GB, and if the host falls back to the
   WASM compiler instead of `@next/swc-linux-x64-gnu`, `next build` dies with
   `WebAssembly.instantiate(): Out of memory`. **Build locally and upload
   instead** — the output contains no absolute paths, so a Windows-built
   `.next` runs fine on the host's Linux:

   ```bash
   npm run build
   tar -czf next-build.tar.gz --exclude='./.next/cache' ./.next
   ```

   Upload `next-build.tar.gz` to the app root and extract it there (cPanel
   File Manager → Extract). `.next/cache` is deliberately excluded; it is
   build-time only and not needed to serve.
6. **Restart** the app (or `touch tmp/restart.txt`, which is how Passenger
   picks up changes).

Re-run step 5 on every code change — the host serves the uploaded `.next`,
not your source.

If images 500 in production, the host is missing `sharp`. Either re-run NPM
Install, or set `images: { unoptimized: true }` in `next.config.ts` —
`components/logo.tsx` is the only `next/image` consumer.

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
