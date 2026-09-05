"use client";

import { Star, Users } from "lucide-react";

import { StepShell } from "@/components/booking/step-shell";
import { Button } from "@/components/ui/button";
import { theaters } from "@/data/theaters";
import { formatCurrency, cn } from "@/lib/utils";

export function StepTheatre({
    city,
    theaterId,
    onSelectTheater,
    onNext,
    onBack,
}: {
    city?: string;
    theaterId?: string;
    onSelectTheater: (theaterId: string) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    const roomsInCity = city
        ? theaters.filter((theater) => theater.city === city)
        : [];

    return (
        <StepShell
            title="Select Theatre"
            description={
                city
                    ? `Choose a theatre in ${city} for your private screening.`
                    : "Choose a theatre for your private screening."
            }
        >
            {city ? (
                <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground">
                        Theatres in {city}
                    </p>

                    {roomsInCity.length > 0 ? (
                        roomsInCity.map((room) => {
                            const active = theaterId === room.id;

                            return (
                                <button
                                    key={room.id}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => onSelectTheater(room.id)}
                                    className={cn(
                                        "flex w-full items-center justify-between gap-4 rounded-lg border p-4 text-left transition-all duration-200",
                                        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                                        active
                                            ? "border-primary bg-primary/5"
                                            : "border-border/50 bg-background hover:border-primary/50 hover:bg-muted/50"
                                    )}
                                >
                                    <div className="min-w-0">
                                        <p className="font-medium text-foreground">
                                            {room.name}
                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {room.address}
                                        </p>

                                        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Star
                                                    size={12}
                                                    aria-hidden="true"
                                                    className="text-primary"
                                                    fill="currentColor"
                                                />
                                                {room.rating}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <Users size={12} aria-hidden="true" />
                                                Up to {room.maxCapacity}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="shrink-0 font-medium text-primary">
                                        {formatCurrency(room.basePrice)}
                                    </p>
                                </button>
                            );
                        })
                    ) : (
                        <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
                            <p className="text-sm font-medium text-foreground">
                                No theatres available
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Please choose another location.
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Please select a location first.
                    </p>
                </div>
            )}

            <div className="mt-8 flex gap-3">
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={onBack}
                >
                    Back
                </Button>

                <Button
                    type="button"
                    className="flex-1"
                    disabled={!theaterId}
                    onClick={onNext}
                >
                    Continue
                </Button>
            </div>
        </StepShell>
    );
}