-- ─────────────────────────────────────────────────────────────────────────────
-- Portfolio Supabase Schema  —  Gopal Krishn Sahu
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- Safe to re-run: uses IF NOT EXISTS + DROP POLICY IF EXISTS
-- ─────────────────────────────────────────────────────────────────────────────


-- ═══════════════════════════════════════════════════════════════════════════════
-- 1. CONTACT MESSAGES
--    Stores enquiries submitted via the contact form on the homepage.
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS contact_messages (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can submit the contact form
DROP POLICY IF EXISTS "Enable insert for anyone" ON contact_messages;
CREATE POLICY "Enable insert for anyone"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Only the authenticated admin can read submissions
DROP POLICY IF EXISTS "Enable read for authenticated users only" ON contact_messages;
CREATE POLICY "Enable read for authenticated users only"
  ON contact_messages FOR SELECT
  USING (auth.role() = 'authenticated');


-- ═══════════════════════════════════════════════════════════════════════════════
-- 2. PROJECTS
--    Portfolio projects managed via /admin panel.
--    Public visitors can read; only the authenticated admin can write.
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS projects (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL,
  short_desc  TEXT        NOT NULL,
  full_desc   TEXT        NOT NULL DEFAULT '',
  category    TEXT        NOT NULL DEFAULT 'Web App',
  tags        TEXT[]      NOT NULL DEFAULT '{}',
  emoji       TEXT        NOT NULL DEFAULT '🚀',
  gradient    TEXT        NOT NULL DEFAULT 'from-violet-600/40 via-purple-600/25 to-blue-600/15',
  year        TEXT        NOT NULL DEFAULT '2025',
  duration    TEXT        NOT NULL DEFAULT '',
  role        TEXT        NOT NULL DEFAULT 'Full Stack Developer',
  live        TEXT        NOT NULL DEFAULT '#',
  github      TEXT        NOT NULL DEFAULT '#',
  features    TEXT[]      NOT NULL DEFAULT '{}',
  featured    BOOLEAN     NOT NULL DEFAULT false,  -- ⭐ show on landing page
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add featured column if table already existed without it
ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public homepage can read all projects
DROP POLICY IF EXISTS "Public can read projects" ON projects;
CREATE POLICY "Public can read projects"
  ON projects FOR SELECT
  USING (true);

-- Only admin can add projects
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Only admin can update projects (e.g. toggle featured)
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Only admin can delete projects
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;
CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  USING (auth.role() = 'authenticated');
