"use client";

import Link from "next/link";
import { Header } from "@/components/site/header/header";
import { Footer } from "@/components/site/footer/footer";
import { Button } from "@/components/ui/button";
import { ShieldX, Home, ArrowLeft } from "lucide-react";
import { goBack } from "@/lib/navigation";

export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />

            <main className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-16">
                {/* Ambient gold glow */}
                <div className="glow-gold pointer-events-none absolute left-1/2 top-1/2 size-125 -translate-x-1/2 -translate-y-1/2 opacity-30" />

                <div className="relative z-10 w-full max-w-lg text-center">
                    {/* Eyebrow */}
                    <div className="mb-6 flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-linear-to-r from-transparent to-primary" />

                        <span className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-gold-deep">
                            Luxe Concierge
                        </span>

                        <span className="h-px w-8 bg-linear-to-l from-transparent to-primary" />
                    </div>

                    {/* Icon */}
                    <div className="mb-7 flex justify-center">
                        <div className="flex size-20 items-center justify-center rounded-full border border-primary/25 bg-primary/10 shadow-[0_16px_40px_-20px_rgba(169,120,47,0.45)]">
                            <ShieldX className="size-9 text-primary" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
                        Access Restricted
                    </h1>

                    {/* Message */}
                    <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                        You don&apos;t have permission to access this page.
                        Please contact an administrator if you believe this
                        restriction is an error.
                    </p>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link href="/">
                            <Button
                                size="lg"
                                variant="link"
                                className="no-underline hover:no-underline cursor-pointer btn-shine h-11 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_12px_30px_-12px_rgba(169,120,47,0.45)] transition-transform duration-300 hover:scale-[1.02] hover:bg-primary"
                            >
                                <Home className="mr-2 size-4" />
                                Return Home
                            </Button>
                        </Link>

                        <Button
                            type="button"
                            size="lg"
                            variant="outline"
                            onClick={goBack}
                            className="h-11 rounded-xl border-border bg-card/50 px-6 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-secondary hover:text-foreground"
                        >
                            <ArrowLeft className="mr-2 size-4" />
                            Go Back
                        </Button>
                    </div>

                    {/* Divider / Help */}
                    <div className="mt-10 border-t border-border pt-6">
                        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                            Need assistance?
                        </p>

                        <p className="mt-2 text-xs text-muted-foreground/75">
                            Return to the home page and continue exploring
                            our private cinema experiences.
                        </p>
                    </div>

                    {/* Brand line */}
                    <p className="mt-8 text-[0.6rem] tracking-[0.12em] text-muted-foreground/50">
                        YOUR MOMENT. YOUR SPACE. NOBODY ELSE&apos;S.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}