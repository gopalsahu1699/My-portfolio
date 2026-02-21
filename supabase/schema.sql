-- ─────────────────────────────────────────────────────────────────────────────
-- Portfolio Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── Contact Messages ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (contact form submissions)
CREATE POLICY "Enable insert for anyone"
  ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users (you) can read submissions
CREATE POLICY "Enable read for authenticated users only"
  ON contact_messages
  FOR SELECT
  USING (auth.role() = 'authenticated');
