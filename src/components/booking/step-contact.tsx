"use client";

import { useState } from "react";
import { StepShell } from "@/components/booking/step-shell";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { contactSchema } from "@/lib/validation";
import type { BookingContact } from "@/types";

export function StepContact({
  contact,
  guests,
  maxGuests,
  onChange,
  onGuestsChange,
  onNext,
  onBack,
}: {
  contact: Partial<BookingContact>;
  guests: number;
  maxGuests: number;
  onChange: (contact: Partial<BookingContact>) => void;
  onGuestsChange: (guests: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);

  function validate() {
    const parsed = contactSchema.safeParse({
      name: contact.name ?? "",
      phone: contact.phone ?? "",
      email: contact.email ?? "",
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0] ?? "",
        phone: fieldErrors.phone?.[0] ?? "",
        email: fieldErrors.email?.[0] ?? "",
      });

      return false;
    }

    setErrors({});
    return true;
  }

  function handleContinue() {
    setTouched(true);

    if (validate()) {
      onNext();
    }
  }

  const nameError = touched ? errors.name : undefined;
  const phoneError = touched ? errors.phone : undefined;
  const emailError = touched ? errors.email : undefined;

  return (
    <StepShell
      title="Contact Details"
      description="So your host knows who to expect at the door."
    >
      <FieldGroup>
        <Field data-invalid={!!nameError}>
          <FieldLabel htmlFor="c-name">
            Full name
          </FieldLabel>

          <Input
            id="c-name"
            value={contact.name ?? ""}
            onChange={(event) =>
              onChange({
                ...contact,
                name: event.target.value,
              })
            }
            placeholder="Aditi Sharma"
            autoComplete="name"
            aria-invalid={!!nameError}
          />

          <FieldError>
            {nameError}
          </FieldError>
        </Field>

        <Field data-invalid={!!phoneError}>
          <FieldLabel htmlFor="c-phone">
            Phone number
          </FieldLabel>

          <Input
            id="c-phone"
            value={contact.phone ?? ""}
            onChange={(event) =>
              onChange({
                ...contact,
                phone: event.target.value,
              })
            }
            placeholder="98765 43210"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={!!phoneError}
          />

          <FieldError>
            {phoneError}
          </FieldError>
        </Field>

        <Field data-invalid={!!emailError}>
          <FieldLabel htmlFor="c-email">
            Email
          </FieldLabel>

          <Input
            id="c-email"
            type="email"
            value={contact.email ?? ""}
            onChange={(event) =>
              onChange({
                ...contact,
                email: event.target.value,
              })
            }
            placeholder="aditi@email.com"
            autoComplete="email"
            aria-invalid={!!emailError}
          />

          <FieldError>
            {emailError}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="c-guests">
            Guests (max {maxGuests})
          </FieldLabel>

          <Input
            id="c-guests"
            type="number"
            min={1}
            max={maxGuests}
            value={guests}
            onChange={(event) => {
              const value = Number(event.target.value);

              onGuestsChange(
                Number.isFinite(value)
                  ? Math.min(Math.max(value, 1), maxGuests)
                  : 1
              );
            }}
          />
        </Field>
      </FieldGroup>

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
          onClick={handleContinue}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </StepShell>
  );
}