import { NextRequest, NextResponse } from "next/server";
import { bookingCreateSchema } from "@/lib/validation";
import { createBooking, BookingError } from "@/server/services/booking.service";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON body" }, { status: 400 });
  }

  const parsed = bookingCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const booking = await createBooking(parsed.data);
    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    if (error instanceof BookingError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("[booking] create failed", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
