import type { Coupon } from "@/types";

export const coupons: Coupon[] = [
  { code: "FIRSTSHOW", description: "10% off your first booking", percentOff: 10, minSpend: 1500, active: true },
  { code: "LUXE20", description: "20% off bookings above ₹5,000", percentOff: 20, minSpend: 5000, active: true },
  { code: "WEEKDAY15", description: "15% off weekday shows", percentOff: 15, minSpend: 2000, active: true },
  { code: "EXPIRED10", description: "No longer valid", percentOff: 10, minSpend: 0, active: false },
];

export function findCoupon(code: string): Coupon | undefined {
  return coupons.find((c) => c.code.toLowerCase() === code.toLowerCase());
}
