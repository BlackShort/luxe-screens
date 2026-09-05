"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { banner1, banner2, WhatsappIcon } from "@/assets";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroSideWrapper } from "@/components/home/hero-side-wrapper";
import { ImageSlider } from "@/components/home/hero-image-slider";
import { Sparkles } from "lucide-react";
import { ImageSource } from "@/types";

export const HeroSection = () => {
    const [showAI, setShowAI] = useState(false);

    const images = useMemo(
        (): ImageSource[] => [
            { src: banner1, isStatic: true, priority: true },
            { src: banner2, isStatic: true, priority: false },
        ],
        [],
    );

    return (
        <section className="relative z-20 select-none overflow-hidden">
            <div className="relative min-h-155 h-[78vh] md:min-h-170 md:h-screen">
                {/* Background image */}
                <ImageSlider images={images} className="h-full w-full" />

                {/* Hero content */}
                <div className="absolute inset-x-0 bottom-0 top-20 z-20 flex items-center">
                    <div className="mx-auto w-full max-w-6xl px-5 sm:px-2">
                        <div className="grid items-center gap-8 lg:grid-cols-[1fr_360px] lg:gap-10">
                            {/* LEFT */}
                            <div className="max-w-2xl">
                                <span className="animate-fade-up [animation-delay:80ms] inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-white backdrop-blur-md sm:text-xs">
                                    <span className="size-1.5 rounded-full bg-gold-soft" />
                                    Private theatres, 9 cities
                                </span>

                                <h1 className="text-shadow-accent animate-fade-up [animation-delay:220ms] mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                                    {/* Your film.
                                    <br />
                                    <span className="text-gold-gradient">Your room.</span>
                                    <br className="hidden sm:block" />
                                    Nobody else&apos;s. */}
                                    <span className="hero-title-shadow">Your</span>
                                    <br />
                                    <span className="text-metallic-gold">Private Space</span>
                                    <br className="hidden sm:block" />
                                    <span className="hero-title-shadow">Nobody else&apos;s.</span>
                                </h1>

                                <p className="hero-description-shadow animate-fade-up [animation-delay:380ms] mt-5 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
                                    Book a private cinema for the moments worth celebrating —
                                    birthdays, anniversaries, dates, and everything in between.
                                </p>

                                <div className="animate-fade-up [animation-delay:520ms] mt-6 flex items-center gap-3 text-xs text-white/55">
                                    <span className="h-px w-8 bg-primary" />
                                    Curated cinema experiences
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className={`${showAI ? 'fixed bottom-14 right-25 z-20 w-auto' : 'w-full'} lg:justify-self-end`}>
                                <HeroSideWrapper
                                    showAI={showAI}
                                    onToggleAI={() => setShowAI((prev) => !prev)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="animate-fade-up opacity-0 [animation-delay:700ms] absolute bottom-5 left-4 z-20 hidden w-fit max-w-[calc(100%-2rem)] rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-xl sm:flex sm:items-center sm:gap-4 sm:px-5 sm:py-4 md:left-10 lg:left-16 xl:left-18 scale-75 hover:scale-80 transition-transform duration-300"
                >
                    <div className="flex shrink-0 -space-x-3">
                        {["A", "S", "R"].map((letter) => (
                            <span
                                key={letter}
                                className="flex size-8 items-center justify-center rounded-full border-2 border-white/40 bg-gold-soft text-xs font-semibold text-[#17140f]"
                            >
                                {letter}
                            </span>
                        ))}
                    </div>

                    <div className="min-w-0 text-white">
                        <p className="flex items-center gap-1 text-sm font-semibold">
                            4.9
                            <span className="text-gold-soft">★</span>
                        </p>

                        <p className="whitespace-nowrap text-[0.7rem] text-white/70">
                            from 1,200+ celebrations
                        </p>
                    </div>
                </div>

                <div className="animate-fade-up opacity-0 [animation-delay:700ms] fixed bottom-14 right-5 z-20 hidden sm:flex">
                    <div className="flex flex-col gap-3">
                        {/* AI Assistant */}
                        <div className="group relative">
                            <Button
                                type="button"
                                aria-label="AI Assistant"
                                onClick={() => setShowAI((prev) => !prev)}
                                className="size-14 cursor-pointer rounded-full border border-gold-deep/50 bg-primary p-0 text-primary-foreground shadow-[0_6px_20px_rgba(169,120,47,0.18)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-primary hover:shadow-[0_8px_24px_rgba(169,120,47,0.28)]"
                            >
                                <Sparkles className="size-6 text-primary-foreground transition-transform duration-300 group-hover:rotate-12" />
                                <span className="sr-only">AI Assistant</span>
                            </Button>

                            {/* Tooltip */}
                            <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-white/10 bg-[#17140f]/90 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
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
                                    className="size-14 cursor-pointer rounded-full border border-[#25D366]/40 bg-[#25D366] p-0 text-white shadow-[0_6px_20px_rgba(37,211,102,0.14)] transition-all duration-300 hover:scale-105 hover:bg-[#25D366] hover:shadow-[0_8px_24px_rgba(37,211,102,0.24)]"
                                >
                                    <Image
                                        src={WhatsappIcon}
                                        alt=""
                                        className="size-6 brightness-0 invert transition-transform duration-200 group-hover:scale-110"
                                    />
                                    <span className="sr-only">WhatsApp</span>
                                </Button>
                            </Link>

                            {/* Tooltip */}
                            <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-white/10 bg-[#17140f]/90 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                                WhatsApp
                                <span className="absolute -right-1.25 top-1/2 size-2 -translate-y-1/2 rotate-45 border-r border-t border-white/10 bg-[#17140f]/90" />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Scroll cue */}
                <div className="absolute bottom-16 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 opacity-0 md:flex animate-[fade-scroll_0.7s_ease-out_0.7s_forwards]">
                    <div className="flex flex-col items-center gap-2 animate-[scroll-bounce_2s_ease-in-out_1.4s_infinite]">
                        <span className="text-[0.65rem] uppercase tracking-[0.3em]">
                            Scroll
                        </span>

                        <span className="h-8 w-px bg-linear-to-b from-white/60 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
};
