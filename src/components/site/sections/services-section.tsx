import { services } from "@/data/content";
import { Reveal } from "@/components/site/common/reveal";

export function Services() {
    return (
        <section id="services" className="bg-secondary/40 px-5 py-16 sm:px-8 sm:py-20 lg:px-16">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
                <Reveal as="div" className="flex flex-col items-center gap-3">
                    <span className="eyebrow">End to end</span>
                    <h1 className="text-3xl font-normal tracking-tight sm:text-4xl">
                        Our Services
                    </h1>
                </Reveal>

                <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, i) => (
                        <Reveal key={service.id} delay={i * 90}>
                            <div className="card-premium group flex h-full flex-col gap-5 p-7 text-left text-card-foreground">
                                <div className="flex items-center justify-between">
                                    <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                        <service.icon size={20} />
                                    </span>
                                    <span className="font-serif text-xs text-muted-foreground/50">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <div>
                                    <p className="font-serif text-lg tracking-tight">{service.title}</p>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}