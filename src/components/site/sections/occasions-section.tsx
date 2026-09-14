import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { occasions } from "@/data/occasions";
import { Reveal } from "@/components/site/common/reveal";
import Image from "next/image";

export function Occasions() {
    return (
        <section
            id="occasions"
            className="px-5 py-16 sm:px-8 sm:py-20 lg:px-16"
        >
            <div className="mx-auto max-w-6xl">
                {/* Section heading */}
                <Reveal
                    as="div"
                    className="flex flex-col items-center gap-3 text-center"
                >
                    <span className="eyebrow">What&apos;s the moment?</span>

                    <h2 className="font-serif text-3xl font-normal tracking-tight sm:text-4xl">
                        Choose Your Occasion
                    </h2>
                </Reveal>

                {/* Occasion cards */}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
                    {occasions.map((occasion, i) => (
                        <Reveal
                            key={occasion.id}
                            delay={i * 70}
                        >
                            <Link
                                href={`/booking?occasion=${encodeURIComponent(
                                    occasion.type
                                )}`}
                                className="group relative block aspect-3/2 overflow-hidden rounded-2xl border border-black/10 bg-neutral-900 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                            >
                                {/* Image */}
                                <Image
                                    src={occasion.image}
                                    alt={`${occasion.type} experience`}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                                />

                                {/* Cinematic overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />

                                {/* Arrow */}
                                <div
                                    className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white/80 backdrop-blur-md transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:text-black group-hover:shadow-lg"
                                >
                                    <ArrowUpRight
                                        size={16}
                                        strokeWidth={1.8}
                                        className="transition-transform duration-500 group-hover:rotate-0"
                                    />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                                    <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

                                    <h3 className="relative font-serif text-xl tracking-tight text-white sm:text-2xl">
                                        {occasion.type}
                                    </h3>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}