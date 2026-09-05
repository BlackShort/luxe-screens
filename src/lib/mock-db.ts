import type { Booking } from "@/types";

// In-memory stand-in for the Postgres `Booking` table described in the
// project docs. Swap this module for a Prisma client without touching
// the API route handlers that import it.
const bookings = new Map<string, Booking>();

export const mockDb = {
  createBooking(booking: Booking) {
    bookings.set(booking.id, booking);
    return booking;
  },
  getBooking(id: string) {
    return bookings.get(id);
  },
  confirmBooking(id: string) {
    const booking = bookings.get(id);
    if (!booking) return undefined;
    booking.paymentStatus = "PAID";
    bookings.set(id, booking);
    return booking;
  },
};
