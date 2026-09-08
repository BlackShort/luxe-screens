// How many days ahead availability is computed for. There's no seeded
// inventory anymore (see slots.service.ts) — this just bounds the window
// the "theoretical grid" is generated over, so it doesn't grow unbounded.
export const BOOKING_WINDOW_DAYS = 10;

// How long a selected time is reserved for one customer before it's
// released back to everyone else, mirroring the countdown-timer pattern
// on real booking platforms (BookMyShow, IRCTC, flight booking, etc).
export const HOLD_DURATION_MINUTES = 5;

// Minimum lead time before a slot's start — a slot can't be booked (or
// held) once it's within this window of starting.
export const PAST_BUFFER_MINUTES = 60;
