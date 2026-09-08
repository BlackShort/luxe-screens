"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { waitlistSchema } from "@/lib/validation";

type Status = "idle" | "submitting" | "sent" | "error";

export default function WaitlistPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    city: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsed = waitlistSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0] ?? "",
        email: fieldErrors.email?.[0] ?? "",
        city: fieldErrors.city?.[0] ?? "",
      });

      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2
            size={28}
            aria-hidden="true"
            className="text-success"
          />
        </div>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
          You&apos;re on the list
        </h1>

        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          We&apos;ll email you the moment Luxe Screens opens in{" "}
          {values.city}.
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div>
          <p className="mb-2 text-sm font-medium text-primary">
            Waitlist
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Not in your city yet?
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Tell us where you&apos;d want a Luxe Screens room and
            we&apos;ll let you know first when it opens.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="mt-8"
          noValidate
        >
          <FieldGroup>
            {/* Name */}
            <Field
              data-invalid={Boolean(errors.name)}
            >
              <FieldLabel htmlFor="w-name">
                Name
              </FieldLabel>

              <Input
                id="w-name"
                value={values.name}
                onChange={(e) =>
                  setValues((v) => ({
                    ...v,
                    name: e.target.value,
                  }))
                }
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
              />

              {errors.name ? (
                <FieldError>
                  {errors.name}
                </FieldError>
              ) : null}
            </Field>

            {/* Email */}
            <Field
              data-invalid={Boolean(errors.email)}
            >
              <FieldLabel htmlFor="w-email">
                Email
              </FieldLabel>

              <Input
                id="w-email"
                type="email"
                value={values.email}
                onChange={(e) =>
                  setValues((v) => ({
                    ...v,
                    email: e.target.value,
                  }))
                }
                placeholder="you@email.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />

              {errors.email ? (
                <FieldError>
                  {errors.email}
                </FieldError>
              ) : null}
            </Field>

            {/* City */}
            <Field
              data-invalid={Boolean(errors.city)}
            >
              <FieldLabel htmlFor="w-city">
                City
              </FieldLabel>

              <Input
                id="w-city"
                value={values.city}
                onChange={(e) =>
                  setValues((v) => ({
                    ...v,
                    city: e.target.value,
                  }))
                }
                placeholder="Pune, Chandigarh, Kochi…"
                autoComplete="address-level2"
                aria-invalid={Boolean(errors.city)}
              />

              {errors.city ? (
                <FieldError>
                  {errors.city}
                </FieldError>
              ) : null}
            </Field>
          </FieldGroup>

          {/* Submit */}
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="mt-6 w-full"
          >
            {status === "submitting"
              ? "Joining…"
              : "Join the waitlist"}
          </Button>

          {/* API error */}
          {status === "error" ? (
            <p
              role="alert"
              className="mt-3 text-sm text-destructive"
            >
              Something went wrong. Please try again.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}