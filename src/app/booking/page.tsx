"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { StepIndicator } from "@/components/booking/step-indicator";
import { useBookingDraft } from "@/hooks/useBookingDraft";
import { StepLocation } from "@/components/booking/step-location";
import { StepTheatre } from "@/components/booking/step-theatre";
import { StepDateTime } from "@/components/booking/step-date-time";
import { StepContact } from "@/components/booking/step-contact";
import { StepOccasion } from "@/components/booking/step-occasion";
import { StepAddOnCategories } from "@/components/booking/step-add-on-categories";
import { StepAddOnTypes } from "@/components/booking/step-add-on-types";
import { StepPayment } from "@/components/booking/step-payment";
import { StepReceipt } from "@/components/booking/step-receipt";
import { getTheaterById } from "@/data/theaters";
import type { Booking, OccasionType } from "@/types";
import { Button } from "@/components/ui/button";

const TOTAL_STEPS = 9;

function BookingWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const preselectedOccasion =
    searchParams.get("occasion") as OccasionType | null;

  const { draft, update, toggleCartItem } = useBookingDraft();

  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>([]);
  const [completedBooking, setCompletedBooking] =
    useState<Booking | null>(null);

  const theater = draft.theaterId
    ? getTheaterById(draft.theaterId)
    : undefined;

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((category) => category !== id)
        : [...prev, id]
    );
  }

  function goDone() {
    setStep(1);
    setCompletedBooking(null);
    setSelectedCategories([]);
    router.push("/");
  }

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
          <div className="mx-auto mb-10 max-w-xl">
            <StepIndicator current={step} />
          </div>
        ) : null}

        {/* Main booking area */}
        <div className="mx-auto max-w-xl">
          <div className="relative">
            {/* Step 1 — Location */}
            {step === 1 ? (
              <StepLocation
                city={draft.location}
                onSelectCity={(city) =>
                  update({
                    location: city,
                    theaterId: undefined,
                    date: undefined,
                    time: undefined,
                    slotId: undefined,
                  })
                }
                onNext={() => setStep(2)}
              />
            ) : null}

            {/* Step 2 — Theatre */}
            {step === 2 ? (
              <StepTheatre
                city={draft.location}
                theaterId={draft.theaterId}
                onSelectTheater={(theaterId) =>
                  update({
                    theaterId,
                    date: undefined,
                    time: undefined,
                    slotId: undefined,
                  })
                }
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            ) : null}

            {/* Step 3 — Date & Time */}
            {step === 3 ? (
              <StepDateTime
                theaterId={draft.theaterId}
                date={draft.date}
                time={draft.time}
                onSelect={(date, time, slotId) =>
                  update({
                    date,
                    time,
                    slotId,
                  })
                }
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            ) : null}

            {/* Step 4 — Contact */}
            {step === 4 ? (
              <StepContact
                contact={draft.contact ?? {}}
                guests={draft.guests ?? 1}
                maxGuests={theater?.maxCapacity ?? 12}
                onChange={(contact) => update({ contact })}
                onGuestsChange={(guests) => update({ guests })}
                onNext={() => setStep(5)}
                onBack={() => setStep(3)}
              />
            ) : null}

            {/* Step 5 — Occasion */}
            {step === 5 ? (
              <StepOccasion
                occasion={
                  draft.occasion ??
                  preselectedOccasion ??
                  undefined
                }
                note={draft.occasionNote}
                onSelect={(occasion) => update({ occasion })}
                onNoteChange={(occasionNote) =>
                  update({ occasionNote })
                }
                onNext={() => setStep(6)}
                onBack={() => setStep(4)}
              />
            ) : null}

            {/* Step 6 — Add-on Categories */}
            {step === 6 ? (
              <StepAddOnCategories
                selected={selectedCategories}
                onToggle={toggleCategory}
                onNext={() => setStep(7)}
                onBack={() => setStep(5)}
              />
            ) : null}

            {/* Step 7 — Add-on Types */}
            {step === 7 ? (
              <StepAddOnTypes
                selectedCategories={selectedCategories}
                cart={draft.cart}
                onToggleItem={toggleCartItem}
                onNext={() => setStep(8)}
                onBack={() => setStep(6)}
              />
            ) : null}

            {/* Step 8 — Payment */}
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

            {/* Step 9 — Receipt */}
            {step === 9 && completedBooking ? (
              <StepReceipt
                booking={completedBooking}
                onDone={goDone}
              />
            ) : null}
          </div>

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