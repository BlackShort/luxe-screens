import { prisma } from "@/server/db/client";
import { generateId } from "@/lib/utils";
import { resolveSlotRunTimes } from "@/server/services/slots.service";
import { HOLD_DURATION_MINUTES, PAST_BUFFER_MINUTES } from "@/lib/booking-config";
import { isAtLeastMinutesAway } from "@/lib/time";

export class HoldError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export interface HoldResult {
  holdToken: string;
  slotIds: string[];
  expiresAt: string;
}

export async function createHold(
  theaterId: string,
  date: string,
  startTime: string,
  durationSlots: number
): Promise<HoldResult> {
  const theater = await prisma.theater.findUnique({ where: { id: theaterId } });
  if (!theater) {
    throw new HoldError("Theater not found", 404);
  }

  if (!isAtLeastMinutesAway(date, startTime, PAST_BUFFER_MINUTES)) {
    throw new HoldError(
      `This time needs to be booked at least ${PAST_BUFFER_MINUTES} minutes in advance`,
      422
    );
  }

  const times = resolveSlotRunTimes(startTime, durationSlots);
  if (!times) {
    throw new HoldError("That length doesn't fit in the remaining slots for this day", 422);
  }

  const holdToken = generateId("hold");
  const holdExpiresAt = new Date(Date.now() + HOLD_DURATION_MINUTES * 60_000);

  const result = await prisma.$transaction(async (tx) => {
    await tx.slot.deleteMany({
      where: {
        theaterId,
        date,
        time: { in: times },
        status: "HELD",
        bookingId: null,
        holdExpiresAt: { lt: new Date() },
      },
    });

    await tx.slot.createMany({
      data: times.map((time) => ({
        theaterId,
        date,
        time,
        status: "HELD" as const,
        holdToken,
        holdExpiresAt,
      })),
      skipDuplicates: true,
    });

    const rows = await tx.slot.findMany({
      where: { theaterId, date, time: { in: times } },
    });

    const allOurs =
      rows.length === times.length && rows.every((row) => row.holdToken === holdToken);

    if (!allOurs) {
      await tx.slot.deleteMany({ where: { holdToken, bookingId: null } });
      return null;
    }

    return rows;
  });

  if (!result) {
    throw new HoldError(
      "That time is no longer available — someone else just booked part of it",
      409
    );
  }

  return {
    holdToken,
    slotIds: result.map((row) => row.id),
    expiresAt: holdExpiresAt.toISOString(),
  };
}

export async function releaseHold(holdToken: string): Promise<void> {
  await prisma.slot.deleteMany({ where: { holdToken, bookingId: null } });
}
