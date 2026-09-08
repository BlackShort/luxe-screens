"use client";

import { Button } from "@/components/ui/button";
import { StepShell } from "@/components/booking/step-shell";
import { cities } from "@/data/content";
import { cn } from "@/lib/utils";
import type { Place } from "@/types";
import Image from "next/image";

export function StepLocation({
  city,
  onSelectCity,
  onNext,
}: {
  city?: Place;
  onSelectCity: (city: Place) => void;
  onNext: () => void;
}) {
  return (
    <StepShell
      title="Select Location"
      description="Pick a city to see the rooms available there."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {cities.map((item) => {
          const active = city === item.name;

          return (
            <button
              key={item.name}
              type="button"
              aria-pressed={active}
              onClick={() => onSelectCity(item.name as Place)}
              className={cn(
                "group relative flex min-h-[122px] flex-col items-center justify-center",
                "rounded-xl border px-3 py-4 text-center text-sm",
                "transition-all duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",

                active
                  ? [
                    "border-solid border-gold-deep",
                    "bg-gold-deep/5",
                    "text-foreground",
                    "shadow-sm",
                  ]
                  : [
                    "border-dashed border-border",
                    "bg-background text-muted-foreground",
                    "hover:border-gold-deep/60",
                    "hover:bg-gold-deep/3",
                    "hover:text-foreground",
                  ]
              )}
            >
              {active && (
                <span
                  className="
                    absolute right-2.5 top-2.5
                    flex size-5 items-center justify-center
                    rounded-full bg-gold-deep text-white
                  "
                  aria-hidden="true"
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </span>
              )}

              <Image
                src={item.icon}
                alt={item.name}
                className="
                  h-20 w-20
                  object-contain
                  sepia-100
                  transition-transform duration-200
                  group-hover:scale-105
                "
                quality={60}
              />

              <span
                className={cn(
                  "mt-2 text-xs font-medium",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      <Button
        type="button"
        className="
          mt-8 h-11 w-full
          rounded-lg
          font-medium
          shadow-sm
          transition-all
          hover:shadow-md
        "
        disabled={!city}
        onClick={onNext}
      >
        Continue
        <span className="ml-2">→</span>
      </Button>
    </StepShell>
  );
}