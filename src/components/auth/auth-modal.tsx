"use client";

import { useEffect } from "react";
import AuthForm from "@/components/auth/auth-form";

type AuthMode = "signin" | "signup";

interface AuthModalProps {
    mode: AuthMode;
    onClose: () => void;
    onModeChange: (mode: AuthMode) => void;
}

export function AuthModal({ mode, onClose, onModeChange }: AuthModalProps) {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent bg-black/25 pb-4 pt-10 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={(mode === "signin") ? "Sign in" : "Create an account"}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="mx-auto w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
                <AuthForm
                    mode={mode}
                    isModal
                    onClose={onClose}
                    onModeChange={onModeChange}
                />
            </div>
        </div>
    );
}