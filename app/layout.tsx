import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
    title: "Gopal Krishn Sahu | Full Stack Developer — Web Apps, Dashboards & AI Tools",
    description:
        "Freelance Full Stack Developer specializing in scalable web applications, admin dashboards, and SaaS MVPs. Available for hire. Let's build something great together.",
    keywords: [
        "Full Stack Developer",
        "Next.js Developer",
        "React Developer",
        "Freelance Web Developer India",
        "SaaS Developer",
        "Dashboard Developer",
        "Gopal Krishn Sahu",
    ],
    authors: [{ name: "Gopal Krishn Sahu" }],
    creator: "Gopal Krishn Sahu",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://gopalsahu.dev",
        title: "Gopal Krishn Sahu | Full Stack Developer",
        description:
            "Building scalable digital products — Web Apps, Admin Dashboards, and AI Tools. Available for freelance work.",
        siteName: "Gopal Krishn Sahu Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gopal Krishn Sahu | Full Stack Developer",
        description: "Building scalable digital products — Web Apps, Dashboards & AI Tools.",
        creator: "@gopalsahu",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className="bg-background text-white antialiased">
                <CustomCursor />
                <ScrollProgress />
                {children}
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            background: "#1a1a2e",
                            color: "#F8F8FF",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                            fontSize: "14px",
                        },
                        success: {
                            iconTheme: { primary: "#8B5CF6", secondary: "#fff" },
                        },
                        error: {
                            iconTheme: { primary: "#ef4444", secondary: "#fff" },
                        },
                    }}
                />
            </body>
        </html>
    );
}
