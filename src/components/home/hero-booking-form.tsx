"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, MapPin, MapPinHouse } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { cities } from "@/data/content";
import type { Place, Theater } from "@/types";
import { cn } from "@/lib/utils";
import { useTheaters } from "@/hooks/api/use-theaters";
import { BOOKING_WINDOW_DAYS } from "@/lib/booking-config";

// const glassFieldClass = "h-10! w-full rounded-xl border-white/15! bg-white/10! px-3 text-white! backdrop-blur-md hover:bg-white/12! hover:text-white! focus-visible:border-primary! focus-visible:ring-primary/30! disabled:cursor-not-allowed! disabled:opacity-40! disabled:border-white/10! disabled:bg-white/5! data-placeholder:text-white/60! [&_svg]:text-white/70!";

const glassFieldClass = "h-12! w-full rounded-xl border-white/15! bg-white/7! px-3 text-white! shadow-none backdrop-blur-md transition-all duration-300 hover:border-white/25! hover:bg-white/12! focus-visible:border-white/40! focus-visible:ring-2! focus-visible:ring-white/10! disabled:cursor-not-allowed! disabled:border-white/10! disabled:bg-white/4! disabled:opacity-40! data-placeholder:text-white/55! [&_svg]:text-white/65!";

export function HeroBookingForm() {
    const router = useRouter();
    const { theaters, loading } = useTheaters();

    const [city, setCity] = useState<Place | "">("");
    const [theater, setTheater] = useState<Theater | null>(null);
    const [date, setDate] = useState<Date>();

    const availableTheaters = useMemo(() => {
        if (!city) return [];

        return theaters.filter((theater) => theater.city === city);
    }, [city, theaters]);

    const today = useMemo(() => {
        const current = new Date();
        current.setHours(0, 0, 0, 0);
        return current;
    }, []);

    const maxDate = useMemo(() => {
        const last = new Date(today);
        last.setDate(last.getDate() + (BOOKING_WINDOW_DAYS - 1));
        return last;
    }, [today]);

    function handleCityChange(value: string) {
        setCity(value as Place | "");
        setTheater(null);
    }

    function handleContinue() {
        if (!city || !theater || !date) return;

        const params = new URLSearchParams({
            city,
            theater: theater.id,
            date: format(date, "yyyy-MM-dd"),
        });

        router.push(`/booking?${params.toString()}`);
    }

    const isComplete = Boolean(city && theater && date);

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                handleContinue();
            }}
            className="w-full rounded-2xl border border-white/15 bg-[#17140f]/65! p-2 shadow-md md:shadow-[0_30px_100px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl backdrop-saturate-150 sm:p-2.5 lg:p-3"
        >
            <div className="flex flex-col gap-1.5 md:flex-row md:items-end md:gap-2">
                {/* City */}
                <Field className="min-w-0 flex-1 px-1.5 py-1.5">
                    <Label className="mb-2 block pl-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                        City
                    </Label>

                    <Select
                        value={city}
                        onValueChange={(value) => handleCityChange(value ?? "")}
                    >
                        <SelectTrigger
                            size="default"
                            className={glassFieldClass}
                        >
                            <span className="mr-1.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/7">
                                <MapPin
                                    aria-hidden="true"
                                    className="size-3.5!"
                                />
                            </span>

                            <SelectValue placeholder="Select city" />
                        </SelectTrigger>

                        <SelectContent
                            alignItemWithTrigger={false}
                            align="start"
                        >
                            {cities.map((item) => (
                                <SelectItem
                                    key={item.name}
                                    value={item.name}
                                >
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>

                {/* Divider */}
                <div className="hidden mb-2.5 h-10 w-px bg-white/10 lg:block" />

                {/* Theatre */}
                <Field className="min-w-0 flex-1 px-1.5 py-1.5">
                    <Label className="mb-2 block pl-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                        Theatre
                    </Label>

                    <Select
                        value={theater?.id ?? ""}
                        onValueChange={(value) => {
                            const selectedTheater =
                                availableTheaters.find(
                                    (item) => item.id === value
                                ) ?? null;

                            setTheater(selectedTheater);
                        }}
                        disabled={!city || loading}
                    >
                        <SelectTrigger
                            size="default"
                            className={glassFieldClass}
                        >
                            <span className="mr-1.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/7">
                                <MapPinHouse
                                    aria-hidden="true"
                                    className="size-3.5!"
                                />
                            </span>

                            <SelectValue
                                placeholder={
                                    !city
                                        ? "Select a city first"
                                        : loading
                                            ? "Loading theatres..."
                                            : "Select theatre"
                                }
                            >
                                {theater?.name}
                            </SelectValue>
                        </SelectTrigger>

                        <SelectContent
                            alignItemWithTrigger={false}
                            align="start"
                        >
                            {availableTheaters.map((item) => (
                                <SelectItem
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>

                {/* Divider */}
                <div className="hidden mb-2.5 h-10 w-px bg-white/10 lg:block" />

                {/* Date */}
                <Field className="min-w-0 flex-1 px-1.5 py-1.5">
                    <Label className="mb-2 block pl-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                        Date
                    </Label>

                    <Popover>
                        <PopoverTrigger
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    data-empty={!date}
                                    className={cn(
                                        glassFieldClass,
                                        "justify-start text-left font-normal data-[empty=true]:text-white/55!"
                                    )}
                                >
                                    <span className="mr-1.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/7">
                                        <CalendarDays
                                            aria-hidden="true"
                                            className="size-3.5!"
                                        />
                                    </span>

                                    {date ? (
                                        format(date, "PPP")
                                    ) : (
                                        <span>Select a date</span>
                                    )}
                                </Button>
                            }
                        />

                        <PopoverContent
                            className="w-auto rounded-xl border-border/50 p-0 shadow-xl"
                            align="start"
                        >
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                defaultMonth={date ?? today}
                                disabled={{
                                    before: today,
                                    after: maxDate,
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </Field>

                {/* Action */}
                <div className="p-1.5">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={!isComplete}
                        className="cursor-pointer group btn-shine h-12 w-full rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)] disabled:pointer-events-none disabled:opacity-40 lg:w-auto"
                    >
                        <span>
                            {isComplete ? "Continue" : "Book Now"}
                        </span>

                        {isComplete && (
                            <ArrowRight
                                size={16}
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}