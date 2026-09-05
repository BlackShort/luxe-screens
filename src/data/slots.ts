import type { Slot, SlotStatus } from "@/types";
import { theaters } from "@/data/theaters";

// Deterministic pseudo-random status so the same theater/date/time always
// yields the same mock availability within a single server run.
function pseudoStatus(seed: string): SlotStatus {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 997;
  }
  if (hash % 7 === 0) return "BOOKED";
  if (hash % 11 === 0) return "HELD";
  return "AVAILABLE";
}

const TIMES = ["10:00", "12:30", "15:00", "17:30", "20:00", "22:30"];

function nextDates(count: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export function getSlotsForTheater(theaterId: string): Slot[] {
  const dates = nextDates(10);
  const slots: Slot[] = [];
  for (const date of dates) {
    for (const time of TIMES) {
      const id = `${theaterId}_${date}_${time}`;
      slots.push({
        id,
        theaterId,
        date,
        time,
        status: pseudoStatus(id),
      });
    }
  }
  return slots;
}

export function getSlotById(slotId: string): Slot | undefined {
  const [theaterId, date, time] = slotId.split("_");
  if (!theaterId || !date || !time) return undefined;
  const exists = theaters.some((t) => t.id === theaterId);
  if (!exists) return undefined;
  return { id: slotId, theaterId, date, time, status: pseudoStatus(slotId) };
}
