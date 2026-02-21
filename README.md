# Gopal Krishn Sahu — Developer Portfolio

A premium, production-ready developer portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **GSAP**.

---

## ✨ Features

- **Premium dark UI** — `#0B0B0F` background with purple → blue → cyan gradient accents
- **Custom cursor** — glowing ring that follows the mouse
- **Scroll progress bar** — gradient indicator at the top of every page
- **Magnetic buttons** — CTAs that respond to mouse position
- **3D tilt cards** — project cards with perspective hover effect
- **Animated typing text** — cycles through Web Apps · Dashboards · AI Tools
- **Glassmorphism cards** — backdrop-blur glass aesthetic throughout
- **Floating blobs** — animated radial gradient orbs in the hero
- **Scroll reveal** — IntersectionObserver fade + slide animations on every section
- **Animated counters** — stats in the About section count up on scroll
- **Noise texture overlay** — subtle grain for a premium feel
- **Contact form** — Supabase DB + email via Resend API

---

## 📁 Project Structure

```
My-portfolio/
├── app/
│   ├── layout.tsx           # Root layout, SEO metadata, Toaster
│   ├── page.tsx             # Homepage (all sections assembled)
│   ├── globals.css          # Global design system & animations
│   └── api/contact/
│       └── route.ts         # Contact API → Supabase + Resend email
├── app/work/
│   └── page.tsx             # /work — all projects with filter + modal
├── components/
│   ├── ui/
│   │   ├── CustomCursor.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── MagneticButton.tsx
│   │   └── SectionReveal.tsx
│   └── sections/
│       ├── Navbar.tsx
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── ProjectsSection.tsx
│       ├── ServicesSection.tsx
│       ├── SkillsSection.tsx
│       ├── ContactSection.tsx
│       └── Footer.tsx
├── lib/
│   ├── utils.ts             # cn() class utility
│   ├── supabase.ts          # Supabase client
│   └── projects.ts          # All project data
├── .env.local               # Environment variables (not committed)
├── tailwind.config.ts
└── next.config.js
```

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion, GSAP |
| UI Components | Shadcn/ui, Radix UI |
| Forms | React Hook Form + Zod |
| Database | Supabase (PostgreSQL) |
| Email | Resend API |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Deployment | Vercel |

---

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone https://github.com/gopalsahu1699/My-portfolio.git
cd My-portfolio
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=gopalsahu1699@gmail.com
```

### 3. Create Supabase table

Run this in your Supabase SQL editor:

```sql
create table contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table contact_messages enable row level security;

create policy "Enable insert for anyone"
  on contact_messages for insert with check (true);
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Homepage — Hero, About, Projects, Services, Skills, Contact |
| `/work` | Full portfolio — all 8 projects with category filter & detail modal |

---

## 📬 Contact Form Flow

1. User fills in Name, Email, Message → validated with **Zod**
2. On submit → POST to `/api/contact`
3. Data saved to **Supabase** `contact_messages` table
4. Email notification sent to **gopalsahu1699@gmail.com** via **Resend**
5. **React Hot Toast** shows success/error notification

---

## 🌐 Deploy to Vercel

```bash
npx vercel --prod
```

Add the same environment variables in your [Vercel project dashboard](https://vercel.com/dashboard).

---

## 📝 License

MIT — feel free to use this as a reference or template.

---

Built with ❤️ by [Gopal Krishn Sahu](https://github.com/gopalsahu1699)