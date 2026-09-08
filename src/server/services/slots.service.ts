import { prisma } from "@/server/db/client";
import { SLOT_TIMES, consecutiveTimes } from "@/lib/slot-times";
import { BOOKING_WINDOW_DAYS, PAST_BUFFER_MINUTES } from "@/lib/booking-config";
import { istDateTimeParts, isAtLeastMinutesAway } from "@/lib/time";
import type { Slot } from "@/types";

/** The next `days` ISO dates starting today, in IST. */
function bookingWindowDates(days: number): string[] {
  const { date: todayIST } = istDateTimeParts();
  const start = new Date(`${todayIST}T00:00:00Z`);
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(start);
    d.setUTCDate(d.getUTCDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

/**
 * Computes the full availability grid for a theater over the booking
 * window — there's no pre-generated inventory to read. A row in the
 * database exists only for a slot that's currently HELD or BOOKED;
 * everything else is available by construction (absence of a row IS the
 * "available" state). This is also where the opportunistic reclaim of
 * expired holds happens: a HELD row past its holdExpiresAt is treated
 * (and cleaned up) as if it never existed.
 */
export async function listSlotsForTheater(theaterId: string): Promise<Slot[]> {
  const dates = bookingWindowDates(BOOKING_WINDOW_DAYS);

  const rows = await prisma.slot.findMany({
    where: { theaterId, date: { in: dates } },
  });

  // Lazily reclaim any hold that's expired and never turned into a real
  // booking — no cron job, just clean up whatever we happen to touch.
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
        // No row exists yet — this id is display-only (React key), never
        // sent back to the server. Booking a slot goes through
        // POST /api/slots/hold with (theaterId, date, time), not an id.
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

/**
 * Resolves the run of Slot rows a hold of `duration` starting at
 * `startTime` would need to check/create — canonical time order, same
 * theater/day. Returns null if the run would run past the end of the day.
 * Doesn't touch the database; callers (holds.service.ts) do the actual
 * create/reclaim/verify.
 */
export function resolveSlotRunTimes(startTime: string, duration: number): string[] | null {
  return consecutiveTimes(startTime, duration);
}
