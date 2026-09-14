import { prisma } from "@/server/db/client";
import { SLOT_TIMES, consecutiveTimes } from "@/lib/slot-times";
import { BOOKING_WINDOW_DAYS, PAST_BUFFER_MINUTES } from "@/lib/booking-config";
import { istDateTimeParts, isAtLeastMinutesAway } from "@/lib/time";
import type { Slot } from "@/types";

// The next `days` ISO dates starting today, in IST.
function bookingWindowDates(days: number): string[] {
  const { date: todayIST } = istDateTimeParts();
  const start = new Date(`${todayIST}T00:00:00Z`);
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(start);
    d.setUTCDate(d.getUTCDate() + i);
    return d.toISOString().slice(0, 10);
  });
}


export async function listSlotsForTheater(theaterId: string): Promise<Slot[]> {
  const dates = bookingWindowDates(BOOKING_WINDOW_DAYS);

  const rows = await prisma.slot.findMany({
    where: { theaterId, date: { in: dates } },
  });

  const now = new Date();
  const expired = rows.filter(
    (row) => row.status === "HELD" && !row.bookingId && row.holdExpiresAt && row.holdExpiresAt < now
  );
  if (expired.length > 0) {
    await prisma.slot.deleteMany({ where: { id: { in: expired.map((r) => r.id) } } });
  }
  const expiredIds = new Set(expired.map((r) => r.id));
  const liveRows = rows.filter((row) => !expiredIds.has(row.id));
  const byKey = new Map(liveRows.map((row) => [`${row.date}_${row.time}`, row]));

  const result: Slot[] = [];
  for (const date of dates) {
    for (const time of SLOT_TIMES) {
      const key = `${date}_${time}`;
      const existing = byKey.get(key);

      if (existing) {
        result.push({
          id: existing.id,
          theaterId,
          date,
          time,
          status: existing.status,
        });
        continue;
      }

      const bookable = isAtLeastMinutesAway(date, time, PAST_BUFFER_MINUTES, now);
      result.push({
        id: `virtual:${theaterId}:${key}`,
        theaterId,
        date,
        time,
        status: bookable ? "AVAILABLE" : "PAST",
      });
    }
  }

  return result;
}

export function resolveSlotRunTimes(startTime: string, duration: number): string[] | null {
  return consecutiveTimes(startTime, duration);
}
