"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
}

const COLORS = ["#8B5CF6", "#3B82F6", "#06B6D4", "#A78BFA"];

export default function HeroCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Init particles
        const count = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 8000));
        particlesRef.current = Array.from({ length: count }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            z: Math.random(),
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.6 + 0.1,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
        }));

        let time = 0;

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);
            time += 0.005;

            const particles = particlesRef.current;

            // Draw connection lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw and move particles
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                // Pulse
                const pulse = Math.sin(time * 2 + p.z * 6) * 0.3 + 0.7;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity * pulse;
                ctx.fill();
                ctx.globalAlpha = 1;

                // Glow halo
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
                grad.addColorStop(0, p.color.replace(")", `,${p.opacity * 0.3})`).replace("rgb", "rgba"));
                grad.addColorStop(1, "transparent");
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            });

            // Draw 3 slow-rotating geometric rings via ellipses
            const cx = w / 2;
            const cy = h / 2;

            // Ring 1 — purple torus silhouette
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(time * 0.3);
            ctx.beginPath();
            ctx.ellipse(0, 0, Math.min(w, h) * 0.32, Math.min(w, h) * 0.12, 0, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(139,92,246,0.12)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();

            // Ring 2 — blue torus silhouette different tilt
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(-time * 0.18);
            ctx.beginPath();
            ctx.ellipse(0, 0, Math.min(w, h) * 0.44, Math.min(w, h) * 0.08, 0.4, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(59,130,246,0.09)";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();

            // Ring 3 — cyan
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(time * 0.12);
            ctx.beginPath();
            ctx.ellipse(0, 0, Math.min(w, h) * 0.55, Math.min(w, h) * 0.06, -0.3, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(6,182,212,0.07)";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();

            // Central glow orb
            const orbGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.18);
            const pulse = Math.sin(time * 1.5) * 0.04 + 0.12;
            orbGrad.addColorStop(0, `rgba(139,92,246,${pulse})`);
            orbGrad.addColorStop(0.5, `rgba(59,130,246,${pulse * 0.4})`);
            orbGrad.addColorStop(1, "transparent");
            ctx.beginPath();
            ctx.arc(cx, cy, Math.min(w, h) * 0.18, 0, Math.PI * 2);
            ctx.fillStyle = orbGrad;
            ctx.fill();

            animRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: 0.85 }}
        />
    );
}
