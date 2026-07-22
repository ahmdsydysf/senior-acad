import type { NextConfig } from "next";

// Passenger (cPanel "Setup Node.js App") mounts this app under a sub-directory
// — see PassengerBaseURI in the cPanel-generated .htaccess — and forwards the
// full prefixed path to the app. Next has to know that prefix or every route
// 404s.
//
// Set in .env.production so production builds pick it up automatically while
// `next dev` stays at "/". Deploying at a domain root? Set it to "".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  basePath,
  // basePath covers <Link> and next/image, but not hand-written fetch() URLs.
  // Re-exporting it here guarantees client code sees a defined string ("" when
  // unset) instead of `undefined` leaking into a request path.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
