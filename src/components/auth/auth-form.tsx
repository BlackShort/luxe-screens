// components/auth/auth-form.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    Eye,
    EyeOff,
    InfoIcon,
    LockKeyhole,
    Mail,
    UserRound,
} from "lucide-react";

type Mode = "signin" | "signup";

interface AuthFormProps {
    mode: Mode;
    isModal?: boolean;
    onClose?: () => void;
    onModeChange?: (mode: Mode) => void;
}

function Field({
    label,
    required,
    icon,
    right,
    optionbtn,
    children,
}: {
    label: string;
    required?: boolean;
    icon?: React.ReactNode;
    right?: React.ReactNode;
    optionbtn?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                    {label}

                    {required && (
                        <span className="ml-1 text-primary">*</span>
                    )}
                </label>

                {optionbtn}
            </div>

            <div className="relative">
                <div className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
                    {icon}
                </div>

                {children}

                {right && (
                    <div className="absolute right-3.5 top-1/2 z-10 -translate-y-1/2">
                        {right}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function AuthForm({
    mode,
    isModal = false,
    onClose,
    onModeChange,
}: AuthFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isSignup = mode === "signup";

    const handleModeChange = (nextMode: Mode) => {
        if (onModeChange) {
            onModeChange(nextMode);
        }
    };

    return (
        <section className="relative w-full max-w-md">
            <div className="card-premium relative overflow-hidden bg-card/95 p-6 sm:px-8 sm:py-6">
                {/* Navigation */}
                {isModal ? (
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close authentication"
                        className="
                            absolute right-0 top-0
                            flex h-9 w-9
                            cursor-pointer items-center justify-center
                            rounded-bl-xl
                            border-b border-l border-gold-soft
                            bg-secondary
                            text-gold-deep
                            transition-colors
                            hover:bg-gold-soft
                        "
                    >
                        <span
                            aria-hidden="true"
                            className="text-lg leading-none"
                        >
                            ×
                        </span>
                    </button>
                ) : (
                    <Link
                        href="/"
                        aria-label="Back to home"
                        className="
                            absolute right-0 top-0
                            flex items-center gap-1.5
                            rounded-bl-xl
                            border-b border-l border-gold-soft
                            bg-secondary
                            px-3.5 py-2
                            text-xs font-medium text-gold-deep
                            transition-colors
                            hover:bg-gold-soft
                        "
                    >
                        <ArrowLeft size={15} />
                        Back
                    </Link>
                )}

                {/* Header */}
                <div className="mb-7">
                    <span className="eyebrow mb-3">
                        {isSignup ? "Join us" : "Welcome back"}
                    </span>

                    <h1 className="font-serif text-2xl tracking-[-0.02em]">
                        {isSignup
                            ? "Create an account"
                            : "Welcome back"}
                    </h1>

                    <p className="mt-1.5 text-sm text-muted-foreground">
                        {isSignup
                            ? "Enter your information to get started."
                            : "Sign in to continue your private theatre experience."}
                    </p>
                </div>

                {/* Social buttons */}
                <div className="grid gap-3 sm:grid-cols-2">
                    <button
                        type="button"
                        className="
                            flex h-11 items-center justify-center gap-2
                            rounded-xl border border-border
                            bg-background
                            text-sm font-medium
                            transition
                            hover:border-primary/50
                            hover:bg-secondary
                        "
                    >
                        <GoogleIcon />
                        Google
                    </button>

                    <button
                        type="button"
                        className="
                            flex h-11 items-center justify-center gap-2
                            rounded-xl border border-border
                            bg-background
                            text-sm font-medium
                            transition
                            hover:border-primary/50
                            hover:bg-secondary
                        "
                    >
                        <InstagramIcon />
                        Instagram
                    </button>
                </div>

                {/* Divider */}
                <div className="my-7 flex items-center gap-4">
                    <div className="h-px flex-1 bg-border" />

                    <span className="text-xs text-muted-foreground">
                        Or continue with email
                    </span>

                    <div className="h-px flex-1 bg-border" />
                </div>

                {/* Form */}
                <form
                    className="space-y-5"
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}
                >
                    {/* Full name */}
                    {isSignup && (
                        <Field
                            label="Full name"
                            required
                            icon={<UserRound size={16} />}
                        >
                            <input
                                type="text"
                                placeholder="John Doe"
                                autoComplete="name"
                                className="auth-input caret-primary"
                            />
                        </Field>
                    )}

                    {/* Email */}
                    <Field
                        label="Email address"
                        required
                        icon={<Mail size={16} />}
                    >
                        <input
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="auth-input"
                        />
                    </Field>

                    {/* Password */}
                    <Field
                        label="Password"
                        required
                        icon={<LockKeyhole size={16} />}
                        optionbtn={
                            isSignup ? (
                                <div className="group relative">
                                    <button
                                        type="button"
                                        aria-label="Password requirements"
                                        className="
                                            mr-2 flex cursor-pointer
                                            items-center justify-center
                                            text-muted-foreground
                                            transition
                                            hover:text-gold-deep
                                        "
                                    >
                                        <InfoIcon size={15} />
                                    </button>

                                    <div
                                        className="
                                            pointer-events-none
                                            absolute bottom-full right-0
                                            z-50 mb-2
                                            w-64 translate-y-1
                                            rounded-lg border border-border
                                            bg-card px-3 py-2.5
                                            text-xs leading-5
                                            text-muted-foreground
                                            opacity-0 shadow-xl
                                            transition-all duration-200
                                            group-hover:translate-y-0
                                            group-hover:opacity-100
                                        "
                                    >
                                        Password must be at least 8
                                        characters with uppercase,
                                        lowercase, and number.

                                        <div
                                            className="
                                                absolute
                                                bottom-[-4.5px] right-2.5
                                                h-2 w-2 rotate-45
                                                border-b border-r
                                                border-border
                                                bg-card
                                            "
                                        />
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="
                                        cursor-pointer
                                        text-sm font-medium
                                        text-gold-deep
                                        transition
                                        hover:text-primary
                                        hover:underline
                                    "
                                >
                                    Forgot password?
                                </button>
                            )
                        }
                        right={
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword((current) => !current)
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                className="
                                    flex cursor-pointer
                                    text-muted-foreground
                                    transition
                                    hover:text-foreground
                                "
                            >
                                {showPassword ? (
                                    <EyeOff size={17} />
                                ) : (
                                    <Eye size={17} />
                                )}
                            </button>
                        }
                    >
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder={
                                isSignup
                                    ? "Create a password"
                                    : "Enter your password"
                            }
                            autoComplete={
                                isSignup
                                    ? "new-password"
                                    : "current-password"
                            }
                            className="auth-input pr-12"
                        />
                    </Field>

                    {/* Terms */}
                    {isSignup && (
                        <label
                            className="
                                flex cursor-pointer
                                items-start gap-3
                                text-sm leading-5
                                text-muted-foreground
                            "
                        >
                            <input
                                type="checkbox"
                                required
                                className="
                                    mt-0.5 h-4 w-4 shrink-0
                                    rounded border-border
                                    accent-primary
                                "
                            />

                            <span>
                                I agree to{" "}
                                <Link
                                    href="/terms"
                                    className="
                                        font-medium text-foreground
                                        underline underline-offset-4
                                        hover:text-primary
                                    "
                                >
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="/privacy"
                                    className="
                                        font-medium text-foreground
                                        underline underline-offset-4
                                        hover:text-primary
                                    "
                                >
                                    Privacy Policy
                                </Link>

                                <span className="ml-1 text-destructive">
                                    *
                                </span>
                            </span>
                        </label>
                    )}

                    {/* CTA */}
                    <button
                        type="submit"
                        className="
                            btn-shine group relative
                            flex h-12 w-full
                            cursor-pointer items-center justify-center gap-2
                            rounded-xl
                            bg-primary
                            text-sm font-semibold
                            text-primary-foreground
                            shadow-[0_10px_30px_-12px_rgba(169,120,47,0.7)]
                            transition
                            hover:-translate-y-0.5
                            hover:shadow-[0_14px_34px_-12px_rgba(169,120,47,0.8)]
                        "
                    >
                        {isSignup ? "Create account" : "Sign in"}

                        <ArrowRight
                            size={16}
                            className="
                                transition-transform
                                group-hover:translate-x-1
                            "
                        />
                    </button>
                </form>

                {/* Switch mode */}
                <div
                    className="
                        mt-7
                        border-t border-border
                        pt-6
                        text-center
                        text-sm
                        text-muted-foreground
                    "
                >
                    {isSignup ? (
                        <>
                            Already have an account?{" "}

                            {isModal ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleModeChange("signin")
                                    }
                                    className="
                                        cursor-pointer
                                        font-medium text-gold-deep
                                        underline underline-offset-4
                                        hover:text-primary
                                    "
                                >
                                    Sign in
                                </button>
                            ) : (
                                <Link
                                    href="/auth/sign-in"
                                    className="
                                        font-medium text-gold-deep
                                        underline underline-offset-4
                                        hover:text-primary
                                    "
                                >
                                    Sign in
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            Don&apos;t have an account?{" "}

                            {isModal ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleModeChange("signup")
                                    }
                                    className="
                                        cursor-pointer
                                        font-medium text-gold-deep
                                        underline underline-offset-4
                                        hover:text-primary
                                    "
                                >
                                    Sign up, it&apos;s free
                                </button>
                            ) : (
                                <Link
                                    href="/auth/sign-up"
                                    className="
                                        font-medium text-gold-deep
                                        underline underline-offset-4
                                        hover:text-primary
                                    "
                                >
                                    Sign up, it&apos;s free
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Bottom detail */}
            {!isModal && (
                <p
                    className="
                        mt-6 text-center
                        text-[11px] uppercase
                        tracking-[0.2em]
                        text-muted-foreground
                    "
                >
                    Private theatre · Premium experiences
                </p>
            )}
        </section>
    );
}

function GoogleIcon() {
    return (
        <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.44a5.5 5.5 0 0 1-2.39 3.61v3h3.87c2.26-2.08 3.57-5.14 3.57-8.64Z"
            />

            <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3c-1.07.72-2.44 1.15-4.06 1.15-3.12 0-5.76-2.11-6.71-4.95H1.29v3.09A12 12 0 0 0 12 24Z"
            />

            <path
                fill="#FBBC05"
                d="M5.29 14.29A7.22 7.22 0 0 1 4.91 12c0-.8.14-1.57.38-2.29V6.62H1.29A12 12 0 0 0 0 12c0 1.94.46 3.78 1.29 5.38l4-3.09Z"
            />

            <path
                fill="#EA4335"
                d="M12 4.76c1.77 0 3.36.61 4.61 1.81l3.46-3.46C17.94 1.15 15.23 0 12 0A12 12 0 0 0 1.29 6.62l4 3.09C6.24 6.87 8.88 4.76 12 4.76Z"
            />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <defs>
                <linearGradient
                    id="instagram-gradient"
                    x1="2"
                    y1="22"
                    x2="22"
                    y2="2"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FFDC80" />
                    <stop offset="0.25" stopColor="#FCAF45" />
                    <stop offset="0.5" stopColor="#F77737" />
                    <stop offset="0.75" stopColor="#E1306C" />
                    <stop offset="1" stopColor="#833AB4" />
                </linearGradient>
            </defs>

            <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                stroke="url(#instagram-gradient)"
                strokeWidth="2"
            />

            <circle
                cx="12"
                cy="12"
                r="4"
                stroke="url(#instagram-gradient)"
                strokeWidth="2"
            />

            <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="#E1306C"
            />
        </svg>
    );
}