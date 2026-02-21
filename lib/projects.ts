export type Category = "All" | "Web App" | "Dashboard" | "SaaS" | "Landing Page";

export interface Project {
    id: string;
    title: string;
    shortDesc: string;
    fullDesc: string;
    category: Category;
    tags: string[];
    emoji: string;
    gradient: string;
    year: string;
    duration: string;
    role: string;
    live: string;
    github: string;
    features: string[];
    highlights: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
    {
        id: "ai-marketing-dashboard",
        title: "AI Marketing Dashboard",
        shortDesc: "Intelligent analytics platform powered by OpenAI with real-time campaign tracking.",
        fullDesc:
            "A full-featured AI marketing analytics platform that connects to multiple ad networks and uses OpenAI to generate campaign insights. Built with real-time data pipelines, audience segmentation, conversion funnel visualization, and predictive analytics. Allows marketers to chat with their data using a natural language interface.",
        category: "Dashboard",
        tags: ["Next.js 14", "OpenAI API", "Supabase", "Recharts", "Tailwind CSS", "TypeScript"],
        emoji: "🤖",
        gradient: "from-violet-600/40 via-purple-600/25 to-blue-600/15",
        year: "2025",
        duration: "6 weeks",
        role: "Full Stack Developer",
        live: "#",
        github: "#",
        features: [
            "AI-powered insights via OpenAI GPT-4",
            "Real-time campaign metrics & KPIs",
            "Audience segmentation with visual charts",
            "Predictive ROAS & conversion forecasting",
            "Multi-channel ad network integration",
            "Role-based access control",
        ],
        highlights: [
            { label: "Users", value: "500+" },
            { label: "Data Points", value: "1M+/day" },
            { label: "Latency", value: "<200ms" },
        ],
    },
    {
        id: "lead-management-crm",
        title: "Lead Management CRM",
        shortDesc: "Full-featured CRM with pipelines, activity logs, and real-time collaboration.",
        fullDesc:
            "A production CRM built for growing sales teams. Features drag-and-drop pipeline management, lead scoring, automated follow-up reminders, email thread tracking, file attachments, and a team collaboration hub. Includes a fully functional analytics module tracking conversion rates, velocity, and rep performance.",
        category: "SaaS",
        tags: ["React", "TypeScript", "Supabase", "Shadcn/ui", "GSAP", "Zod", "Recharts"],
        emoji: "📊",
        gradient: "from-blue-600/40 via-cyan-600/25 to-teal-600/15",
        year: "2025",
        duration: "8 weeks",
        role: "Full Stack Developer",
        live: "#",
        github: "#",
        features: [
            "Drag-and-drop kanban pipeline",
            "Lead scoring algorithm",
            "Email thread tracking & logging",
            "Automated follow-up reminders",
            "Team collaboration & @mentions",
            "Export to CSV / PDF reports",
        ],
        highlights: [
            { label: "Leads Managed", value: "10K+" },
            { label: "Uptime", value: "99.9%" },
            { label: "Integrations", value: "8+" },
        ],
    },
    {
        id: "business-landing-builder",
        title: "Business Landing Page Builder",
        shortDesc: "Drag-and-drop landing builder for non-technical users with one-click deployment.",
        fullDesc:
            "A no-code landing page builder targeting small business owners. Users pick from premium block templates, customize colors and content via a live editor, then deploy to a custom subdomain in one click. Includes built-in analytics, A/B testing, and form capture with Supabase.",
        category: "SaaS",
        tags: ["Next.js 14", "Framer Motion", "Shadcn/ui", "Tailwind", "Supabase", "Vercel"],
        emoji: "🚀",
        gradient: "from-cyan-600/40 via-teal-600/25 to-emerald-600/15",
        year: "2025",
        duration: "5 weeks",
        role: "Full Stack Developer",
        live: "#",
        github: "#",
        features: [
            "Drag-and-drop block editor",
            "Live real-time preview",
            "One-click subdomain deployment",
            "Built-in A/B testing",
            "Form capture & lead export",
            "Custom domain support",
        ],
        highlights: [
            { label: "Pages Built", value: "200+" },
            { label: "Conversion Lift", value: "+34%" },
            { label: "Deploy Time", value: "<30s" },
        ],
    },
    {
        id: "saas-auth-boilerplate",
        title: "SaaS Auth Boilerplate",
        shortDesc: "Production-ready Next.js starter with auth, billing, onboarding, and team management.",
        fullDesc:
            "A battle-tested SaaS starter kit built on Next.js 14 App Router, Supabase Auth, Stripe billing, and Shadcn/ui. Includes multi-tenant team management, role-based permissions, onboarding flow, email transactional workflows, and a fully designed settings panel.",
        category: "SaaS",
        tags: ["Next.js 14", "Supabase Auth", "Stripe", "Prisma", "Resend", "Shadcn/ui"],
        emoji: "🔐",
        gradient: "from-orange-600/40 via-amber-600/25 to-yellow-600/15",
        year: "2024",
        duration: "10 weeks",
        role: "Full Stack Developer",
        live: "#",
        github: "#",
        features: [
            "Supabase Auth (OTP, OAuth, Magic Link)",
            "Stripe subscription billing",
            "Multi-tenant team workspaces",
            "Role-based access (Admin/Member/Viewer)",
            "Onboarding wizard flow",
            "Transactional email with Resend",
        ],
        highlights: [
            { label: "Stars", value: "120+" },
            { label: "Forks", value: "40+" },
            { label: "Auth Strategies", value: "5" },
        ],
    },
    {
        id: "ecommerce-admin-panel",
        title: "E-Commerce Admin Panel",
        shortDesc: "Comprehensive online store management dashboard with inventory, orders, and analytics.",
        fullDesc:
            "A feature-rich admin panel for managing an online store. Handles product catalog management with variant support, real-time order tracking, inventory level alerts, customer profiles, and a revenue analytics module. Includes a promotion and coupon engine with automated discount scheduling.",
        category: "Dashboard",
        tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind", "Recharts"],
        emoji: "🛍️",
        gradient: "from-pink-600/40 via-rose-600/25 to-red-600/15",
        year: "2024",
        duration: "7 weeks",
        role: "Full Stack Developer",
        live: "#",
        github: "#",
        features: [
            "Product catalog with infinite variants",
            "Real-time order management",
            "Inventory tracking & low-stock alerts",
            "Customer segmentation & profiles",
            "Coupon & promotion engine",
            "Revenue analytics & export",
        ],
        highlights: [
            { label: "Products Managed", value: "5K+" },
            { label: "Order Velocity", value: "300/day" },
            { label: "Modules", value: "12" },
        ],
    },
    {
        id: "restaurant-web-app",
        title: "Restaurant Web App",
        shortDesc: "Modern restaurant website with online menu, table reservation, and order tracking.",
        fullDesc:
            "A complete restaurant digital presence — a stunning marketing website paired with an online ordering system. Customers can browse the interactive menu, reserve tables, place takeaway orders, and track delivery in real time. The restaurant owner manages everything from a lightweight admin panel.",
        category: "Web App",
        tags: ["Next.js", "Tailwind CSS", "Supabase", "Framer Motion", "Stripe"],
        emoji: "🍽️",
        gradient: "from-red-600/40 via-orange-600/25 to-amber-600/15",
        year: "2024",
        duration: "4 weeks",
        role: "Full Stack Developer",
        live: "#",
        github: "#",
        features: [
            "Interactive animated menu",
            "Table reservation system",
            "Online ordering & Stripe payment",
            "Real-time order status tracking",
            "Owner admin dashboard",
            "SEO-optimized marketing pages",
        ],
        highlights: [
            { label: "Orders Processed", value: "1K+" },
            { label: "Avg. Page Load", value: "0.8s" },
            { label: "Lighthouse Score", value: "98" },
        ],
    },
    {
        id: "hr-management-system",
        title: "HR Management System",
        shortDesc: "Internal HR platform for employee profiles, leave, payroll summary, and performance reviews.",
        fullDesc:
            "An enterprise-grade internal HR tool for mid-size companies. Manages full employee lifecycle — onboarding, leave requests and approvals, payroll summary views, performance review cycles, and org chart visualization. Role-based access restricts sensitive data to HR admins only.",
        category: "Web App",
        tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind"],
        emoji: "👥",
        gradient: "from-indigo-600/40 via-blue-600/25 to-violet-600/15",
        year: "2024",
        duration: "9 weeks",
        role: "Full Stack Developer",
        live: "#",
        github: "#",
        features: [
            "Employee profile & document management",
            "Leave request & approval workflow",
            "Payroll summary dashboard",
            "Performance review cycles",
            "Org chart with hierarchy view",
            "Role-based permissions (RBAC)",
        ],
        highlights: [
            { label: "Employees", value: "200+" },
            { label: "Modules", value: "9" },
            { label: "Data Security", value: "RBAC" },
        ],
    },
    {
        id: "agency-landing-page",
        title: "Creative Agency Landing Page",
        shortDesc: "Award-worthy agency marketing site with GSAP animations and scroll storytelling.",
        fullDesc:
            "A visually stunning marketing website for a creative digital agency. Features GSAP-powered scroll-triggered animations, horizontal scroll sections, interactive team profiles, case study modals, and a custom cursor. Achieves a perfect Lighthouse score with Next.js static export.",
        category: "Landing Page",
        tags: ["Next.js", "GSAP", "ScrollTrigger", "Tailwind CSS", "TypeScript", "Framer Motion"],
        emoji: "🎨",
        gradient: "from-fuchsia-600/40 via-purple-600/25 to-pink-600/15",
        year: "2025",
        duration: "3 weeks",
        role: "Frontend Developer",
        live: "#",
        github: "#",
        features: [
            "GSAP scroll-triggered animations",
            "Horizontal scroll case study section",
            "Custom cursor & magnetic elements",
            "Interactive team profiles",
            "Case study modals",
            "Static export — zero server cost",
        ],
        highlights: [
            { label: "Lighthouse", value: "100" },
            { label: "Animations", value: "40+" },
            { label: "Load Time", value: "0.6s" },
        ],
    },
];

export const CATEGORIES: Category[] = ["All", "Web App", "Dashboard", "SaaS", "Landing Page"];
