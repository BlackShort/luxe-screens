import { NextRequest, NextResponse } from "next/server";
import { getTheater } from "@/server/services/theaters.service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const theater = await getTheater(id);

  if (!theater) {
    return NextResponse.json({ error: "Theater not found" }, { status: 404 });
  }

  return NextResponse.json({ theater });
}
