"use client";

import { useRef, useCallback } from "react";
import { ExternalLink, Github } from "lucide-react";

interface TiltCardProps {
    title: string;
    description: string;
    tags: string[];
    gradient: string;
    emoji: string;
    live: string;
    github: string;
}

export default function TiltCard({
    title,
    description,
    tags,
    gradient,
    emoji,
    live,
    github,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotX = (y - 0.5) * -14;
        const rotY = (x - 0.5) * 14;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    }, []);

    const onMouseLeave = useCallback(() => {
        if (cardRef.current) {
            cardRef.current.style.transform =
                "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
        }
    }, []);

    return (
        <div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onMouseEnter={() => {
                if (cardRef.current) cardRef.current.style.transition = "transform 0.1s ease";
            }}
            className="group relative rounded-3xl overflow-hidden cursor-pointer"
            style={{
                willChange: "transform",
                transition: "transform 0.5s ease",
                background:
                    "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            {/* Top gradient preview area */}
            <div
                className={`relative h-52 bg-gradient-to-br ${gradient} p-8 flex items-center justify-center overflow-hidden`}
            >
                <div
                    className="text-7xl select-none"
                    style={{ filter: "drop-shadow(0 0 20px rgba(139,92,246,0.4))" }}
                >
                    {emoji}
                </div>
                {/* Shimmer */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
                    }}
                />
                {/* Animated border on hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-t-3xl"
                    style={{ boxShadow: "inset 0 0 40px rgba(139,92,246,0.1)" }}
                />
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                    {title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-5">{description}</p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-medium rounded-full"
                            style={{
                                background: "rgba(139,92,246,0.12)",
                                border: "1px solid rgba(139,92,246,0.2)",
                                color: "rgba(196,181,253,0.9)",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <a
                        href={live}
                        className="flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ExternalLink size={13} />
                        Live Demo
                    </a>
                    <a
                        href={github}
                        className="flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github size={13} />
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}
