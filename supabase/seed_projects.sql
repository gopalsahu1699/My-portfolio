-- ─── Seed Portfolio Projects ──────────────────────────────────────────────────
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- Safe to re-run: truncates then re-inserts (no duplicates)
-- ─────────────────────────────────────────────────────────────────────────────

-- Clear existing projects before re-seeding (comment this out to keep existing data)
TRUNCATE TABLE projects RESTART IDENTITY;

INSERT INTO projects (title, short_desc, full_desc, category, tags, emoji, gradient, year, duration, role, live, github, features, featured)
VALUES

(
  'AI Marketing Dashboard',
  'Intelligent analytics platform powered by OpenAI with real-time campaign tracking.',
  'A full-featured AI marketing analytics platform that connects to multiple ad networks and uses OpenAI to generate campaign insights. Built with real-time data pipelines, audience segmentation, conversion funnel visualization, and predictive analytics. Allows marketers to chat with their data using a natural language interface.',
  'Dashboard',
  ARRAY['Next.js 14', 'OpenAI API', 'Supabase', 'Recharts', 'Tailwind CSS', 'TypeScript'],
  '🤖', 'from-violet-600/40 via-purple-600/25 to-blue-600/15',
  '2025', '6 weeks', 'Full Stack Developer', '#', '#',
  ARRAY['AI-powered insights via OpenAI GPT-4', 'Real-time campaign metrics & KPIs', 'Audience segmentation with visual charts', 'Predictive ROAS & conversion forecasting', 'Multi-channel ad network integration', 'Role-based access control'],
  true  -- ⭐ show on landing page
),

(
  'Lead Management CRM',
  'Full-featured CRM with pipelines, activity logs, and real-time collaboration.',
  'A production CRM built for growing sales teams. Features drag-and-drop pipeline management, lead scoring, automated follow-up reminders, email thread tracking, file attachments, and a team collaboration hub. Includes a fully functional analytics module tracking conversion rates, velocity, and rep performance.',
  'SaaS',
  ARRAY['React', 'TypeScript', 'Supabase', 'Shadcn/ui', 'GSAP', 'Zod', 'Recharts'],
  '📊', 'from-blue-600/40 via-cyan-600/25 to-teal-600/15',
  '2025', '8 weeks', 'Full Stack Developer', '#', '#',
  ARRAY['Drag-and-drop kanban pipeline', 'Lead scoring algorithm', 'Email thread tracking & logging', 'Automated follow-up reminders', 'Team collaboration & @mentions', 'Export to CSV / PDF reports'],
  true  -- ⭐ show on landing page
),

(
  'Business Landing Page Builder',
  'Drag-and-drop landing builder for non-technical users with one-click deployment.',
  'A no-code landing page builder targeting small business owners. Users pick from premium block templates, customize colors and content via a live editor, then deploy to a custom subdomain in one click. Includes built-in analytics, A/B testing, and form capture with Supabase.',
  'SaaS',
  ARRAY['Next.js 14', 'Framer Motion', 'Shadcn/ui', 'Tailwind', 'Supabase', 'Vercel'],
  '🚀', 'from-cyan-600/40 via-teal-600/25 to-emerald-600/15',
  '2025', '5 weeks', 'Full Stack Developer', '#', '#',
  ARRAY['Drag-and-drop block editor', 'Live real-time preview', 'One-click subdomain deployment', 'Built-in A/B testing', 'Form capture & lead export', 'Custom domain support'],
  true  -- ⭐ show on landing page
),

(
  'SaaS Auth Boilerplate',
  'Production-ready Next.js starter with auth, billing, onboarding, and team management.',
  'A battle-tested SaaS starter kit built on Next.js 14 App Router, Supabase Auth, Stripe billing, and Shadcn/ui. Includes multi-tenant team management, role-based permissions, onboarding flow, email transactional workflows, and a fully designed settings panel.',
  'SaaS',
  ARRAY['Next.js 14', 'Supabase Auth', 'Stripe', 'Prisma', 'Resend', 'Shadcn/ui'],
  '🔐', 'from-orange-600/40 via-amber-600/25 to-yellow-600/15',
  '2024', '10 weeks', 'Full Stack Developer', '#', '#',
  ARRAY['Supabase Auth (OTP, OAuth, Magic Link)', 'Stripe subscription billing', 'Multi-tenant team workspaces', 'Role-based access (Admin/Member/Viewer)', 'Onboarding wizard flow', 'Transactional email with Resend'],
  false
),

(
  'E-Commerce Admin Panel',
  'Comprehensive online store management dashboard with inventory, orders, and analytics.',
  'A feature-rich admin panel for managing an online store. Handles product catalog management with variant support, real-time order tracking, inventory level alerts, customer profiles, and a revenue analytics module. Includes a promotion and coupon engine with automated discount scheduling.',
  'Dashboard',
  ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind', 'Recharts'],
  '🛍️', 'from-pink-600/40 via-rose-600/25 to-red-600/15',
  '2024', '7 weeks', 'Full Stack Developer', '#', '#',
  ARRAY['Product catalog with infinite variants', 'Real-time order management', 'Inventory tracking & low-stock alerts', 'Customer segmentation & profiles', 'Coupon & promotion engine', 'Revenue analytics & export'],
  false
),

(
  'Restaurant Web App',
  'Modern restaurant website with online menu, table reservation, and order tracking.',
  'A complete restaurant digital presence — a stunning marketing website paired with an online ordering system. Customers can browse the interactive menu, reserve tables, place takeaway orders, and track delivery in real time. The restaurant owner manages everything from a lightweight admin panel.',
  'Web App',
  ARRAY['Next.js', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'Stripe'],
  '🍽️', 'from-red-600/40 via-orange-600/25 to-amber-600/15',
  '2024', '4 weeks', 'Full Stack Developer', '#', '#',
  ARRAY['Interactive animated menu', 'Table reservation system', 'Online ordering & Stripe payment', 'Real-time order status tracking', 'Owner admin dashboard', 'SEO-optimized marketing pages'],
  false
),

(
  'HR Management System',
  'Internal HR platform for employee profiles, leave, payroll summary, and performance reviews.',
  'An enterprise-grade internal HR tool for mid-size companies. Manages full employee lifecycle — onboarding, leave requests and approvals, payroll summary views, performance review cycles, and org chart visualization. Role-based access restricts sensitive data to HR admins only.',
  'Web App',
  ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind'],
  '👥', 'from-indigo-600/40 via-blue-600/25 to-violet-600/15',
  '2024', '9 weeks', 'Full Stack Developer', '#', '#',
  ARRAY['Employee profile & document management', 'Leave request & approval workflow', 'Payroll summary dashboard', 'Performance review cycles', 'Org chart with hierarchy view', 'Role-based permissions (RBAC)'],
  false
),

(
  'Creative Agency Landing Page',
  'Award-worthy agency marketing site with GSAP animations and scroll storytelling.',
  'A visually stunning marketing website for a creative digital agency. Features GSAP-powered scroll-triggered animations, horizontal scroll sections, interactive team profiles, case study modals, and a custom cursor. Achieves a perfect Lighthouse score with Next.js static export.',
  'Landing Page',
  ARRAY['Next.js', 'GSAP', 'ScrollTrigger', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
  '🎨', 'from-fuchsia-600/40 via-purple-600/25 to-pink-600/15',
  '2025', '3 weeks', 'Frontend Developer', '#', '#',
  ARRAY['GSAP scroll-triggered animations', 'Horizontal scroll case study section', 'Custom cursor & magnetic elements', 'Interactive team profiles', 'Case study modals', 'Static export — zero server cost'],
  false
);
