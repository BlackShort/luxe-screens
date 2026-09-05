"use client";

import { useEffect, useState } from "react";
import { StepShell } from "@/components/booking/step-shell";
import { Button } from "@/components/ui/button";
import { cn, formatDate, formatTime } from "@/lib/utils";
import type { Slot } from "@/types";

export function StepDateTime({
  theaterId,
  date,
  time,
  onSelect,
  onNext,
  onBack,
}: {
  theaterId?: string;
  date?: string;
  time?: string;
  onSelect: (date: string, time: string, slotId: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadedTheaterId, setLoadedTheaterId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(date);

  const loading = theaterId !== undefined && loadedTheaterId !== theaterId && !error;

  useEffect(() => {
    if (!theaterId) return;

    let cancelled = false;

    fetch(
      `/api/slots?theaterId=${encodeURIComponent(theaterId)}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load availability");
        }

        return res.json();
      })
      .then((data) => {
        if (cancelled) return;

        const nextSlots: Slot[] = data.slots ?? [];

        setSlots(nextSlots);
        setSelectedDate(
          (prev) => prev ?? nextSlots[0]?.date
        );
        setError(null);
        setLoadedTheaterId(theaterId);
      })
      .catch(() => {
        if (!cancelled) {
          setError(
            "Couldn't load availability. Please try again."
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [theaterId]);

  const dates = Array.from(
    new Set(slots.map((slot) => slot.date))
  );

  const dayTimes = slots.filter(
    (slot) => slot.date === selectedDate
  );

  return (
    <StepShell
      title="Select Date & Time"
      description="Availability updates in real time from the room's calendar."
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">
          Loading availability…
        </p>
      ) : null}

      {error ? (
        <p
          role="alert"
          className="text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}

      {!loading && !error ? (
        <>
          <div className="scroll-zero flex gap-2 overflow-x-auto pb-2">
            {dates.map((dateValue) => {
              const active = selectedDate === dateValue;

              return (
                <button
                  key={dateValue}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setSelectedDate(dateValue)
                  }
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

          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {dayTimes.map((slot) => {
              const active =
                time === slot.time &&
                date === slot.date;

              const available =
                slot.status === "AVAILABLE";

              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={!available}
                  aria-pressed={active}
                  onClick={() =>
                    onSelect(
                      slot.date,
                      slot.time,
                      slot.id
                    )
                  }
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
          </div>
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
          disabled={!date || !time}
          onClick={onNext}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </StepShell>
  );
}