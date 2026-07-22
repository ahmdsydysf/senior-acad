import { NextRequest, NextResponse } from "next/server";
import { getCertificate } from "@/lib/api";

// Certificate lookup for the search boxes. Proxies the Laravel API so the
// browser stays same-origin (no CORS needed) and the backend URL is never
// exposed to the client.
//
// Returns the full CertificateResult union so the homepage can render the
// record in place instead of navigating to /certificate/[id].
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = await getCertificate(id);

  switch (result.status) {
    case "verified":
    case "pending":
      return NextResponse.json(result);
    case "not_found":
      return NextResponse.json(result, { status: 404 });
    default:
      // Backend unreachable or malformed — this is an upstream failure, not a
      // bad request from the client.
      return NextResponse.json(result, { status: 502 });
  }
}
