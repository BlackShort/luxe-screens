"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageSource } from "@/types";

interface AnimatedImageSliderProps {
    images: ImageSource[];
    className?: string;
}

export const ImageSlider = ({ images, className = "" }: AnimatedImageSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const preloadImages = useCallback(() => {
        images.forEach((imageSource) => {
            if (imageSource.isStatic) return;

            const img = new window.Image();
            img.src = imageSource.src as string;
        });
    }, [images]);

    const setupInterval = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        if (images.length <= 1) return;

        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // Slightly faster transitions
    }, [images.length]);

    // Immediate setup for faster initial render
    useEffect(() => {
        setupInterval();
        // Start preloading immediately but don't block render
        if (typeof requestIdleCallback !== "undefined") {
            requestIdleCallback(preloadImages);
        } else {
            setTimeout(preloadImages, 0);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [setupInterval, preloadImages]);

    const handleIndicatorClick = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    return (
        <div className={`relative overflow-hidden z-10 ${className}`}>
            <div className="absolute inset-0 w-full h-full">
                {images.map((imageSource: ImageSource, index: number) => {
                    const isActive = index === currentIndex;

                    return (
                        <div
                            key={`${typeof imageSource.src === "string" ? imageSource.src : "static"}-${index}`}
                            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                                }`}
                        >
                            <AspectRatio ratio={16 / 9}>
                                <Image
                                    src={imageSource.src || "/placeholder.svg"}
                                    alt={`Sacred mountain landscape ${index + 1}`}
                                    fill
                                    sizes="100vw"
                                    className={`object-cover w-full h-full transition-transform duration-500 ${isActive ? "scale-100" : "scale-105"
                                        }`}
                                    loading={imageSource.priority ? "eager" : "lazy"}
                                    priority={imageSource.priority}
                                    quality={imageSource.priority ? 95 : 80}
                                    placeholder={imageSource.isStatic ? "blur" : "empty"}
                                    {...(imageSource.isStatic && {
                                        blurDataURL:
                                            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
                                    })}
                                />
                            </AspectRatio>
                        </div>
                    );
                })}
            </div>

            {/* Overlay gradient — warm, cinematic, never flat black */}
            <div className="absolute inset-0 z-10 bg-linear-to-b from-[#17140f]/75 via-[#17140f]/35 to-[#17140f]/85" />
            <div className="absolute inset-0 z-10 bg-linear-to-t from-[#17140f]/90 via-transparent to-transparent" />
            <div className="grain-overlay z-10" />

            {/* Optimized indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex space-x-1.5 bg-black/20 backdrop-blur-sm rounded-full p-1.5">
                        {images.map((_: ImageSource, index: number) => (
                            <button
                                key={index}
                                onClick={() => handleIndicatorClick(index)}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${index === currentIndex
                                    ? "bg-white scale-125"
                                    : "bg-white/40 hover:bg-white/60"
                                    }`}
                                aria-label={`View image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};