"use client";

import { useMemo, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Bot,
    Check,
    ChevronRight,
    Send,
    Sparkles,
    Users,
    Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheaters } from "@/hooks/api/use-theaters";
import { cn } from "@/lib/utils";

type Step = "occasion" | "guests" | "budget" | "result";

type Message = {
    id: number;
    role: "assistant" | "user";
    content: string;
};

const occasions = [
    "Birthday",
    "Anniversary",
    "Date night",
    "Proposal",
    "Friends & family",
    "Just because",
];

const guestOptions = [2, 4, 6, 8, 10];

const budgetOptions = [
    {
        label: "Under ₹3,000",
        value: 3000,
    },
    {
        label: "₹3,000 – ₹5,000",
        value: 5000,
    },
    {
        label: "₹5,000 – ₹8,000",
        value: 8000,
    },
    {
        label: "₹8,000+",
        value: 15000,
    },
];

export function HeroAIChat({
    onClose,
}: {
    onClose: () => void;
}) {
    const { theaters, loading } = useTheaters();

    const [step, setStep] = useState<Step>("occasion");

    const [occasion, setOccasion] = useState("");
    const [guests, setGuests] = useState<number | null>(null);
    const [budget, setBudget] = useState<number | null>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: "assistant",
            content:
                "Hi! I'm your Luxe concierge. Tell me a little about your celebration and I'll find a private theatre experience for you.",
        },
    ]);

    const [customMessage, setCustomMessage] = useState("");

    const addAssistantMessage = (content: string) => {
        setMessages((current) => [
            ...current,
            {
                id: Date.now(),
                role: "assistant",
                content,
            },
        ]);
    };

    const addUserMessage = (content: string) => {
        setMessages((current) => [
            ...current,
            {
                id: Date.now(),
                role: "user",
                content,
            },
        ]);
    };

    const handleOccasion = (value: string) => {
        setOccasion(value);
        addUserMessage(value);

        setTimeout(() => {
            addAssistantMessage(
                "Lovely choice. How many people will be joining you?"
            );
            setStep("guests");
        }, 250);
    };

    const handleGuests = (value: number) => {
        setGuests(value);
        addUserMessage(`${value} ${value === 1 ? "guest" : "guests"}`);

        setTimeout(() => {
            addAssistantMessage(
                "And what would you like to spend on the private screening?"
            );
            setStep("budget");
        }, 250);
    };

    const handleBudget = (value: number, label: string) => {
        setBudget(value);
        addUserMessage(label);

        setTimeout(() => {
            addAssistantMessage(
                "Perfect. I'm matching your occasion, group size and budget with our theatre experiences..."
            );

            setTimeout(() => {
                setStep("result");
            }, 500);
        }, 250);
    };

    const recommendation = useMemo(() => {
        if (!guests || !budget || theaters.length === 0) return null;

        const sorted = [...theaters]
            .filter((theater) => theater.maxCapacity >= guests)
            .sort((a, b) => {
                const aDifference = Math.abs(a.basePrice - budget);
                const bDifference = Math.abs(b.basePrice - budget);

                return aDifference - bDifference;
            });

        const theatre = sorted[0] ?? theaters[0];

        const addOn =
            occasion === "Birthday"
                ? {
                    name: "Birthday Celebration",
                    description: "Cake + cinematic birthday decor",
                }
                : occasion === "Anniversary" || occasion === "Proposal"
                    ? {
                        name: "Romantic Celebration",
                        description: "Decor + celebration gift",
                    }
                    : {
                        name: "Luxe Essentials",
                        description: "Curated decor + celebration add-on",
                    };

        return {
            theatre,
            addOn,
        };
    }, [occasion, guests, budget, theaters]);

    const sendCustomMessage = () => {
        const message = customMessage.trim();

        if (!message) return;

        addUserMessage(message);
        setCustomMessage("");

        setTimeout(() => {
            if (step === "occasion") {
                addAssistantMessage(
                    "I'd love to help. Is this for a birthday, anniversary, date night, proposal, or another special occasion?"
                );
            } else if (step === "guests") {
                addAssistantMessage(
                    "How many people should I plan the private screening for?"
                );
            } else if (step === "budget") {
                addAssistantMessage(
                    "What's your approximate budget? For example, ₹3,000–₹5,000."
                );
            } else {
                addAssistantMessage(
                    "Your recommendation is ready above. You can start the booking whenever you're ready."
                );
            }
        }, 400);
    };

    return (
        <div className="animate-[booking-fade_0.45s_ease-out_both] flex h-121.5 w-full max-w-90 flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#11100d]/65 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] backdrop-blur-2xl backdrop-saturate-150">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3.5">
                <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/20 ring-1 ring-primary/30">
                        <Sparkles className="size-4 text-gold-soft" />
                    </div>

                    <div>
                        <p className="text-sm font-medium text-white">
                            Luxe Concierge
                        </p>

                        <div className="mt-0.5 flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-emerald-400" />
                            <span className="text-[0.65rem] text-white/45">
                                Online
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="flex size-8 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
                    aria-label="Back to booking"
                >
                    <ArrowLeft className="size-4" />
                </button>
            </div>

            {/* Progress */}
            <div className="flex shrink-0 gap-1.5 px-4 pt-3">
                {["occasion", "guests", "budget", "result"].map(
                    (item, index) => {
                        const steps = [
                            "occasion",
                            "guests",
                            "budget",
                            "result",
                        ];

                        const currentIndex = steps.indexOf(step);

                        return (
                            <span
                                key={item}
                                className={cn(
                                    "h-0.5 flex-1 rounded-full transition-all duration-500",
                                    index <= currentIndex
                                        ? "bg-primary"
                                        : "bg-white/10"
                                )}
                            />
                        );
                    }
                )}
            </div>

            {/* Messages */}
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/50
            scrollbar-thumb-rounded-full">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={cn(
                            "flex",
                            message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                        )}
                    >
                        {message.role === "assistant" && (
                            <div className="mr-2 mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                                <Bot className="size-3.5 text-gold-soft" />
                            </div>
                        )}

                        <div
                            className={cn(
                                "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-5",
                                message.role === "assistant"
                                    ? "rounded-tl-md border border-white/10 bg-white/8 text-white/75"
                                    : "rounded-tr-md bg-primary text-primary-foreground"
                            )}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}

                {/* Occasion */}
                {step === "occasion" && (
                    <div className="space-y-2 pt-1">
                        <p className="text-[0.65rem] uppercase tracking-[0.15em] text-white/35">
                            Choose an occasion
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                            {occasions.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => handleOccasion(item)}
                                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-left text-[0.7rem] text-white/75 transition hover:border-primary/50 hover:bg-primary/10 hover:text-white"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Guests */}
                {step === "guests" && (
                    <div className="space-y-2 pt-1">
                        <div className="mb-2 flex items-center gap-2 text-white/50">
                            <Users className="size-3.5" />
                            <span className="text-[0.65rem] uppercase tracking-[0.15em]">
                                Number of guests
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {guestOptions.map((count) => (
                                <button
                                    key={count}
                                    type="button"
                                    onClick={() => handleGuests(count)}
                                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white/75 transition hover:border-primary/50 hover:bg-primary/10 hover:text-white"
                                >
                                    {count}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Budget */}
                {step === "budget" && (
                    <div className="space-y-2 pt-1">
                        <div className="mb-2 flex items-center gap-2 text-white/50">
                            <Wallet className="size-3.5" />
                            <span className="text-[0.65rem] uppercase tracking-[0.15em]">
                                Your budget
                            </span>
                        </div>

                        <div className="space-y-2">
                            {budgetOptions.map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() =>
                                        handleBudget(
                                            item.value,
                                            item.label
                                        )
                                    }
                                    className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-left text-xs text-white/75 transition hover:border-primary/50 hover:bg-primary/10 hover:text-white"
                                >
                                    {item.label}
                                    <ChevronRight className="size-3.5 text-white/30" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recommendation */}
                {step === "result" && (
                    loading ? (
                        <div className="py-6 text-center text-xs text-white/50">
                            Finding the perfect theatre...
                        </div>
                    ) : recommendation ? (
                        <div className="animate-fade-up space-y-3">
                            <div className="rounded-xl border border-primary/30 bg-primary/10 p-3.5">
                                <div className="mb-2 flex items-center gap-2">
                                    <div className="flex size-7 items-center justify-center rounded-full bg-primary">
                                        <Check className="size-3.5 text-primary-foreground" />
                                    </div>

                                    <div>
                                        <p className="text-[0.65rem] uppercase tracking-[0.14em] text-gold-soft">
                                            My recommendation
                                        </p>
                                    </div>
                                </div>

                                <h3 className="font-serif text-lg text-white">
                                    {recommendation.theatre.name}
                                </h3>

                                <p className="mt-1 text-[0.7rem] leading-5 text-white/55">
                                    A great fit for your {occasion?.toLowerCase()}{" "}
                                    with {guests}{" "}
                                    {guests === 1 ? "guest" : "guests"}.
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                                <p className="text-[0.6rem] uppercase tracking-[0.15em] text-white/40">
                                    Suggested add-on
                                </p>

                                <p className="mt-1 text-sm font-medium text-white">
                                    {recommendation.addOn.name}
                                </p>

                                <p className="mt-1 text-[0.7rem] text-white/50">
                                    {recommendation.addOn.description}
                                </p>
                            </div>

                            <Button
                                type="button"
                                className="h-10 w-full rounded-xl bg-primary text-xs text-primary-foreground hover:bg-primary"
                                onClick={() => {
                                    // todo: Connect with booking flow.
                                    // We can pass the recommended theatre here.
                                }}
                            >
                                Start this booking
                                <ArrowRight className="ml-1 size-3.5" />
                            </Button>

                            <button
                                type="button"
                                onClick={onClose}
                                className="flex w-full items-center justify-center gap-1 text-[0.65rem] text-white/40 transition hover:text-white/70"
                            >
                                <ArrowLeft className="size-3" />
                                Back to standard booking
                            </button>
                        </div>
                    ) : (
                        <div className="py-6 text-center text-xs text-white/50">
                            Sorry, I couldn&apos;t find a theatre matching your requirements.
                        </div>
                    )
                )}
            </div>

            {/* Input */}
            {step !== "result" && (
                <div className="shrink-0 border-t border-white/10 p-3">
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 focus-within:border-primary/40">
                        <input
                            value={customMessage}
                            onChange={(event) =>
                                setCustomMessage(event.target.value)
                            }
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    sendCustomMessage();
                                }
                            }}
                            placeholder="Ask your concierge..."
                            className="min-w-0 flex-1 bg-transparent py-1.5 text-xs text-white outline-none placeholder:text-white/30"
                        />

                        <button
                            type="button"
                            onClick={sendCustomMessage}
                            disabled={!customMessage.trim()}
                            className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:scale-105 disabled:opacity-30"
                            aria-label="Send message"
                        >
                            <Send className="size-3.5" />
                        </button>
                    </div>

                    <p className="mt-2 text-center text-[0.58rem] text-white/25">
                        Luxe AI can help plan your perfect screening.
                    </p>
                </div>
            )}

            {step === "result" && (
                <div className="shrink-0 border-t border-white/10 px-4 py-3 text-center">
                    <p className="text-[0.6rem] text-white/30">
                        Powered by Luxe Concierge
                    </p>
                </div>
            )}
        </div>
    );
}