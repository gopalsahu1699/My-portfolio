"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[9997] h-[2px] bg-transparent">
            <div
                className="h-full transition-none"
                style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4)",
                    boxShadow: "0 0 10px rgba(139,92,246,0.8)",
                }}
            />
        </div>
    );
}
