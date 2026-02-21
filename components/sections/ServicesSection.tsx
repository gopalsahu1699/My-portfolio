"use client";

import SectionReveal from "@/components/ui/SectionReveal";
import { Globe, LayoutDashboard, Zap, Gauge } from "lucide-react";

const SERVICES = [
    {
        icon: Globe,
        title: "Web Application Development",
        description:
            "Full-stack web apps built with Next.js, React, and TypeScript. From concept to deployment — fast, scalable, and pixel-perfect.",
        gradient: "from-violet-500 to-purple-600",
        glow: "rgba(139,92,246,0.15)",
    },
    {
        icon: LayoutDashboard,
        title: "Admin Dashboard Development",
        description:
            "Complex dashboards with real-time data, charts, tables, and role-based access. Built with Shadcn/ui and Supabase.",
        gradient: "from-blue-500 to-cyan-600",
        glow: "rgba(59,130,246,0.15)",
    },
    {
        icon: Zap,
        title: "SaaS MVP Development",
        description:
            "Launch your SaaS product in weeks. Auth, billing, onboarding, and core features — all production-ready from day one.",
        gradient: "from-cyan-500 to-teal-600",
        glow: "rgba(6,182,212,0.15)",
    },
    {
        icon: Gauge,
        title: "Performance Optimization",
        description:
            "Diagnose and eliminate bottlenecks. Core Web Vitals, bundle optimization, database query tuning, and CDN setup.",
        gradient: "from-emerald-500 to-green-600",
        glow: "rgba(16,185,129,0.15)",
    },
];

export default function ServicesSection() {
    return (
        <section id="services" className="section-padding relative overflow-hidden">
            {/* Divider line */}
            <div
                className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[1px] pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)" }}
            />

            <div className="max-w-7xl mx-auto">
                <SectionReveal>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="dot-glow" />
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Services</span>
                    </div>
                    <h2 className="section-heading text-white mb-14">
                        What I <span className="gradient-text">Build</span>
                    </h2>
                </SectionReveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {SERVICES.map((service, i) => {
                        const Icon = service.icon;
                        return (
                            <SectionReveal key={service.title} delay={i * 0.1}>
                                <div
                                    className="group relative p-6 rounded-2xl h-full flex flex-col gap-5 transition-all duration-500 hover:scale-[1.02]"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        boxShadow: `0 0 0 0 ${service.glow}`,
                                        transition: "box-shadow 0.4s ease, transform 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px ${service.glow}, 0 0 0 1px rgba(255,255,255,0.06)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${service.glow}`;
                                    }}
                                >
                                    {/* Icon */}
                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${service.gradient}`}
                                        style={{ boxShadow: `0 4px 20px ${service.glow}` }}
                                    >
                                        <Icon size={22} />
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <h3 className="text-base font-bold text-white mb-2">{service.title}</h3>
                                        <p className="text-sm text-white/45 leading-relaxed">{service.description}</p>
                                    </div>

                                    {/* Hover glow overlay */}
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                                        style={{ background: `radial-gradient(ellipse at top left, ${service.glow} 0%, transparent 60%)` }}
                                    />
                                </div>
                            </SectionReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
