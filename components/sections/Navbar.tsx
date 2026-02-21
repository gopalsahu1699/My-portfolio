"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-[9990] transition-all duration-500",
                scrolled
                    ? "py-3 glass border-b border-glass-border"
                    : "py-5 bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="font-bold text-xl tracking-tight">
                    <span className="gradient-text">GKS</span>
                    <span className="text-white/40">.</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                <div className="hidden md:block">
                    <MagneticButton href="#contact" variant="primary" className="text-xs px-6 py-2.5">
                        Hire Me
                    </MagneticButton>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white/70 hover:text-white"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden glass border-t border-glass-border mt-2 px-6 py-4 flex flex-col gap-4">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="text-white/70 hover:text-white text-base transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <MagneticButton href="#contact" variant="primary" className="text-sm w-fit">
                        Hire Me
                    </MagneticButton>
                </div>
            )}
        </header>
    );
}
