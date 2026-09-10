"use client";

import Image, { StaticImageData } from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { slides } from "@/data/content";

interface SliderProps {
    images: StaticImageData[];
}

export const ImageSlider = ({ images }: SliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const preloadImages = useCallback(() => {
        images.forEach((image) => {
            const img = new window.Image();
            img.src = image.src;
        });
    }, [images]);

    const setupInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        if (images.length <= 1) {
            return;
        }

        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5500);
    }, [images.length]);

    useEffect(() => {
        setupInterval();
        preloadImages();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [setupInterval, preloadImages]);

    // const handleIndicatorClick = useCallback(
    //     (index: number) => {
    //         setCurrentIndex(index);
    //         setupInterval();
    //     },
    //     [setupInterval]
    // );

    if (!images.length) {
        return null;
    }

    const activeContent = slides[currentIndex % slides.length];

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:aspect-16/8 md:aspect-16/7">
            {/* Images */}
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1800 ease-in-out ${currentIndex === index
                        ? "z-1 opacity-100"
                        : "z-0 opacity-0"
                        }`}
                >
                    <Image
                        src={image}
                        alt={`Luxe Screens experience ${index + 1}`}
                        fill
                        priority={index === 0}
                        placeholder="blur"
                        sizes="(max-width: 768px) 100vw, 1280px"
                        className="object-cover"
                    />
                </div>
            ))}

            {/* Cinematic overlay */}
            <div className="pointer-events-none absolute inset-0 z-5 bg-linear-to-r from-black/60 via-black/25 to-transparent" />

            {/* Bottom subtle linear */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-5 h-40 bg-linear-to-t from-black/30 to-transparent" />

            {/* Slide Content */}
            <div
                key={currentIndex}
                className="pointer-events-none absolute inset-x-0 top-5 md:top-14 xl:top-20 left-5 sm:left-10 md:left-18 xl:left-28 z-10 flex items-start md:inset-y-0 lg:right-auto"
            >
                <div className="max-w-[85%] sm:max-w-xl">
                    <p className="hero-text-eyebrow mb-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/75 sm:mb-3 sm:text-[10px] sm:tracking-[0.3em] md:text-xs">
                        {activeContent.eyebrow}
                    </p>

                    <h2 className="hero-text-title max-w-[320px] font-serif text-[28px] leading-[1.02] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)] sm:max-w-xl sm:text-5xl lg:text-6xl xl:text-7xl">
                        {activeContent.title}
                    </h2>

                    <p className="hero-text-description mt-2.5 max-w-70 text-[11px] leading-[1.45] text-white/75 drop-shadow-md sm:mt-4 sm:max-w-md sm:text-sm md:text-base">
                        {activeContent.description}
                    </p>
                </div>
            </div>

            {/* Indicators */}
            {/* {images.length > 1 && (
                <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                    {images.map((_, index) => {
                        const isActive = currentIndex === index;

                        return (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={isActive}
                                onClick={() => handleIndicatorClick(index)}
                                className={`h-1.5 rounded-full transition-all duration-500 ease-out sm:h-2 ${isActive
                                    ? "w-8 bg-white sm:w-10"
                                    : "w-1.5 bg-white/40 hover:w-3 hover:bg-white/75 sm:w-2"
                                    }`}
                            />
                        );
                    })}
                </div>
            )} */}
        </div>
    );
}