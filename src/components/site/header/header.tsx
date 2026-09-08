"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { logo } from "@/assets";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AuthTrigger } from "@/components/site/header/auth-trigger";
import { navigationLinks } from "@/lib/navigation";

interface HeaderProps {
    variant?: "sticky" | "fixed" | "static";
}

export function Header({ variant = "sticky" }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (variant !== "fixed") {
            return;
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [variant]);

    const isLightHeader = variant === "sticky" || variant === "static" || isScrolled;

    const shouldInvertLogo = () => {
        if (variant === "sticky" || variant === "static") return true;
        return isScrolled;
    };

    return (
        <header
            className={`
                ${variant === "static"
                    ? "relative"
                    : variant === "sticky"
                        ? "sticky"
                        : "fixed"
                }
                top-0 z-50 w-full pt-3 px-3 lg:pt-4 lg:px-0
            `}
        >
            <div
                className={`container mx-auto flex h-12 max-w-6xl transform items-center justify-between rounded-full border px-3 backdrop-blur-md transition-all duration-300 sm:h-14
                    ${isLightHeader
                        ? `border-border bg-white/90 shadow-[0_8px_30px_-18px_rgba(23,20,15,0.25)]`
                        : `border-white/20 bg-white/10 shadow-none`
                    }
                `}
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    <Image
                        src={logo}
                        alt="Luxe Screens"
                        className={`h-7 w-fit object-contain drop-shadow-sm transition-all duration-300 group-hover:drop-shadow-md sm:h-8 ${shouldInvertLogo()
                            ? "filter invert-0 brightness-0 contrast-100"
                            : ""
                            }`}
                        priority
                        quality={100}
                        sizes="(max-width: 640px) 96px, (max-width: 768px) 108px, (max-width: 1024px) 120px, (max-width: 1280px) 144px, (max-width: 1536px) 168px, 192px"
                    />
                    <h1
                        className={`ml-1 font-serif text-sm font-medium tracking-tight transition-all duration-300 sm:ml-2 sm:text-base md:text-lg lg:text-xl ${shouldInvertLogo()
                            ? "text-foreground"
                            : "text-white/90 drop-shadow-md"
                            }`}
                    >
                        Luxe Screens
                    </h1>
                </Link>

                {/* Desktop navigation (unchanged, >= lg) */}
                <nav className="hidden flex-1 justify-center space-x-4 lg:flex xl:space-x-6">
                    {navigationLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={`
                                group/nav relative whitespace-nowrap text-xs font-medium transition-all duration-300 xl:text-sm
                                ${isLightHeader
                                    ? "text-foreground/70 hover:text-primary"
                                    : "text-white/90 drop-shadow-md hover:text-white"
                                }
                            `}
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover/nav:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-4">
                    {/* Desktop actions (unchanged, >= lg) */}
                    <div className="hidden items-center gap-1 sm:gap-2 lg:flex">
                        <AuthTrigger
                            className={`h-7 rounded-full px-2 transition-all duration-300 hover:scale-105 active:scale-95 sm:h-8 sm:px-3 lg:h-9 lg:px-4
                                ${isLightHeader
                                    ? `
                                            border border-border/70
                                            text-foreground/70
                                            hover:border-border
                                            hover:bg-muted
                                        `
                                    : `
                                            border border-white/20
                                            text-white/90
                                            backdrop-blur-sm
                                            hover:border-white/30
                                            hover:bg-white/10
                                            hover:text-white
                                        `
                                }
                            `}
                        />

                        <Link
                            href="/booking"
                            className="text-xs font-medium whitespace-nowrap sm:text-sm"
                        >
                            <Button
                                size="sm"
                                className={`
                                    btn-shine
                                    h-7 rounded-full
                                    px-2
                                    transition-all duration-300
                                    hover:scale-105
                                    active:scale-95
                                    sm:h-8 sm:px-3
                                    lg:h-9 lg:px-4
                                    ${isLightHeader
                                        ? `
                                                bg-primary
                                                text-primary-foreground
                                                shadow-sm
                                                hover:bg-primary
                                            `
                                        : `
                                                bg-white/90
                                                text-foreground
                                                shadow-lg
                                                backdrop-blur-sm
                                                hover:bg-white
                                            `
                                    }
                                `}
                            >
                                Book Now
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile / tablet: compact Book CTA stays visible, everything else moves into the sheet */}
                    <Link href="/booking" className="lg:hidden">
                        <Button
                            size="sm"
                            className={`
                                btn-shine h-7 rounded-full px-2.5 text-xs font-medium transition-all duration-300 active:scale-95 sm:h-8 sm:px-3 sm:text-sm
                                ${isLightHeader
                                    ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary"
                                    : "bg-white/90 text-foreground shadow-lg backdrop-blur-sm hover:bg-white"
                                }
                            `}
                        >
                            Book
                        </Button>
                    </Link>

                    {/* Mobile / tablet menu trigger */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger
                            render={
                                <button
                                    type="button"
                                    aria-label="Open menu"
                                    className={`flex size-8 items-center justify-center rounded-full border transition-all duration-300 active:scale-95 sm:size-9 lg:hidden ${isMobileMenuOpen
                                            ? "border-foreground bg-foreground text-background"
                                            : "border-border bg-background text-foreground"
                                        }`}
                                >
                                    <Menu className="size-4 sm:size-5" />
                                </button>
                            }
                        />

                        <SheetContent side="right" className="w-[85%] max-w-xs sm:max-w-sm">
                            <SheetHeader>
                                <SheetTitle className="font-serif text-lg">Luxe Screens</SheetTitle>
                            </SheetHeader>

                            <nav className="mt-6 flex flex-col gap-1 px-4">
                                {navigationLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-6 flex flex-col gap-3 border-t px-4 pt-6">
                                <AuthTrigger className="w-full justify-center rounded-full border border-border/70 text-foreground/80 hover:bg-muted" />

                                <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="btn-shine w-full rounded-full bg-primary text-primary-foreground">
                                        Book Now
                                    </Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}