import type { NextConfig } from "next";

// Passenger (cPanel "Setup Node.js App") mounts this app under a sub-directory
// — see PassengerBaseURI in the cPanel-generated .htaccess — and forwards the
// full prefixed path to the app. Next has to know that prefix or every route
// 404s.
//
// Set in .env.production so production builds pick it up automatically while
// `next dev` stays at "/". Deploying at a domain root? Set it to "".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Course covers are served by the Laravel backend, and next/image refuses
// remote hosts that are not allow-listed. Derived from BACKEND_URL rather than
// hardcoded so moving the backend cannot silently break every course image.
const backend = (() => {
  try {
    return new URL(process.env.BACKEND_URL ?? "http://127.0.0.1:8000");
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  basePath,
  images: backend
    ? {
        remotePatterns: [
          {
            protocol: backend.protocol.replace(":", "") as "http" | "https",
            hostname: backend.hostname,
          },
        ],
      }
    : undefined,
  // basePath covers <Link> and next/image, but not hand-written fetch() URLs.
  // Re-exporting it here guarantees client code sees a defined string ("" when
  // unset) instead of `undefined` leaking into a request path.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
