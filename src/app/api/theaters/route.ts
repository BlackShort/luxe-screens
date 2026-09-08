import { NextRequest, NextResponse } from "next/server";
import { listTheaters } from "@/server/services/theaters.service";

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city") ?? undefined;
  const theaters = await listTheaters(city);
  return NextResponse.json({ theaters });
}
