"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AuthModal } from "@/components/auth/auth-modal";
import { useIsDesktop } from "@/hooks/use-is-desktop";

export function AuthModalHost() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const isDesktop = useIsDesktop();
    const auth = searchParams.get("auth");
    const isAuthModal = pathname === "/" && (auth === "signin" || auth === "signup");

    useEffect(() => {
        if (isDesktop === undefined) return;

        if (!isDesktop && isAuthModal) {
            router.replace((auth === "signup") ? "/auth/sign-up" : "/auth/sign-in");
        }
    }, [isDesktop, isAuthModal, auth, router]);

    if (isDesktop === undefined) return null;

    if (isDesktop && isAuthModal) {
        const mode = (auth === "signup") ? "signup" : "signin";

        const handleClose = () => {
            router.replace("/");
        };

        const handleModeChange = (newMode: "signin" | "signup") => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("auth", newMode);
            router.replace(`/?${params.toString()}`);
        };

        return (
            <AuthModal
                mode={mode}
                onClose={handleClose}
                onModeChange={handleModeChange}
            />
        );
    }

    return null;
}