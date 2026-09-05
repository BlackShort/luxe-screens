"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, MapPin, MapPinHouse } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { cities } from "@/data/content";
import { theaters } from "@/data/theaters";
import type { Place, Theater } from "@/types";
import { cn } from "@/lib/utils";


const glassFieldClass =
    "h-10! w-full rounded-xl border-white/15! bg-white/10! px-3 text-white! backdrop-blur-md hover:bg-white/12! hover:text-white! focus-visible:border-primary! focus-visible:ring-primary/30! disabled:cursor-not-allowed! disabled:opacity-40! disabled:border-white/10! disabled:bg-white/5! data-placeholder:text-white/60! [&_svg]:text-white/70!";

export function HeroBookingForm() {
    const router = useRouter();

    const [city, setCity] = useState<Place | "">("");
    const [theater, setTheater] = useState<Theater | null>(null);
    const [date, setDate] = useState<Date>();

    const availableTheaters = useMemo(() => {
        if (!city) return [];

        return theaters.filter(
            (theater) => theater.city === city
        );
    }, [city]);

    const today = useMemo(() => {
        const current = new Date();
        current.setHours(0, 0, 0, 0);
        return current;
    }, []);

    function handleCityChange(value: string) {
        setCity(value as Place | "");
        setTheater(null);
    }

    function handleContinue() {
        if (!city || !theater || !date) return;

        const params = new URLSearchParams({
            city,
            theater: theater?.id,
            date: format(date, "yyyy-MM-dd"),
        });

        router.push(`/booking?${params.toString()}`);
    }

    return (
        <div className="animate-[booking-fade_0.7s_ease-out_0.52s_both] w-full max-w-90 rounded-2xl border border-white/20 bg-[#17140f]/35 p-4 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] backdrop-blur-2xl backdrop-saturate-150 sm:p-5">
            <div className="mb-4">
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-gold-soft">
                    Start your booking
                </p>

                <h2 className="mt-1.5 font-serif text-2xl leading-tight text-white sm:text-[1.7rem]">
                    Plan your private
                    <br />
                    screening
                </h2>

                <p className="mt-1.5 text-xs leading-5 text-white/60">
                    Choose your location and date to get started.
                </p>
            </div>

            <div className="space-y-3">
                <div>
                    <Label className="mb-2 block text-xs font-medium text-white/80">
                        City
                    </Label>

                    <Select
                        value={city}
                        onValueChange={(value) =>
                            handleCityChange(value ?? "")
                        }
                    >
                        <SelectTrigger
                            size="default"
                            className={glassFieldClass}
                        >
                            <MapPin aria-hidden="true" className="shrink-0" />
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
                </div>

                {/* Theatre */}
                <div>
                    <Label className="mb-2 block text-xs font-medium text-white/80">
                        Theatre
                    </Label>

                    <Select
                        value={theater?.id ?? ""}
                        onValueChange={(value) => {
                            const selectedTheater =
                                availableTheaters.find((t) => t.id === value) ?? null;

                            setTheater(selectedTheater);
                        }}
                        disabled={!city}
                    >
                        <SelectTrigger
                            size="default"
                            className={glassFieldClass}
                        >
                            <MapPinHouse aria-hidden="true" className="shrink-0" />
                            <SelectValue
                                placeholder={
                                    city
                                        ? "Select theatre"
                                        : "Select a city first"
                                }
                            >
                                {theater?.name}
                            </SelectValue>
                        </SelectTrigger>

                        <SelectContent
                            alignItemWithTrigger={false}
                            align="start"
                        >
                            {availableTheaters.map((theater) => (
                                <SelectItem
                                    key={theater.id}
                                    value={theater.id}
                                >
                                    {theater.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Date */}
                <div>
                    <Label className="mb-2 block text-xs font-medium text-white/80">
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
                                        "justify-start text-left font-normal data-[empty=true]:text-white/60!"
                                    )}
                                >
                                    <CalendarDays aria-hidden="true" className="shrink-0" />

                                    {date ? format(date, "PPP") : <span>Select a date</span>}
                                </Button>
                            }
                        />

                        <PopoverContent
                            className="w-auto p-0"
                            align="start"
                        >
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                defaultMonth={date ?? today}
                                disabled={{ before: today }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Continue */}
                <Button
                    type="button"
                    size="lg"
                    disabled={!city || !theater || !date}
                    onClick={handleContinue}
                    className="btn-shine mt-2 h-11 w-full rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.02] hover:bg-primary disabled:pointer-events-none disabled:opacity-50"
                >
                    Continue

                    <ArrowRight
                        size={16}
                        aria-hidden="true"
                    />
                </Button>
            </div>

            {/* Footer note */}
            <p className="mt-4 text-center text-[0.7rem] text-white/45">
                You can add guests, occasions and extras next.
            </p>
        </div>
    );
}