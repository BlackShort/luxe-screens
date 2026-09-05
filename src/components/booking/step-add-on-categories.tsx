"use client";

import { Check } from "lucide-react";

import { StepShell } from "@/components/booking/step-shell";
import { Button } from "@/components/ui/button";
import { addOns } from "@/data/addons";
import { cn } from "@/lib/utils";

export function StepAddOnCategories({
  selected,
  onToggle,
  onNext,
  onBack,
}: {
  selected: string[];
  onToggle: (addOnId: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <StepShell
      title="Select Add-ons"
      description="Pick everything you'd like arranged in the room. You can skip this entirely."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {addOns.map((addOn) => {
          const active = selected.includes(addOn.id);

          return (
            <button
              key={addOn.id}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(addOn.id)}
              className={cn(
                "relative flex flex-col items-start gap-3 rounded-lg border p-4 pr-10 text-left text-sm transition-all duration-200",
                "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                active
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <addOn.icon
                size={18}
                aria-hidden="true"
                className={cn(
                  "transition-colors duration-200",
                  active
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              />

              <span>{addOn.label}</span>

              {active ? (
                <span
                  className="absolute bottom-3 right-3 flex size-5 items-center justify-center rounded-full bg-success text-success-foreground"
                  aria-hidden="true"
                >
                  <Check size={12} strokeWidth={3} />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>

        <Button
          type="button"
          onClick={onNext}
          className="flex-1"
        >
          {selected.length > 0 ? "Continue" : "Skip add-ons"}
        </Button>
      </div>
    </StepShell>
  );
}