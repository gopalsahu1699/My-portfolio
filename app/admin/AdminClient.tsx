"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import {
    Plus,
    Trash2,
    LogOut,
    ExternalLink,
    Github,
    Loader2,
    X,
    CheckCircle,
    AlertCircle,
    ChevronDown,
    Layers,
    Mail,
    Inbox,
    FolderOpen,
} from "lucide-react";

interface Project {
    id: string;
    title: string;
    short_desc: string;
    full_desc: string;
    category: string;
    tags: string[];
    emoji: string;
    gradient: string;
    year: string;
    duration: string;
    role: string;
    live: string;
    github: string;
    features: string[];
    featured: boolean;
    created_at: string;
}

const GRADIENT_OPTIONS = [
    { label: "Violet → Blue", value: "from-violet-600/40 via-purple-600/25 to-blue-600/15" },
    { label: "Blue → Teal", value: "from-blue-600/40 via-cyan-600/25 to-teal-600/15" },
    { label: "Cyan → Emerald", value: "from-cyan-600/40 via-teal-600/25 to-emerald-600/15" },
    { label: "Orange → Yellow", value: "from-orange-600/40 via-amber-600/25 to-yellow-600/15" },
    { label: "Pink → Red", value: "from-pink-600/40 via-rose-600/25 to-red-600/15" },
    { label: "Red → Amber", value: "from-red-600/40 via-orange-600/25 to-amber-600/15" },
    { label: "Indigo → Violet", value: "from-indigo-600/40 via-blue-600/25 to-violet-600/15" },
    { label: "Fuchsia → Pink", value: "from-fuchsia-600/40 via-purple-600/25 to-pink-600/15" },
];

const CATEGORY_OPTIONS = ["Web App", "Dashboard", "SaaS", "Landing Page"];

const EMPTY_FORM = {
    title: "",
    short_desc: "",
    full_desc: "",
    category: "Web App",
    tags: "",
    emoji: "🚀",
    gradient: GRADIENT_OPTIONS[0].value,
    year: new Date().getFullYear().toString(),
    duration: "",
    role: "Full Stack Developer",
    live: "#",
    github: "#",
    features: "",
};

type Toast = { type: "success" | "error"; message: string } | null;
type Tab = "projects" | "messages";

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
}

export default function AdminClient() {
    const router = useRouter();
    const supabase = createSupabaseBrowserClient();
    const [activeTab, setActiveTab] = useState<Tab>("projects");

    const [projects, setProjects] = useState<Project[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);
    const [toast, setToast] = useState<Toast>(null);
    const [userEmail, setUserEmail] = useState("");

    // Messages state
    const [messages, setMessages] = useState<Message[]>([]);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [deletingMsgId, setDeletingMsgId] = useState<string | null>(null);

    const showToast = (type: "success" | "error", message: string) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3500);
    };

    const fetchProjects = useCallback(async () => {
        setLoadingProjects(true);
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });
        if (!error && data) setProjects(data);
        setLoadingProjects(false);
    }, [supabase]);

    const fetchMessages = useCallback(async () => {
        setLoadingMessages(true);
        const { data, error } = await supabase
            .from("contact_messages")
            .select("*")
            .order("created_at", { ascending: false });
        if (!error && data) setMessages(data);
        setLoadingMessages(false);
    }, [supabase]);

    useEffect(() => {
        fetchProjects();
        fetchMessages();
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) setUserEmail(data.user.email ?? "");
        });
    }, [fetchProjects, fetchMessages, supabase]);

    async function handleLogout() {
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    }

    async function handleAddProject(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        const payload = {
            title: form.title,
            short_desc: form.short_desc,
            full_desc: form.full_desc,
            category: form.category,
            tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
            emoji: form.emoji,
            gradient: form.gradient,
            year: form.year,
            duration: form.duration,
            role: form.role,
            live: form.live || "#",
            github: form.github || "#",
            features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
        };

        const { error } = await supabase.from("projects").insert([payload]);

        if (error) {
            showToast("error", error.message);
        } else {
            showToast("success", "Project added! Toggle ⭐ to show it on the landing page.");
            setForm(EMPTY_FORM);
            setShowForm(false);
            fetchProjects();
        }
        setSaving(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this project?")) return;
        setDeletingId(id);
        const { error } = await supabase.from("projects").delete().eq("id", id);
        if (error) {
            showToast("error", error.message);
        } else {
            showToast("success", "Project deleted.");
            setProjects((prev) => prev.filter((p) => p.id !== id));
        }
        setDeletingId(null);
    }

    async function handleToggleFeatured(project: Project) {
        setTogglingId(project.id);
        const { error } = await supabase
            .from("projects")
            .update({ featured: !project.featured })
            .eq("id", project.id);
        if (error) {
            showToast("error", error.message);
        } else {
            setProjects((prev) =>
                prev.map((p) =>
                    p.id === project.id ? { ...p, featured: !p.featured } : p
                )
            );
            showToast(
                "success",
                !project.featured
                    ? "⭐ Added to landing page!"
                    : "Removed from landing page."
            );
        }
        setTogglingId(null);
    }

    async function handleDeleteMessage(id: string) {
        if (!confirm("Delete this message?")) return;
        setDeletingMsgId(id);
        const { error } = await supabase.from("contact_messages").delete().eq("id", id);
        if (!error) setMessages((prev) => prev.filter((m) => m.id !== id));
        else showToast("error", "Failed to delete message.");
        setDeletingMsgId(null);
    }

    const inputClass =
        "w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200";
    const inputStyle = {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
    };

    return (
        <div
            className="min-h-screen"
            style={{ background: "linear-gradient(135deg, #0a0a12 0%, #0f0f1e 50%, #0a0a12 100%)" }}
        >
            {/* Top glow */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)",
                }}
            />

            {/* Toast */}
            {toast && (
                <div
                    className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium shadow-2xl"
                    style={{
                        background:
                            toast.type === "success"
                                ? "rgba(16,185,129,0.15)"
                                : "rgba(239,68,68,0.15)",
                        border: `1px solid ${toast.type === "success" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                        color: toast.type === "success" ? "#6ee7b7" : "#fca5a5",
                        backdropFilter: "blur(16px)",
                    }}
                >
                    {toast.type === "success" ? (
                        <CheckCircle size={16} />
                    ) : (
                        <AlertCircle size={16} />
                    )}
                    {toast.message}
                </div>
            )}

            <div className="max-w-5xl mx-auto px-4 py-10 relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Layers size={16} className="text-violet-400" />
                            <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                                Portfolio Admin
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
                        {userEmail && (
                            <p className="text-sm text-white/30 mt-1">{userEmail}</p>
                        )}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white transition-all duration-200"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        <LogOut size={15} />
                        Logout
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-1 p-1 rounded-xl mb-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    {([
                        { id: "projects", label: "Projects", icon: <FolderOpen size={14} />, count: projects.length },
                        { id: "messages", label: "Messages", icon: <Inbox size={14} />, count: messages.length },
                    ] as const).map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                            style={activeTab === tab.id ? {
                                background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
                                color: "#fff",
                                boxShadow: "0 0 20px rgba(139,92,246,0.3)",
                            } : {
                                color: "rgba(255,255,255,0.4)",
                            }}
                        >
                            {tab.icon}
                            {tab.label}
                            <span
                                className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                                style={{
                                    background: activeTab === tab.id ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
                                }}
                            >
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* ── MESSAGES TAB ── */}
                {activeTab === "messages" && (
                    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        {/* Header */}
                        <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                            <Mail size={16} className="text-violet-400" />
                            <span className="text-sm font-semibold text-white">Contact Form Submissions</span>
                            <span className="ml-auto text-xs text-white/30">{messages.length} message{messages.length !== 1 ? "s" : ""}</span>
                        </div>

                        {loadingMessages ? (
                            <div className="flex items-center justify-center py-16 gap-3 text-white/30">
                                <Loader2 size={18} className="animate-spin" />
                                <span className="text-sm">Loading messages…</span>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 gap-3">
                                <div className="text-4xl">📭</div>
                                <p className="text-sm text-white/30">No messages yet.</p>
                            </div>
                        ) : (
                            <div>
                                {messages.map((msg, i) => (
                                    <div
                                        key={msg.id}
                                        className="px-6 py-5"
                                        style={{ borderBottom: i < messages.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="font-semibold text-white text-sm">{msg.name}</span>
                                                    <a
                                                        href={`mailto:${msg.email}`}
                                                        className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                                                    >
                                                        {msg.email}
                                                    </a>
                                                    <span className="ml-auto text-[10px] text-white/25 font-mono">
                                                        {new Date(msg.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-white/55 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                            </div>
                                            <div className="flex gap-2 flex-shrink-0">
                                                <a
                                                    href={`mailto:${msg.email}?subject=Re: Your message&body=Hi ${msg.name},`}
                                                    className="p-2 rounded-lg text-white/30 hover:text-violet-400 transition-colors"
                                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                                                    title="Reply"
                                                >
                                                    <Mail size={13} />
                                                </a>
                                                <button
                                                    onClick={() => handleDeleteMessage(msg.id)}
                                                    disabled={deletingMsgId === msg.id}
                                                    className="p-2 rounded-lg text-red-400/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                                                    title="Delete"
                                                >
                                                    {deletingMsgId === msg.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── PROJECTS TAB ── */}
                {activeTab === "projects" && (
                    <>
                        <div className="mb-6">
                            <button
                                onClick={() => setShowForm((v) => !v)}
                                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                                style={{
                                    background: showForm
                                        ? "rgba(139,92,246,0.2)"
                                        : "linear-gradient(135deg, #8B5CF6, #6D28D9)",
                                    border: "1px solid rgba(139,92,246,0.4)",
                                    boxShadow: showForm ? "none" : "0 0 25px rgba(139,92,246,0.25)",
                                }}
                            >
                                {showForm ? <X size={15} /> : <Plus size={15} />}
                                {showForm ? "Cancel" : "Add New Project"}
                            </button>
                        </div>

                        {/* Add Project Form */}
                        {showForm && (
                            <div
                                className="rounded-2xl p-8 mb-8"
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(139,92,246,0.2)",
                                    backdropFilter: "blur(20px)",
                                }}
                            >
                                <h2 className="text-lg font-bold text-white mb-6">New Project</h2>
                                <form onSubmit={handleAddProject} className="space-y-5">
                                    {/* Row 1: Title + Emoji */}
                                    <div className="grid grid-cols-[1fr_auto] gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                                Title *
                                            </label>
                                            <input
                                                required
                                                className={inputClass}
                                                style={inputStyle}
                                                placeholder="My Awesome Project"
                                                value={form.title}
                                                onChange={(e) =>
                                                    setForm({ ...form, title: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                                Emoji
                                            </label>
                                            <input
                                                className="w-20 px-3 py-2.5 rounded-xl text-2xl text-center outline-none transition-all duration-200"
                                                style={inputStyle}
                                                value={form.emoji}
                                                onChange={(e) =>
                                                    setForm({ ...form, emoji: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* Short Desc */}
                                    <div>
                                        <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                            Short Description *
                                        </label>
                                        <input
                                            required
                                            className={inputClass}
                                            style={inputStyle}
                                            placeholder="One-line description shown on project cards"
                                            value={form.short_desc}
                                            onChange={(e) =>
                                                setForm({ ...form, short_desc: e.target.value })
                                            }
                                        />
                                    </div>

                                    {/* Full Desc */}
                                    <div>
                                        <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                            Full Description
                                        </label>
                                        <textarea
                                            rows={3}
                                            className={inputClass + " resize-none"}
                                            style={inputStyle}
                                            placeholder="Detailed project description for the project page"
                                            value={form.full_desc}
                                            onChange={(e) =>
                                                setForm({ ...form, full_desc: e.target.value })
                                            }
                                        />
                                    </div>

                                    {/* Row 3: Category + Year + Duration */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                                Category
                                            </label>
                                            <div className="relative">
                                                <select
                                                    className={inputClass + " appearance-none pr-8 cursor-pointer"}
                                                    style={inputStyle}
                                                    value={form.category}
                                                    onChange={(e) =>
                                                        setForm({ ...form, category: e.target.value })
                                                    }
                                                >
                                                    {CATEGORY_OPTIONS.map((c) => (
                                                        <option key={c} value={c} style={{ background: "#1a1a2e" }}>
                                                            {c}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown
                                                    size={13}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                                Year
                                            </label>
                                            <input
                                                className={inputClass}
                                                style={inputStyle}
                                                placeholder="2025"
                                                value={form.year}
                                                onChange={(e) =>
                                                    setForm({ ...form, year: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                                Duration
                                            </label>
                                            <input
                                                className={inputClass}
                                                style={inputStyle}
                                                placeholder="4 weeks"
                                                value={form.duration}
                                                onChange={(e) =>
                                                    setForm({ ...form, duration: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* Row 4: Role + Gradient */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                                Your Role
                                            </label>
                                            <input
                                                className={inputClass}
                                                style={inputStyle}
                                                placeholder="Full Stack Developer"
                                                value={form.role}
                                                onChange={(e) =>
                                                    setForm({ ...form, role: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                                Card Gradient
                                            </label>
                                            <div className="relative">
                                                <select
                                                    className={inputClass + " appearance-none pr-8 cursor-pointer"}
                                                    style={inputStyle}
                                                    value={form.gradient}
                                                    onChange={(e) =>
                                                        setForm({ ...form, gradient: e.target.value })
                                                    }
                                                >
                                                    {GRADIENT_OPTIONS.map((g) => (
                                                        <option key={g.value} value={g.value} style={{ background: "#1a1a2e" }}>
                                                            {g.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown
                                                    size={13}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                            Tech Tags{" "}
                                            <span className="normal-case font-normal text-white/25">
                                                (comma-separated)
                                            </span>
                                        </label>
                                        <input
                                            className={inputClass}
                                            style={inputStyle}
                                            placeholder="Next.js, TypeScript, Supabase, Tailwind CSS"
                                            value={form.tags}
                                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                                        />
                                    </div>

                                    {/* Features */}
                                    <div>
                                        <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                            Key Features{" "}
                                            <span className="normal-case font-normal text-white/25">
                                                (one per line)
                                            </span>
                                        </label>
                                        <textarea
                                            rows={4}
                                            className={inputClass + " resize-none"}
                                            style={inputStyle}
                                            placeholder={"Real-time dashboard\nUser authentication\nEmail notifications"}
                                            value={form.features}
                                            onChange={(e) =>
                                                setForm({ ...form, features: e.target.value })
                                            }
                                        />
                                    </div>

                                    {/* Row: Links */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                                Live URL
                                            </label>
                                            <input
                                                className={inputClass}
                                                style={inputStyle}
                                                placeholder="https://example.com"
                                                value={form.live}
                                                onChange={(e) =>
                                                    setForm({ ...form, live: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                                GitHub URL
                                            </label>
                                            <input
                                                className={inputClass}
                                                style={inputStyle}
                                                placeholder="https://github.com/..."
                                                value={form.github}
                                                onChange={(e) =>
                                                    setForm({ ...form, github: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* Gradient Preview */}
                                    <div
                                        className={`h-16 rounded-xl bg-gradient-to-br ${form.gradient} flex items-center justify-center text-3xl`}
                                        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                                    >
                                        {form.emoji}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 pt-2">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60"
                                            style={{
                                                background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
                                                boxShadow: "0 0 20px rgba(139,92,246,0.3)",
                                            }}
                                        >
                                            {saving ? (
                                                <Loader2 size={14} className="animate-spin" />
                                            ) : (
                                                <Plus size={14} />
                                            )}
                                            {saving ? "Saving…" : "Save Project"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
                                            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white transition-colors"
                                            style={{
                                                background: "rgba(255,255,255,0.05)",
                                                border: "1px solid rgba(255,255,255,0.08)",
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Project List */}
                        <div
                            className="rounded-2xl overflow-hidden"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)",
                            }}
                        >
                            {/* Table header */}
                            <div
                                className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/30"
                                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                            >
                                <span className="w-10 text-center">Icon</span>
                                <span>Project</span>
                                <span>Category</span>
                                <span>Year</span>
                                <span title="Show on landing page">Featured</span>
                                <span>Delete</span>
                            </div>

                            {loadingProjects ? (
                                <div className="flex items-center justify-center py-16 gap-3 text-white/30">
                                    <Loader2 size={18} className="animate-spin" />
                                    <span className="text-sm">Loading projects…</span>
                                </div>
                            ) : projects.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 gap-3">
                                    <div className="text-4xl">📂</div>
                                    <p className="text-sm text-white/30">No projects yet. Add your first one!</p>
                                </div>
                            ) : (
                                <div>
                                    {projects.map((project, i) => (
                                        <div
                                            key={project.id}
                                            className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 items-center px-6 py-4 hover:bg-white/[0.025] transition-colors duration-150"
                                            style={{
                                                borderBottom:
                                                    i < projects.length - 1
                                                        ? "1px solid rgba(255,255,255,0.04)"
                                                        : "none",
                                            }}
                                        >
                                            {/* Emoji */}
                                            <div
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${project.gradient}`}
                                            >
                                                {project.emoji}
                                            </div>

                                            {/* Title + desc */}
                                            <div>
                                                <p className="text-sm font-semibold text-white leading-tight">
                                                    {project.title}
                                                </p>
                                                <p className="text-xs text-white/35 mt-0.5 line-clamp-1">
                                                    {project.short_desc}
                                                </p>
                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-1 mt-1.5">
                                                    {project.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-0.5 text-[10px] rounded-full"
                                                            style={{
                                                                background: "rgba(139,92,246,0.12)",
                                                                border: "1px solid rgba(139,92,246,0.2)",
                                                                color: "rgba(196,181,253,0.8)",
                                                            }}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Category */}
                                            <span className="text-xs text-white/40 px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                                                {project.category}
                                            </span>

                                            {/* Year */}
                                            <span className="text-xs text-white/35 font-mono w-10 text-center">
                                                {project.year}
                                            </span>

                                            {/* Featured toggle */}
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => handleToggleFeatured(project)}
                                                    disabled={togglingId === project.id}
                                                    title={project.featured ? "Remove from landing page" : "Show on landing page"}
                                                    className="p-2 rounded-xl transition-all duration-200 disabled:opacity-40"
                                                    style={{
                                                        background: project.featured
                                                            ? "rgba(234,179,8,0.15)"
                                                            : "rgba(255,255,255,0.04)",
                                                        border: `1px solid ${project.featured ? "rgba(234,179,8,0.4)" : "rgba(255,255,255,0.08)"}`,
                                                        color: project.featured ? "#fbbf24" : "rgba(255,255,255,0.2)",
                                                        boxShadow: project.featured ? "0 0 12px rgba(234,179,8,0.2)" : "none",
                                                    }}
                                                >
                                                    {togglingId === project.id ? (
                                                        <Loader2 size={14} className="animate-spin" />
                                                    ) : (
                                                        <span className="text-sm leading-none">⭐</span>
                                                    )}
                                                </button>
                                            </div>

                                            {/* Delete */}
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                disabled={deletingId === project.id}
                                                className="p-1.5 rounded-lg text-red-400/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-40"
                                            >
                                                {deletingId === project.id ? (
                                                    <Loader2 size={13} className="animate-spin" />
                                                ) : (
                                                    <Trash2 size={13} />
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <p className="text-center text-xs text-white/15 mt-8">
                            {projects.length} project{projects.length !== 1 ? "s" : ""} in your portfolio
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
