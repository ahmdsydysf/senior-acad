import { NextRequest, NextResponse } from "next/server";
import { verifyCertificate } from "@/lib/api";

// Lightweight existence check the search boxes hit before navigating to the
// full certificate page. Proxies GET /api/v1/certificates/verify on the backend
// so the browser stays same-origin (no CORS needed).
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { exists, status } = await verifyCertificate(id);

  if (!exists) {
    return NextResponse.json({ exists: false, id }, { status: 404 });
  }

  return NextResponse.json({ exists: true, id, status });
}
