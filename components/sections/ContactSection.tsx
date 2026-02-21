"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import SectionReveal from "@/components/ui/SectionReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { Github, Linkedin, Twitter, Send, Mail, MapPin } from "lucide-react";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    message: z.string().min(20, "Message must be at least 20 characters"),
});
type FormData = z.infer<typeof schema>;

const SOCIALS = [
    { icon: Github, label: "GitHub", href: "https://github.com/gopalsahu1699" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/gopalsahu" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/gopalsahu" },
];

export default function ContactSection() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Failed to send");
            toast.success("Message sent! I'll get back to you soon 🚀");
            reset();
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="section-padding relative overflow-hidden pb-32">
            {/* Glow overlay */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-20"
                style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.5) 0%, transparent 70%)" }}
            />

            <div className="max-w-5xl mx-auto">
                <SectionReveal>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="dot-glow" />
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Contact</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
                        <h2 className="section-heading text-white">
                            Let&apos;s <span className="gradient-text">Work Together</span>
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-white/40">
                            <Mail size={14} />
                            gopalsahu1699@gmail.com
                        </div>
                    </div>
                </SectionReveal>

                <div className="grid md:grid-cols-5 gap-10">
                    {/* Left info */}
                    <SectionReveal direction="left" className="md:col-span-2">
                        <div className="space-y-8">
                            {/* Info cards */}
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.2)" }}>
                                    <MapPin size={16} className="text-brand-purple" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white mb-0.5">Location</p>
                                    <p className="text-sm text-white/45">India — Remote Worldwide</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.2)" }}>
                                    <Mail size={16} className="text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white mb-0.5">Email</p>
                                    <p className="text-sm text-white/45">gopalsahu1699@gmail.com</p>
                                </div>
                            </div>

                            {/* Status badge */}
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-xs text-emerald-400 font-medium">Available for new projects</span>
                            </div>

                            {/* Socials */}
                            <div>
                                <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Find me on</p>
                                <div className="flex items-center gap-3">
                                    {SOCIALS.map(({ icon: Icon, label, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-all duration-200 hover:scale-110"
                                            style={{
                                                background: "rgba(255,255,255,0.04)",
                                                border: "1px solid rgba(255,255,255,0.08)",
                                            }}
                                        >
                                            <Icon size={16} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SectionReveal>

                    {/* Right: Form */}
                    <SectionReveal direction="right" delay={0.1} className="md:col-span-3">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="glass rounded-3xl p-8 space-y-5"
                            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                            {/* Name */}
                            <div>
                                <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">Name</label>
                                <input
                                    {...register("name")}
                                    placeholder="Your full name"
                                    className="glow-input w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 transition-all duration-200"
                                />
                                {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name.message}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">Email</label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="email@company.com"
                                    className="glow-input w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 transition-all duration-200"
                                />
                                {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email.message}</p>}
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">Message</label>
                                <textarea
                                    {...register("message")}
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                    className="glow-input w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 transition-all duration-200 resize-none"
                                />
                                {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message.message}</p>}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 disabled:opacity-50 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
                                style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)" }}
                            >
                                {loading ? (
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send size={15} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}
