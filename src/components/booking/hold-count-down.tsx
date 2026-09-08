"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function HoldCountdown({
    expiresAt,
    onExpire,
}: {
    expiresAt: string;
    onExpire: () => void;
}) {
    const [remainingMs, setRemainingMs] = useState(() =>
        new Date(expiresAt).getTime() - Date.now()
    );

    useEffect(() => {
        const tick = () => {
            const ms = new Date(expiresAt).getTime() - Date.now();
            setRemainingMs(ms);
            if (ms <= 0) onExpire();
        };

        tick();
        const id = window.setInterval(tick, 1000);
        return () => window.clearInterval(id);
    }, [expiresAt]);

    const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const low = totalSeconds <= 60;

    return (
        <div
            role="timer"
            className={cn(
                "mb-4 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium",
                low
                    ? "border-destructive/40 bg-destructive/5 text-destructive"
                    : "border-border bg-muted/40 text-muted-foreground"
            )}
        >
            <Clock size={14} aria-hidden="true" />
            <span>
                Your time is held for{" "}
                <span className="tabular-nums">
                    {minutes}:{String(seconds).padStart(2, "0")}
                </span>
            </span>
        </div>
    );
}
