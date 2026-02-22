"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { Lock, Mail, Eye, EyeOff, Shield } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const supabase = createSupabaseBrowserClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/admin");
            router.refresh();
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ background: "linear-gradient(135deg, #0a0a12 0%, #0f0f1e 50%, #0a0a12 100%)" }}
        >
            {/* Background glow */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 60% at 50% 20%, rgba(139,92,246,0.08) 0%, transparent 70%)",
                }}
            />

            <div className="w-full max-w-sm relative z-10">
                {/* Logo / Badge */}
                <div className="flex flex-col items-center mb-8">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{
                            background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(109,40,217,0.15))",
                            border: "1px solid rgba(139,92,246,0.4)",
                            boxShadow: "0 0 40px rgba(139,92,246,0.2)",
                        }}
                    >
                        <Shield size={28} className="text-violet-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                    <p className="text-sm text-white/40 mt-1">Sign in to manage your portfolio</p>
                </div>

                {/* Card */}
                <div
                    className="rounded-2xl p-8"
                    style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                    }}
                >
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    size={15}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                                />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                    }}
                                    onFocus={(e) =>
                                        (e.target.style.borderColor = "rgba(139,92,246,0.6)")
                                    }
                                    onBlur={(e) =>
                                        (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                                    }
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    size={15}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                    }}
                                    onFocus={(e) =>
                                        (e.target.style.borderColor = "rgba(139,92,246,0.6)")
                                    }
                                    onBlur={(e) =>
                                        (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div
                                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-red-300"
                                style={{
                                    background: "rgba(239,68,68,0.12)",
                                    border: "1px solid rgba(239,68,68,0.25)",
                                }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{
                                background: loading
                                    ? "rgba(139,92,246,0.4)"
                                    : "linear-gradient(135deg, #8B5CF6, #6D28D9)",
                                boxShadow: loading ? "none" : "0 0 25px rgba(139,92,246,0.35)",
                            }}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg
                                        className="animate-spin w-4 h-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        />
                                    </svg>
                                    Signing in…
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-white/20 mt-6">
                    Protected area — authorized access only
                </p>
            </div>
        </div>
    );
}
