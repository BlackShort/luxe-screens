"use client";

import { Suspense, useCallback, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { StepIndicator } from "@/components/booking/step-indicator";
import { StepLocation } from "@/components/booking/step-location";
import { StepTheatre } from "@/components/booking/step-theatre";
import { StepDateTime } from "@/components/booking/step-date-time";
import { StepContact } from "@/components/booking/step-contact";
import { StepOccasion } from "@/components/booking/step-occasion";
import { StepAddOnCategories } from "@/components/booking/step-add-on-categories";
import { StepAddOnTypes } from "@/components/booking/step-add-on-types";
import { StepPayment } from "@/components/booking/step-payment";
import { StepReceipt } from "@/components/booking/step-receipt";
import { HoldCountdown } from "@/components/booking/hold-count-down";
import { useTheater } from "@/hooks/api/use-theater";
import type { Booking, OccasionType } from "@/types";
import { Button } from "@/components/ui/button";
import { useBookingDraft } from "@/hooks/useBookingDraft";

const TOTAL_STEPS = 9;

// Fire-and-forget release, it's used when the user abandons a held slot
function releaseHold(holdToken: string | undefined) {
  if (!holdToken) return;
  fetch("/api/slots/hold", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ holdToken }),
    keepalive: true,
  }).catch(() => { });
}

function BookingWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const preselectedOccasion = searchParams.get("occasion") as OccasionType | null;

  const { draft, update, toggleCartItem } = useBookingDraft();

  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);
  
  const { theater } = useTheater(draft.theaterId);

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((category) => category !== id)
        : [...prev, id]
    );
  }

  const handleHold = useCallback(
    async (
      date: string,
      time: string,
      durationSlots: number
    ): Promise<{ ok: true } | { ok: false; error: string }> => {
      if (!draft.theaterId) return { ok: false, error: "Select a theatre first." };

      releaseHold(draft.holdToken);

      try {
        const res = await fetch("/api/slots/hold", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            theaterId: draft.theaterId,
            date,
            time,
            durationSlots,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          return { ok: false, error: data.error ?? "That time is no longer available." };
        }

        update({
          date,
          time,
          durationSlots,
          holdToken: data.holdToken,
          holdExpiresAt: data.expiresAt,
        });

        return { ok: true };
      } catch {
        return { ok: false, error: "Couldn't reach the server. Please try again." };
      }
    },
    [draft.theaterId, draft.holdToken, update]
  );

  function handleHoldExpired() {
    releaseHold(draft.holdToken);
    update({
      date: undefined,
      time: undefined,
      holdToken: undefined,
      holdExpiresAt: undefined,
    });
    setStep(3);
  }

  function goDone() {
    setStep(1);
    setCompletedBooking(null);
    setSelectedCategories([]);
    router.push("/");
  }

  // Steps from Contact through Payment all happen while a hold is live - show the countdown consistently across them.
  const showCountdown = step >= 4 && step <= 8 && draft.holdExpiresAt;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* Header */}
        <header className="mx-auto mb-10 max-w-xl text-center sm:mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Reserve your screen
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            Create a private cinema experience tailored to
            your evening.
          </p>
        </header>

        {step <= TOTAL_STEPS ? (
          <div className="mx-auto mb-10 max-w-2xl">
            <StepIndicator current={step} />
          </div>
        ) : null}

        {/* Main booking area */}
        <div className="mx-auto max-w-2xl">
          {showCountdown ? (
            <HoldCountdown
              expiresAt={draft.holdExpiresAt!}
              onExpire={handleHoldExpired}
            />
          ) : null}

          <div className="relative">
            {step === 1 ? (
              <StepLocation
                city={draft.location}
                onSelectCity={(city) => {
                  releaseHold(draft.holdToken);
                  update({
                    location: city,
                    theaterId: undefined,
                    date: undefined,
                    time: undefined,
                    holdToken: undefined,
                    holdExpiresAt: undefined,
                  });
                }}
                onNext={() => setStep(2)}
              />
            ) : null}

            {step === 2 ? (
              <StepTheatre
                city={draft.location}
                theaterId={draft.theaterId}
                onSelectTheater={(theaterId) => {
                  releaseHold(draft.holdToken);
                  update({
                    theaterId,
                    date: undefined,
                    time: undefined,
                    holdToken: undefined,
                    holdExpiresAt: undefined,
                  });
                }}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            ) : null}

            {step === 3 ? (
              <StepDateTime
                theaterId={draft.theaterId}
                date={draft.date}
                time={draft.time}
                durationSlots={draft.durationSlots}
                onSelect={(date, time) => update({ date, time })}
                onSelectDuration={(durationSlots) => {
                  releaseHold(draft.holdToken);
                  update({
                    durationSlots,
                    // A previously picked start time might not have room
                    // for the new duration — make them re-pick rather than
                    // silently carrying over an invalid selection.
                    date: undefined,
                    time: undefined,
                    holdToken: undefined,
                    holdExpiresAt: undefined,
                  });
                }}
                onHold={handleHold}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            ) : null}

            {step === 4 ? (
              <StepContact
                contact={draft.contact ?? {}}
                guests={draft.guests ?? 1}
                maxGuests={theater?.maxCapacity ?? 12}
                onChange={(contact) =>
                  update({ contact })
                }
                onGuestsChange={(guests) =>
                  update({ guests })
                }
                onNext={() => setStep(5)}
                onBack={() => setStep(3)}
              />
            ) : null}

            {step === 5 ? (
              <StepOccasion
                occasion={
                  draft.occasion ??
                  preselectedOccasion ??
                  undefined
                }
                note={draft.occasionNote}
                onSelect={(occasion) =>
                  update({ occasion })
                }
                onNoteChange={(occasionNote) =>
                  update({ occasionNote })
                }
                onNext={() => setStep(6)}
                onBack={() => setStep(4)}
              />
            ) : null}

            {step === 6 ? (
              <StepAddOnCategories
                selected={selectedCategories}
                onToggle={toggleCategory}
                onNext={() => setStep(7)}
                onBack={() => setStep(5)}
              />
            ) : null}

            {step === 7 ? (
              <StepAddOnTypes
                selectedCategories={selectedCategories}
                cart={draft.cart}
                onToggleItem={toggleCartItem}
                onNext={() => setStep(8)}
                onBack={() => setStep(6)}
              />
            ) : null}

            {step === 8 ? (
              <StepPayment
                draft={draft}
                onConfirmed={(booking) => {
                  setCompletedBooking(booking);
                  setStep(9);
                }}
                onBack={() => setStep(7)}
              />
            ) : null}

            {step === 9 && completedBooking ? (
              <StepReceipt
                booking={completedBooking}
                onDone={goDone}
              />
            ) : null}
          </div>

          {/* Trust / reassurance */}
          {step < 9 ? (
            <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              Your booking details are kept private and secure.
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <footer className="mx-auto mt-12 max-w-2xl border-t border-border pt-5">
          <Button
            type="button"
            size={"lg"}
            onClick={() => router.push("/")}
            className="cursor-pointer mx-auto flex items-center gap-1.5 text-xs bg-transparent text-foreground rounded-full border border-border hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:scale-95 duration-200 transition-all hover:bg-primary/30"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            Back to home
          </Button>

        </footer>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <div className="mx-auto max-w-2xl animate-pulse">
              <div className="mx-auto h-5 w-28 rounded-full bg-muted" />
              <div className="mx-auto mt-4 h-10 w-72 rounded-md bg-muted" />
              <div className="mx-auto mt-3 h-4 w-96 max-w-full rounded-md bg-muted" />

              <div className="mt-12 h-2 rounded-full bg-muted" />
              <div className="mt-8 h-96 rounded-lg border border-border bg-card" />
            </div>
          </div>
        </main>
      }
    >
      <BookingWizard />
    </Suspense>
  );
}