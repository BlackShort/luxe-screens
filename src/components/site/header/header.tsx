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

export function Header({ variant = "fixed" }: HeaderProps) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(0);

    useEffect(() => {
        let ticking = false;

        const updateScrollProgress = () => {
            const scrollY = window.scrollY;
            const progress = Math.min(scrollY / 120, 1);

            setScrollProgress(progress);
            setViewportWidth(window.innerWidth);

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollProgress);
                ticking = true;
            }
        };

        updateScrollProgress();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        window.addEventListener("resize", updateScrollProgress);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateScrollProgress);
        };
    }, []);

    const getHeaderWidth = () => {
        if (viewportWidth < 640) {
            return 100 - scrollProgress * 4;
        }

        if (viewportWidth < 768) {
            return 100 - scrollProgress * 6;
        }

        if (viewportWidth < 1280) {
            return 100 - scrollProgress * 8;
        }

        return 100 - scrollProgress * 10;
    };

    const isScrolled = scrollProgress > 0.5;
    const isLightHeader = variant === "sticky" || variant === "static" || isScrolled;
    const headerPosition = variant === "static" ? "relative" : variant === "sticky" ? "sticky" : "fixed";

    return (
        <header className={`${headerPosition} top-0 z-50 w-full pt-3 px-3 lg:pt-4 lg:px-0`}>
            <div
                className="container mx-auto flex h-12 px-2.5 items-center justify-between border transition-[width,max-width,border-radius,background-color,box-shadow,backdrop-filter,padding,border-color] duration-300 ease-out sm:h-14 md:max-w-7xl"
                style={{
                    width: `${getHeaderWidth()}%`,
                    borderColor: `rgba(231, 223, 204, ${scrollProgress})`,
                    borderRadius: `${scrollProgress * 999}px`,
                    backgroundColor: `rgba(255, 255, 255, ${scrollProgress * 0.8})`,
                    boxShadow: scrollProgress > 0
                        ? `0 ${4 + scrollProgress * 8}px ${12 + scrollProgress * 20}px rgba(0,0,0,${scrollProgress * 0.08})`
                        : "none",
                    backdropFilter: scrollProgress > 0 ? `blur(${scrollProgress * 20}px)` : "blur(0px)",
                    WebkitBackdropFilter: scrollProgress > 0 ? `blur(${scrollProgress * 20}px)` : "blur(0px)",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="group flex shrink-0 items-center gap-2 will-change-transform transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Image
                        src={logo}
                        alt="Luxe Screens"
                        className="h-7 w-auto object-contain brightness-0 contrast-100 transition-all duration-300 sm:h-8 drop-shadow-sm group-hover:drop-shadow-md"
                        priority
                        quality={100}
                        sizes="192px"
                    />

                    <h1 className={`ml-1 font-serif text-base font-medium tracking-tight transition-colors duration-300 sm:ml-2 md:text-lg lg:text-xl ${isLightHeader ? "text-foreground" : "text-white/90 drop-shadow-md"}`}>
                        Luxe Screens
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden flex-1 items-center justify-center space-x-4 lg:flex xl:space-x-6">
                    {navigationLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={`group/nav relative whitespace-nowrap text-xs font-medium transition-colors duration-300 xl:text-sm ${isLightHeader ? "text-foreground/70 hover:text-foreground" : "text-white/90 drop-shadow-md hover:text-white"}`}
                        >
                            {link.label}

                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover/nav:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3">
                    {/* Desktop */}
                    <div className="hidden items-center gap-2 lg:flex">
                        <AuthTrigger
                            className={`cursor-pointer h-7 rounded-full px-2 will-change-transform transition-all duration-300 hover:scale-105 active:scale-95 sm:h-8 sm:px-3 lg:h-9 lg:px-4 
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
                                className={`cursor-pointer btn-shine h-7 rounded-full px-2 will-change-transform transition-all duration-300 hover:scale-105 active:scale-95 sm:h-8 sm:px-3 lg:h-9 lg:px-4 
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

                    {/* Mobile Book */}
                    <Link href="/booking" className="lg:hidden">
                        <Button
                            size="sm"
                            className={`cursor-pointer btn-shine h-8 rounded-full px-3 text-xs font-medium transition-all will-change-transform duration-300 active:scale-95 sm:h-9 sm:px-4 sm:text-sm ${isLightHeader ? "bg-primary text-primary-foreground shadow-sm" : "bg-white/90 text-foreground shadow-lg backdrop-blur-sm hover:bg-white"}`}
                        >
                            Book
                        </Button>
                    </Link>

                    {/* Mobile Menu */}
                    <Sheet
                        open={isMobileMenuOpen}
                        onOpenChange={setIsMobileMenuOpen}
                    >
                        <SheetTrigger
                            render={
                                <button
                                    type="button"
                                    aria-label="Open menu"
                                    className={`cursor-pointer flex size-8 items-center justify-center rounded-full border transition-all duration-300 active:scale-95 sm:size-9 lg:hidden ${isLightHeader ? "border-border bg-background text-foreground" : "border-white/30 bg-white/10 text-white backdrop-blur-sm"}`}
                                >
                                    <Menu className="size-4 sm:size-5" />
                                </button>
                            }
                        />

                        <SheetContent
                            side="right"
                            className="w-[85%] max-w-xs sm:max-w-sm"
                        >
                            <SheetHeader>
                                <SheetTitle className="font-serif text-lg">
                                    Luxe Screens
                                </SheetTitle>
                            </SheetHeader>

                            <nav className="flex flex-col gap-1 px-4">
                                {navigationLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-[background-color,color] duration-300 ease-out hover:bg-muted hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-6 flex flex-col gap-3 border-t px-4 pt-6">
                                <AuthTrigger
                                    className="w-full justify-center rounded-full border border-border/70 text-foreground/80 bg-accent hover:bg-muted cursor-pointer"
                                />

                                <Link
                                    href="/booking"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Button className="cursor-pointer btn-shine w-full rounded-full bg-primary text-primary-foreground">
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