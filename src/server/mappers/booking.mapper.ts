import type {
  Booking as PrismaBooking,
  CartItem as PrismaCartItem,
  AddOn as PrismaAddOn,
  Slot as PrismaSlot,
} from "@prisma/client";
import type { Booking } from "@/types";

type BookingWithRelations = PrismaBooking & {
  cart: (PrismaCartItem & { addOn: PrismaAddOn })[];
  slots: PrismaSlot[];
};

export function toBookingDTO(row: BookingWithRelations): Booking {
  return {
    id: row.id,
    location: row.location as Booking["location"],
    theaterId: row.theaterId,
    slotIds: row.slots.map((slot) => slot.id),
    durationSlots: row.durationSlots,
    date: row.date,
    time: row.time,
    guests: row.guests,
    contact: {
      name: row.contactName,
      phone: row.contactPhone,
      email: row.contactEmail,
    },
    occasion: row.occasion as Booking["occasion"],
    occasionNote: row.occasionNote ?? undefined,
    cart: row.cart.map((item) => ({
      addOnId: item.addOnId,
      category: item.addOn.category,
      optionName: item.optionName,
      price: item.price,
      quantity: item.quantity,
    })),
    subtotal: row.subtotal,
    discount: row.discount,
    couponCode: row.couponCode ?? undefined,
    total: row.total,
    paymentStatus: row.paymentStatus,
    createdAt: row.createdAt.toISOString(),
  };
}
