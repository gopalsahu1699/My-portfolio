"use client";

import SectionReveal from "@/components/ui/SectionReveal";

const SKILLS = {
    Frontend: [
        "React", "Next.js 14", "TypeScript", "Tailwind CSS",
        "Framer Motion", "GSAP", "Shadcn/ui", "Redux Toolkit",
        "React Query", "HTML5 / CSS3",
    ],
    Backend: [
        "Node.js", "Supabase", "PostgreSQL", "Prisma ORM",
        "REST APIs", "tRPC", "Zod", "NextAuth.js",
    ],
    Tools: [
        "Git / GitHub", "Vercel", "VS Code", "Figma",
        "Postman", "Docker", "npm / pnpm", "Linux CLI",
    ],
};

const CATEGORY_COLORS: Record<string, { border: string; glow: string; badge: string; text: string }> = {
    Frontend: {
        border: "rgba(139,92,246,0.3)",
        glow: "rgba(139,92,246,0.06)",
        badge: "rgba(139,92,246,0.12)",
        text: "rgba(196,181,253,0.9)",
    },
    Backend: {
        border: "rgba(59,130,246,0.3)",
        glow: "rgba(59,130,246,0.06)",
        badge: "rgba(59,130,246,0.12)",
        text: "rgba(147,197,253,0.9)",
    },
    Tools: {
        border: "rgba(6,182,212,0.3)",
        glow: "rgba(6,182,212,0.06)",
        badge: "rgba(6,182,212,0.12)",
        text: "rgba(103,232,249,0.9)",
    },
};

export default function SkillsSection() {
    return (
        <section id="skills" className="section-padding relative overflow-hidden">
            <div
                className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[1px] pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)" }}
            />

            <div className="max-w-7xl mx-auto">
                <SectionReveal>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="dot-glow" />
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Stack</span>
                    </div>
                    <h2 className="section-heading text-white mb-14">
                        Skills & <span className="gradient-text">Technologies</span>
                    </h2>
                </SectionReveal>

                <div className="grid md:grid-cols-3 gap-6">
                    {Object.entries(SKILLS).map(([category, skills], colIdx) => {
                        const colors = CATEGORY_COLORS[category];
                        return (
                            <SectionReveal key={category} delay={colIdx * 0.1}>
                                <div
                                    className="rounded-2xl p-6 h-full"
                                    style={{
                                        background: `linear-gradient(135deg, ${colors.glow} 0%, rgba(255,255,255,0.01) 100%)`,
                                        border: `1px solid ${colors.border}`,
                                    }}
                                >
                                    {/* Category header */}
                                    <h3
                                        className="text-sm font-bold uppercase tracking-widest mb-5"
                                        style={{ color: colors.text }}
                                    >
                                        {category}
                                    </h3>

                                    {/* Skill chips */}
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill, i) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 hover:scale-105 cursor-default"
                                                style={{
                                                    background: colors.badge,
                                                    border: `1px solid ${colors.border}`,
                                                    color: colors.text,
                                                    animationDelay: `${i * 0.05}s`,
                                                }}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </SectionReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
