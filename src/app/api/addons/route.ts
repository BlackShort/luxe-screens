import { NextResponse } from "next/server";
import { listAddOns } from "@/server/services/addons.service";

export async function GET() {
  const addOns = await listAddOns();
  return NextResponse.json({ addOns });
}
