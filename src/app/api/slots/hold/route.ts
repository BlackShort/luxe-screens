import { NextRequest, NextResponse } from "next/server";
import { holdRequestSchema, holdReleaseSchema } from "@/lib/validation";
import { createHold, releaseHold, HoldError } from "@/server/services/holds.service";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON body" }, { status: 400 });
  }

  const parsed = holdRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const hold = await createHold(
      parsed.data.theaterId,
      parsed.data.date,
      parsed.data.time,
      parsed.data.durationSlots
    );
    return NextResponse.json(hold, { status: 201 });
  } catch (error) {
    if (error instanceof HoldError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("[slots/hold] create failed", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON body" }, { status: 400 });
  }

  const parsed = holdReleaseSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: true }); // nothing to release, not worth erroring
  }

  await releaseHold(parsed.data.holdToken);
  return NextResponse.json({ ok: true });
}
