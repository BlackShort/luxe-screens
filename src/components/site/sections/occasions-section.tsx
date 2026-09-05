import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { occasions } from "@/data/occasions";
import { Reveal } from "@/components/site/common/reveal";

export function Occasions() {
    return (
        <section id="occasions" className="px-5 py-16 sm:px-8 sm:py-20 lg:px-16">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
                <Reveal as="div" className="flex flex-col items-center gap-3">
                    <span className="eyebrow">What&apos;s the moment?</span>
                    <h1 className="text-3xl font-normal tracking-tight sm:text-4xl">
                        Choose Your Occasion
                    </h1>
                </Reveal>

                <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {occasions.map((occasion, i) => (
                        <Reveal key={occasion.id} delay={i * 90}>
                            <Link
                                href={`/booking?occasion=${encodeURIComponent(occasion.type)}`}
                                className="card-premium group flex h-full flex-col gap-5 p-7 text-left text-card-foreground"
                            >
                                <div className="flex items-start justify-between">
                                    <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                        <occasion.icon size={20} />
                                    </span>
                                    <ArrowUpRight
                                        size={18}
                                        className="text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                                    />
                                </div>

                                <div>
                                    <p className="font-serif text-lg tracking-tight">{occasion.type}</p>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {occasion.description}
                                    </p>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}