"use client";

import { useState, useCallback, useRef } from "react";
import { PROJECTS, CATEGORIES, type Category, type Project } from "@/lib/projects";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import SectionReveal from "@/components/ui/SectionReveal";
import {
    ExternalLink,
    Github,
    X,
    Clock,
    User,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Layers,
} from "lucide-react";

/* ─── Filter pills ─── */
function FilterBar({
    active,
    onChange,
}: {
    active: Category;
    onChange: (c: Category) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onChange(cat)}
                    className="relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                    style={
                        active === cat
                            ? {
                                background:
                                    "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)",
                                color: "#fff",
                                boxShadow: "0 0 20px rgba(139,92,246,0.35)",
                            }
                            : {
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                color: "rgba(255,255,255,0.5)",
                            }
                    }
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}

/* ─── Tilt card ─── */
function ProjectCard({
    project,
    onClick,
}: {
    project: Project;
    onClick: () => void;
}) {
    const cardRef = useRef<HTMLDivElement>(null);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        card.style.transform = `perspective(900px) rotateX(${(y - 0.5) * -12}deg) rotateY(${(x - 0.5) * 12
            }deg) scale(1.02)`;
    }, []);

    const onMouseLeave = useCallback(() => {
        if (cardRef.current)
            cardRef.current.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    }, []);

    return (
        <div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            className="group relative rounded-3xl overflow-hidden cursor-pointer"
            style={{
                willChange: "transform",
                transition: "transform 0.5s ease",
                background:
                    "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            {/* Gradient preview */}
            <div
                className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
            >
                <div
                    className="text-6xl select-none"
                    style={{ filter: "drop-shadow(0 0 24px rgba(139,92,246,0.5))" }}
                >
                    {project.emoji}
                </div>

                {/* Category badge */}
                <span
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                        background: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.85)",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    {project.category}
                </span>

                {/* Year badge */}
                <span
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                        background: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.6)",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    {project.year}
                </span>

                {/* Hover shimmer */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
                    }}
                />
            </div>

            {/* Body */}
            <div className="p-6">
                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 transition-all duration-300">
                    {project.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4">{project.shortDesc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.slice(0, 4).map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-medium rounded-full"
                            style={{
                                background: "rgba(139,92,246,0.1)",
                                border: "1px solid rgba(139,92,246,0.2)",
                                color: "rgba(196,181,253,0.85)",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 4 && (
                        <span
                            className="px-2.5 py-1 text-xs font-medium rounded-full"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                color: "rgba(255,255,255,0.35)",
                            }}
                        >
                            +{project.tags.length - 4}
                        </span>
                    )}
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4">
                        <a
                            href={project.live}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-white transition-colors"
                        >
                            <ExternalLink size={12} />
                            Live
                        </a>
                        <a
                            href={project.github}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-white transition-colors"
                        >
                            <Github size={12} />
                            Code
                        </a>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-white/30 group-hover:text-brand-purple transition-colors">
                        View details
                        <ChevronRight size={12} />
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ─── Project Detail Modal ─── */
function ProjectModal({
    project,
    onClose,
}: {
    project: Project;
    onClose: () => void;
}) {
    return (
        <div
            className="fixed inset-0 z-[9995] flex items-end md:items-center justify-center p-0 md:p-6"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Panel */}
            <div
                className="relative z-10 w-full md:max-w-3xl max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl"
                style={{
                    background: "linear-gradient(160deg, #111118 0%, #0B0B0F 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header gradient band */}
                <div
                    className={`relative h-56 bg-gradient-to-br ${project.gradient} flex flex-col items-center justify-center rounded-t-3xl overflow-hidden`}
                >
                    <div
                        className="text-7xl mb-2 select-none"
                        style={{ filter: "drop-shadow(0 0 30px rgba(139,92,246,0.6))" }}
                    >
                        {project.emoji}
                    </div>
                    <span
                        className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                        style={{
                            background: "rgba(0,0,0,0.35)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        {project.category}
                    </span>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8">
                    <h2 className="text-2xl font-black text-white mb-2">{project.title}</h2>

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-5 mb-6 text-xs text-white/40">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={12} /> {project.year}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={12} /> {project.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <User size={12} /> {project.role}
                        </span>
                    </div>

                    <p className="text-white/60 leading-relaxed text-sm mb-8">{project.fullDesc}</p>

                    {/* Highlights */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {project.highlights.map((h) => (
                            <div
                                key={h.label}
                                className="text-center py-4 rounded-2xl"
                                style={{
                                    background: "rgba(139,92,246,0.06)",
                                    border: "1px solid rgba(139,92,246,0.15)",
                                }}
                            >
                                <div className="text-2xl font-black gradient-text">{h.value}</div>
                                <div className="text-xs text-white/40 mt-1">{h.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Features */}
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">
                        Key Features
                    </h3>
                    <ul className="space-y-2.5 mb-8">
                        {project.features.map((f) => (
                            <li key={f} className="flex items-start gap-3 text-sm text-white/65">
                                <CheckCircle2
                                    size={15}
                                    className="text-brand-purple mt-0.5 flex-shrink-0"
                                />
                                {f}
                            </li>
                        ))}
                    </ul>

                    {/* Full tag list */}
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-3">
                        Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1.5 text-xs font-medium rounded-full"
                                style={{
                                    background: "rgba(139,92,246,0.1)",
                                    border: "1px solid rgba(139,92,246,0.2)",
                                    color: "rgba(196,181,253,0.9)",
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="flex gap-4">
                        <a
                            href={project.live}
                            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
                            style={{
                                background:
                                    "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)",
                            }}
                        >
                            <ExternalLink size={15} />
                            Live Demo
                        </a>
                        <a
                            href={project.github}
                            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white/70 hover:text-white transition-all duration-300"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.1)",
                            }}
                        >
                            <Github size={15} />
                            View Code
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Page ─── */
export default function WorkPage() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filtered =
        activeCategory === "All"
            ? PROJECTS
            : PROJECTS.filter((p) => p.category === activeCategory);

    return (
        <>
            <Navbar />
            <main className="relative min-h-screen pt-32 pb-0 overflow-hidden">
                {/* Background glows */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 70%)",
                    }}
                />

                <div className="max-w-7xl mx-auto px-6">
                    {/* Page header */}
                    <SectionReveal>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white/50 mb-6 glass" style={{ border: "1px solid rgba(139,92,246,0.2)" }}>
                                <Layers size={12} className="text-brand-purple" />
                                Complete Portfolio
                            </div>
                            <h1 className="section-heading text-white mb-4">
                                All <span className="gradient-text">Work</span>
                            </h1>
                            <p className="text-white/45 max-w-xl mx-auto text-base leading-relaxed">
                                {PROJECTS.length} projects across web apps, dashboards, SaaS products, and landing pages.
                                Each built from scratch with a focus on performance and design.
                            </p>
                        </div>
                    </SectionReveal>

                    {/* Filter bar */}
                    <SectionReveal delay={0.1}>
                        <div className="mb-12">
                            <FilterBar active={activeCategory} onChange={setActiveCategory} />
                        </div>
                    </SectionReveal>

                    {/* Count */}
                    <SectionReveal delay={0.12}>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-white/30">
                                Showing{" "}
                                <span className="text-white/60 font-semibold">{filtered.length}</span>{" "}
                                project{filtered.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </SectionReveal>

                    {/* Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-24">
                        {filtered.map((project, i) => (
                            <SectionReveal key={project.id} delay={i * 0.06}>
                                <ProjectCard
                                    project={project}
                                    onClick={() => setSelectedProject(project)}
                                />
                            </SectionReveal>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />

            {/* Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </>
    );
}
