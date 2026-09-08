import { prisma } from "@/server/db/client";
import type { Coupon } from "@/types";

export async function findCoupon(code: string): Promise<Coupon | null> {
  const row = await prisma.coupon.findFirst({
    where: { code: { equals: code, mode: "insensitive" } },
  });

  return row
    ? {
        code: row.code,
        description: row.description,
        percentOff: row.percentOff,
        minSpend: row.minSpend,
        active: row.active,
      }
    : null;
}
