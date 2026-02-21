"use client";

import SectionReveal from "@/components/ui/SectionReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import {
    ShieldCheck,
    Zap,
    RefreshCcw,
    BadgeDollarSign,
    Clock,
    HeartHandshake,
} from "lucide-react";

const OFFERS = [
    {
        icon: BadgeDollarSign,
        title: "No Upfront Cost",
        desc: "Pay nothing to get started. Work begins immediately — you only pay after the first milestone is delivered and you're satisfied.",
        highlight: true,
        color: "#8B5CF6",
        glow: "rgba(139,92,246,0.15)",
        border: "rgba(139,92,246,0.35)",
    },
    {
        icon: ShieldCheck,
        title: "Satisfaction Guaranteed",
        desc: "If you're not 100% happy with the result, I'll revise it until you are — no arguments, no extra charges.",
        highlight: false,
        color: "#06B6D4",
        glow: "rgba(6,182,212,0.1)",
        border: "rgba(6,182,212,0.2)",
    },
    {
        icon: Zap,
        title: "Fast Turnaround",
        desc: "Most MVP projects delivered in 2–4 weeks. I move fast without cutting corners, keeping you updated daily.",
        highlight: false,
        color: "#3B82F6",
        glow: "rgba(59,130,246,0.1)",
        border: "rgba(59,130,246,0.2)",
    },
    {
        icon: RefreshCcw,
        title: "Free Revisions",
        desc: "Every project includes multiple revision rounds. Your feedback shapes the product — I don't stop until it feels right.",
        highlight: false,
        color: "#10B981",
        glow: "rgba(16,185,129,0.1)",
        border: "rgba(16,185,129,0.2)",
    },
    {
        icon: Clock,
        title: "On-Time Delivery",
        desc: "Deadlines are sacred. I set realistic timelines and always deliver on or before the agreed date.",
        highlight: false,
        color: "#F59E0B",
        glow: "rgba(245,158,11,0.1)",
        border: "rgba(245,158,11,0.2)",
    },
    {
        icon: HeartHandshake,
        title: "Post-Launch Support",
        desc: "I don't disappear after delivery. Get 30 days of free bug-fix support after your project goes live.",
        highlight: false,
        color: "#EC4899",
        glow: "rgba(236,72,153,0.1)",
        border: "rgba(236,72,153,0.2)",
    },
];

export default function OfferSection() {
    return (
        <section id="offer" className="section-padding relative overflow-hidden">
            {/* Top divider glow */}
            <div
                className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[1px] pointer-events-none"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)",
                }}
            />

            {/* Radial glow */}
            <div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[600px] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)",
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <SectionReveal>
                    <div className="text-center mb-4">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="dot-glow" />
                            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                                Why Work With Me
                            </span>
                        </div>
                        <h2 className="section-heading text-white mb-4">
                            Zero Risk,{" "}
                            <span className="gradient-text">Maximum Value</span>
                        </h2>
                        <p className="text-white/45 max-w-xl mx-auto text-base leading-relaxed">
                            I make it easy for business owners to invest in great software —
                            with no upfront risk and complete transparency from day one.
                        </p>
                    </div>
                </SectionReveal>

                {/* Hero offer banner */}
                <SectionReveal delay={0.1}>
                    <div
                        className="relative mt-10 mb-8 rounded-3xl p-8 md:p-10 overflow-hidden text-center"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.1) 50%, rgba(6,182,212,0.08) 100%)",
                            border: "1px solid rgba(139,92,246,0.3)",
                        }}
                    >
                        {/* Glow blob */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)",
                            }}
                        />
                        <div className="relative z-10">
                            <div
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-5"
                                style={{
                                    background: "rgba(139,92,246,0.2)",
                                    border: "1px solid rgba(139,92,246,0.4)",
                                    color: "#c4b5fd",
                                }}
                            >
                                <BadgeDollarSign size={16} />
                                Special Offer for New Clients
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                                🚀 Start Your Project With{" "}
                                <span className="gradient-text">No Upfront Payment</span>
                            </h3>
                            <p className="text-white/55 max-w-2xl mx-auto mb-8 leading-relaxed">
                                Get a fully functional MVP or landing page delivered first.
                                Review it, test it, love it — then we talk payment.
                                No contracts, no risk, no stress.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <MagneticButton href="/#contact" variant="primary">
                                    Claim This Offer
                                </MagneticButton>
                                <MagneticButton href="/work" variant="outline">
                                    See My Work First
                                </MagneticButton>
                            </div>
                        </div>
                    </div>
                </SectionReveal>

                {/* 6 offer cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {OFFERS.map((offer, i) => {
                        const Icon = offer.icon;
                        return (
                            <SectionReveal key={offer.title} delay={i * 0.08}>
                                <div
                                    className="group relative p-6 rounded-2xl h-full flex flex-col gap-4 transition-all duration-400 hover:scale-[1.02]"
                                    style={{
                                        background: `linear-gradient(135deg, ${offer.glow} 0%, rgba(255,255,255,0.02) 100%)`,
                                        border: `1px solid ${offer.border}`,
                                    }}
                                >
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{
                                            background: `${offer.glow}`,
                                            border: `1px solid ${offer.border}`,
                                        }}
                                    >
                                        <Icon size={20} style={{ color: offer.color }} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-white mb-1.5">
                                            {offer.title}
                                        </h3>
                                        <p className="text-sm text-white/50 leading-relaxed">
                                            {offer.desc}
                                        </p>
                                    </div>
                                </div>
                            </SectionReveal>
                        );
                    })}
                </div>

                {/* CTA strip */}
                <SectionReveal delay={0.15}>
                    <div className="mt-12 text-center">
                        <p className="text-white/35 text-sm mb-4">
                            Limited spots available each month. Currently{" "}
                            <span
                                className="font-semibold"
                                style={{ color: "#10B981" }}
                            >
                                accepting 2 new clients
                            </span>
                            .
                        </p>
                        <MagneticButton href="/#contact" variant="primary" className="mx-auto">
                            Get a Free Project Estimate →
                        </MagneticButton>
                    </div>
                </SectionReveal>
            </div>
        </section>
    );
}
