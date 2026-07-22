import { NextRequest, NextResponse } from "next/server";
import { lookupCertificate } from "@/lib/mock-data";

function getBackendUrl() {
  const url = process.env.BACKEND_URL;
  return url?.replace(/\/$/, "");
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const mockRecord = lookupCertificate(id);
  if (mockRecord) {
    return NextResponse.json(mockRecord);
  }

  const backendUrl = getBackendUrl();
  if (!backendUrl) {
    return NextResponse.json({ status: "not_found", id }, { status: 404 });
  }

  try {
    const res = await fetch(
      `${backendUrl}/api/certificates/${encodeURIComponent(id)}`,
      { cache: "no-store" }
    );

    if (res.status === 404) {
      return NextResponse.json({ status: "not_found", id }, { status: 404 });
    }

    if (!res.ok) {
      return NextResponse.json(
        { status: "error", message: "External backend request failed." },
        { status: res.status }
      );
    }

    const record = await res.json();
    return NextResponse.json(record);
  } catch {
    return NextResponse.json(
      { status: "error", message: "External backend request failed." },
      { status: 502 }
    );
  }
}
