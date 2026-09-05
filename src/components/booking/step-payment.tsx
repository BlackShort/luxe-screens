"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { StepShell } from "@/components/booking/step-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatDate, formatTime, generateId } from "@/lib/utils";
import { cartSubtotal } from "@/lib/pricing";
import { getTheaterById } from "@/data/theaters";
import type { BookingDraft, Booking } from "@/types";

export function StepPayment({
  draft,
  onConfirmed,
  onBack,
}: {
  draft: BookingDraft;
  onConfirmed: (booking: Booking) => void;
  onBack: () => void;
}) {
  const theater = draft.theaterId
    ? getTheaterById(draft.theaterId)
    : undefined;

  const [couponInput, setCouponInput] = useState("");

  const [couponState, setCouponState] = useState<
    | { status: "idle" }
    | { status: "checking" }
    | {
      status: "valid";
      discount: number;
      total: number;
    }
    | {
      status: "invalid";
      reason: string;
    }
  >({ status: "idle" });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal =
    (theater?.basePrice ?? 0) +
    cartSubtotal(draft.cart);

  const displayTotal = useMemo(() => {
    if (couponState.status === "valid") {
      return couponState.total;
    }

    return subtotal;
  }, [couponState, subtotal]);

  async function checkCoupon() {
    if (!couponInput.trim()) return;

    setCouponState({ status: "checking" });

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: couponInput,
          subtotal,
        }),
      });

      const data = await res.json();

      if (res.ok && data.valid) {
        setCouponState({
          status: "valid",
          discount: data.discount,
          total: data.total,
        });
      } else {
        setCouponState({
          status: "invalid",
          reason: data.reason ?? "Invalid coupon",
        });
      }
    } catch {
      setCouponState({
        status: "invalid",
        reason: "Couldn't check that code right now.",
      });
    }
  }

  async function pay() {
    if (
      !theater ||
      !draft.location ||
      !draft.slotId ||
      !draft.date ||
      !draft.time ||
      !draft.occasion
    ) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: draft.location,
          theaterId: theater.id,
          slotId: draft.slotId,
          date: draft.date,
          time: draft.time,
          guests: draft.guests ?? 1,
          contact: {
            name: draft.contact?.name ?? "",
            phone: draft.contact?.phone ?? "",
            email: draft.contact?.email ?? "",
          },
          occasion: draft.occasion,
          occasionNote: draft.occasionNote,
          cart: draft.cart,
          couponCode:
            couponState.status === "valid"
              ? couponInput.trim().toUpperCase()
              : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error ??
          "Couldn't create the booking. Please review the previous steps."
        );
        return;
      }

      const confirmRes = await fetch(
        "/api/booking/confirm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId: data.booking.id,
            paymentToken: generateId("tok"),
          }),
        }
      );

      const confirmData = await confirmRes.json();

      if (!confirmRes.ok) {
        setError(
          confirmData.error ??
          "Payment could not be confirmed."
        );
        return;
      }

      onConfirmed(confirmData.booking as Booking);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!theater) {
    return (
      <StepShell title="Payment">
        <p className="text-sm text-destructive">
          Missing room selection — please go back and pick a room.
        </p>
      </StepShell>
    );
  }

  return (
    <StepShell
      title="Review & Pay"
      description="Double-check the details before we lock in your slot."
    >
      <div className="space-y-3 border-b border-border pb-6 text-sm">
        <div className="flex justify-between gap-4 text-muted-foreground">
          <span>Room</span>
          <span className="text-right text-foreground">
            {theater.name}, {theater.city}
          </span>
        </div>

        {draft.date && draft.time ? (
          <div className="flex justify-between gap-4 text-muted-foreground">
            <span>Date &amp; time</span>
            <span className="text-right text-foreground">
              {formatDate(draft.date)} ·{" "}
              {formatTime(draft.time)}
            </span>
          </div>
        ) : null}

        <div className="flex justify-between gap-4 text-muted-foreground">
          <span>Occasion</span>
          <span className="text-right text-foreground">
            {draft.occasion}
          </span>
        </div>

        <div className="flex justify-between gap-4 text-muted-foreground">
          <span>Guests</span>
          <span className="text-right text-foreground">
            {draft.guests ?? 1}
          </span>
        </div>
      </div>

      {draft.cart.length > 0 ? (
        <div className="space-y-2 border-b border-border py-6 text-sm">
          {draft.cart.map((item) => (
            <div
              key={`${item.addOnId}-${item.optionName}`}
              className="flex justify-between gap-4 text-muted-foreground"
            >
              <span>{item.optionName}</span>

              <span className="shrink-0 text-foreground">
                {formatCurrency(
                  item.price * item.quantity
                )}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="py-6">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Have a coupon?
        </p>

        <div className="flex gap-2">
          <Input
            value={couponInput}
            onChange={(event) => {
              setCouponInput(event.target.value);
              setCouponState({ status: "idle" });
            }}
            placeholder="LUXE20"
            className="flex-1"
            aria-label="Coupon code"
          />

          <Button
            type="button"
            variant="secondary"
            onClick={checkCoupon}
            disabled={
              couponState.status === "checking" ||
              !couponInput.trim()
            }
          >
            {couponState.status === "checking"
              ? "Checking…"
              : "Apply"}
          </Button>
        </div>

        {couponState.status === "valid" ? (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-primary">
            <CheckCircle2
              size={13}
              aria-hidden="true"
            />

            Coupon applied — you saved{" "}
            {formatCurrency(couponState.discount)}
          </p>
        ) : null}

        {couponState.status === "invalid" ? (
          <p className="mt-2 text-xs text-destructive">
            {couponState.reason}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-6">
        <span className="text-sm text-muted-foreground">
          Total
        </span>

        <span className="text-2xl font-semibold text-primary">
          {formatCurrency(displayTotal)}
        </span>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-4 text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onBack}
          className="flex-1"
          disabled={submitting}
        >
          Back
        </Button>

        <Button
          type="button"
          className="flex-1"
          onClick={pay}
          disabled={submitting}
        >
          {submitting
            ? "Processing…"
            : `Pay ${formatCurrency(displayTotal)}`}
        </Button>
      </div>
    </StepShell>
  );
}