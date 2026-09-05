import { cn } from "@/lib/utils";
import { Check } from "lucide-react";


const STEP_LABELS = [
  "Location",
  "Theatre",
  "Date & Time",
  "Contact",
  "Occasion",
  "Add-ons",
  "Add-on Types",
  "Payment",
  "Receipt",
];

export function StepIndicator({
  current,
}: {
  current: number;
}) {
  return (
    <div className="scroll-zero overflow-x-auto pb-2">
      <div className="flex min-w-max items-center">
        {STEP_LABELS.map((label, index) => {
          const step = index + 1;

          const completed = step < current;
          const active = step === current;
          const hasNext = index < STEP_LABELS.length - 1;

          return (
            <div
              key={label}
              className="flex items-center"
            >
              {/* Step */}
              <div
                aria-current={active ? "step" : undefined}
                className={cn(
                  "relative z-10 flex shrink-0 items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs transition-all duration-300",

                  // Completed
                  completed &&
                  "border-success text-success",

                  // Current
                  active &&
                  "border-primary text-primary",

                  // Upcoming
                  !completed &&
                  !active &&
                  "border-border text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex size-4 items-center justify-center rounded-full text-[10px] font-medium transition-all duration-300",

                    // Completed
                    completed &&
                    "bg-success text-success-foreground",

                    // Current
                    active &&
                    "bg-primary text-primary-foreground",

                    // Upcoming
                    !completed &&
                    !active &&
                    "bg-muted text-muted-foreground"
                  )}
                >
                  {completed ? (
                    <Check
                      size={10}
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  ) : (
                    step
                  )}
                </span>

                <span>{label}</span>
              </div>

              {/* Connector */}
              {hasNext ? (
                <div className="relative z-0 -mx-px h-0.5 w-6 bg-muted sm:w-8">
                  <div
                    className={cn(
                      "h-full transition-all duration-500 ease-out",
                      completed
                        ? "w-full bg-success"
                        : "w-0 bg-success"
                    )}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}