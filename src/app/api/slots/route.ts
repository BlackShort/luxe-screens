import { NextRequest, NextResponse } from "next/server";
import { slotsQuerySchema } from "@/lib/validation";
import { listSlotsForTheater } from "@/server/services/slots.service";
import { getTheater } from "@/server/services/theaters.service";

export async function GET(request: NextRequest) {
  const theaterId = request.nextUrl.searchParams.get("theaterId") ?? "";

  const parsed = slotsQuerySchema.safeParse({ theaterId });
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const theater = await getTheater(parsed.data.theaterId);
  if (!theater) {
    return NextResponse.json({ error: "Theater not found" }, { status: 404 });
  }

  const slots = await listSlotsForTheater(theater.id);
  return NextResponse.json({ theaterId: theater.id, slots });
}
