"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
    children: ReactNode;
    /** Delay in ms before the reveal animation starts, once in view. */
    delay?: number;
    /** Element to render as. Defaults to a plain div. */
    as?: ElementType;
    className?: string;
    /** Reveal once and keep visible, or re-trigger every time it enters view. */
    once?: boolean;
}

/**
 * Wraps children in a fade-up-on-scroll animation using IntersectionObserver.
 * Falls back to fully visible immediately if JS hasn't run yet / reduced motion.
 */
export function Reveal({
    children,
    delay = 0,
    as: Tag = "div",
    className,
    once = true,
}: RevealProps) {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        window.setTimeout(() => {
                            node.classList.add("is-visible");
                        }, delay);

                        if (once) observer.unobserve(node);
                    } else if (!once) {
                        node.classList.remove("is-visible");
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [delay, once]);

    return (
        <Tag ref={ref} className={cn("reveal", className)}>
            {children}
        </Tag>
    );
}
