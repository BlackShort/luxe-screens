import { NextRequest, NextResponse } from "next/server";
import { contactMessageSchema } from "@/lib/validation";
import { saveContactMessage } from "@/server/services/contact.service";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON body" }, { status: 400 });
  }

  const parsed = contactMessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  await saveContactMessage(parsed.data);

  return NextResponse.json({ ok: true }, { status: 201 });
}
