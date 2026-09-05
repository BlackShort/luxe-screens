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
      description="Choose the city for your private cinema experience."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cities.map((item) => {
          const active = city === item.name;

          return (
            <button
              key={item.name}
              type="button"
              aria-pressed={active}
              onClick={() => onSelectCity(item.name as Place)}
              className={cn(
                "group flex flex-col items-center justify-center gap-2 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                active
                  ? "border-gold-deep bg-gold-deep/5 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={72}
                height={72}
                className="h-18 w-18 object-contain transition-transform duration-300 group-hover:scale-110 sepia-100"
                quality={50}
              />

              <span className="text-xs whitespace-nowrap">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      <Button
        type="button"
        variant="default"
        className="mt-8 w-full"
        disabled={!city}
        onClick={onNext}
      >
        Continue
      </Button>
    </StepShell>
  );
}