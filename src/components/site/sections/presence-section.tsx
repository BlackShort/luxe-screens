import { cities } from "@/data/content";
import Image from "next/image";
import { Reveal } from "@/components/site/common/reveal";

export function Presence() {
    return (
        <section id="locations" className="py-16 sm:pb-20 sm:pt-40 overflow-hidden">
            <div className="flex flex-col items-center gap-5 text-center">
                <Reveal as="div" className="flex flex-col items-center gap-3">
                    <span className="eyebrow">Where we are</span>
                    <h1 className="text-3xl font-normal tracking-tight sm:text-4xl">
                        Our Presence
                    </h1>
                </Reveal>

                <div className="relative w-full overflow-hidden mt-2">
                    {/* Left/right fade */}
                    <div className="absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent pointer-events-none" />

                    {/* Marquee */}
                    <div className="flex w-max animate-marquee has-[.city-item:hover]:[animation-play-state:paused]">                        {/* First set */}
                        <div className="flex shrink-0 items-center gap-10 pr-10">
                            {cities.map((city) => (
                                <CityItem
                                    key={`first-${city.name}`}
                                    city={city}
                                />
                            ))}
                        </div>

                        {/* Duplicate set */}
                        <div
                            className="flex shrink-0 items-center gap-10 pr-10"
                            aria-hidden="true"
                        >
                            {cities.map((city) => (
                                <CityItem
                                    key={`second-${city.name}`}
                                    city={city}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CityItem({
    city,
}: {
    city: (typeof cities)[number];
}) {
    return (
        <div className="city-item flex w-24 shrink-0 flex-col items-center gap-2 group cursor-default">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl transition-all duration-300 group-hover:bg-muted">
                <Image
                    src={city.icon}
                    alt={city.name}
                    sizes="112px"
                    className="
                        object-contain sepia-100 backdrop-sepia-100
                        transition-transform duration-500 ease-out
                        group-hover:scale-110 group-hover:-translate-y-1
                    "
                    quality={90}
                />
            </div>

            <span className="text-xs font-medium tracking-wide text-muted-foreground transition-colors duration-300 whitespace-nowrap group-hover:text-primary">
                {city.name}
            </span>
        </div>
    );
}