"use client";

import { useState, type FormEvent } from "react";
import { Star, Users, MapPin, PencilSparkles } from "lucide-react";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { occasions } from "@/data/occasions";
import { cities } from "@/data/content";
import { formatCurrency, cn } from "@/lib/utils";
import type { OccasionType, Place, Theater } from "@/types";
import Link from "next/link"
import { SiteLayout } from "@/components/site/layout/site-layout";


interface Recommendation {
  theater: Theater;
  suggestedAddOns: {
    addOnId: string;
    optionName: string;
    price: number;
  }[];
  estimatedTotal: number;
}

export default function AiPlannerPage() {
  const [occasion, setOccasion] = useState<OccasionType | undefined>();
  const [city, setCity] = useState<Place | undefined>();
  const [guests, setGuests] = useState(4);
  const [budget, setBudget] = useState(3000);
  const [result, setResult] =
    useState<Recommendation | null | "empty">(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!occasion || !city) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/planner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          occasion,
          city,
          guests,
          budget,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error ?? "Couldn't generate a recommendation."
        );
        return;
      }

      setResult(data.recommendation ?? "empty");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">

        {/* Header */}
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/10">
              <PencilSparkles
                size={13}
                aria-hidden="true"
                className="text-primary"
              />
            </div>

            <span className="text-xs font-medium tracking-wide text-primary">
              AI Experience Planner
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Tell us the occasion,
            <span className="block text-primary">
              we&apos;ll do the rest.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Tell us a little about your celebration and we&apos;ll recommend
            the perfect private cinema experience, room and add-ons.
          </p>
        </header>

        {/* Main */}
        <div className="grid items-start gap-6 lg:grid-cols-[390px_minmax(0,1fr)] lg:gap-8">

          {/* Planner */}
          <form
            onSubmit={onSubmit}
            className="
          rounded-2xl border border-border/70
          bg-card text-card-foreground
          p-5 shadow-sm
          sm:p-6
        "
          >
            {/* Card heading */}
            <div className="mb-6">
              <h2 className="text-base font-semibold text-foreground">
                Plan your experience
              </h2>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                A few details are all we need.
              </p>
            </div>

            <FieldGroup>

              {/* Occasion */}
              <Field>
                <div className="mb-3 flex items-center justify-between">
                  <FieldLabel>
                    Occasion
                  </FieldLabel>

                  {occasion && (
                    <span className="text-xs font-medium text-primary">
                      Selected
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {occasions.map((item) => {
                    const active = occasion === item.type;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setOccasion(item.type)}
                        className={cn(
                          `
                        group relative flex min-h-13
                        items-center gap-2.5
                        rounded-xl border px-3
                        text-left text-sm
                        transition-all duration-200
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-ring
                      `,
                          active
                            ? `
                          border-primary
                          bg-primary/8
                          text-foreground
                          shadow-sm
                        `
                            : `
                          border-border/80
                          bg-background
                          text-muted-foreground
                          hover:border-primary/40
                          hover:bg-primary/3
                          hover:text-foreground
                        `
                        )}
                      >
                        <span
                          className={cn(
                            `
                          flex size-8 shrink-0
                          items-center justify-center
                          rounded-lg transition-colors
                        `,
                            active
                              ? "bg-primary/15 text-primary"
                              : "bg-muted text-primary group-hover:bg-primary/10"
                          )}
                        >
                          <item.icon
                            size={15}
                            aria-hidden="true"
                          />
                        </span>

                        <span className="font-medium">
                          {item.type}
                        </span>

                        {active && (
                          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </Field>

              {/* City */}
              <Field>
                <FieldLabel htmlFor="planner-city">
                  City
                </FieldLabel>

                <div className="relative mt-2">
                  <select
                    id="planner-city"
                    value={city ?? ""}
                    onChange={(e) =>
                      setCity(e.target.value as Place)
                    }
                    className="
                  h-11 w-full appearance-none
                  rounded-xl border border-border/80
                  bg-background
                  px-3.5 pr-10
                  text-sm text-foreground
                  shadow-none
                  outline-none
                  transition-all
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/15
                "
                  >
                    <option value="" disabled>
                      Select a city
                    </option>

                    {cities.map((item) => (
                      <option
                        key={item.name}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-muted-foreground"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </Field>

              {/* Guests */}
              <Field>
                <div className="flex items-center justify-between">
                  <div>
                    <FieldLabel htmlFor="planner-guests">
                      Guests
                    </FieldLabel>

                    <p className="mt-1 text-xs text-muted-foreground">
                      How many people are joining?
                    </p>
                  </div>

                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <span className="text-sm font-semibold text-primary">
                      {guests}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <input
                    id="planner-guests"
                    type="range"
                    min={1}
                    max={20}
                    value={guests}
                    onChange={(e) =>
                      setGuests(Number(e.target.value))
                    }
                    aria-valuemin={1}
                    aria-valuemax={20}
                    aria-valuenow={guests}
                    className="
                  h-1.5 w-full
                  cursor-pointer
                  accent-primary
                "
                  />

                  <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                    <span>1 guest</span>
                    <span>20 guests</span>
                  </div>
                </div>
              </Field>

              {/* Budget */}
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="planner-budget">
                    Budget
                  </FieldLabel>

                  <span className="text-xs text-muted-foreground">
                    INR
                  </span>
                </div>

                <div className="relative mt-2">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    ₹
                  </span>

                  <Input
                    id="planner-budget"
                    type="number"
                    min={500}
                    max={200000}
                    step={100}
                    value={budget}
                    onChange={(e) =>
                      setBudget(Number(e.target.value))
                    }
                    aria-describedby="planner-budget-description"
                    className="
                  h-11 rounded-xl
                  pl-8
                  border-border/80
                  focus:border-primary
                  focus:ring-primary/15
                "
                  />
                </div>

                <FieldDescription id="planner-budget-description">
                  Your approximate total budget for the experience.
                </FieldDescription>
              </Field>
            </FieldGroup>

            {/* Error */}
            {error ? (
              <div
                role="alert"
                className="
              mt-5 rounded-xl
              border border-destructive/20
              bg-destructive/5
              px-3.5 py-3
              text-sm text-destructive
            "
              >
                {error}
              </div>
            ) : null}

            {/* CTA */}
            <Button
              type="submit"
              className="
            mt-6 h-12 w-full
            rounded-xl
            text-sm font-medium
            shadow-sm
            transition-all
            hover:shadow-md
          "
              disabled={!occasion || !city || loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Finding your experience...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Get my recommendation
                  <span aria-hidden="true">→</span>
                </span>
              )}
            </Button>

            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              No commitment — we&apos;ll simply find the best match.
            </p>
          </form>

          {/* Recommendation */}
          <div className="min-w-0">

            {result === null ? (
              <div
                className="
              flex min-h-105
              items-center justify-center
              rounded-2xl
              border border-dashed
              border-border
              bg-muted/18
              px-6 py-12
              sm:px-10
            "
              >
                <div className="max-w-md text-center">

                  <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                    <PencilSparkles
                      size={25}
                      aria-hidden="true"
                      className="text-primary"
                    />
                  </div>

                  <p className="mt-6 text-lg font-semibold text-foreground">
                    Your perfect experience starts here
                  </p>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                    Choose an occasion, city, guest count and budget.
                    We&apos;ll match you with a private cinema experience
                    that fits.
                  </p>

                  <div className="mt-7 flex flex-wrap justify-center gap-2">
                    {["Private screening", "Premium rooms", "Curated add-ons"].map(
                      (item) => (
                        <span
                          key={item}
                          className="
                        rounded-full
                        border border-border
                        bg-background
                        px-3 py-1.5
                        text-xs text-muted-foreground
                      "
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : null}

            {/* Empty result */}
            {result === "empty" ? (
              <div
                className="
              flex min-h-105
              items-center justify-center
              rounded-2xl
              border border-border
              bg-card
              px-6 py-12
              text-center
            "
              >
                <div className="max-w-md">

                  <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted">
                    <span className="text-xl">⌕</span>
                  </div>

                  <h2 className="mt-5 text-lg font-semibold text-foreground">
                    No perfect match yet
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    We couldn&apos;t find a room in {city} that fits
                    your group size and budget. Try adjusting either
                    one and we&apos;ll search again.
                  </p>
                </div>
              </div>
            ) : null}

            {/* Recommendation result */}
            {result && result !== "empty" ? (
              <div
                className="
              overflow-hidden
              rounded-2xl
              border border-border/70
              bg-card
              shadow-sm
            "
              >
                {/* Result top */}
                <div className="p-5 sm:p-7">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="inline-flex rounded-full bg-primary/10 px-2.5 py-1">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                          Recommended for you
                        </span>
                      </div>

                      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        {result.theater.name}
                      </h2>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          {result.theater.city}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Star
                            size={13}
                            className="text-primary"
                            fill="currentColor"
                          />
                          {result.theater.rating}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Users size={13} />
                          Up to {result.theater.maxCapacity} guests
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 rounded-xl bg-primary/5 px-4 py-3 sm:text-right">
                      <p className="text-[11px] text-muted-foreground">
                        Estimated total
                      </p>

                      <p className="mt-0.5 text-xl font-semibold text-primary">
                        {formatCurrency(result.estimatedTotal)}
                      </p>
                    </div>
                  </div>

                  {/* Add-ons */}
                  {result.suggestedAddOns.length > 0 ? (
                    <div className="mt-7 border-t border-border pt-6">

                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-foreground">
                          Suggested add-ons
                        </h3>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Extras selected to complement your occasion.
                        </p>
                      </div>

                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {result.suggestedAddOns.map((addon) => (
                          <div
                            key={`${addon.addOnId}-${addon.optionName}`}
                            className="
                          flex items-center
                          justify-between gap-4
                          rounded-xl
                          border border-border/70
                          bg-background
                          px-4 py-3
                        "
                          >
                            <span className="text-sm text-muted-foreground">
                              {addon.optionName}
                            </span>

                            <span className="shrink-0 text-sm font-semibold text-foreground">
                              {formatCurrency(addon.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Bottom CTA */}
                <div
                  className="
                border-t border-border
                bg-muted/18
                p-5
                sm:px-7 sm:py-5
              "
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Ready to make it special?
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Continue to booking to choose your date and time.
                      </p>
                    </div>

                    <Link
                      href={`/booking?occasion=${encodeURIComponent(
                        occasion ?? ""
                      )}`}
                      className="
                    inline-flex h-11
                    w-full items-center justify-center
                    rounded-xl
                    bg-primary px-5
                    text-sm font-medium
                    text-primary-foreground
                    shadow-sm
                    transition-all
                    hover:opacity-90
                    hover:shadow-md
                    sm:w-auto
                  "
                    >
                      Continue to booking
                      <span className="ml-2">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}

          </div>
        </div>
      </div>
    </SiteLayout>
  );
}