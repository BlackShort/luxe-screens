import type { Slot } from "@/types";

export const SLOT_TIMES = [
  "10:00",
  "12:30",
  "15:00",
  "17:30",
  "20:00",
  "22:30",
] as const;

export type SlotTime = (typeof SLOT_TIMES)[number];

export const SLOT_DURATION_HOURS = 2.5;
 
export const MAX_CONSECUTIVE_SLOTS = 3;

export function slotTimeIndex(time: string): number {
  return SLOT_TIMES.indexOf(time as SlotTime);
}

export function consecutiveTimes(
  startTime: string,
  duration: number
): string[] | null {
  const startIdx = slotTimeIndex(startTime);
  if (startIdx === -1) return null;
  if (startIdx + duration > SLOT_TIMES.length) return null;
  return SLOT_TIMES.slice(startIdx, startIdx + duration);
}

// The time the room frees up, given a start time and how many slots were booked.

export function endTimeFor(startTime: string, duration: number): string | null {
  const times = consecutiveTimes(startTime, duration);
  if (!times) return null;
  const lastIdx = slotTimeIndex(times[times.length - 1]);
 
  if (lastIdx + 1 < SLOT_TIMES.length) return SLOT_TIMES[lastIdx + 1];
  const [h, m] = times[times.length - 1].split(":").map(Number);
  const closeHour = Math.floor(h + SLOT_DURATION_HOURS);
  const closeMinute = m + (SLOT_DURATION_HOURS % 1) * 60;
  return `${String(closeHour % 24).padStart(2, "0")}:${String(closeMinute).padStart(2, "0")}`;
}

export function canBookConsecutive(
  slotsForDay: Pick<Slot, "time" | "status">[],
  startTime: string,
  duration: number
): boolean {
  const times = consecutiveTimes(startTime, duration);
  if (!times) return false;
  return times.every((time) =>
    slotsForDay.some((slot) => slot.time === time && slot.status === "AVAILABLE")
  );
}
