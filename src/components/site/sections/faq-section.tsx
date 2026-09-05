"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqItems } from "@/data/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/common/reveal";

export function FAQs() {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <section className="px-5 py-20 sm:px-8 sm:py-28">
            <div className="flex flex-col items-center text-center">
                <Reveal as="div" className="flex flex-col items-center gap-3">
                    <span className="eyebrow">Good to know</span>
                    <h1 className="text-3xl font-normal tracking-tight sm:text-4xl">
                        Frequently Asked Questions
                    </h1>
                </Reveal>

                <Reveal delay={120} className="mt-14 w-full max-w-3xl divide-y border-y border-border">
                    {faqItems.map((item) => {
                        const open = openId === item.id;

                        return (
                            <div key={item.id}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenId(open ? null : item.id)
                                    }
                                    aria-expanded={open}
                                    aria-controls={`faq-answer-${item.id}`}
                                    className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-300"
                                >
                                    <span className={cn(
                                        "text-base transition-colors duration-300",
                                        open ? "text-primary" : "group-hover:text-primary"
                                    )}>
                                        {item.question}
                                    </span>

                                    <span className={cn(
                                        "flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                                        open
                                            ? "rotate-45 border-primary bg-primary text-primary-foreground"
                                            : "border-border text-muted-foreground group-hover:border-primary group-hover:text-primary"
                                    )}>
                                        <Plus size={16} strokeWidth={1.8} />
                                    </span>
                                </button>

                                <div
                                    id={`faq-answer-${item.id}`}
                                    className={cn(
                                        "grid transition-[grid-template-rows] duration-300 ease-in-out",
                                        open
                                            ? "grid-rows-[1fr]"
                                            : "grid-rows-[0fr]"
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <p className="pb-5 text-sm leading-relaxed text-left text-muted-foreground">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Reveal>
            </div>
        </section>
    );
}