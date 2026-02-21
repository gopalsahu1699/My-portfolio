"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "left" | "right";
}

export default function SectionReveal({
    children,
    className,
    delay = 0,
    direction = "up",
}: SectionRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const initialTransform = {
            up: "translateY(40px)",
            left: "translateX(-40px)",
            right: "translateX(40px)",
        }[direction];

        el.style.opacity = "0";
        el.style.transform = initialTransform;
        el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = "1";
                    el.style.transform = "translate(0,0)";
                    observer.disconnect();
                }
            },
            { threshold: 0.12 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay, direction]);

    return (
        <div ref={ref} className={cn("will-change-transform", className)}>
            {children}
        </div>
    );
}
