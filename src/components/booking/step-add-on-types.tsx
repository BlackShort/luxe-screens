"use client";

import { Check } from "lucide-react";
import { StepShell } from "@/components/booking/step-shell";
import { Button } from "@/components/ui/button";
import { useAddOns } from "@/hooks/api/use-add-ons";
import { cn, formatCurrency } from "@/lib/utils";
import type { CartItem } from "@/types";

export function StepAddOnTypes({
  selectedCategories,
  cart,
  onToggleItem,
  onNext,
  onBack,
}: {
  selectedCategories: string[];
  cart: CartItem[];
  onToggleItem: (item: CartItem) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const { addOns, loading } = useAddOns();

  const relevant = addOns.filter((addOn) =>
    selectedCategories.includes(addOn.id)
  );

  if (loading) {
    return (
      <StepShell
        title="Select Add-on Types"
        description="Choose as many options as you'd like. You can change this later."
      >
        <p className="text-sm text-muted-foreground">Loading options…</p>
      </StepShell>
    );
  }

  if (relevant.length === 0) {
    return (
      <StepShell
        title="Select Add-on Types"
        description="No add-ons were selected — you can go straight to payment."
      >
        <div className="flex gap-3">
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
            Continue
          </Button>
        </div>
      </StepShell>
    );
  }

  return (
    <StepShell
      title="Select Add-on Types"
      description="Choose as many options as you'd like. You can change this later."
    >
      <div className="space-y-8">
        {relevant.map((addOn) => {
          const selectedItems = cart.filter(
            (item) => item.addOnId === addOn.id
          );

          return (
            <div key={addOn.id}>
              <div className="mb-3 flex items-center gap-2">
                <addOn.icon
                  size={16}
                  aria-hidden="true"
                  className="text-primary"
                />

                <p className="text-sm font-medium text-foreground">
                  {addOn.label}
                </p>

                {selectedItems.length > 0 ? (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    {selectedItems.length} selected
                  </span>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {addOn.options.map((option) => {
                  const active = cart.some(
                    (item) =>
                      item.addOnId === addOn.id &&
                      item.optionName === option.name
                  );

                  const item: CartItem = {
                    addOnId: addOn.id,
                    category: addOn.category,
                    optionName: option.name,
                    price: option.price,
                    quantity: 1,
                  };

                  return (
                    <button
                      key={option.name}
                      type="button"
                      aria-pressed={active}
                      onClick={() => onToggleItem(item)}
                      className={cn(
                        "relative flex min-h-14 items-center justify-between gap-4 rounded-lg border px-4 py-3 pr-12 text-left text-sm transition-all duration-200",
                        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                        active
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <span className="min-w-0">
                        {option.name}
                      </span>

                      <span
                        className={cn(
                          "shrink-0 font-medium",
                          active
                            ? "text-primary"
                            : "text-foreground"
                        )}
                      >
                        {formatCurrency(option.price)}
                      </span>

                      {active ? (
                        <span
                          className="absolute bottom-2.5 right-3 flex size-5 items-center justify-center rounded-full bg-success text-success-foreground"
                          aria-hidden="true"
                        >
                          <Check
                            size={12}
                            strokeWidth={3}
                          />
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
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
          {cart.length > 0 ? "Continue" : "Skip add-ons"}
        </Button>
      </div>
    </StepShell>
  );
}