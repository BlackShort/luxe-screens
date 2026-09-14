"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/common/reveal";
import { useTheaters } from "@/hooks/api/use-theaters";

export function Gallery() {
    const [index, setIndex] = useState(0);
    const { theaters, loading } = useTheaters();

    const theater = theaters[index] ?? theaters[0];

    function go(delta: number) {
        setIndex(
            (current) =>
                (current + delta + theaters.length) % theaters.length
        );
    }

    if (loading || !theater) {
        return (
            <section id="gallery" className="py-16 px-5 sm:px-8 sm:py-20 lg:px-16">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="card-premium h-105 animate-pulse bg-muted" />
                </div>
            </section>
        );
    }
    return (
        <section id="gallery" className="py-16 px-5 sm:px-8 sm:py-20 lg:px-16">
            <div className="relative">
                <div className="mx-auto w-full max-w-6xl">
                    <Reveal as="div" className="mb-10 flex items-end justify-between gap-6">
                        <div>
                            <span className="eyebrow">Celebrate like your own place</span>

                            <h2 className="mt-3 text-3xl font-normal tracking-tight md:text-4xl">
                                A look inside the rooms
                            </h2>
                        </div>

                        <Link
                            href="/gallery"
                            className="group hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary md:flex"
                        >
                            <Button
                                type="button"
                                variant="outline"
                                aria-label="Gallery"
                                size={'lg'}
                                className={'rounded-full px-4 cursor-pointer'}
                            >
                                View full gallery
                                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </Reveal>

                    <Reveal delay={120} className="gallery overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            {/* Image */}
                            <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted md:aspect-auto md:max-h-96">
                                <Image
                                    key={theater.id}
                                    src={theater.images[0] ?? ""}
                                    alt={theater.name}
                                    fill
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    className="object-cover transition-opacity duration-500"
                                    priority={index === 0}
                                />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

                                {/* Dots */}
                                <div className="absolute bottom-6 w-full flex items-center justify-center gap-2">
                                    {theaters.map((item, i) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setIndex(i)}
                                            aria-label={`Show ${item.name}`}
                                            aria-current={
                                                i === index ? "true" : undefined
                                            }
                                            className={cn(
                                                "h-1.5 rounded-full transition-all duration-300",
                                                i === index
                                                    ? "w-6 bg-gold-soft"
                                                    : "w-1.5 bg-white/40 hover:bg-white/70"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-muted-foreground border border-border cursor-default">
                                        <Star
                                            size={15}
                                            fill="currentColor"
                                            className="text-yellow-500"
                                        />
                                        {theater.rating}
                                    </span>
                                    <span className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-muted-foreground border border-border cursor-default">
                                        {theater.reviewCount} reviews
                                    </span>
                                </div>

                                <h3 className="mt-4 font-serif text-2xl font-normal tracking-tight md:text-3xl">
                                    {theater.name}
                                </h3>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    {theater.address}, {theater.city}
                                </p>

                                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                                    <li>{theater.screen}</li>
                                    <li>{theater.sound}</li>
                                    <li>
                                        Seats up to {theater.maxCapacity} guests
                                    </li>
                                </ul>

                                {/* Amenities */}
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {theater.amenities.map((amenity) => (
                                        <span
                                            key={amenity}
                                            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <div className="absolute top-1/2 z-10 w-full flex items-center justify-between gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => go(-1)}
                        aria-label="Previous room"
                        className="size-12 rounded-full border-primary/50 bg-background/90 backdrop-blur cursor-pointer transition-all duration-300 hover:scale-105 hover:border-primary hover:text-primary"
                    >
                        <ChevronLeft className="size-6" />
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => go(1)}
                        aria-label="Next room"
                        className="size-12 rounded-full border-primary/50 bg-background/90 backdrop-blur cursor-pointer transition-all duration-300 hover:scale-105 hover:border-primary hover:text-primary"
                    >
                        <ChevronRight className="size-6" />
                    </Button>
                </div>
            </div>
        </section>
    );
}