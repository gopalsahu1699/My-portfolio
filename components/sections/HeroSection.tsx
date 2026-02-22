"use client";

import { useEffect, useRef, useState } from "react";
import HeroCanvas from "@/components/ui/HeroCanvas";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowDown, Sparkles } from "lucide-react";

const TYPING_WORDS = ["Web Apps", "Dashboards", "AI Tools", "SaaS Products"];

export default function HeroSection() {
    const [wordIndex, setWordIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [deleting, setDeleting] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const word = TYPING_WORDS[wordIndex];
        if (!deleting && displayed.length < word.length) {
            timeoutRef.current = setTimeout(
                () => setDisplayed(word.slice(0, displayed.length + 1)),
                80
            );
        } else if (!deleting && displayed.length === word.length) {
            timeoutRef.current = setTimeout(() => setDeleting(true), 1800);
        } else if (deleting && displayed.length > 0) {
            timeoutRef.current = setTimeout(
                () => setDisplayed(displayed.slice(0, -1)),
                45
            );
        } else if (deleting && displayed.length === 0) {
            setDeleting(false);
            setWordIndex((i) => (i + 1) % TYPING_WORDS.length);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [displayed, deleting, wordIndex]);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24"
        >
            {/* ── 3D Three.js Canvas (full background) ── */}
            <HeroCanvas />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 70%)",
                }}
            />

            {/* Soft blobs behind text for readability */}
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />

            {/* ── Hero content ── */}
            <div className="relative z-10 text-center max-w-5xl mx-auto">
                {/* Badge */}
                <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white/60 mb-8 glass"
                    style={{ border: "1px solid rgba(139,92,246,0.25)" }}
                >
                    <span className="dot-glow" />
                    Available for Freelance Work
                    <Sparkles size={12} className="text-brand-purple" />
                </div>

                {/* Main heading */}
                <h1 className="hero-heading text-white mb-4">
                    <span className="block text-white/90">Gopal Krishn</span>
                    <span className="block gradient-text">Sahu</span>
                </h1>

                {/* Subheading */}
                <p className="text-white/50 text-lg md:text-xl font-light max-w-2xl mx-auto mb-3 tracking-wide">
                    Full Stack Developer building scalable digital products
                </p>

                {/* Typing animation */}
                <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-semibold mb-10 h-10">
                    <span className="gradient-text">{displayed}</span>
                    <span
                        className="inline-block w-0.5 h-7 bg-brand-purple ml-0.5"
                        style={{ animation: "glowPulse 0.9s step-end infinite" }}
                    />
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <MagneticButton href="#projects" variant="primary" className="text-sm">
                        View Projects
                    </MagneticButton>
                    <MagneticButton href="#contact" variant="outline" className="text-sm">
                        Hire Me
                    </MagneticButton>
                </div>

                {/* Scroll hint */}
                <div className="mt-20 flex flex-col items-center gap-2 opacity-40">
                    <span className="text-xs tracking-widest uppercase text-white/50">
                        Scroll
                    </span>
                    <ArrowDown size={16} className="text-white/50 animate-bounce" />
                </div>
            </div>
        </section>
    );
}
