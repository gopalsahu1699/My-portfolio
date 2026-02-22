import { createClient } from "@supabase/supabase-js";
import { Layers } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import TiltCard from "@/components/ui/TiltCard";

// Always fetch fresh — never serve a cached version
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Project {
    id: string;
    title: string;
    short_desc: string;
    tags: string[];
    gradient: string;
    emoji: string;
    live: string;
    github: string;
}

async function getProjects(): Promise<Project[]> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // If env vars are missing or still placeholders, return empty gracefully
    if (!url || !key || !url.startsWith("http")) return [];

    try {
        const supabase = createClient(url, key);
        const { data, error } = await supabase
            .from("projects")
            .select("id, title, short_desc, tags, gradient, emoji, live, github")
            .eq("featured", true)
            .order("created_at", { ascending: false });

        if (error || !data) return [];
        return data;
    } catch {
        return [];
    }
}

export default async function ProjectsSection() {
    const projects = await getProjects();

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
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                            Featured Work
                        </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
                        <h2 className="section-heading text-white">
                            Projects that <span className="gradient-text">Speak</span>
                        </h2>
                        <a
                            href="/work"
                            className="text-sm text-white/50 hover:text-white transition-colors tracking-wide flex items-center gap-1.5"
                        >
                            <Layers size={14} />
                            View all work
                        </a>
                    </div>
                </SectionReveal>

                {projects.length === 0 ? (
                    <div className="text-center py-20 text-white/20 text-sm">
                        No projects yet. Add some from the{" "}
                        <a href="/admin" className="text-violet-400 hover:underline">
                            admin panel
                        </a>
                        .
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, i) => (
                            <SectionReveal key={project.id} delay={i * 0.1}>
                                <TiltCard
                                    title={project.title}
                                    description={project.short_desc}
                                    tags={project.tags}
                                    gradient={project.gradient}
                                    emoji={project.emoji}
                                    live={project.live}
                                    github={project.github}
                                />
                            </SectionReveal>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
