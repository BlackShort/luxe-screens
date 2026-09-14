// How many days ahead availability is computed for. 
export const BOOKING_WINDOW_DAYS = 10;

// How long a selected time is reserved for one customer before it's released back to everyone else.
export const HOLD_DURATION_MINUTES = 5;

// Minimum lead time before a slot's start time that a customer can book it. This is to prevent last-minute bookings that may not be feasible to accommodate.
export const PAST_BUFFER_MINUTES = 60;
