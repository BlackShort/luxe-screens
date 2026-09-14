// All theaters are in Indian cities, so "now" for slot cutoffs always means India Standard Time
const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;

// The current instant's IST wall-clock date/time, as sortable strings.
export function istDateTimeParts(instant: Date = new Date()): {
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM", 24-hour
} {
  const shifted = new Date(instant.getTime() + IST_OFFSET_MS);
  return {
    date: shifted.toISOString().slice(0, 10),
    time: shifted.toISOString().slice(11, 16),
  };
}

export function isAtLeastMinutesAway(
  date: string,
  time: string,
  minutes: number,
  now: Date = new Date()
): boolean {
  const cutoff = istDateTimeParts(new Date(now.getTime() + minutes * 60_000));
  return date > cutoff.date || (date === cutoff.date && time >= cutoff.time);
}
