import { prisma } from "@/server/db/client";
import type { AddOnDTO } from "@/types";

export async function listAddOns(): Promise<AddOnDTO[]> {
  const rows = await prisma.addOn.findMany({
    include: { options: { orderBy: { price: "asc" } } },
  });

  return rows.map((row) => ({
    id: row.id,
    category: row.category,
    label: row.label,
    options: row.options.map((option) => ({
      id: option.id,
      name: option.name,
      price: option.price,
    })),
  }));
}

export async function getAddOn(id: string) {
  return prisma.addOn.findUnique({
    where: { id },
    include: { options: true },
  });
}
