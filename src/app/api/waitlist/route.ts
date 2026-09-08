import { NextRequest, NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/validation";
import { addWaitlistEntry } from "@/server/services/waitlist.service";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON body" }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const entry = await addWaitlistEntry(parsed.data);

  return NextResponse.json({ ok: true, entry }, { status: 201 });
}
