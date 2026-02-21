"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "outline";
    strength?: number;
}

export default function MagneticButton({
    children,
    className,
    onClick,
    href,
    variant = "primary",
    strength = 0.3,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLElement>(null);

    const onMouseMove = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            const btn = buttonRef.current;
            if (!btn) return;
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * strength;
            const y = (e.clientY - rect.top - rect.height / 2) * strength;
            btn.style.transform = `translate(${x}px, ${y}px)`;
        },
        [strength]
    );

    const onMouseLeave = useCallback(() => {
        if (!buttonRef.current) return;
        buttonRef.current.style.transform = "translate(0,0)";
    }, []);

    const baseStyles =
        "relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 select-none";
    const primaryStyles =
        "bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-105";
    const outlineStyles =
        "border border-glass-border text-white/80 hover:border-brand-purple/60 hover:text-white hover:bg-white/5 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]";

    const combinedClass = cn(baseStyles, variant === "primary" ? primaryStyles : outlineStyles, className);

    if (href) {
        return (
            <a
                ref={buttonRef as React.RefObject<HTMLAnchorElement>}
                href={href}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className={combinedClass}
                style={{ willChange: "transform", transition: "transform 0.1s ease, box-shadow 0.3s ease, scale 0.3s ease" }}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            className={combinedClass}
            style={{ willChange: "transform", transition: "transform 0.1s ease, box-shadow 0.3s ease, scale 0.3s ease" }}
        >
            {children}
        </button>
    );
}
