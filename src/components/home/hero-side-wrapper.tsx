"use client";

import { HeroAIChat } from "@/components/home/hero-ai-chat";
import { HeroBookingForm } from "@/components/home/hero-booking-form";

interface HeroSideWrapperProps {
    showAI: boolean;
    onToggleAI: () => void;
}

export function HeroSideWrapper({
    showAI,
    onToggleAI,
}: HeroSideWrapperProps) {
    return (
        <div className="relative w-full max-w-90">
            {showAI ? (
                <HeroAIChat onClose={onToggleAI} />
            ) : (
                <HeroBookingForm />
            )}
        </div>
    );
}