import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

const SITE_URL = "https://gopalsahu.vercel.app";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default:
            "Gopal Krishn Sahu | Freelance Full Stack Developer — Next.js, React & Supabase",
        template: "%s | Gopal Krishn Sahu",
    },
    description:
        "Hire Gopal Krishn Sahu — Freelance Full Stack Developer from India specializing in Next.js, React, TypeScript, Supabase & Tailwind CSS. No upfront cost. Fast delivery. Web apps, dashboards & SaaS MVPs.",
    keywords: [
        "Freelance Full Stack Developer India",
        "Hire Next.js Developer",
        "React Developer for hire",
        "SaaS Developer India",
        "Admin Dashboard Developer",
        "Next.js Freelancer",
        "TypeScript Developer",
        "Supabase Developer",
        "Web App Developer India",
        "No upfront cost web developer",
        "Affordable web developer",
        "Full Stack Developer remote",
        "Gopal Krishn Sahu",
        "Portfolio Gopal Sahu",
        "Buy web app from developer India",
    ],
    authors: [{ name: "Gopal Krishn Sahu", url: SITE_URL }],
    creator: "Gopal Krishn Sahu",
    publisher: "Gopal Krishn Sahu",
    category: "Technology",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: SITE_URL,
        title:
            "Gopal Krishn Sahu | Freelance Full Stack Developer — No Upfront Cost",
        description:
            "Full Stack Developer building scalable web apps, dashboards & SaaS MVPs. No upfront payment. Fast delivery. Let's build something great.",
        siteName: "Gopal Krishn Sahu Portfolio",
        images: [
            {
                url: `${SITE_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "Gopal Krishn Sahu — Freelance Full Stack Developer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Gopal Krishn Sahu | Freelance Full Stack Developer",
        description:
            "Building web apps, dashboards & SaaS MVPs. No upfront cost. Fast delivery. Available for freelance work.",
        creator: "@gopalsahu",
        images: [`${SITE_URL}/og-image.png`],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: SITE_URL,
    },
    verification: {
        google: "add-your-google-search-console-token-here",
    },
};

// JSON-LD Structured Data — helps Google understand who you are
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gopal Krishn Sahu",
    url: SITE_URL,
    email: "gopalsahu1699@gmail.com",
    jobTitle: "Freelance Full Stack Developer",
    description:
        "Freelance Full Stack Developer from India specializing in Next.js, React, TypeScript, Supabase. No upfront cost. Fast delivery.",
    knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
        "Full Stack Development",
        "SaaS Development",
        "Admin Dashboard",
    ],
    sameAs: [
        "https://github.com/gopalsahu1699",
        "https://linkedin.com/in/gopalsahu",
    ],
    address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
    },
    offers: {
        "@type": "Offer",
        description: "Freelance Full Stack Web Development — No upfront payment required",
        price: "0",
        priceCurrency: "USD",
        priceSpecification: {
            "@type": "UnitPriceSpecification",
            description: "Pay only after first milestone delivery",
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
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
