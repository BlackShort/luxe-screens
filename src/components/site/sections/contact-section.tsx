"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactMessageSchema } from "@/lib/validation";
import { Reveal } from "@/components/site/common/reveal";

type Status = "idle" | "submitting" | "sent" | "error";

type FormValues = {
    name: string;
    email: string;
    message: string;
};

const initialValues: FormValues = {
    name: "",
    email: "",
    message: "",
};

export function Contact() {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<Partial<FormValues>>({});
    const [status, setStatus] = useState<Status>("idle");

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;

        setValues((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
        }));

        if (status === "error") {
            setStatus("idle");
        }
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const parsed = contactMessageSchema.safeParse(values);

        if (!parsed.success) {
            const fieldErrors = parsed.error.flatten().fieldErrors;

            setErrors({
                name: fieldErrors.name?.[0] ?? "",
                email: fieldErrors.email?.[0] ?? "",
                message: fieldErrors.message?.[0] ?? "",
            });

            return;
        }

        setErrors({});
        setStatus("submitting");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsed.data),
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            setValues(initialValues);
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    }

    const isSubmitting = status === "submitting";

    return (
        <section id="contact" className="px-5 py-16 sm:px-8 sm:py-20"
        >
            <Reveal as="div" className="mb-14 flex flex-col items-center gap-3 text-center">
                <span className="eyebrow">We&apos;re here</span>
                <h1 className="text-3xl font-normal tracking-tight sm:text-4xl">
                    Still have any questions left?
                </h1>
            </Reveal>

            <Reveal delay={120} className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(23,20,15,0.04),0_24px_60px_-30px_rgba(23,20,15,0.18)] md:grid-cols-2">
                {/* Image */}
                <div className="relative min-h-72 md:min-h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c"
                        alt="Private theatre interior"
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="pt-10 px-6 pb-4 sm:px-10">
                    <div className="mb-8">
                        <h2 className="font-serif text-2xl font-normal tracking-tight">
                            Write to us
                        </h2>
                    </div>

                    <form
                        onSubmit={onSubmit}
                        noValidate
                        className="space-y-6"
                    >
                        <FieldGroup>
                            {/* Name */}
                            <Field
                                data-invalid={!!errors.name}
                                data-disabled={isSubmitting}
                            >
                                <FieldLabel htmlFor="contact-name">
                                    Name
                                </FieldLabel>

                                <Input
                                    id="contact-name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    autoComplete="name"
                                    aria-invalid={!!errors.name}
                                    disabled={isSubmitting}
                                />

                                <FieldError>
                                    {errors.name}
                                </FieldError>
                            </Field>

                            {/* Email */}
                            <Field
                                data-invalid={!!errors.email}
                                data-disabled={isSubmitting}
                            >
                                <FieldLabel htmlFor="contact-email">
                                    Email
                                </FieldLabel>

                                <Input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="you@email.com"
                                    autoComplete="email"
                                    aria-invalid={!!errors.email}
                                    disabled={isSubmitting}
                                />

                                <FieldError>
                                    {errors.email}
                                </FieldError>
                            </Field>

                            {/* Message */}
                            <Field
                                data-invalid={!!errors.message}
                                data-disabled={isSubmitting}
                            >
                                <FieldLabel htmlFor="contact-message">
                                    Message
                                </FieldLabel>

                                <Textarea
                                    id="contact-message"
                                    name="message"
                                    rows={5}
                                    value={values.message}
                                    onChange={handleChange}
                                    placeholder="Tell us what you're planning"
                                    aria-invalid={!!errors.message}
                                    disabled={isSubmitting}
                                    className="resize-none scrollbar-thin"
                                />

                                <FieldError>
                                    {errors.message}
                                </FieldError>
                            </Field>
                        </FieldGroup>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-shine w-full rounded-full bg-primary text-primary-foreground hover:bg-primary"
                        >
                            {isSubmitting
                                ? "Sending..."
                                : "Send message"}
                        </Button>

                        <div aria-live="polite">
                            {status === "sent" && (
                                <p className="text-sm text-success">
                                    Thanks — we&apos;ll reply within a day.
                                </p>
                            )}

                            {status === "error" && (
                                <p className="text-sm text-destructive">
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </Reveal>
        </section>
    );
}