import { prisma } from "@/server/db/client";
import { toTheaterDTO } from "@/server/mappers/theater.mapper";
import type { Theater } from "@/types";

export async function listTheaters(city?: string): Promise<Theater[]> {
  const rows = await prisma.theater.findMany({
    where: city ? { city: { equals: city, mode: "insensitive" } } : undefined,
    orderBy: { basePrice: "asc" },
  });
  return rows.map(toTheaterDTO);
}

export async function getTheater(id: string): Promise<Theater | null> {
  const row = await prisma.theater.findUnique({ where: { id } });
  return row ? toTheaterDTO(row) : null;
}
