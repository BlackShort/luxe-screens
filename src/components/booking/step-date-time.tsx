"use client";

import { useEffect, useState } from "react";
import { StepShell } from "@/components/booking/step-shell";
import { Button } from "@/components/ui/button";
import { cn, formatDate, formatTime } from "@/lib/utils";
import {
  MAX_CONSECUTIVE_SLOTS,
  SLOT_DURATION_HOURS,
  canBookConsecutive,
} from "@/lib/slot-times";
import type { Slot } from "@/types";

const DURATION_OPTIONS = Array.from(
  { length: MAX_CONSECUTIVE_SLOTS },
  (_, i) => i + 1
);

export function StepDateTime({
  theaterId,
  date,
  time,
  durationSlots,
  onSelect,
  onSelectDuration,
  onHold,
  onNext,
  onBack,
}: {
  theaterId?: string;
  date?: string;
  time?: string;
  durationSlots?: number;
  onSelect: (date: string, time: string) => void;
  onSelectDuration: (durationSlots: number) => void;
  /** Actually reserves the run of slots — this is the moment the hold timer starts. */
  onHold: (
    date: string,
    time: string,
    durationSlots: number
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  onNext: () => void;
  onBack: () => void;
}) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadedTheaterId, setLoadedTheaterId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(date);
  const [holding, setHolding] = useState(false);
  const [holdError, setHoldError] = useState<string | null>(null);

  const duration = durationSlots ?? 1;

  const loading =
    theaterId !== undefined && loadedTheaterId !== theaterId && !loadError;

  useEffect(() => {
    if (!theaterId) return;

    let cancelled = false;

    fetch(`/api/slots?theaterId=${encodeURIComponent(theaterId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load availability");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;

        const nextSlots: Slot[] = data.slots ?? [];

        setSlots(nextSlots);
        setSelectedDate((prev) => prev ?? nextSlots[0]?.date);
        setLoadError(null);
        setLoadedTheaterId(theaterId);
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError("Couldn't load availability. Please try again.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [theaterId]);

  const dates = Array.from(new Set(slots.map((slot) => slot.date)));
  const dayTimes = slots.filter((slot) => slot.date === selectedDate);

  async function handleContinue() {
    if (!date || !time) return;

    setHolding(true);
    setHoldError(null);

    const result = await onHold(date, time, duration);

    setHolding(false);

    if (result.ok) {
      onNext();
    } else {
      setHoldError(result.error);
      // Someone may have just taken it — refresh the grid so the button
      // greys out instead of staying clickable on stale data.
      if (theaterId) setLoadedTheaterId(null);
    }
  }

  const selectedStartIndex = dayTimes.findIndex(
    (slot) => slot.date === date && slot.time === time
  );

  return (
    <StepShell
      title="Select Date & Time"
      description="Availability updates in real time from the room's calendar."
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading availability…</p>
      ) : null}

      {loadError ? (
        <p role="alert" className="text-sm text-destructive">
          {loadError}
        </p>
      ) : null}

      {!loading && !loadError ? (
        <>
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              How long do you need the room?
            </p>

            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map((option) => {
                const active = duration === option;
                const hours = option * SLOT_DURATION_HOURS;

                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onSelectDuration(option)}
                    className={cn(
                      "rounded-lg border px-3.5 py-2 text-sm transition-colors",
                      "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                      active
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    {option === 1
                      ? `1 slot (~${hours} hrs)`
                      : `${option} slots (~${hours} hrs)`}
                  </button>
                );
              })}
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Longer bookings reserve consecutive slots back-to-back and are
              priced per slot.
            </p>
          </div>

          <div className="scroll-zero mt-6 flex gap-2 overflow-x-auto pb-2">
            {dates.map((dateValue) => {
              const active = selectedDate === dateValue;

              return (
                <button
                  key={dateValue}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedDate(dateValue)}
                  className={cn(
                    "shrink-0 rounded-lg border px-4 py-2.5 text-sm transition-colors",
                    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                    active
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  {formatDate(dateValue)}
                </button>
              );
            })}
          </div>

          {/* <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {dayTimes.map((slot) => {
              const active = time === slot.time && date === slot.date;

              const available = canBookConsecutive(dayTimes, slot.time, duration);

              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={!available}
                  aria-pressed={active}
                  title={
                    !available
                      ? slot.status === "PAST"
                        ? "This time has already passed"
                        : `Not enough consecutive availability for ${duration} slot${duration > 1 ? "s" : ""}`
                      : undefined
                  }
                  onClick={() => {
                    setHoldError(null);
                    onSelect(slot.date, slot.time);
                  }}
                  className={cn(
                    "rounded-lg border px-3 py-3 text-sm transition-colors",
                    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
                    active
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  {formatTime(slot.time)}
                </button>
              );
            })}
          </div> */}

          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {dayTimes.map((slot, index) => {
              const active =
                selectedStartIndex >= 0 &&
                index >= selectedStartIndex &&
                index < selectedStartIndex + duration;

              const available = canBookConsecutive(
                dayTimes,
                slot.time,
                duration
              );

              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={!available}
                  aria-pressed={active}
                  title={
                    !available
                      ? slot.status === "PAST"
                        ? "This time has already passed"
                        : `Not enough consecutive availability for ${duration} slot${duration > 1 ? "s" : ""
                        }`
                      : undefined
                  }
                  onClick={() => {
                    setHoldError(null);
                    onSelect(slot.date, slot.time);
                  }}
                  className={cn(
                    "rounded-lg border px-3 py-3 text-sm transition-colors",
                    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
                    active
                      ? "border-primary bg-gold-soft text-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  {formatTime(slot.time)}
                </button>
              );
            })}
          </div>

          {holdError ? (
            <p role="alert" className="mt-4 text-sm text-destructive">
              {holdError}
            </p>
          ) : null}
        </>
      ) : null}

      <div className="mt-8 flex gap-3">
        <Button
          type="button"
          size={"lg"}
          variant="secondary"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>

        <Button
          type="button"
          size={"lg"}
          disabled={!date || !time || holding}
          onClick={handleContinue}
          className="flex-1"
        >
          {holding ? "Holding your time…" : "Continue"}
        </Button>
      </div>
    </StepShell>
  );
}
