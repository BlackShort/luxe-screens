"use client";

import { useState, type FormEvent } from "react";
import { Wand2, Star, Users, MapPin } from "lucide-react";

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
    <div className="py-12 md:py-16">
      {/* Header */}
      <div className="mb-10 flex items-start gap-3">
        <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Wand2
            size={18}
            aria-hidden="true"
            className="text-primary"
          />
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-primary">
            AI Experience Planner
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Tell us the occasion, we&apos;ll do the rest
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Give us a few details and we&apos;ll recommend a room and
            add-ons that fit your experience.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[380px_1fr] lg:gap-10">
        {/* Planner form */}
        <form
          onSubmit={onSubmit}
          className="h-fit rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm"
        >
          <FieldGroup>
            {/* Occasion */}
            <Field>
              <FieldLabel>
                Occasion
              </FieldLabel>

              <div className="grid grid-cols-2 gap-2">
                {occasions.map((item) => {
                  const active = occasion === item.type;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setOccasion(item.type)}
                      className={cn(
                        "flex min-h-10 items-center gap-2 rounded-md border px-3 py-2 text-left text-xs transition-colors",
                        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                        active
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <item.icon
                        size={14}
                        aria-hidden="true"
                        className="shrink-0 text-primary"
                      />

                      <span>{item.type}</span>
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

              <select
                id="planner-city"
                value={city ?? ""}
                onChange={(e) =>
                  setCity(e.target.value as Place)
                }
                className={cn(
                  "h-9 w-full rounded-md border border-input bg-background px-3",
                  "text-sm text-foreground shadow-xs",
                  "outline-none transition-colors",
                  "focus:border-ring focus:ring-3 focus:ring-ring/50"
                )}
              >
                <option value="" disabled>
                  Select a city
                </option>

                {cities.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Field>

            {/* Guests */}
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="planner-guests">
                  Guests
                </FieldLabel>

                <span className="text-sm font-medium text-primary">
                  {guests}
                </span>
              </div>

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
                className="mt-2 w-full accent-primary"
              />

              <FieldDescription>
                Choose the number of guests for your screening.
              </FieldDescription>
            </Field>

            {/* Budget */}
            <Field>
              <FieldLabel htmlFor="planner-budget">
                Budget
              </FieldLabel>

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
              />

              <FieldDescription id="planner-budget-description">
                Your approximate total budget in rupees.
              </FieldDescription>
            </Field>
          </FieldGroup>

          {/* Error */}
          {error ? (
            <p
              role="alert"
              className="mt-5 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}

          {/* Submit */}
          <Button
            type="submit"
            className="mt-6 w-full"
            disabled={!occasion || !city || loading}
          >
            {loading
              ? "Thinking…"
              : "Get my recommendation"}
          </Button>
        </form>

        {/* Result */}
        <div>
          {result === null ? (
            <div className="flex min-h-80 items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 p-10 text-center">
              <div className="max-w-sm">
                <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <Wand2
                    size={18}
                    aria-hidden="true"
                    className="text-primary"
                  />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Fill in the occasion, city, and budget — we&apos;ll
                  shortlist a room and add-ons that fit.
                </p>
              </div>
            </div>
          ) : null}

          {result === "empty" ? (
            <div className="flex min-h-80 items-center justify-center rounded-lg border border-border bg-card p-10 text-center">
              <div className="max-w-sm">
                <p className="text-sm font-medium text-foreground">
                  No matching rooms found
                </p>

                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  No rooms in {city} fit that group size yet — try a
                  smaller group or another city.
                </p>
              </div>
            </div>
          ) : null}

          {result && result !== "empty" ? (
            <div className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm md:p-7">
              {/* Recommendation heading */}
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">
                  Recommended for you
                </p>

                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  {result.theater.name}
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin
                      size={12}
                      aria-hidden="true"
                    />
                    {result.theater.city}
                  </span>

                  <span className="flex items-center gap-1">
                    <Star
                      size={12}
                      aria-hidden="true"
                      className="text-primary"
                      fill="currentColor"
                    />
                    {result.theater.rating}
                  </span>

                  <span className="flex items-center gap-1">
                    <Users
                      size={12}
                      aria-hidden="true"
                    />
                    Up to {result.theater.maxCapacity}
                  </span>
                </div>
              </div>

              {/* Suggested add-ons */}
              {result.suggestedAddOns.length > 0 ? (
                <div className="mt-6 border-t border-border pt-6">
                  <p className="mb-3 text-xs font-medium text-muted-foreground">
                    Suggested add-ons
                  </p>

                  <div className="space-y-3">
                    {result.suggestedAddOns.map((addon) => (
                      <div
                        key={`${addon.addOnId}-${addon.optionName}`}
                        className="flex items-center justify-between gap-4 text-sm"
                      >
                        <span className="text-muted-foreground">
                          {addon.optionName}
                        </span>

                        <span className="shrink-0 font-medium text-foreground">
                          {formatCurrency(addon.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Total */}
              <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
                <span className="text-sm text-muted-foreground">
                  Estimated total
                </span>

                <span className="text-xl font-semibold text-primary">
                  {formatCurrency(result.estimatedTotal)}
                </span>
              </div>

              {/* CTA */}
              <Link
                href={`/booking?occasion=${encodeURIComponent(
                  occasion ?? ""
                )}`}
                className="mt-6 w-full"
              >
                Continue to booking
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}