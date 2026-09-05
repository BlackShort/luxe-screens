"use client";

import { StepShell } from "@/components/booking/step-shell";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { occasions } from "@/data/occasions";
import { cn } from "@/lib/utils";
import type { OccasionType } from "@/types";

export function StepOccasion({
  occasion,
  note,
  onSelect,
  onNoteChange,
  onNext,
  onBack,
}: {
  occasion?: OccasionType;
  note?: string;
  onSelect: (occasion: OccasionType) => void;
  onNoteChange: (note: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <StepShell
      title="Select Occasion"
      description="This shapes the add-on suggestions on the next steps."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {occasions.map((item) => {
          const active = occasion === item.type;

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(item.type)}
              className={cn(
                "flex flex-col items-start gap-3 rounded-lg border p-4 text-left transition-colors",
                "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                active
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <item.icon
                size={18}
                aria-hidden="true"
                className="text-primary"
              />

              <span className="text-sm font-medium">
                {item.type}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <Field>
          <FieldLabel htmlFor="occasion-note">
            Anything we should know? (optional)
          </FieldLabel>

          <Textarea
            id="occasion-note"
            rows={3}
            maxLength={300}
            value={note ?? ""}
            onChange={(event) =>
              onNoteChange(event.target.value)
            }
            placeholder="It's a surprise, please keep the lights dim when we walk in…"
            className="resize-none scrollbar-thin"
          />

          <FieldDescription>
            {note?.length ?? 0}/300 characters
          </FieldDescription>
        </Field>
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
          className="flex-1"
          disabled={!occasion}
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </StepShell>
  );
}