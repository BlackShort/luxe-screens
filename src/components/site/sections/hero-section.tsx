"use client";

import { useMemo, useState } from "react";
import { banner4, banner6, banner7, banner8, WhatsappIcon } from "@/assets";
import { Reveal } from "@/components/site/common/reveal";
import { HeroBookingForm } from "@/components/home/hero-booking-form";
import { ImageSlider } from "@/components/home/hero-image-slider";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";
import { HeroAIChat } from "@/components/home/hero-ai-chat";


export const HeroSection = () => {
    const [showAI, setShowAI] = useState(false);
    const images = useMemo(() => [banner4, banner6, banner7, banner8], []);

    return (
        <section className="relative w-full px-2 pt-6 md:p-6">
            <ImageSlider images={images} />

            <Reveal
                as="div"
                className="flex flex-col items-center gap-2 px-6 pt-10 pb-6 text-center md:hidden"
            >
                <span className="eyebrow">Book Your Experience</span>

                <h2 className="text-2xl font-normal tracking-tight sm:text-3xl">
                    Find Your Space
                </h2>
            </Reveal>

            <div className="relative bottom-0 md:absolute inset-x-0 sm:-bottom-12 lg:bottom-12 z-20 mx-auto w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl px-4 sm:px-6 lg:px-8">
                <HeroBookingForm />
            </div>

            <div
                className={"flex justify-center lg:justify-self-end fixed inset-x-4 bottom-24 z-30 sm:inset-x-auto sm:right-6 sm:bottom-24 lg:right-25 lg:bottom-14 lg:w-auto"}
            >
                <div className="animate-fade-up opacity-0 [animation-delay:700ms] relative w-full max-w-90">
                    {showAI && (
                        <HeroAIChat onClose={() => setShowAI((prev) => !prev)} />
                    )}
                </div>
            </div>

            <div className="animate-fade-up opacity-0 [animation-delay:700ms] fixed bottom-4 right-4 z-25 flex lg:bottom-8">
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

                        <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-white/10 bg-[#17140f]/90 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
                            WhatsApp
                            <span className="absolute -right-1.25 top-1/2 size-2 -translate-y-1/2 rotate-45 border-r border-t border-white/10 bg-[#17140f]/90" />
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};