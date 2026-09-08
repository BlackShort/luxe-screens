"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { banner1, banner2, banner3, WhatsappIcon } from "@/assets";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroSideWrapper } from "@/components/home/hero-side-wrapper";
import { ImageSlider } from "@/components/home/hero-image-slider";
import { MessageSquareText } from "lucide-react";
import { ImageSource } from "@/types";

export const HeroSection = () => {
    const [showAI, setShowAI] = useState(false);

    const images = useMemo(
        (): ImageSource[] => [
            { src: banner1, isStatic: true, priority: true },
            { src: banner2, isStatic: true, priority: false },
            { src: banner3, isStatic: true, priority: false },
        ],
        [],
    );

    return (
        <section className="relative z-20 select-none overflow-visible lg:overflow-hidden">
            <div className="relative h-[27.5svh] sm:h-108 lg:h-screen">
                {/* Background image */}
                <ImageSlider images={images} className="h-full w-full" />

                {/* Hero content */}
                <div className="absolute inset-x-0 bottom-0 top-16 z-20 flex items-center sm:top-20">
                    <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-2">
                        <div className="grid items-center gap-8 sm:grid-cols-[1fr_320px] lg:grid-cols-[1fr_360px] lg:gap-10">
                            {/* LEFT */}
                            <div className="max-w-2xl">
                                <span className="animate-fade-up [animation-delay:80ms] inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md sm:px-4 sm:text-[0.7rem] sm:tracking-[0.24em] sm:text-xs">
                                    <span className="size-1.5 rounded-full bg-gold-soft" />
                                    Private theatres, 9 cities
                                </span>

                                <h1 className="text-shadow-accent animate-fade-up [animation-delay:220ms] mt-4 font-serif text-2xl leading-[1.08] tracking-tight text-white sm:mt-5 sm:text-4xl sm:leading-[1.05] lg:text-6xl xl:text-7xl">
                                    <span className="hero-title-shadow">Your</span>
                                    <br />
                                    <span className="text-metallic-gold">Private Space</span>
                                    <br />
                                    <span className="hero-title-shadow">Nobody else&apos;s.</span>
                                </h1>

                                <p className="hero-description-shadow animate-fade-up [animation-delay:380ms] mt-4 max-w-md text-xs leading-relaxed text-white/75 sm:mt-5 sm:text-base">
                                    Book a private theatre for the moments worth celebrating —
                                    birthdays, anniversaries, dates, and everything in between.
                                </p>

                                <div className="animate-fade-up [animation-delay:520ms] mt-5 flex items-center gap-3 text-[0.7rem] text-white/55 sm:mt-6 sm:text-xs">
                                    <span className="h-px w-8 bg-primary" />
                                    Curated home experiences
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div
                                className={`${showAI
                                    ? "fixed inset-x-4 bottom-24 z-30 sm:inset-x-auto sm:right-6 sm:bottom-24 lg:right-25 lg:bottom-14 lg:w-auto"
                                    : "w-full"
                                    } lg:justify-self-end hidden md:flex`}
                            >
                                <HeroSideWrapper
                                    showAI={showAI}
                                    onToggleAI={() => setShowAI((prev) => !prev)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ratings badge — now visible on all breakpoints, scaled down on mobile */}
                <div className="animate-fade-up opacity-0 [animation-delay:700ms] absolute bottom-4 left-3 z-20 hidden lg:flex w-fit max-w-[calc(100%-2rem)] scale-90 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-xl transition-transform duration-300 hover:scale-95 sm:bottom-5 sm:left-4 sm:scale-75 sm:gap-4 sm:px-5 sm:py-4 sm:hover:scale-80 md:left-10 lg:left-16 xl:left-18"
                >
                    <div className="flex shrink-0 -space-x-3">
                        {["A", "S", "R"].map((letter) => (
                            <span
                                key={letter}
                                className="flex size-7 items-center justify-center rounded-full border-2 border-white/40 bg-gold-soft text-[0.65rem] font-semibold text-[#17140f] sm:size-8 sm:text-xs"
                            >
                                {letter}
                            </span>
                        ))}
                    </div>

                    <div className="min-w-0 text-white">
                        <p className="flex items-center gap-1 text-xs font-semibold sm:text-sm">
                            4.9
                            <span className="text-gold-soft">★</span>
                        </p>

                        <p className="whitespace-nowrap text-[0.65rem] text-white/70 sm:text-[0.7rem]">
                            from 1,200+ celebrations
                        </p>
                    </div>
                </div>

                {/* Floating action buttons — now visible on all breakpoints, smaller on mobile */}
                <div className="animate-fade-up opacity-0 [animation-delay:700ms] fixed bottom-4 right-4 z-20 flex lg:bottom-14 sm:right-5">
                    <div className="flex flex-col gap-2.5 sm:gap-3">
                        {/* AI Assistant */}
                        <div className="group relative">
                            <Button
                                type="button"
                                aria-label="AI Assistant"
                                onClick={() => setShowAI((prev) => !prev)}
                                className="size-11 cursor-pointer rounded-full border border-gold-deep/50 bg-primary p-0 text-primary-foreground shadow-[0_6px_20px_rgba(169,120,47,0.18)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-primary hover:shadow-[0_8px_24px_rgba(169,120,47,0.28)] sm:size-14"
                            >
                                <MessageSquareText className="size-5 text-primary-foreground transition-transform duration-300 sm:size-6" />
                                <span className="sr-only">AI Assistant</span>
                            </Button>

                            {/* Tooltip (desktop only — mobile has no hover state) */}
                            <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-white/10 bg-[#17140f]/90 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
                                AI Assistant
                                <span className="absolute -right-1.25 top-1/2 size-2 -translate-y-1/2 rotate-45 border-r border-t border-white/10 bg-[#17140f]/90" />
                            </span>
                        </div>

                        {/* WhatsApp */}
                        <div className="group relative">
                            <Link href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
                                <Button
                                    variant="link"
                                    type="button"
                                    aria-label="WhatsApp"
                                    className="size-11 cursor-pointer rounded-full border border-[#25D366]/40 bg-[#25D366] p-0 text-white shadow-[0_6px_20px_rgba(37,211,102,0.14)] transition-all duration-300 hover:scale-105 hover:bg-[#25D366] hover:shadow-[0_8px_24px_rgba(37,211,102,0.24)] sm:size-14"
                                >
                                    <Image
                                        src={WhatsappIcon}
                                        alt=""
                                        className="size-5 brightness-0 invert transition-transform duration-200 group-hover:scale-110 sm:size-6"
                                    />
                                    <span className="sr-only">WhatsApp</span>
                                </Button>
                            </Link>

                            {/* Tooltip (desktop only) */}
                            <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-white/10 bg-[#17140f]/90 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
                                WhatsApp
                                <span className="absolute -right-1.25 top-1/2 size-2 -translate-y-1/2 rotate-45 border-r border-t border-white/10 bg-[#17140f]/90" />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Scroll cue — desktop only, unchanged */}
                <div className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 flex-col items-center gap-2 text-white/60 opacity-0 hidden lg:flex animate-[fade-scroll_0.7s_ease-out_0.7s_forwards]">
                    <div className="flex flex-col items-center gap-2 animate-[scroll-bounce_2s_ease-in-out_1.4s_infinite]">
                        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
                        <span className="h-8 w-px bg-linear-to-b from-white/60 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
};