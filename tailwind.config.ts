import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-outfit)", "sans-serif"],
                mono: ["var(--font-inter)", "monospace"],
            },
            colors: {
                background: "#0B0B0F",
                surface: "#111118",
                "surface-2": "#1a1a2e",
                brand: {
                    purple: "#8B5CF6",
                    blue: "#3B82F6",
                    cyan: "#06B6D4",
                },
                glass: "rgba(255,255,255,0.04)",
                "glass-border": "rgba(255,255,255,0.08)",
            },
            backgroundImage: {
                "gradient-brand":
                    "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)",
                "gradient-hero":
                    "radial-gradient(ellipse at top, rgba(139,92,246,0.15) 0%, rgba(11,11,15,0) 70%)",
                "gradient-card":
                    "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                "float-delayed": "float 8s ease-in-out 2s infinite",
                "float-slow": "float 10s ease-in-out 4s infinite",
                "glow-pulse": "glowPulse 3s ease-in-out infinite",
                "gradient-shift": "gradientShift 8s ease infinite",
                "spin-slow": "spin 20s linear infinite",
                "fade-in": "fadeIn 0.6s ease forwards",
                "slide-up": "slideUp 0.6s ease forwards",
                typing: "typing 3.5s steps(40, end)",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                    "50%": { transform: "translateY(-20px) rotate(3deg)" },
                },
                glowPulse: {
                    "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
                    "50%": { opacity: "0.8", transform: "scale(1.05)" },
                },
                gradientShift: {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                fadeIn: {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                slideUp: {
                    from: { opacity: "0", transform: "translateY(30px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                typing: {
                    from: { width: "0" },
                    to: { width: "100%" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
            borderRadius: {
                "2xl": "1rem",
                "3xl": "1.5rem",
                "4xl": "2rem",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
