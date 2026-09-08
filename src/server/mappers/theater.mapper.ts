import type { Theater as PrismaTheater } from "@prisma/client";
import type { Theater } from "@/types";

export function toTheaterDTO(row: PrismaTheater): Theater {
  return {
    id: row.id,
    name: row.name,
    city: row.city as Theater["city"],
    address: row.address,
    basePrice: row.basePrice,
    maxCapacity: row.maxCapacity,
    screen: row.screen,
    sound: row.sound,
    amenities: row.amenities,
    images: row.images,
    rating: row.rating,
    reviewCount: row.reviewCount,
  };
}
