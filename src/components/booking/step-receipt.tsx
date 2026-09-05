"use client";

import { CheckCircle2 } from "lucide-react";
import { StepShell } from "@/components/booking/step-shell";
import { Button } from "@/components/ui/button";
import { getTheaterById } from "@/data/theaters";
import {
  formatCurrency,
  formatDate,
  formatTime,
} from "@/lib/utils";
import type { Booking } from "@/types";

export function StepReceipt({
  booking,
  onDone,
}: {
  booking: Booking;
  onDone: () => void;
}) {
  const theater = getTheaterById(booking.theaterId);

  return (
    <StepShell title="Receipt">
      <div className="flex flex-col items-center py-4 text-center">
        <CheckCircle2
          size={40}
          aria-hidden="true"
          className="text-primary"
        />

        <p className="mt-4 font-medium text-foreground">
          Payment received
        </p>

        <p className="mt-1 text-3xl font-semibold text-primary">
          {formatCurrency(booking.total)}
        </p>
      </div>

      <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
        <Row
          label="Booking ID"
          value={booking.id}
        />

        <Row
          label="Room"
          value={`${theater?.name ?? booking.theaterId}, ${booking.location}`}
        />

        <Row
          label="Date & time"
          value={`${formatDate(booking.date)} · ${formatTime(booking.time)}`}
        />

        <Row
          label="Occasion"
          value={booking.occasion}
        />

        <Row
          label="Guests"
          value={String(booking.guests)}
        />

        <Row
          label="Booked by"
          value={`${booking.contact.name} · ${booking.contact.phone}`}
        />

        {booking.couponCode ? (
          <Row
            label="Coupon"
            value={`${booking.couponCode} (−${formatCurrency(booking.discount)})`}
          />
        ) : null}
      </div>

      {booking.cart.length > 0 ? (
        <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
          {booking.cart.map((item) => (
            <Row
              key={`${item.addOnId}-${item.optionName}`}
              label={item.optionName}
              value={formatCurrency(
                item.price * item.quantity
              )}
            />
          ))}
        </div>
      ) : null}

      <p className="mt-6 text-xs leading-normal text-muted-foreground">
        A confirmation has been sent to{" "}
        {booking.contact.email}. Please arrive 10 minutes
        before your slot.
      </p>

      <Button
        type="button"
        className="mt-8 w-full"
        onClick={onDone}
      >
        Done
      </Button>
    </StepShell>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-4 text-muted-foreground">
      <span>{label}</span>

      <span className="max-w-[65%] text-right text-foreground">
        {value}
      </span>
    </div>
  );
}