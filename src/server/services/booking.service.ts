import { prisma } from "@/server/db/client";
import { toBookingDTO } from "@/server/mappers/booking.mapper";
import { computeTotal } from "@/lib/pricing";
import { sanitizeText, generateId } from "@/lib/utils";
import { findCoupon } from "@/server/services/coupons.service";
import type { BookingCreateInput } from "@/lib/validation";
import type { Booking } from "@/types";

export class BookingError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

const bookingInclude = {
  cart: { include: { addOn: true } },
  slots: { orderBy: { time: "asc" } },
} as const;

export async function createBooking(data: BookingCreateInput): Promise<Booking> {
  const theater = await prisma.theater.findUnique({ where: { id: data.theaterId } });
  if (!theater || theater.city.toLowerCase() !== data.location.toLowerCase()) {
    throw new BookingError("Theater not found for this location", 404);
  }
  if (data.guests > theater.maxCapacity) {
    throw new BookingError(`This room seats up to ${theater.maxCapacity} guests`, 422);
  }

  // The hold already exists (created by POST /api/slots/hold when the
  // customer picked a time) — this step verifies it's still ours and still
  // live, then attaches the booking details. It never creates the hold
  // itself; that's deliberate, since holding needs to happen the moment
  // someone picks a time, not several wizard steps later at payment.
  const heldSlots = await prisma.slot.findMany({
    where: { holdToken: data.holdToken, theaterId: theater.id },
    orderBy: { time: "asc" },
  });

  if (heldSlots.length === 0) {
    throw new BookingError(
      "Your held time has expired. Please pick a time again.",
      410
    );
  }
  if (heldSlots.some((slot) => slot.bookingId)) {
    throw new BookingError("This hold has already been used for a booking", 409);
  }
  if (heldSlots.some((slot) => !slot.holdExpiresAt || slot.holdExpiresAt < new Date())) {
    throw new BookingError(
      "Your held time has expired. Please pick a time again.",
      410
    );
  }

  const durationSlots = heldSlots.length;
  const date = heldSlots[0].date;
  const time = heldSlots[0].time;

  // Never trust client-submitted prices — recompute from the catalog.
  const coupon = data.couponCode ? await findCoupon(data.couponCode) : null;
  const { subtotal, discount, total } = computeTotal(
    theater.basePrice,
    durationSlots,
    data.cart,
    coupon ?? undefined
  );

  const slotIds = heldSlots.map((slot) => slot.id);

  const created = await prisma.$transaction(async (tx) => {
    // Re-check inside the transaction — the hold could theoretically have
    // just expired between the read above and now.
    const freshSlots = await tx.slot.findMany({ where: { id: { in: slotIds } } });
    if (
      freshSlots.length !== slotIds.length ||
      freshSlots.some((slot) => slot.bookingId || !slot.holdExpiresAt || slot.holdExpiresAt < new Date())
    ) {
      throw new BookingError("Your held time has expired. Please pick a time again.", 410);
    }

    const booking = await tx.booking.create({
      data: {
        id: generateId("bkg"),
        location: data.location,
        theaterId: theater.id,
        date,
        time,
        durationSlots,
        guests: data.guests,
        contactName: sanitizeText(data.contact.name),
        contactPhone: data.contact.phone,
        contactEmail: data.contact.email,
        occasion: data.occasion,
        occasionNote: data.occasionNote ? sanitizeText(data.occasionNote) : null,
        subtotal,
        discount,
        total,
        couponCode: coupon && discount > 0 ? coupon.code : null,
        paymentStatus: "PENDING",
        cart: {
          create: data.cart.map((item) => ({
            addOnId: item.addOnId,
            optionName: item.optionName,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    // Attach the already-held slots to the new booking. holdExpiresAt is
    // deliberately left in place (not cleared) — if the customer's
    // browser dies right here and payment confirmation never happens,
    // this PENDING booking's slots still self-release on schedule instead
    // of being stuck HELD forever.
    await tx.slot.updateMany({
      where: { id: { in: slotIds } },
      data: { bookingId: booking.id },
    });

    return tx.booking.findUniqueOrThrow({
      where: { id: booking.id },
      include: bookingInclude,
    });
  });

  return toBookingDTO(created);
}

export async function confirmBooking(bookingId: string): Promise<Booking | null> {
  const existing = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: bookingInclude,
  });
  if (!existing) return null;
  if (existing.paymentStatus === "PAID") return toBookingDTO(existing);

  // Simulated payment gateway: a well-formed token always succeeds here.
  // Swap this block for a real gateway webhook/verification call later.
  const updated = await prisma.$transaction(async (tx) => {
    // Now permanent — clear the hold expiry so it never gets reclaimed.
    await tx.slot.updateMany({
      where: { bookingId: existing.id },
      data: { status: "BOOKED", holdExpiresAt: null, holdToken: null },
    });
    return tx.booking.update({
      where: { id: existing.id },
      data: { paymentStatus: "PAID" },
      include: bookingInclude,
    });
  });

  return toBookingDTO(updated);
}
