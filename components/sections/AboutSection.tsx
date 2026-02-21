"use client";

import SectionReveal from "@/components/ui/SectionReveal";
import { useEffect, useRef, useState } from "react";

const STATS = [
    { value: 10, suffix: "+", label: "Projects Built" },
    { value: 5, suffix: "+", label: "Dashboard Systems" },
    { value: 8, suffix: "+", label: "Auth Systems" },
    { value: 3, suffix: "yr", label: "Modern UI/UX Focus" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    let start = 0;
                    const step = Math.ceil(target / 40);
                    const interval = setInterval(() => {
                        start += step;
                        if (start >= target) { setCount(target); clearInterval(interval); }
                        else setCount(start);
                    }, 40);
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutSection() {
    return (
        <section id="about" className="section-padding relative overflow-hidden">
            {/* Subtle radial glow */}
            <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-10"
                style={{ background: "radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)" }}
            />

            <div className="max-w-7xl mx-auto">
                {/* Badge */}
                <SectionReveal>
                    <div className="flex items-center gap-3 mb-12">
                        <span className="dot-glow" />
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                            About Me
                        </span>
                    </div>
                </SectionReveal>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left: Text */}
                    <SectionReveal direction="left">
                        <div>
                            <h2 className="section-heading text-white mb-6">
                                Crafting Digital
                                <br />
                                <span className="gradient-text">Experiences</span>
                            </h2>
                            <p className="text-white/55 text-base md:text-lg leading-relaxed mb-5">
                                I&apos;m a Full Stack Developer passionate about building products that are as performant as they are beautiful. From pixel-perfect UIs to robust backend systems, I handle the full stack.
                            </p>
                            <p className="text-white/45 text-base leading-relaxed mb-8">
                                I specialize in Next.js, React, TypeScript, and Supabase — delivering fast, scalable applications for startups and growing businesses. Every line of code is written with the end user in mind.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "PostgreSQL"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-1.5 text-xs font-medium rounded-full text-white/70 glass"
                                        style={{ border: "1px solid rgba(139,92,246,0.2)" }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </SectionReveal>

                    {/* Right: Stats Grid */}
                    <SectionReveal direction="right" delay={0.15}>
                        <div className="grid grid-cols-2 gap-4">
                            {STATS.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="glass rounded-2xl p-6 text-center group hover:border-brand-purple/30 transition-all duration-300"
                                    style={{
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                    }}
                                >
                                    <div className="text-4xl font-black gradient-text mb-2">
                                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-xs text-white/45 tracking-wide">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}
