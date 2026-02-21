"use client";

import { useRef, useCallback } from "react";
import SectionReveal from "@/components/ui/SectionReveal";
import { ExternalLink, Github, Layers } from "lucide-react";

interface Project {
    title: string;
    description: string;
    tags: string[];
    gradient: string;
    emoji: string;
    live: string;
    github: string;
}

const PROJECTS: Project[] = [
    {
        title: "AI Marketing Dashboard",
        description:
            "Intelligent marketing analytics platform with AI-powered insights. Real-time campaign tracking, audience segmentation, and conversion funnel visualization with predictive analytics.",
        tags: ["Next.js", "OpenAI", "Supabase", "Recharts", "Tailwind"],
        gradient: "from-violet-600/30 via-purple-600/20 to-blue-600/10",
        emoji: "🤖",
        live: "#",
        github: "#",
    },
    {
        title: "Lead Management CRM",
        description:
            "Full-featured CRM for managing leads, follow-ups, and sales pipelines. Includes custom pipelines, activity logs, email tracking, and real-time collaboration.",
        tags: ["React", "TypeScript", "Supabase", "Shadcn/ui", "GSAP"],
        gradient: "from-blue-600/30 via-cyan-600/20 to-teal-600/10",
        emoji: "📊",
        live: "#",
        github: "#",
    },
    {
        title: "Business Landing Page Builder",
        description:
            "Drag-and-drop landing page builder for non-technical users. Custom blocks, real-time preview, one-click deployment, and integrated analytics.",
        tags: ["Next.js", "Framer Motion", "Shadcn/ui", "Tailwind", "Vercel"],
        gradient: "from-cyan-600/30 via-teal-600/20 to-emerald-600/10",
        emoji: "🚀",
        live: "#",
        github: "#",
    },
];

function TiltCard({ project }: { project: Project }) {
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
            cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
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
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            {/* Top gradient preview area */}
            <div className={`relative h-52 bg-gradient-to-br ${project.gradient} p-8 flex items-center justify-center overflow-hidden`}>
                <div className="text-7xl select-none" style={{ filter: "drop-shadow(0 0 20px rgba(139,92,246,0.4))" }}>
                    {project.emoji}
                </div>
                {/* Shimmer */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
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
                    {project.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-5">{project.description}</p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
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
                        href={project.live}
                        className="flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors duration-200"
                    >
                        <ExternalLink size={13} />
                        Live Demo
                    </a>
                    <a
                        href={project.github}
                        className="flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors duration-200"
                    >
                        <Github size={13} />
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function ProjectsSection() {
    return (
        <section id="projects" className="section-padding relative overflow-hidden">
            {/* bg accent */}
            <div
                className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[1px] pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)" }}
            />

            <div className="max-w-7xl mx-auto">
                <SectionReveal>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="dot-glow" />
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Featured Work</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
                        <h2 className="section-heading text-white">
                            Projects that <span className="gradient-text">Speak</span>
                        </h2>
                        <a href="/work" className="text-sm text-white/50 hover:text-white transition-colors tracking-wide flex items-center gap-1.5">
                            <Layers size={14} />
                            View all work
                        </a>
                    </div>
                </SectionReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROJECTS.map((project, i) => (
                        <SectionReveal key={project.title} delay={i * 0.1}>
                            <TiltCard project={project} />
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
