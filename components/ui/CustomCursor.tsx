"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const ring = ringRef.current;
        if (!cursor || !ring) return;

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        };

        let animFrame: number;
        const animate = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
            animFrame = requestAnimationFrame(animate);
        };

        const onEnterInteractive = () => {
            cursor.classList.add("scale-150", "opacity-0");
            ring.classList.add("scale-150");
        };
        const onLeaveInteractive = () => {
            cursor.classList.remove("scale-150", "opacity-0");
            ring.classList.remove("scale-150");
        };

        window.addEventListener("mousemove", onMove);
        animFrame = requestAnimationFrame(animate);

        const interactives = document.querySelectorAll("a, button, [data-cursor]");
        interactives.forEach((el) => {
            el.addEventListener("mouseenter", onEnterInteractive);
            el.addEventListener("mouseleave", onLeaveInteractive);
        });

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(animFrame);
        };
    }, []);

    return (
        <>
            {/* Dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-purple z-[9999] pointer-events-none transition-transform duration-100 mix-blend-difference"
                style={{ willChange: "transform" }}
            />
            {/* Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-brand-purple/50 z-[9999] pointer-events-none transition-transform duration-300"
                style={{
                    willChange: "transform",
                    boxShadow: "0 0 10px rgba(139,92,246,0.3), inset 0 0 10px rgba(139,92,246,0.1)",
                }}
            />
        </>
    );
}
