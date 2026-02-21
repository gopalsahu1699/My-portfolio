"use client";

import { Github, Linkedin, Twitter, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-glass-border py-10 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-sm text-white/30">
                    <span>Built with</span>
                    <Heart size={12} className="text-brand-purple fill-brand-purple" />
                    <span>by</span>
                    <span className="gradient-text font-semibold">Gopal Krishn Sahu</span>
                </div>
                <div className="flex items-center gap-4">
                    {[
                        { icon: Github, href: "https://github.com/gopalsahu1699" },
                        { icon: Linkedin, href: "https://linkedin.com/in/gopalsahu" },
                        { icon: Twitter, href: "https://twitter.com/gopalsahu" },
                    ].map(({ icon: Icon, href }, i) => (
                        <a
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/30 hover:text-white/80 transition-colors duration-200"
                        >
                            <Icon size={16} />
                        </a>
                    ))}
                </div>
                <p className="text-xs text-white/20">
                    © {new Date().getFullYear()} All rights reserved.
                </p>
            </div>
        </footer>
    );
}
