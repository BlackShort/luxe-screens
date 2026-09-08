import { NextRequest, NextResponse } from "next/server";
import { couponValidateSchema } from "@/lib/validation";
import { findCoupon } from "@/server/services/coupons.service";
import { applyCoupon } from "@/lib/pricing";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON body" }, { status: 400 });
  }

  const parsed = couponValidateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { code, subtotal } = parsed.data;
  const coupon = await findCoupon(code);

  if (!coupon || !coupon.active) {
    return NextResponse.json({ valid: false, reason: "This code isn't valid." }, { status: 200 });
  }

  if (subtotal < coupon.minSpend) {
    return NextResponse.json(
      {
        valid: false,
        reason: `Add ₹${coupon.minSpend - subtotal} more to use this code.`,
      },
      { status: 200 }
    );
  }

  const { discount, total } = applyCoupon(subtotal, coupon);
  return NextResponse.json({
    valid: true,
    code: coupon.code,
    percentOff: coupon.percentOff,
    discount,
    total,
  });
}
