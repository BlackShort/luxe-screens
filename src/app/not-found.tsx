import Link from "next/link";
import { Metadata } from "next";
import { Home } from "lucide-react";

export const metadata: Metadata = {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist.",
};

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 text-foreground">
            {/* Ambient gold glow */}
            <div className="glow-gold pointer-events-none absolute left-1/2 top-1/2 size-125 -translate-x-1/2 -translate-y-1/2 opacity-40" />

            <div className="relative z-10 w-full max-w-lg text-center">
                {/* Eyebrow */}
                <div className="mb-6 flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-linear-to-r from-transparent to-primary" />
                    <span className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-gold-deep">
                        Luxe Concierge
                    </span>
                    <span className="h-px w-8 bg-linear-to-l from-transparent to-primary" />
                </div>

                {/* 404 */}
                <div className="relative mb-8">
                    <h1
                        className="
                            font-serif
                            text-[8rem]
                            font-medium
                            leading-none
                            tracking-tighter
                            text-transparent
                            sm:text-[10rem]
                        "
                        style={{
                            WebkitTextStroke: "1px var(--gold-deep)",
                            textShadow: "0 12px 40px rgba(169, 120, 47, 0.12)",
                        }}
                    >
                        404
                    </h1>

                    <div className="mx-auto mt-2 h-px w-16 bg-linear-to-r from-transparent via-primary to-transparent" />
                </div>

                {/* Message */}
                <div className="mb-8">
                    <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                        This screening room is unavailable.
                    </h2>

                    <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                        The page you&apos;re looking for doesn&apos;t exist or may have
                        moved. Let&apos;s get you back to the experience.
                    </p>
                </div>

                {/* CTA */}
                <Link
                    href="/"
                    className="
                        btn-shine
                        inline-flex
                        h-11
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-primary
                        px-6
                        text-sm
                        font-medium
                        text-primary-foreground
                        shadow-[0_12px_30px_-12px_rgba(169,120,47,0.45)]
                        transition-all
                        duration-300
                        hover:scale-[1.02]
                        hover:bg-primary
                    "
                >
                    <Home className="size-4" />
                    Return Home
                </Link>

                {/* Secondary navigation */}
                <div className="mt-8 border-t border-border pt-6">
                    <p className="mb-3 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                        Continue exploring
                    </p>

                    <div className="flex items-center justify-center gap-5 text-sm">
                        <Link
                            href="/"
                            className="text-muted-foreground transition-colors hover:text-primary"
                        >
                            Home
                        </Link>

                        <span className="h-3 w-px bg-border" />

                        <Link
                            href="/booking"
                            className="text-muted-foreground transition-colors hover:text-primary"
                        >
                            Book a Theatre
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-8 text-[0.6rem] tracking-[0.12em] text-muted-foreground/60">
                    YOUR MOMENT. YOUR SPACE. NOBODY ELSE&apos;S.
                </p>
            </div>
        </main>
    );
}