"use client";

import { useRouter } from "next/navigation";
import { UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useIsDesktop } from "@/hooks/use-is-desktop";

interface AuthTriggerProps {
    mode?: "signin" | "signup";
    className?: string;
}

export function AuthTrigger({
    mode = "signin",
    className,
}: AuthTriggerProps) {
    const router = useRouter();
    const isDesktop = useIsDesktop();

    const handleClick = () => {
        if (isDesktop) {
            router.push(`/?auth=${mode}`);
            return;
        }

        router.push(
            mode === "signin"
                ? "/auth/sign-in"
                : "/auth/sign-up"
        );
    };

    return (
        <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClick}
            className={className}
        >
            <UserIcon className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />

            <span className="text-xs font-medium sm:text-sm">
                Sign In
            </span>
        </Button>
    );
}